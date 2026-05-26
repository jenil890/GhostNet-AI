"use client";

import {
  useEffect,
  useState,
} from "react";

import AppLayout from "../../components/AppLayout";

import AuthGuard from "../../components/AuthGuard";

import {
  auth,
} from "../../lib/firebase";

import {
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";

import {
  Mail,
  Shield,
  LogOut,
  KeyRound,
  User as UserIcon,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

export default function SettingsPage() {

  const router =
    useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

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

  // Reset Password
  const handleResetPassword =
    async () => {

      if (!user?.email) return;

      try {

        setLoading(true);

        await sendPasswordResetEmail(
          auth,
          user.email
        );

        setMessage(
          "Password reset email sent."
        );

      } catch (error) {

        console.log(error);
      }

      setLoading(false);
    };

  return (

    <AuthGuard>

      <AppLayout>

        <main
          className="
            min-h-screen
            bg-black
            text-white
            p-10
          "
        >

          {/* Heading */}
          <div className="mb-10">

            <h1
              className="
                text-5xl
                font-black
                mb-4
              "
            >
              Settings
            </h1>

            <p
              className="
                text-gray-400
                text-lg
              "
            >
              Manage your GhostNet account.
            </p>

          </div>

          {/* Profile Card */}
          <div
            className="
              max-w-4xl
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-10
            "
          >

            {/* Top */}
            <div
              className="
                flex
                items-center
                gap-6
                mb-10
              "
            >

              {/* Avatar */}
              <div
                className="
                  w-28
                  h-28
                  rounded-full
                  overflow-hidden
                  bg-cyan-400
                  flex
                  items-center
                  justify-center
                "
              >

                {user?.photoURL ? (

                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                ) : (

                  <UserIcon
                    size={50}
                    className="text-black"
                  />

                )}

              </div>

              {/* User Info */}
              <div>

                <h2
                  className="
                    text-4xl
                    font-black
                    mb-2
                  "
                >
                  {
                    user?.displayName ||
                    "Ghost User"
                  }
                </h2>

                <p
                  className="
                    text-gray-400
                    text-lg
                  "
                >
                  {user?.email}
                </p>

              </div>

            </div>

            {/* Details */}
            <div className="space-y-5">

              {/* Email */}
              <div
                className="
                  bg-black/30
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                  flex
                  items-center
                  gap-5
                "
              >

                <Mail
                  className="
                    text-cyan-400
                  "
                  size={28}
                />

                <div>

                  <p className="text-gray-400">
                    Email Address
                  </p>

                  <h3 className="text-xl font-bold">
                    {user?.email}
                  </h3>

                </div>

              </div>

              {/* Provider */}
              <div
                className="
                  bg-black/30
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                  flex
                  items-center
                  gap-5
                "
              >

                <Shield
                  className="
                    text-cyan-400
                  "
                  size={28}
                />

                <div>

                  <p className="text-gray-400">
                    Login Provider
                  </p>

                  <h3 className="text-xl font-bold">
                    {
                      user?.providerData?.[0]
                        ?.providerId
                    }
                  </h3>

                </div>

              </div>

              {/* Email Verified */}
              <div
                className="
                  bg-black/30
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                  flex
                  items-center
                  gap-5
                "
              >

                <Shield
                  className="
                    text-cyan-400
                  "
                  size={28}
                />

                <div>

                  <p className="text-gray-400">
                    Email Verified
                  </p>

                  <h3 className="text-xl font-bold">
                    {
                      user?.emailVerified
                        ? "Verified"
                        : "Not Verified"
                    }
                  </h3>

                </div>

              </div>

              {/* Account Created */}
              <div
                className="
                  bg-black/30
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                  flex
                  items-center
                  gap-5
                "
              >

                <UserIcon
                  className="
                    text-cyan-400
                  "
                  size={28}
                />

                <div>

                  <p className="text-gray-400">
                    Account Created
                  </p>

                  <h3 className="text-xl font-bold">
                    {
                      user?.metadata
                        ?.creationTime
                    }
                  </h3>

                </div>

              </div>

            </div>

            {/* Actions */}
            <div
              className="
                flex
                flex-wrap
                gap-5
                mt-10
              "
            >

              {/* Reset Password */}
              <button
                onClick={
                  handleResetPassword
                }
                disabled={loading}
                className="
                  flex
                  items-center
                  gap-3
                  bg-cyan-400
                  hover:bg-cyan-300
                  text-black
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  transition
                "
              >

                <KeyRound size={20} />

                Reset Password

              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="
                  flex
                  items-center
                  gap-3
                  bg-red-500/20
                  border
                  border-red-500/20
                  hover:bg-red-500
                  hover:text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  transition
                "
              >

                <LogOut size={20} />

                Logout

              </button>

            </div>

            {/* Message */}
            {message && (

              <p
                className="
                  text-green-400
                  mt-6
                "
              >
                {message}
              </p>

            )}

          </div>

        </main>

      </AppLayout>

    </AuthGuard>
  );
}