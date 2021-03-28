const presence = new Presence({
  clientId: "825744203350802462"
}),
  browsing = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    startTimestamp: browsing,
    largeImageKey: "icon"
  },
    page = document.location.pathname;

  if (page === "/") {
    presenceData.details = "Browsing:";
    presenceData.state = "Main Page";
  } else if (page === "/profile") {
    const username: string = document.querySelector("body > div.profile_header > div > div > h1").textContent;
    presenceData.details = "Watching Profile:";
    presenceData.state = `${username}`;
  } else if (page === "/search") {
    const urlParams: URLSearchParams = new URLSearchParams(
      window.location.search
    ),
    myParam: string = urlParams.get("term");
    presenceData.details = "Searching:";
    presenceData.state = myParam;
  } else if (page === "/settings") {
    presenceData.details = "Editing his Profile";
  } else if (page === "/faq") {
    presenceData.details = "Browsing:";
    presenceData.state = "FaQ Page";
  } else if (page === "/moderators") {
    const urlParams: URLSearchParams = new URLSearchParams(
      window.location.search
    ),
    myParam: string = urlParams.get("page");

    presenceData.details = "Watching Moderators";
    presenceData.state = "Page: " + myParam;
  } else if (page.includes("/cv/")) {
    if (page.includes("/rate")) {
      presenceData.details = "Rating for:";
      presenceData.state = document.querySelector("#box1 > div.vote_box > h1").textContent;
      presenceData.buttons = [
        {
          url: document.URL,
          label: "Rate Profile"
        }
      ];
    } else {
      const username: string = document.querySelector("body > div:nth-child(5) > div.user_box > div.container.left > div > h2").getAttribute("data-title");
      presenceData.details = "Watching Profile:";
      presenceData.state = username + document.getElementsByClassName("note small")[0].textContent;
      presenceData.buttons = [
        {
          url: document.URL,
          label: "View Profile"
        }
      ];
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});