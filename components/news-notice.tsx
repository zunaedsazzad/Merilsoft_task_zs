"use client";
import React, { useState } from "react";
import { Button as AccentButton } from "@/components/ui/moving-border";
import TopEmployees from "@/components/top-employees";

const notices = [
  {
    id: 1,
    title: "Company Achieves ISO Certification",
    date: "2025-11-01",
    summary:
      "We are proud to announce our ISO 9001 certification for quality management — reinforcing our commitment to reliable delivery.",
  },
  {
    id: 2,
    title: "New Office Opening in Dhaka",
    date: "2025-10-20",
    summary:
      "Our new regional office expands our local presence and provides a larger hub for client collaboration and hiring.",
  },
  {
    id: 3,
    title: "Quarterly Product Update Released",
    date: "2025-09-30",
    summary:
      "The Q3 product release includes performance improvements and new monitoring dashboards for customers.",
  },
  {
    id: 4,
    title: "Free Webinar: Modern QA Practices",
    date: "2025-09-10",
    summary:
      "Join our experts for a free webinar on shift-left testing, automation, and observability best practices.",
  },
  {
    id: 5,
    title: "Community Hackathon Winners",
    date: "2025-08-22",
    summary:
      "Congratulations to the winners of our annual hackathon — innovative projects addressing accessibility and performance.",
  },
  {
    id: 6,
    title: "Partnership with CloudProviderX",
    date: "2025-07-15",
    summary:
      "We partnered with CloudProviderX to offer optimized cloud migration packages for enterprise customers.",
  },
];

export default function NewsNotice() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <>
    <section className="container mx-auto px-6 lg:px-20 py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-sky-700">News & Notices</h2>
        <p className="mt-2 text-sm text-slate-600">Latest updates, announcements and important notices.</p>
      </div>

    <div className="rounded-2xl bg-gradient-to-tl from-amber-700 from- via-sky-900 via- to-slate-900 to-shadow-lg p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left: list */}
        <div className="md:col-span-4">
        {/* shrink visual size without changing grid allocation */}
        <div className="bg-gray-900 text-white rounded-2xl p-4 shadow-inner transform scale-90 origin-left">
          <ul className="divide-y divide-white/10">
            {notices.map((n, idx) => {
            const active = idx === selected;
            return (
              <li key={n.id}>
                <button
                onClick={() => setSelected(idx)}
                className={`w-full text-left flex items-center gap-3 py-4 px-3 rounded-xl transition-colors duration-150 ${
                  active ? "bg-gradient-to-br from-orange-600 from- via-gray-900 via- to-slate-900 to-75% text-white" : "text-white/90 hover:bg-gradient-to-br from-orange-600 from- via-sky-900 via- to-slate-900 to-75%"
                }`}
                >
                <span className={`w-2 h-10 rounded-r-md ${active ? "bg-orange-400" : "bg-transparent"}`} aria-hidden />
                <div className="flex-1">
                  <div className="text-sm font-semibold truncate">{n.title}</div>
                  <div className="text-xs text-white/70 mt-1">{n.date}</div>
                </div>
                </button>
              </li>
            );
            })}
          </ul>
        </div>
        </div>

          {/* Right: detail */}
          <div className="md:col-span-8">
            {/* gradient border wrapper */}
            <div className="relative w-11/12 mx-auto group">
              <div className="absolute -inset-[2px] rounded-2xl bg-[conic-gradient(from_180deg,theme(colors.cyan.400),theme(colors.orange.400),theme(colors.sky.500),theme(colors.cyan.400))] opacity-30 blur-[2px] " />

              {/* content card */}
              <div key={selected} className="relative rounded-2xl bg-white/85 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/70 dark:border-white/10 p-6 md:p-8 shadow-[0_10px_30px_rgba(2,6,23,0.08)] overflow-hidden animate-fade-in-up">
                {/* soft glows */}
                <div className="pointer-events-none absolute -top-24 -right-10 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {notices[selected].title}
                </h3>
                <div className="mt-1 h-[3px] w-20 rounded-full bg-gradient-to-r from-cyan-500 to-orange-400 animate-underline" />

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{notices[selected].date}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">
                  {notices[selected].summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <AccentButton borderRadius="0.8rem" aria-label="Read more about this notice">
                    Read More
                  </AccentButton>
                  <a href="#" className="text-sm text-cyan-700 dark:text-slate-300 hover:underline">
                    View All Notices
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>


    </>
  );
}
