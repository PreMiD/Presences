const presence = new Presence({
    clientId: "812413011502825504"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);
let search: HTMLInputElement, title: HTMLElement, title2: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    page = window.location.pathname;

  if (page === "/") {
    search = document.querySelector(
      "#__next > div > div > div.SearchModalstyle__SearchModalStyle-sc-1h6b5wy-0.knmuVj > div.SearchModalstyle__SearchModalHeaderStyle-sc-1h6b5wy-1.kNvWZE > div > div:nth-child(2) > div.SearchModalstyle__SearchModalInputWrapperStyle-sc-1h6b5wy-5.iwOFOK > input"
    );
    if (!search) presenceData.details = "Bekijkt de homepagina";
    else if (search.value !== "") {
      presenceData.details = "Zoekt voor:";
      presenceData.state = search.value;
      presenceData.smallImageKey = "searching";
    } else presenceData.details = "Bekijkt de homepagina";
  }
  if (page === "/programmas" || page === "/programmas/") {
    presenceData.details = "Ontdekt:";
    presenceData.state = "Programma's";
  }
  if (page === "/films" || page === "/films/") {
    presenceData.details = "Ontdekt:";
    presenceData.state = "Films";
  }
  if (page.includes("/films/video/")) {
    delete presenceData.startTimestamp;

    presenceData.details = (
      document.getElementsByClassName(
        "Textstyle__VideoMetaDataTitle-sc-2ihbn2-17"
      ) as HTMLCollection
    )[0].textContent;
    title2 = document.querySelector("#player");
    if (title2.className.includes("paused")) {
      delete presenceData.endTimestamp;
      presenceData.smallImageKey = "pause";
    } else if (title2.className.includes("playing")) {
      [, presenceData.endTimestamp] = presence.getTimestamps(
        presence.timestampFromFormat(
          document.querySelector(
            "#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed"
          ).textContent
        ),
        presence.timestampFromFormat(
          document.querySelector(
            "#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-duration"
          ).textContent
        )
      );
      presenceData.smallImageKey = "play";
    }
  }
  if (page.includes("/afleveringen/video/")) {
    delete presenceData.startTimestamp;
    const titles = document.querySelector(
      'meta[name="og:title"]'
    ) as HTMLMetaElement;
    presenceData.details = titles.content
      .replace("Seizoen", "")
      .replace("aflevering", "")
      .replace(/[0-9]/g, "");
    presenceData.state = titles.content
      .slice(-titles.content.replace(/[^0-9.]/g, "").length + 21)
      .replace(/,/g, ":")
      .replace("Seizoen", "S")
      .replace("aflevering", ":E")
      .replace(/\s/g, "");
    title2 = document.querySelector("#player");
    if (title2.className.includes("paused")) {
      delete presenceData.endTimestamp;
      presenceData.smallImageKey = "pause";
    } else if (title2.className.includes("playing")) {
      [, presenceData.endTimestamp] = presence.getTimestamps(
        presence.timestampFromFormat(
          document.querySelector(
            "#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed"
          ).textContent
        ),
        presence.timestampFromFormat(
          document.querySelector(
            "#player-jw-wrapper > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-duration"
          ).textContent
        )
      );
      presenceData.smallImageKey = "play";
    } else {
      title = document.querySelector(
        "#__next > div > div > div.Mainstyle__MainContentStyle-l53ku6-1.kgsvtU > div > div.Layoutstyle__LightStyle-ecv4pg-0.Formatstyle__FormatLightStyleWrapperStyle-q2lvra-0.beAxHC > div.PromoImageHeadingstyle__PromoImageHeadingStyle-sc-13od09h-0.bwAzes > div.PromoImageHeadingstyle__PromoImageHeadingInnerWrapperStyle-sc-13od09h-2.klAHSa > div > div > div > div.FormatHeadingstyle__FormatHeadingImageWithTextWrapperStyle-sc-148hpqf-1.YJtQc > div.FormatHeadingstyle__FormatHeadingTextStyle-sc-148hpqf-2.glOvjd > h1"
      );

      presenceData.details = "Bekijkt:";
      presenceData.state = title.textContent;
    }
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
