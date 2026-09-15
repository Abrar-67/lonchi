/* ==========================================================================
   Lonchi Ice Cream & More — page behaviour
   1. Scroll reveal
   2. Menu board lightbox
   3. Reviews: load list + submit new review
   ========================================================================== */

/* 1. Scroll reveal -------------------------------------------------------- */
function startScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => observer.observe(el));
}

/* 2. Menu board lightbox -------------------------------------------------- */
function startLightbox() {
  const box = document.getElementById("lightbox");
  const boxImage = document.getElementById("lightbox-image");
  if (!box || !boxImage) return;

  function open(src, alt) {
    boxImage.src = src;
    boxImage.alt = alt;
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    box.classList.remove("open");
    boxImage.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-zoom]").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      if (image) open(image.src, image.alt);
    });
  });

  box.addEventListener("click", close);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

/* 3. Reviews -------------------------------------------------------------- */
const REVIEWS_API = window.LONCHI_API;

function starsMarkup(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += i <= rating ? "★" : '<span class="off">★</span>';
  }
  return '<span class="stars" aria-label="' + rating + ' out of 5">' + html + "</span>";
}

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function renderReviews(reviews) {
  const list = document.getElementById("review-list");
  const summary = document.getElementById("review-summary");
  if (!list) return;

  if (reviews.length === 0) {
    list.innerHTML = '<p class="muted small">No reviews yet — be the first to leave one.</p>';
    return;
  }

  list.innerHTML = reviews
    .map(
      (review) => `
        <article class="card review-card">
          <header>
            <h3>${escapeHtml(review.name)}</h3>
            ${starsMarkup(review.rating)}
          </header>
          <p class="muted" style="margin-top:8px;white-space:pre-line">${escapeHtml(review.comment)}</p>
          <p class="muted small" style="margin-top:10px">${formatDate(review.created_at)}</p>
        </article>`
    )
    .join("");

  if (summary) {
    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    summary.innerHTML =
      starsMarkup(Math.round(average)) +
      ' <span class="small muted">' +
      average.toFixed(1) +
      " from " +
      reviews.length +
      " review" +
      (reviews.length === 1 ? "" : "s") +
      "</span>";
  }
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (character) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
  });
}

async function loadReviews() {
  const url =
    REVIEWS_API.url +
    "/rest/v1/reviews?select=id,name,rating,comment,created_at&order=created_at.desc&limit=30";
  try {
    const response = await fetch(url, {
      headers: { apikey: REVIEWS_API.key, Authorization: "Bearer " + REVIEWS_API.key },
    });
    if (!response.ok) throw new Error("request failed");
    renderReviews(await response.json());
  } catch (error) {
    const list = document.getElementById("review-list");
    if (list) list.innerHTML = '<p class="muted small">Reviews could not be loaded right now.</p>';
  }
}

function startReviewForm() {
  const form = document.getElementById("review-form");
  const status = document.getElementById("review-status");
  const stars = document.querySelectorAll("#star-picker button");
  let rating = 5;

  function paintStars() {
    stars.forEach((star, index) => {
      star.classList.toggle("on", index < rating);
      star.setAttribute("aria-pressed", String(index + 1 === rating));
    });
  }

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      rating = index + 1;
      paintStars();
    });
  });
  paintStars();

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const comment = form.elements.comment.value.trim();

    function show(kind, text) {
      status.textContent = text;
      status.className = "form-status " + kind;
    }

    if (!name || !comment) {
      show("error", "Please add your name and a few words.");
      return;
    }

    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    button.textContent = "Sending…";

    try {
      const response = await fetch(REVIEWS_API.url + "/rest/v1/reviews", {
        method: "POST",
        headers: {
          apikey: REVIEWS_API.key,
          Authorization: "Bearer " + REVIEWS_API.key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, rating: rating, comment: comment }),
      });
      if (!response.ok) throw new Error("insert failed");
      form.reset();
      rating = 5;
      paintStars();
      show("ok", "Thanks! Your review is now on the page.");
      loadReviews();
    } catch (error) {
      show("error", "Sorry, that didn't send. Please try again.");
    } finally {
      button.disabled = false;
      button.textContent = "Post review";
    }
  });
}

/* Start everything once the page is ready ---------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  startScrollReveal();
  startLightbox();
  startReviewForm();
  loadReviews();
});
