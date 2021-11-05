const presence = new Presence({
    clientId: "387040638249467904",
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let user: HTMLElement,
  title: HTMLElement,
  replace: HTMLElement,
  search: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "emojigg",
    startTimestamp: browsingStamp,
  };

  if (document.location.pathname === "/") {
    presenceData.details = "Viewing home page";
    presenceData.state = "Latest Emojis";
  } else if (document.location.pathname.includes("/emoji/")) {
    title = document.querySelector(".hero-bar > .container > h1");
    user = document.querySelector("h6");
    presenceData.details = "Viewing " + title.innerText.split(" ")[0];
    presenceData.state = "by " + user.innerText;
    presenceData.buttons = [
      {
        label: "View Emoji",
        url: document.URL,
      },
    ];
  } else if (
    document.location.pathname.includes("/category/") ||
    document.location.pathname.includes("/emojis/")
  ) {
    title = document.querySelector("h1");

    presenceData.details = "Browsing";
    presenceData.state = title.innerText + "s";
    presenceData.buttons = [
      {
        label: "View Emojis",
        url: document.URL,
      },
    ];
  } else if (document.location.pathname.includes("/user/")) {
    title = document.querySelector("h1");

    presenceData.details = "Viewing Profile";
    presenceData.state = title.innerText;
    presenceData.buttons = [
      {
        label: "View Profile",
        url: document.URL,
      },
    ];
  } else if (document.location.pathname.includes("/pack/")) {
    title = document.querySelector("h1");
    user = document.querySelector(".user-stats > a");

    presenceData.details = "Viewing " + title.innerText;
    presenceData.state = "by " + user.innerText;
    presenceData.buttons = [
      {
        label: "View Pack",
        url: document.URL,
      },
    ];
  } else if (document.location.pathname.includes("/maker")) {
    presenceData.details = "Making Emojis";
    presenceData.state = "Using the emoji Maker";
  } else if (document.location.pathname.includes("/creators")) {
    presenceData.details = "Viewing the leaderboards";
    presenceData.state = "Top 50 emoji creators";
  } else if (document.location.pathname.includes("/submit")) {
    presenceData.details = "Submitting an emoji";
    presenceData.state = "its probably really cool";
  } else {
    presenceData.details = "Browsing emojis";
    presenceData.state = "on emoji.gg";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
