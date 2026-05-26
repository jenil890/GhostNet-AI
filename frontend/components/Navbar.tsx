"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-3 left-1/2 z-50 flex h-14 w-[88%] max-w-4xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 backdrop-blur-2xl"
    >
      {/* Logo */}
      <h1 className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
        GhostNet AI
      </h1>

      {/* Links */}
      <div className="hidden items-center gap-6 text-xs text-gray-300 md:flex">

        <a
          href="#"
          className="transition hover:text-cyan-400"
        >
          Features
        </a>

        <a
          href="#"
          className="transition hover:text-cyan-400"
        >
          Architecture
        </a>

        <a
          href="#"
          className="transition hover:text-cyan-400"
        >
          Dashboard
        </a>

      </div>

      {/* Button */}
      <button className="rounded-full bg-cyan-400 px-4 py-1.5 text-xs font-medium text-black transition hover:scale-105 hover:bg-cyan-300">
        Launch
      </button>
    </motion.nav>
  );
}