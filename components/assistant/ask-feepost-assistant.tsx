"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { AssistantMessage } from "@/lib/feepost-assistant";

type ChatMessage = AssistantMessage & {
  id: string;
};

const initialMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Ask about Feepost services, government readiness, or where your modernization effort should start."
};

const starterPrompts = [
  "Which Feepost service fits an IT modernization initiative?",
  "How is Feepost positioned for government contracting?",
  "What should I ask for in an initial capability brief?"
] as const;

function TypingText({
  text,
  animate,
  onComplete
}: {
  text: string;
  animate: boolean;
  onComplete?: () => void;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [visibleText, setVisibleText] = useState(
    animate && !reduceMotion ? "" : text
  );

  useEffect(() => {
    if (!animate || reduceMotion) {
      setVisibleText(text);
      onComplete?.();
      return;
    }

    setVisibleText("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 3;
      setVisibleText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
        onComplete?.();
      }
    }, 14);

    return () => window.clearInterval(timer);
  }, [animate, onComplete, reduceMotion, text]);

  return <span>{visibleText}</span>;
}

export function AskFeepostAssistant() {
  const reduceMotion = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [pending, setPending] = useState(false);
  const [animatedMessageId, setAnimatedMessageId] = useState<string | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) {
      return;
    }

    element.scrollTo({
      top: element.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }, [messages, open, pending, reduceMotion]);

  const submitMessage = async (question: string) => {
    const trimmed = question.trim();

    if (!trimmed || pending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setPending(true);

    try {
      const response = await fetch("/api/ask-feepost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string; error?: string }
        | null;

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          payload?.message ||
          payload?.error ||
          "Feepost can help with software delivery, secure systems integration, and modernization planning."
      };

      setMessages((current) => [...current, assistantMessage]);
      setAnimatedMessageId(assistantMessage.id);
    } catch {
      const fallbackMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          "The assistant is temporarily unavailable. You can still reach Feepost directly at contact@feepostsoftware.com."
      };

      setMessages((current) => [...current, fallbackMessage]);
      setAnimatedMessageId(fallbackMessage.id);
    } finally {
      setPending(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitMessage(input);
  };

  return (
    <>
      <motion.button
        type="button"
        aria-expanded={open}
        aria-controls="ask-feepost-panel"
        className="assistant-launcher"
        data-cursor="interactive"
        onClick={() => setOpen((current) => !current)}
        initial={false}
        whileHover={reduceMotion ? undefined : { scale: 1.04, y: -3 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="assistant-launcher__pulse" />
        <span className="assistant-launcher__icon" aria-hidden="true">
          AI
        </span>
        <span className="assistant-launcher__label">Ask Feepost</span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.section
            id="ask-feepost-panel"
            aria-label="Ask Feepost assistant"
            className="assistant-panel"
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="assistant-panel__glow" />
            <div className="assistant-panel__header">
              <div>
                <div className="assistant-panel__eyebrow">Intelligent Assistant</div>
                <h2 className="assistant-panel__title">Ask Feepost</h2>
              </div>
              <button
                type="button"
                className="assistant-panel__close"
                data-cursor="interactive"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div
              ref={viewportRef}
              className="assistant-panel__messages"
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`assistant-message assistant-message--${message.role}`}
                >
                  <div className="assistant-message__meta">
                    {message.role === "assistant" ? "Feepost AI" : "You"}
                  </div>
                  <div className="assistant-message__bubble">
                    <TypingText
                      text={message.content}
                      animate={animatedMessageId === message.id}
                      onComplete={() =>
                        setAnimatedMessageId((current) =>
                          current === message.id ? null : current
                        )
                      }
                    />
                  </div>
                </div>
              ))}

              {pending ? (
                <div className="assistant-message assistant-message--assistant">
                  <div className="assistant-message__meta">Feepost AI</div>
                  <div className="assistant-message__bubble assistant-message__bubble--thinking">
                    <span className="assistant-dot" />
                    <span className="assistant-dot" />
                    <span className="assistant-dot" />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="assistant-panel__prompts">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="assistant-chip"
                  data-cursor="interactive"
                  onClick={() => void submitMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form className="assistant-panel__form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="ask-feepost-input">
                Ask Feepost a question
              </label>
              <input
                id="ask-feepost-input"
                className="assistant-input"
                data-cursor="interactive"
                type="text"
                autoComplete="off"
                maxLength={320}
                placeholder="Ask about services, readiness, or engagement..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <motion.button
                type="submit"
                className="assistant-submit"
                data-cursor="interactive"
                disabled={pending || input.trim().length === 0}
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Send
              </motion.button>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
