"use client";

import { useState } from "react";
import MagneticBtn from "@/components/MagneticBtn";

export default function BlogSubscribe() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setMessage(
          data.simulated
            ? "Noted locally. Set RESEND_API_KEY to notify me in production."
            : "You're in. I'll send a note when a new essay goes up.",
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Could not subscribe right now.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Email me instead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubscribe}
      style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        autoComplete="email"
        style={{
          flex: 1,
          minWidth: "220px",
          padding: "14px 18px",
          borderRadius: "999px",
          background: "var(--surface)",
          border: "1px solid var(--border-strong)",
          color: "var(--text)",
          font: "inherit",
          fontSize: ".9rem",
        }}
      />
      <MagneticBtn type="submit" className="btn btn-primary">
        {submitting ? "sending..." : "subscribe"}
      </MagneticBtn>
      {status !== "idle" && (
        <p
          role="status"
          style={{
            width: "100%",
            margin: 0,
            fontSize: ".85rem",
            color: status === "success" ? "var(--accent)" : "#e74c3c",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
