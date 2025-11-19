"use client";
import React from "react";

function CardSpotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className ?? ""}>{children}</div>;
}

const employees = [
    {
        id: 1,
        name: "Emma C.",
        role: "Director of Engineering",
        company: "Mid-Sized SaaS Leader",
        avatar: "https://i.pravatar.cc/400?img=32",
        testimonial:
            "Working with ThinkSys transformed the way we handle QA. In just three months, they reduced our critical bug rate by 65%, leading to smoother releases and happier users.",
    },
    {
        id: 2,
        name: "Lisa A.",
        role: "CEO",
        company: "Professional Training and Coaching",
        avatar: "https://i.pravatar.cc/400?img=47",
        testimonial:
            "Your team is so great - I love them. We are making progress on SOC2, and on revenue/Customer acquisition we are also making progress.",
    },
    {
        id: 3,
        name: "Jared M.",
        role: "VP of Product",
        company: "FinTech Provider",
        avatar: "https://i.pravatar.cc/400?img=12",
        testimonial:
            "ThinkSys helped us meet strict compliance and security standards without slowing down our deployment pipeline. Their QA expertise has become an integral part of our DevOps cycle.",
    },
];

export default function TopEmployees() {
  return (
    <section className="container mx-auto px-6 lg:px-20 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-5xl font-extrabold">
          Building Trust & Demonstrating Expertise: 
          <span className="block text-sky-500">Our Commitment to Your Quality Success</span>
        </h2>
        <p className="mt-3 text-sm text-slate-600">Here's why leading enterprises and mid-market companies trust ThinkSys with their QA needs:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {employees.map((e) => (
          <div key={e.id} className="relative">
            <div className="mx-auto max-w-xs">
              <div className="rounded-md bg-slate-800 dark:bg-slate-700 px-6 py-2 mb-4 flex justify-center shadow-sm">
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .587l3.668 7.431L23.4 9.748l-5.7 5.557L19.335 24 12 19.897 4.665 24l1.636-8.695L.6 9.748l7.732-1.73L12 .587z"/>
                    </svg>
                  ))}
                </div>
              </div>

              <CardSpotlight className="w-full h-auto rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                <div className="relative z-20 text-left">
                  <div className="flex items-center gap-4">
                    <img src={e.avatar} alt={e.name} className="h-20 w-20 rounded-full object-cover border-4 border-slate-100 dark:border-white shadow-md" />
                    <div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">{e.name}</div>
                      <div className="text-sm text-slate-700 dark:text-slate-200">{e.role}</div>
                      <div className="text-sm italic text-cyan-700 dark:text-sky-200">{e.company}</div>
                    </div>
                  </div>

                  <p className="mt-4 text-slate-800 dark:text-white text-sm leading-relaxed">{e.testimonial}</p>
                </div>
              </CardSpotlight>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
