const slider = document.querySelector("#gain");
const value = document.querySelector("#value");
const reset = document.querySelector("#reset");

const show = (percent) => {
  slider.value = String(percent);
  value.textContent = `${percent}%`;
};
chrome.storage.local.get({ gainPercent: 300 }, ({ gainPercent }) => {
  const valid = Number.isFinite(gainPercent) && gainPercent >= 0 && gainPercent <= 1000;
  show(valid ? gainPercent : 300);
});
slider.addEventListener("input", () => show(Number(slider.value)));
slider.addEventListener("change", () => chrome.storage.local.set({ gainPercent: Number(slider.value) }));
reset.addEventListener("click", () => {
  show(300);
  chrome.storage.local.set({ gainPercent: 300 });
});
