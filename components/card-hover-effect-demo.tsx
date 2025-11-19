import { HoverEffect } from "./ui/card-hover-effect";

export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-1">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Stripe",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://stripe.com",
    icon: "./stripe.jpg",
  },
  {
    title: "Netflix",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://netflix.com",
    icon: "./n.png",
  },
  {
    title: "Google",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://google.com",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  },
  {
    title: "Meta",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://meta.com",
    icon: "m.jpg",
  },
  {
    title: "Amazon",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://amazon.com",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    title: "Microsoft",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://microsoft.com",
    icon: "./mic.png",
  },
  // repeat / extend to reach 16 cards (4 cols x 4 rows)
].concat([
  {
    title: "Stripe",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://stripe.com",
    icon: "./stripe.jpg",
  },
  {
    title: "Netflix",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://netflix.com",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg",
  },
  {
    title: "Google",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://google.com",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  },
  {
    title: "Meta",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://meta.com",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/meta.svg",
  },
  {
    title: "Amazon",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://amazon.com",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    title: "Microsoft",
    description: "Trusted technology partner for infrastructure and software.",
    link: "https://microsoft.com",
    icon: "./mic.png",
  },
]);
