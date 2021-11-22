const presence = new Presence({
    clientId: "909403157686288414"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

/**
 * Note: a few icon used for smallImageKey in this presence are from
 * fontAwesome: https://fontawesome.com/v5.15/icons
 */

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "personality-database",
      startTimestamp: browsingStamp
    },
    useOnlyFirstPersonalityType: boolean = await presence.getSetting(
      "useOnlyFirstPersonalityType"
    ),
    showUserNameInUserProfile: boolean = await presence.getSetting(
      "showUserNameInUserProfile"
    );

  if (document.location.pathname.includes("/profile/")) {
    const profileName: string = (<HTMLElement>(
        document.querySelector(
          "div.profile-description > div.profile-description-info > div.profile-description-basic > div.profile-name"
        )
      ))?.innerText,
      profilePersonality: string = (<HTMLElement>(
        document.querySelector(
          "div.profile-description > div.profile-description-info > div.profile-description-basic > div.profile-personality"
        )
      ))?.innerText;

    presenceData.smallImageKey = "poll";
    presenceData.details = "Viewing:";

    const firstType: string = profilePersonality?.split(" - ")[0];

    if (firstType) {
      /**
       * if user choose to show only first personality type, example:
       * Viewing:
       * John Lennon - ENFP
       */
      if (useOnlyFirstPersonalityType)
        presenceData.state = `${profileName} - ${firstType}`;
      /**
       * if user choose to show all personality type, example:
       * Viewing: John Lennon
       * ENFP - 4w3 - sx/so - 485 - ILE - SLUEI - VELF - Melancholic-Choleric
       */ else {
        presenceData.details = `Viewing: ${profileName}`;
        presenceData.state = `${profilePersonality}`;
      }
      /**
       * if user choose to not show any personality type, example:
       * John Lennon
       */
    } else presenceData.state = profileName;

    /**
     * add button for visiting user profile
     */
    presenceData.buttons = [
      {
        label: "Visit profile",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname === "/search") {
    const urlParams = new URLSearchParams(window.location.search),
      search: string = urlParams.get("keyword") || urlParams.get("q");

    presenceData.smallImageKey = "search";
    presenceData.details = "Searching:";
    presenceData.state = search;
  } else if (document.location.pathname === "/vote") {
    /**
     * condition when viewing homepage
     */
    presenceData.smallImageKey = "home";
    presenceData.details = "Viewing homepage";
  } else if (document.location.pathname.includes("/profile")) {
    /**
     * condition when viewing category
     */
    presenceData.smallImageKey = "list";
    presenceData.details = "Viewing category:";
    presenceData.state = document.title?.split(" | ")[0];
  } else if (document.location.pathname.includes("/community")) {
    /**
     * condition when viewing community feed
     */
    presenceData.smallImageKey = "group";
    presenceData.details = "Viewing community feed";
  } else if (document.location.pathname.includes("/topic")) {
    /**
     * condition when viewing specific topic
     */
    presenceData.smallImageKey = "star";
    presenceData.details = "Viewing topic:";
    presenceData.state = document.title?.split(" | ")[0];
  } else if (document.location.pathname.includes("/notification")) {
    /**
     * condition when viewing notification
     */
    presenceData.smallImageKey = "notification";
    presenceData.details = "Viewing notification";
  } else if (document.location.pathname.includes("/user/")) {
    /**
     * condition when viewing other or own user's profile page
     *
     * FYI: only show userName when user sets showUserNameInUserProfile to true
     * Because, not all people like being exposed of viewing/stalking other's profile
     */
    if (showUserNameInUserProfile) {
      const userName: string = document.title?.split(" | ")[0];
      presenceData.details = "Viewing user's profile:";
      presenceData.state = userName;

      /**
       * add button for visiting user profile
       */
      presenceData.buttons = [
        {
          label: `Visit ${userName}'s profile`,
          url: document.location.href
        }
      ];
    } else presenceData.details = "Viewing user's profile";
    presenceData.smallImageKey = "user";
  } else {
    /**
     * show when viewing static or unrecognized pages
     * ex: FAQ, Help, Community Guidelines
     */
    presenceData.details = "Viewing page:";
    presenceData.state = document.title?.split(" | ")[0];
  }

  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});
