import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, topic, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Graceful fallback for local development testing without API key
      console.warn("RESEND_API_KEY is not set. Simulating email dispatch.");
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Message received (Development Mode: Set RESEND_API_KEY to send real emails).",
      });
    }

    const resend = new Resend(apiKey);

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["abhijeet4rana@gmail.com"],
      replyTo: email,
      subject: `New Portfolio Message from ${name} [${topic || "General"}]`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #111; border-bottom: 2px solid #eee; padding-bottom: 8px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Topic:</strong> ${topic || "Not specified"}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #444;">Message:</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 8px;">${message}</p>
          <p style="font-size: 0.8rem; color: #888; margin-top: 24px;">Sent from portfolio website contact form.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data,
      message: "Email sent successfully!",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to send email. Please try again later.";
    console.error("Resend Email Error:", err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
