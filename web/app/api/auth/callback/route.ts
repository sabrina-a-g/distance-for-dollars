import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



function saveStravaTokens(tokens: any) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO strava_tokens(athlete_id, access_token, refresh_token, expires_at, scope, updated_at)
    VALUES(?, ?, ?, ?, ?, strftime('%s', 'now'));
  `);
  
  stmt.run(
    tokens.athlete.id,
    tokens.access_token,
    tokens.refresh_token,
    tokens.expires_at,
    tokens.scope
  );
}

export async function GET(request: Request) {

  // get the code from the query string  
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  // if there's no code, redirect back to the homepage
  if (!code) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if there's no state, redirect back to the homepage
  if (!state) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // get the state from the cookie
  const cookieStore = await cookies();
  const storedState = cookieStore.get("strava_oauth_state");
  cookieStore.delete("strava_oauth_state");

  // if the state doesn't match, redirect back to the homepage
  if (state !== storedState?.value) {
    console.error(`State mismatch: expected ${storedState?.value}, got ${state}`);
    return NextResponse.redirect(new URL("/", request.url));
  }

   // exchange the code for token
   const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
        body: JSON.stringify({
			'client_id': process.env.STRAVA_CLIENT_ID,
            'client_secret': process.env.STRAVA_CLIENT_SECRET,
            'code': code,
            'grant_type': 'authorization_code',
		}),
	})

    // if the response is not ok, redirect back to the homepage
    if (!response.ok) {
      console.error(`Error exchanging code for token: ${response.status} ${response.statusText}`);
      return NextResponse.redirect(new URL("/", request.url));
    }

    // parse the response as JSON
    const tokens = await response.json();

    // hand the tokens to saveStravaTokens()
    saveStravaTokens(tokens);

  // redirect back to the homepage  
  return NextResponse.redirect(new URL('/', request.url));
}

