"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  MessageSquare,
  Brain,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={22} />,
    },
    {
      name: "AI Chat",
      href: "/chat",
      icon: <MessageSquare size={22} />,
    },
    {
      name: "AI Agents",
      href: "/agents",
      icon: <Brain size={22} />,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <BarChart3 size={22} />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings size={22} />,
    },
  ];

  return (
    <aside
      className="
        w-[280px]
        border-r
        border-white/10
        bg-black/40
        backdrop-blur-2xl
        flex
        flex-col
        p-6
      "
    >

      {/* Logo */}
      <div className="mb-14">

        <Link
          href="/"
          className="
            text-4xl
            font-black
            tracking-tight
            bg-gradient-to-r
            from-cyan-400
            to-purple-500
            bg-clip-text
            text-transparent
          "
        >
          GhostNet
        </Link>

        <p className="text-gray-500 text-sm mt-2">
          AI Operating System
        </p>

      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">

        {links.map((link, index) => {

          const active =
            pathname === link.href;

          return (

            <Link
              key={index}
              href={link.href}
              className={`
                relative
                overflow-hidden
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                transition-all
                duration-300
                border
                group
                ${
                  active
                    ? "bg-cyan-400 text-black border-cyan-300 shadow-[0_0_25px_rgba(0,255,255,0.3)]"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }
              `}
            >

              {/* Hover Glow */}
              {!active && (
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition
                    bg-gradient-to-r
                    from-cyan-400/10
                    to-purple-500/10
                  "
                />
              )}

              <div className="relative z-10">
                {link.icon}
              </div>

              <span
                className="
                  relative
                  z-10
                  font-semibold
                  text-[15px]
                "
              >
                {link.name}
              </span>

            </Link>

          );
        })}

      </nav>

      {/* Bottom Card */}
      <div
        className="
          mt-auto
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-br
          from-cyan-500/10
          to-purple-500/10
          p-6
        "
      >

        <h3 className="text-xl font-bold mb-3">
          GhostNet AI
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-5">
          Intelligent automation platform for futuristic AI workflows.
        </p>

        <button
          className="
            w-full
            py-3
            rounded-2xl
            bg-cyan-400
            text-black
            font-bold
            hover:scale-105
            transition
          "
        >
          Upgrade
        </button>

      </div>

    </aside>
  );
}