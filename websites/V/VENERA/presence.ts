const presence = new Presence({
  clientId: "903027651655131157",
}),
time = Math.floor(Date.now() / 1000);
let item1, item2;
presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: time,
  },
  path = document.location.pathname;
if (path.includes("/") && !window.location.href.includes("venera"))
  presenceData.details = "trpg.cz";
else if (path == "" || path == "/") {
  presenceData.details = "Hlavní stránka";
} else if (path.includes("/rules")) {
  presenceData.details = "Pravidla";
} else if (path.includes("/features")) {
  presenceData.details = "Systémy";
} else if (path.includes("/characters")) {
  if (path == "/characters") presenceData.details = "Postavy";
  if (path.includes("/characters/")) {
    if (path.includes("create")) presenceData.details = "Tvorba postavy";
    else {
      item1 = document.querySelector("div.banner-text h2").textContent;
      presenceData.details = "Prohlíží si postavu:";
      presenceData.state = item1;
    }
  }
} else if (path.includes("create")) presenceData.details = "Tvorba postavy";
else if (path.includes("lore")) {
  presenceData.details = "Reálie";

  if (path == "/lore") presenceData.state = "Rejstřík reálií";
  else if (path.includes("world")) presenceData.state = "Svět";
  else if (path.includes("city")) presenceData.state = "Město";
  else if (path.includes("war")) presenceData.state = "Třetí světová válka";
  else if (path.includes("ai")) presenceData.state = "A.I.";
} else if (path.includes("timeline")) presenceData.state = "Timeline";
else if (path.includes("/game")) {
  presenceData.details = "Prozkoumává tajemství";
  presenceData.state = "Venery";
} else if (path.includes("edit")) {
  presenceData.details = "Úprava postavy";
}
presence.setActivity(presenceData);
});