const presence = new Presence({
  clientId: "837305361639538728"
});

const browsingStamp = Math.floor(Date.now() / 1000);
let title;
const actionURL = new URL(document.location.href);
const title2URL = new URL(document.location.href);

presence.on("UpdateData", () => {

  const presenceData: PresenceData = {
    largeImageKey: "wiki"
  };
  presenceData.startTimestamp = browsingStamp;

  title = document.querySelector(".firstHeading");
  const actionResult = actionURL.searchParams.get("action");
  const title2Result = title2URL.searchParams.get("title");

  if (document.location.pathname == "/") {
    presenceData.details = "Viewing main page";
    presenceData.startTimestamp = browsingStamp;
  }

  if (title !== null) {
    presenceData.details = "Viewing page:";
    presenceData.state = title.textContent;
  }

  if (actionResult == "edit" && title2Result){
    presenceData.details = "Editing page:";
    if (title2Result.includes("_")) {
      presenceData.state = title2Result.replace(/_/g, " ");
    }
    else {
      presenceData.state = title2Result;
    }
    presenceData.startTimestamp = browsingStamp;
  }

  if (actionResult == "history" && title2Result){
    presenceData.details = "Viewing revision history of:";
    if (title2Result.includes("_")) {
      presenceData.state = title2Result.replace(/_/g, " ");
    }
    else {
      presenceData.state = title2Result;
    }
    presenceData.startTimestamp = browsingStamp;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  }
  else {
    presence.setActivity(presenceData);
  }
});
