"use client";

import { useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";
import MagneticBtn from "@/components/MagneticBtn";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({
          type: "success",
          text: data.simulated
            ? "Received locally. Set RESEND_API_KEY to send real mail."
            : "Message sent. I'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", topic: "", message: "" });
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Connection error. Please email me directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SpotlightCard style={{ padding: "36px" }}>
      <p className="kicker mono" style={{ marginBottom: "26px" }}>
        send a message
      </p>

      {statusMessage && (
        <div
          role="status"
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: ".85rem",
            lineHeight: 1.5,
            background:
              statusMessage.type === "success"
                ? "rgba(46, 204, 113, 0.12)"
                : "rgba(231, 76, 60, 0.12)",
            border: `1px solid ${
              statusMessage.type === "success"
                ? "rgba(46, 204, 113, 0.3)"
                : "rgba(231, 76, 60, 0.3)"
            }`,
            color: statusMessage.type === "success" ? "#2ecc71" : "#e74c3c",
          }}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="f-name">name</label>
          <input
            id="f-name"
            name="name"
            type="text"
            required
            maxLength={120}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div className="field">
          <label htmlFor="f-email">email</label>
          <input
            id="f-email"
            name="email"
            type="email"
            required
            maxLength={200}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor="f-topic">topic</label>
          <select
            id="f-topic"
            name="topic"
            required
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          >
            <option value="" disabled>
              select a topic
            </option>
            <option value="full-stack engineering role">full-stack engineering role</option>
            <option value="contract engineering">contract engineering</option>
            <option value="technical advisory">technical advisory</option>
            <option value="speaking / podcast">speaking / podcast</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-msg">message</label>
          <textarea
            id="f-msg"
            name="message"
            rows={5}
            required
            maxLength={5000}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Tell me about what you're building..."
          />
        </div>
        <MagneticBtn
          type="submit"
          className={`btn btn-primary ${submitting ? "sending" : ""}`}
          style={{
            width: "100%",
            justifyContent: "center",
            marginTop: "8px",
            opacity: submitting ? 0.8 : 1,
          }}
        >
          {submitting ? "sending email..." : "send message"}
        </MagneticBtn>
        <p
          className="mono"
          style={{
            textAlign: "center",
            fontSize: ".68rem",
            letterSpacing: ".1em",
            color: "var(--faint)",
            marginTop: "16px",
            textTransform: "uppercase",
          }}
        >
          response within 24h
        </p>
      </form>
    </SpotlightCard>
  );
}
