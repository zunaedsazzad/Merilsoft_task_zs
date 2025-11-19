import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = body?.message || ""

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 })
    }

    const apiKey = process.env.GENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GENAI_API_KEY env var" }, { status: 500 })
    }

    const ai = new GoogleGenAI({ apiKey })

    // Server-side system prompt (Merilsoft). Kept on server so clients cannot override it.
    const merilsoftSystemPrompt = `Merilsoft provides technology solutions including AI-driven automation, custom software development, IoT integration, strategic consulting, and digital transformation services. We help businesses improve efficiency, growth, and adaptability through scalable, high-impact technology implementations. Merilsoft serves various industries and emphasizes continuous improvement, proactive monitoring, and measurable business outcomes. Respond concisely.`

    // Gemini API does not support a `system` role for contents. Prepend
    // the Merilsoft setup prompt to the user message instead.
    const combinedPrompt = `${merilsoftSystemPrompt}\n\n${message}`

    const response = await ai.models.generateContent({
      model: "models/gemini-2.0-flash",
      contents: combinedPrompt
    })

    // Extract the text from the response. Prefer `response.text`, fall back to candidates/parts.
    const text =
      response.text ||
      (response.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") as string) ||
      ""

    return NextResponse.json({ text })
  } catch (err: any) {
    console.error("genai error", err)
    
    // Handle quota exceeded error (429)
    if (err?.status === 429 || err?.code === 429) {
      return NextResponse.json({ 
        error: "AI service quota exceeded. Please try again later or contact support.",
        code: 429
      }, { status: 429 })
    }
    
    // Handle other API errors
    if (err?.status) {
      return NextResponse.json({ 
        error: err?.message || "AI service error. Please try again.",
        code: err.status
      }, { status: err.status })
    }
    
    return NextResponse.json({ 
      error: "An unexpected error occurred. Please try again."
    }, { status: 500 })
  }
}
