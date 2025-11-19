"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AppointmentFormProps = {
  services?: string[];
  onSubmit?: (data: Record<string, string>) => void;
};

const defaultServices = [
  "Managed IT Support",
  "Cloud Migration",
  "Cybersecurity",
  "Custom Software",
  "Data & Analytics",
  "IT Consulting",
];

export default function AppointmentForm({ services = defaultServices, onSubmit }: AppointmentFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload: Record<string, string> = Object.fromEntries(data.entries()) as any;
    onSubmit?.(payload);
    // UI-only per request: no further action
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LabelInputContainer>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Jane Doe" type="text" required />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="jane@company.com" type="email" required />
        </LabelInputContainer>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LabelInputContainer>
          <Label htmlFor="contact">Contact</Label>
          <Input id="contact" name="contact" placeholder="+1 555 123 4567" type="tel" />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="service">Select Service</Label>
          <div className="group/input rounded-lg p-[2px] transition duration-300">
            <select
              id="service"
              name="service"
              className={cn(
                "shadow-input dark:placeholder-text-neutral-600 h-10 w-full rounded-md border-none bg-gray-50 px-3 text-sm text-black outline-none ring-0 focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600"
              )}
              defaultValue={services[0]}
            >
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </LabelInputContainer>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LabelInputContainer>
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" required />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="time">Time</Label>
          <Input id="time" name="time" type="time" required />
        </LabelInputContainer>
      </div>

      <LabelInputContainer>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          placeholder="Briefly describe your needs"
          rows={4}
          className={cn(
            "shadow-input w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600"
          )}
        />
      </LabelInputContainer>

      <button
        type="submit"
        className="group/btn relative h-10 w-full rounded-md bg-gradient-to-br from-orange-500 to-orange-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff30_inset,0px_-1px_0px_0px_#ffffff30_inset] hover:brightness-105 dark:from-orange-600 dark:to-amber-500"
      >
        Appoinment Request
        <BottomGradient />
      </button>
    </form>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

function LabelInputContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
}
