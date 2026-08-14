const WHATSAPP_BASE_URL = "https://wa.me";

export function createWhatsAppUrl({ whatsappNumber, message }) {
  const url = new URL(`${WHATSAPP_BASE_URL}/${whatsappNumber}`);
  url.searchParams.set("text", message);

  return url.toString();
}

export function configureContactLinks(selector, contactConfig) {
  const contactUrl = createWhatsAppUrl(contactConfig);

  document.querySelectorAll(selector).forEach((link) => {
    link.href = contactUrl;
  });
}
