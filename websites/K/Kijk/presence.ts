const presence = new Presence({
  clientId: "812413011502825504"
}), browsingStamp = Math.floor(Date.now() / 1000);
let search: HTMLInputElement,
title: HTMLElement,
title2: HTMLElement,
title3: HTMLElement;

function checkFlag(titles: Element) {
  if(titles == null) {
     window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
  } else {
    return;
  }
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  },
  page = window.location.pathname,
  host = document.location.hostname; 

    presenceData.startTimestamp = browsingStamp;
    if (host == "www.kijk.nl") {
    if (page == "/") {
      search = document.querySelector("#__next > div > div > div.SearchModalstyle__SearchModalStyle-sc-1h6b5wy-0.knmuVj > div.SearchModalstyle__SearchModalHeaderStyle-sc-1h6b5wy-1.kNvWZE > div > div:nth-child(2) > div.SearchModalstyle__SearchModalInputWrapperStyle-sc-1h6b5wy-5.iwOFOK > input");
      if (!search) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the homepage";
      } else if (search.value != "") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Searching For:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "searching";
      } else { 
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the homepage";
      }
    }
    if (page == "/programmas" || page == "/programmas/") {
      presenceData.details = "Discovering:"
      presenceData.state = "Programma's"
      presenceData.startTimestamp = browsingStamp;
    }
    if (page == "/films" || page == "/films/") {
      presenceData.details = "Discovering:"
      presenceData.state = "Films"
      presenceData.startTimestamp = browsingStamp;
    }
    if (page.includes("/films/video/")) {
      delete presenceData.startTimestamp
       var showname = document.getElementsByClassName("Textstyle__VideoMetaDataTitle-sc-2ihbn2-17") as HTMLCollection;
        presenceData.details = showname[0].textContent;
      title3 = document.querySelector("#player")
      if (title3.className.includes("paused")) {
        delete presenceData.endTimestamp
        presenceData.smallImageKey = "pause";
      } else if (title3.className.includes("playing")) {
        const currentTime = presence.timestampFromFormat(
          document.querySelector("#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed")
            .textContent
        ),
        durationss = presence.timestampFromFormat(
          document.querySelector("#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-duration")
            .textContent
        ),
        timestamps = presence.getTimestamps(currentTime, durationss);
        presenceData.endTimestamp = timestamps[1]
        presenceData.smallImageKey = "play";
    }
  }
      if (page.includes("/afleveringen/video/")) {
        delete presenceData.startTimestamp
        let titles = document.querySelector('meta[name="og:title"]') as HTMLMetaElement;
        let rp23 = titles.content.replace(/[^0-9.]/g, '');
        let rp2 = rp23.length + 21
        let rp = titles.content.slice(-rp2)
        presenceData.details = titles.content.replace("Seizoen", "").replace("aflevering", "").replace(/[0-9]/g, '')
        presenceData.state = rp.replace(",", ":").replace("Seizoen", "S").replace("aflevering", ":E").replace(/\s/g, "");
        title3 = document.querySelector("#player")
        if (title3.className.includes("paused")) {
          delete presenceData.endTimestamp
          presenceData.smallImageKey = "pause";
        } else if (title3.className.includes("playing")) {
          const currentTime = presence.timestampFromFormat(
            document.querySelector("#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed")
              .textContent
          ),
          durationss = presence.timestampFromFormat(
            document.querySelector("#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-duration")
              .textContent
          ),
          timestamps = presence.getTimestamps(currentTime, durationss);
          presenceData.endTimestamp = timestamps[1]
          presenceData.smallImageKey = "play";
      } else {
      title = document.querySelector("#__next > div > div > div.Mainstyle__MainContentStyle-l53ku6-1.kgsvtU > div > div.Layoutstyle__LightStyle-ecv4pg-0.Formatstyle__FormatLightStyleWrapperStyle-q2lvra-0.beAxHC > div.PromoImageHeadingstyle__PromoImageHeadingStyle-sc-13od09h-0.bwAzes > div.PromoImageHeadingstyle__PromoImageHeadingInnerWrapperStyle-sc-13od09h-2.klAHSa > div > div > div > div.FormatHeadingstyle__FormatHeadingImageWithTextWrapperStyle-sc-148hpqf-1.YJtQc > div.FormatHeadingstyle__FormatHeadingTextStyle-sc-148hpqf-2.glOvjd > h1")
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing:";
      presenceData.state = title.textContent;
    }
  }
  } else if (host == "help.marktplaats.nl") {
    search = document.querySelector("#\\31 37\\:0");
    title = document.querySelector("head > title");
    if (page == "/s/") {
      if (search.value != "") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Helpdesk searching for:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "searching";
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking out the helpdesk";
      }
    }
    if (page.includes("/topic/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Helpdesk viewing:";
      presenceData.state = title.textContent.replace(" | Helpdesk", "");
      presenceData.smallImageKey = "reading";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});