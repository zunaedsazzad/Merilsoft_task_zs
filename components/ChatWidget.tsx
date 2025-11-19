"use client"
import { useEffect, useRef, useState } from "react"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"

type Msg = {
  id: string
  sender: "user" | "ai"
  text: string
  time?: string
}

// Helper function to get avatar style for each chat type
function getChatAvatar(chatId: string) {
  switch (chatId) {
    case "ai":
      return { bg: "from-purple-500 to-blue-500", text: "AI", icon: "🤖" }
    case "hiring":
      return { bg: "from-green-500 to-emerald-600", text: "HR", icon: "👔" }
    case "marketing":
      return { bg: "from-pink-500 to-rose-600", text: "MK", icon: "📢" }
    case "appointment":
      return { bg: "from-cyan-500 to-blue-600", text: "AP", icon: "📅" }
    case "support":
      return { bg: "from-amber-500 to-orange-600", text: "SP", icon: "🛟" }
    default:
      return { bg: "from-gray-500 to-slate-600", text: "??", icon: "💬" }
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [full, setFull] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  // mobile breakpoint flag
  const [isMobile, setIsMobile] = useState(false)

  // chats: each chat has id and messages
  const initialChats: Record<string, Msg[]> = {
    ai: [
      { id: "a1", sender: "ai", text: "Hi! I'm your assistant. Ask your queries here" },

    ],
    hiring: [
      { id: "h1", sender: "user", text: "I want to apply for a position." },
      { id: "h2", sender: "ai", text: "Please share your resume and desired role." },
    ],
    marketing: [
      { id: "m1", sender: "ai", text: "Our latest campaign starts next week." },
    ],
    appointment: [
      { id: "b1", sender: "ai", text: "You can book an appointment for a demo. Pick a date." },
    ],
    support: [
      { id: "s1", sender: "ai", text: "How can I assist with your issue?" },
    ],
  }

  const [chats, setChats] = useState<Record<string, Msg[]>>(initialChats)
  const [activeChat, setActiveChat] = useState<string>("ai")
  const vanishPlaceholders = [
    `Message ${chatTitle(activeChat)}`,
    "Ask about pricing",
    "Book a demo",
    "Report an issue",
    "Talk to support",
  ]

  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats, open, full])

  useEffect(() => {
    // scroll when active chat changes
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat, open, full])

  // track mobile viewport (Messenger style fullscreen below 640px)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 640px)')
    const handler = () => setIsMobile(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  async function send() {
    if (!input.trim()) return

    const userMsg: Msg = { id: String(Date.now()), sender: "user", text: input }
    setChats((prev) => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), userMsg] }))
    setInput("")
    setLoading(true)

    // If active chat is the AI inbox, call backend. Otherwise simulate a reply.
    if (activeChat === "ai") {
      try {
        const res = await fetch("/api/genai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg.text }),
        })
        const data = await res.json()
        
        // Handle quota exceeded error
        if (res.status === 429 || data?.code === 429) {
          const aiMsg: Msg = { 
            id: String(Date.now() + 1), 
            sender: "ai", 
            text: "I'm currently experiencing high demand. Please try again in a few moments, or contact our support team for immediate assistance." 
          }
          setChats((prev) => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), aiMsg] }))
        } else if (!res.ok) {
          // Handle other HTTP errors
          const aiMsg: Msg = { 
            id: String(Date.now() + 1), 
            sender: "ai", 
            text: data?.error || "I'm having trouble responding right now. Please try again or contact support." 
          }
          setChats((prev) => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), aiMsg] }))
        } else {
          // Success
          const aiText = data?.text || "Sorry, I couldn't get an answer right now."
          const aiMsg: Msg = { id: String(Date.now() + 1), sender: "ai", text: aiText }
          setChats((prev) => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), aiMsg] }))
        }
      } catch (err) {
        const errMsg: Msg = { 
          id: String(Date.now() + 2), 
          sender: "ai", 
          text: "I'm currently unavailable. Please try again later or contact our support team." 
        }
        setChats((prev) => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), errMsg] }))
      } finally {
        setLoading(false)
      }
    } else {
      // simulate different team replies
      setTimeout(() => {
        const reply: Msg = { id: String(Date.now() + 3), sender: "ai", text: `Thanks — the ${activeChat} team will respond soon.` }
        setChats((prev) => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), reply] }))
        setLoading(false)
      }, 700)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send()
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed right-6 bottom-6 z-50">
        <div className="relative w-12 h-12">
          {/* Subtle pulsing glow behind the button */}
          <span className={`absolute inset-0 rounded-full pointer-events-none blur-lg transition-opacity duration-300 ${open ? 'bg-orange-400/18 opacity-90' : 'bg-orange-500/30 opacity-80'} animate-pulse`}></span>
          {/* Outward ping when closed to draw attention */}
          <span className={`absolute -inset-1 rounded-full pointer-events-none transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-80'} bg-orange-400/40 animate-ping`}></span>

          <button
        onClick={() => {
          setOpen((prev) => {
            if (!prev) {
          setFull(false) // always start compact when opening
            }
            return !prev
          })
        }}
        aria-label="Open chat"
        aria-expanded={open}
        aria-pressed={open}
        className={`relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ${
          open
            ? 'bg-gray-800 text-orange-500 scale-105 rotate-6 shadow-2xl'
            : 'bg-orange-500/80 text-white hover:scale-105'
        }`}
          >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-transform duration-500 ${open ? 'rotate-45 scale-95' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-3-.45L3 21l1.45-4.05A7.968 7.968 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
          </button>
        </div>
      </div>

      {/* Chat Panel */}
      {open && (
        <div
          className={
            isMobile
              ? 'fixed inset-0 z-50 flex flex-col bg-slate-900 text-white animate-in fade-in duration-200'
              : `fixed z-50 flex flex-col border-b bg-gradient-to-r from-fuchsia-800 to-sky-800 border rounded-xl shadow-xl overflow-hidden ${
                  full ? 'inset-x-0 top-16 bottom-0 rounded-none' : 'right-8 bottom-20 w-80 h-[450px]'
                }`
          }
          style={{ transition: 'all 180ms ease-in-out', paddingTop: isMobile ? 'env(safe-area-inset-top)' : undefined }}
        >
          {/* Full-screen messenger layout */}
          {(full && !isMobile) ? (
            <div className="flex h-full">
              {/* Left inbox */}
              <div className="w-96 border-r border-slate-700/50 bg-slate-900 text-white flex flex-col">
                <div className="px-4 py-6 flex items-center justify-between border-b border-t border-slate-700/50">
                  <div className="font-semibold">Chats</div>
                  <div className="text-sm opacity-80">AI Inbox</div>
                </div>
                <div className="flex-1 overflow-auto">
                  <ChatListItem id="ai" title="AI Assistant" subtitle={chats.ai?.[chats.ai.length-1]?.text || ""} active={activeChat==="ai"} onClick={() => setActiveChat("ai")} />
                  <ChatListItem id="hiring" title="Hiring Team" subtitle={chats.hiring?.[chats.hiring.length-1]?.text || ""} active={activeChat==="hiring"} onClick={() => setActiveChat("hiring")} />
                  <ChatListItem id="marketing" title="Marketing Team" subtitle={chats.marketing?.[chats.marketing.length-1]?.text || ""} active={activeChat==="marketing"} onClick={() => setActiveChat("marketing")} />
                  <ChatListItem id="appointment" title="Book Appointment" subtitle={chats.appointment?.[chats.appointment.length-1]?.text || ""} active={activeChat==="appointment"} onClick={() => setActiveChat("appointment")} />
                  <ChatListItem id="support" title="Support" subtitle={chats.support?.[chats.support.length-1]?.text || ""} active={activeChat==="support"} onClick={() => setActiveChat("support")} />
                </div>
              </div>

              {/* Right chat area */}
              <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white relative border-l border-r border-slate-700/50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,146,60,0.08),transparent_50%)] pointer-events-none"></div>
                <div className="px-6 py-4 flex items-center justify-between border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/30 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/50 font-semibold">{activeChat[0].toUpperCase()}</div>
                      <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-20"></div>
                    </div>
                    <div>
                      <div className="font-semibold capitalize">{activeChat === 'ai' ? 'Assistant' : chatTitle(activeChat)}</div>
                      <div className="text-xs text-slate-400">{activeChat === 'ai' ? 'Chat with AI' : `Chat with ${chatTitle(activeChat)}`}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-white hover:bg-white/10 p-2 rounded-lg transition-all" onClick={() => setOpen(false)} title="Close chat" aria-label="Close chat">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-2 overflow-auto relative z-10">
                  <div className="space-y-5 max-w-4xl mx-32">
                    {(chats[activeChat] || []).map((m, idx) => (
                      <div 
                        key={m.id} 
                        className={`flex ${m.sender === "user" ? "flex-row-reverse" : "flex-row"} gap-3 items-end animate-in slide-in-from-bottom-4 fade-in duration-300`}
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="flex-shrink-0">
                          {m.sender === "user" ? (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-500 to-orange-700 flex items-center justify-center text-white text-xs font-semibold shadow-lg">U</div>
                          ) : (
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getChatAvatar(activeChat).bg} flex items-center justify-center text-white text-lg shadow-lg`}>
                              {getChatAvatar(activeChat).icon}
                            </div>
                          )}
                        </div>
                        <div className={`px-4 py-2 rounded-2xl max-w-[80%] break-words text-sm antialiased leading-relaxed font-sans transition-all duration-200 hover:scale-[1.02] ${
                          m.sender === "user" 
                          ? "bg-gradient-to-br from-sky-800 to-orange-600 text-white shadow-sm shadow-orange-500/30" 
                          : "bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 shadow-sm border border-vlue-600/50"
                        }`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex flex-row gap-3 items-end animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getChatAvatar(activeChat).bg} flex items-center justify-center text-white text-lg shadow-lg`}>
                            {getChatAvatar(activeChat).icon}
                          </div>
                        </div>
                        <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg border border-slate-600/50">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                            <span className="text-xs text-slate-400">Typing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-orange-700/50 bg-slate-900/80 backdrop-blur-md relative z-10">
                  <PlaceholdersAndVanishInput
                    placeholders={vanishPlaceholders}
                    onChange={(e) => setInput(e.target.value)}
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (!loading) send()
                    }}
                  />
                </div>
              </div>
            </div>
          ) : isMobile ? (
            // Mobile full-screen simplified messenger layout (Messenger-like)
            <>
              {/* Header */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-slate-700/50 bg-slate-900 sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div>
                    <div className="font-semibold text-white text-base">{activeChat === 'ai' ? 'Assistant' : chatTitle(activeChat)}</div>
                    <div className="text-[11px] text-slate-400">{activeChat === 'ai' ? 'Online' : 'Team Inbox'}</div>
                  </div>
                </div>
                <button
                  onClick={() => setFull((f) => !f)}
                  aria-label="Expand"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>

              {/* Chat switcher tabs */}
              <div className="flex gap-3 px-4 py-2 overflow-x-auto hide-scrollbar bg-slate-900/95 border-b border-slate-800">
                {['ai','hiring','marketing','appointment','support'].map(id => (
                  <button
                    key={id}
                    onClick={() => setActiveChat(id)}
                    className={`flex flex-col items-center min-w-[56px] px-2 py-1 rounded-xl border transition-all duration-200 ${activeChat===id ? 'border-orange-500 bg-slate-800' : 'border-slate-700 bg-slate-900'} active:scale-95`}
                  >
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getChatAvatar(id).bg} flex items-center justify-center text-white text-sm shadow-md mb-1`}>{getChatAvatar(id).icon}</div>
                    <span className="text-[10px] text-slate-300 truncate w-full text-center">{chatTitle(id).replace(/(Team|Assistant|Book )/,'')}</span>
                  </button>
                ))}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-auto px-2 py-3 space-y-5 bg-gradient-to-b from-slate-900 to-slate-950 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,146,60,0.06),transparent_55%)] pointer-events-none"></div>
                {(chats[activeChat] || []).map((m, idx) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender==='user'?'flex-row-reverse':'flex-row'} items-end gap-3 animate-in slide-in-from-bottom-3 fade-in duration-300`}
                    style={{animationDelay:`${idx*40}ms`}}
                  >
                    <div className="flex-shrink-0">
                      {m.sender==='user' ? (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-500 to-orange-700 flex items-center justify-center text-white text-xs font-semibold shadow-md">U</div>
                      ) : (
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getChatAvatar(activeChat).bg} flex items-center justify-center text-white text-lg shadow-md`}>{getChatAvatar(activeChat).icon}</div>
                      )}
                    </div>
                    <div className={`px-4 py-2 rounded-2xl max-w-[78%] text-[13px] leading-relaxed break-words shadow-sm ${m.sender==='user' ? 'bg-gradient-to-br from-sky-800 to-orange-600 text-white' : 'bg-gradient-to-br from-slate-800 to-slate-700 text-slate-100 border border-slate-600/40'}`}>{m.text}</div>
                  </div>
                ))}
                {loading && (
                  <div className="flex flex-row gap-3 items-end animate-in slide-in-from-bottom-3 fade-in duration-300">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getChatAvatar(activeChat).bg} flex items-center justify-center text-white text-lg shadow-md`}>{getChatAvatar(activeChat).icon}</div>
                    <div className="px-4 py-2 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-md border border-slate-600/40">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{animationDelay:'0ms'}}></div>
                        <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{animationDelay:'150ms'}}></div>
                        <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{animationDelay:'300ms'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 bg-slate-900 border-t border-slate-800 shadow-inner sticky bottom-0 z-20" style={{paddingBottom:'calc(env(safe-area-inset-bottom) + 0.75rem)'}}>
                <PlaceholdersAndVanishInput
                  placeholders={vanishPlaceholders}
                  onChange={(e) => setInput(e.target.value)}
                  onSubmit={(e) => { e.preventDefault(); if(!loading) send(); }}
                />
              </div>
            </>
          ) : (
            // compact panel (existing)
            <>
              <div className="flex items-center justify-between px-3 py-1 border-b bg-gradient-to-r from-slate-800 via-sky-800 to-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/40 font-semibold">AI</div>
                    <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-20"></div>
                  </div>
                  <div>
                    <div className="font-medium text-white">Assistant</div>
                    <div className="text-xs text-slate-300">Ask me anything about our service</div>
                  </div>
                </div>
                <div className="flex items-center  gap-2">
                  <button className="text-slate-200 hover:text-white p-2 transition-colors" onClick={() => setFull((s) => !s)} title="Toggle fullscreen" aria-label="Toggle fullscreen">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                  <button className="text-slate-300 hover:text-white p-2 transition-colors" onClick={() => setOpen(false)} title="Close chat" aria-label="Close chat">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-auto hide-scrollbar bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.08),transparent_50%)] pointer-events-none"></div>
                <div className="space-y-3 relative z-10">
                  {(chats[activeChat] || []).map((m, idx) => (
                    <div 
                      key={m.id} 
                      className={`flex ${m.sender === "user" ? "flex-row-reverse" : "flex-row"} gap-2 items-end animate-in slide-in-from-bottom-2 fade-in duration-300`}
                      style={{ animationDelay: `${idx * 40}ms` }}
                    >
                      <div className="flex-shrink-0">
                        {m.sender === "user" ? (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-500 to-orange-700 flex items-center justify-center text-white text-[10px] font-semibold shadow-lg">U</div>
                        ) : (
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${getChatAvatar(activeChat).bg} flex items-center justify-center text-sm shadow-lg`}>
                            {getChatAvatar(activeChat).icon}
                          </div>
                        )}
                      </div>
                      <div className={`px-3 py-2 rounded-2xl max-w-[75%] break-words text-sm transition-all duration-200 hover:scale-[1.02] ${
                        m.sender === "user" 
                          ? "bg-gradient-to-br from-slate-500 to-orange-700 text-white shadow-lg shadow-orange-500/30" 
                          : "bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg border border-slate-600/50"
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex flex-row gap-2 items-end animate-in slide-in-from-bottom-2 fade-in duration-300">
                      <div className="flex-shrink-0">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${getChatAvatar(activeChat).bg} flex items-center justify-center text-sm shadow-lg`}>
                          {getChatAvatar(activeChat).icon}
                        </div>
                      </div>
                      <div className="px-3 py-2 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg border border-slate-600/50">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              </div>

              <div className="px-3 py-3 bg-gradient-to-r from-slate-800 via-sky-900 to-slate-800 border-t border-slate-700/50">
                <PlaceholdersAndVanishInput
                  placeholders={vanishPlaceholders}
                  onChange={(e) => setInput(e.target.value)}
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!loading) send()
                  }}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

function chatTitle(id: string) {
  switch (id) {
    case "ai":
      return "Assistant"
    case "hiring":
      return "Hiring Team"
    case "marketing":
      return "Marketing Team"
    case "appointment":
      return "Book Appointment"
    case "support":
      return "Support"
    default:
      return id
  }
}

function ChatListItem({ id, title, subtitle, active, onClick }: { id: string; title: string; subtitle?: string; active?: boolean; onClick?: () => void }) {
  const avatar = getChatAvatar(id)
  
  return (
    <div onClick={onClick} className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-700/50 border-l-2 ${active ? 'bg-gradient-to-r from-slate-700 to-slate-700/50 border-l-orange-400' : 'border-l-transparent'}`}>
      <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatar.bg} flex items-center justify-center flex-shrink-0 shadow-md text-lg`}>
        {avatar.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{title}</div>
        <div className="text-xs text-slate-400 truncate">{subtitle}</div>
      </div>
      <div className="text-xs text-slate-400 flex-shrink-0">Now</div>
    </div>
  )
}
