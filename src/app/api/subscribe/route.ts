import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/data/site";
import { escapeHtml, isValidEmail } from "@/lib/html";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  if (!rateLimit(`subscribe:${clientKey(req)}`, 8)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please use a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Subscriptions are not configured yet. Email me instead." },
          { status: 503 },
        );
      }

      return NextResponse.json({
        success: true,
        simulated: true,
      });
    }

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";
    const safeEmail = escapeHtml(email);

    const { error } = await resend.emails.send({
      from,
      to: [SITE.email],
      replyTo: email,
      subject: `New writing subscriber: ${email}`,
      html: `<p>Subscribe request from <strong>${safeEmail}</strong>.</p>`,
    });

    if (error) {
      return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
  }
}
