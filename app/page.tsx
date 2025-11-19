"use client"
import React, { useRef, useState, useEffect } from "react"
import TopEmployees from "@/components/top-employees";

import { SparklesCore } from "@/components/ui/sparkles"
import GlareCardDemo from "@/components/glare-card-demo"
import ThreeDCardDemo from "@/components/ui/3d-card-demo";
import MeteorsDemo from "@/components/meteors-demo";
import SpotlightNewDemo from "@/components/spotlight-new-demo";
import { LampContainer } from "@/components/ui/lamp";
import { Button as MovingBorderButton } from "@/components/ui/moving-border-full";
import BackgroundLinesDemo from "@/components/background-lines-demo";
import NewsNotice from "@/components/news-notice";
import FAQ from "@/components/faq";
import Partners from "@/components/partners";
import SimpleModal from "@/components/ui/simple-modal";
import AppointmentForm from "@/components/ui/appointment-form";

export default function Home() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const openAppointment = () => setIsAppointmentOpen(true);
  const closeAppointment = () => setIsAppointmentOpen(false);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // Listen for hash changes to open appointment modal
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#appointment') {
        // Small delay to ensure component is ready
        setTimeout(() => {
          openAppointment();
          // Remove the hash from URL after opening
          window.history.replaceState(null, '', window.location.pathname);
        }, 100);
      }
    };
    
    // Check on mount
    checkHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', checkHash);
    
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const pauseMarquee = () => {
    const track = marqueeRef.current?.querySelector(
      ".marquee-track"
    ) as HTMLElement | null;
    if (!track) return;
    track.style.animationPlayState = "paused";
    // vendor-prefixed fallback
    // @ts-ignore
    track.style.webkitAnimationPlayState = "paused";
  };

  const resumeMarquee = () => {
    const track = marqueeRef.current?.querySelector(
      ".marquee-track"
    ) as HTMLElement | null;
    if (!track) return;
    track.style.animationPlayState = "running";
    // vendor-prefixed fallback
    // @ts-ignore
    track.style.webkitAnimationPlayState = "running";
  };
  const services = [
    {
      title: 'Managed IT Support',
      description: '24/7 helpdesk, on-site engineers, and proactive system maintenance.',
      img: '/managed-it.jpg',
      bgClass: 'bg-gray-400'
    },
    {
      title: 'Cloud Migration',
      description: 'Seamless lift-and-shift, replatforming, and cost optimisation for cloud.',
      img: '/cloud-migration.jpg',
      bgClass: 'bg-teal-400'
    },
    {
      title: 'Cybersecurity',
      description: 'Threat detection, incident response, and compliance readiness.',
      img: '/cybersecurity.jpg',
      bgClass: 'bg-emerald-200'
    },
    {
      title: 'Custom Software',
      description: 'End-to-end product development tailored to your business needs.',
      img: '/customer-service.jpg',
      bgClass: 'bg-orange-300'
    },
    {
      title: 'Data & Analytics',
      description: 'Data strategy, pipelines, visualization, and ML enablement.',
      img: '/data-analytics.png',
      bgClass: 'bg-purple-400'
    },
    {
      title: 'IT Consulting',
      description: 'Roadmaps, architecture reviews, and technology advisory services.',
      img: '/it-consulting.jpeg',
      bgClass: 'bg-amber-300'
    }
  ];

  const [showLamp, setShowLamp] = useState(false);

  // ref for scrolling to the Services Details section
  const servicesDetailsRef = useRef<HTMLElement | null>(null);

  const scrollToDetails = () => {
    servicesDetailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const ViewAllButton = () => (
    <button
      onClick={scrollToDetails}
      className="text-sm sm:text-base lg:text-lg font-medium text-orange-500/80 hover:text-sky-600/90 active:text-sky-700 rounded-full px-4 sm:px-6 py-2 sm:py-3 lg:py-4 inline-flex items-center justify-center focus:outline-none btn-mobile transition-all duration-200"
      aria-label="View all services"
    >
      View all services
    </button>
  );

  const serviceList = [
    {
      title: 'Quality vs. Speed',
      detail:
        'Teams often feel stuck between building software that works and getting it out the door fast. Without a solid QA plan, projects drag on because of bugs—or worse, they launch with issues that hurt your reputation and bottom line.',
    },
    {
      title: 'Limited QA Resources',
      detail:
        'Small or distributed teams may lack dedicated QA personnel. We provide on-demand QA engineers and managed testing to fill gaps and scale with your product.',
    },
    {
      title: 'Complex Tech Stacks',
      detail:
        'Modern apps use microservices, multiple runtimes, and third-party APIs. Our engineers design test strategies that cover integrations and surface hidden failures early.',
    },
    {
      title: 'Struggles with Automation',
      detail:
        'Automation reduces manual effort but can be hard to maintain. We build robust test suites that balance speed and reliability while reducing flakiness.',
    },
    {
      title: 'When Bugs Cost More Than Fixes',
      detail:
        'Critical production incidents erode customer trust and revenue. We help implement observability, runbooks, and incident response plans to reduce mean time to resolution.',
    },
    {
      title: 'QA in a Silo',
      detail:
        'When QA is disconnected from development, feedback loops slow. We embed testing earlier in the lifecycle and promote cross-functional ownership.',
    },
    {
      title: 'Testing Too Late in the Cycle',
      detail:
        'Late testing causes rework and release delays. Shift-left practices and CI integration enable faster, safer releases.',
    },
    {
      title: 'Unreliable Test Environments',
      detail:
        'Flaky or mismatched environments create false positives. We standardize environments and use containerization and infrastructure-as-code to ensure parity.',
    },
  ];

  const [selectedService, setSelectedService] = useState<number>(0);
  // ref for experts section scroll target
  const expertsRef = useRef<HTMLElement | null>(null);

  // sample employee / expert data for the new section
  const employees = [
    {
      name: 'Aisha Khan',
      photo: 'https://i.pravatar.cc/160?img=32',
      bio: 'Aisha leads QA engagements with a focus on automation and scalable test architectures. She helps teams adopt maintainable test suites and shift-left practices.',
      expertise: 'Test Automation, CI/CD'
    },
    {
      name: 'Daniel Ruiz',
      photo: 'https://i.pravatar.cc/160?img=12',
      bio: 'Daniel specializes in performance engineering and observability. He profiles systems under load and establishes monitoring to catch regressions early.',
      expertise: 'Performance Testing, Observability'
    },
    {
      name: 'Priya Patel',
      photo: 'https://i.pravatar.cc/160?img=5',
      bio: 'Priya is a senior test engineer experienced in integration testing across microservices and third-party APIs. She builds robust integration suites and test harnesses.',
      expertise: 'Integration Testing, API QA'
    },
    {
      name: 'Marcus Lee',
      photo: 'https://i.pravatar.cc/160?img=16',
      bio: 'Marcus brings a security-first approach to QA. He runs threat modeling sessions and threat-focused test plans to reduce critical vulnerabilities.',
      expertise: 'Security Testing, Threat Modeling'
    },
    {
      name: 'Sofia Martinez',
      photo: 'https://i.pravatar.cc/160?img=48',
      bio: 'Sofia builds test strategies for cross-platform applications and leads accessibility testing to ensure inclusive experiences.',
      expertise: 'Accessibility, Cross-platform QA'
    },
    {
      name: 'Ethan Brown',
      photo: 'https://i.pravatar.cc/160?img=8',
      bio: 'Ethan focuses on test reliability and reducing flakiness. He architects flaky-test-resistant suites and mentors teams on stable test patterns.',
      expertise: 'Flakiness Reduction, Test Reliability'
    },
  ];

  return (
    <main className="light-theme-page">
      {/* Hero: background image for the section under the navbar. Text content unchanged. */}
      <section
        className="full-bleed"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          marginTop: '-32px',
        }}
      >
  {/* dark overlay so white text remains readable */}
  <div style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-16 sm:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8">
              <div className="text-left text-white space-y-4 sm:space-y-6">
              <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight responsive-heading-xl">
                Driving Innovation with
                <br />
                Technology
              </h1>

              {/* sparkles underline effect (keeps text unchanged) */}
              <div className="relative mt-3 sm:mt-4 w-full h-8 sm:h-12">
                <div className="absolute inset-x-0 top-0 h-2 sm:h-3">
                  <SparklesCore
                    background="transparent"
                    minSize={0.6}
                    maxSize={1}
                    particleDensity={300}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                  />
                </div>
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
              </div>

              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl responsive-text">
                Harness the power of cutting-edge solutions to transform businesses, streamline operations, and unlock new opportunities.
              </p>

              <div className="mt-6 sm:mt-8 ml-0 sm:ml-5">
                {/* replaced moving-border button with GlareCard demo */}
                <GlareCardDemo />
              </div>
            </div>

            {/* right column intentionally left blank - background image is applied to the section */}
              <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-3xl lg:max-w-none">
                {/* keep an empty element to preserve layout if needed */}
                <div aria-hidden="true" className="w-full h-64 lg:h-auto"></div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>



            {/* Meteors background: start immediately after the hero/background image section */}
      <div className="relative full-bleed">
          {/* Our Services — with meteors background */}
          <section className="full-bleed py-6 sm:py-10 bg-transparent relative z-10">
            {/* meteors behind this section */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="relative h-full w-full">
                <MeteorsDemo />
              </div>
            </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-orange-500/80 font-bold mb-0 responsive-heading-lg">Our Services</h2>
        <ViewAllButton />
          </div>

          {/* full-bleed card row — no left/right whitespace */}
          <div className="full-bleed w-full mt-4 sm:mt-0 relative">
        {/* marquee: circulating cards from right to left (duplicated for seamless loop) */}
        <div
          ref={marqueeRef}
          className="overflow-hidden w-full marquee touch-pan-x"
          onMouseEnter={pauseMarquee}
          onMouseLeave={resumeMarquee}
          onFocus={pauseMarquee}
          onBlur={resumeMarquee}
          tabIndex={0}
        >
          <div
            className="marquee-track flex gap-3 items-stretch"
            style={{ animation: 'marquee 24s linear infinite' }}
          >
            {services.concat(services).map((svc, idx) => (
          <div key={`card-${idx}`} className="flex-shrink-0">
            <ThreeDCardDemo
              title={svc.title}
              description={svc.description}
              img={svc.img}
              bgClass={svc.bgClass}
              alt={svc.title}
            />
          </div>
            ))}
          </div>

          <style>{`
            .marquee-track { width: max-content; }
            @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
          </div>
        </section>

      {/* Overview Section */}
      <section className="full-bleed py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-slate-900">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                OVERVIEW
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base lg:text-lg leading-relaxed">
              <p className="text-justify">
                MerilSoft Software is a premier New York–based technology consultancy. We deliver Digital Transformation Strategy, Cloud & Automation Solutions, AI & Machine Learning initiatives, and full-stack Product Engineering—alongside Industrial IoT and Embedded Systems integrations—empowering enterprises to modernize infrastructure, streamline operations, and unlock new efficiencies.
              </p>
              
              <p className="text-justify">
                Our Application Services team builds responsive Web & Mobile experiences and bespoke Custom Software, while our Consulting practice offers IT Strategy Consulting, Business Process Optimization, and Digital Marketing expertise. This holistic, end-to-end approach—from strategic planning and prototyping through deployment and ongoing support—ensures measurable ROI, exceptional user experiences, and future-proof platforms tailored to your unique growth objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

                {/* Services details: two-column layout (left = detail, right = selectable list) */}
        <section
          className="full-bleed py-2 bg-transparent relative z-50"
          ref={(el) => { servicesDetailsRef.current = el }}
        >
          <div className="container mx-auto py-24 px-6 lg:px-20">
            {/* Section title matching the attached design */}
            <div className="text-center mb-10">
              <p className="text-lg text-slate-800 dark:text-slate-300 font-medium">Our Services</p>
              <h3 className="mt-2 text-4xl lg:text-5xl font-extrabold text-cyan-700 dark:text-sky-400">Pick which you want to grab</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: selected detail */}
              <div className="lg:col-span-8">
                  <div className="relative bg-card rounded-2xl shadow-lg p-12 min-h-[380px] overflow-hidden">
                    {/* Spotlight background component positioned behind content */}
                    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
                      <SpotlightNewDemo />
                    </div>

                    <div className="relative z-10">
                      <h4 className="text-4xl font-extrabold mb-4 text-foreground">
                        {serviceList[selectedService].title}
                      </h4>
                      <p className="text-muted-foreground mb-8 max-w-2xl">
                        {serviceList[selectedService].detail}
                      </p>
                      <button
                        onClick={() => expertsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className="inline-flex items-center px-6 py-3 bg-orange-500/80 text-white rounded-md shadow-md hover:bg-orange-500"
                        aria-label="Connect with our experts"
                      >
                        Connect with our experts
                      </button>
                    </div>
                  </div>
              </div>

              {/* Right: selectable list */}
              <div className="lg:col-span-4 w-full">
                <div className="rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 bg-sky-100 dark:bg-sky-600/80 text-slate-900 dark:text-slate-100 text-sm font-semibold">
                    Services
                  </div>
                  <ul className="divide-y divide-sky-200 bg-sky-50 dark:bg-slate-900 text-slate-800 dark:text-white">
                    {serviceList.map((svc, idx) => {
                      const isSelected = idx === selectedService;
                      return (
                        <li key={svc.title}>
                          <button
                            onClick={() => setSelectedService(idx)}
                            className={`w-full text-left px-6 py-4 block ${
                              isSelected
                                ? 'bg-orange-400 text-white dark:bg-orange-500/80 dark:text-white'
                                : 'bg-white hover:bg-sky-100 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-white'
                            }`}
                          >
                            {svc.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Experts — employee cards */}
        <section id="experts" ref={(el) => { expertsRef.current = el }} className="full-bleed py-8 sm:py-12 lg:py-16 bg-transparent relative">
          {/* Lamp background for this section (non-interactive) */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="relative h-full w-full">
              <LampContainer className="h-full">{null}</LampContainer>
            </div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="text-center mb-8 sm:mb-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-cyan-700 dark:text-sky-400 responsive-heading-lg">Meet Our Experts</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 responsive-text">Experienced professionals who partner with you to deliver quality, reliability, and scale.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 ">
              {employees.map((emp) => (
              <div
                key={emp.name}
                className="group relative border border-slate-200 dark:border-transparent rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm flex flex-col sm:flex-row gap-3 sm:gap-4 items-start transform hover:scale-105 hover:shadow-lg cursor-pointer min-h-[200px] sm:min-h-[160px] md:min-h-[180px] 
                     bg-gray-50 dark:bg-slate-800 hover:shadow-orange-500/40 transition-all duration-200 active:scale-95 mobile-card btn-mobile"
              >
                <img
                src={emp.photo}
                alt={emp.name}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover flex-shrink-0 transition-transform duration-200 group-hover:scale-105 mx-auto sm:mx-0"
                />
                <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <h4 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-white">{ emp.name}</h4>
                  <span className="text-xs font-medium text-cyan-700 dark:text-sky-400 group-hover:text-white/90 whitespace-nowrap">{emp.expertise}</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground group-hover:text-white/90 responsive-text">{emp.bio}</p>
                </div>
                {/* Appointment button: inline on small screens, absolute bottom-right on md+ */}
                <div className="mt-4 sm:mt-6 md:mt-0 md:absolute md:right-6 md:bottom-2 z-20 w-full sm:w-auto flex justify-center sm:justify-start">
                  <MovingBorderButton
                  borderRadius="0.60rem"
                  duration={3000}
                  containerClassName="h-auto w-auto p-[3px]" // increased border width from 1px -> 3px
                  borderClassName="h-8 w-24 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.9)_40%,transparent_60%)] bg-repeat bg-[length:180%_180%] animate-moveBorder"
                  className="px-3 py-1 text-sm bg-orange-500/80 text-white rounded-md shadow hover:bg-orange-500"
                  aria-label={`Book appointment with ${emp.name}`}
                  onClick={openAppointment}
                  >
                  For Appoinment
                  </MovingBorderButton>
                </div>
              </div>
              ))}
            </div>
          </div>
        </section>

               {/* New full-bleed background-lines section (placed after Meet Our Experts) */}
        <section className="full-bleed py-16 bg-transparent relative">
          <BackgroundLinesDemo />
        </section>
                {/* Partners / ecosystem logos */}
        <section className="full-bleed bg-transparent relative">
          <Partners />
        </section>
        {/* News & Notices section */}
        <section className="full-bleed bg-transparent relative">
          <div>
            <NewsNotice />
          </div>
        </section>

        {/* FAQ / Common Questions */}
        <section className="full-bleed bg-transparent relative">
          <FAQ />
        </section>
        <section
          style={{
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)',
            marginRight: 'calc(50% - 50vw)'
          }}
          className="bg-transparent relative"
        >
          <div className="container mx-auto px-6 lg:px-20 pt-12">
            <TopEmployees />
          </div>
        </section>
        
          {/* Footer (compact gap to TopEmployees) */}
          <footer className="bg-gradient-to-r from-slate-800 via-sky-900 to-slate-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-8 sm:py-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 md:gap-9">
                <div className="sm:col-span-2 md:col-span-4">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-2xl sm:text-3xl text-orange-400 font-extrabold tracking-wider">MerilSoft</div>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-200 max-w-sm">
                        A team of 400+ experts delivering comprehensive end-to-end solutions combining power, functionality, and reliability with flexibility, agility, and usability.
                      </p>

                      <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-slate-200 space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span>sales@thinksys.com</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span>+1-408-837-5515</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
                  <ul className="text-xs sm:text-sm text-slate-200 space-y-1.5 sm:space-y-2">
                    <li>Front end Development</li>
                    <li>iOS App Development</li>
                    <li>Blockchain Development</li>
                    <li>Retail Development</li>
                    <li>QA OutSourcing</li>
                  </ul>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
                  <ul className="text-xs sm:text-sm text-slate-200 space-y-1.5 sm:space-y-2">
                    <li>Blogs</li>
                    <li>Press Releases</li>
                    <li>Price Structure</li>
                    <li>Case Studies</li>
                    <li>QA Calculator</li>
                  </ul>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">About Us</h4>
                  <ul className="text-xs sm:text-sm text-slate-200 space-y-1.5 sm:space-y-2">
                    <li>Philosophy and Team</li>
                    <li>Life at ThinkSys</li>
                    <li>Careers</li>
                  </ul>
                </div>

                <div className="md:col-span-2 flex flex-col justify-between gap-4 sm:gap-0">
                  <div>
                    <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
                    <div className="flex items-center gap-3 sm:gap-4 text-slate-200">
                      <a aria-label="facebook" href="#" className="hover:text-white text-sm sm:text-base">FB</a>
                      <a aria-label="instagram" href="#" className="hover:text-white text-sm sm:text-base">IG</a>
                      <a aria-label="linkedin" href="#" className="hover:text-white text-sm sm:text-base">IN</a>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <div className="bg-white text-slate-800 inline-block px-2.5 sm:px-3 py-1.5 sm:py-2 rounded shadow">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="text-sm font-bold">5.0/5</div>
                          <div className="text-xs text-slate-600">18 reviews</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700">
              <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 text-xs sm:text-sm text-slate-300">
                <div className="text-center sm:text-left">© {new Date().getFullYear()} ThinkSys Inc. All rights reserved.</div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <a href="#" className="hover:text-white">Privacy Policy</a>
                  <a href="#" className="hover:text-white">Terms and Conditions</a>
                </div>
              </div>
            </div>
          </footer>

        </div>

        {/* Appointment Modal */}
        <SimpleModal open={isAppointmentOpen} onClose={closeAppointment} title="Book an Appointment">
          <AppointmentForm onSubmit={() => closeAppointment()} />
        </SimpleModal>

    </main>
  )
}
