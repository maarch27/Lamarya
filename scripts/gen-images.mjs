// Run once from the project root:  node scripts/gen-images.mjs
// 1) converts every HEIC/HEIF in public/image to JPG (browsers can't show HEIC)
// 2) writes public/image/index.json so the site shows every photo automatically
import { readdirSync, readFileSync, writeFileSync, existsSync, cpSync } from "node:fs";
import { join } from "node:path";

const dir = "public/image";
// Photos kept in app/image are not served by Next.js, so copy them to public/image.
if (!existsSync(dir) && existsSync("app/image")) { cpSync("app/image", dir, { recursive: true }); console.log("copied app/image -> public/image"); }
if (!existsSync(dir)) { console.log(`No photos folder yet (${dir}). Add your photos there; the site falls back to placeholders until then.`); process.exit(0); }

const withHeic = process.argv.includes("--heic"); // HEIC is skipped unless you ask: node scripts/gen-images.mjs --heic
const heic = withHeic ? readdirSync(dir).filter((f) => /\.(heic|heif)$/i.test(f)) : [];
if (heic.length) {
  let convert;
  try { convert = (await import("heic-convert")).default; }
  catch { console.log(`Found ${heic.length} HEIC photos. Run:  npm i -D heic-convert   then run this script again.`); }
  if (convert) {
    for (const f of heic) {
      const out = join(dir, f.replace(/\.(heic|heif)$/i, ".jpg"));
      if (existsSync(out)) continue;
      try {
        const buf = await convert({ buffer: readFileSync(join(dir, f)), format: "JPEG", quality: 0.9 });
        writeFileSync(out, Buffer.from(buf));
        console.log("converted", f, "->", out.split("/").pop());
      } catch (e) { console.log("could not convert", f, String(e.message || e)); }
    }
  }
}

const web = readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f) && !f.startsWith("_") && !f.startsWith(".")).sort();
writeFileSync(join(dir, "index.json"), JSON.stringify(web, null, 2));
console.log(`Done: ${web.length} photos listed in ${dir}/index.json`);
