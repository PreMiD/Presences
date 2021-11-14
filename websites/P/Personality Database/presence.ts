const presence = new Presence({
    clientId: "909403157686288414"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let titleEl: HTMLElement, personalityTypeEl: HTMLElement, trayTitle: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "personality-database"
    },
    useOnlyFirstPersonalityType = await presence.getSetting(
      "onlyFirstPersonalityType"
    );

  if (document.location.pathname.includes("/profile/")) {
    titleEl = document.querySelector(
      "div.profile-description > div.profile-description-info > div.profile-description-basic > div.profile-name"
    );
    personalityTypeEl = document.querySelector(
      "div.profile-description > div.profile-description-info > div.profile-description-basic > div.profile-personality"
    );

    const firstType: string = personalityTypeEl.innerText?.split(" - ")[0];

    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = "Viewing:";

    trayTitle = `${presenceData.details} ${titleEl.innerText}`;

    if (firstType) {
      /**
       * if user choose to show only first personality type
       * example shown:
       * Viewing:
       * John Lennon - ENFP
       */
      if (useOnlyFirstPersonalityType)
        presenceData.state = `${titleEl.innerText} - ${firstType}`;
      /**
       * if user choose to show all first personality type
       * example shown:
       * Viewing: John Lennon
       * ENFP - 4w3 - sx/so - 485 - ILE - SLUEI - VELF - Melancholic-Choleric
       */ else {
        presenceData.details = `Viewing: ${titleEl.innerText}`;
        presenceData.state = `${personalityTypeEl.innerText}`;
      }
      /**
       * if user choose to not show any personality type
       * example shown:
       * John Lennon
       */
    } else presenceData.state = titleEl.innerText;

    /**
     * add button for visiting user profile
     */
    presenceData.buttons = [
      {
        label: "Visit profile",
        url: document.location.href
      }
    ];
  }

  if (!presenceData.details) presence.setActivity();
  else {
    presence.setActivity(presenceData);
    presence.setTrayTitle(trayTitle);
  }
});
