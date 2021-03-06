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
    search_term: string;
  };
}

let qzData: QuizletData = null;
let actionTimestamp: number = null;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "quizlet"
    },
    buttons = await presence.getSetting("buttons");

  if (qzData && qzData.layer) {
    const pathSplits = qzData.layer.path.split("/");
    switch (pathSplits[0]) {
      case "StudyFeed":
        data.details = "Dashboard";
        actionTimestamp = null;
        break;
      case "Settings":
        data.details = "Settings";
        actionTimestamp = null;
        break;
      case "Profile":
        data.details = "Viewing profile";
        data.state = document.querySelector(
          ".ProfileHeader-username"
        ).textContent;
        if (buttons)
          data.buttons = [
            {
              label: "View Profile",
              url: document.URL
            }
          ];
        actionTimestamp = null;
        break;
      case "Topic":
        data.details = "Browsing sets on";
        data.state = document.querySelector("h1").textContent;
        actionTimestamp = null;
        break;
      case "Search":
        data.smallImageKey = "search";
        data.smallImageText = "Searching";
        data.details = "Searching";
        data.state = qzData.searchLayer.search_term;
        actionTimestamp = null;
        break;
      case "Sets":
        switch (pathSplits[1]) {
          case "show":
            if (!actionTimestamp) actionTimestamp = Date.now();
            data.details = "Viewing a set";
            data.state = qzData.layer.studyableTitle;
            if (buttons)
              data.buttons = [
                {
                  label: "View Set",
                  url: document.URL
                }
              ];
            break;
          case "new":
            data.details = "Creating a set";
            actionTimestamp = null;
            break;
        }
        break;
      case "Gravity": // Set > Gravity
        if (!actionTimestamp) actionTimestamp = Date.now();
        data.smallImageKey = "gravity";
        data.smallImageText = "Gravity";
        data.details = "Playing Gravity";
        data.state = `with "${qzData.layer.studyableTitle}" set`;
        break;
      case "Match": // Set > Match
        if (!actionTimestamp) actionTimestamp = Date.now();
        data.smallImageKey = "match";
        data.smallImageText = "Match";
        data.details = "Playing Match";
        data.state = `with "${qzData.layer.studyableTitle}" set`;
        break;
      case "LiveGame": // Set > Live
        if (!actionTimestamp) actionTimestamp = Date.now();
        data.smallImageKey = "live";
        data.smallImageText = "Quizlet Live";
        data.details = "Hosting a live game";
        data.state = `with "${qzData.layer.studyableTitle}" set`;
        break;
      case "Assistant": // Set > Learn
        if (!actionTimestamp) actionTimestamp = Date.now();
        data.smallImageKey = "learn";
        data.smallImageText = "Learn";
        data.details = "Learning set";
        data.state = qzData.layer.studyableTitle;
        break;
      case "Cards": // Set > Flashcards
        if (!actionTimestamp) actionTimestamp = Date.now();
        data.smallImageKey = "flashcards";
        data.smallImageText = "Flashcards";
        data.details = "Reviewing flashcards";
        data.state = `on ${qzData.layer.studyableTitle}`;
        break;
      case "Test": // Set > Test
        if (!actionTimestamp) actionTimestamp = Date.now();
        data.smallImageKey = "test";
        data.smallImageText = "Test";
        data.details = "Testing";
        data.state = `on ${qzData.layer.studyableTitle}`;
        break;
      case "Learn": // Set > Write
        if (!actionTimestamp) actionTimestamp = Date.now();
        data.smallImageKey = "write";
        data.smallImageText = "Writing";
        data.details = "Writing";
        data.state = `on ${qzData.layer.studyableTitle}`;
        break;
      case "Spell": // Set > Spell
        if (!actionTimestamp) actionTimestamp = Date.now();
        data.smallImageKey = "spell";
        data.smallImageText = "Spell";
        data.details = "Spelling";
        data.state = `on ${qzData.layer.studyableTitle}`;
        break;
    }
    data.startTimestamp = actionTimestamp;
  }

  // If data doesn't exist clear else set activity to the presence data
  if (data.details == null) {
    presence.setTrayTitle(); // Clear tray
    presence.setActivity(); // Clear activity
  } else presence.setActivity(data);
});

presence.on("iFrameData", (data: QuizletData) => (qzData = data));
