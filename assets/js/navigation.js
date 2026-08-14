const OPEN_CLASS = "is-menu-open";

export function initializeNavigation() {
  const header = document.querySelector(".topbar");
  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.getElementById("primary-navigation");

  if (!header || !toggle || !navigation) return;

  let scrollFrame;
  let previousScrollY = window.scrollY;

  const updateHeaderAppearance = () => {
    const currentScrollY = Math.max(window.scrollY, 0);
    const movement = currentScrollY - previousScrollY;
    const menuIsOpen = toggle.getAttribute("aria-expanded") === "true";

    header.classList.toggle("is-scrolled", currentScrollY > 24);

    if (currentScrollY <= 24 || menuIsOpen || movement > 6) {
      header.classList.remove("is-hidden");
    } else if (movement < -6 && currentScrollY > header.offsetHeight) {
      header.classList.add("is-hidden");
    }

    previousScrollY = currentScrollY;
    scrollFrame = undefined;
  };

  const setMenuState = (isOpen) => {
    header.classList.toggle(OPEN_CLASS, isOpen);
    if (isOpen) header.classList.remove("is-hidden");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu principal" : "Abrir menu principal");
  };

  toggle.addEventListener("click", () => {
    setMenuState(toggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });

  window.addEventListener(
    "scroll",
    () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateHeaderAppearance);
    },
    { passive: true },
  );

  updateHeaderAppearance();
}
