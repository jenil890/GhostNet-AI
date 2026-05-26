"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  LayoutDashboard,
  MessageSquare,
  Brain,
  Settings,
  LogOut,
  User,
  Shield,
} from "lucide-react";

import {
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";

import {
  auth,
} from "../lib/firebase";

import {
  useEffect,
  useState,
} from "react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname =
    usePathname();

  const router =
    useRouter();

  const [user, setUser] =
    useState<FirebaseUser | null>(
      null
    );

  // Load User
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);
        }
      );

    return () =>
      unsubscribe();

  }, []);

  // Logout
  const handleLogout =
    async () => {

      await signOut(auth);

      router.push(
        "/auth/login"
      );
    };

  // Sidebar Links
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "AI Chat",
      href: "/chat",
      icon: MessageSquare,
    },
    {
      label: "URL Scanner",
      href: "/scanner",
      icon: Shield,
    },
    {
      label: "AI Agents",
      href: "#",
      icon: Brain,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        flex
      "
    >

      {/* Sidebar */}
      <aside
        className="
          w-[320px]
          border-r
          border-white/10
          bg-black
          relative
          overflow-y-auto
          hidden
          lg:flex
          flex-col
        "
      >

        {/* Glow */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-cyan-950/20
            via-black
            to-purple-950/20
          "
        />

        {/* Sidebar Content */}
        <div
          className="
            relative
            z-10
            p-6
            flex
            flex-col
            min-h-screen
          "
        >

          {/* Logo */}
          <Link
            href="/dashboard"
            className="mb-10"
          >

            <h1
              className="
                text-5xl
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

            <p
              className="
                text-gray-500
                mt-3
              "
            >
              Predictive Cyber Threat Intelligence
            </p>

          </Link>

          {/* Navigation */}
          <div className="space-y-4">

            {links.map((link) => {

              const Icon =
                link.icon;

              const active =
                pathname ===
                link.href;

              return (

                <Link
                  key={link.label}
                  href={link.href}
                  className={`
                    flex
                    items-center
                    gap-4
                    px-6
                    py-5
                    rounded-3xl
                    border
                    transition-all
                    duration-300
                    ${
                      active
                        ? "bg-cyan-400 text-black border-cyan-300"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }
                  `}
                >

                  <Icon size={28} />

                  <span
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    {link.label}
                  </span>

                </Link>

              );
            })}

          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* USER PROFILE */}
          {
            user && (

              <div
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-5
                  mt-8
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    mb-5
                  "
                >

                  {/* Avatar */}
                  <div
                    className="
                      w-16
                      h-16
                      rounded-full
                      overflow-hidden
                      bg-cyan-400
                      flex
                      items-center
                      justify-center
                    "
                  >

                    {
                      user.photoURL ? (

                        <img
                          src={
                            user.photoURL
                          }
                          alt="Profile"
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />

                      ) : (

                        <User
                          size={30}
                          className="
                            text-black
                          "
                        />

                      )
                    }

                  </div>

                  {/* User Info */}
                  <div className="overflow-hidden">

                    <h2
                      className="
                        text-lg
                        font-bold
                        truncate
                      "
                    >
                      {
                        user.displayName ||
                        "User"
                      }
                    </h2>

                    <p
                      className="
                        text-sm
                        text-gray-400
                        truncate
                      "
                    >
                      {user.email}
                    </p>

                  </div>

                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-3
                    bg-red-500/20
                    border
                    border-red-500/20
                    hover:bg-red-500
                    hover:text-white
                    transition
                    py-4
                    rounded-2xl
                    font-bold
                  "
                >

                  <LogOut size={20} />

                  Logout

                </button>

              </div>

            )
          }

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <section
        className="
          flex-1
          overflow-y-auto
        "
      >

        {children}

      </section>

    </main>
  );
}