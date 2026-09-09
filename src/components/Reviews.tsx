import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/Reveal";

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
};

function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= value ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
          strokeWidth={1.8}
        />
      ))}
    </span>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, rating, comment, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    if (!error && data) setReviews(data as Review[]);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanComment = comment.trim();
    if (!cleanName || !cleanComment) {
      setStatus({ kind: "error", text: "Please add your name and a few words." });
      return;
    }
    if (cleanName.length > 60 || cleanComment.length > 600) {
      setStatus({ kind: "error", text: "That's a bit too long — please shorten it." });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    const { error } = await supabase
      .from("reviews")
      .insert({ name: cleanName, rating, comment: cleanComment });
    setSubmitting(false);
    if (error) {
      setStatus({ kind: "error", text: "Sorry, that didn't send. Please try again." });
      return;
    }
    setName("");
    setComment("");
    setRating(5);
    setStatus({ kind: "ok", text: "Thanks! Your review is now on the page." });
    void load();
  }

  const average =
    reviews.length > 0
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
      : null;

  return (
    <section id="reviews" className="scroll-mt-24 bg-muted/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Reviews</h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Tell everyone what you thought of your scoop, waffle or boba.
            </p>
          </div>
          {average !== null && (
            <div className="flex items-center gap-3">
              <p className="font-display text-3xl text-primary">{average}</p>
              <div>
                <Stars value={Math.round(average)} />
                <p className="mt-1 text-sm text-muted-foreground">
                  {reviews.length} review{reviews.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
          )}
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
          <Reveal>
            <form onSubmit={submit} className="soft-card space-y-4 p-5">
              <div>
                <label htmlFor="review-name" className="text-sm font-semibold">Your name</label>
                <input
                  id="review-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  required
                  placeholder="e.g. Arefin"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <span className="text-sm font-semibold">Your rating</span>
                <div className="mt-1.5 flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i)}
                      aria-label={`${i} star${i === 1 ? "" : "s"}`}
                      aria-pressed={rating === i}
                      className="rounded-full p-1 transition hover:scale-110"
                    >
                      <Star
                        className={`h-7 w-7 ${i <= rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
                        strokeWidth={1.8}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="review-text" className="text-sm font-semibold">Your review</label>
                <textarea
                  id="review-text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={600}
                  required
                  rows={4}
                  placeholder="What did you order, and how was it?"
                  className="mt-1.5 w-full resize-y rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary"
                />
                <p className="mt-1 text-right text-xs text-muted-foreground">{comment.length}/600</p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="pill-btn w-full justify-center bg-primary text-primary-foreground disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Post review"}
              </button>

              {status && (
                <p
                  role="status"
                  className={`text-sm ${status.kind === "ok" ? "text-primary" : "text-destructive"}`}
                >
                  {status.text}
                </p>
              )}
            </form>
          </Reveal>

          <div className="grid content-start gap-4 sm:grid-cols-2">
            {loading && <p className="text-sm text-muted-foreground">Loading reviews…</p>}
            {!loading && reviews.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No reviews yet — be the first to leave one.
              </p>
            )}
            {reviews.map((review, index) => (
              <Reveal key={review.id} delay={Math.min(index, 4) * 80}>
                <article className="soft-card h-full p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg">{review.name}</h3>
                    <Stars value={review.rating} />
                  </div>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {review.comment}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground/80">
                    {new Date(review.created_at).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
