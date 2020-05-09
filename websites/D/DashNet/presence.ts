//@ts-ignore
const presence = new Presence({});

const browsingStamp = Math.floor(Date.now() / 1000);
var latestID;
presence.clearActivity();

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "dashnet"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname.includes("/cookieclicker/")) {
    presence.clientId = "676126246928777250";
  } else {
    presence.clientId = "676120967159742465";
  }

  if (presence.clientId != latestID) {
    presence.clearActivity();
    latestID = presence.clientId;
  }

  if (document.location.pathname.includes("/cookieclicker/")) {
    var cookies = document
      .querySelector("#cookies")
      .textContent.replace(
        document.querySelector("#cookies div").textContent,
        ""
      );
    if (cookies.includes(" cookies")) {
      presenceData.details = cookies;
    } else {
      presenceData.details = cookies.replace("cookies", " cookies");
    }
    presenceData.state = document
      .querySelector("#cookies div")
      .textContent.replace("per second :", "Per second:");
    presenceData.smallImageKey = "legacyy";
    presenceData.smallImageText =
      "Legacy level: " + document.querySelector("#ascendNumber").textContent;
  } else if (document.location.pathname == "/") {
    presenceData.details = "Browsing DashNet's";
    presenceData.state = "video games and other fun things";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/legacy/")) {
    presenceData.details = "Playing Legacy";
  } else if (document.location.pathname.includes("/igm/")) {
    presenceData.details = "Making an idle game";
  } else if (document.location.pathname.includes("/randomgen/")) {
    presenceData.details = "Using randomgen";
  } else if (document.location.pathname.includes("/nested/")) {
    presenceData.details = "Playing Nested";
  } else if (document.location.pathname.includes("/murdergames/")) {
    presenceData.details = "Playing Murder Games";
  } else if (document.location.pathname.includes("/gamegen/")) {
    presenceData.details = "Using gamegen";
  } else if (document.location.pathname.includes("/lsystem/")) {
    presenceData.details = "Playing Tutrle Toy";
  } else if (document.location.pathname.includes("/taskmaster/")) {
    presenceData.details = "Using TaskMaster";
  } else if (document.location.pathname.includes("/cookies2cash/")) {
    presenceData.details = "Using Cookies2Cash";
  } else if (document.location.pathname.includes("/musicgen/")) {
    presenceData.details = "Using musicgen";
  } else if (document.location.pathname.includes("/dungeongenerator/")) {
    presenceData.details = "Using dungeongenerator";
  } else if (document.location.pathname.includes("/dreamlog/")) {
    presenceData.details = "Playing Dreamlog";
  } else if (document.location.pathname.includes("/PretendEverything/")) {
    presenceData.details = "Playing PretendEverything";
  } else if (document.location.pathname.includes("/teaparty/")) {
    presenceData.details = "Having a tea party";
  } else if (document.location.pathname.includes("/mailtopia/")) {
    presenceData.details = "Playing mailtopia";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
