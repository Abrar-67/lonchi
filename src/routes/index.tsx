import { createFileRoute } from "@tanstack/react-router";

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
          "Lonchi scoops handcrafted ice cream, loaded waffles and bubble tea. Ice cream solves everything — come find us.",
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
    name: "Pistachio Scoop",
    note: "Roasted pistachios folded through slow-churned cream.",
    image: pistachioAsset.url,
  },
  {
    name: "Loaded Chocolate Waffle",
    note: "Warm waffle, brownie crumb and a melting chocolate scoop.",
    image: waffleAsset.url,
  },
  {
    name: "Brown Sugar Boba",
    note: "Milk tea, chewy pearls, sealed fresh at the counter.",
    image: bobaAsset.url,
  },
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="font-display text-3xl text-primary">Lonchi</span>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#menu" className="hidden hover:text-primary sm:inline">
            Menu
          </a>
          <a href="#store" className="hidden hover:text-primary sm:inline">
            Our shop
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-primary px-5 py-2 text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Visit us
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-5">
        <div className="overflow-hidden rounded-4xl border border-border shadow-soft">
          <img
            src={bannerAsset.url}
            alt="Lonchi ice cream tubs and cones"
            className="w-full object-cover"
          />
        </div>
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <h1 className="font-display text-5xl leading-tight text-primary sm:text-6xl">
            Ice cream solves everything
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Lonchi is a little scoop shop with big flavours — creamy classics, loaded
            waffles and freshly shaken bubble tea, made fresh every day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#menu"
              className="rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              See what we scoop
            </a>
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl text-primary">Favourites</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {menu.map((item) => (
            <article
              key={item.name}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-64 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-display text-xl text-foreground">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="store" className="bg-secondary py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
          <img
            src={storeAsset.url}
            alt="Inside the Lonchi shop"
            loading="lazy"
            className="rounded-3xl shadow-soft"
          />
          <div>
            <h2 className="font-display text-3xl text-primary">Come sit with us</h2>
            <p className="mt-4 text-muted-foreground">
              Pink walls, a full gelato counter and a couple of stools by the window.
              Pick a flavour, take a seat and stay a while.
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-block rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-12 text-center">
        <img
          src={logoAsset.url}
          alt="Lonchi logo"
          className="h-40 w-auto rounded-3xl object-cover object-top"
        />
        <p className="text-sm text-muted-foreground">
          Lonchi — Ice Cream &amp; More
        </p>
      </footer>
    </main>
  );
}
