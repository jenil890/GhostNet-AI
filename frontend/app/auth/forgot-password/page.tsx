"use client";

import {
  useState,
} from "react";

import {
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  auth,
} from "../../../lib/firebase";

import AuthLayout from "../../../components/AuthLayout";

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleReset =
    async () => {

      try {

        await sendPasswordResetEmail(
          auth,
          email
        );

        setMessage(
          "Password reset email sent."
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Reset your GhostNet password."
    >

      <div className="space-y-5">

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

        <button
          onClick={handleReset}
          className="
            w-full
            py-4
            rounded-2xl
            bg-cyan-400
            text-black
            font-bold
          "
        >
          Send Reset Link
        </button>

        {message && (

          <p className="text-green-400 text-sm">
            {message}
          </p>

        )}

      </div>

    </AuthLayout>
  );
}