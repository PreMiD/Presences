const presence = new Presence({
    clientId: "612704158826496028"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000),
  pageInput: HTMLInputElement = document.querySelector("#lst-ib"),
  homepageInput: HTMLInputElement = document.querySelector('input[name="q"]'),
  homepageImage: HTMLElement = document.querySelector("#hplogo"),
  imgInput: HTMLInputElement = document.querySelector("#REsRA");

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "lg",
    startTimestamp: browsingTimestamp
  };

  if ((homepageInput && homepageImage) || !document.location.pathname) {
    presenceData.state = "Home";
    presenceData.startTimestamp = browsingTimestamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/doodles/")) {
    const doodleResult = new URL(document.location.href).searchParams.get("q"),
      doodleTitle: HTMLElement = document.querySelector(
        "#title-card > div > h2"
      );

    if (document.location.pathname.includes("/about")) {
      presenceData.details = "Doodles";
      presenceData.state = "About";
    } else if (doodleTitle) {
      presenceData.details = "Viewing a doodle:";
      presenceData.state = doodleTitle.textContent;
    } else if (doodleResult && document.location.pathname === "/doodles/") {
      presenceData.details = "Searching for a doodle:";
      presenceData.state = doodleResult;
      presenceData.smallImageKey = "search";
    } else {
      presenceData.details = "Current page:";
      presenceData.state = "Doodles";
    }
  } else if (document.location.pathname.startsWith("/search")) {
    const searchTab = new URL(document.location.href).searchParams.get("tbm");
    presenceData.smallImageKey = "search";

    if (!searchTab) {
      presenceData.details = `Searching for ${homepageInput.value}`;
      presenceData.state = document.querySelector("#result-stats").textContent;
    } else if (searchTab === "isch") {
      presenceData.details = "Google Images";
      presenceData.state = `Searching for ${imgInput.value}`;
    } else if (searchTab === "vid") {
      presenceData.details = "Google Videos";
      presenceData.state = `Searching for ${pageInput.value}`;
    } else if (searchTab === "nws") {
      presenceData.details = "Google News";
      presenceData.state = `Searching for ${pageInput.value}`;
    } else if (searchTab === "bks") {
      presenceData.details = "Google Books";
      presenceData.state = `Searching for ${pageInput.value}`;
    } else if (searchTab === "fin") {
      presenceData.details = "Google Finance";
      presenceData.state = `Searching for ${pageInput.value}`;
    } else if (searchTab === "pers") {
      presenceData.details = "Google Personal";
      presenceData.state = `Searching for ${pageInput.value}`;
    }
  }

  presence.setActivity(presenceData);
});
