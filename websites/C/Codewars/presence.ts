const presence = new Presence({
    clientId: "821106305241972746"
  }),
  timebrowsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const pathName = document.location.pathname,
    pages = pathName.split("/").filter((p) => p),
    data: PresenceData = {
      largeImageKey: "largeimage",
      startTimestamp: timebrowsed,
      details: "Browsing ..."
    },
    displayStats = await presence.getSetting("statsdisplay");

  if (pages[0] === "dashboard") {
    data.details = "Viewing Dashboard";
    if (displayStats)
      data.state = document.querySelector(".ml-10px").textContent + " Honor";
  } else if (pages[0] === "topics") {
    if (pages[1]) {
      data.details = "Viewing Topic";
      data.state = pages[1];
    } else {
      data.details = "Viewing Forum";
    }
  } else if (pages[0] === "kumite") {
    data.details = "Viewing kumite";
  } else if (pages[0] === "subscription") {
    data.details = "Viewing Codewars Red";
  } else if (pages[0] === "users" && pages[1] === "leaderboard") {
    data.details = "Viewing Leaderboard";
  } else if (pages[0] === "kata") {
    if (pages[2]) {
      data.details = "Searching Katas";
      data.state = document.querySelector(".ml-0").textContent + "";
    } else {
      data.details =
        "Solving Kata | " +
        document.querySelector(".inner-small-hex > span").textContent;
      data.state = document.querySelector(".items-center > h4").textContent;
    }
  } else if (pages[0] === "users" && pages[1] === "edit") {
    data.details = "Editing Account";
  } else if (pages[0] === "trainer" && pages[1] === "setup") {
    data.details = "Editing Trainer Setup";
    data.state =
      Array.from(document.querySelectorAll(".icon-list > li > .is-active"))
        .length + " Languages selected";
  } else if (
    pages[0] === "users" &&
    pages[1] !== "leaderboard" &&
    pages[1] !== "edit"
  ) {
    if (Array.from(document.querySelectorAll(".h-full")).length > 6) {
      data.details = "Viewing own Profile";
      if (displayStats)
        data.state =
          document.querySelector(".ml-10px").textContent +
          " Honor | " +
          document.querySelector(".small-hex").textContent;
    } else {
      data.details = "Viewing Profile from";
      const stats = Array.from(document.querySelector(".stat-box").children),
        clan = stats.find((e) => e.innerHTML.startsWith("<b>Clan:</b>"));
      if (displayStats)
        data.state =
          document.querySelector(".stat").textContent.slice("Name:".length) +
          " | " +
          clan.textContent.slice("Clan:".length);
    }
  }

  if (data.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(data);
  }
});
