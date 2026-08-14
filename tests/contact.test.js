import assert from "node:assert/strict";
import test from "node:test";

import { createWhatsAppUrl } from "../assets/js/contact.js";

test("creates an encoded WhatsApp contact URL", () => {
  const url = createWhatsAppUrl({
    whatsappNumber: "5511999999999",
    message: "Olá! Quero saber mais.",
  });

  assert.equal(
    url,
    "https://wa.me/5511999999999?text=Ol%C3%A1%21+Quero+saber+mais.",
  );
});
