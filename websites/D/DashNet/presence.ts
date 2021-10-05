let presence: Presence, newID: string, latestID: string;
function presenceSet(): void {
  if (document.location.pathname.includes("/cookieclicker/")) {
    presence = new Presence({ clientId: "676126246928777250" });
    newID = "676126246928777250";
  } else {
    presence = new Presence({ clientId: "676120967159742465" });
    newID = "676120967159742465";
  }

  if (newID !== latestID && latestID !== null) {
    presence.clearActivity();
    latestID = newID;
  }
}

const browsingStamp = Math.floor(Date.now() / 1000);

presenceSet();

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "dashnet"
  };

  presenceData.startTimestamp = browsingStamp;

  presenceSet();

  if (document.location.pathname.includes("/cookieclicker/")) {
    const cookies = document
      .querySelector("#cookies")
      .textContent.replace(
        document.querySelector("#cookies div").textContent,
        ""
      );
    if (cookies.includes(" cookies")) presenceData.details = cookies;
    else presenceData.details = cookies.replace("cookies", " cookies");

    presenceData.state = document
      .querySelector("#cookies div")
      .textContent.replace("per second :", "Per second:");
    presenceData.smallImageKey = "legacyy";
    presenceData.smallImageText = `Legacy level: ${
      document.querySelector("#ascendNumber").textContent
    }`;
  } else if (document.location.pathname === "/") {
    presenceData.details = "Browsing DashNet's";
    presenceData.state = "video games and other fun things";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/legacy/"))
    presenceData.details = "Playing Legacy";
  else if (document.location.pathname.includes("/igm/"))
    presenceData.details = "Making an idle game";
  else if (document.location.pathname.includes("/randomgen/"))
    presenceData.details = "Using randomgen";
  else if (document.location.pathname.includes("/nested/"))
    presenceData.details = "Playing Nested";
  else if (document.location.pathname.includes("/murdergames/"))
    presenceData.details = "Playing Murder Games";
  else if (document.location.pathname.includes("/gamegen/"))
    presenceData.details = "Using gamegen";
  else if (document.location.pathname.includes("/lsystem/"))
    presenceData.details = "Playing Tutrle Toy";
  else if (document.location.pathname.includes("/taskmaster/"))
    presenceData.details = "Using TaskMaster";
  else if (document.location.pathname.includes("/cookies2cash/"))
    presenceData.details = "Using Cookies2Cash";
  else if (document.location.pathname.includes("/musicgen/"))
    presenceData.details = "Using musicgen";
  else if (document.location.pathname.includes("/dungeongenerator/"))
    presenceData.details = "Using dungeongenerator";
  else if (document.location.pathname.includes("/dreamlog/"))
    presenceData.details = "Playing Dreamlog";
  else if (document.location.pathname.includes("/PretendEverything/"))
    presenceData.details = "Playing PretendEverything";
  else if (document.location.pathname.includes("/teaparty/"))
    presenceData.details = "Having a tea party";
  else if (document.location.pathname.includes("/mailtopia/"))
    presenceData.details = "Playing mailtopia";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
