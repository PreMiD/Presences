const presence = new Presence({
    clientId: "651454408768487441",
  }),
  pages = {
    "/questions": "Questions ",
    "/tags": "Tags ",
    "/users": "Users ",
    "/unanswered": "Unanswered ",
  };

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    title = document.querySelector("#question-header > h1"),
    posttitle = document.querySelector(
      "#mod-buzz-header-1 > div.buzz-header__hgroup.xs-my2.md-mt0 > h1"
    ),
    user = document.querySelector(
      "#user-card > div > div.grid--cell.fl1.wmn0 > div > div.grid--cell.fl1.w0.overflow-x-hidden.overflow-y-auto.pr16.profile-user--about.about > div > div:nth-child(1) > h2 > div"
    ),
    author = document.querySelector(
      "#mod-buzz-header-1 > div.buzz-byline.xs-mb2 > a > div > div.sm-flex.sm-flex-align-center > span"
    ),
    searchresult = document.querySelector("#bigsearch > div > input");
  userdesc = document.querySelectorAll(".user-info__bio");

  let data = {
    largeImageKey: "logo",
    startTimestamp: Math.floor(Date.now() / 1000),
  };

  if (title && title.textContent != "") {
    data.details = "Reads a Question:";
    data.state = `${title.textContent}`;
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    data.details = "Viewing Page:";
    data.state = pages[page] || pages[page.slice(0, -1)];
  } else if (page.includes("/search")) {
    data.details = "Searching:";
    data.state = searchresult.value;
    data.smallImageKey = "logo";
  } else if (page.includes("/users")) {
    data.details = "Viewing User Profile:";
    data.state = user.textContent.trim();
  } else {
    data.details = "Viewing Page:";
    data.state = "Homepage";
  }

  if (data.details && data.state && data.details != "" && data.state != "")
    presence.setActivity(data);
});
