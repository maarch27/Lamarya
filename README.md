# Lamarya – creator website

Baby pink and burgundy creator portfolio built with Next.js.

## Change the content
Everything (name, text, stats, socials, reels, brands, services, testimonials) is in **`app/content.ts`**. Lines marked `TODO` are placeholders.

## Photos
1. Put photos in `public/image/` (JPG, PNG or WEBP; HEIC is converted with `node scripts/gen-images.mjs --heic` after `npm i -D heic-convert`).
2. Write the file names for the hero, about and "little things" photos in `PHOTOS` inside `app/content.ts`.
3. Every other photo in `public/image/` shows up in the scrapbook gallery automatically.

## Reels
Add each Instagram reel to `REELS` in `app/content.ts`: the `id` is the part after `/reel/` in the link, `cat` is its category and `cover` is an optional photo from `public/image/`.

## Run and deploy
`npm install` then `npm run dev`. On Vercel, import this repo (Next.js is detected automatically) and deploy.
