function selectTab(tabs, selectedTab) {
  tabs.forEach((tab) => {
    const isSelected = tab === selectedTab;
    const panel = document.getElementById(tab.getAttribute("aria-controls"));

    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    if (panel) panel.hidden = !isSelected;
  });
}

export function initializeProcess() {
  const process = document.querySelector("[data-process]");
  if (!process) return;

  const tabs = [...process.querySelectorAll('[role="tab"]')];

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tabs, tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

      event.preventDefault();
      const targetIndex = event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;

      tabs[targetIndex].focus();
      selectTab(tabs, tabs[targetIndex]);
    });
  });
}
