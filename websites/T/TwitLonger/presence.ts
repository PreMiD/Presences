const presence = new Presence({
  clientId: "719119956486258749"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Home";
  } else if (document.location.pathname.includes("/show/")) {
    const postTitle = (
      document.querySelector("#postcontent > h3") as HTMLElement
    ).innerText;
    const userName = (
      document.querySelector(
        "#user-info > div > h4 > a:nth-child(1)"
      ) as HTMLElement
    ).innerText;
    const userHandle = (
      document.querySelector(
        "#user-info > div > h4 > a:nth-child(2)"
      ) as HTMLElement
    ).innerText;
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading an post";
    presenceData.state =
      postTitle + " by " + userName + " (" + userHandle + ")";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/about")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "About";
  } else if (document.location.pathname.includes("/privacy")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Privacy";
  } else if (document.location.pathname.includes("/ad-free")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Ad-free";
  } else if (document.location.pathname.includes("/post")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Writing an Post";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
