function buildContactMessage(formData) {
  const fields = [
    ["Nome", formData.get("name")],
    ["Telefone", formData.get("phone")],
    ["Email", formData.get("email")],
    ["Cidade", formData.get("city")],
    ["Mensagem", formData.get("message")],
  ];

  return [
    "Olá! Quero receber mais informações sobre a Consultoria Lixo Zero.",
    "",
    ...fields.filter(([, value]) => String(value).trim()).map(([label, value]) => `${label}: ${String(value).trim()}`),
  ].join("\n");
}

export function initializeContactForm(contactConfig) {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      form.querySelector(":invalid")?.focus();
      if (status) status.textContent = "Revise os campos destacados antes de enviar.";
      return;
    }

    const message = buildContactMessage(new FormData(form));
    const url = new URL(`https://wa.me/${contactConfig.whatsappNumber}`);
    url.searchParams.set("text", message);
    if (status) status.textContent = "Abrindo o WhatsApp para concluir o contato…";
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  });
}
