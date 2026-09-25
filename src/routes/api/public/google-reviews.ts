import { createFileRoute } from "@tanstack/react-router";

/* Google reviews for the Lonchi listing.
   Read-only, no input from the browser, and cached in memory for 6 hours so
   the site never makes more than a handful of Google requests per day. */

const PLACE_ID = "ChIJt-k4cUvHVTcRShZBQWRWZmE";
const GATEWAY = "https://connector-gateway.lovable.dev/google_maps";
const FIELDS =
  "rating,userRatingCount,googleMapsUri,reviews,regularOpeningHours,utcOffsetMinutes";
const CACHE_MS = 6 * 60 * 60 * 1000;

type Payload = {
  rating: number | null;
  total: number | null;
  mapsUrl: string | null;
  /* Live open/closed straight from Google, plus Google's own wording of the hours. */
  openNow: boolean | null;
  weekdayDescriptions: string[];
  reviews: Array<{
    author: string;
    photo: string | null;
    rating: number;
    text: string;
    when: string;
    url: string | null;
  }>;
};

let cache: { at: number; data: Payload } | null = null;

async function loadReviews(): Promise<Payload> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
  if (!lovableKey || !mapsKey) {
    throw new Error("Google Maps connection is not configured");
  }

  const response = await fetch(`${GATEWAY}/places/v1/places/${PLACE_ID}`, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": mapsKey,
      "X-Goog-FieldMask": FIELDS,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google request failed [${response.status}]: ${body}`);
  }

type Place = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  regularOpeningHours?: {
    periods?: Array<{
      open?: { day?: number; hour?: number; minute?: number };
      close?: { day?: number; hour?: number; minute?: number };
    }>;
    weekdayDescriptions?: string[];
  };
  utcOffsetMinutes?: number;
  reviews?: Array<{
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    googleMapsUri?: string;
    authorAttribution?: { displayName?: string; photoUri?: string };
  }>;
};

let cache: { at: number; place: Place } | null = null;

/* Work out open/closed the same way Google Maps does: from the shop's opening
   periods and its own time zone. Returns null when Google gives us no hours. */
function isOpenNow(place: Place, nowMs: number): boolean | null {
  const periods = place.regularOpeningHours?.periods;
  const offset = place.utcOffsetMinutes;
  if (!periods || periods.length === 0 || offset === undefined) return null;

  // Current time inside the shop's time zone, counted as day-of-week * minutes.
  const local = new Date(nowMs + offset * 60 * 1000);
  const minutesNow =
    local.getUTCDay() * 24 * 60 + local.getUTCHours() * 60 + local.getUTCMinutes();

  for (const period of periods) {
    if (!period.open) continue;
    const open = period.open;
    const start = (open.day ?? 0) * 24 * 60 + (open.hour ?? 0) * 60 + (open.minute ?? 0);

    // No closing time means open 24 hours from the opening time.
    let end = start + 24 * 60;
    if (period.close) {
      const close = period.close;
      end = (close.day ?? 0) * 24 * 60 + (close.hour ?? 0) * 60 + (close.minute ?? 0);
      // A closing time earlier in the week than the opening means it runs past midnight.
      if (end <= start) end += 7 * 24 * 60;
    }

    for (const shift of [0, 7 * 24 * 60]) {
      if (minutesNow >= start + shift && minutesNow < end + shift) return true;
    }
  }
  return false;
}

function buildPayload(place: Place): Payload {
  return {
    rating: place.rating ?? null,
    total: place.userRatingCount ?? null,
    mapsUrl: place.googleMapsUri ?? null,
    openNow: isOpenNow(place, Date.now()),
    weekdayDescriptions: place.regularOpeningHours?.weekdayDescriptions ?? [],
    // The star average and total count above stay exactly as Google reports
    // them. Only the quoted review cards are limited to 4 and 5 star reviews.
    reviews: (place.reviews ?? [])
      .map((review) => ({
        author: review.authorAttribution?.displayName ?? "Google user",
        photo: review.authorAttribution?.photoUri ?? null,
        rating: review.rating ?? 0,
        text: review.text?.text ?? review.originalText?.text ?? "",
        when: review.relativePublishTimeDescription ?? "",
        url: review.googleMapsUri ?? null,
      }))
      .filter((review) => review.rating >= 4)
      .sort((a, b) => b.rating - a.rating),
  };
}

export const Route = createFileRoute("/api/public/google-reviews")({
  server: {
    handlers: {
      GET: async () => {
        if (cache && Date.now() - cache.at < CACHE_MS) {
          return Response.json(cache.data);
        }
        try {
          const data = await loadReviews();
          cache = { at: Date.now(), data };
          return Response.json(data);
        } catch (error) {
          console.error("google-reviews:", error);
          if (cache) return Response.json(cache.data);
          return Response.json(
            { error: "Google reviews are unavailable right now." },
            { status: 502 }
          );
        }
      },
    },
  },
});
