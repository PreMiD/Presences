const presence = new Presence({
    clientId: "651454408768487441"
  }),
  pages: { [key: string]: string } = {
    "/questions": "Questions ",
    "/tags": "Tags ",
    "/users": "Users ",
    "/unanswered": "Unanswered "
  };

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    title = document.querySelector("#question-header > h1"),
    user = document.querySelector(
      "#user-card > div > div.grid--cell.fl1.wmn0 > div > div.grid--cell.fl1.w0.overflow-x-hidden.overflow-y-auto.pr16.profile-user--about.about > div > div:nth-child(1) > h2 > div"
    ),
    searchresult = document.querySelector("#bigsearch > div > input"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  if (title && title.textContent !== "") {
    presenceData.details = "Reads a Question:";
    presenceData.state = `${title.textContent}`;
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    presenceData.details = "Viewing Page:";
    presenceData.state = pages[page] || pages[page.slice(0, -1)];
  } else if (page.includes("/search")) {
    presenceData.details = "Searching:";
    presenceData.state = (searchresult as HTMLInputElement).value;
    presenceData.smallImageKey = "logo";
  } else if (page.includes("/users")) {
    presenceData.details = "Viewing User Profile:";
    presenceData.state = user.textContent.trim();
  } else {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Homepage";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
