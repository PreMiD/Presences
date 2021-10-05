const presence = new Presence({
    clientId: "651135297756856339"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let title;
const actionURL = new URL(document.location.href),
  title2URL = new URL(document.location.href);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  title = document.querySelector("h1#firstHeading");
  const actionResult = actionURL.searchParams.get("action"),
    title2Result = title2URL.searchParams.get("title");
  if (
    document.location.pathname === "/wiki/Touhou_Wiki" ||
    document.location.pathname === "/wiki/Заглавная_страница" ||
    document.location.pathname === "/wiki/东方维基" ||
    document.location.pathname === "/wiki/동방위키:대문"
  ) {
    presenceData.state = "Main Page | Home";
    presenceData.startTimestamp = browsingStamp;
  } else if (title && document.location.pathname.includes("/wiki/")) {
    presenceData.details = "Reading about:";
    presenceData.state = title.innerText;
    presenceData.startTimestamp = browsingStamp;
  } else if (
    actionResult === "history" &&
    title2Result &&
    document.location.pathname.includes("/w/")
  ) {
    presenceData.details = "Viewing revision history of:";
    if (title2Result.includes("_"))
      presenceData.state = title2Result.replace(/_/g, " ");
    else presenceData.state = title2Result;

    presenceData.startTimestamp = browsingStamp;
  } else if (
    actionResult === "edit" &&
    title2Result &&
    document.location.pathname.includes("/w/")
  ) {
    presenceData.details = "Editing a page:";
    if (title2Result.includes("_"))
      presenceData.state = title2Result.replace(/_/g, " ");
    else presenceData.state = title2Result;

    presenceData.startTimestamp = browsingStamp;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
