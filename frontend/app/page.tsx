"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import MouseGlow from "@/components/MouseGlow";
import Reveal from "@/components/Reveal";

import {
  Brain,
  Shield,
  Cpu,
  Sparkles,
  Database,
  Bot,
} from "lucide-react";

export default function Home() {

  const cards = [
    {
      title: "AI Automation",
      desc: "Automate workflows with intelligent AI systems and next-gen productivity tools.",
      icon: <Brain size={34} />,
    },
    {
      title: "Cyber Security",
      desc: "Advanced GhostNet protection with secure architecture and intelligent threat monitoring.",
      icon: <Shield size={34} />,
    },
    {
      title: "Neural Processing",
      desc: "Lightning-fast AI processing powered by modern scalable infrastructure.",
      icon: <Cpu size={34} />,
    },
    {
      title: "Smart Assistants",
      desc: "Deploy AI assistants capable of handling tasks, chats, and real-time interactions.",
      icon: <Bot size={34} />,
    },
    {
      title: "AI Intelligence",
      desc: "Generate insights using large language models and intelligent decision systems.",
      icon: <Sparkles size={34} />,
    },
    {
      title: "Cloud Database",
      desc: "Store and manage scalable AI memory systems with cloud-native architecture.",
      icon: <Database size={34} />,
    },
  ];

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        text-white
      "
    >

      {/* Background */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-cyan-950
          via-black
          to-purple-950
        "
      />

      {/* Glow */}
      <MouseGlow />

      {/* Navbar */}
      <Navbar />

      {/* HERO */}
      <section
        className="
          relative
          z-10
          flex
          items-center
          justify-center
          px-6
          pt-28
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="
            max-w-4xl
            w-full
            rounded-[40px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-[0_0_60px_rgba(0,255,255,0.08)]
            p-12
            text-center
          "
        >

          <motion.h1
            initial={{
              y: 40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 1,
            }}
            className="
              text-6xl
              md:text-8xl
              font-black
              tracking-tight
              mb-6
            "
          >
            GhostNet AI
          </motion.h1>

          <motion.p
            initial={{
              y: 30,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.4,
              duration: 1,
            }}
            className="
              text-lg
              md:text-2xl
              text-gray-300
              leading-relaxed
              max-w-3xl
              mx-auto
            "
          >
            Futuristic AI automation platform designed for intelligent
            workflows, smart assistants, and next-generation productivity.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
            }}
            className="
              mt-10
              flex
              flex-wrap
              justify-center
              gap-5
            "
          >

            {/* Launch App */}
            <Link
              href="/dashboard"
              className="
                px-8
                py-4
                rounded-2xl
                bg-cyan-400
                text-black
                font-bold
                text-lg
                hover:scale-105
                transition
                shadow-[0_0_30px_rgba(0,255,255,0.5)]
              "
            >
              Launch App
            </Link>

            {/* Learn More */}
            <button
              className="
                px-8
                py-4
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                hover:bg-white/10
                transition
                text-lg
                font-semibold
              "
            >
              Learn More
            </button>

          </motion.div>

        </motion.div>

      </section>

      {/* FEATURES */}
      <section
        className="
          relative
          z-10
          px-6
          py-28
        "
      >

        <Reveal>

          <div className="text-center mb-20">

            <h2 className="text-5xl font-black mb-6">
              AI Infrastructure
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Production-ready AI systems built with modern full-stack
              architecture, intelligent APIs, and scalable cloud services.
            </p>

          </div>

        </Reveal>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
            max-w-7xl
            mx-auto
          "
        >

          {cards.map((card, index) => (

            <Reveal key={index}>

              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-8
                  shadow-xl
                  hover:border-cyan-400/30
                  transition
                "
              >

                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    hover:opacity-100
                    transition
                    bg-gradient-to-br
                    from-cyan-400/10
                    to-purple-500/10
                  "
                />

                <div className="relative z-10">

                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-cyan-400/10
                      border
                      border-cyan-400/20
                      flex
                      items-center
                      justify-center
                      text-cyan-300
                      mb-6
                    "
                  >
                    {card.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {card.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {card.desc}
                  </p>

                </div>

              </motion.div>

            </Reveal>

          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer
        className="
          relative
          z-10
          border-t
          border-white/10
          py-8
          text-center
          text-gray-500
        "
      >
        © 2026 GhostNet AI — Production Ready AI Platform
      </footer>

    </main>
  );
}