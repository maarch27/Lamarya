"use client";

import { useEffect, useState } from "react";
import {
  NAME, FIRST_NAME, ROLE, BASED, NICHES, EMAIL, INSTAGRAM, SOCIAL, PHOTOS, HEADLINE, BADGES, STATS,
  ABOUT_TITLE, ABOUT_TEXT, SKILLS, NOTES, NOTES_TITLE, CATS, REELS, BRANDS, SERVICES, STEPS, QUOTES,
  PROJECT_TYPES, HIGHLIGHTS, GALLERY_ORDER, type Cat, type Reel, type SocialIcon,
} from "./content";

const P = (n: string) => "/image/" + encodeURIComponent(n);
const igUrl = (r: Reel) => `https://www.instagram.com/${r.type === "p" ? "p" : "reel"}/${r.id}/`;

/* =====================================================================
   SMALL PIECES
   ===================================================================== */
function Photo({ src, alt, pos, eager, label = "photo coming" }: { src?: string; alt: string; pos?: string; eager?: boolean; label?: string }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) return <span className="ph" role="img" aria-label={alt}><Heart /><span>{label}</span></span>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={P(src)} alt={alt} style={pos ? { objectPosition: pos } : undefined} loading={eager ? "eager" : "lazy"} onError={() => setBad(true)} />;
}

function Heart({ className = "" }: { className?: string }) {
  return <svg className={`heart ${className}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.6 4 7.1 4c2 0 3.6 1.1 4.9 2.9C13.3 5.1 14.9 4 16.9 4c3.5 0 5.7 3.6 4.4 7.1-1.8 4.8-9.3 9.4-9.3 9.4z" /></svg>;
}

function Spark({ className = "" }: { className?: string }) {
  return <svg className={`spark ${className}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5z" /></svg>;
}

/* A caption written the way she writes on her reels:
   handwritten line on top, big bold caps, italic "part" underneath. */
function Caption({ top, big, part, as: Tag = "h2", className = "" }: { top?: string; big: string; part?: string; as?: "h1" | "h2" | "h3"; className?: string }) {
  return (
    <Tag className={`cap ${className}`}>
      {top && <span className="cap-top">{top}</span>}
      <span className="cap-big">{big}</span>
      {part && <span className="cap-part">{part}</span>}
    </Tag>
  );
}

function Head({ part, top, big, text }: { part: string; top: string; big: string; text?: string }) {
  return (
    <div className="head rv">
      <Caption top={top} big={big} part={part} />
      {text && <p className="head-p">{text}</p>}
    </div>
  );
}

/* Story progress bars, like the top of an Instagram story */
function Bars({ n = 3, active = 0 }: { n?: number; active?: number }) {
  return <span className="bars" aria-hidden="true">{Array.from({ length: n }, (_, i) => <i key={i} className={i < active ? "done" : i === active ? "now" : ""} />)}</span>;
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

/* Sends the inquiry straight to her inbox through FormSubmit (free, no account).
   The very first message triggers an "Activate form" email to EMAIL: click it once. */
async function sendInquiry(fields: Record<string, string>, subject: string) {
  const r = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...fields, _subject: subject, _replyto: fields["Email"], _template: "table", _captcha: "false" }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || String(j.success) !== "true") throw new Error(j.message || "Could not send");
}

/* Next 14 days: the coming week always shows as booked. */
function Availability({ onPick }: { onPick: (day: string) => void }) {
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
        : <button type="button" className="day open" key={x.full} onClick={() => onPick(x.full)} aria-label={`Request ${x.full}`}><span>{x.w}</span><b>{x.d}</b><small>{x.m}</small><i>request</i></button>)}
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
  const blank = { name: "", email: "", brand: "", type: PROJECT_TYPES[0], date: "", details: "" };
  const [f, setF] = useState(blank);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    fetch("/image/index.json").then((r) => (r.ok ? r.json() : [])).then((j) => Array.isArray(j) && setFiles(j)).catch(() => {});
  }, []);

  // gentle reveal on scroll
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = Array.from(document.querySelectorAll(".rv:not(.in)"));
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [files.length, cat]);

  const used = new Set<string>([...PHOTOS.hero, PHOTOS.about, ...PHOTOS.notes, ...REELS.map((r) => r.cover ?? "")].filter(Boolean));
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
  const send = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await sendInquiry(
        { Name: f.name, Email: f.email, "Brand / company": f.brand, "Project type": f.type, "Preferred date": f.date || "Flexible", "Project details": f.details },
        `New collaboration inquiry: ${f.brand}`,
      );
      setStatus("sent");
      setF(blank);
    } catch {
      setStatus("error");
    }
  };
  const pickDay = (day: string) => {
    setF((v) => ({ ...v, date: day }));
    setStatus("idle");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const nav: [string, string][] = [["#about", "About"], ["#work", "Work"], ["#services", "Services"], ["#love", "Reviews"], ["#book", "Book"]];

  return (
    <main className="site">
      <header className="top">
        <a href="#home" className="logo"><span className="logo-s">Dr.</span>Lamarya<Spark /></a>
        <nav aria-label="Main" className={menu ? "open" : ""}>
          {nav.map(([h, t]) => <a key={h} href={h} onClick={() => setMenu(false)}>{t}</a>)}
        </nav>
        <a className="pill" href="#contact">Collab with me</a>
        <button className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}><span /><span /></button>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="role">{ROLE}</p>
          <Caption as="h1" top="Welcome to" big={NAME} part="your favorite creator" className="hero-cap" />
          <p className="lede">{HEADLINE}</p>
          <ul className="niches">{NICHES.map((n) => <li key={n}>{n}</li>)}</ul>
          <div className="actions">
            <a className="btn" href="#contact">Let&apos;s collaborate</a>
            <a className="btn ghost" href="#work">Watch my work</a>
          </div>
          <p className="based"><span aria-hidden="true">📍</span> {BASED}</p>
        </div>

        <div className="hero-art">
          <div className="story back" aria-hidden="true">
            <Photo src={PHOTOS.hero[1]} alt="" eager pos="center 25%" />
          </div>
          <div className="story main">
            <Bars n={3} active={1} />
            <span className="story-user"><span className="av"><Photo src={PHOTOS.hero[2]} alt="" eager pos="center 30%" /></span>dr.lamarya <small>· Paris</small></span>
            <Photo src={PHOTOS.hero[0]} alt={`${FIRST_NAME}, ${ROLE}`} eager pos="72% 30%" />
            <span className="story-cap"><span className="cap-top">Glow up with</span><span className="cap-big">your brand</span></span>
          </div>
          <span className="chip c1"><Heart /> {BADGES[0]}</span>
          <span className="chip c2"><Spark /> {BADGES[1]}</span>
          <Spark className="tw t1" /><Spark className="tw t2" /><Spark className="tw t3" />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <nav className="highlights" aria-label="Highlights">
        <ul>{HIGHLIGHTS.map(([t, img, href]) => (
          <li key={t}><a href={href}><span className="ring"><span className="hl-img"><Photo src={img} alt="" pos="center 25%" /></span></span><span>{t}</span></a></li>
        ))}</ul>
      </nav>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-art rv">
          <div className="frame-soft"><Photo src={PHOTOS.about} alt={`Portrait of ${FIRST_NAME}`} pos="center 30%" /></div>
          <span className="tag-hand">{`that's me ✨`}</span>
        </div>
        <div className="about-copy rv">
          <Caption top={ABOUT_TITLE} big={FIRST_NAME} part="Part 1 · about me" />
          {ABOUT_TEXT.map((t) => <p key={t}>{t}</p>)}
          <ul className="skills">{SKILLS.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </section>

      <section className="stats" aria-label="In numbers">
        <ul>{STATS.map(([v, l]) => <li key={l} className="rv"><b>{v}</b><span>{l}</span></li>)}</ul>
      </section>

      {/* WHY ME */}
      <section className="why">
        <Head part="Part 2" top={NOTES_TITLE[0]} big={NOTES_TITLE[1]} />
        <div className="why-grid">
          <div className="why-photos rv">
            <div className="frame-soft w1"><Photo src={PHOTOS.notes[0]} alt={`${FIRST_NAME} in Paris`} /></div>
            <div className="frame-soft w2"><Photo src={PHOTOS.notes[1]} alt={`${FIRST_NAME} at golden hour`} /></div>
          </div>
          <ol className="why-list">
            {NOTES.map(([t, d], i) => <li key={t} className="rv"><span className="why-n">0{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>)}
          </ol>
        </div>
      </section>

      {/* WORK */}
      <section className="work" id="work">
        <Head part="Part 3" top="Press play on" big="my edits" text="Hooks, storytelling and series that keep people watching: glow ups, try-ons, unboxings and before and afters." />
        <div className="tabs" role="tablist">
          {CATS.map((c) => <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <div className="reels" key={cat}>
          {world.map((r, i) => {
            const inner = (<>
              <span className="reel-img"><Photo src={r.cover} alt="" label={r.title} pos="center 30%" /></span>
              <Bars n={Math.min(4, world.length)} active={Math.min(i, 3)} />
              <span className="reel-play" aria-hidden="true">▶</span>
              <span className="reel-t"><span className="cap-top">{r.cat}</span>{r.title}</span>
            </>);
            return r.id
              ? <button key={r.title} className="reel" onClick={() => setReel(r)} aria-label={`Play ${r.title}`}>{inner}</button>
              : <a key={r.title} className="reel" href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label={`${r.title}, see it on Instagram`}>{inner}</a>;
          })}
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <Head part="Part 4" top="Photo dump," big="Paris edition" text="UGC photos from everyday moments at home to outdoor adventures. Tap one to see it bigger." />
        <div className="dump">
          {gallery.map((n, i) => (
            <button key={n} className={`dp dp${i % 6}`} onClick={() => setLb(i)} aria-label="Open photo"><Photo src={n} alt={`${FIRST_NAME}, UGC photo`} /></button>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section className="brands" id="brands">
        <Head part="Part 5" top="Trusted by" big="100+ brands" />
        <ul className="brand-cloud">{BRANDS.map((b, i) => <li key={b} className={`rv b${i % 4}`}>{b}</li>)}</ul>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <Head part="Part 6" top="What I" big="create" text="Raw and edited content for ads, brand and organic use. Tell me your goal and I'll send a tailored quote." />
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
          <Caption as="h3" top="my" big="approach" />
          <ol>{STEPS.map(([t, d], i) => <li key={t}><b>{i + 1}</b><h4>{t}</h4><p>{d}</p></li>)}</ol>
        </div>
      </section>

      {/* LOVE NOTES (as DMs) */}
      <section className="love" id="love">
        <Head part="Part 7" top="What brands" big="tell me" text="Real messages from brands after we worked together." />
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
        <Head part="Part 8" top="Save the" big="date" text="The coming week is fully booked. Pick an open day and send your request, I'll confirm by email." />
        <Availability onPick={pickDay} />
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-in">
          <div className="contact-copy">
            <Caption top="Let's make your" big="product" part="more memorable" />
            <p>Add more value to your brand and support your business goals with content that feels real. Share the product, the goal and the timeline.</p>
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <Socials className="soc" />
          </div>
          <form onSubmit={send} className="form">
            <label>Your name<input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" /></label>
            <label>Email<input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" /></label>
            <label>Brand or company<input required value={f.brand} onChange={(e) => setF({ ...f, brand: e.target.value })} autoComplete="organization" /></label>
            <label>Project type<select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>{PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
            <label>Preferred date<input value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} placeholder="Pick a day in the calendar or write one" /></label>
            <label>Project details<textarea required rows={4} value={f.details} onChange={(e) => setF({ ...f, details: e.target.value })} placeholder="Product, goal, timeline, usage rights…" /></label>
            <button className="btn light" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send my inquiry"}</button>
            {status === "sent" && <p className="fmsg ok" role="status">Thank you! Your inquiry was sent, I&apos;ll get back to you soon ♥</p>}
            {status === "error" && <p className="fmsg err" role="alert">Sorry, it didn&apos;t go through. Please email me directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>}
          </form>
        </div>
      </section>

      <footer className="foot">
        <a href="#home" className="logo"><span className="logo-s">Dr.</span>Lamarya<Spark /></a>
        <Socials className="icons" />
        <small>© {new Date().getFullYear()} {NAME} · Contact me and start creating today</small>
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
