(function exposeFormConfig(globalScope) {
  const formConfig = {
    startsAt: "2026-09-19T00:00:00-03:00",
    expiresAt: "2026-09-28T23:59:59-03:00",
    notStartedMessage:
      "El período de inscripción comienza el 19 de septiembre de 2026",
    expiredMessage:
      "El período de inscripción finalizó el 28 de septiembre de 2026",
  };

  if (globalScope) {
    globalScope.FORM_CONFIG = formConfig;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { FORM_CONFIG: formConfig };
  }
})(typeof window !== "undefined" ? window : globalThis);
