"use client";
import React, { useState } from "react";

const faqs = [
    {
        q: "What makes our software engineering services different?",
        a: "We combine experienced engineering teams, strong QA discipline, and a product-focused mindset to deliver reliable, maintainable software tailored to your business goals.",
    },
    {
        q: "How do you approach test automation?",
        a: "We build maintainable test suites that run in CI, prioritise stable selectors and resilient assertions, and balance end-to-end and API-level tests for speed and coverage.",
    },
    {
        q: "Will your team fit into our current Agile or DevOps process?",
        a: "Yes — our engineers and testers embed into existing teams and workflows, adopt your CI/CD pipelines, and work with your tools and practices.",
    },
    {
        q: "How long does it typically take to deliver a project?",
        a: "Timelines vary with scope; after a short discovery we provide a roadmap with milestones. Small projects can be delivered in weeks, while medium-to-large efforts often take 3–6 months or more with incremental releases.",
    },
    {
        q: "How do you handle security and data privacy?",
        a: "We follow secure-coding best practices, perform security reviews and automated scans (SAST/DAST), use encryption for data in transit and at rest, and can comply with GDPR/industry requirements and NDAs as needed.",
    },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="container mx-auto px-6 lg:px-20 py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 via-sky-700 to-orange-600 dark:from-sky-300 dark:via-sky-400 dark:to-cyan-300">Frequently Asked Questions</h2>
        <p className="mt-2 text-lg text-slate-700 dark:text-slate-300">Common questions about our software and services.</p>
      </div>

      <div className="max-w-4xl mx-auto bg-white/95 dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((f, idx) => {
            const open = openIndex === idx;
            return (
              <div key={idx} className={`transition-colors duration-200 border-l-4 ${open ? 'bg-gradient-to-r from-cyan-50 to-orange-50 dark:from-slate-800/40 dark:to-slate-800/20 border-cyan-500' : 'hover:bg-sky-50 dark:hover:bg-slate-800/30 border-transparent'}`}>
                <button
                  onClick={() => setOpenIndex(open ? null : idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                  aria-expanded={open}
                >
                  <span className="text-slate-900 dark:text-slate-100 font-semibold">{f.q}</span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 ${open ? ' bg-gradient-to-br from-slate-600 to-orange-500 text-white' : 'bg-white dark:bg-slate-900 text-cyan-600'}`}>
                    <svg className={`w-4 h-4 transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                <div className={`px-6 pb-6 mb-4 transition-max-h duration-300 overflow-hidden ${open ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="text-sm text-slate-800 dark:text-slate-300">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
