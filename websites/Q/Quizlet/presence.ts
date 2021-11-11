const presence = new Presence({
  clientId: "719784356725653504"
});

interface QuizletData {
  layer?: {
    path?: string;
    event: string;

    studyableTitle?: string;
    studyableType?: string;
  };
  searchLayer?: {
    // eslint-disable-next-line camelcase
    search_term: string;
  };
}

let qzData: QuizletData = null,
  actionTimestamp: number = null;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "quizlet"
    },
    buttons = await presence.getSetting("buttons");

  if (qzData && qzData.layer) {
    const pathSplits = qzData.layer.path.split("/");
    switch (pathSplits[0]) {
      case "StudyFeed":
        presenceData.details = "Dashboard";
        actionTimestamp = null;
        break;
      case "Settings":
        presenceData.details = "Settings";
        actionTimestamp = null;
        break;
      case "Profile":
        presenceData.details = "Viewing profile";
        data.state = document.querySelector(
          ".ProfileHeader-username"
        ).textContent;
        if (buttons) {
          data.buttons = [
            {
              label: "View Profile",
              url: document.URL
            }
          ];
        }
        actionTimestamp = null;
        break;
      case "Topic":
        presenceData.details = "Browsing sets on";
        data.state = document.querySelector("h1").textContent;
        actionTimestamp = null;
        break;
      case "Search":
        data.smallImageKey = "search";
        data.smallImageText = "Searching";
        presenceData.details = "Searching";
        data.state = qzData.searchLayer.search_term;
        actionTimestamp = null;
        break;
      case "Sets":
        switch (pathSplits[1]) {
          case "show":
            actionTimestamp ??= Date.now();
            presenceData.details = "Viewing a set";
            data.state = qzData.layer.studyableTitle;
            if (buttons) {
              data.buttons = [
                {
                  label: "View Set",
                  url: document.URL
                }
              ];
            }
            break;
          case "new":
            presenceData.details = "Creating a set";
            actionTimestamp = null;
            break;
        }
        break;
      case "Gravity": // Set > Gravity
        actionTimestamp ??= Date.now();
        data.smallImageKey = "gravity";
        data.smallImageText = "Gravity";
        presenceData.details = "Playing Gravity";
        data.state = `with "${qzData.layer.studyableTitle}" set`;
        break;
      case "Match": // Set > Match
        actionTimestamp ??= Date.now();
        data.smallImageKey = "match";
        data.smallImageText = "Match";
        presenceData.details = "Playing Match";
        data.state = `with "${qzData.layer.studyableTitle}" set`;
        break;
      case "LiveGame": // Set > Live
        actionTimestamp ??= Date.now();
        data.smallImageKey = "live";
        data.smallImageText = "Quizlet Live";
        presenceData.details = "Hosting a live game";
        data.state = `with "${qzData.layer.studyableTitle}" set`;
        break;
      case "Assistant": // Set > Learn
        actionTimestamp ??= Date.now();
        data.smallImageKey = "learn";
        data.smallImageText = "Learn";
        presenceData.details = "Learning set";
        data.state = qzData.layer.studyableTitle;
        break;
      case "Cards": // Set > Flashcards
        actionTimestamp ??= Date.now();
        data.smallImageKey = "flashcards";
        data.smallImageText = "Flashcards";
        presenceData.details = "Reviewing flashcards";
        data.state = `on ${qzData.layer.studyableTitle}`;
        break;
      case "Test": // Set > Test
        actionTimestamp ??= Date.now();
        data.smallImageKey = "test";
        data.smallImageText = "Test";
        presenceData.details = "Testing";
        data.state = `on ${qzData.layer.studyableTitle}`;
        break;
      case "Learn": // Set > Write
        actionTimestamp ??= Date.now();
        data.smallImageKey = "write";
        data.smallImageText = "Writing";
        presenceData.details = "Writing";
        data.state = `on ${qzData.layer.studyableTitle}`;
        break;
      case "Spell": // Set > Spell
        actionTimestamp ??= Date.now();
        data.smallImageKey = "spell";
        data.smallImageText = "Spell";
        presenceData.details = "Spelling";
        data.state = `on ${qzData.layer.studyableTitle}`;
        break;
    }
    data.startTimestamp = actionTimestamp;
  }

  // If data doesn't exist clear else set activity to the presence data
  if (!presenceData.details) {
    // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});

presence.on("iFrameData", (data: QuizletData) => (qzData = data));
