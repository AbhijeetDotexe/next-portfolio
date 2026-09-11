import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/data/site";
import { escapeHtml, isValidEmail } from "@/lib/html";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientKey(req)}`)) {
    return NextResponse.json(
      { error: "Too many messages. Try again in a bit, or email me directly." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const topic = String(body.topic ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (name.length > 120 || topic.length > 80 || message.length > 5000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please use a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Mail is not configured. Email me directly instead." },
          { status: 503 },
        );
      }

      console.warn("RESEND_API_KEY is not set. Simulating email dispatch.");
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Message received (local only: set RESEND_API_KEY to send mail).",
      });
    }

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM || "Portfolio Contact <onboarding@resend.dev>";
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeTopic = escapeHtml(topic || "General");
    const safeMessage = escapeHtml(message);

    const { error } = await resend.emails.send({
      from,
      to: [SITE.email],
      replyTo: email,
      subject: `New portfolio message from ${name} [${topic || "General"}]`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #111; border-bottom: 2px solid #eee; padding-bottom: 8px;">New contact form</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Topic:</strong> ${safeTopic}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #444;">Message</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 8px;">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Email Error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (err: unknown) {
    console.error("Resend Email Error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}
