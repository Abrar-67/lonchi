import { createFileRoute } from "@tanstack/react-router";

// The home page is a plain HTML file (src/site/index.html) with its own
// stylesheet (public/lonchi.css) and script (public/lonchi.js).
// It is imported as raw text and served directly for GET "/".
import homePage from "../site/index.html?raw";

function renderHomePage() {
  // The public backend URL and publishable key. In some builds only the
  // non-prefixed names are present, so both spellings are checked.
  const url =
    process.env["VITE_SUPABASE_URL"] ?? process.env["SUPABASE_URL"] ?? "";
  const key =
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
    process.env["SUPABASE_PUBLISHABLE_KEY"] ??
    "";

  return homePage
    .replace("__SUPABASE_URL__", url)
    .replace("__SUPABASE_KEY__", key);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lonchi Ice Cream & More | Kachukhet, Dhaka Cantonment" },
      { name: "description", content: "Lonchi ice cream, waffles and bubble tea in Kachukhet, Dhaka Cantonment. Browse menu prices and real customer reviews." },
      { property: "og:title", content: "Lonchi Ice Cream & More | Kachukhet" },
      { property: "og:description", content: "Browse Lonchi's ice cream, waffle and bubble tea menu and real Google reviews." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  server: {
    handlers: {
      GET: () =>
        new Response(renderHomePage(), {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
