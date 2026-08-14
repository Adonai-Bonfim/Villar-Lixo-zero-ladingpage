export function reportError(error, context = {}) {
  const normalizedError = error instanceof Error ? error : new Error(String(error));

  console.error("[Villar] Falha na inicialização", {
    message: normalizedError.message,
    context,
  });
}
