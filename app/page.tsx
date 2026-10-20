"use client";

import { useEffect, useState } from "react";
import {
  NAME, FIRST_NAME, ROLE, BASED, EMAIL, SOCIAL, PHOTOS, HERO_CAPTIONS, HEADLINE, BADGES, STATS,
  ABOUT_TITLE, ABOUT_TEXT, SKILLS, NOTES, CATS, REELS, BRANDS, SERVICES, STEPS, QUOTES, PROJECT_TYPES,
  type Cat, type Reel, type SocialIcon,
} from "./content";

const P = (n: string) => "/image/" + encodeURIComponent(n);
const igUrl = (r: Reel) => `https://www.instagram.com/${r.type === "p" ? "p" : "reel"}/${r.id}/`;

/* =====================================================================
   SMALL PIECES
   ===================================================================== */
function Photo({ src, alt, pos, eager, label = "photo coming", onLoad }: { src?: string; alt: string; pos?: string; eager?: boolean; label?: string; onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return <span className="ph" role="img" aria-label={alt}><Heart /><span>{label}</span></span>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={P(src)} alt={alt} style={pos ? { objectPosition: pos } : undefined} loading={eager ? "eager" : "lazy"} onError={() => setBad(true)} onLoad={onLoad} />;
}

function Polaroid({ src, alt, caption, className = "", eager }: { src?: string; alt: string; caption?: string; className?: string; eager?: boolean }) {
  return (
    <figure className={`pola ${className}`}>
      <span className="tape" aria-hidden="true" />
      <div className="pola-img"><Photo src={src} alt={alt} eager={eager} /></div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Heart({ className = "" }: { className?: string }) {
  return <svg className={`heart ${className}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.6 4 7.1 4c2 0 3.6 1.1 4.9 2.9C13.3 5.1 14.9 4 16.9 4c3.5 0 5.7 3.6 4.4 7.1-1.8 4.8-9.3 9.4-9.3 9.4z" /></svg>;
}

function Bow({ className = "" }: { className?: string }) {
  return (
    <svg className={`bow ${className}`} viewBox="0 0 120 90" aria-hidden="true">
      <path d="M60 38 C44 18 14 8 8 22 C3 34 22 50 60 44 Z" />
      <path d="M60 38 C76 18 106 8 112 22 C117 34 98 50 60 44 Z" />
      <path d="M56 44 C50 60 40 74 30 86 L44 84 L50 90 C56 76 60 62 60 48 Z" />
      <path d="M64 44 C70 60 80 74 90 86 L76 84 L70 90 C64 76 60 62 60 48 Z" />
      <ellipse cx="60" cy="41" rx="9" ry="8" />
    </svg>
  );
}

function Sticker({ text, className = "" }: { text: string; className?: string }) {
  const id = `c-${className.replace(/\W/g, "")}`;
  return (
    <div className={`sticker ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs><path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
        <text><textPath href={`#${id}`} textLength="272" lengthAdjust="spacing">{text}</textPath></text>
      </svg>
      <Heart />
    </div>
  );
}

function Icon({ name }: { name: SocialIcon }) {
  const q = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "ig") return <svg {...q}><rect x="3" y="3" width="18" height="18" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.3" cy="6.7" r=".6" fill="currentColor" /></svg>;
  if (name === "tt") return <svg {...q}><path d="M14 3v11.2a3.7 3.7 0 1 1-3.7-3.7" /><path d="M14 3c.4 2.6 2 4.3 4.8 4.6" /></svg>;
  if (name === "yt") return <svg {...q}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></svg>;
  if (name === "pin") return <svg {...q}><circle cx="12" cy="12" r="9.2" /><path d="M10.6 17.5l1.7-7M9.8 13.2c-.6-2.6 1.1-4.4 3-4.4 1.6 0 2.7 1.1 2.7 2.6 0 2-1.2 3.4-2.6 3.4-.8 0-1.4-.6-1.2-1.3" /></svg>;
  return <svg {...q}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6.2L20.5 7" /></svg>;
}

function Socials({ className }: { className: string }) {
  return (
    <ul className={className}>
      {SOCIAL.map((s) => (
        <li key={s.name}><a href={s.url} target={s.icon === "mail" ? undefined : "_blank"} rel="noreferrer" aria-label={s.name}><Icon name={s.icon} /><span>{s.name}</span></a></li>
      ))}
    </ul>
  );
}

function Head({ no, title, accent, text }: { no: string; title: string; accent: string; text?: string }) {
  return (
    <div className="head rv">
      <p className="kicker"><Heart /> {no}</p>
      <h2>{title} <em>{accent}</em></h2>
      {text && <p className="head-p">{text}</p>}
    </div>
  );
}

/* Next 14 days: the coming week always shows as booked. */
function Availability() {
  const [days, setDays] = useState<{ w: string; d: string; m: string; booked: boolean; today: boolean; full: string }[]>([]);
  useEffect(() => {
    setDays(Array.from({ length: 14 }, (_, i) => {
      const x = new Date(); x.setDate(x.getDate() + i);
      return {
        w: x.toLocaleDateString("en-GB", { weekday: "short" }), d: String(x.getDate()), m: x.toLocaleDateString("en-GB", { month: "short" }),
        booked: i < 7, today: i === 0, full: x.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
      };
    }));
  }, []);
  return (
    <div className="cal" aria-label="Availability for the next two weeks">
      {days.map((x) => x.booked
        ? <div className="day booked" key={x.full} aria-label={`${x.full}, fully booked`}><span>{x.today ? "Today" : x.w}</span><b>{x.d}</b><small>{x.m}</small><i>booked</i></div>
        : <a className="day open" key={x.full} href={`mailto:${EMAIL}?subject=${encodeURIComponent("Booking request: " + x.full)}`}><span>{x.w}</span><b>{x.d}</b><small>{x.m}</small><i>request</i></a>)}
    </div>
  );
}

/* =====================================================================
   PAGE
   ===================================================================== */
export default function Home() {
  const [files, setFiles] = useState<string[]>([]);
  const [cat, setCat] = useState<Cat>(CATS[0]);
  const [reel, setReel] = useState<Reel | null>(null);
  const [lb, setLb] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [f, setF] = useState({ name: "", email: "", brand: "", type: PROJECT_TYPES[0], details: "" });

  useEffect(() => {
    fetch("/image/index.json").then((r) => (r.ok ? r.json() : [])).then((j) => Array.isArray(j) && setFiles(j)).catch(() => {});
  }, []);

  // gentle reveal on scroll
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = Array.from(document.querySelectorAll(".rv"));
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [files.length]);

  const used = new Set<string>([...PHOTOS.hero, PHOTOS.about, ...PHOTOS.notes, ...REELS.map((r) => r.cover ?? "")].filter(Boolean));
  const gallery = files.filter((n) => !used.has(n));
  const galleryItems: (string | null)[] = gallery.length ? gallery : Array.from({ length: 8 }, () => null);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLb(null); setReel(null); }
      if (gallery.length && e.key === "ArrowRight") setLb((i) => (i === null ? i : (i + 1) % gallery.length));
      if (gallery.length && e.key === "ArrowLeft") setLb((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [gallery.length]);

  const world = REELS.filter((r) => r.cat === cat);
  const send = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const body = `Name: ${f.name}\nEmail: ${f.email}\nBrand / company: ${f.brand}\nProject type: ${f.type}\n\nProject details:\n${f.details}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Collaboration enquiry: " + f.brand)}&body=${encodeURIComponent(body)}`;
  };
  const nav: [string, string][] = [["#about", "About"], ["#work", "Work"], ["#services", "Services"], ["#book", "Book"], ["#contact", "Contact"]];

  return (
    <main className="site">
      <header className="top">
        <a href="#home" className="logo">{NAME}<Heart /></a>
        <nav aria-label="Main" className={menu ? "open" : ""}>
          {nav.map(([h, t]) => <a key={h} href={h} onClick={() => setMenu(false)}>{t}</a>)}
        </nav>
        <a className="pill" href="#contact">Work with me</a>
        <button className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}><span /><span /></button>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="hello">hello, gorgeous brands</p>
          <h1><span>{NAME}</span><Bow className="h1-bow" /></h1>
          <p className="role">{ROLE} <i>·</i> {BASED}</p>
          <p className="lede">{HEADLINE}</p>
          <div className="actions">
            <a className="btn" href="#contact">Let&apos;s collaborate</a>
            <a className="btn ghost" href="#work">See my work</a>
          </div>
          <ul className="badges">{BADGES.map((b) => <li key={b}><Heart /> {b}</li>)}</ul>
        </div>
        <div className="hero-art">
          <Polaroid className="p1" src={PHOTOS.hero[0]} alt={`${FIRST_NAME}, main photo`} caption={HERO_CAPTIONS[0]} eager />
          <Polaroid className="p2" src={PHOTOS.hero[1]} alt={`${FIRST_NAME}, photo 2`} caption={HERO_CAPTIONS[1]} eager />
          <Polaroid className="p3" src={PHOTOS.hero[2]} alt={`${FIRST_NAME}, photo 3`} caption={HERO_CAPTIONS[2]} eager />
          <Sticker className="st-hero" text="booked worldwide ♥ brand fave ♥ " />
          <Heart className="float h1f" /><Heart className="float h2f" /><Heart className="float h3f" />
        </div>
      </section>

      <div className="ribbon" aria-label="Brands I have worked with">
        <div className="ribbon-row">{[...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => <span key={i}>{b}<Heart /></span>)}</div>
      </div>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-art rv">
          <Polaroid className="pa" src={PHOTOS.about} alt={`Portrait of ${FIRST_NAME}`} caption="that's me ♥" />
          <Bow className="about-bow" />
        </div>
        <div className="about-copy rv">
          <p className="kicker"><Heart /> 01 · About</p>
          <h2>{ABOUT_TITLE} <em>{FIRST_NAME}.</em></h2>
          {ABOUT_TEXT.map((t) => <p key={t}>{t}</p>)}
          <ul className="skills">{SKILLS.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </section>

      <section className="stats" aria-label="In numbers">
        <ul>{STATS.map(([v, l], i) => <li key={l} className={`rv s${i}`}><b>{v}</b><span>{l}</span></li>)}</ul>
      </section>

      {/* LITTLE THINGS */}
      <section className="notes">
        <Head no="02 · The girl behind the camera" title="Little things" accent="about me." />
        <div className="notes-grid">
          <div className="notes-photos rv">
            <Polaroid className="pn1" src={PHOTOS.notes[0]} alt={`${FIRST_NAME}, lifestyle photo`} />
            <Polaroid className="pn2" src={PHOTOS.notes[1]} alt={`${FIRST_NAME}, behind the scenes`} />
          </div>
          <ul className="note-cards">
            {NOTES.map(([t, d], i) => <li key={t} className={`rv n${i}`}><span className="pin" aria-hidden="true" /><h3>{t}</h3><p>{d}</p></li>)}
          </ul>
        </div>
      </section>

      {/* WORK */}
      <section className="work" id="work">
        <Head no="03 · Campaigns" title="Pick a mood," accent="press play." text="Choose a category and watch real campaigns straight from Instagram." />
        <div className="tabs" role="tablist">
          {CATS.map((c) => <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <div className="reels" key={cat}>
          {world.length
            ? world.map((r) => (
              <button key={r.id} className="reel" onClick={() => setReel(r)} aria-label={`Play ${r.title}`}>
                <span className="reel-img"><Photo src={r.cover} alt="" label={r.title} /></span>
                <span className="reel-play" aria-hidden="true">▶</span>
                <span className="reel-t">{r.title}</span>
              </button>))
            : Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="reel soon"><span className="reel-img"><Photo alt="" label={`${cat} reel coming`} /></span><span className="reel-t">{cat} campaign</span></div>
            ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <Head no="04 · Scrapbook" title="My creative" accent="world." text="Photos from shoots, campaigns and everyday moments. Tap one to see it bigger." />
        <div className="scrap">
          {galleryItems.map((n, i) => n
            ? <button key={n} className={`sc sc${i % 5}`} onClick={() => setLb(i)} aria-label="Open photo"><span className="tape" aria-hidden="true" /><Photo src={n} alt={`${FIRST_NAME} portfolio photo`} /></button>
            : <div key={i} className={`sc sc${i % 5}`}><span className="tape" aria-hidden="true" /><Photo alt="" /></div>)}
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands">
        <Head no="05 · Brands" title="Brands that" accent="trust me." />
        <ul className="stamps">{BRANDS.map((b, i) => <li key={b + i} className="rv"><span>{b}</span></li>)}</ul>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <Head no="06 · Services" title="What I can" accent="create for you." text="Every package is shaped around your goal and usage rights. Tell me what you need and I'll send a tailored quote." />
        <ul className="svc">
          {SERVICES.map(([t, d], i) => (
            <li key={t} className="rv">
              <span className="svc-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3><p>{d}</p>
              <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Enquiry: " + t)}`}>Ask about this <Heart /></a>
            </li>
          ))}
        </ul>
        <div className="steps rv">
          <h3>How we work <em>together</em></h3>
          <ol>{STEPS.map(([t, d], i) => <li key={t}><b>{i + 1}</b><h4>{t}</h4><p>{d}</p></li>)}</ol>
        </div>
      </section>

      {/* LOVE NOTES */}
      <section className="love">
        <Head no="07 · Kind words" title="Love notes" accent="from brands." />
        <div className="letters">
          {QUOTES.map((x, i) => (
            <figure key={i} className={`letter rv l${i % 3}`}>
              <Heart className="seal" />
              <blockquote>{x.q}</blockquote>
              <figcaption>with love, {x.by}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* BOOK */}
      <section className="book" id="book">
        <Head no="08 · Booking" title="Save the" accent="date." text="The coming week is fully booked. Pick an open day and send me your request, I'll confirm by email." />
        <Availability />
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-in">
          <div className="contact-copy">
            <Bow className="contact-bow" />
            <p className="kicker light"><Heart /> 09 · Business inquiries</p>
            <h2>Let&apos;s create something <em>lovely.</em></h2>
            <p>Share the product, the goal and the timeline, and I&apos;ll get back to you with ideas.</p>
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <Socials className="soc" />
          </div>
          <form onSubmit={send} className="form">
            <label>Your name<input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" /></label>
            <label>Email<input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" /></label>
            <label>Brand or company<input required value={f.brand} onChange={(e) => setF({ ...f, brand: e.target.value })} autoComplete="organization" /></label>
            <label>Project type<select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>{PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
            <label>Project details<textarea required rows={4} value={f.details} onChange={(e) => setF({ ...f, details: e.target.value })} placeholder="Product, goal, timeline, usage rights…" /></label>
            <button className="btn light" type="submit">Send my inquiry</button>
          </form>
        </div>
      </section>

      <footer className="foot">
        <a href="#home" className="logo">{NAME}<Heart /></a>
        <Socials className="icons" />
        <small>© {new Date().getFullYear()} {NAME} · made with love</small>
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
      {reel && (
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
