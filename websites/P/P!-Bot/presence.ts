const presence = new Presence({
  clientId: "825299120364322826"
}),
  getSettings = async (): Promise<{
    showButtons: boolean;
  }> => ({
    showButtons: await presence.getSetting("showButtons"),
  });

presence.on("UpdateData", async () => {
  const config = await getSettings();
  const PresenceData: PresenceData = { largeImageKey: 'pbot' };

  const PremidDetails = document.querySelector("[name~=premid-details][content]")
    ? (
      document.querySelector(
        "[name~=premid-details][content]"
      ) as HTMLMetaElement
    ).content
    : null;
  const PremidState = document.querySelector("[name~=premid-state][content]")
    ? (
      document.querySelector(
        "[name~=premid-state][content]"
      ) as HTMLMetaElement
    ).content
    : null;

  if (PremidDetails && PremidState) {
    PresenceData.details = PremidDetails
    PresenceData.state = PremidState

    PresenceData.buttons = [
      {
        label: 'Siteyi Ziyaret Et',
        url: 'https://pbot.app'
      },
      {
        label: 'Bot Paneli',
        url: 'https://panel.pbot.app'
      }
    ]
  }

  if (!config.showButtons) {
    delete PresenceData?.buttons
  }

  if (!PresenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(PresenceData);
  }
});
