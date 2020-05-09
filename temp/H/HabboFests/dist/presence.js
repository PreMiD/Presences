var presence = new Presence({
  clientId: "650325697742635009"
});
var item, user, search, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  let presenceData = {
    largeImageKey: "habbofests"
  };
  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname == "habbofests.com") {
    if (document.location.pathname.includes("/home")) {
      presenceData.details = "Looking at the home page";
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/fests/associates")) {
      presenceData.details = "Reading the affiliates page";
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/fests/contact-us")) {
      presenceData.details = "Looking at the contact page";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/fests/join")) {
      presenceData.details = "Viewing the apply page";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/fests/staffs")) {
      presenceData.details = "Viewing the staff page";
      delete presenceData.state;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/profile/")) {
      user = document.querySelector(
        "body > content > content > div:nth-child(3) > div > div.sideBar > div.user > span"
      );
      presenceData.details = "Viewing the profile of:";
      presenceData.state = user.innerText;
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
    } else if (document.location.pathname.includes("/forum")) {
      presenceData.details = "Forums, Viewing the list of";
      presenceData.state = "posts";
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/fests/timetable")) {
      user = document.querySelector("#dj");
      presenceData.details = "Current DJ:";
      presenceData.state = user.innerText;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/news")) {
      user = document.querySelector(
        "body > content > content > div:nth-child(3) > div.centerBar > div:nth-child(1) > div.title"
      );
      presenceData.details = "Reading news:";
      presenceData.state = user.innerText;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/admin")) {
      presenceData.details = "Looking at the staff panel";
      user = document.querySelector("#relogio");
      presenceData.state = "Current time:" + user.innerText;
      delete presenceData.smallImageKey;
      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/conversations/")) {
      if (document.location.pathname.split("/")[4] != null) {
        title = document.querySelector(
          "#top > div.p-body > div > div.uix_titlebar > div > div > div.p-title > h1"
        );
        presenceData.details = "Forums, Reading DM:";
        if (title.innerText.length > 128) {
          presenceData.state = title.innerText.substring(0, 125) + "...";
        } else {
          presenceData.state = title.innerText;
        }
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Browsing";
        presenceData.state = "through their DMs";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/watched/")) {
      if (document.location.pathname.includes("/threads")) {
        presenceData.details = "Forums, Viewing their";
        presenceData.state = "watched threads";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, Viewing their";
        presenceData.state = "watched forums";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/search/")) {
      search = document.querySelector(
        "#top > div.p-body > div > div.uix_titlebar > div > div > div > h1 > a > em"
      );
      if (search != null) {
        presenceData.details = "Forums, searching for:";
        presenceData.state = search.innerText;
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Forums, about to search";
        presenceData.state = "something up";
        presenceData.smallImageKey = "search";
        presence.setActivity(presenceData);
      }
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
  } else if (document.location.hostname == "buy.primemc.org") {
    title = document.querySelector("head > title");
    presenceData.details = "Store, viewing:";
    presenceData.state = title.innerText.replace(" | Prime Network", "");
    delete presenceData.smallImageKey;
    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
