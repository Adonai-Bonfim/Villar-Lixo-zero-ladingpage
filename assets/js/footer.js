export function updateCopyrightYear(elementId, date = new Date()) {
  const yearElement = document.getElementById(elementId);

  if (!yearElement) {
    return;
  }

  yearElement.textContent = date.getFullYear();
}
