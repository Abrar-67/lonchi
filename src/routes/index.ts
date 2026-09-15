import { createFileRoute } from "@tanstack/react-router";

// The home page is a plain HTML file (src/site/index.html) with its own
// stylesheet (public/lonchi.css) and script (public/lonchi.js).
// It is imported as raw text and served directly for GET "/".
import homePage from "../site/index.html?raw";

function renderHomePage() {
  return homePage
    .replace("__SUPABASE_URL__", process.env["VITE_SUPABASE_URL"] ?? "")
    .replace("__SUPABASE_KEY__", process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? "");
}

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        new Response(renderHomePage(), {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
