"use client";

import React, { useState } from "react";
import ScrambleText from "@/components/ScrambleText";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";
import MagneticBtn from "@/components/MagneticBtn";
import ISTClock from "@/components/ISTClock";

export default function ContactPage() {
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
            ? "✓ Message received! (Dev Mode: Real email will send once RESEND_API_KEY is configured)."
            : "✓ Message sent successfully! I'll get back to you within 24 hours.",
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
        text: "Connection error. Please check your network or email directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          {/* LEFT : intro + direct channels */}
          <div>
            <ScrambleText text="contact · replies within 24h" />
            <h1 className="h1">
              <span className="line">
                <span style={{ "--d": ".1s" } as React.CSSProperties}>
                  Let&apos;s build
                </span>
              </span>
              <span className="line">
                <span style={{ "--d": ".22s" } as React.CSSProperties}>
                  something that
                </span>
              </span>
              <span className="line">
                <span style={{ "--d": ".34s" } as React.CSSProperties}>
                  <em>matters</em>.
                </span>
              </span>
            </h1>
            <ScrollReveal>
              <p className="lead">
                Open to senior full-stack roles, contract engineering and technical
                advisory. Remote-first, open to relocation (US / EU / UK).
              </p>
            </ScrollReveal>

            <ScrollReveal style={{ marginTop: "40px" }}>
              <a href="mailto:abhijeet4rana@gmail.com" className="card contact-card">
                <span className="ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                  </svg>
                </span>
                <span>
                  <span className="k">email</span>
                  <br />
                  <span className="v">abhijeet4rana@gmail.com</span>
                </span>
                <span className="go">→</span>
              </a>
              <a
                href="https://linkedin.com/in/abhijeetrana/"
                target="_blank"
                rel="noopener noreferrer"
                className="card contact-card"
              >
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
                  </svg>
                </span>
                <span>
                  <span className="k">linkedin</span>
                  <br />
                  <span className="v">/in/abhijeetrana</span>
                </span>
                <span className="go">↗</span>
              </a>
              <a
                href="https://github.com/abhijeetdotexe"
                target="_blank"
                rel="noopener noreferrer"
                className="card contact-card"
              >
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.41 7.86 10.94.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.35-3.87-1.35-.52-1.34-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.13 1.18a10.8 10.8 0 0 1 5.7 0c2.16-1.49 3.12-1.18 3.12-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.75-.01 3.13 0 .31.21.68.8.56 4.56-1.53 7.84-5.85 7.84-10.93C23.5 5.66 18.35.5 12 .5Z" />
                  </svg>
                </span>
                <span>
                  <span className="k">github</span>
                  <br />
                  <span className="v">@abhijeetdotexe</span>
                </span>
                <span className="go">↗</span>
              </a>
            </ScrollReveal>

            <ScrollReveal delay=".15s" className="hero-meta mono">
              <span className="status">
                <i></i>open to opportunities
              </span>
              <span>·</span>
              <span>
                <ISTClock /> ist
              </span>
            </ScrollReveal>
          </div>

          {/* RIGHT : form */}
          <ScrollReveal delay=".15s">
            <SpotlightCard style={{ padding: "36px" }}>
              <p className="kicker mono" style={{ marginBottom: "26px" }}>
                send a message
              </p>

              {statusMessage && (
                <div
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
                    color:
                      statusMessage.type === "success" ? "#2ecc71" : "#e74c3c",
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
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      select a topic
                    </option>
                    <option value="senior full-stack role">
                      full-stack engineering role
                    </option>
                    <option value="contract engineering">
                      contract engineering
                    </option>
                    <option value="technical advisory">
                      technical advisory
                    </option>
                    <option value="speaking / podcast">
                      speaking / podcast
                    </option>
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
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about what you're building..."
                  ></textarea>
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
                  {submitting ? (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <svg
                        className="spin"
                        style={{
                          animation: "spin 1s linear infinite",
                          width: "16px",
                          height: "16px",
                        }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          strokeDasharray="32"
                          strokeDashoffset="12"
                        />
                      </svg>
                      sending email...
                    </span>
                  ) : (
                    <>
                      send message
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    </>
                  )}
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
                  response within 24h · powered by resend
                </p>
              </form>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </section>

      {/* LOOKING FOR */}
      <section>
        <div className="container">
          <ScrollReveal className="sec-head">
            <span className="sec-index mono">02</span>
            <h2 className="sec-title">what I&apos;m looking for</h2>
            <span className="sec-rule"></span>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            <ScrollReveal>
              <SpotlightCard style={{ padding: "32px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "var(--accent-soft)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                  }}
                >
                  impactful work
                </h3>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: ".88rem",
                    lineHeight: 1.7,
                  }}
                >
                  Systems that scale, solve real problems, and ship to real
                  users. Not feature factories.
                </p>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay=".08s">
              <SpotlightCard style={{ padding: "32px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "var(--accent-soft)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                  }}
                >
                  strong teams
                </h3>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: ".88rem",
                    lineHeight: 1.7,
                  }}
                >
                  Engineering cultures that value craft, psychological safety,
                  and thoughtful technical leadership.
                </p>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay=".16s">
              <SpotlightCard style={{ padding: "32px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "var(--accent-soft)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                  }}
                >
                  remote or relocation
                </h3>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: ".88rem",
                    lineHeight: 1.7,
                  }}
                >
                  Happy to work remotely or relocate for the right opportunity.
                  Flexible on timezone overlap.
                </p>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
