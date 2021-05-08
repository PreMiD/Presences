const presence = new Presence({
    clientId: "837997079208525835"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const time = await presence.getSetting("time"),
    buttons = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    showAutos = <HTMLInputElement>document.querySelector("#showAutos");

  if (document.location.pathname.includes("/search")) {
    presenceData.details = "Searching Beatmaps";
    presenceData.state = document
      .querySelector("input.input")
      .getAttribute("value");
    if (showAutos.checked) {
      presenceData.smallImageKey = "showauto";
      presenceData.smallImageText = "Showing Auto-generated Beatmaps";
    }
  } else if (document.location.pathname.includes("/beatmap/")) {
    if (document.querySelector("span.tag.is-expert-plus") != null)
      (presenceData.smallImageKey = "expert_"),
        (presenceData.smallImageText = "Top Diff: Expert+");
    else if (document.querySelector("span.tag.is-expert") != null)
      (presenceData.smallImageKey = "expert"),
        (presenceData.smallImageText = "Top Diff: Expert");
    else if (document.querySelector("span.tag.is-hard") != null)
      (presenceData.smallImageKey = "hard"),
        (presenceData.smallImageText = "Top Diff: Hard");
    else if (document.querySelector("span.tag.is-normal") != null)
      (presenceData.smallImageKey = "normal"),
        (presenceData.smallImageText = "Top Diff: Normal");
    else {
      presenceData.smallImageKey = "easy";
      presenceData.smallImageText = "Top Diff: Easy";
    }
    presenceData.details = document.querySelector("h1.is-size-1").textContent;
    presenceData.state = document.querySelector("h2.is-size-4").textContent;
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      },
      {
        label: "View Uploader's Page",
        url:
          "https://beatsaver.com" +
          document.querySelector("h2.is-size-4 > a").getAttribute("href")
      }
    ];
  } else if (document.location.pathname.includes("/uploader/")) {
    presenceData.details = "Browsing By Uploader";
    presenceData.state = document
      .querySelector("h1.is-size-2.has-text-weight-light.has-text-centered")
      .textContent.split(" ")[2];
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
    if (showAutos.checked) {
      presenceData.smallImageKey = "showauto";
      presenceData.smallImageText = "Showing Auto-generated Beatmaps";
    }
  }

  switch (document.location.pathname) {
    case "/browse/latest":
      presenceData.details = "Browsing By Latest";
      break;
    case "/browse/plays":
      presenceData.details = "Browsing By Plays";
      break;
    case "/browse/downloads":
      presenceData.details = "Browsing By Downloads";
      break;
    case "/browse/rating":
      presenceData.details = "Browsing By Rating";
      break;
    case "/browse/hot":
      presenceData.details = "Browsing By Hot";
      break;
    case "/legal/license":
      presenceData.details = "Viewing License";
      break;
    case "/legal/privacy":
      presenceData.details = "Viewing Privacy Policy";
      break;
    case "/legal/dmca":
      presenceData.details = "Viewing DMCA Policy";
      break;
    case "/auth/login":
      presenceData.details = "Logging In...";
      break;
    case "/auth/register":
      presenceData.details = "Registering...";
      break;
    case "/user/upload":
      presenceData.details = "Uploading...";
      break;
    case "/":
      presenceData.details = "Viewing Home Page";
      break;
  }

  if (document.location.pathname.split("/")[1].includes("browse")) {
    if (showAutos.checked) {
      presenceData.smallImageKey = "showauto";
      presenceData.smallImageText = "Showing Auto-generated Beatmaps";
    }
  }

  if (!time) delete presenceData.startTimestamp;

  if (!buttons && presenceData.buttons) delete presenceData.buttons;

  presence.setActivity(presenceData);
});
