# gta6-clipper

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/dzaksanho11-spec/gta6-clipper/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/dzaksanho11-spec/gta6-clipper/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

GTA 6 IS FINALLY HERE — a 14.5-second vertical Short cut from Rockstar Games' official Grand Theft Auto VI Launch Trailer: a green sports car drifting past a police car through Vice City, a dirt-bike jump, Jason walking away from an explosion over the skyline, and a wing-walker biplane trailing pink smoke over the beach. Then the clip turns to the viewer: make clips like this with AI and earn money on make.fun.

The clip is public on YouTube as a Short on the Dz_Toons channel (@dz_toons-iks11). Its address is in `VIDEO.json`. Places in this bounty go by the video's YouTube views, the most first — the top 20 share $500.

## The clip

- **Source:** Rockstar Games, "Grand Theft Auto VI Launch Trailer" — https://www.youtube.com/watch?v=rz1B4B2yBZY (90 s, published 15 Oct 2026, captured in-game on PlayStation 5)
- **Moment used:** 46.5–50.5 s (car drift, police drift, dirt-bike jump) and 52.5–56.0 s (explosion, beach biplane). One continuous chase moment; a single slow 2-second shot in between was cut for pace.
- **Format:** 1080×1920 vertical (9:16), H.264/AAC, 14.5 s, 30 fps — a YouTube Short. The 16:9 frame is blur-filled, not cropped, so nothing is lost at the sides.
- **On screen:** "GTA 6 IS FINALLY HERE" in the first 3 seconds, then a 7-second end card: "Make clips like this with AI and earn money on make.fun — make.fun/bounty/gta6-clipper-01".
- **File:** `clip/gta6-clip-vertical.mp4` (5.3 MB). Full cut list, ffmpeg commands and the suggested title/description are in `CLIP_NOTES.md`.

Footage is Rockstar Games' official trailer, used here as the bounty intends: a clip cut from official GTA VI gameplay/trailer footage, pitched to YouTube viewers with make.fun's pitch inside the clip itself.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`. `main.ts` (Node 22, standard library only) validates that the url is a YouTube video address and copies `VIDEO.json` to the output directory — that is all the program has to do; the house reads the video's views from YouTube itself.

---

<sub>Entered on [make.fun](https://make.fun/?ref=m1k9n352&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>
