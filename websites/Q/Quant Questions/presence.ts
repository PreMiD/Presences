// Application ID on Discord developer page
const presence = new Presence({
  clientId: "841415893937684490"
});

// time spent on current URL
const timeElapsed: number = new Date().getTime();

presence.on("UpdateData", async () => {
  // default settings
  const presenceData: PresenceData = {
    details: document.title,
    largeImageKey: "logo",
    startTimestamp: timeElapsed
  };

  // edit attributes based on path
  if (document.location.pathname == "/") {
    presenceData.details = "Homepage";
  } else if (document.location.pathname.startsWith("/questions/explore/")) {
    presenceData.details = "Viewing Problems";
  } else if (document.location.pathname.startsWith("/question/")) {
    presenceData.details = document.getElementById("id_question_name").textContent;
    const difficulty: String = document.getElementById("id_question_difficulty").textContent;
    const category: String = document.getElementById("id_question_category").textContent;
    presenceData.state = `${difficulty} - ${category}`;
  } else if (document.location.pathname.startsWith("/tutorial")) {
    presenceData.details = "Reading Tutorial";
  } else if (document.location.pathname.startsWith("/cheatsheets/")) {
    presenceData.details = "Cramming Cheatsheets";
  } else if (document.location.pathname.startsWith("/firm-rankings/")) {
    presenceData.details = "Browsing Firm Rankings";
  } else if (document.location.pathname.startsWith("/division-rankings/")) {
    presenceData.details = "Browsing Division Rankings";
  } else if (document.location.pathname.startsWith("/headhunter-rankings/")) {
    presenceData.details = "Browsing Headhunters";
  } else if (document.location.pathname.startsWith("/job-listings/")) {
    presenceData.details = "Looking at Jobs";
  }

  presence.setActivity(presenceData);
});
