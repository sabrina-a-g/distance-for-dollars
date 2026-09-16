import { NextResponse } from "next/server";

export async function GET() {

  // this indicates which app is making the request by a D4D user
  const stravaClientId = process.env.STRAVA_CLIENT_ID;

  if (!stravaClientId) {
    throw new Error("STRAVA_CLIENT_ID is not configured");
  }

  // this will prevent someone attempting to use a different redirect to access the strava auth code for D4D
  const redirectUri = "http://localhost:3000/api/auth/strava/callback";

  const params = new URLSearchParams({
    client_id: stravaClientId,
    redirect_uri: redirectUri,
    response_type: "code",
    // this grants D4D permission, once a user approves, to read their Strava mileage
    scope: "read,activity:read_all,profile:read_all"
  });

  const url = `https://www.strava.com/oauth/authorize?${params.toString()}`;

  // this line is the thing that physically directs the user's browser from D4D over to Strava's website
  return NextResponse.redirect(url);
}


