"use client";

import { useEffect, useRef, useState } from "react";
import {
  NAME, FIRST_NAME, EMAIL, INSTAGRAM, SOCIAL, PHOTOS, GALLERY_ORDER, HERO, ABOUT, STATS, WHY, CATS, REELS,
  BRAND_COUNT, BRAND_LOGOS, SERVICES, STEPS, QUOTES, PROJECT_TYPES, HIGHLIGHTS,
  type Cat, type Reel, type SocialIcon,
} from "./content";

const P = (n: string) => "/image/" + encodeURIComponent(n);
const igUrl = (r: Reel) => `https://www.instagram.com/${r.type === "p" ? "p" : "reel"}/${r.id}/`;

/* =====================================================================
   LITTLE PIECES
   ===================================================================== */
function Photo({ src, alt, pos, eager }: { src?: string; alt: string; pos?: string; eager?: boolean }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return <span className="ph" role="img" aria-label={alt}>♡</span>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={P(src)} alt={alt} style={pos ? { objectPosition: pos } : undefined} loading={eager ? "eager" : "lazy"} onError={() => setBad(true)} />;
}

const Heart = ({ className = "" }: { className?: string }) => (
  <svg className={`heart ${className}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.6 4 7.1 4c2 0 3.6 1.1 4.9 2.9C13.3 5.1 14.9 4 16.9 4c3.5 0 5.7 3.6 4.4 7.1-1.8 4.8-9.3 9.4-9.3 9.4z" /></svg>
);

const Bow = ({ className = "" }: { className?: string }) => (
  <svg className={`bow ${className}`} viewBox="0 0 120 80" aria-hidden="true">
    <path d="M60 36C46 14 16 6 10 20c-5 12 14 26 50 22z" /><path d="M60 36C74 14 104 6 110 20c5 12-14 26-50 22z" />
    <path d="M56 42c-6 14-14 26-22 36l12-2 5 6c6-12 9-26 9-38z" /><path d="M64 42c6 14 14 26 22 36l-12-2-5 6c-6-12-9-26-9-38z" />
    <ellipse cx="60" cy="39" rx="9" ry="8" />
  </svg>
);

const Sparkle = ({ className = "" }: { className?: string }) => (
  <svg className={`sparkle ${className}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c.5 5 5 9.5 10 10-5 .5-9.5 5-10 10-.5-5-5-9.5-10-10 5-.5 9.5-5 10-10z" /></svg>
);

/* soft wavy edge between sections */
const Wave = ({ className = "" }: { className?: string }) => (
  <svg className={`wave ${className}`} viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 30C120 5 240 5 360 30s240 25 360 0 240-25 360 0 240 25 360 0V60H0z" />
  </svg>
);

/* section title: handwritten tag + soft heading + squiggle */
function Title({ tag, children, text }: { tag: string; children: React.ReactNode; text?: string }) {
  return (
    <div className="title rv">
      <span className="tag">{tag}</span>
      <h2>{children}</h2>
      <svg className="squiggle" viewBox="0 0 160 14" aria-hidden="true"><path d="M2 8c10-8 20 8 30 0s20 8 30 0 20 8 30 0 20 8 30 0 20 8 30 0" /></svg>
      {text && <p>{text}</p>}
    </div>
  );
}

function Icon({ name }: { name: SocialIcon }) {
  const q = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "ig") return <svg {...q}><rect x="3" y="3" width="18" height="18" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.3" cy="6.7" r=".6" fill="currentColor" /></svg>;
  if (name === "tt") return <svg {...q}><path d="M14 3v11.2a3.7 3.7 0 1 1-3.7-3.7" /><path d="M14 3c.4 2.6 2 4.3 4.8 4.6" /></svg>;
  if (name === "yt") return <svg {...q}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></svg>;
  if (name === "pin") return <svg {...q}><circle cx="12" cy="12" r="9.2" /><path d="M10.6 17.5l1.7-7M9.8 13.2c-.6-2.6 1.1-4.4 3-4.4 1.6 0 2.7 1.1 2.7 2.6 0 2-1.2 3.4-2.6 3.4-.8 0-1.4-.6-1.2-1.3" /></svg>;
  return <svg {...q}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6.2L20.5 7" /></svg>;
}

/* Sends the letter straight to her inbox through FormSubmit (free, no account).
   The very first message triggers an "Activate form" email to EMAIL: click it once. */
async function sendLetter(fields: Record<string, string>, subject: string) {
  const r = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...fields, _subject: subject, _replyto: fields["Email"], _template: "table", _captcha: "false" }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || String(j.success) !== "true") throw new Error(j.message || "Could not send");
}

/* =====================================================================
   DAY STRIP (her booking calendar)
   3 weeks of little day cards you can swipe. Today is always skipped,
   tomorrow is open in the morning only (until 12:00), and every day after
   that is open with 2-3 times. The times change once a day, the same for
   every visitor.
   ===================================================================== */
const TIMES: [string, string][] = [["10:00", "morning"], ["12:00", "midday"], ["14:00", "afternoon"], ["16:30", "golden hour"]];
const MORNING = TIMES.map(([t]) => t <= "12:00");
type StripDay = { key: string; w: string; d: number; m: string; full: string; open: boolean; times: boolean[] };

function rng(seed: number) {
  let n = seed | 0;
  return () => {
    n = (n + 0x6d2b79f5) | 0;
    let t = Math.imul(n ^ (n >>> 15), 1 | n);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildStrip(): StripDay[] {
  const now = new Date();
  return Array.from({ length: 21 }, (_, i) => {
    const x = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const rnd = rng(x.getFullYear() * 10000 + (x.getMonth() + 1) * 100 + x.getDate() + 7);
    let times: boolean[];
    if (i === 0) times = TIMES.map(() => false);
    else if (i === 1) times = MORNING;
    else {
      const keep = 2 + (rnd() < 0.5 ? 1 : 0);
      const order = TIMES.map((_, k) => ({ k, r: rnd() })).sort((a, b) => a.r - b.r).slice(0, keep).map((o) => o.k);
      times = TIMES.map((_, k) => order.includes(k));
    }
    return {
      key: x.toDateString(), d: x.getDate(), open: times.some(Boolean), times,
      w: i === 0 ? "today" : i === 1 ? "tomorrow" : x.toLocaleDateString("en-GB", { weekday: "short" }).toLowerCase(),
      m: x.toLocaleDateString("en-GB", { month: "short" }).toLowerCase(),
      full: x.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
    };
  });
}

function DayStrip({ onPick }: { onPick: (when: string) => void }) {
  const [days, setDays] = useState<StripDay[]>([]);
  const [sel, setSel] = useState("");
  const [time, setTime] = useState("");
  const strip = useRef<HTMLDivElement>(null);
  useEffect(() => { setDays(buildStrip()); }, []);
  const cur = days.find((x) => x.key === sel);
  const nudge = (dir: number) => strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <div className="strip-wrap rv">
      <div className="strip-nav">
        <button type="button" onClick={() => nudge(-1)} aria-label="Earlier days">‹</button>
        <span>swipe for more days</span>
        <button type="button" onClick={() => nudge(1)} aria-label="Later days">›</button>
      </div>
      <div className="strip" ref={strip}>
        {days.map((x) => x.open
          ? <button key={x.key} type="button" className={`dc open${sel === x.key ? " on" : ""}`} aria-pressed={sel === x.key} aria-label={`${x.full}, available`} onClick={() => { setSel(x.key); setTime(""); }}>
              <span className="dc-w">{x.w}</span><b>{x.d}</b><span className="dc-m">{x.m}</span><i><Heart /> open</i>
            </button>
          : <div key={x.key} className="dc full" aria-label={`${x.full}, fully booked`}>
              <span className="dc-w">{x.w}</span><b>{x.d}</b><span className="dc-m">{x.m}</span><i>full</i>
            </div>)}
      </div>
      <div className="times" aria-live="polite">
        {cur ? (<>
          <p>what time works for you on <b>{cur.full}</b>? <small>(Paris time)</small></p>
          <div>
            {TIMES.map(([t, label], k) => cur.times[k] && (
              <button key={t} type="button" className={time === t ? "on" : ""} onClick={() => { setTime(t); onPick(`${cur.full} at ${t} (Paris time)`); }}>
                <b>{t}</b><span>{label}</span>
              </button>
            ))}
          </div>
          {time && <p className="picked">lovely, I added it to your letter below ♡</p>}
        </>) : <p>tap a day with a little heart to see the times ♡</p>}
      </div>
    </div>
  );
}

/* =====================================================================
   PAGE
   ===================================================================== */
const BLANK = { name: "", brand: "", type: PROJECT_TYPES[0], date: "", email: "", idea: "" };

export default function Home() {
  const [files, setFiles] = useState<string[]>([]);
  const [cat, setCat] = useState<Cat>(CATS[0]);
  const [reel, setReel] = useState<Reel | null>(null);
  const [lb, setLb] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [f, setF] = useState(BLANK);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    fetch("/image/index.json").then((r) => (r.ok ? r.json() : [])).then((j) => Array.isArray(j) && setFiles(j)).catch(() => {});
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = Array.from(document.querySelectorAll(".rv:not(.in)"));
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [files.length, cat]);

  const used = new Set<string>([PHOTOS.heart, PHOTOS.oval, PHOTOS.ticket, PHOTOS.about, PHOTOS.letter, ...PHOTOS.why, ...REELS.map((r) => r.cover ?? "")].filter(Boolean));
  const rest = files.filter((n) => !used.has(n));
  const gallery = [...GALLERY_ORDER.filter((n) => rest.includes(n)), ...rest.filter((n) => !GALLERY_ORDER.includes(n))];

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLb(null); setReel(null); }
      if (gallery.length && e.key === "ArrowRight") setLb((i) => (i === null ? i : (i + 1) % gallery.length));
      if (gallery.length && e.key === "ArrowLeft") setLb((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [gallery.length]);

  const world = REELS.filter((r) => r.cat === cat);
  const rows: [string, string][][] = [];
  for (let i = 0; i < BRAND_LOGOS.length; i += 6) rows.push(BRAND_LOGOS.slice(i, i + 6));

  const toLetter = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  const pick = (when: string) => { setF((v) => ({ ...v, date: when })); setStatus("idle"); setTimeout(toLetter, 500); };
  const askFor = (type: string) => { setF((v) => ({ ...v, type })); setStatus("idle"); toLetter(); };

  const send = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await sendLetter(
        { Name: f.name, Email: f.email, Brand: f.brand, "They would love": f.type, Date: f.date || "flexible", "The idea": f.idea },
        `♡ New letter from ${f.brand || f.name}`,
      );
      setStatus("sent");
      setF(BLANK);
    } catch {
      setStatus("error");
    }
  };

  const nav: [string, string][] = [["#about", "about"], ["#work", "videos"], ["#brands", "brands"], ["#love", "love notes"], ["#book", "book"]];

  return (
    <main className="site">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="clip-heart" clipPathUnits="objectBoundingBox">
            <path d="M.5.97C.22.78 0 .58 0 .31 0 .13.14 0 .3 0 .4 0 .46.05.5.14.54.05.6 0 .7 0 .86 0 1 .13 1 .31 1 .58.78.78.5.97z" />
          </clipPath>
        </defs>
      </svg>

      <header className="top">
        <div className="top-pill">
          <a href="#home" className="logo"><span>Dr.</span> Lamarya<Heart /></a>
          <nav aria-label="Main" className={menu ? "open" : ""}>
            {nav.map(([h, t]) => <a key={h} href={h} onClick={() => setMenu(false)}>{t}</a>)}
          </nav>
          <a className="say-hi" href="#contact">say hi <Heart /></a>
          <button className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}><span /><span /></button>
        </div>
      </header>

      {/* FIRST SCREEN */}
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="hello">{HERO.hello} <Heart /></p>
          <h1><span className="h1-dr">Dr.</span> Lamarya</h1>
          <p className="note">{HERO.note}</p>
          <p className="lede">{HERO.text}</p>
          <ul className="niches">{HERO.niches.map((n) => <li key={n}>{n}</li>)}</ul>
          <div className="actions">
            <a className="btn" href="#contact">let&apos;s work together <Heart /></a>
            <a className="btn soft" href="#work">see my videos</a>
          </div>
          <p className="place">📍 {HERO.place}</p>
        </div>

        <div className="hero-art" aria-label={`Photos of ${FIRST_NAME}`}>
          <div className="heart-photo"><Photo src={PHOTOS.heart} alt={`${FIRST_NAME} in a red dress in Paris`} pos="66% 22%" eager /></div>
          <div className="oval-photo"><Photo src={PHOTOS.oval} alt={`${FIRST_NAME} at night with the Eiffel Tower`} pos="50% 30%" eager /></div>
          <div className="ticket-photo"><Photo src={PHOTOS.ticket} alt={`${FIRST_NAME} smiling`} pos="50% 35%" eager /><span>ugc ♡ paris</span></div>
          <span className="status"><i /> {HERO.status}</span>
          <Bow className="hero-bow" />
          <Sparkle className="sp1" /><Sparkle className="sp2" /><Sparkle className="sp3" />
        </div>
      </section>

      <nav className="bubbles" aria-label="Quick links">
        <ul>{HIGHLIGHTS.map(([t, img, href]) => (
          <li key={t}><a href={href}><span className="bub"><Photo src={img} alt="" pos="50% 25%" /></span><span>{t}</span></a></li>
        ))}</ul>
      </nav>

      {/* ABOUT */}
      <section className="about" id="about">
        <Wave className="w-pink-l" />
        <div className="about-in">
          <div className="about-art rv">
            <Bow className="about-bow" />
            <div className="egg"><Photo src={PHOTOS.about} alt={`${FIRST_NAME} in a floral dress on the Trocadéro steps`} pos="50% 35%" /></div>
            <span className="handnote">that&apos;s me, in my favorite dress</span>
          </div>
          <div className="about-copy rv">
            <span className="tag">nice to meet you</span>
            <h2>{ABOUT.title}</h2>
            {ABOUT.text.map((t) => <p key={t}>{t}</p>)}
            <ul className="things">{ABOUT.things.map((t) => <li key={t}><Heart /> {t}</li>)}</ul>
          </div>
        </div>
        <ul className="numbers">
          {STATS.map(([v, l]) => <li key={l} className="rv"><b>{v}</b><span>{l}</span></li>)}
        </ul>
      </section>

      {/* WHY */}
      <section className="why">
        <Title tag="the honest answer">why brands keep coming back</Title>
        <div className="why-in">
          <ul className="why-cards">
            {WHY.map(([ic, t, d]) => <li key={t} className="rv"><span className="why-ic" aria-hidden="true">{ic}</span><div><h3>{t}</h3><p>{d}</p></div></li>)}
          </ul>
          <div className="why-photos rv">
            <div className="pill-photo"><Photo src={PHOTOS.why[0]} alt={`${FIRST_NAME} in a red dress with a flowing scarf`} pos="55% 30%" /></div>
            <div className="circle-photo"><Photo src={PHOTOS.why[1]} alt={`${FIRST_NAME} holding a perfume bottle`} pos="50% 30%" /></div>
            <span className="why-note">red dress era ♡</span>
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section className="work" id="work">
        <Wave className="w-pink-m" />
        <Title tag="press play" text="A few favorites: my glow up series, try-ons, unboxings and before & afters. Tap one to watch it on my Instagram.">my little videos</Title>
        <div className="tabs" role="tablist">
          {CATS.map((c) => <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <div className="reels" key={cat}>
          {world.map((r) => {
            const inner = (<>
              <span className="reel-img"><Photo src={r.cover} alt="" pos="50% 30%" /><span className="play" aria-hidden="true">▶</span></span>
              <span className="reel-t">{r.title}</span>
            </>);
            return r.id
              ? <button key={r.title} className="reel" onClick={() => setReel(r)} aria-label={`Play ${r.title}`}>{inner}</button>
              : <a key={r.title} className="reel" href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label={`${r.title}, watch on Instagram`}>{inner}</a>;
          })}
        </div>
      </section>

      {/* PHOTO DUMP */}
      <section className="gallery" id="gallery">
        <Title tag="camera roll" text="Some of my favorite UGC photos, from my little apartment to the streets of Paris. Tap one to see it bigger.">photo dump</Title>
        <div className="dump">
          {gallery.map((n, i) => (
            <button key={n} className={`dp s${i % 5}`} onClick={() => setLb(i)} aria-label="Open photo"><Photo src={n} alt={`${FIRST_NAME}, UGC photo`} /></button>
          ))}
        </div>
      </section>

      {/* BRANDS: charm bracelet */}
      <section className="brands" id="brands">
        <Wave className="w-cream" />
        <div className="brand-head rv">
          <div className="big-bubble"><b>{BRAND_COUNT}</b><span>brands</span></div>
          <div>
            <span className="tag">my charm bracelet</span>
            <h2>brands I&apos;ve loved working with</h2>
            <p>Every brand I work with becomes a little charm on my bracelet. Here are just a few of them.</p>
          </div>
        </div>
        <div className="bracelet">
          {rows.map((row, r) => (
            <div className="chain rv" key={r}>
              <svg className="string" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6 Q150 36 300 18 T600 6" /></svg>
              <ul>{row.map(([file, name], i) => (
                <li key={file} className="charm" style={{ animationDelay: `${-((r * 6 + i) % 7) * 0.45}s` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/brands/${file}.png`} alt={name || "Brand partner logo"} loading="lazy" />
                </li>
              ))}</ul>
            </div>
          ))}
          <p className="more rv"><Heart /> and so many more <Heart /></p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <Title tag="what I can make" text="Raw and edited content for your ads, your page or both. Tell me what you're dreaming of and I'll send you a little quote.">made just for you</Title>
        <ul className="svc">
          {SERVICES.map(([t, d], i) => (
            <li key={t} className="rv">
              <Heart className="svc-h" />
              <h3>{t}</h3><p>{d}</p>
              <button type="button" onClick={() => askFor(PROJECT_TYPES[Math.min(i, PROJECT_TYPES.length - 1)])}>ask me about it →</button>
            </li>
          ))}
        </ul>
        <div className="steps rv">
          <span className="tag">how it works</span>
          <ol>{STEPS.map(([t, d], i) => <li key={t}><b>{i + 1}</b><h4>{t}</h4><p>{d}</p></li>)}</ol>
        </div>
      </section>

      {/* LOVE NOTES */}
      <section className="love" id="love">
        <Wave className="w-pink-l" />
        <Title tag="yes, I screenshot them all" text="Real messages from brands after we worked together.">sweet messages</Title>
        <div className="dms">
          {QUOTES.map((x, i) => (
            <figure key={x.by} className={`dm rv ${i % 2 ? "r" : ""}`}>
              <span className="dm-av" aria-hidden="true">{x.by.charAt(0)}</span>
              <div>
                <figcaption>{x.by}</figcaption>
                <blockquote>{x.q}</blockquote>
                <span className="dm-like" aria-hidden="true"><Heart /></span>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* BOOK */}
      <section className="book" id="book">
        <Title tag="my little planner" text="Today is already full, but almost every other day is open. Pick a day and a time and I'll add it to your letter.">pick a day to film</Title>
        <DayStrip onPick={pick} />
      </section>

      {/* LAST PAGE: love letter */}
      <section className="contact" id="contact">
        <Title tag="write me a little letter" text="Fill in the blanks and it lands straight in my inbox. I read every single one.">let&apos;s make something lovely</Title>
        <div className="letter-wrap">
          <form className="letter rv" onSubmit={send}>
            <div className="stamp" aria-hidden="true"><Photo src={PHOTOS.letter} alt="" pos="50% 30%" /></div>
            <p className="dear">Dear Lamara,</p>
            <p className="lines">
              my name is <input required aria-label="Your name" placeholder="your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" />
              {" "}from <input required aria-label="Brand or company" placeholder="your brand" value={f.brand} onChange={(e) => setF({ ...f, brand: e.target.value })} autoComplete="organization" />
              {" "}and we would love{" "}
              <select aria-label="What you would love" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>{PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
              {" "}from you, ideally on <input aria-label="Preferred date" className="wide" placeholder="a day from your planner" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />.
              {" "}You can write back to me at <input required type="email" aria-label="Your email" className="wide" placeholder="your@email.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" />.
            </p>
            <label className="idea">here&apos;s our little idea:
              <textarea required rows={4} value={f.idea} onChange={(e) => setF({ ...f, idea: e.target.value })} placeholder="the product, what you'd like people to feel, any dates or usage rights…" />
            </label>
            <p className="sign">with love, <b>{f.name || "you"}</b> <Heart /></p>
            <button className="btn" type="submit" disabled={status === "sending"}>{status === "sending" ? "sending…" : <>send with love <Heart /></>}</button>
            {status === "sent" && <p className="fmsg ok" role="status">yay, your letter is on its way! I&apos;ll write back very soon ♡</p>}
            {status === "error" && <p className="fmsg err" role="alert">oh no, it didn&apos;t go through. You can email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ♡</p>}
          </form>
          <aside className="or rv">
            <p>or find me here</p>
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <ul className="soc">{SOCIAL.filter((s) => s.icon !== "mail").map((s) => <li key={s.name}><a href={s.url} target="_blank" rel="noreferrer"><Icon name={s.icon} /> {s.name}</a></li>)}</ul>
          </aside>
        </div>
      </section>

      <footer className="foot">
        <Wave className="w-foot" />
        <p className="bye">see you soon <Heart /></p>
        <ul className="icons">{SOCIAL.map((s) => <li key={s.name}><a href={s.url} target={s.icon === "mail" ? undefined : "_blank"} rel="noreferrer" aria-label={s.name}><Icon name={s.icon} /></a></li>)}</ul>
        <small>© {new Date().getFullYear()} {NAME} · made with love in Paris</small>
      </footer>

      {lb !== null && gallery[lb] && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Photo" onClick={() => setLb(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="big" src={P(gallery[lb])} alt="Enlarged photo" />
          <button className="x" aria-label="Close">×</button>
          {gallery.length > 1 && (<>
            <button className="nav prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setLb((lb - 1 + gallery.length) % gallery.length); }}>‹</button>
            <button className="nav next" aria-label="Next" onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % gallery.length); }}>›</button>
          </>)}
        </div>
      )}
      {reel && reel.id && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={reel.title} onClick={() => setReel(null)}>
          <div className="frame" onClick={(e) => e.stopPropagation()}>
            <iframe src={`${igUrl(reel)}embed`} title={reel.title} allowFullScreen />
            <a href={igUrl(reel)} target="_blank" rel="noreferrer">Open on Instagram</a>
          </div>
          <button className="x" aria-label="Close" onClick={() => setReel(null)}>×</button>
        </div>
      )}
    </main>
  );
}
