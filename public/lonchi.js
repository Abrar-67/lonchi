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

/* Apple-inspired motion: smooth depth, scroll progress and tactile cards. */
function startPremiumMotion() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  const heroContent = hero && hero.querySelector(".wrap");
  const motionCards = document.querySelectorAll(
    ".card, .badge, .tile, .pay-card, .stats"
  );
  let scrollFrame = 0;

  document.documentElement.classList.add("motion-ready");

  function updateScrollMotion() {
    scrollFrame = 0;
    const top = window.scrollY;
    const pageLength = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pageLength > 0 ? Math.min(top / pageLength, 1) : 0;
    document.documentElement.style.setProperty("--scroll-progress", String(progress));

    if (header) header.classList.toggle("is-scrolled", top > 18);
    if (!reducedMotion.matches && hero && heroContent) {
      const heroProgress = Math.min(top / Math.max(hero.offsetHeight, 1), 1);
      hero.style.setProperty("--hero-progress", String(heroProgress));
      heroContent.style.setProperty("--hero-shift", Math.round(top * 0.12) + "px");
    }
  }

  function queueScrollMotion() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollMotion);
  }

  motionCards.forEach((card) => {
    card.classList.add("motion-surface");
    card.addEventListener("pointermove", (event) => {
      if (reducedMotion.matches || event.pointerType === "touch") return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty("--pointer-x", x * 100 + "%");
      card.style.setProperty("--pointer-y", y * 100 + "%");
      card.style.setProperty("--tilt-x", (0.5 - y) * 4 + "deg");
      card.style.setProperty("--tilt-y", (x - 0.5) * 4 + "deg");
    });
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  });

  window.addEventListener("scroll", queueScrollMotion, { passive: true });
  window.addEventListener("resize", queueScrollMotion, { passive: true });
  reducedMotion.addEventListener("change", updateScrollMotion);
  updateScrollMotion();
}

/* Keep mobile navigation in sync with the section currently on screen. */
function startActiveNavigation() {
  const links = Array.from(document.querySelectorAll(".mobile-nav a"));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        const active = link.getAttribute("href") === "#" + visible.target.id;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-25% 0px -55%", threshold: [0, 0.2, 0.6] }
  );
  sections.forEach((section) => observer.observe(section));
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

function apiReady() {
  return Boolean(REVIEWS_API && REVIEWS_API.url && REVIEWS_API.key);
}

async function loadReviews() {
  if (!apiReady()) return;

  const url =
    REVIEWS_API.url +
    "/rest/v1/reviews?select=id,name,rating,comment,created_at&order=created_at.desc&limit=30";
  try {
    const response = await fetch(url, {
      headers: { apikey: REVIEWS_API.key },
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

    if (!apiReady()) {
      show("error", "Reviews are unavailable right now. Please try again later.");
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
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ name: name, rating: rating, comment: comment }),
      });
      if (!response.ok) throw new Error(await response.text());
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

/* Back to top: appears once you scroll down, then glides you home. */
function startBackToTop() {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  function update() {
    button.classList.toggle("visible", window.scrollY > 600);
  }

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* Open now / Closed badge, computed from the shop's real hours in Dhaka time. */
function startOpenStatus() {
  const badge = document.getElementById("open-status");
  if (!badge) return;

  // Opening hours in minutes after midnight, Dhaka time (UTC+6).
  // A closing time past 24:00 means the shop stays open past midnight.
  const HOURS_BY_DAY = [
    { open: 10 * 60, close: 24 * 60 },        // Sunday
    { open: 10 * 60, close: 24 * 60 },        // Monday
    { open: 10 * 60, close: 24 * 60 },        // Tuesday
    { open: 10 * 60, close: 24 * 60 },        // Wednesday
    { open: 10 * 60, close: 24 * 60 },        // Thursday
    { open: 10.5 * 60, close: 12.5 * 60 },    // Friday
    { open: 10 * 60, close: 24.5 * 60 },      // Saturday
  ];

  // Current time in Dhaka, whatever the visitor's clock says.
  const now = new Date(Date.now() + (6 * 60 + new Date().getTimezoneOffset()) * 60 * 1000);
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  function isOpen() {
    const today = HOURS_BY_DAY[day];
    // Still open from yesterday's late night (past-midnight closing)?
    const yesterday = HOURS_BY_DAY[(day + 6) % 7];
    if (yesterday.close > 24 * 60 && minutes < yesterday.close - 24 * 60) return true;
    if (minutes >= today.open && minutes < today.close) return true;
    return false;
  }

  badge.hidden = false;
  if (isOpen()) {
    badge.textContent = "Open now";
    badge.classList.add("is-open");
  } else {
    badge.textContent = "Closed now";
    badge.classList.add("is-closed");
  }
}

/* Copy the shop address to the clipboard with a short "Copied!" confirmation. */
function startCopyAddress() {
  const button = document.getElementById("copy-address");
  const label = document.getElementById("copy-address-label");
  if (!button || !label) return;

  const ADDRESS =
    "CB 29 Kachukhet, Puraton Bazar, Muslim Modern School Road, Dhaka Cantonment, opposite Akram Masjid, Dhaka 1206";

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      label.textContent = "Copied!";
    } catch {
      // Older browsers without the clipboard API: fall back to a hidden text select.
      const helper = document.createElement("textarea");
      helper.value = ADDRESS;
      document.body.appendChild(helper);
      helper.select();
      document.execCommand("copy");
      helper.remove();
      label.textContent = "Copied!";
    }
    setTimeout(() => (label.textContent = "Copy address"), 2000);
  });
}

/* Product gallery: hover to preview, click or use the keyboard to select. */
function startServeGallery() {
  const cards = Array.from(document.querySelectorAll(".serve-card[data-gallery]"));
  const panels = Array.from(document.querySelectorAll("[data-gallery-panel]"));
  const title = document.getElementById("serve-gallery-title");
  if (!cards.length || !panels.length) return;

  const titles = {
    "ice-cream": "Ice cream moments",
    waffles: "Loaded waffle moments",
    boba: "Bubble tea moments",
  };

  function showGallery(name) {
    cards.forEach((card) => {
      const active = card.dataset.gallery === name;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });
    panels.forEach((panel) => {
      const active = panel.dataset.galleryPanel === name;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    if (title) title.textContent = titles[name] || "Lonchi moments";
  }

  cards.forEach((card) => {
    const name = card.dataset.gallery;
    card.addEventListener("mouseenter", () => showGallery(name));
    card.addEventListener("focus", () => showGallery(name));
    card.addEventListener("click", () => showGallery(name));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showGallery(name);
      }
    });
  });
}



/* Start everything once the page is ready ---------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  startScrollReveal();
  startPremiumMotion();
  startActiveNavigation();
  startLightbox();
  startReviewForm();
  startImageDownloads();
  startPdfDownload();
  startBackToTop();
  startOpenStatus();
  startCopyAddress();
  startServeGallery();
  loadReviews();
  loadGoogleReviews();
});

/* 4. Live Google reviews --------------------------------------------------- */
function renderGoogleReviews(data) {
  const list = document.getElementById("google-review-list");
  const summary = document.getElementById("google-summary");
  const link = document.getElementById("google-review-link");
  if (!list) return;

  if (link && data.mapsUrl) link.href = data.mapsUrl;

  if (summary && data.rating) {
    summary.innerHTML =
      starsMarkup(Math.round(data.rating)) +
      ' <span class="small muted">' +
      data.rating.toFixed(1) +
      " from " +
      data.total +
      " Google rating" +
      (data.total === 1 ? "" : "s") +
      "</span>";
  }

  if (!data.reviews || data.reviews.length === 0) {
    list.innerHTML = '<p class="muted small">No Google reviews to show yet.</p>';
    return;
  }

  list.innerHTML = data.reviews
    .map(function (review) {
      const avatar = review.photo
        ? '<img src="' + escapeHtml(review.photo) + '" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()" />'
        : "";
      return `
        <article class="card google-review">
          <div class="who">
            ${avatar}
            <div>
              <div class="name">${escapeHtml(review.author)}</div>
              <div class="muted small">${escapeHtml(review.when)}</div>
            </div>
          </div>
          ${starsMarkup(review.rating)}
          <p class="muted" style="white-space:pre-line">${escapeHtml(review.text)}</p>
        </article>`;
    })
    .join("");
}

async function loadGoogleReviews() {
  const list = document.getElementById("google-review-list");
  try {
    const response = await fetch("/api/public/google-reviews");
    if (!response.ok) throw new Error("request failed");
    renderGoogleReviews(await response.json());
  } catch (error) {
    if (list) {
      list.innerHTML = '<p class="muted small">Google reviews could not be loaded right now.</p>';
    }
  }
}

/* 5. Menu downloads -------------------------------------------------------- */

/* Collect every menu board on the page with its image and caption. */
function menuBoards() {
  return Array.from(document.querySelectorAll("#menu .menu-board")).map((figure) => {
    const image = figure.querySelector("img");
    const link = figure.querySelector(".dl-link");
    return {
      src: image ? image.src : "",
      title: image ? (image.alt || "Lonchi menu") : "Lonchi menu",
      fileName: link ? link.getAttribute("data-download") : "lonchi-menu",
    };
  });
}

/* Point each "Download" link at its own picture, with a friendly file name. */
function startImageDownloads() {
  document.querySelectorAll("#menu .menu-board").forEach((figure) => {
    const image = figure.querySelector("img");
    const link = figure.querySelector(".dl-link");
    if (!image || !link) return;

    const extension = (image.src.split(".").pop() || "webp").split("?")[0];
    link.href = image.src;
    link.setAttribute("download", link.getAttribute("data-download") + "." + extension);
  });
}

/* Read an image file and hand back a data URL plus its natural size. */
function readImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext("2d").drawImage(image, 0, 0);
      resolve({
        dataUrl: canvas.toDataURL("image/jpeg", 0.92),
        width: canvas.width,
        height: canvas.height,
      });
    };
    image.onerror = () => reject(new Error("could not read " + src));
    image.src = src;
  });
}

/* Build a one-board-per-page PDF of every menu picture. */
function startPdfDownload() {
  const button = document.getElementById("download-menu-pdf");
  const status = document.getElementById("pdf-status");
  if (!button) return;

  function show(text) {
    if (status) status.textContent = text;
  }

  button.addEventListener("click", async () => {
    const maker = window.jspdf && window.jspdf.jsPDF;
    if (!maker) {
      show("The PDF tool is still loading — please try again in a moment.");
      return;
    }

    button.disabled = true;
    const label = button.innerHTML;
    show("Preparing your PDF…");

    try {
      const boards = menuBoards();
      const pictures = [];
      for (const board of boards) {
        pictures.push({ board: board, picture: await readImage(board.src) });
      }

      const margin = 12;
      let pdf = null;

      pictures.forEach((item, index) => {
        // Wide boards get a landscape page so they fill it nicely.
        const wide = item.picture.width > item.picture.height;
        const orientation = wide ? "landscape" : "portrait";
        const pageWidth = wide ? 297 : 210;
        const pageHeight = wide ? 210 : 297;

        if (index === 0) {
          pdf = new maker({ unit: "mm", format: "a4", orientation: orientation });
        } else {
          pdf.addPage("a4", orientation);
        }

        pdf.setFontSize(16);
        pdf.text("Lonchi Ice Cream & More", margin, margin + 4);
        pdf.setFontSize(10);
        pdf.text(item.board.title, margin, margin + 11, { maxWidth: pageWidth - margin * 2 });

        const top = margin + 18;
        const maxWidth = pageWidth - margin * 2;
        const maxHeight = pageHeight - top - margin - 8;
        const scale = Math.min(maxWidth / item.picture.width, maxHeight / item.picture.height);
        const width = item.picture.width * scale;
        const height = item.picture.height * scale;

        pdf.addImage(
          item.picture.dataUrl,
          "JPEG",
          (pageWidth - width) / 2,
          top + (maxHeight - height) / 2,
          width,
          height
        );

        pdf.setFontSize(9);
        pdf.text(
          "CB 29 Kachukhet, Muslim Modern School Road, Dhaka Cantonment · 01609-905226",
          margin,
          pageHeight - margin
        );
      });


      pdf.save("lonchi-full-menu.pdf");
      show("Saved as lonchi-full-menu.pdf");
    } catch (error) {
      show("Sorry, the PDF could not be made. Please try again.");
    } finally {
      button.disabled = false;
      button.innerHTML = label;
    }
  });
}
