import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  ClipboardList,
  Clock,
  CreditCard,
  Facebook,
  Heart,
  Home,
  IceCreamCone,
  Instagram,
  Mail,
  MapPin,
  Music,
  Navigation,
  Phone,
  ShoppingBag,
  Sparkles,
  Star,
  Twitter,
  X as XIcon,
  Youtube,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";


import storeAsset from "@/assets/unnamed.webp.asset.json";
import logoAsset from "@/assets/unnamed_5.webp.asset.json";
import pistachioAsset from "@/assets/unnamed_7.webp.asset.json";
import waffleAsset from "@/assets/unnamed_3.webp.asset.json";
import bobaAsset from "@/assets/unnamed_9.webp.asset.json";
import menuBoardAsset from "@/assets/unnamed_8.webp.asset.json";
import bobaMenuAsset from "@/assets/lonchi-menu-boba.webp.asset.json";
import shakesMenuAsset from "@/assets/lonchi-menu-shakes.webp.asset.json";
import wafflesMenuAsset from "@/assets/lonchi-menu-waffles.webp.asset.json";
import mcflurryMenuAsset from "@/assets/lonchi-menu-mcflurry.webp.asset.json";
import scoopsMenuAsset from "@/assets/lonchi-menu-scoops2.webp.asset.json";
import ferrisAsset from "@/assets/lonchi-ferris-wheel.png.asset.json";
import friendsAsset from "@/assets/lonchi-friends-drinks.png.asset.json";
import kidsAsset from "@/assets/lonchi-kids-favorite.png.asset.json";
import coupleAsset from "@/assets/lonchi-couple-drinks.png.asset.json";
import mangoBannerAsset from "@/assets/lonchi-mango-drinks-banner.png.asset.json";

const ADDRESS =
  "CB 29 Kachukhet, Puraton Bazar, Muslim Modern School Road, Dhaka Cantonment, opposite Akram Masjid, Dhaka 1206";
const MAPS_URL = "https://maps.app.goo.gl/XKnokmdRqivz1zpm9";
const HOURS: Array<{ day: string; time: string }> = [
  { day: "Saturday", time: "10:00 AM – 12:30 AM" },
  { day: "Sunday", time: "10:00 AM – 12:00 AM" },
  { day: "Monday", time: "10:00 AM – 12:00 AM" },
  { day: "Tuesday", time: "10:00 AM – 12:00 AM" },
  { day: "Wednesday", time: "10:00 AM – 12:00 AM" },
  { day: "Thursday", time: "10:00 AM – 12:00 AM" },
  { day: "Friday", time: "10:30 AM – 12:30 PM" },
];
const APPLE_MAPS_URL =
  "https://maps.apple.com/place?place-id=IC960B2545F8AA8BA&address=Ibrahimpur+Road%2C+Bangladesh&coordinate=23.793557%2C90.389889&name=Lonchi&_provider=9902";
const PATHAO_URL = "https://food.pathao.com/restaurants/gm3tqnrt/lonchi-ice-cream-and-more";
const FOODPANDA_URL = "https://www.foodpanda.com.bd/restaurant/pv43/lonchi";
const INSTAGRAM_URL = "https://www.instagram.com/lonchiicecream";
const FACEBOOK_URL = "https://www.facebook.com/lonchiicecream/";
const YOUTUBE_URL = "https://www.youtube.com/@Lonchiicecream";
const X_URL = "https://x.com/Lonchiicecream";
const TIKTOK_URL = "https://www.tiktok.com/@lonchi365";
const EMAIL = "lonchi.icecream@gmail.com";
const PHONE = "01609-905226";
const PHONE_URL = `tel:+880${PHONE.replace(/\D/g, "").slice(1)}`;
const SITE_URL = "https://lonchi.lovable.app";
const DAILY_SPECIAL = "Today's special: Purely Pistachio scoops & fresh mango boba";

const LOCAL_BUSINESS_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "IceCreamShop",
  name: "Lonchi Ice Cream & More",
  description:
    "Ice cream scoops, loaded waffles, McFlurry, milkshakes and bubble tea in Kachukhet, Dhaka Cantonment.",
  url: SITE_URL,
  telephone: "+8801609905226",
  email: EMAIL,
  priceRange: "৳৳",
  servesCuisine: ["Ice Cream", "Desserts", "Bubble Tea"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "CB 29 Kachukhet, Puraton Bazar, Muslim Modern School Road, opposite Akram Masjid",
    addressLocality: "Dhaka Cantonment",
    addressRegion: "Dhaka",
    postalCode: "1206",
    addressCountry: "BD",
  },
  geo: { "@type": "GeoCoordinates", latitude: 23.793557, longitude: 90.389889 },
  hasMap: MAPS_URL,
  sameAs: [INSTAGRAM_URL, FACEBOOK_URL, YOUTUBE_URL, X_URL, TIKTOK_URL],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:00",
      closes: "24:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "10:30", closes: "12:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "24:00" },
  ],
});


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lonchi Ice Cream & More | Kachukhet, Dhaka Cantonment" },
      {
        name: "description",
        content:
          "Your ultimate sweet escape in Kachukhet, Dhaka Cantonment. Delightful scoops, dreamy swirls, custom-made creations, waffles and bubble tea. Order on foodpanda or Pathao, call or visit us.",
      },
      { property: "og:title", content: "Lonchi Ice Cream & More" },
      {
        property: "og:description",
        content: "Your ultimate sweet escape in Kachukhet, Dhaka Cantonment. Order or visit us today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [{ type: "application/ld+json", children: LOCAL_BUSINESS_JSONLD }],
  }),
  component: Index,
});

const serves = [
  {
    name: "Ice cream scoops",
    note: "Pistachio, chocolate, mango and more — served in cups or cones.",
    image: pistachioAsset.url,
  },
  {
    name: "Loaded waffles",
    note: "Crisp warm waffles topped with ice cream and a generous sauce pour.",
    image: waffleAsset.url,
  },
  {
    name: "Bubble tea",
    note: "Milk teas and fruity boba shaken fresh with chewy pearls.",
    image: bobaAsset.url,
  },
];

const orderLinks = [
  { label: "foodpanda", note: "Delivery across Dhaka Cantonment", href: FOODPANDA_URL, icon: ShoppingBag },
  { label: "Pathao Food", note: "Order for delivery or pickup", href: PATHAO_URL, icon: ShoppingBag },
];

const socialLinks = [
  { label: "Instagram", note: "@lonchiicecream", href: INSTAGRAM_URL, icon: Instagram },
  { label: "Facebook", note: "Lonchi Ice Cream", href: FACEBOOK_URL, icon: Facebook },
  { label: "YouTube", note: "@Lonchiicecream", href: YOUTUBE_URL, icon: Youtube },
  { label: "X", note: "@Lonchiicecream", href: X_URL, icon: Twitter },
  { label: "TikTok", note: "@lonchi365", href: TIKTOK_URL, icon: Music },
];

const moments = [
  { src: ferrisAsset.url, alt: "Lonchi ice cream cups on a Ferris wheel" },
  { src: coupleAsset.url, alt: "A couple enjoying Lonchi drinks on a park bench" },
  { src: kidsAsset.url, alt: "A child choosing from a display of Lonchi ice cream" },
  { src: friendsAsset.url, alt: "Friends sharing Lonchi bubble tea together" },
];

function Index() {
  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="#top" aria-label="Lonchi home" className="flex items-center gap-2.5">
            <img src={logoAsset.url} alt="Lonchi logo" className="h-9 w-9 rounded-full object-cover" />
            <span className="font-display text-lg font-bold text-foreground sm:text-xl">LONCHI</span>
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-6 text-sm font-semibold">
            <a href="#serve" className="hidden transition-colors hover:text-primary md:inline">What we serve</a>
            <a href="#menu" className="hidden transition-colors hover:text-primary md:inline">Menu</a>
            <a href="#order" className="hidden transition-colors hover:text-primary md:inline">Order</a>
            <a href="#reviews" className="hidden transition-colors hover:text-primary md:inline">Reviews</a>
            <a href="#visit" className="hidden transition-colors hover:text-primary md:inline">Visit</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="pill-btn bg-primary text-primary-foreground">
              Find the shop
            </a>
          </nav>
        </div>
      </header>

      <section className="hero-band">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <Reveal>
            <span className="chip">Ice cream • waffles • boba</span>
            <h1 className="mt-5 max-w-xl font-display text-[clamp(2.6rem,6vw,4rem)] font-semibold leading-[1.12]">
              Your ultimate sweet escape, now in Kachukhet.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Dive into delightful scoops, dreamy swirls and custom-made creations. We are always sure to make the ice
              cream with love and pure hygiene, using fresh ingredients every single day. Cool down, mix it up and taste
              happiness your way — at Muslim Modern School Road, Dhaka Cantonment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="pill-btn bg-primary text-primary-foreground">
                Find the shop
              </a>
              <a href="#menu" className="pill-btn pill-outline">See the menu</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4 pt-8 sm:px-8 sm:pb-6 sm:pt-10">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Heart, label: "Made with love", note: "Every dessert is prepared with care." },
              { icon: Sparkles, label: "Pure hygiene", note: "Clean prep, fresh ingredients, always." },
              { icon: IceCreamCone, label: "Served fresh", note: "Scoops, waffles and boba made to order." },
            ].map(({ icon: Icon, label, note }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                <span className="icon-box h-10 w-10">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold">{label}</p>
                  <p className="text-xs text-muted-foreground">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="serve" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl">What we serve</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {serves.map((item, index) => (
            <Reveal key={item.name} delay={index * 100}>
              <article className="soft-card h-full overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="stat-strip section-bleed mt-14">
            {[
              { big: "3", small: "ways to enjoy: scoops, waffles, boba" },
              { big: "2", small: "delivery apps: foodpanda & Pathao" },
              { big: "1", small: "shop, opposite Akram Masjid" },
            ].map((stat) => (
              <div key={stat.small}>
                <p className="font-display text-3xl font-bold text-primary">{stat.big}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.small}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="menu" className="scroll-mt-24 bg-muted/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="font-display text-3xl sm:text-4xl">The menu</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Scoops, sundaes, waffles, milk teas and fruit boba — with the prices from our shop boards.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              { src: menuBoardAsset.url, alt: "Lonchi ice cream menu with flavours and prices", label: "Ice cream menu" },
              { src: scoopsMenuAsset.url, alt: "Lonchi scoops and cones menu: ruby chocolate, strawberry, mango, chocolate, waffle with ice cream, vanilla cone, chocolate cone and mango cone with prices", label: "Scoops & cones" },
              { src: bobaMenuAsset.url, alt: "Lonchi boba and milk tea menu with prices", label: "Boba & milk tea" },
              { src: shakesMenuAsset.url, alt: "Lonchi drinks menu with smoothies, mojitos, frappes and milkshakes", label: "Shakes, mojitos & frappes" },
              { src: mcflurryMenuAsset.url, alt: "Lonchi McFlurry menu with six flavours", label: "McFlurry" },
              { src: wafflesMenuAsset.url, alt: "Lonchi waffle menu with prices", label: "Waffles" },
            ].map((board, index) => (
              <Reveal key={board.label} delay={index * 120}>
                <figure className="soft-card overflow-hidden">
                  <img src={board.src} alt={board.alt} loading="lazy" className="w-full" />
                  <figcaption className="border-t border-border px-4 py-3 text-sm font-semibold">{board.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="soft-card overflow-hidden">
            <img
              src={mangoBannerAsset.url}
              alt="Lonchi mango drinks and desserts banner"
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section id="order" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl">Order & follow</h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Get Lonchi delivered, or see what's new on our social channels.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {orderLinks.map((link, index) => (
            <Reveal key={link.label} delay={index * 90}>
              <a href={link.href} target="_blank" rel="noreferrer" className="action-tile group">
                <span className="icon-box">
                  <link.icon className="h-5 w-5" />
                </span>
                <span>
                  <strong>{link.label}</strong>
                  <small>{link.note}</small>
                </span>
                <ArrowUpRight className="ml-auto h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          ))}
          {socialLinks.map((link, index) => (
            <Reveal key={link.label} delay={(index + orderLinks.length) * 90}>
              <a href={link.href} target="_blank" rel="noreferrer" className="action-tile group">
                <span className="icon-box">
                  <link.icon className="h-5 w-5" />
                </span>
                <span>
                  <strong>{link.label}</strong>
                  <small>{link.note}</small>
                </span>
                <ArrowUpRight className="ml-auto h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="soft-card overflow-hidden bg-gradient-to-br from-secondary/60 to-background p-6 sm:p-8">
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="icon-box mt-0.5">
                  <CreditCard className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl">Pay your way</h2>
                  <p className="mt-1 max-w-md text-sm text-muted-foreground">
                    Quick, secure checkout at the counter or on delivery.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Cash", "Amex", "bKash", "Visa", "Mastercard", "bKash NFC"].map((method) => (
                  <span
                    key={method}
                    className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-sm"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl">Sweet moments</h2>
          <p className="mt-3 max-w-lg text-muted-foreground">Scoops, smiles and shared sips at Lonchi.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moments.map((moment, index) => (
            <Reveal key={moment.alt} delay={index * 100}>
              <div className="gallery-frame group overflow-hidden">
                <img
                  src={moment.src}
                  alt={moment.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reviews />

      <section id="visit" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="soft-card overflow-hidden">
              <img
                src={storeAsset.url}
                alt="Inside Lonchi ice cream shop in Kachukhet"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-3xl sm:text-4xl">Visit us</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{ADDRESS}</p>
            <div className="soft-card mt-6 p-5">
              <div className="flex items-center gap-2 font-display text-lg">
                <Clock className="h-5 w-5 text-primary" />
                Opening hours
              </div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {HOURS.map(({ day, time }) => (
                  <li key={day} className="flex items-center justify-between gap-4">
                    <span className="font-medium">{day}</span>
                    <span className="text-muted-foreground">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="action-tile group">
                <span className="icon-box">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <strong>Google Maps</strong>
                  <small>Get directions</small>
                </span>
              </a>
              <a href={APPLE_MAPS_URL} target="_blank" rel="noreferrer" className="action-tile group">
                <span className="icon-box">
                  <Navigation className="h-5 w-5" />
                </span>
                <span>
                  <strong>Apple Maps</strong>
                  <small>Open on iPhone</small>
                </span>
              </a>
              <a href={PHONE_URL} className="action-tile group sm:col-span-2">
                <span className="icon-box">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <strong>Call Lonchi</strong>
                  <small>{PHONE}</small>
                </span>
              </a>
              <a href={`mailto:${EMAIL}`} className="action-tile group sm:col-span-2">
                <span className="icon-box">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <strong>Email us</strong>
                  <small>{EMAIL}</small>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border pb-28 pt-12 md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-end">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Lonchi logo" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <p className="font-display text-xl">LONCHI</p>
              <p className="text-sm text-muted-foreground">Ice Cream & More</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:text-right">
            <p className="max-w-md text-sm text-muted-foreground">
              Ice cream solves everything.
              <br />
              Kachukhet, Dhaka Cantonment · {PHONE}
            </p>
            <a href={`mailto:${EMAIL}`} className="text-sm font-medium text-primary hover:underline">
              {EMAIL}
            </a>
            <div className="flex flex-wrap gap-3 md:justify-end">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <nav aria-label="Mobile navigation" className="mobile-nav fixed inset-x-3 bottom-3 z-50 md:hidden">
        <div className="grid grid-cols-5 px-2 py-2 text-[10px] font-bold">
          {[
            { href: "#top", label: "Home", Icon: Home },
            { href: "#serve", label: "Scoops", Icon: IceCreamCone },
            { href: "#menu", label: "Menu", Icon: ClipboardList },
            { href: "#reviews", label: "Reviews", Icon: Star },
            { href: "#visit", label: "Visit", Icon: MapPin },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              className="flex min-h-12 flex-col items-center justify-center gap-1 text-muted-foreground transition-colors active:text-primary"
            >
              <Icon className="h-5 w-5" strokeWidth={2.2} />
              {label}
            </a>
          ))}
        </div>
      </nav>
    </main>
  );
}
