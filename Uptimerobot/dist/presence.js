var presence = new Presence({
  clientId: "650373069172375577",
});
var item, user, search, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  let presenceData = {
    largeImageKey: "uptimerobot",
  };
  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname == "uptimerobot.com") {
    if (document.location.pathname.includes("/login")) {
      presenceData.details = "Logging in";
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/signUp")) {
      presenceData.details = "Signing up";
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/dashboard")) {
      presenceData.details = "Viewing:";
      user = document.querySelector(
        "#main-content > div.row-fluid.page-head > h2 > span"
      );
      presenceData.state = user.innerText;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/support")) {
      presenceData.details = "Viewing the support page";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/faq")) {
      presenceData.details = "Viewing the FAQ page";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (
      document.querySelector(
        "body > content > content > div:nth-child(3) > div:nth-child(3) > div.content > div.titleTopic"
      ) !== null
    ) {
      user = document.querySelector(
        "body > content > content > div:nth-child(3) > div:nth-child(3) > div.content > div.titleTopic"
      );
      presenceData.details = "Viewing thread:";
      presenceData.state = user.textContent;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/about")) {
      presenceData.details = "Viewing the about page";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/privacyPolicy")) {
      presenceData.details = "Viewing privacy";
      presenceData.state = "and policy page";
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/locations")) {
      presenceData.details = "Viewing locations page";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/pricing")) {
      presenceData.details = "Looking at the pricing page";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/api")) {
      presenceData.details = "Looking at the api page";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/termsOfService")) {
      presenceData.details = "Viewing the TOS";
      delete presenceData.state;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/account/")) {
      presenceData.details = "Forums, account settings";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/members/")) {
      if (document.URL.includes("key=staff_members")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of staff members";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      } else if (document.URL.includes("key=todays_birthdays")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with today as their birthday";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/banned")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of banned users";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/list")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of all users";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      } else if (document.URL.includes("key=most_likes")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most reactions";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      } else if (document.URL.includes("key=most_messages")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most messages";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      } else if (
        document.querySelector(
          "#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span > span"
        ) !== null
      ) {
        user = document.querySelector(
          "#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span > span"
        );
        presenceData.details = "Viewing user:";
        presenceData.state = user.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      } else if (
        document.querySelector(
          "#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span"
        ) !== null
      ) {
        user = document.querySelector(
          "#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span"
        );
        presenceData.details = "Viewing user:";
        presenceData.state = user.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Viewing overview of members";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/forums/")) {
      title = document.querySelector(
        "#top > div.p-body > div > div.uix_titlebar > div > div > div > h1"
      );
      if (title != null) {
        presenceData.details = "Forums, viewing category:";
        presenceData.state = title.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Browsing...";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      }
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  }
});
