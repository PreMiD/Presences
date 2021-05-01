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
    };

  if (document.location.pathname.includes("/search")) {
    presenceData.details = "Searching Beatmaps";
    presenceData.state = document
      .querySelector("input.input")
      .getAttribute("value");
  } else if (document.location.pathname.includes("/beatmap/")) {
    if (document.querySelector("span.tag.is-expert-plus") != null)
      presenceData.smallImageKey = "expert_",
        presenceData.smallImageText = "Top Diff: Expert+";
    else if (document.querySelector("span.tag.is-expert") != null)
      presenceData.smallImageKey = "expert",
        presenceData.smallImageText = "Top Diff: Expert";
    else if (document.querySelector("span.tag.is-hard") != null)
      presenceData.smallImageKey = "hard",
        presenceData.smallImageText = "Top Diff: Hard";
    else if (document.querySelector("span.tag.is-normal") != null)
      presenceData.smallImageKey = "normal",
        presenceData.smallImageText = "Top Diff: Normal";
    else
      presenceData.smallImageKey = "easy";
        presenceData.smallImageText = "Top Diff: Easy";
    presenceData.details = document
      .querySelector("h1.is-size-1")
      .textContent;
    presenceData.state = document
      .querySelector("h2.is-size-4")
      .textContent;
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      },
      {
        label: "View Uploader's Page",
        url: "https://beatsaver.com" + document.querySelector("h2.is-size-4 > a").getAttribute("href")
      }
    ];
  }
  else if (document.location.pathname.includes("/uploader/"))
    presenceData.details = "Browsing By Uploader",
      presenceData.state = document
        .querySelector("h1.is-size-2.has-text-weight-light.has-text-centered")
        .textContent.split(" ")[2],
      presenceData.buttons = [
        {
          label: "View Page",
          url: document.location.href
        }
      ];
  else if (document.location.pathname.includes("/browse/latest"))
    presenceData.details = "Browsing By Latest";
  else if (document.location.pathname.includes("/browse/plays"))
    presenceData.details = "Browsing By Plays";
  else if (document.location.pathname.includes("/browse/downloads"))
    presenceData.details = "Browsing By Downloads";
  else if (document.location.pathname.includes("/browse/rating"))
    presenceData.details = "Browsing By Rating";
  else if (document.location.pathname.includes("/browse/hot"))
    presenceData.details = "Browsing By Hot";
  else if (document.location.pathname.includes("/ranking/requests"))
    presenceData.details = "Browsing Rank Requests";
  else if (document.location.pathname.includes("/legal/license"))
    presenceData.details = "Viewing License";
  else if (document.location.pathname.includes("/legal/privacy"))
    presenceData.details = "Viewing Privacy Policy";
  else if (document.location.pathname == ("/legal/dmca"))
    presenceData.details = "Viewing DMCA Policy";
  else if (document.location.pathname == ("/auth/login"))
    presenceData.details = "Logging In...";
  else if (document.location.pathname == ("/auth/register"))
    presenceData.details = "Registering...";
  else if (document.location.pathname == ("/user/upload"))
    presenceData.details = "Uploading...";
  else if (document.location.href == ("https://beatsaver.com/"))
    presenceData.details = "Viewing Home Page";

  if (!time)
    delete presenceData.startTimestamp;

  if (!buttons)
    delete presenceData.buttons;

  presence.setActivity(presenceData);
});
