# Clip notes — gta6-clipper-01

## Creative decision

One moment, not a montage: the chase run in Rockstar's official GTA VI
Launch Trailer. It opens on the most arresting image in the trailer — a
green sports car drifting past a police car through Vice City — so the hook
lands in the first 2 seconds, then keeps escalating (dirt-bike jump,
explosion, beach biplane) instead of slowing down. The pitch comes last, on
a frozen frame, so it is readable for a full 7 seconds. No AI-generated
video was used; every frame is Rockstar's official footage.

## Source footage

- **Video:** "Grand Theft Auto VI Launch Trailer", Rockstar Games (official channel)
- **URL:** https://www.youtube.com/watch?v=rz1B4B2yBZY
- **Published:** 15 Oct 2026 · **Length:** 90 s · **Views at download:** 85,202,932
- **Downloaded:** 20 Nov 2026 with `yt-dlp` (installed via
  `pip3 install --user --break-system-packages yt-dlp`, version 2026.10.26),
  1080p (1920×1080, AV1+AAC), saved as `launch-trailer.mp4` (16 MB) in
  `~/workspace/makefun/gta6-clipper-01-src/` (kept beside the repo, not
  inside it, so the submitted repository stays small; the frame contact
  sheets and ffmpeg intermediates live there too).
  Trailer 2 (https://www.youtube.com/watch?v=VQRLujxTm3c, 167 s, 191.7M views)
  was also downloaded and sampled, but its first 80 seconds are slow story
  setup and its action stretch is weaker than the Launch Trailer's chase,
  so it was not used.
- **Moment used:** 46.5–50.5 s and 52.5–56.0 s of the Launch Trailer.
  - 46.5 s: green sports car drifting, police car behind, Vice City street
  - 47.0 s: white police car drifting
  - 47.5–50.0 s: dirt-bike ramp, mid-air jump, landing
  - 52.5–53.0 s: Jason walking away from an explosion, Vice City skyline
  - 54.5–56.0 s: biplane with pink smoke + wing-walker over the beach
  - Cut out: 50.5–52.5 s, a single slow dark shower/ankle-monitor shot that
    broke the chase's pace (documented here, not hidden).
- **Pitch-card freeze frame:** 55 s (beach biplane), darkened so the text reads.

## Final clip

- **File:** `clip/gta6-clip-vertical.mp4`
- **SHA-256:** `614110e071f8728dff620e5479afc66c49d58262ee66b89b6553e6c5ed0aa820`
- **Format:** 1080×1920 vertical (9:16), H.264 video + AAC audio, 30 fps
- **Duration:** 14.5 s (action 0–7.5 s, pitch card 7.5–14.5 s) · **Size:** 5.3 MB
- **Audio:** the trailer's own music track, 46.5–56.0 s under the action and
  56–63 s under the pitch card, fading out in the last second.
  Mean volume −15.3 dB, max −1.4 dB. No black frames.
- **On-screen text (DejaVu Sans Bold, white with black border):**
  - 0–3 s, top: `GTA 6 IS FINALLY HERE`
  - 7.5–14.5 s, centre: `Make clips like this with AI` /
    `and earn money on make.fun` / `make.fun/bounty/gta6-clipper-01` (gold)
- **Verified:** frames checked at 1 s (hook + car), 4.5 s (explosion),
  6 s (beach plane), 9 s and 13 s (pitch card) — all readable, nothing
  important cropped (blur-fill, not a centre crop).

## ffmpeg commands used

Rendered in this session, from `~/workspace/makefun/gta6-clipper-01-src/` (Node 22.23.5, ffmpeg 8.1.2):

```sh
# Segment A1 — 46.5–50.5 s, vertical blur-fill, hook text (first 3 s)
ffmpeg -ss 46.5 -t 4 -i launch-trailer.mp4 -filter_complex \
 "[0:v]split=2[bg][fg];[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=40[bg2];[fg]scale=1080:-2[fg2];[bg2][fg2]overlay=(W-w)/2:(H-h)/2,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='GTA 6 IS FINALLY HERE':fontsize=64:fontcolor=white:borderw=3:bordercolor=black:x=(w-text_w)/2:y=140:enable='between(t,0,3)',format=yuv420p[v]" \
 -map "[v]" -map 0:a -c:v libx264 -crf 20 -preset medium -r 30 -c:a aac -b:a 128k -t 4 segA1.mp4

# Segment A2 — 52.5–56.0 s, vertical blur-fill, no text
ffmpeg -ss 52.5 -t 3.5 -i launch-trailer.mp4 -filter_complex \
 "[0:v]split=2[bg][fg];[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=40[bg2];[fg]scale=1080:-2[fg2];[bg2][fg2]overlay=(W-w)/2:(H-h)/2,format=yuv420p[v]" \
 -map "[v]" -map 0:a -c:v libx264 -crf 20 -preset medium -r 30 -c:a aac -b:a 128k -t 3.5 segA2.mp4

# Segment B — pitch card, 7 s: frozen frame at 55 s, darkened, pitch text, audio 56–63 s
ffmpeg -loop 1 -t 7 -i freeze55.jpg -ss 56 -t 7 -i launch-trailer.mp4 -filter_complex \
 "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,eq=brightness=-0.45:saturation=0.7,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='Make clips like this with AI':fontsize=58:fontcolor=white:borderw=3:bordercolor=black:x=(w-text_w)/2:y=760,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='and earn money on make.fun':fontsize=58:fontcolor=white:borderw=3:bordercolor=black:x=(w-text_w)/2:y=850,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='make.fun/bounty/gta6-clipper-01':fontsize=44:fontcolor=#ffd166:borderw=2:bordercolor=black:x=(w-text_w)/2:y=960,format=yuv420p[v]" \
 -map "[v]" -map 1:a -c:v libx264 -crf 20 -preset medium -r 30 -c:a aac -b:a 128k -af "afade=t=out:st=6:d=1" -t 7 segB.mp4

# Join
printf "file 'segA1.mp4'\nfile 'segA2.mp4'\nfile 'segB.mp4'\n" > concat2.txt
ffmpeg -f concat -safe 0 -i concat2.txt -c copy ../clip/gta6-clip-vertical.mp4
```

(One failed attempt is in the session log: the first render of segA1 put
the drawtext filter after the `[v]` output label, which ffmpeg rejected;
the command above is the corrected version that produced the final file.)

## YouTube upload — title and description

- **Channel:** DZ Toons — https://www.youtube.com/@dz_toons
- **Publish as:** Public Short (under 60 s, vertical), any time from now
  until entries close 23 Nov 2026 08:00 WIB. Keep it public until the
  results are out.
- **Suggested title:** `GTA 6 IS FINALLY HERE 🔥 Vice City is insane #GTA6 #Shorts`
- **Description (paste exactly — the first line is required word for word,
  then the play code):**

```text
GTA 6 IS FINALLY HERE! Vice City has never looked this good — car chases, dirt-bike jumps, explosions and a biplane over the beach, all from Rockstar's official GTA VI Launch Trailer.

Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01

Play code: makefun-bloom-dewdrop-ledge

#GTA6 #GTA6Trailer #ViceCity #RockstarGames #Shorts
```

- **Play codes** (verified 20 Nov 2026 via
  `GET /api/competitions/gta6-clipper-01/play-code`, account @doskko-00;
  any one passes — the description above uses n=0):
  - n=0: `makefun-bloom-dewdrop-ledge`
  - n=1: `makefun-manatee-moth-dynamo`
  - n=2: `makefun-eclipse-garland-paddle`
  - n=3: `makefun-market-badge-otter`
  - Referral code: `m1k9n352` (https://make.fun/r/m1k9n352)
- **After upload:** copy the Share URL into `VIDEO.json` as
  `{"url": "https://www.youtube.com/shorts/<id>"}`, then push the repo,
  bundle the transcripts and submit. The video must be public and its
  description must carry the line and the play code, or the gate refuses it.

## What remains before submitting

1. Upload `clip/gta6-clip-vertical.mp4` to @dz_toons as a Public Short with
   the title/description above.
2. Put the real Short URL in `VIDEO.json` (it currently holds a TODO
   placeholder, so `main.ts` and the pre-submit check fail on it on purpose).
3. Create the GitHub repo `dzaksanho11-spec/gta6-clipper` (public, created
   after the bounty opened 20 Nov 2026 01:00 UTC), push this directory, set
   About: description "GTA 6 IS FINALLY HERE — a 14.5-second vertical Short cut from Rockstar's GTA VI Launch Trailer. Built by an AI agent for make.fun's 'Clip GTA 6 for the most YouTube views' bounty, $500 in USDC.", homepage
   https://make.fun/bounty/gta6-clipper-01, topics makefun, ai-agents,
   bounties, growth.
4. Bundle this session's transcripts (`node cli/makefun.mjs bundle`) and run
   `node cli/makefun.mjs check --kit . --repo <repo> --transcripts <bundle>`.
5. Submit with the kit CLI before 23 Nov 2026 08:00 WIB.
