const presence = new Presence({
    clientId: "833644176967991346"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const time = await presence.getSetting("time"),
    privacy = await presence.getSetting("privacy"),
    buttons = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };
  if (document.querySelector("[class*='is-visible']")) {
    presenceData.details = "Searching";
    presenceData.state = (
      document
        .querySelector("[class^='search-box']")
        .children.item(1) as HTMLInputElement
    ).value;
  } else if (document.location.pathname.includes("/rankings")) {
    presenceData.details = "Browsing Rankings";
    if (
      document.querySelector<HTMLInputElement>(
        "[class^='ss-input'] > div > input"
      ).value !== ""
    ) {
presenceData.state = `Search: ${
        document.querySelector<HTMLInputElement>(
          "[class^='ss-input'] > div > input"
        ).value
      }`;
} else if (document.querySelector("[class^='chip']")) {
      let filters = "";
      document.querySelectorAll("[class^='chip']").forEach(function (element) {
        filters += `${element.textContent.slice(0, -2)},`;
      });
      presenceData.state = `${filters.slice(0, -1)}`;
    }
  } else if (document.location.pathname.includes("/leaderboard")) {
    if (document.location.pathname.includes("/leaderboards")) {
      presenceData.details = "Browsing Leaderboards";
      if (
        (
          document.querySelector(
            "[class^='ss-input'] > div > input"
          ) as HTMLInputElement
        ).value !== ""
      ) {
presenceData.state = `Search: ${
          (
            document.querySelector(
              "[class^='ss-input'] > div > input"
            ) as HTMLInputElement
          ).value
        }`;
}
    } else if (document.location.pathname.includes("/leaderboard/")) {
      presenceData.details = "Viewing Leaderboard";
      presenceData.state = document.querySelector(
        "div.title.is-5.mb-0 > a"
      ).textContent;
      presenceData.smallImageKey = document
        .querySelector("[class*='selected'] > span")
        .textContent.toLowerCase()
        .replace("+", "_");
      presenceData.smallImageText = `${
        document.querySelector("[class*='selected'] > span").textContent
      } (${document.querySelector("[class^='tag mb-2']").textContent})`;
      presenceData.buttons = [
        {
          label: "View Page",
          url: document.location.href
        }
      ];
    } else presenceData.details = "Viewing Leaderboard";
  } else if (document.location.pathname.includes("/ranking/requests")) {
    presenceData.details = "Browsing Rank Requests";
    presenceData.state = `${
      document.querySelector("[class^='title level-color']").textContent
    } ${document.querySelector("p.heading").textContent}`;
  } else if (document.location.pathname.includes("/ranking/request")) {
    presenceData.details = "Viewing Rank Request";
    presenceData.state = document.querySelector(
      "div.title.is-5.mb-0 > a"
    ).textContent;
    presenceData.smallImageKey = document
      .querySelector("[class*='selected'] > span")
      .textContent.toLowerCase()
      .replace("+", "_");
    presenceData.smallImageText = document.querySelector(
      "[class*='selected'] > span"
    ).textContent;
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/u/")) {
    presenceData.details = "Viewing User";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
    if (
      document.querySelector(
        "[class^='title is-5 player has-text-centered-mobile'] > a > span"
      )
    ) {
presenceData.state = `${
        (document.querySelector("[class^='country']") as HTMLImageElement).alt
      } ${
        document.querySelector(
          "[class^='title is-5 player has-text-centered-mobile'] > a > span"
        ).textContent
      } (${document.querySelector("[class^='title-header pp']").textContent})`;
} else {
presenceData.state = `${
        (document.querySelector("[class^='country']") as HTMLImageElement).alt
      } ${
        document.querySelector(
          "[class^='title is-5 player has-text-centered-mobile'] > span"
        ).textContent
      } (${document.querySelector("[class^='title-header pp']").textContent})`;
}
  } else if (document.location.pathname.includes("/legal/privacy")) {
    presenceData.details = "Reading Privacy Policy?";
    presenceData.state = "People read this?!";
  } else if (document.location.pathname.includes("/team"))
    presenceData.details = "Viewing ScoreSaber Team";
  else if (document.location.pathname === "/")
    presenceData.details = "Viewing Homepage";

  if (!time) delete presenceData.startTimestamp;

  if (!buttons) delete presenceData.buttons;

  if (privacy) delete presenceData.state, delete presenceData.buttons;

  presence.setActivity(presenceData);
});
