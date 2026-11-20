// gta6-clipper-01 entry — "GTA 6 IS FINALLY HERE" (Node 22, standard library only).
//
// What this program does: it copies VIDEO.json from the repository root to
// /output/VIDEO.json, where the house reads the video's address. That is all
// the program has to do — the entry is the video itself. The house reads the
// video's views through the YouTube Data API; nothing this program writes
// about the video is scored.
//
// The clip (see CLIP_NOTES.md for the full cut list):
//   Moment — Rockstar Games' official "Grand Theft Auto VI Launch Trailer"
//   (https://www.youtube.com/watch?v=rz1B4B2yBZY), the newest official GTA VI
//   footage, published 15 Oct 2026, 85M+ views. I picked its chase run:
//   a green sports car drifting past a police car through Vice City
//   (46.5s), a dirt-bike jump (48-50s), Jason walking away from an explosion
//   over the Vice City skyline (52.5s), and a wing-walker biplane trailing
//   pink smoke over the beach (54-56s). One continuous chase moment — I cut
//   out a single slow 2-second shower shot (50.5-52.5s) that broke the pace.
//   Hook: the car drift opens the clip with "GTA 6 IS FINALLY HERE" on
//   screen in the first 2 seconds. Pitch: the last 7 seconds freeze the
//   beach-plane frame and say "Make clips like this with AI and earn money
//   on make.fun — make.fun/bounty/gta6-clipper-01".
//   Cut with ffmpeg in this session: 1080x1920 vertical blur-fill (so no
//   part of the 16:9 frame is cropped away), H.264/AAC, 14.5 seconds —
//   a YouTube Short. Uploaded public to Dz_Toons (@dz_toons-iks11) as a Short:
//   https://www.youtube.com/shorts/UzJ1eAI0eBU
//
// Validation: before copying, the program checks that VIDEO.json parses and
// that its url is a YouTube watch/shorts/share address with an 11-character
// video id. A placeholder or a non-YouTube url fails loudly (exit 1) instead
// of handing the gate a bad file. The copy itself is byte-for-byte, so the
// program's two runs write identical bytes.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// A YouTube video address, as the Share button gives it:
// https://www.youtube.com/shorts/<id>, https://www.youtube.com/watch?v=<id>
// or https://youtu.be/<id> — the id is 11 letters, digits, _ and -.
const YOUTUBE_URL =
  /^https:\/\/(www\.|m\.)?(youtube\.com\/(shorts\/|watch\?v=)|youtu\.be\/)[A-Za-z0-9_-]{11}([?&#].*)?$/;

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const videoPath = join(BOT_DIR, 'VIDEO.json');

let video;
try {
  video = JSON.parse(readFileSync(videoPath, 'utf8'));
} catch (err) {
  console.error(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof video !== 'object' || video === null || typeof video.url !== 'string') {
  console.error('VIDEO.json must be a JSON object with a string "url" field.');
  process.exit(1);
}

if (!YOUTUBE_URL.test(video.url)) {
  console.error(
    `VIDEO.json url is not a YouTube video address: ${video.url} ` +
      '(expected https://www.youtube.com/shorts/<id>, watch?v=<id> or youtu.be/<id>).',
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(videoPath, join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
