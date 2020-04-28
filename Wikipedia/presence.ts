var presence = new Presence({
  clientId: "609364070684033044"
});

var browsingStamp = Math.floor(Date.now() / 1000);
var title: any;
var actionURL = new URL(document.location.href);
var title2URL = new URL(document.location.href);

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    details: "Unknown page",
    largeImageKey: "lg"
  };

  title = document.querySelector("h1#firstHeading");

  var actionResult = actionURL.searchParams.get("action");
  var title2Result = title2URL.searchParams.get("title");

  if (document.location.pathname == "/wiki/Main_Page") {
    presenceData.state = "Main Page | Home";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (title && document.location.pathname.includes("/wiki/")) {
    presenceData.details = "Reading about:";

    presenceData.state = title.innerText;

    presenceData.startTimestamp = browsingStamp;
  } else if (
    actionResult == "history" &&
    title2Result &&
    document.location.pathname.includes("/w/")
  ) {
    presenceData.details = "Viewing revision history of:";

    if (title2Result.includes("_")) {
      presenceData.state = title2Result.replace(/_/g, " ");
    } else {
      presenceData.state = title2Result;
    }

    presenceData.startTimestamp = browsingStamp;
  } else if (
    actionResult == "edit" &&
    title2Result &&
    document.location.pathname.includes("/w/")
  ) {
    presenceData.details = "Editing a page:";

    if (title2Result.includes("_")) {
      presenceData.state = title2Result.replace(/_/g, " ");
    } else {
      presenceData.state = title2Result;
    }

    presenceData.startTimestamp = browsingStamp;
  }

  presence.setActivity(presenceData);
});
