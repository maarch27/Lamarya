/* =====================================================================
   EVERYTHING ABOUT THE CREATOR LIVES IN THIS FILE.
   Change text, links, photos and reels here; the design updates itself.
   Lines marked TODO still wait for material.
   ===================================================================== */

export const NAME = "Dr. Lamarya";
export const FIRST_NAME = "Lamara";
export const ROLE = "UGC creator · Lifestyle";
export const BASED = "Paris & USA · Your local Paris guide";
export const NICHES = ["Beauty", "Fashion", "Health", "Travel", "Tech"];
export const LINKTREE = "https://linktr.ee/Dr.lamarya";
export const EMAIL = "collaboration@drlamarya.com";
export const INSTAGRAM = "https://www.instagram.com/dr.lamarya/";

export type SocialIcon = "ig" | "tt" | "yt" | "pin" | "mail";
export const SOCIAL: { name: string; icon: SocialIcon; url: string }[] = [
  { name: "Instagram", icon: "ig", url: INSTAGRAM },
  { name: "TikTok", icon: "tt", url: "https://www.tiktok.com/@lamarya.ugc" },
  { name: "Email", icon: "mail", url: `mailto:${EMAIL}` },
];

/* ---------------------------------------------------------------------
   PHOTOS live in public/image/. Every photo there that is not used
   below (or as a video cover) appears in the scrapbook gallery.
   --------------------------------------------------------------------- */
export const PHOTOS = {
  hero: ["black-dress.jpg", "red-tennis-dress.jpg", "eiffel-sunset.jpg"], // big one first
  about: "floral-dress-stairs.jpg",
  notes: ["eiffel-glasses.jpg", "golden-hour.jpg"],
};



export const HEADLINE = "I create engaging, relatable content that inspires my audience to feel confident and elevate daily life.";
export const BADGES = ["Trusted by 100+ brands", "Limited spots each month"];

// From her profile screenshots (update when the new TikTok screenshots arrive)
export const STATS: [string, string][] = [
  ["44.7K", "Instagram followers"],
  ["10.5K", "TikTok followers"],
  ["246K", "views in 30 days"],
  ["100+", "brands"],
  ["95%", "US, UK & Europe audience"],
];

export const ABOUT_TITLE = "Hi, I'm";
export const ABOUT_TEXT = [
  "I'm a creator who brings brands and businesses to consumers with real, unfiltered, relatable content. I create content about health, beauty, clothing, electronics, tech, skincare and makeup.",
  "Before I film anything, I study the brand, the product and its goal, so what reaches the audience feels trustworthy. With high-quality visuals, hooks and storytelling, every video feels like a recommendation from a friend you trust.",
];
export const SKILLS = ["Hooks & storytelling", "Creative direction", "Filming", "Editing", "UGC photography", "Raw & edited files"];

// "Why brands work with me"
export const NOTES_TITLE = ["Why brands", "work with me."];
export const NOTES: [string, string][] = [
  ["Authentic & conversational", "Content that talks to people like a friend would, which is exactly what builds trust."],
  ["Premium quality", "High-quality video and photography, shot indoors and out, edited with care."],
  ["Natural storytelling", "Relatable stories that place your product in real life, never a stiff ad."],
  ["Fast & reliable", "Quick replies, smooth communication and on-time delivery, revisions included."],
  ["Made for today's audience", "Content tailored to young professionals who want to feel confident every day."],
];

/* ---------------------------------------------------------------------
   WORK. cover is a still in public/image. Add an Instagram id (the part
   after /reel/ in the link) to make a card play the video on the site;
   cards without an id open her Instagram profile.
   --------------------------------------------------------------------- */
export const CATS = ["Lifestyle", "Fashion", "Unboxing", "Beauty & Tech"] as const;
export type Cat = (typeof CATS)[number];
export type Reel = { id?: string; type?: "p"; title: string; cat: Cat; cover?: string };
export const REELS: Reel[] = [
  { title: "Summer glow up, part 1", cat: "Lifestyle", cover: "v-summer-glow-1.jpg" },
  { title: "Summer glow up, part 2", cat: "Lifestyle", cover: "v-summer-glow-2.jpg" },
  { title: "Summer glow up series", cat: "Lifestyle", cover: "v-summer-glow-3.jpg" },
  { title: "Eyewear lifestyle", cat: "Lifestyle", cover: "v-eyewear.jpg" },
  { title: "Whimvoy watch", cat: "Lifestyle", cover: "v-whimvoy-watch.jpg" },
  { title: "Summer look try-on", cat: "Fashion", cover: "v-yellow-jumpsuit.jpg" },
  { title: "Heels unboxing", cat: "Fashion", cover: "v-heels-unboxing.jpg" },
  { title: "Outfit try-on", cat: "Fashion", cover: "v-outfit-try-on.jpg" },
  { title: "JJ's House dress", cat: "Fashion", cover: "v-jjs-house.jpg" },
  { title: "Hobibear barefoot shoes", cat: "Fashion", cover: "v-hobibear-shoes.jpg" },
  { title: "Gift unboxing story", cat: "Unboxing", cover: "v-unboxing-gift.jpg" },
  { title: "Sunglasses unboxing", cat: "Unboxing", cover: "v-sunglasses.jpg" },
  { title: "Jewelry, aesthetic ad style", cat: "Unboxing", cover: "v-jewelry-aesthetic.jpg" },
  { title: "Skincare before & after", cat: "Beauty & Tech", cover: "v-before-after.jpg" },
  { title: "Tech & app review", cat: "Beauty & Tech", cover: "v-tech-app.jpg" },
];

export const BRANDS: string[] = [
  "JJ's House", "Voghion", "Eydology", "StyleWe", "Faherty", "Italo Jewelry", "SilkSilky", "Pom Pêche",
  "Hobibear", "Meitia", "Samiol", "JardiVue", "Hana Koko", "Thome", "Soonding", "Juryinspire", "Whimvoy",
];

export const SERVICES: [string, string][] = [
  ["UGC video ads", "Scroll-stopping videos with hooks and storytelling, delivered raw and edited for paid media."],
  ["UGC photos", "Natural lifestyle photos, from everyday moments at home to outdoor adventures."],
  ["Instagram Reels & Stories", "Native Reels and Stories that feel like a real recommendation."],
  ["Feed posts", "Polished, on-brand posts for your social media feed."],
  ["Unboxing & try-on", "First impressions and try-ons that build curiosity and drive purchases."],
  ["Reviews & testimonials", "Honest, trustworthy reviews that help customers decide. UGC blogs and much more on request."],
];

export const STEPS: [string, string][] = [
  ["Say hello", "Share your product, goal and timeline."],
  ["Learn your brand", "I study your brand voice, target audience and campaign goals."],
  ["Creative direction", "Scroll-stopping ideas tailored for social and paid media."],
  ["Delivery", "Raw and edited files in platform-optimized formats."],
];

export const QUOTES: { q: string; by: string }[] = [
  { q: "It was truly a pleasure working with you. We truly appreciate the time and thought you put into filming, editing, and presenting the glasses in such a beautiful way.", by: "Eydology" },
  { q: "The video is awesome and brilliant!!! Our ads department would love to promote this content to gain more views.", by: "Voghion" },
  { q: "The quality of your content is consistently beautiful, and I can see the care and effort you put into every post.", by: "Rainie, brand partner" },
  { q: "Thank you so much for the beautiful and engaging content! I'm truly grateful for the opportunity to collaborate with you.", by: "Meitia, Callie Gifts" },
  { q: "You look gorgeous!!!! Thank you so much for your beautiful photos, we really appreciate your support.", by: "Pom Pêche" },
  { q: "Thank you so much, dear. This video is truly adorable.", by: "Hobibear" },
];

export const PROJECT_TYPES = ["UGC video ad", "UGC photos", "Reel or Story", "Unboxing or try-on", "Review / testimonial", "Not sure yet"];

// Story-highlight circles under the hero (label, photo, section link)
export const HIGHLIGHTS: [string, string, string][] = [
  ["About me", "floral-dress-stairs.jpg", "#about"],
  ["Glow up", "v-summer-glow-2.jpg", "#work"],
  ["Paris", "eiffel-portrait.jpg", "#gallery"],
  ["Brands", "v-jjs-house.jpg", "#brands"],
  ["Reviews", "glasses-selfie.jpg", "#love"],
  ["Book me", "golden-hour.jpg", "#book"],
];
