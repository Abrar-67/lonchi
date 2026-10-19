import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const source = readFileSync(new URL("../public/lonchi.js", import.meta.url), "utf8");
const functionSource = source.slice(source.indexOf("function selectGoogleReviews("), source.indexOf("function renderGoogleReviews("));
const select = runInNewContext(functionSource + "; selectGoogleReviews");
const reviews = [
  { rating: 5, text: "short" },
  { rating: 5, text: "The longest five-star review" },
  { rating: 4, text: "Four-star comment" },
  { rating: 3, text: "The longest comment in the three-or-four-star group" },
  { rating: 1, text: "short" },
  { rating: 1, text: "The longest one-star review" },
];

test("keeps only the longest five-star review", () => {
  expect(select(reviews).filter((r) => r.rating === 5).map((r) => r.text)).toEqual(["The longest five-star review"]);
});
test("keeps one longest three-or-four-star review", () => {
  expect(select(reviews).filter((r) => r.rating === 3 || r.rating === 4).map((r) => r.text)).toEqual(["The longest comment in the three-or-four-star group"]);
});
test("keeps only the longest one-star review", () => {
  expect(select(reviews).filter((r) => r.rating === 1).map((r) => r.text)).toEqual(["The longest one-star review"]);
});
test("does not invent missing rating groups", () => {
  expect(select([{ rating: 5, text: "Real review" }]).length).toBe(1);
});