import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ClipboardList,
  Home,
  IceCreamCone,
  Instagram,
  MapPin,
  Navigation,
  Phone,
  ShoppingBag,
  Star,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Reviews } from "@/components/Reviews";

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
const APPLE_MAPS_URL =
  "https://maps.apple.com/place?place-id=IC960B2545F8AA8BA&address=Ibrahimpur+Road%2C+Bangladesh&coordinate=23.793557%2C90.389889&name=Lonchi&_provider=9902";
const PATHAO_URL = "https://food.pathao.com/restaurants/gm3tqnrt/lonchi-ice-cream-and-more";
const FOODPANDA_URL = "https://www.foodpanda.com.bd/restaurant/pv43/lonchi";
const INSTAGRAM_URL = "https://www.instagram.com/lonchiicecream/";
const PHONE = "01609-905226";
const PHONE_URL = `tel:+880${PHONE.replace(/\D/g, "").slice(1)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lonchi Ice Cream & More | Kachukhet, Dhaka Cantonment" },
      {
        name: "description",
        content:
          "Lonchi serves ice cream, loaded waffles and bubble tea in Kachukhet, Dhaka Cantonment. See the menu, order on foodpanda or Pathao, call or get directions.",
      },
      { property: "og:title", content: "Lonchi Ice Cream & More" },
      {
        property: "og:description",
        content: "Ice cream, loaded waffles and bubble tea in Dhaka Cantonment. Order or visit us today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
  { label: "foodpanda", note: "Delivery across Dhaka Cantonment", href: FOODPANDA_URL },
  { label: "Pathao Food", note: "Order for delivery or pickup", href: PATHAO_URL },
  { label: "Instagram", note: "@lonchiicecream", href: INSTAGRAM_URL },
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
              A little cup of joy, right here in Kachukhet.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Lonchi serves fresh ice cream, loaded waffles and freshly shaken bubble tea — dine in,
              take away or get it delivered across Dhaka Cantonment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="pill-btn bg-primary text-primary-foreground">Find the shop</a>
              <a href="#menu" className="pill-btn pill-outline">See the menu</a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="hero-frame">
              <img src={bannerAsset.url} alt="Lonchi ice cream cones and tubs" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
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
                  <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
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
              { src: drinksBoardAsset.url, alt: "Lonchi drinks menu with milk teas and boba", label: "Drinks menu" },
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

      <section id="order" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl">Order & follow</h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Get Lonchi delivered, or see what's new on our Instagram.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {orderLinks.map((link, index) => (
            <Reveal key={link.label} delay={index * 90}>
              <a href={link.href} target="_blank" rel="noreferrer" className="action-tile group">
                <span className="icon-box">
                  {link.label === "Instagram" ? <Instagram className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                </span>
                <span><strong>{link.label}</strong><small>{link.note}</small></span>
                <ArrowUpRight className="ml-auto h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Reviews />

      <section id="visit" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="soft-card overflow-hidden">
              <img src={storeAsset.url} alt="Inside Lonchi ice cream shop in Kachukhet" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-3xl sm:text-4xl">Visit us</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{ADDRESS}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="action-tile group">
                <span className="icon-box"><MapPin className="h-5 w-5" /></span>
                <span><strong>Google Maps</strong><small>Get directions</small></span>
              </a>
              <a href={APPLE_MAPS_URL} target="_blank" rel="noreferrer" className="action-tile group">
                <span className="icon-box"><Navigation className="h-5 w-5" /></span>
                <span><strong>Apple Maps</strong><small>Open on iPhone</small></span>
              </a>
              <a href={PHONE_URL} className="action-tile group sm:col-span-2">
                <span className="icon-box"><Phone className="h-5 w-5" /></span>
                <span><strong>Call Lonchi</strong><small>{PHONE}</small></span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border pb-28 pt-12 md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-end">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Lonchi logo" className="h-12 w-12 rounded-full object-cover" />
            <div><p className="font-display text-xl">LONCHI</p><p className="text-sm text-muted-foreground">Ice Cream & More</p></div>
          </div>
          <p className="max-w-md text-sm text-muted-foreground md:text-right">
            Ice cream solves everything.<br />Kachukhet, Dhaka Cantonment · {PHONE}
          </p>
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
            <a key={label} href={href} className="flex min-h-12 flex-col items-center justify-center gap-1 text-muted-foreground transition-colors active:text-primary">
              <Icon className="h-5 w-5" strokeWidth={2.2} />{label}
            </a>
          ))}
        </div>
      </nav>
    </main>
  );
}
