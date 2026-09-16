import { createFileRoute } from "@tanstack/react-router";

/* Google reviews for the Lonchi listing.
   Read-only, no input from the browser, and cached in memory for 6 hours so
   the site never makes more than a handful of Google requests per day. */

const PLACE_ID = "ChIJt-k4cUvHVTcRShZBQWRWZmE";
const GATEWAY = "https://connector-gateway.lovable.dev/google_maps";
const FIELDS = "rating,userRatingCount,googleMapsUri,reviews";
const CACHE_MS = 6 * 60 * 60 * 1000;

type Payload = {
  rating: number | null;
  total: number | null;
  mapsUrl: string | null;
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

  const place = (await response.json()) as {
    rating?: number;
    userRatingCount?: number;
    googleMapsUri?: string;
    reviews?: Array<{
      rating?: number;
      text?: { text?: string };
      originalText?: { text?: string };
      relativePublishTimeDescription?: string;
      googleMapsUri?: string;
      authorAttribution?: { displayName?: string; photoUri?: string };
    }>;
  };

  return {
    rating: place.rating ?? null,
    total: place.userRatingCount ?? null,
    mapsUrl: place.googleMapsUri ?? null,
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
