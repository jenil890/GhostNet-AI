"use client";

import { useState } from "react";

import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Loader2,
  Globe,
  AlertTriangle,
} from "lucide-react";

export default function ScannerPage() {

  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  // =========================
  // SCAN URL
  // =========================

  const handleScan = async () => {

    if (!url) return;

    setLoading(true);

    setResult(null);

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/scan-url`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            url,
          }),
        }
      );

      const data = await response.json();

      setResult(data);

    } catch (error) {

      console.log(error);

      setResult({
        status: "error",
        message: "Backend connection failed",
      });

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (

    <main className="min-h-screen bg-black text-white p-8">

      {/* HEADER */}

      <div className="mb-10">

        <div className="flex items-center gap-4 mb-3">

          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">

            <Globe className="w-8 h-8 text-cyan-400" />

          </div>

          <div>

            <h1 className="text-5xl font-black">
              URL Scanner
            </h1>

            <p className="text-gray-400 text-lg">
              AI-powered phishing and malicious URL detection
            </p>

          </div>

        </div>

      </div>

      {/* SCANNER CARD */}

      <div className="bg-[#050505] border border-white/10 rounded-3xl p-8 max-w-5xl">

        {/* INPUT */}

        <div className="flex flex-col lg:flex-row gap-5">

          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="
              flex-1
              bg-black
              border
              border-white/10
              rounded-2xl
              px-6
              py-5
              text-lg
              outline-none
              focus:border-cyan-500
              transition
            "
          />

          <button
            onClick={handleScan}
            disabled={loading}
            className="
              px-10
              py-5
              rounded-2xl
              bg-cyan-400
              hover:bg-cyan-300
              transition
              text-black
              font-bold
              flex
              items-center
              justify-center
              gap-3
              min-w-[220px]
            "
          >

            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search />
                Scan URL
              </>
            )}

          </button>

        </div>

        {/* RESULTS */}

        {result && (

          <div className="mt-10 border border-white/10 rounded-3xl p-8 bg-black">

            {/* SAFE */}

            {result.status === "safe" && (

              <div>

                <div className="flex items-center gap-4 mb-6">

                  <ShieldCheck className="w-14 h-14 text-green-400" />

                  <div>

                    <h2 className="text-5xl font-black text-green-400">
                      Safe
                    </h2>

                    <p className="text-gray-400 text-xl">
                      URL Analysis Result
                    </p>

                  </div>

                </div>

                <div className="space-y-5">

                  <div>

                    <p className="text-gray-500 mb-2">
                      Scanned URL
                    </p>

                    <p className="text-xl break-all">
                      {result.url}
                    </p>

                  </div>

                  <div>

                    <p className="text-gray-500 mb-3">
                      Detection Results
                    </p>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">

                      <p className="text-green-300 text-lg">
                        No phishing indicators detected.
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* SUSPICIOUS */}

            {result.status === "suspicious" && (

              <div>

                <div className="flex items-center gap-4 mb-6">

                  <ShieldAlert className="w-14 h-14 text-red-400" />

                  <div>

                    <h2 className="text-5xl font-black text-red-400">
                      Suspicious
                    </h2>

                    <p className="text-gray-400 text-xl">
                      URL Analysis Result
                    </p>

                  </div>

                </div>

                <div className="space-y-5">

                  <div>

                    <p className="text-gray-500 mb-2">
                      Scanned URL
                    </p>

                    <p className="text-xl break-all">
                      {result.url}
                    </p>

                  </div>

                  <div>

                    <p className="text-gray-500 mb-3">
                      Detection Results
                    </p>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">

                      {result.reasons?.map(
                        (reason: string, index: number) => (

                          <div
                            key={index}
                            className="flex items-center gap-3 mb-3"
                          >

                            <AlertTriangle className="w-5 h-5 text-red-400" />

                            <p className="text-red-300 text-lg">
                              {reason}
                            </p>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* ERROR */}

            {result.status === "error" && (

              <div className="text-center py-10">

                <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-5" />

                <h2 className="text-4xl font-black mb-4">
                  Connection Error
                </h2>

                <p className="text-gray-400 text-lg">
                  {result.message}
                </p>

              </div>
            )}

          </div>
        )}

      </div>

    </main>
  );
}