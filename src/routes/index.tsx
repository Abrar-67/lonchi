import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

import bannerAsset from "@/assets/unnamed_1.webp.asset.json";
import storeAsset from "@/assets/unnamed.webp.asset.json";
import logoAsset from "@/assets/unnamed_5.webp.asset.json";
import pistachioAsset from "@/assets/unnamed_7.webp.asset.json";
import waffleAsset from "@/assets/unnamed_3.webp.asset.json";
import bobaAsset from "@/assets/unnamed_9.webp.asset.json";
import menuBoardAsset from "@/assets/unnamed_8.webp.asset.json";
import drinksBoardAsset from "@/assets/unnamed_6.webp.asset.json";

const ADDRESS =
  "CB 29 Kachukhet, Puraton Bazar, Muslim Modern School Road, Dhaka Cantonment, Opposite of Akram Masjid, Dhaka 1206, Bangladesh";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Lonchi Ice Cream & More, " + ADDRESS,
)}`;
const PHONE = "01609-905226";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lonchi — Ice Cream & More" },
      {
        name: "description",
        content:
          "Lonchi scoops handcrafted ice cream, loaded waffles and bubble tea in Dhaka Cantonment. Ice cream solves everything — come find us.",
      },
      { property: "og:title", content: "Lonchi — Ice Cream & More" },
      {
        property: "og:description",
        content:
          "Handcrafted ice cream, loaded waffles and bubble tea from Lonchi. Ice cream solves everything.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const menu = [
  {
    name: "Purely Pistachio",
    note: "Roasted pistachios folded through slow-churned cream. 80/140 Tk.",
    image: pistachioAsset.url,
  },
  {
    name: "Loaded Chocolate Waffle",
    note: "Warm waffle, brownie crumb and a melting chocolate scoop.",
    image: waffleAsset.url,
  },
  {
    name: "Blueberry Cream Boba",
    note: "Blueberry, whipped cream and chewy pearls, shaken to order.",
    image: bobaAsset.url,
  },
];

const ticker = [
  "Ice cream solves everything",
  "Fresh scoops daily",
  "Loaded waffles",
  "Boba shaken to order",
  "Dhaka Cantonment",
];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

function Index() {
  const y = useScrollY();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* ambient depth */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <span className="blob left-[-10%] top-[-8%] h-[42vw] w-[42vw] bg-primary/40" />
        <span
          className="blob right-[-12%] top-[25%] h-[38vw] w-[38vw] bg-accent/50"
          style={{ animationDelay: "-5s" }}
        />
        <span
          className="blob bottom-[-10%] left-[25%] h-[36vw] w-[36vw] bg-secondary"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      <header className="sticky top-0 z-30">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-border px-6 py-3 shadow-soft glass">
          <span className="font-display text-3xl gradient-text">Lonchi</span>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a href="#menu" className="hidden transition-colors hover:text-primary sm:inline">
              Menu
            </a>
            <a href="#boards" className="hidden transition-colors hover:text-primary sm:inline">
              Prices
            </a>
            <a href="#store" className="hidden transition-colors hover:text-primary sm:inline">
              Our shop
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-3d rounded-full bg-primary px-5 py-2 text-primary-foreground"
            >
              Visit us
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-14">
        <div style={{ perspective: "1400px" }}>
          <div
            className="overflow-hidden rounded-4xl border border-border"
            style={{
              transform: `rotateX(${Math.max(0, 10 - y / 45)}deg) translateY(${-Math.min(y * 0.06, 40)}px)`,
              boxShadow: "var(--shadow-deep)",
              transition: "transform 0.15s linear",
            }}
          >
            <img
              src={bannerAsset.url}
              alt="Lonchi ice cream tubs and cones"
              className="w-full object-cover"
              style={{ transform: `scale(${1 + Math.min(y, 400) / 4000})` }}
            />
          </div>
        </div>

        <Reveal className="mx-auto mt-12 max-w-2xl text-center">
          <h1 className="font-display text-5xl leading-tight gradient-text sm:text-7xl">
            Ice cream solves everything
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Lonchi is a little scoop shop with big flavours — creamy classics, loaded
            waffles and freshly shaken bubble tea, made fresh every day in Dhaka
            Cantonment.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="#menu"
              className="btn-3d rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground"
            >
              See what we scoop
            </a>
            <a
              href={`tel:+880${PHONE.replace(/\D/g, "").slice(1)}`}
              className="rounded-full border border-border px-7 py-3 font-semibold shadow-soft transition-transform duration-300 hover:-translate-y-1 glass"
            >
              Call {PHONE}
            </a>
          </div>
        </Reveal>
      </section>

      {/* TICKER */}
      <div className="marquee mt-16 overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {ticker.map((t) => (
                <span
                  key={t + dup}
                  className="whitespace-nowrap px-8 font-display text-xl tracking-wide"
                >
                  {t} <span className="opacity-60">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FAVOURITES */}
      <section id="menu" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <h2 className="font-display text-4xl gradient-text">Favourites</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Hover a card — everything here is made the same day it's served.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {menu.map((item, i) => (
            <Reveal key={item.name} delay={i * 130}>
              <TiltCard className="overflow-hidden rounded-3xl border border-border bg-card">
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-64 w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-foreground">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MENU BOARDS */}
      <section id="boards" className="relative py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="font-display text-4xl gradient-text">Full menu</h2>
            <p className="mt-3 text-muted-foreground">
              Scoops from 80 Tk, drinks from 170 Tk.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              { src: menuBoardAsset.url, alt: "Lonchi ice cream menu with flavours and prices" },
              { src: drinksBoardAsset.url, alt: "Lonchi drinks menu with milk teas and boba" },
            ].map((b, i) => (
              <Reveal key={b.alt} delay={i * 150}>
                <TiltCard max={9} className="overflow-hidden rounded-3xl border border-border bg-card">
                  <img src={b.src} alt={b.alt} loading="lazy" className="w-full" />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="store" className="py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
          <Reveal>
            <TiltCard className="overflow-hidden rounded-3xl border border-border">
              <img
                src={storeAsset.url}
                alt="Inside the Lonchi shop"
                loading="lazy"
                className="w-full"
              />
            </TiltCard>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-4xl gradient-text">Come sit with us</h2>
            <p className="mt-5 text-muted-foreground">{ADDRESS}</p>
            <p className="mt-3 text-muted-foreground">
              Phone:{" "}
              <a
                href={`tel:+880${PHONE.replace(/\D/g, "").slice(1)}`}
                className="font-semibold text-primary"
              >
                {PHONE}
              </a>
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-3d mt-8 inline-block rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground"
            >
              Open in Google Maps
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-16 text-center">
        <Reveal>
          <img
            src={logoAsset.url}
            alt="Lonchi logo"
            className="float-soft h-40 w-auto rounded-3xl object-cover object-top shadow-soft"
          />
        </Reveal>
        <p className="text-sm text-muted-foreground">{ADDRESS}</p>
        <p className="text-sm text-muted-foreground">
          Lonchi — Ice Cream &amp; More · {PHONE}
        </p>
      </footer>
    </main>
  );
}
