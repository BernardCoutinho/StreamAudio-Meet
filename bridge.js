// Contexto isolado: lê as preferências da extensão e envia para o código MAIN.
(() => {
  const send = (percent) => {
    const value = Number(percent);
    if (!Number.isFinite(value) || value < 0 || value > 1000) return;
    window.postMessage({ type: "STREAMAUDIO_GAIN_UPDATE", value: value / 100 }, location.origin);
  };

  chrome.storage.local.get({ gainPercent: 300 }, ({ gainPercent }) => send(gainPercent));
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.gainPercent) send(changes.gainPercent.newValue);
  });
})();
