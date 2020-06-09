var presence = new Presence({
  clientId: "563434444321587202"
});

var browsingStamp = Math.floor(Date.now() / 1000);
var title: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "maki"
  };

  if (document.location.hostname == "maki.gg") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/dashboard/")) {
      title = document.querySelector(
        "div.app-content.content > div.content-wrapper > div.content-body > section.users-edit > div.card > div.card-content > div.card-body > div.tab-content > #general > div.media.mb-2 > div.media-body.mt-50 > h4.media-heading"
      );
      presenceData.details = "Dashboard:";
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.details = "Premium";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname == "/") {
      presenceData.details = "Homepage";
    } else if (document.location.pathname == "/commands") {
      presenceData.details = "Commands";
    } else if (document.location.pathname == "/status") {
      presenceData.details = "Status";
    } else if (document.location.pathname == "/profile") {
      title = document.querySelector(
        "div.app-content.content > div.content-wrapper > div.content-body > section.page-users-view > div.row > div.col-12 > div.card > div.card-body > div.row > div.col-12.col-sm-9.col-md-6.col-lg-5 > table > tbody > tr > tb.font-weight-bold"
      );
      presenceData.details = "Profile";
      presenceData.state = title.innerText;
    } else if (document.location.pathname == "/verify") {
      presenceData.details = "Verification";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
