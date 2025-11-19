"use client"
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { RiMoneyDollarBoxFill, RiSkull2Line } from 'react-icons/ri'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'
import { SiHiveBlockchain, SiSmartthings, SiCoinmarketcap } from 'react-icons/si'
import { GrBusinessService, GrSystem } from 'react-icons/gr'
import { FaUserAstronaut, FaAssistiveListeningSystems } from 'react-icons/fa'
import { CiDeliveryTruck } from 'react-icons/ci'
import { LuRadioTower } from 'react-icons/lu'
import { TbSettingsAutomation } from 'react-icons/tb'
import { MdEngineering, MdInstallMobile, MdLeaderboard } from 'react-icons/md'
import { BiSolidInstitution } from 'react-icons/bi'
import { CgWebsite } from 'react-icons/cg'
import AppointmentForm from "@/components/ui/appointment-form";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openServices, setOpenServices] = useState(false)
  const [openResources, setOpenResources] = useState(false)
  const [openAbout, setOpenAbout] = useState(false)
  const [openIndustries, setOpenIndustries] = useState(false)
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)
  const openAppointment = () => setIsAppointmentOpen(true);

  // timers to smooth hover behaviour
  const OPEN_DELAY = 0 // ms before opening on hover
  const CLOSE_DELAY = 400 // ms before closing after leaving (prevents flicker when crossing gaps)

  const openServicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeServicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openResourcesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeResourcesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openIndustriesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeIndustriesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openAboutTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeAboutTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // clear timers on unmount
  useEffect(() => {
    return () => {
      ;[openServicesTimer, closeServicesTimer, openResourcesTimer, closeResourcesTimer, openAboutTimer, closeAboutTimer, openIndustriesTimer, closeIndustriesTimer].forEach(ref => {
        if (ref.current) clearTimeout(ref.current)
      })
    }
  }, [])

  // change navbar appearance on scroll
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // theme (dark / light) handling - default to dark
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark' || stored === 'light') {
        setTheme(stored)
        if (stored === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } else {
        // Default to dark mode if no preference is stored
        setTheme('dark')
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      }
    } catch (e) {
      // ignore (SSR safety) - still default to dark
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch (e) {}
    if (next === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-[9999] transition-colors duration-300 ease-in-out bg-gray-900 text-white ${scrolled ? 'border-b shadow-lg' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-16">
          {/* left: logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* inline SVG logo similar to provided image */}
            <svg width="100" height="30" viewBox="0 0 240 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="block sm:w-[120px] sm:h-[36px]">
              <g>
                <text x="0" y="42" fill="#0EA5A4" fontFamily="Inter, Arial" fontWeight="700" fontSize="36">MERIL</text>
                <text x="110" y="42" fill="#F58427" fontFamily="Inter, Arial" fontWeight="700" fontSize="36">SOFT</text>
                <rect x="0" y="54" width="210" height="6" rx="3" fill="#0EA5A4" />
              </g>
            </svg>
          </Link>

          {/* center / right: nav items */}
          <nav className={`hidden md:flex items-center space-x-6` }>
              {/* Services dropdown (open on hover for desktop) */}
              <div
                onMouseEnter={() => {
                  // cancel any pending close and schedule open shortly
                  if (closeServicesTimer.current) { clearTimeout(closeServicesTimer.current) }
                  if (openServicesTimer.current) { clearTimeout(openServicesTimer.current) }
                  openServicesTimer.current = setTimeout(() => setOpenServices(true), OPEN_DELAY)
                }}
                onMouseLeave={() => {
                  // schedule close with a delay to make crossing small gaps forgiving
                  if (openServicesTimer.current) { clearTimeout(openServicesTimer.current) }
                  if (closeServicesTimer.current) { clearTimeout(closeServicesTimer.current) }
                  closeServicesTimer.current = setTimeout(() => setOpenServices(false), CLOSE_DELAY)
                }}
                className="relative"
              >
                <DropdownMenu open={openServices} onOpenChange={(open) => {
                  // Prevent Radix from auto-closing, only allow manual control
                  if (!open && openServices) {
                    // Only close if we explicitly want to close
                    return;
                  }
                }}>
                  <DropdownMenuTrigger asChild>
                    <button className={`flex items-center gap-2 text-white hover:text-orange-500 ${openServices ? 'text-orange-500' : ''} focus:outline-none focus:ring-0`}>
                      <span className="text-sm font-medium">Services</span>
                      <svg className="w-3 h-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                    <DropdownMenuContent
                      onMouseEnter={() => {
                        if (closeServicesTimer.current) { clearTimeout(closeServicesTimer.current) }
                        if (openServicesTimer.current) { clearTimeout(openServicesTimer.current) }
                        setOpenServices(true)
                      }}
                      onMouseLeave={() => {
                        if (closeServicesTimer.current) { clearTimeout(closeServicesTimer.current) }
                        closeServicesTimer.current = setTimeout(() => setOpenServices(false), CLOSE_DELAY)
                      }}
                      className="data-[state=closed]:slide-out-to-left-0 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-bottom-20 data-[state=open]:slide-in-from-bottom-20 data-[state=closed]:zoom-out-100 w-[700px] duration-800 ease-out"
                    >
                      <div className="px-4 py-4">
                        <h4 className="text-sm font-semibold text-gray-600">Services</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-4 pb-4">
                        <div>
                          <h5 className="text-xs font-semibold text-gray-500 mb-3 ">ENGINEERING SERVICES</h5>
                          <div className="space-y-0.2">
                            <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                                <Link href="/services/product-engineering" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                  <MdEngineering className="w-3 h-3 text-black" />
                                </div>
                                <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Product Engineering</span>
                              </Link>
                            </DropdownMenuItem>
                              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                              <Link href="/services/iot" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                  <LuRadioTower className="w-3 h-3 text-gray-700" />
                                </div>
                                <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Internet of Things (IoT)</span>
                              </Link>
                            </DropdownMenuItem>
                              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                              <Link href="/services/embedded" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                  <FaAssistiveListeningSystems className="w-3 h-3 text-gray-700" />
                                </div>
                                <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Embedded Systems</span>
                              </Link>
                            </DropdownMenuItem>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-xs font-semibold text-gray-500 mb-3">APPLICATION SERVICES</h5>
                          <div className="space-y-0.5">
              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                <Link href="/services/web-development" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                  <CgWebsite className="w-3 h-3 text-gray-700" />
                                </div>
                                <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Web Development</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                              <Link href="/services/mobile-app" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                  <MdInstallMobile className="w-3 h-3 text-gray-700" />
                                </div>
                                <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Mobile App Development</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                              <Link href="/services/custom-software" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                  <GrSystem className="w-3 h-3 text-gray-700" />
                                </div>
                                <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Custom Software Development</span>
                              </Link>
                            </DropdownMenuItem>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>

                {/* Industries dropdown (hover) */}
                <div
                  onMouseEnter={() => {
                    if (closeIndustriesTimer.current) { clearTimeout(closeIndustriesTimer.current) }
                    if (openIndustriesTimer.current) { clearTimeout(openIndustriesTimer.current) }
                    openIndustriesTimer.current = setTimeout(() => setOpenIndustries(true), OPEN_DELAY)
                  }}
                  onMouseLeave={() => {
                    if (openIndustriesTimer.current) { clearTimeout(openIndustriesTimer.current) }
                   
                    closeIndustriesTimer.current = setTimeout(() => setOpenIndustries(false), CLOSE_DELAY)
                  }}
                  className="relative"
                >
                  <DropdownMenu open={openIndustries} onOpenChange={(open) => {
                    // Prevent Radix from auto-closing, only allow manual control
                    if (!open && openIndustries) {
                      return;
                    }
                  }}>
                    <DropdownMenuTrigger asChild>
                      <button className={`flex items-center gap-2 text-white hover:text-orange-500 ${openIndustries ? 'text-orange-500' : ''} focus:outline-none focus:ring-0`}>
                        <span className="text-sm font-medium">Industries</span>
                        <svg className="w-3 h-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </DropdownMenuTrigger>
                      <DropdownMenuContent
                        onMouseEnter={() => {
                          if (closeIndustriesTimer.current) { clearTimeout(closeIndustriesTimer.current) }
                          if (openIndustriesTimer.current) { clearTimeout(openIndustriesTimer.current) }
                          setOpenIndustries(true)
                        }}
                        onMouseLeave={() => {
                          if (closeIndustriesTimer.current) { clearTimeout(closeIndustriesTimer.current) }
                          closeIndustriesTimer.current = setTimeout(() => setOpenIndustries(false), CLOSE_DELAY)
                        }}
                        className="data-[state=closed]:slide-out-to-left-0 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-bottom-20 data-[state=open]:slide-in-from-bottom-20 data-[state=closed]:zoom-out-100 w-[880px] duration-500 ease-out"
                      >
                        <div className="px-4 py-3">
                          <h4 className="text-sm font-semibold text-gray-600">Industries</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-x-6 gap-y-4 px-4 pb-4">
                          <div>
                            <h5 className="text-xs font-semibold text-gray-500 mb-2">FINANCE</h5>
                            <div className="space-y-2">
                              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                                <Link href="/industries/fintech" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <RiMoneyDollarBoxFill className="w-3 h-3 text-gray-700" />
                                  </div>
                                  <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">FinTech Solutions</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                                <Link href="/industries/blockchain" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                        <SiHiveBlockchain className="w-3 h-3 text-gray-700" />
                                      </div>
                                  <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Blockchain Integration</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                                <Link href="/industries/risk" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <RiSkull2Line className="w-3 h-3 text-gray-700" />
                                  </div>
                                  <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Risk Management Systems</span>
                                </Link>
                              </DropdownMenuItem>
                            </div>
                          </div>

                          <div>
                            <h5 className="text-xs font-semibold text-gray-500 mb-2">RETAIL</h5>
                            <div className="space-y-2">
                              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                                <Link href="/industries/ecommerce" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <GrBusinessService className="w-3 h-3 text-gray-700" />
                                  </div>
                                  <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">E-commerce Platforms</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                                <Link href="/industries/cx" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <FaUserAstronaut className="w-3 h-3 text-gray-700" />
                                  </div>
                                  <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Customer Experience</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                                <Link href="/industries/supply-chain" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <CiDeliveryTruck className="w-3 h-3 text-gray-700" />
                                  </div>
                                  <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Supply Chain Optimization</span>
                                </Link>
                              </DropdownMenuItem>
                            </div>
                          </div>

                          <div>
                            <h5 className="text-xs font-semibold text-gray-500 mb-2">MANUFACTURING</h5>
                            <div className="space-y-2">
                              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                                <Link href="/industries/smart-factory" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <SiSmartthings className="w-3 h-3 text-gray-700" />
                                  </div>
                                  <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Smart Factory Solutions</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                                <Link href="/industries/industrial-iot" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <LuRadioTower className="w-3 h-3 text-gray-700" />
                                  </div>
                                  <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Industrial IoT</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                                <Link href="/industries/automation" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                    <TbSettingsAutomation className="w-3 h-3 text-gray-700" />
                                  </div>
                                  <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Automation Systems</span>
                                </Link>
                              </DropdownMenuItem>
                            </div>
                          </div>
                        </div>
                      </DropdownMenuContent>
                  </DropdownMenu>
                </div>

            {/* Resources removed per request */}

            {/* About dropdown (hover) */}
            <div
              onMouseEnter={() => {
                if (closeAboutTimer.current) { clearTimeout(closeAboutTimer.current) }
                if (openAboutTimer.current) { clearTimeout(openAboutTimer.current) }
                openAboutTimer.current = setTimeout(() => setOpenAbout(true), OPEN_DELAY)
              }}
              onMouseLeave={() => {
                if (openAboutTimer.current) { clearTimeout(openAboutTimer.current) }
                if (closeAboutTimer.current) { clearTimeout(closeAboutTimer.current) }
                closeAboutTimer.current = setTimeout(() => setOpenAbout(false), CLOSE_DELAY)
              }}
              className="relative"
            >
              <DropdownMenu open={openAbout} onOpenChange={(open) => {
                // Prevent Radix from auto-closing, only allow manual control
                if (!open && openAbout) {
                  return;
                }
              }}>
                <DropdownMenuTrigger asChild>
                  <button className={`flex items-center gap-2 text-white hover:text-orange-500 ${openAbout ? 'text-orange-500' : ''} focus:outline-none focus:ring-0`}>
                    <span className="text-sm font-medium">About Us</span>
                    <svg className="w-3 h-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  onMouseEnter={() => { 
                    if (closeAboutTimer.current) { clearTimeout(closeAboutTimer.current) } 
                    if (openAboutTimer.current) { clearTimeout(openAboutTimer.current) }
                    setOpenAbout(true)
                  }}
                  onMouseLeave={() => { 
                    if (closeAboutTimer.current) { clearTimeout(closeAboutTimer.current) }
                    closeAboutTimer.current = setTimeout(() => setOpenAbout(false), CLOSE_DELAY) 
                  }}
                  className="data-[state=closed]:slide-out-to-left-0 data-[state=open]:slide-in-from-left-0 data-[state=closed]:slide-out-to-bottom-20 data-[state=open]:slide-in-from-bottom-20 data-[state=closed]:zoom-out-100 w-48 duration-500 ease-out"
                >
                    <DropdownMenuLabel>About</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                        <Link href="/about" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                <BiSolidInstitution className="w-3 h-3 text-gray-700" />
                              </div>
                              <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Company</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                        <Link href="/about#leadership" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                          <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                            <MdLeaderboard className="w-3 h-3 text-gray-700" />
                          </div>
                          <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Leadership</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="data-[highlighted]:bg-orange-500 data-[highlighted]:text-white" asChild>
                        <Link href="/about#market" className="group flex items-center gap-3 px-1 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap focus:outline-none focus:ring-0">
                          <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                            <SiCoinmarketcap className="w-3 h-3 text-gray-700" />
                          </div>
                          <span className="inline-block text-sm transition-all duration-200 ease-out group-hover:text-base">Market</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Link href="/careers" className={`text-sm text-white hover:text-orange-600 focus:outline-none focus:ring-0`}>Careers</Link>
            <Link href="/contact" className={`text-sm text-white hover:text-orange-600 focus:outline-none focus:ring-0`}>Contact</Link>
          </nav>

          {/* CTA + theme toggle + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className={`p-2 rounded-md focus:outline-none focus:ring-0 text-white hover:text-orange-500`}
            >
              {theme === 'dark' ? (
                <HiOutlineSun className="w-5 h-5" />
              ) : (
                <HiOutlineMoon className="w-5 h-5" />
              )}
            </button>

            <button 
              onClick={() => {
                if (window.location.pathname === '/') {
                  // Already on home page, trigger hash
                  window.location.hash = 'appointment';
                  // Manually trigger hashchange event
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                } else {
                  // Navigate to home with hash
                  window.location.href = '/#appointment';
                }
              }}
              className="hidden md:inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium focus:outline-none focus:ring-0"
            >
              Get In Touch
            </button>

            {/* mobile menu button */}
            <button
              className={`md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-900 focus:outline-none focus:ring-0`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - Enhanced with animations and better styling */}
        <div className={`${mobileOpen ? 'mobile-menu-enter' : 'mobile-menu-exit hidden'} md:hidden absolute top-16 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-2xl transition-all duration-300 ease-in-out max-h-[calc(100vh-4rem)] overflow-y-auto`}> 
          <div className="container mx-auto px-4 py-6 space-y-2">
            <details className="group bg-gray-800/50 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-4 py-3 text-white hover:bg-orange-500/20 cursor-pointer focus:outline-none focus:ring-0 active:bg-orange-500/30 transition-colors duration-200">
                <span className="font-medium">Services</span>
                <svg className="w-5 h-5 text-orange-400 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="bg-gray-800/30 px-4 py-2 space-y-1">
                <Link href="/services/product-engineering" className="block px-4 py-3 text-sm text-gray-300 rounded-md hover:bg-orange-500 hover:text-white active:bg-orange-600 transition-colors duration-150">Product Engineering</Link>
                <Link href="/services/iot" className="block px-4 py-3 text-sm text-gray-300 rounded-md hover:bg-orange-500 hover:text-white active:bg-orange-600 transition-colors duration-150">Internet of Things</Link>
                <Link href="/services/embedded" className="block px-4 py-3 text-sm text-gray-300 rounded-md hover:bg-orange-500 hover:text-white active:bg-orange-600 transition-colors duration-150">Embedded Systems</Link>
                <Link href="/services/web" className="block px-4 py-3 text-sm text-gray-300 rounded-md hover:bg-orange-500 hover:text-white active:bg-orange-600 transition-colors duration-150">Web Development</Link>
              </div>
            </details>

            {/* mobile Resources removed per request */}

            <details className="group bg-gray-800/50 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between px-4 py-3 text-white hover:bg-orange-500/20 cursor-pointer focus:outline-none focus:ring-0 active:bg-orange-500/30 transition-colors duration-200">
                <span className="font-medium">About Us</span>
                <svg className="w-5 h-5 text-orange-400 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="bg-gray-800/30 px-4 py-2 space-y-1">
                <Link href="/about" className="block px-4 py-3 text-sm text-gray-300 rounded-md hover:bg-orange-500 hover:text-white active:bg-orange-600 transition-colors duration-150">Company</Link>
                <Link href="/about#leadership" className="block px-4 py-3 text-sm text-gray-300 rounded-md hover:bg-orange-500 hover:text-white active:bg-orange-600 transition-colors duration-150">Leadership</Link>
                <Link href="/about#market" className="block px-4 py-3 text-sm text-gray-300 rounded-md hover:bg-orange-500 hover:text-white active:bg-orange-600 transition-colors duration-150">Market</Link>
              </div>
            </details>

            <Link href="/careers" className="block px-4 py-3 text-white bg-gray-800/50 rounded-lg hover:bg-orange-500/20 active:bg-orange-500/30 transition-colors duration-200 font-medium">Careers</Link>
            <Link href="/contact" className="block px-4 py-3 text-white bg-gray-800/50 rounded-lg hover:bg-orange-500/20 active:bg-orange-500/30 transition-colors duration-200 font-medium">Contact</Link>
            <button 
              onClick={() => {
                setMobileOpen(false);
                if (window.location.pathname === '/') {
                  window.location.hash = 'appointment';
                  // Manually trigger hashchange event
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                } else {
                  window.location.href = '/#appointment';
                }
              }}
              className="block w-full px-4 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-center font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 mt-2"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
