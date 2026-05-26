"use client";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  auth,
} from "../../../lib/firebase";

import {
  useRouter,
} from "next/navigation";

import AuthLayout from "../../../components/AuthLayout";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";

export default function SignupPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // Password Strength
  const getPasswordStrength = () => {

    if (password.length < 6) {

      return {
        text: "Weak",
        color: "bg-red-500",
      };
    }

    if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.length >= 8
    ) {

      return {
        text: "Strong",
        color: "bg-green-500",
      };
    }

    return {
      text: "Medium",
      color: "bg-yellow-500",
    };
  };

  const strength =
    getPasswordStrength();

  // Signup
  const handleSignup =
    async () => {

      setError("");

      if (
        password !==
        confirmPassword
      ) {

        setError(
          "Passwords do not match."
        );

        return;
      }

      try {

        setLoading(true);

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        router.push(
          "/chat"
        );

      } catch (err: any) {

        setError(
          err.message
        );

      }

      setLoading(false);
    };

  return (

    <AuthLayout
      title="Create Account"
      subtitle="Join GhostNet AI"
    >

      {/* Email */}
      <div className="mb-5">

        <div
          className="
            flex
            items-center
            gap-3
            bg-white/5
            border
            border-white/10
            rounded-2xl
            px-4
          "
        >

          <Mail
            className="
              text-cyan-400
            "
            size={20}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              w-full
              bg-transparent
              py-4
              outline-none
            "
          />

        </div>

      </div>

      {/* Password */}
      <div className="mb-3">

        <div
          className="
            flex
            items-center
            gap-3
            bg-white/5
            border
            border-white/10
            rounded-2xl
            px-4
          "
        >

          <Lock
            className="
              text-cyan-400
            "
            size={20}
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              bg-transparent
              py-4
              outline-none
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >

            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}

          </button>

        </div>

        {/* Strength */}
        {
          password.length > 0 && (

            <div className="mt-3">

              <div
                className="
                  w-full
                  h-2
                  rounded-full
                  bg-white/10
                  overflow-hidden
                "
              >

                <div
                  className={`
                    h-full
                    transition-all
                    duration-300
                    ${strength.color}
                  `}
                  style={{
                    width:
                      strength.text ===
                      "Weak"
                        ? "33%"
                        : strength.text ===
                          "Medium"
                        ? "66%"
                        : "100%",
                  }}
                />

              </div>

              <p
                className="
                  text-sm
                  text-gray-400
                  mt-2
                "
              >
                Password Strength:
                {" "}
                {strength.text}
              </p>

            </div>

          )
        }

      </div>

      {/* Confirm Password */}
      <div className="mb-6">

        <div
          className="
            flex
            items-center
            gap-3
            bg-white/5
            border
            border-white/10
            rounded-2xl
            px-4
          "
        >

          <Lock
            className="
              text-cyan-400
            "
            size={20}
          />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="
              w-full
              bg-transparent
              py-4
              outline-none
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >

            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}

          </button>

        </div>

      </div>

      {/* Error */}
      {error && (

        <div
          className="
            mb-5
            text-red-400
            text-sm
          "
        >
          {error}
        </div>

      )}

      {/* Button */}
      <button
        onClick={handleSignup}
        disabled={loading}
        className="
          w-full
          py-4
          rounded-2xl
          bg-cyan-400
          text-black
          font-bold
          hover:bg-cyan-300
          transition
        "
      >

        {loading
          ? "Creating..."
          : "Create Account"}

      </button>

      {/* Login */}
      <p
        className="
          text-center
          text-gray-400
          mt-8
        "
      >

        Already have an account?

        {" "}

        <Link
          href="/auth/login"
          className="
            text-cyan-400
            hover:underline
          "
        >
          Login
        </Link>

      </p>

    </AuthLayout>
  );
}