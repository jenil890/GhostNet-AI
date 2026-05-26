"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ChatBox() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:8000/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      const data = await res.json();

      setResponse(data.response);

    } catch (error) {
      console.error(error);
      setResponse("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-16">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-6
          shadow-2xl
        "
      >

        <h2 className="text-3xl font-bold mb-6">
          GhostNet AI Chat
        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Ask GhostNet anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="
              flex-1
              bg-black/30
              border border-white/10
              rounded-2xl
              px-5
              py-4
              outline-none
              text-white
            "
          />

          <button
            onClick={sendPrompt}
            className="
              bg-cyan-400
              hover:bg-cyan-300
              text-black
              px-6
              rounded-2xl
              font-semibold
              transition
              flex items-center justify-center
            "
          >
            <Send size={20} />
          </button>

        </div>

        <div
          className="
            mt-6
            min-h-[200px]
            bg-black/20
            border border-white/10
            rounded-2xl
            p-5
            text-gray-200
          "
        >

          {loading ? (
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
              }}
            >
              GhostNet is thinking...
            </motion.div>
          ) : (
            response || "AI response will appear here..."
          )}

        </div>

      </motion.div>

    </div>
  );
}