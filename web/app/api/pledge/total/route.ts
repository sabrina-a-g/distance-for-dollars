import { getPledgeTotals } from "@/lib/pledgeTotals";
import { Temporal } from "@js-temporal/polyfill";
import { getStravaTokens } from "@/lib/db";

(globalThis as any).Temporal = Temporal;

export async function GET(request: Request) {
    try {
      const row = getStravaTokens();
      if (!row) {
        return Response.json({ error: "Row not found" }, { status: 404 });
      }
      
      // This converts the goal start date to a Temporal.Instant object before passing it to getPledgeTotals and will be replaced after D4D-50
      const total = await getPledgeTotals(BigInt(row.athlete_id), Temporal.Instant.from("2026-11-01T00:00:00-04:00"));
      return Response.json({ total });

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}
