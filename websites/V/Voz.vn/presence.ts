const presence = new Presence({
  clientId: "773624839268597820"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Đang lướt diễn đàn";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/a/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Đang đọc tin tức";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/t/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Đang đọc bài viết";
    presenceData.state = document.querySelector("div.p-title > h1").textContent;
  } else if (document.location.pathname.includes("/f/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = document.querySelector("#top > div.p-body > div.p-body-inner > ul:nth-child(1) > li:nth-child(2) > a > span").textContent;
    presenceData.state = document.querySelector("#top > div.p-body > div.p-body-inner > div.p-body-header > div > h1").textContent;
  } else if (document.location.pathname.includes("/whats-new/posts/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "New posts";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/whats-new/profile-posts")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "New profile posts";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/whats-new/news-feed")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Your news feed";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/whats-new/latest-activity")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Latest activity";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/whats-new/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "What's new?";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("text_here")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "text_here";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (location.href.includes("highest_reaction_score")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Highest reaction score";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (location.href.includes("most_messages")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Most messages";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (location.href.includes("most_points")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Most points";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (location.href.includes("staff_members")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Staff members";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (location.href.includes("todays_birthdays")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Today's birthdays";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/u/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing a member";
    presenceData.state = document.querySelector("span.username").textContent;
  } else if (document.location.pathname.includes("/online/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Current visitors";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/search/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/tags/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching tags";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/account/account-details")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Account details";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/account/alerts")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Alerts";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/account/bookmarks")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Bookmarks";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/account/connected-accounts")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Connected accounts";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/account/following")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Following";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/account/ignored")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Ignoring";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/account/security")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Password and security";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/account/preferences")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Preferences";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/account/privacy")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Privacy";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/account/reactions")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reactions received";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/account/signature")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Edit signature";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/conversations/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Conversations";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/misc/contact")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Contact us";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/help/bb-codes/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "BB codes";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/help/cookies/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Cookie usage";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/help/privacy-policy/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Privacy policy";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/help/smiles/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Smilies";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/help/terms/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Terms and rules";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/help/trophies/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Trophies";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  } else if (document.location.pathname.includes("/help/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Help";
    presenceData.state = "Vozer ID: " + document.querySelector("span.p-navgroup-linkText").textContent;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});