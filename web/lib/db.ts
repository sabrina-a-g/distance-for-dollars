import fs from "node:fs";
import path from "node:path";
import DatabaseConstructor from "better-sqlite3";

const currentDir: string = process.cwd();
console.log(`Current Working Directory: ${currentDir}`);

const filePath: string = path.join(currentDir, 'data', 'tokens.sqlite');

function ensureDirectoryExists(dirPath: string, { recursive = true } = {}): void {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive });
        console.log(`Directory created: ${dirPath}`);
    } else {
        console.log(`Directory already exists: ${dirPath}`);
    }
}

// Ensure the data directory exists
ensureDirectoryExists(path.join(currentDir, 'data'));
export const db = new DatabaseConstructor(filePath);

db.exec(`
  CREATE TABLE IF NOT EXISTS strava_tokens (
   athlete_id     INTEGER PRIMARY KEY,
   access_token   TEXT,
   refresh_token  TEXT,
   expires_at     INTEGER,   -- Strava gives you this as a unix timestamp
   scope          TEXT,
   updated_at     INTEGER   -- when this row was last written
   );
`);

// Combine with other paths using node:path
console.log(`Resolved File Path: ${filePath}`);
