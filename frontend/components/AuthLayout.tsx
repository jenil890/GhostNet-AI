"use client";

import Link from "next/link";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        relative
        overflow-hidden
        px-6
      "
    >

      {/* Glow */}
      <div
        className="
          absolute
          top-[-200px]
          left-[-200px]
          w-[500px]
          h-[500px]
          bg-cyan-500/20
          blur-[140px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-[-200px]
          right-[-200px]
          w-[500px]
          h-[500px]
          bg-purple-500/20
          blur-[140px]
          rounded-full
        "
      />

      {/* Card */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-xl
          bg-white/5
          border
          border-white/10
          backdrop-blur-2xl
          rounded-[40px]
          p-10
          shadow-[0_0_80px_rgba(0,0,0,0.6)]
        "
      >

        {/* Logo */}
        <Link
          href="/"
          className="
            inline-block
            mb-8
          "
        >

          <h1
            className="
              text-6xl
              font-black
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              bg-clip-text
              text-transparent
            "
          >
            GhostNet
          </h1>

        </Link>

        {/* Heading */}
        <div className="mb-10">

          <h2
            className="
              text-5xl
              font-black
              mb-4
            "
          >
            {title}
          </h2>

          <p
            className="
              text-gray-400
              text-lg
            "
          >
            {subtitle}
          </p>

        </div>

        {/* Content */}
        {children}

      </div>

    </main>
  );
}