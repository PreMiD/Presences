const presence = new Presence({
    clientId: "919817726195814431"
  }),
  startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "stackexchange",
      startTimestamp
    },
    { pathname, hostname } = window.location;

    console.log(pathname);

    if (hostname == "stackexchange.com") {
      presenceData.details = "Stack Exchange";
    } else {
      const subStack = document.querySelector("meta[property='og:site_name']");
      presenceData.details = subStack.getAttribute("content");
    }

    if (pathname.includes("/questions")) {
      const titleElem = document.querySelector(".question-hyperlink");
      presenceData.state = titleElem.textContent;
    }
    

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});