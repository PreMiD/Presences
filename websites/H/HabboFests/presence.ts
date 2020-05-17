const presence = new Presence({
  clientId: "650325697742635009"
});

let user, search, title;
const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "habbofests"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname == "habbofests.com") {
    if (document.location.pathname.includes("/home")) {
      presenceData.details = "Looking at the home page";
    } else if (document.location.pathname.includes("/fests/associates")) {
      presenceData.details = "Reading the affiliates page";
    } else if (document.location.pathname.includes("/fests/contact-us")) {
      presenceData.details = "Looking at the contact page";
    } else if (document.location.pathname.includes("/fests/join")) {
      presenceData.details = "Viewing the apply page";
    } else if (document.location.pathname.includes("/fests/staffs")) {
      presenceData.details = "Viewing the staff page";
    } else if (document.location.pathname.includes("/profile/")) {
      user = document.querySelector(
        "body > content > content > div:nth-child(3) > div > div.sideBar > div.user > span"
      );
      presenceData.details = "Viewing the profile of:";
      presenceData.state = user.innerText;
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
    } else if (document.location.pathname.includes("/forum")) {
      presenceData.details = "Forums, Viewing the list of";
      presenceData.state = "posts";
    } else if (document.location.pathname.includes("/fests/timetable")) {
      user = document.querySelector("#dj");
      presenceData.details = "Current DJ:";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/news")) {
      user = document.querySelector(
        "body > content > content > div:nth-child(3) > div.centerBar > div:nth-child(1) > div.title"
      );
      presenceData.details = "Reading news:";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/admin")) {
      presenceData.details = "Looking at the staff panel";
      user = document.querySelector("#relogio");
      presenceData.state = "Current time:" + user.innerText;
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
      } else {
        presenceData.details = "Forums, Browsing";
        presenceData.state = "through their DMs";
      }
    } else if (document.location.pathname.includes("/watched/")) {
      if (document.location.pathname.includes("/threads")) {
        presenceData.details = "Forums, Viewing their";
        presenceData.state = "watched threads";
      } else {
        presenceData.details = "Forums, Viewing their";
        presenceData.state = "watched forums";
      }
    } else if (document.location.pathname.includes("/search/")) {
      search = document.querySelector(
        "#top > div.p-body > div > div.uix_titlebar > div > div > div > h1 > a > em"
      );
      if (search != null) {
        presenceData.details = "Forums, searching for:";
        presenceData.state = search.innerText;
        presenceData.smallImageKey = "search";
      } else {
        presenceData.details = "Forums, about to search";
        presenceData.state = "something up";
        presenceData.smallImageKey = "search";
      }
    } else if (document.location.pathname.includes("/account/")) {
      presenceData.details = "Forums, account settings";
    } else if (document.location.pathname.includes("/members/")) {
      if (document.URL.includes("key=staff_members")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of staff members";
      } else if (document.URL.includes("key=todays_birthdays")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with today as their birthday";
      } else if (document.location.pathname.includes("/banned")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of banned users";
      } else if (document.location.pathname.includes("/list")) {
        presenceData.details = "Viewing the list";
        presenceData.state = "of all users";
      } else if (document.URL.includes("key=most_likes")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most reactions";
      } else if (document.URL.includes("key=most_messages")) {
        presenceData.details = "Viewing list of members";
        presenceData.state = "with the most messages";
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
      } else {
        presenceData.details = "Viewing overview of members";
      }
    } else if (document.location.pathname.includes("/forums/")) {
      title = document.querySelector(
        "#top > div.p-body > div > div.uix_titlebar > div > div > div > h1"
      );
      if (title != null) {
        presenceData.details = "Forums, viewing category:";
        presenceData.state = title.innerText;
      } else {
        presenceData.details = "Forums, Browsing...";
      }
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
