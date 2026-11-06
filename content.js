// StreamAudio Meet: ganho apenas na trilha de áudio compartilhada.
// Executa no contexto MAIN para interceptar a captura iniciada pelo Meet.
(() => {
  const devices = navigator.mediaDevices;
  if (!devices || typeof devices.getDisplayMedia !== "function") return;
  if (window.__streamAudioGainInstalled) return;
  window.__streamAudioGainInstalled = true;

  const original = devices.getDisplayMedia.bind(devices);
  let gainValue = 3;
  const activeGains = new Set();

  window.addEventListener("message", (event) => {
    if (event.source !== window || event.data?.type !== "STREAMAUDIO_GAIN_UPDATE") return;
    const value = Number(event.data.value);
    if (!Number.isFinite(value) || value < 0 || value > 10) return;
    gainValue = value;
    for (const node of activeGains) {
      node.gain.setTargetAtTime(value, node.context.currentTime, 0.025);
    }
  });

  devices.getDisplayMedia = async (options = {}) => {
    // Respeita a escolha de compartilhar sem áudio.
    if (!options.audio) return original(options);

    const stream = await original({ ...options, windowAudio: "window" });
    const audioTrack = stream.getAudioTracks()[0];
    if (!audioTrack) return stream;

    let context;
    let processedTrack;
    let gain;
    try {
      context = new AudioContext();
      const source = context.createMediaStreamSource(new MediaStream([audioTrack]));
      gain = context.createGain();
      gain.gain.value = gainValue;
      const destination = context.createMediaStreamDestination();
      source.connect(gain);
      gain.connect(destination); // Nunca conecta ao áudio local.

      processedTrack = destination.stream.getAudioTracks()[0];
      if (!processedTrack) throw new Error("Trilha de áudio processada indisponível");
      stream.removeTrack(audioTrack);
      stream.addTrack(processedTrack);
      activeGains.add(gain);

      let released = false;
      const release = () => {
        if (released) return;
        released = true;
        activeGains.delete(gain);
        if (processedTrack.readyState !== "ended") processedTrack.stop();
        if (audioTrack.readyState !== "ended") audioTrack.stop();
        void context.close().catch(() => {});
      };
      for (const videoTrack of stream.getVideoTracks()) {
        videoTrack.addEventListener("ended", release, { once: true });
      }
      audioTrack.addEventListener("ended", release, { once: true });
      if (context.state === "suspended") {
        void context.resume().catch((error) => console.warn("[StreamAudio] Áudio suspenso:", error));
      }
    } catch (error) {
      console.warn("[StreamAudio] Sem processamento de ganho, mantendo áudio original:", error);
      if (gain) activeGains.delete(gain);
      if (processedTrack) {
        if (stream.getAudioTracks().includes(processedTrack)) stream.removeTrack(processedTrack);
        processedTrack.stop();
      }
      if (!stream.getAudioTracks().includes(audioTrack)) stream.addTrack(audioTrack);
      if (context) void context.close().catch(() => {});
    }
    return stream;
  };
})();
