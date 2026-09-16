import { NextResponse } from "next/server";



function saveStravaTokens(tokens: unknown) {
  // placeholder for now — swap this body out later,
  // nothing else in this file should need to change when we do
  console.log(tokens);
}

export async function GET(request: Request) {

  // get the code from the query string  
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  // if there's no code, redirect back to the homepage
  if (!code) {
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

    // parse the response as JSON
    const tokens = await response.json();

    // hand the tokens to saveStravaTokens()
    saveStravaTokens(tokens);

  // redirect back to the homepage  
  return NextResponse.redirect(new URL('/', request.url));
}

