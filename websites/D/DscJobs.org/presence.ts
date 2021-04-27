const presence = new Presence({
  clientId: "825744203350802462"
}),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceD: PresenceData = {
    largeImageKey: "icon",
    startTimestamp: browsingTimestamp
  },
    page = window.location.pathname,
    urlParams: URLSearchParams = new URLSearchParams(
      window.location.search
    );

  if (page == "/") {
    presenceD.details = "Browsing";
  } else if (page == "/moderators") {
    const mpage: string = urlParams.get("page");
    presenceD.details = "Browsing Moderators";
    presenceD.state = "Page " + mpage;
  } else if (page == "/profile") {
    const username: string = document.querySelector("body > div.profile_header > div > div > h1").textContent;
    presenceD.details = "Watching Profile";
    presenceD.state = username;
  } else if (page == "/premium") {
    presenceD.details = "Browsing Premium Page";
  } else if (page == "/legal") {
    presenceD.details = "Prowsing Legal Page";
  } else if (page == "/partners") {
    presenceD.details = "Browsing Partner Page";
  } else if (page == "/supporters") {
    presenceD.details = "Browsing Supporter Page";
  } else if (page == "/settings") {
    presenceD.details = "Editing Profile";
  } else if (page == "/create") {
    presenceD.details = "Creating Profile";
  } else if (page.includes("/cv/")) {
    const username: string = document.querySelector("body > div:nth-child(8) > div.user_box > div.container.left > div > h2").getAttribute("data-title");
    presenceD.details = "Watching CV Page";
    presenceD.state = "of " + username;
    presenceD.buttons = [
      {
        url: document.URL,
        label: "View CV Page"
      }
    ];
  }

  if (presenceD.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceD);
  }
});
  