const presence = new Presence({
    clientId: "716332018224595044"
  }),
  browsingElapsedTimestamp = Math.floor(Date.now() / 1000);

function getParameterByName(name: string, url: string): string {
  url ??= window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "dizipub-logo"
  };
  if (document.location.hostname === "dizipub.net") {
    presenceData.startTimestamp = browsingElapsedTimestamp;
    if (
      document.location.pathname === "/" &&
      !getParameterByName("s", window.location.href)
    )
      presenceData.details = "Ana sayfaya göz atıyor...";
    else if (document.location.pathname.includes("dizi/")) {
      presenceData.details = "Bir diziye göz atıyor:";
      presenceData.state = document.querySelector(
        "body > div#body-wrapper > section > div.section > div#details > article > h1"
      ).innerHTML;
    } else if (document.location.pathname.includes("/animeler"))
      presenceData.details = "Animelere göz atıyor...";
    else if (document.location.pathname.includes("/asya-dizileri"))
      presenceData.details = "Asya dizilerine göz atıyor...";
    else if (document.location.pathname.includes("/diziler"))
      presenceData.details = "Yabancı dizilere göz atıyor...";
    else if (document.location.pathname.includes("/arsiv"))
      presenceData.details = "Arşivi inceliyor...";
    else if (getParameterByName("s", window.location.href)) {
      presenceData.details = "Dizi bulmaya çalışıyor:";
      presenceData.state = getParameterByName("s", window.location.href);
    } else if (document.location.pathname.includes("/blog"))
      presenceData.details = "Bloga göz atıyor...";
    else if (document.location.pathname.includes("/kayit-ol"))
      presenceData.details = "Siteye kayıt oluyor...";
    else if (document.location.pathname.includes("/anime/")) {
      const name = document.querySelector(
        "body > div#body-wrapper > section > div.tabs > div#details > article > h1"
      ).innerHTML;
      presenceData.details = "Bir animeye göz atıyor:";
      presenceData.state = name;
    } else if (document.location.pathname.includes("/dizi/")) {
      const name = document.querySelector(
        "body > div#body-wrapper > section > div.tabs > div#details > article > h1"
      ).innerHTML;
      presenceData.details = "Bir diziye göz atıyor:";
      presenceData.state = name;
    } else if (document.location.pathname.includes("/iletisim"))
      presenceData.details = "İletişim sayfasına göz atıyor...";
    else {
      if (document.getElementsByClassName("black-title")) {
        presenceData.details = `${
          document.getElementsByClassName("black-title")[0].innerHTML
        } izliyor`;
        if (document.getElementsByClassName("episode-name")) {
          [presenceData.state] = document
            .querySelector(
              "body > div#body-wrapper > div#content > div.section > section > div.section-title > h1 > a > mark"
            )
            .innerHTML.split('<span class="episode-name">');
        }
      }
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
