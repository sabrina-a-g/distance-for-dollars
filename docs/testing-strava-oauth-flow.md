# Testing the Strava OAuth Flow (D4D-16)

Reference checklist for manually testing the connect/callback flow, including the `response.ok` check and the `state` CSRF protection added to close out D4D-16.

## Prerequisites

- Dev server running: from inside `web/`, run `npm run dev`
- `.env.local` has valid `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`
- Keep a second terminal tab free for checking the database, so you don't have to stop the dev server

## 1. Full flow, happy path

1. Visit `http://localhost:3000/api/auth/strava/connect` in your browser.
2. Strava either shows its authorization screen (first time, or after revoking access) or redirects straight back if you're already authorized — both are valid; either way the full request/response cycle runs.
3. You land back on `http://localhost:3000/` with no error.
4. Check the dev server terminal for errors during the request — that's where server-side exceptions in the route handlers show up, not the browser console.
5. Verify the save, without pasting real token values into chat:
   ```
   sqlite3 data/tokens.sqlite "SELECT athlete_id, expires_at, scope, updated_at FROM strava_tokens;"
   ```
   Expect exactly one row, with `updated_at` matching roughly when you just ran the test.

## 2. Confirm the `state` check actually rejects bad requests

This proves the CSRF protection isn't just present in the code but actually enforced.

1. Without visiting `/connect` first (so no valid state cookie exists), visit directly:
   ```
   http://localhost:3000/api/auth/strava/callback?code=fake&state=fake
   ```
2. Expect an immediate redirect back to `/` — no token exchange should happen.
3. Check the dev server terminal for the `State mismatch: expected ..., got fake` log line, confirming the rejection fired instead of silently succeeding.

## 3. Confirm `INSERT OR REPLACE` still works after changes

1. Run the full flow from step 1 twice in a row.
2. Re-run the `SELECT` query from step 1.5.
3. Expect exactly one row both times, with a newer `updated_at` after the second run — not two rows.

## Known deferred items (not yet built)

- No token refresh logic yet (access tokens expire after 6 hours; refreshing will need its own flow, and remember Strava issues a new `refresh_token` on every refresh and invalidates the old one)
- No `getStravaTokens` read function yet — only `saveStravaTokens` exists so far
