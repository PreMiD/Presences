const presence = new Presence({
  clientId: "691575527190036480"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  /**
   * Get search query from HTML form input.
   */
  function searchQuery(): HTMLInputElement {
    return document.getElementById("sb_form_q") as HTMLInputElement;
  }

  /**
   * Get amount of results from query.
   */
  function queryResults(): HTMLElement {
    return document.getElementsByClassName("sb_count")[0] as HTMLElement;
  }

  /**
   * Sets the timestamp.
   */
  function setTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * Get's the setting specified and replaces %search% with the search input.
   * @param {String} settingName Name of the setting
   */
  async function handleFormatting(settingName: string): Promise<string> {
    const setting = await presence.getSetting(settingName);
    return setting.replace("%search%", searchQuery().value);
  }

  if (
    document.URL === "https://www.bing.com/" ||
    document.URL === "https://www.bing.com" ||
    document.location.href.includes("/?cc=") ||
    document.location.href.includes("/?FORM=Z9FD1")
  ) {
    presenceData.details = await presence.getSetting("homepageMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("/account/general")) {
    presenceData.details = await presence.getSetting("settingsMessage");
    presenceData.startTimestamp = setTimestamp();
  } else if (document.location.href.includes("?q=")) {
    presenceData.startTimestamp = setTimestamp();
    presenceData.smallImageKey = "search";

    if (document.location.href.includes("/images/"))
      presenceData.details = await handleFormatting("imageSearch");
    else if (document.location.href.includes("/videos/"))
      presenceData.details = await handleFormatting("videoSearch");
    else if (document.location.href.includes("/news/"))
      presenceData.details = await handleFormatting("newsSearch");
    else {
      presenceData.details = await handleFormatting("standardSearch");
      presenceData.state = queryResults().innerText;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
