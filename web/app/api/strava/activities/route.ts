import { NextResponse } from "next/server";
import { getStravaTokens } from "@/lib/db";
import { db } from "@/src/prisma/db";
import { Temporal } from "@js-temporal/polyfill";

(globalThis as any).Temporal = Temporal;

export async function GET() {
  const tokens = getStravaTokens();

  if (!tokens) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  if (tokens.expires_at < Math.floor(Date.now() / 1000)) {
    return NextResponse.json(
      { error: "Your credentials are stale" },
      { status: 401 },
    );
  }

  const activities: any[] = [];

  let page = 1;

  while (true) {
    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=200`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch activities" },
        { status: response.status },
      );
    }

    const pageOfActivities = await response.json();
    activities.push(...pageOfActivities);

    if (pageOfActivities.length < 200) {
      break;
    }

    page++;
  }

  // collecting everything
  const convertedActivities = activities.map((activity) => ({
    athleteId: BigInt(activity.athlete.id),
    activityId: BigInt(activity.id),
    //type mismatch between polyfill and Prisma’s Temporal types, revisit.
    startDate: Temporal.Instant.from(activity.start_date) as any,
    distanceMeters: activity.distance,
    goalId: null,
  }));
  const syncedActivities = await db.orm.public.SyncedActivity.createAll(
    convertedActivities, // 1st argument: The array of data rows
    { onConflict: "skip" },
  );
  console.log("Activities", convertedActivities[0]);
  return NextResponse.json(activities);
}
