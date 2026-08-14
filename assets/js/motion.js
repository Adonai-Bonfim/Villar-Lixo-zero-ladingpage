const REVEAL_SELECTOR = [
  ".hero-copy > *",
  ".proof",
  ".authority-strip",
  ".problem-heading > *",
  ".problem-content > h3",
  ".problem-card",
  ".solution-copy > *",
  ".process",
  ".field-work-heading > *",
  ".story-card",
  ".why-card",
  "section > .section-kicker",
  "section > h2",
  "section > .intro",
  ".benefit",
  ".award-feature",
  ".certification > *",
  ".final > *",
].join(",");

export function initializeRevealMotion() {
  const elements = [...document.querySelectorAll(REVEAL_SELECTOR)];

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  elements.forEach((element, index) => {
    element.dataset.reveal = "";
    element.style.setProperty("--reveal-delay", `${(index % 5) * 70}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10%", threshold: 0.08 },
  );

  elements.forEach((element) => observer.observe(element));
}
