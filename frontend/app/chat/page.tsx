"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Send,
  Plus,
} from "lucide-react";

import AppLayout from "../../components/AppLayout";

import AuthGuard from "../../components/AuthGuard";

type Message = {
  role: "user" | "ai";
  content: string;
};

type Conversation = {
  id: number;
  title: string;
  messages: Message[];
};

export default function ChatPage() {

  const [prompt, setPrompt] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [conversations, setConversations] =
    useState<Conversation[]>([
      {
        id: 1,
        title: "New Chat",
        messages: [],
      },
    ]);

  const [activeChat, setActiveChat] =
    useState(1);

  const bottomRef =
    useRef<HTMLDivElement | null>(null);

  // Current Chat
  const currentConversation =
    conversations.find(
      (c) => c.id === activeChat
    );

  // Auto Scroll
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [conversations, loading]);

  // Load Saved Chats
  useEffect(() => {

    const saved =
      localStorage.getItem(
        "ghostnet-conversations"
      );

    if (saved) {

      setConversations(
        JSON.parse(saved)
      );
    }

  }, []);

  // Save Chats
  useEffect(() => {

    localStorage.setItem(
      "ghostnet-conversations",
      JSON.stringify(conversations)
    );

  }, [conversations]);

  // Send Message
  const sendMessage =
    async () => {

      if (!prompt.trim()) return;

      const userMessage: Message = {
        role: "user",
        content: prompt,
      };

      // Add User Message
      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  userMessage,
                ],
              }
            : chat
        )
      );

      setLoading(true);

      try {

        const res = await fetch(
          "http://127.0.0.1:8000/ai",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              prompt: prompt,
            }),
          }
        );

        const data =
          await res.json();

        const aiMessage: Message = {
          role: "ai",
          content:
            data.response ||
            "No response received.",
        };

        // Add AI Message
        setConversations((prev) =>
          prev.map((chat) =>
            chat.id === activeChat
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    aiMessage,
                  ],
                }
              : chat
          )
        );

      } catch (error) {

        setConversations((prev) =>
          prev.map((chat) =>
            chat.id === activeChat
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    {
                      role: "ai",
                      content:
                        "Something went wrong.",
                    },
                  ],
                }
              : chat
          )
        );

      }

      setPrompt("");
      setLoading(false);
    };

  // New Chat
  const createChat = () => {

    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setConversations((prev) => [
      newChat,
      ...prev,
    ]);

    setActiveChat(newChat.id);
  };

  return (

    <AuthGuard>

      <AppLayout>

        <main
          className="
            flex-1
            flex
            flex-col
            h-screen
            overflow-hidden
          "
        >

          {/* Header */}
          <div
            className="
              border-b
              border-white/10
              p-6
              bg-white/5
              backdrop-blur-xl
            "
          >

            <div className="flex items-center justify-between">

              <h1 className="text-3xl font-black">
                GhostNet AI
              </h1>

              <button
                onClick={createChat}
                className="
                  flex
                  items-center
                  gap-2
                  bg-cyan-400
                  text-black
                  px-5
                  py-3
                  rounded-2xl
                  font-bold
                  hover:bg-cyan-300
                  transition
                "
              >

                <Plus size={18} />

                New Chat

              </button>

            </div>

          </div>

          {/* Messages */}
          <div
            className="
              flex-1
              overflow-y-auto
              p-8
              space-y-6
            "
          >

            {currentConversation
              ?.messages.length ===
              0 && (

              <div
                className="
                  text-center
                  text-gray-500
                  mt-20
                "
              >
                Start chatting with GhostNet...
              </div>

            )}

            {currentConversation?.messages.map(
              (msg, index) => (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className={`
                    max-w-3xl
                    p-5
                    rounded-3xl
                    border
                    ${
                      msg.role ===
                      "user"
                        ? "ml-auto bg-cyan-400 text-black border-cyan-300"
                        : "bg-white/5 border-white/10 text-white"
                    }
                  `}
                >

                  <p
                    className="
                      leading-relaxed
                      whitespace-pre-wrap
                    "
                  >
                    {msg.content}
                  </p>

                </motion.div>

              )
            )}

            {/* Loading */}
            {loading && (

              <motion.div
                animate={{
                  opacity: [
                    0.3,
                    1,
                    0.3,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                }}
                className="
                  max-w-sm
                  p-5
                  rounded-3xl
                  bg-white/5
                  border
                  border-white/10
                  text-white
                "
              >
                GhostNet is thinking...
              </motion.div>

            )}

            <div ref={bottomRef} />

          </div>

          {/* Input */}
          <div
            className="
              border-t
              border-white/10
              p-6
              bg-black/50
              backdrop-blur-xl
            "
          >

            <div className="flex gap-4">

              <input
                type="text"
                placeholder="Message GhostNet..."
                value={prompt}
                onChange={(e) =>
                  setPrompt(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter"
                  ) {

                    sendMessage();
                  }
                }}
                className="
                  flex-1
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  text-white
                "
              />

              <button
                onClick={sendMessage}
                className="
                  w-16
                  rounded-2xl
                  bg-cyan-400
                  hover:bg-cyan-300
                  text-black
                  flex
                  items-center
                  justify-center
                  transition
                "
              >

                <Send />

              </button>

            </div>

          </div>

        </main>

      </AppLayout>

    </AuthGuard>
  );
}