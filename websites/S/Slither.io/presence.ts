const presence = new Presence({
  clientId: "630783537221468182"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "slitherlogo"
  };

  if (document.querySelector('[style="opacity: .8; font-weight: bold;"]')) {
    const length = document.querySelector(
        '[style="opacity: .8; font-weight: bold;"]'
      ).innerHTML,
      rank = document.querySelector('[style="opacity: .35;"]').innerHTML;
    presenceData.details = `Length: ${length}`;
    presenceData.state = `Rank: ${rank}`;
  }

  presence.setActivity(presenceData);
});
