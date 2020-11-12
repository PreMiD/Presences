const presence = new Presence({
  clientId: "776479405009666098"
});

const browsingStamp = Math.floor(Date.now() / 1000);

function getByXpath(xpath: string) {
  try {
    return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE,null).iterateNext().textContent;
  } catch (e) {
    return null;
  }
}

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "proxer_icon",
    details: "Idle",
    state: "Browsing Proxer.me"
  };

  if (document.location.pathname.includes("/watch")) {
    const anime_name = getByXpath("//*[@class='wName']") || "Unknown Anime";
    const anime_ep = getByXpath("//*[@class='wEp']") || "?";
    const anime_ep_max = getByXpath("//*[@id='wContainer']/tbody/tr[1]/td/text()[4]") || "";
    const anime_lang = getByXpath("//*[@class='wLanguage']") || "?";
    presenceData.details = `Watching ${anime_name}`;
    presenceData.state = `Ep ${anime_ep}${anime_ep_max} (${anime_lang})`;
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("chat")) {
    presenceData.details = "Chatting";
  } else if (document.location.pathname.includes("forum")) {
    presenceData.details = "Checking the forum";
  } else if (document.location.pathname.includes("airing")) {
    presenceData.details = "Checking seasonal Anime";
  } else if (document.location.pathname.includes("gallery")) {
    presenceData.details = "Checking the gallery";
  } else if (document.location.pathname.includes("news")) {
    presenceData.details = "Checking the news";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
