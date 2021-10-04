const presence = new Presence({
    clientId: "630896385889271819"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: HTMLElement | Element | string, typing: HTMLElement | Element;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {};

  if (document.location.pathname.includes("/videocall/")) {
    presenceData.largeImageKey = "messenger";
    presenceData.startTimestamp = browsingStamp;
    user = document.querySelector(
      "#u_0_0 > div.r30xiam5.m0q0jmkx.alrytcbg.hp5uecnq.g2121wdl > div > div:nth-child(5) > div > div > div > div > div.prklkq8o.t7elcel3.sd0tyowg.ocjcko58.p3f4w9ai.f5zavhip.foed1vyy > div > div > div.ocjcko58.foed1vyy > div > p"
    );
    if (!user || !(user as HTMLElement).innerText) {
      //presenceData.details = "In a video call or";
      user = "user not found.";
      presenceData.details = "In videocall with someone";
      presenceData.smallImageKey = "videocall";
    } else {
      //presenceData.details = "In call with:";
      user = (user as HTMLElement).innerText;
      presenceData.details = "In call with someone";
      presenceData.smallImageKey = "call";
    }
    //presenceData.state = user;
    presenceData.state = "(Hidden until presence settings.)"; // Add setting for this when presence settings are a thing!!
  } else if (document.location.pathname.includes("/t/")) {
    presenceData.largeImageKey = "messenger";
    presenceData.startTimestamp = browsingStamp;
    user = document.querySelector("._3oh-");
    typing = document.querySelector(
      "body > div > div > div > div:nth-child(2) > span > div._20bp > div._4_j4 > div._4rv3._7og6 > div > div._7kpk > div > div > div:nth-child(1) > div > div > div > div > div > div > span > span"
    );
    if (typing === null) {
      presenceData.details = "Reading messages from:";
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.details = "Writing to:";
      presenceData.smallImageKey = "writing";
    }
    //presenceData.state = user.innerText;
    presenceData.state = "(Hidden until presence settings.)"; // Add setting for this when presence settings are a thing!!
  } else if (document.location.pathname.includes("/new")) {
    presenceData.largeImageKey = "messenger";
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Composing a new message";
    presenceData.smallImageKey = "writing";
  } else if (document.location.pathname.includes("/about")) {
    presenceData.largeImageKey = "messenger";
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the about page";
  }

  presence.setActivity(presenceData);
});
