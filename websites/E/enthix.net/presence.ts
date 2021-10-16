const presence = new Presence({
    clientId: "662715886662057994"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname === "enthix.net") {
    presenceData.details = "Viewing Home Page";
    presenceData.state = `${
      document.querySelector(
        "body > div.container > div.playercount > p > span.sip"
      ).textContent
    } Players Online`;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
