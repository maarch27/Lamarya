/* =====================================================================
   EVERYTHING ABOUT THE CREATOR LIVES IN THIS FILE.
   Change text, links, photos and reels here; the design updates itself.
   Lines marked TODO are placeholders waiting for the real material.
   ===================================================================== */

export const NAME = "Lamarya"; // TODO: final name / logo wording
export const FIRST_NAME = "Lamarya"; // TODO: how she signs ("Hi, I'm …")
export const ROLE = "UGC & lifestyle creator"; // TODO
export const BASED = "Based in Paris · Booked worldwide"; // TODO
export const EMAIL = "hello@lamarya.com"; // TODO: real business email

export type SocialIcon = "ig" | "tt" | "yt" | "pin" | "mail";
export const SOCIAL: { name: string; icon: SocialIcon; url: string }[] = [
  { name: "Instagram", icon: "ig", url: "https://www.instagram.com/" }, // TODO
  { name: "TikTok", icon: "tt", url: "https://www.tiktok.com/" }, // TODO
  { name: "YouTube", icon: "yt", url: "https://www.youtube.com/" }, // TODO
  { name: "Pinterest", icon: "pin", url: "https://www.pinterest.com/" }, // TODO
  { name: "Email", icon: "mail", url: `mailto:${EMAIL}` },
];

/* ---------------------------------------------------------------------
   PHOTOS: put her photos in public/image/ and write the file names here.
   Empty strings show a soft pink "photo coming" frame until filled.
   Every photo in public/image that is not used below appears in the
   scrapbook gallery automatically.
   --------------------------------------------------------------------- */
export const PHOTOS = {
  hero: ["", "", ""], // three taped polaroids on the first screen (big one first)
  about: "", // portrait beside "Hi, I'm …"
  notes: ["", ""], // two small photos in "Little things about me"
};

// Handwritten captions under the hero polaroids
export const HERO_CAPTIONS = ["a day in my life", "on set", "golden hour"]; // TODO

export const HEADLINE = "Soft, real content that makes people stop scrolling and start buying."; // TODO
export const BADGES = ["Limited spots each month", "A brand favorite"];

export const STATS: [string, string][] = [
  ["00K", "followers"], // TODO
  ["00+", "brands"], // TODO
  ["0+", "years creating"], // TODO
  ["0.0M", "monthly views"], // TODO
];

export const ABOUT_TITLE = "Hi, I'm";
export const ABOUT_TEXT = [
  "I'm a content creator who turns everyday moments into campaigns that feel warm, honest and a little bit dreamy. Beauty, fashion and lifestyle are my world, and I bring every product into it naturally.", // TODO
  "I handle the idea, styling, filming and editing myself, so brands get one person who understands the full story from the first brief to the final cut.", // TODO
];
export const SKILLS = ["Concept & scripting", "Styling", "Filming", "Editing", "Voice-over", "Photography"]; // TODO

// "Little things about me": short, personal facts
export const NOTES: [string, string][] = [
  ["My style", "Soft colours, natural light and real moments over perfect poses."], // TODO
  ["My audience", "Mostly women who love beauty, fashion and a pretty everyday life."], // TODO
  ["My promise", "Clear communication, honest ideas and delivery on time, every time."], // TODO
];

/* ---------------------------------------------------------------------
   WORK: Instagram reels / posts. id is the part after /reel/ in the link.
   Example: https://www.instagram.com/reel/ABC123/  ->  id "ABC123"
   cover (optional) is a photo in public/image used as the card picture.
   --------------------------------------------------------------------- */
export const CATS = ["Beauty", "Fashion", "Lifestyle", "Tech"] as const; // TODO: her 3 to 5 categories
export type Cat = (typeof CATS)[number];
export type Reel = { id: string; type?: "p"; title: string; cat: Cat; cover?: string };
export const REELS: Reel[] = [
  // TODO: add her reels, e.g. { id: "ABC123", title: "Morning skincare", cat: "Beauty", cover: "IMG_0001.jpg" },
];

export const BRANDS: string[] = [
  // TODO: brand names she has worked with
  "Brand one", "Brand two", "Brand three", "Brand four", "Brand five", "Brand six", "Brand seven", "Brand eight",
];

export const SERVICES: [string, string][] = [
  ["UGC videos", "Natural videos built around your product, with hook, script, filming and edit included."],
  ["Instagram Reels", "Sponsored Reels with a strong first second and a story made for the feed."],
  ["TikTok content", "Trend-aware, native videos that feel like a friend's recommendation."],
  ["Photos & carousels", "Styled product and lifestyle photos for your feed, site and ads."],
  ["Unboxings & try-ons", "First impressions, swatches and try-ons that feel genuine, never staged."],
  ["Paid ads content", "Hook variations and usage rights so your team can test what performs."],
]; // TODO: adjust to her real services

export const STEPS: [string, string][] = [
  ["Say hello", "Tell me about the product, the goal and your timeline."],
  ["The idea", "I send a concept, hook and script for your approval."],
  ["Creating", "I style, film and edit everything myself."],
  ["Delivery", "Final videos and photos, ready to post or run as ads."],
];

export const QUOTES: { q: string; by: string }[] = [
  // TODO: real words from brands (DMs, emails)
  { q: "A short, real quote from a brand she worked with goes here.", by: "Brand name" },
  { q: "Another kind message from a happy brand partner goes here.", by: "Brand name" },
  { q: "One more testimonial about working together goes here.", by: "Brand name" },
];

export const PROJECT_TYPES = ["UGC video", "Reel or TikTok", "Photos", "Unboxing or try-on", "Not sure yet"];
