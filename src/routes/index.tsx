import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  ClipboardList,
  Home,
  IceCreamCone,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

import bannerAsset from "@/assets/unnamed_1.webp.asset.json";
import storeAsset from "@/assets/unnamed.webp.asset.json";
import logoAsset from "@/assets/unnamed_5.webp.asset.json";
import pistachioAsset from "@/assets/unnamed_7.webp.asset.json";
import waffleAsset from "@/assets/unnamed_3.webp.asset.json";
import bobaAsset from "@/assets/unnamed_9.webp.asset.json";
import menuBoardAsset from "@/assets/unnamed_8.webp.asset.json";
import drinksBoardAsset from "@/assets/lonchi-drinks-menu-clean.webp.asset.json";

const ADDRESS =
  "CB 29 Kachukhet, Puraton Bazar, Muslim Modern School Road, Dhaka Cantonment, opposite Akram Masjid, Dhaka 1206";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Lonchi Ice Cream & More, ${ADDRESS}`,
)}`;
const PHONE = "01609-905226";
const PHONE_URL = `tel:+880${PHONE.replace(/\D/g, "").slice(1)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lonchi Ice Cream & More | Dhaka Cantonment" },
      {
        name: "description",
        content:
          "Discover Lonchi's ice cream, loaded waffles and bubble tea in Kachukhet, Dhaka Cantonment. View the menu, call or get directions.",
      },
      { property: "og:title", content: "Lonchi Ice Cream & More" },
      {
        property: "og:description",
        content: "Ice cream, loaded waffles and bubble tea in Dhaka Cantonment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const favourites = [
  {
    name: "Purely Pistachio",
    type: "Signature scoop",
    note: "A rich pistachio scoop finished with roasted nuts.",
    price: "from 80 Tk",
    image: pistachioAsset.url,
  },
  {
    name: "Loaded Chocolate Waffle",
    type: "Warm & indulgent",
    note: "Crisp waffle, chocolate ice cream and a generous chocolate pour.",
    price: "made to order",
    image: waffleAsset.url,
  },
  {
    name: "Blueberry Cream Boba",
    type: "Shaken drink",
    note: "Blueberry, whipped cream and chewy pearls in every sip.",
    price: "from 170 Tk",
    image: bobaAsset.url,
  },
];

const ticker = ["Fresh scoops", "Loaded waffles", "Bubble tea", "Kachukhet, Dhaka"];

function Index() {
  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
        <div className="nav-shell mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" aria-label="Lonchi home" className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Lonchi<span className="text-primary">.</span>
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-7 text-sm font-bold">
            <a href="#favourites" className="hidden transition-colors hover:text-primary md:inline">Favourites</a>
            <a href="#menu" className="hidden transition-colors hover:text-primary md:inline">Menu</a>
            <a href="#visit" className="hidden transition-colors hover:text-primary md:inline">Visit</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="cta-pill inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-primary-foreground sm:px-5">
              Directions <Navigation className="h-4 w-4" />
            </a>
          </nav>
        </div>
      </header>

      <section className="hero relative flex min-h-[92svh] items-end overflow-hidden">
        <img src={bannerAsset.url} alt="Lonchi ice cream cones and tubs" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-scrim absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-hero/30 bg-hero/10 px-3 py-2 text-xs font-extrabold uppercase text-hero backdrop-blur-md">
              <Sparkles className="h-4 w-4" /> Ice cream & more · Dhaka
            </div>
            <h1 className="font-display text-[clamp(3.7rem,10vw,8.8rem)] leading-[0.82] text-hero">
              Ice cream<br /><span className="hero-outline">solves</span> everything.
            </h1>
            <p className="mt-7 max-w-xl text-base font-semibold leading-relaxed text-hero/80 sm:text-lg">
              Big flavours, joyful scoops, loaded waffles and freshly shaken boba in the heart of Kachukhet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#favourites" className="cta-pill inline-flex items-center gap-2 bg-accent px-6 py-3.5 font-extrabold text-accent-foreground">
                Explore flavours <ArrowDown className="h-4 w-4" />
              </a>
              <a href={PHONE_URL} className="cta-pill inline-flex items-center gap-2 border border-hero/40 bg-hero/10 px-6 py-3.5 font-extrabold text-hero backdrop-blur-md">
                <Phone className="h-4 w-4" /> Call us
              </a>
            </div>
          </div>
          <div className="hidden text-right text-hero lg:block">
            <p className="text-xs font-extrabold uppercase text-hero/60">Find us at</p>
            <p className="mt-2 max-w-xs font-bold">Opposite Akram Masjid<br />Dhaka Cantonment</p>
          </div>
        </div>
      </section>

      <div className="marquee overflow-hidden bg-accent py-3.5 text-accent-foreground">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {ticker.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center gap-5 whitespace-nowrap px-5 font-display text-base font-bold uppercase sm:px-8 sm:text-lg">
                  {item}<span aria-hidden="true">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="favourites" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-label">Start here</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-none sm:text-6xl">The favourites worth melting for.</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">Three different moods. One very good reason to save room for dessert.</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {favourites.map((item, index) => (
            <Reveal key={item.name} delay={index * 100}>
              <TiltCard max={7} className="product-card h-full overflow-hidden bg-card">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  <span className="absolute left-4 top-4 bg-card px-3 py-1.5 text-xs font-extrabold uppercase text-card-foreground">{item.type}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl leading-tight">{item.name}</h3>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                  <p className="mt-5 text-xs font-extrabold uppercase text-primary">{item.price}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="menu" className="menu-band scroll-mt-24 py-20 text-menu-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="section-label text-menu-muted">The full line-up</p>
              <h2 className="mt-3 font-display text-4xl leading-none sm:text-6xl">Pick your pleasure.</h2>
            </div>
            <p className="max-w-sm text-menu-muted">Scoops, sundaes, waffles, milk teas and fruit-forward boba — all in one place.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { src: menuBoardAsset.url, alt: "Lonchi ice cream menu with flavours and prices", label: "Ice cream menu" },
              { src: drinksBoardAsset.url, alt: "Lonchi drinks menu with milk teas and boba", label: "Drinks menu" },
            ].map((board, index) => (
              <Reveal key={board.label} delay={index * 120}>
                <figure className="menu-poster overflow-hidden">
                  <img src={board.src} alt={board.alt} loading="lazy" className="w-full" />
                  <figcaption className="flex items-center justify-between border-t border-menu-border px-4 py-3 text-sm font-bold">
                    {board.label}<span className="text-menu-muted">Tap to zoom</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-10">
          <Reveal>
            <div className="store-frame relative overflow-hidden">
              <img src={storeAsset.url} alt="Inside Lonchi ice cream shop in Kachukhet" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="absolute bottom-4 left-4 bg-card px-4 py-3 text-sm font-bold text-card-foreground shadow-soft">
                Kachukhet · Dhaka Cantonment
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-label">Come by</p>
            <h2 className="mt-3 font-display text-4xl leading-none sm:text-6xl">Your next sweet stop.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{ADDRESS}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="action-tile group">
                <span className="icon-box"><MapPin className="h-5 w-5" /></span>
                <span><strong>Get directions</strong><small>Open in Google Maps</small></span>
                <ArrowUpRight className="ml-auto h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a href={PHONE_URL} className="action-tile group">
                <span className="icon-box"><Phone className="h-5 w-5" /></span>
                <span><strong>Call Lonchi</strong><small>{PHONE}</small></span>
                <ArrowUpRight className="ml-auto h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border pb-28 pt-12 md:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-end lg:px-10">
          <div className="flex items-center gap-4">
            <img src={logoAsset.url} alt="Lonchi logo" className="h-16 w-16 object-cover" />
            <div><p className="font-display text-2xl">Lonchi.</p><p className="text-sm text-muted-foreground">Ice Cream & More</p></div>
          </div>
          <p className="max-w-md text-sm text-muted-foreground md:text-right">Ice cream solves everything.<br />Kachukhet, Dhaka Cantonment · {PHONE}</p>
        </div>
      </footer>

      <nav aria-label="Mobile navigation" className="mobile-nav fixed inset-x-3 bottom-3 z-50 md:hidden">
        <div className="grid grid-cols-4 px-2 py-2 text-[10px] font-bold">
          {[
            { href: "#top", label: "Home", Icon: Home },
            { href: "#favourites", label: "Scoops", Icon: IceCreamCone },
            { href: "#menu", label: "Menu", Icon: ClipboardList },
            { href: "#visit", label: "Visit", Icon: MapPin },
          ].map(({ href, label, Icon }) => (
            <a key={label} href={href} className="flex min-h-12 flex-col items-center justify-center gap-1 text-muted-foreground transition-colors active:text-primary">
              <Icon className="h-5 w-5" strokeWidth={2.2} />{label}
            </a>
          ))}
        </div>
      </nav>
    </main>
  );
}