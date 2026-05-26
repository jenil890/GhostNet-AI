"use client";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../../../lib/firebase";

import {
  useRouter,
} from "next/navigation";

import AuthLayout from "../../../components/AuthLayout";

import {
  LogIn,
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // Google Login
  const handleGoogleLogin =
    async () => {

      try {

        await signInWithPopup(
          auth,
          googleProvider
        );

        router.push("/chat");

      } catch (error) {

        console.log(error);

      }
    };

  // Email Login
  const handleLogin =
    async () => {

      try {

        setLoading(true);

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        router.push("/chat");

      } catch (error) {

        console.log(error);

      }

      setLoading(false);
    };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue using GhostNet AI."
    >

      <div className="space-y-5">

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            bg-black/30
            border
            border-white/10
            rounded-2xl
            px-5
            py-4
            outline-none
          "
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            bg-black/30
            border
            border-white/10
            rounded-2xl
            px-5
            py-4
            outline-none
          "
        />

        {/* Forgot */}
        <div className="text-right">

          <Link
            href="/auth/forgot-password"
            className="
              text-sm
              text-cyan-400
            "
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            py-4
            rounded-2xl
            bg-cyan-400
            text-black
            font-bold
            hover:scale-[1.02]
            transition
          "
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* Divider */}
        <div
          className="
            flex
            items-center
            gap-3
            py-2
          "
        >

          <div className="flex-1 h-[1px] bg-white/10" />

          <span className="text-gray-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-[1px] bg-white/10" />

        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="
            w-full
            py-4
            rounded-2xl
            bg-white
            text-black
            font-bold
            hover:scale-[1.02]
            transition
            flex
            items-center
            justify-center
            gap-3
          "
        >

          <LogIn size={20} />

          Continue with Google

        </button>

      </div> 

      <p className="text-gray-400 mt-8 text-center">

        Don&apos;t have an account?{" "}

        <Link
          href="/auth/signup"
          className="text-cyan-400"
        >
          Sign Up
        </Link>

      </p>

    </AuthLayout>
  );
}