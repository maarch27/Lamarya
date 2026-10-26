/* =====================================================================
   EVERYTHING ABOUT LAMARA LIVES IN THIS FILE.
   Change any text, link, photo or reel here; the design updates itself.
   ===================================================================== */

export const NAME = "Dr. Lamarya";
export const FIRST_NAME = "Lamara";
export const EMAIL = "collaboration@drlamarya.com"; // messages from the love-letter form arrive here
export const INSTAGRAM = "https://www.instagram.com/dr.lamarya/";
export const TIKTOK = "https://www.tiktok.com/@lamarya.ugc";

export type SocialIcon = "ig" | "tt" | "yt" | "pin" | "mail";
export const SOCIAL: { name: string; icon: SocialIcon; url: string }[] = [
  { name: "Instagram", icon: "ig", url: INSTAGRAM },
  { name: "TikTok", icon: "tt", url: TIKTOK },
  { name: "Email", icon: "mail", url: `mailto:${EMAIL}` },
];

/* ---------------------------------------------------------------------
   PHOTOS live in public/image/. Every photo there that isn't used
   below (or as a video cover) lands in the photo dump automatically.
   --------------------------------------------------------------------- */
export const PHOTOS = {
  heart: "red-dress-gazebo.jpg", // big heart-shaped photo on the first screen
  oval: "eiffel-night.jpg", // little oval photo next to it
  ticket: "gadget-closeup.jpg", // small "ticket" photo
  about: "floral-dress-stairs.jpg",
  why: ["red-dress-scarf.jpg", "red-dress-perfume.jpg"],
  letter: "plane-travel.jpg", // tiny photo pinned on the love letter
};

export const GALLERY_ORDER = [
  "racecourse-white.jpg", "striped-gown.jpg", "satin-dress-fountain.jpg", "pom-peche-mirror.jpg",
  "w-concept-paris.jpg", "nails-eiffel.jpg", "velvet-crosswalk.jpg", "suede-shoes-grass.jpg",
  "sporty-visor.jpg", "skincare-fation.jpg", "swimwear-collage.jpg", "black-dress.jpg",
  "red-tennis-dress.jpg", "eiffel-sunset.jpg",
];

/* ---------------------------------------------------------------------
   WORDS. Written the way she talks: soft, warm, a little bit cute.
   --------------------------------------------------------------------- */
export const HERO = {
  hello: "hi, I'm Lamara",
  note: "your favorite creator (I hope!)",
  text: "I film cozy, honest little stories around the things I actually love: skincare, pretty outfits, clever gadgets and my favorite corners of Paris. You send the product, I make people fall for it.",
  niches: ["beauty", "fashion", "health", "travel", "tech"],
  place: "Paris & USA, usually with a camera in my bag",
  status: "currently filming in Paris",
};

export const ABOUT = {
  title: "a little about me",
  text: [
    "I'm Lamara, a UGC creator living between Paris and the US. It started with me telling my friends about every product I loved, and them going out to buy it. Now I do the same thing for brands, just with better lighting.",
    "Before I film anything, I get to know you: your product, your people and what you want them to feel. Then I plan, shoot and edit everything myself, so it stays real and sounds like me chatting with a friend.",
  ],
  things: ["hooks that make you stop", "little stories", "filming & editing", "UGC photos", "raw + edited files"],
};

// From her profile screenshots (update when the new TikTok screenshots arrive)
export const STATS: [string, string][] = [
  ["44.7K", "friends on Instagram"],
  ["10.5K", "on TikTok"],
  ["246K", "views last month"],
  ["200+", "brands"],
  ["95%", "US, UK & Europe"],
];

export const WHY: [string, string, string][] = [
  ["♡", "It feels like a friend's tip", "My videos sound like me telling you about something I love, because that's exactly what they are."],
  ["✿", "Pretty, but real", "Soft light, clean edits and real places, at home or out in the city."],
  ["☁", "Little stories", "Your product gets its own moment in my day, so people can picture it in theirs."],
  ["✉", "Easy to work with", "I reply quickly, keep you in the loop and I'm happy to tweak until you love it."],
  ["✦", "An audience that trusts me", "Mostly in the US, UK and Europe, and they actually ask me where things are from."],
];

/* ---------------------------------------------------------------------
   VIDEOS. cover is a still in public/image. Add an Instagram id (the
   part after /reel/ in the link) to make a card play on the site;
   cards without an id open her Instagram.
   --------------------------------------------------------------------- */
export const CATS = ["Lifestyle", "Fashion", "Unboxing", "Beauty & Tech"] as const;
export type Cat = (typeof CATS)[number];
export type Reel = { id?: string; type?: "p"; title: string; cat: Cat; cover?: string };
export const REELS: Reel[] = [
  { title: "Summer glow up, part 1", cat: "Lifestyle", cover: "v-summer-glow-1.jpg" },
  { title: "Summer glow up, part 2", cat: "Lifestyle", cover: "v-summer-glow-2.jpg" },
  { title: "Summer glow up, styling", cat: "Lifestyle", cover: "v-summer-glow-3.jpg" },
  { title: "My new glasses", cat: "Lifestyle", cover: "v-eyewear.jpg" },
  { title: "Whimvoy watch band", cat: "Lifestyle", cover: "v-whimvoy-watch.jpg" },
  { title: "Yellow summer look", cat: "Fashion", cover: "v-yellow-jumpsuit.jpg" },
  { title: "Heels unboxing", cat: "Fashion", cover: "v-heels-unboxing.jpg" },
  { title: "What I ordered", cat: "Fashion", cover: "v-outfit-try-on.jpg" },
  { title: "JJ's House dress", cat: "Fashion", cover: "v-jjs-house.jpg" },
  { title: "Hobibear little shoes", cat: "Fashion", cover: "v-hobibear-shoes.jpg" },
  { title: "Italo jewelry gift", cat: "Unboxing", cover: "v-unboxing-gift.jpg" },
  { title: "Sunglasses unboxing", cat: "Unboxing", cover: "v-sunglasses.jpg" },
  { title: "Jewelry, ad style", cat: "Unboxing", cover: "v-jewelry-aesthetic.jpg" },
  { title: "Clear skin in a week?", cat: "Beauty & Tech", cover: "v-before-after.jpg" },
  { title: "App I use every day", cat: "Beauty & Tech", cover: "v-tech-app.jpg" },
];

/* ---------------------------------------------------------------------
   BRANDS: logos in public/brands/. Leave the name empty when unsure,
   it is only used for screen readers.
   --------------------------------------------------------------------- */
export const BRAND_COUNT = "200+";
export const BRAND_LOGOS: [string, string][] = [
  ["jjs-house", "JJ's House"], ["voghion", "Voghion"], ["eydology", "Eydology"], ["hobibear", "Hobibear"],
  ["pom-peche", "Pom Pêche"], ["stylewe", "StyleWe"], ["meitia", "Meitia"], ["faherty", "Faherty"],
  ["italo-jewelry", "Italo Jewelry"], ["silksilky", "SilkSilky"], ["samiol", "Samiol"], ["soonding", "Soonding"],
  ["hana-koko", "Hana Koko"], ["jardivue", "JardiVue"], ["thome", "Thome"], ["juryinspire", "Juryinspire"],
  ["meitu", "Meitu"], ["w", ""], ["smile", ""], ["b", ""], ["asterisk", ""], ["lashes", ""], ["green", ""], ["n", ""],
];

export const SERVICES: [string, string][] = [
  ["UGC videos", "Short videos with a hook that makes people stop, ready for your ads or your page."],
  ["UGC photos", "Natural photos of your product in real life, at home or out and about."],
  ["Reels & Stories", "Posts that feel at home on Instagram, like I'm sharing a little find with my followers."],
  ["Unboxing & try-on", "That fun first-impressions moment, filmed honestly."],
  ["Reviews", "Real, kind and honest reviews that help people decide."],
  ["Something else?", "A series, a blog post, a little campaign... tell me the idea and we'll make it happen."],
];

export const STEPS: [string, string][] = [
  ["say hi", "Tell me about your product and what you'd love."],
  ["I get to know you", "Your brand, your people and the feeling you want."],
  ["I plan & film", "Ideas, filming and editing, all by me."],
  ["you get your files", "Raw and edited, ready to post or run as ads."],
];

export const QUOTES: { q: string; by: string }[] = [
  { q: "It was truly a pleasure working with you. We truly appreciate the time and thought you put into filming, editing, and presenting the glasses in such a beautiful way.", by: "Eydology" },
  { q: "The video is awesome and brilliant!!! Our ads department would love to promote this content to gain more views.", by: "Voghion" },
  { q: "The quality of your content is consistently beautiful, and I can see the care and effort you put into every post.", by: "Rainie" },
  { q: "Thank you so much for the beautiful and engaging content! I'm truly grateful for the opportunity to collaborate with you.", by: "Meitia" },
  { q: "You look gorgeous!!!! Thank you so much for your beautiful photos, we really appreciate your support.", by: "Pom Pêche" },
  { q: "Thank you so much, dear. This video is truly adorable.", by: "Hobibear" },
];

export const PROJECT_TYPES = ["a UGC video", "some UGC photos", "a Reel or Story", "an unboxing or try-on", "a review", "something else"];

// Little bubbles under the first screen (label, photo, where it jumps)
export const HIGHLIGHTS: [string, string, string][] = [
  ["about me", "floral-dress-stairs.jpg", "#about"],
  ["glow up", "v-summer-glow-2.jpg", "#work"],
  ["paris", "eiffel-sunset.jpg", "#gallery"],
  ["brands", "pom-peche-mirror.jpg", "#brands"],
  ["love notes", "red-dress-perfume.jpg", "#love"],
  ["book me", "racecourse-white.jpg", "#book"],
];
