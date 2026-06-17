"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function WhatsAppFloat({ whatsapp }: { whatsapp?: string }) {
  const reduce = useReducedMotion();
  const number = whatsapp || "918851037172";
  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hi Search Modifiers — I'd like to discuss a growth project."
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/40 transition hover:scale-105 hover:shadow-xl sm:right-6"
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
    </motion.a>
  );
}
