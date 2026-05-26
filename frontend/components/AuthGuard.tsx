"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "../lib/firebase";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          if (!user) {

            router.push(
              "/auth/login"
            );

          } else {

            setLoading(false);
          }
        }
      );

    return () =>
      unsubscribe();

  }, [router]);

  if (loading) {

    return (
      <main
        className="
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
        "
      >

        Loading...

      </main>
    );
  }

  return children;
}