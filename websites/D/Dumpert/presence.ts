const presence = new Presence({
  clientId: "840126038205923369"
}),
browsingStamp = Math.floor(Date.now() / 1000);
let search: HTMLInputElement, title: Element;

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
    largeImageKey: "logo"
  },
  page = window.location.pathname,
  pageh = document.location.href;

presenceData.startTimestamp = browsingStamp;

if (page == "/") {
  presenceData.details = "Home Pagina"
}
if (pageh.includes("selectedId=")) {
   title = document.querySelector(
    '#app > div > div:nth-child(6) > div > section > div.popup--307itj > div > div:nth-child(3) > div > article > div.item--2CpOv4.card--158lmg.detail--1SO6U0.detail-item > div.summary--2zr-I0.detail--1SO6U0.detail_summary > div.desc--qWymgd > h3'
   )
 presenceData.details = title.textContent;
}

if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});
