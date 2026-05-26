"use client";

import AppLayout from "../../components/AppLayout";

import AuthGuard from "../../components/AuthGuard";

import {
  Shield,
  Globe,
  Wifi,
  Activity,
  AlertTriangle,
  Radar,
} from "lucide-react";

export default function DashboardPage() {

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
                  Threat Dashboard
                </h1>

                <p
                  className="
                    text-gray-400
                    mt-2
                    text-lg
                  "
                >
                  Predictive Cyber Threat Intelligence Center
                </p>

              </div>

            </div>

          </div>

          {/* Status Grid */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-6
              mb-10
            "
          >

            {/* Threat Status */}
            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-6
                "
              >

                <Shield
                  className="
                    text-cyan-400
                  "
                  size={32}
                />

                <span
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  STATUS
                </span>

              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-3
                "
              >
                Threat Analysis
              </h2>

              <p className="text-gray-400">
                No threat scans have been performed yet.
              </p>

            </div>

            {/* URL Monitoring */}
            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-6
                "
              >

                <Globe
                  className="
                    text-cyan-400
                  "
                  size={32}
                />

                <span
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  URL SCAN
                </span>

              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-3
                "
              >
                Phishing Detection
              </h2>

              <p className="text-gray-400">
                No suspicious URLs analyzed yet.
              </p>

            </div>

            {/* WiFi */}
            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-6
                "
              >

                <Wifi
                  className="
                    text-cyan-400
                  "
                  size={32}
                />

                <span
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  NETWORK
                </span>

              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-3
                "
              >
                WiFi Monitoring
              </h2>

              <p className="text-gray-400">
                Network analysis modules inactive.
              </p>

            </div>

            {/* Behavior */}
            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-6
                "
              >

                <Activity
                  className="
                    text-cyan-400
                  "
                  size={32}
                />

                <span
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  BEHAVIOR
                </span>

              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-3
                "
              >
                Behavioral Analysis
              </h2>

              <p className="text-gray-400">
                No behavioral anomalies detected.
              </p>

            </div>

          </div>

          {/* Bottom Grid */}
          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-8
            "
          >

            {/* Threat Feed */}
            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                  mb-8
                "
              >

                <AlertTriangle
                  className="
                    text-cyan-400
                  "
                  size={34}
                />

                <div>

                  <h2
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    Threat Feed
                  </h2>

                  <p className="text-gray-400">
                    Live cybersecurity threat activity
                  </p>

                </div>

              </div>

              <div
                className="
                  border
                  border-dashed
                  border-white/10
                  rounded-3xl
                  p-10
                  text-center
                "
              >

                <p
                  className="
                    text-gray-400
                    text-lg
                  "
                >
                  No active cyber threats detected.
                </p>

              </div>

            </div>

            {/* Monitoring */}
            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                  mb-8
                "
              >

                <Radar
                  className="
                    text-cyan-400
                  "
                  size={34}
                />

                <div>

                  <h2
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    Monitoring Status
                  </h2>

                  <p className="text-gray-400">
                    Security intelligence modules
                  </p>

                </div>

              </div>

              <div className="space-y-5">

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                  "
                >

                  <span className="font-semibold">
                    URL Threat Scanner
                  </span>

                  <span className="text-gray-500">
                    Offline
                  </span>

                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                  "
                >

                  <span className="font-semibold">
                    WiFi Risk Detection
                  </span>

                  <span className="text-gray-500">
                    Offline
                  </span>

                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                  "
                >

                  <span className="font-semibold">
                    Behavioral Intelligence
                  </span>

                  <span className="text-gray-500">
                    Offline
                  </span>

                </div>

              </div>

            </div>

          </div>

        </main>

      </AppLayout>

    </AuthGuard>
  );
}