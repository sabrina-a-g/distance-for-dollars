import { NextResponse } from "next/server";
import { getStravaTokens } from "@/lib/db";

export async function GET() {
  const tokens = getStravaTokens();

  if (!tokens) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  if (tokens.expires_at < Math.floor(Date.now() / 1000)) {
    return NextResponse.json({ error: "Your credentials are stale" }, { status: 401 });
  }

  // collecting everything
  const activities = [ ];
  let page = 1;

  while (true) {
    const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=200`, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: response.status }
    );
  }

    const pageOfActivities = await response.json();
    activities.push(...pageOfActivities);
    
    if (pageOfActivities.length < 200) {
      break;
    }
    
    page++;
  }

  return NextResponse.json(activities);
}

