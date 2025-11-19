import React from "react";

const partners = [
  { name: 'AWS', src: '/aws.jpg', alt: 'AWS' },
  { name: 'Google Cloud', src: '/google-cloud.png', alt: 'Google Cloud' },
  { name: 'IBM', src: '/ibm.jpg', alt: 'IBM' },
  { name: 'Microsoft', src: '/microsoft.png', alt: 'Microsoft' },
];

export default function Partners() {
  return (
    <section className="container mx-auto px-6 lg:px-20 py-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">Strong Partner Ecosystem</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
        {partners.map((p) => (
          <div key={p.name} className="max-w-[200px] w-full flex items-center justify-center py-4">
            <img src={p.src} alt={p.alt} className="max-h-12 object-contain opacity-95" />
          </div>
        ))}
      </div>
    </section>
  );
}
