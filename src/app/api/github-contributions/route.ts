import { NextResponse } from "next/server";
import { SITE } from "@/data/site";

export const revalidate = 3600;

type Contribution = { date: string; count: number; level: number };

function lastNDays(contributions: Contribution[], days: number): number[] {
  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  const slice = sorted.slice(-days);
  return slice.map((day) => {
    if (day.level >= 3 || day.count >= 8) return 3;
    if (day.level === 2 || day.count >= 4) return 2;
    if (day.level === 1 || day.count >= 1) return 1;
    return 0;
  });
}

export async function GET() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${SITE.githubUser}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }

    const data = (await res.json()) as { contributions?: Contribution[] };
    const levels = lastNDays(data.contributions ?? [], 26 * 7);

    return NextResponse.json({ levels });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
