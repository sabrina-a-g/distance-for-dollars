import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { cookies } from "next/headers"

export async function GET() {

  // this indicates which app is making the request by a D4D user
  const stravaClientId = process.env.STRAVA_CLIENT_ID;

  if (!stravaClientId) {
    throw new Error("STRAVA_CLIENT_ID is not configured");
  }

  // 1. generates random value syntax
  let uuid = crypto.randomUUID();

  // 2. 
  const cookieStore = await cookies()

  // 3. 
  cookieStore.set('strava_oauth_state', uuid, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 300, // 5 minute
  })

  // this will prevent someone attempting to use a different redirect to access the strava auth code for D4D
  const redirectUri = "http://localhost:3000/api/auth/strava/callback";

  const params = new URLSearchParams({
    client_id: stravaClientId,
    redirect_uri: redirectUri,
    response_type: "code",
    // this grants D4D permission, once a user approves, to read their Strava mileage
    scope: "read,activity:read_all,profile:read_all",
    state: uuid
  });

  const url = `https://www.strava.com/oauth/authorize?${params.toString()}`;

  // this line is the thing that physically directs the user's browser from D4D over to Strava's website
  return NextResponse.redirect(url);
}


