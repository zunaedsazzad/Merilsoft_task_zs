"use client";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

type SimpleModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function SimpleModal({ open, onClose, title, children }: SimpleModalProps) {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;
  const portalTarget = typeof window !== "undefined" ? document.body : null;
  if (!portalTarget || !open) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-[101] w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-900">
        {title ? (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        ) : null}
        {children}
      </div>
    </div>,
    portalTarget
  );
}
