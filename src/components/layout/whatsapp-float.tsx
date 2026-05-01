"use client";

import { MessageCircle } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { motion, useReducedMotion } from "framer-motion";

export function WhatsAppFloat() {
  const site = useSite();
  const reduce = useReducedMotion();
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
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
