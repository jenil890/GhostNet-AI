"use client";

import {
  useState,
} from "react";

import AppLayout from "../../components/AppLayout";

import AuthGuard from "../../components/AuthGuard";

import {
  Shield,
  Search,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function ScannerPage() {

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  // Scan URL
  const handleScan =
    async () => {

      if (!url) return;

      try {

        setLoading(true);

        setResult(null);

        const response =
          await fetch(
            "${process.env.NEXT_PUBLIC_API_URL}/scan-url",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                url,
              }),
            }
          );

        const data =
          await response.json();

        setResult(data);

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
            p-8
          "
        >

          {/* Header */}
          <div className="mb-10">

            <div
              className="
                flex
                items-center
                gap-4
                mb-4
              "
            >

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-cyan-400/20
                  border
                  border-cyan-400/20
                  flex
                  items-center
                  justify-center
                "
              >

                <Shield
                  className="
                    text-cyan-400
                  "
                  size={34}
                />

              </div>

              <div>

                <h1
                  className="
                    text-5xl
                    font-black
                  "
                >
                  URL Threat Scanner
                </h1>

                <p
                  className="
                    text-gray-400
                    mt-2
                    text-lg
                  "
                >
                  Analyze suspicious URLs for phishing threats
                </p>

              </div>

            </div>

          </div>

          {/* Scanner */}
          <div
            className="
              max-w-4xl
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-8
            "
          >

            {/* Input */}
            <div
              className="
                flex
                flex-col
                lg:flex-row
                gap-4
              "
            >

              <input
                type="text"
                placeholder="Enter URL..."
                value={url}
                onChange={(e) =>
                  setUrl(e.target.value)
                }
                className="
                  flex-1
                  bg-black/50
                  border
                  border-white/10
                  rounded-2xl
                  px-6
                  py-5
                  outline-none
                  text-lg
                "
              />

              <button
                onClick={handleScan}
                disabled={loading}
                className="
                  bg-cyan-400
                  hover:bg-cyan-300
                  text-black
                  px-8
                  py-5
                  rounded-2xl
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-3
                  transition
                "
              >

                <Search size={22} />

                {
                  loading
                    ? "Scanning..."
                    : "Scan URL"
                }

              </button>

            </div>

            {/* Result */}
            {
              result && (

                <div
                  className="
                    mt-8
                    border
                    border-white/10
                    rounded-3xl
                    p-8
                    bg-black/30
                  "
                >

                  {/* Status */}
                  <div
                    className="
                      flex
                      items-center
                      gap-4
                      mb-6
                    "
                  >

                    {
                      result.safe ? (

                        <CheckCircle2
                          className="
                            text-green-400
                          "
                          size={36}
                        />

                      ) : (

                        <AlertTriangle
                          className="
                            text-red-400
                          "
                          size={36}
                        />

                      )
                    }

                    <div>

                      <h2
                        className="
                          text-3xl
                          font-black
                        "
                      >
                        {result.risk_level}
                      </h2>

                      <p className="text-gray-400">
                        URL Analysis Result
                      </p>

                    </div>

                  </div>

                  {/* URL */}
                  <div className="mb-6">

                    <p className="text-gray-500 mb-2">
                      Scanned URL
                    </p>

                    <p
                      className="
                        text-lg
                        break-all
                      "
                    >
                      {result.url}
                    </p>

                  </div>

                  {/* Issues */}
                  <div>

                    <p
                      className="
                        text-gray-500
                        mb-4
                      "
                    >
                      Detection Results
                    </p>

                    {
                      result.issues_detected
                        .length === 0 ? (

                        <div
                          className="
                            border
                            border-green-500/20
                            bg-green-500/10
                            text-green-400
                            rounded-2xl
                            p-5
                          "
                        >
                          No suspicious indicators detected.
                        </div>

                      ) : (

                        <div className="space-y-3">

                          {
                            result
                              .issues_detected
                              .map(
                                (
                                  issue: string,
                                  index: number
                                ) => (

                                  <div
                                    key={index}
                                    className="
                                      border
                                      border-red-500/20
                                      bg-red-500/10
                                      text-red-300
                                      rounded-2xl
                                      p-5
                                    "
                                  >
                                    {issue}
                                  </div>

                                )
                              )
                          }

                        </div>

                      )
                    }

                  </div>

                </div>

              )
            }

          </div>

        </main>

      </AppLayout>

    </AuthGuard>
  );
}