const iframe = new iFrame();

// Add event listeners to buttons to set game mode
document
  .querySelector("#quickPlayWindow_ClassicButton")
  .addEventListener("click", () => iframe.send("Classic"));
document
  .querySelector("#quickPlayWindow_ArrowsButton")
  .addEventListener("click", () => iframe.send("Arrows"));
document
  .querySelector("#quickPlayWindow_GrappleButton")
  .addEventListener("click", () => iframe.send("Grapple"));
document
  .querySelector("#quickPlayWindow_SimpleButton")
  .addEventListener("click", () => iframe.send("Simple"));

document.querySelector("#roomlistjoinbutton").addEventListener("click", () => {
  const selectedMode = document.querySelector("tr.SELECTED > td:nth-child(3)");
  if (selectedMode) iframe.send(selectedMode.textContent);
});
