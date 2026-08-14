import { contactConfig } from "./config.js";
import { configureContactLinks } from "./contact.js";
import { reportError } from "./errors.js";
import { updateCopyrightYear } from "./footer.js";
import { initializeContactForm } from "./form.js";
import { initializeRevealMotion } from "./motion.js";
import { initializeNavigation } from "./navigation.js";
import { initializeProcess } from "./process.js";
import { registerServiceWorker } from "./service-worker.js";

try {
  configureContactLinks(".whatsapp-link", contactConfig);
  updateCopyrightYear("year");
  initializeContactForm(contactConfig);
  initializeRevealMotion();
  initializeNavigation();
  initializeProcess();
  registerServiceWorker();
} catch (error) {
  reportError(error, { phase: "bootstrap" });
}
