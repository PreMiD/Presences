const presence = new Presence({
    clientId: "634332519398899724"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  };

presence.on("UpdateData", async () => {
  const startTimestamp: number = Date.now();
  presenceData.startTimestamp = startTimestamp;
  switch (
    document.location.pathname.endsWith("/") &&
    document.location.pathname.length > 1
      ? document.location.pathname.slice(
          0,
          document.location.pathname.length - 1
        )
      : document.location.pathname
  ) {
    case "/":
      presenceData.details = "Viewing fun through homepage";
      break;
    case "/trends":
      presenceData.details = "Looking at fun that is trending";
      break;
    case "/recent":
      presenceData.details = "Viewing recently uploaded fun";
      break;
    case "/tv":
      presenceData.details = "Viewing fun videos";
      break;
    case "/tvvote":
      presenceData.details = "Viewing fun videos";
      break;
    case "/friends":
      presenceData.details = "My friend list";
      break;
    case "rules":
      presenceData.details = "Reading the rules";
      break;
    case "/notifications":
      presenceData.details = "Viewing notifications";
      break;
    case "/upload":
      presenceData.details = "Going to upload something fun";
      break;
    case "/about":
      presenceData.details = "About 1CAK/1CUK";
      break;
    case "/terms":
      presenceData.details = "Terms of Service";
      break;
    case "/privacy":
      presenceData.details = "Privacy Policy";
      break;
    case "/disclaimer":
      presenceData.details = "Disclaimer";
      break;
    case "/advertise":
      presenceData.details = "Advertise with us";
      break;
    case "/weeklytop":
      presenceData.details = "Viewing weekly top users";
      break;
    case "/alltimetop":
      presenceData.details = "Viewing all time top users";
      break;
    case "/preferences":
      presenceData.details = "Settings";
      break;
    case "/privacy_setting":
      presenceData.details = "Settings";
      break;
  }

  if (document.location.pathname.slice(1).startsWith("of")) {
    presenceData.details = document
      .querySelector("#content > h3")
      .textContent.trim();
  } else if (document.location.pathname.slice(1).startsWith("saved")) {
    if (!document.querySelector("#content > p"))
      presenceData.details = "My saved funs";
  } else if (document.location.pathname.slice(1).startsWith("voteof")) {
    if (!document.querySelector("#content > p"))
      presenceData.details = "My funned funs";
  } else if (!isNaN(parseInt(document.location.pathname.slice(1)))) {
    const author = document
      .querySelector(
        "#content > div > table > tbody > tr > td > div > .blur a > b"
      )
      .textContent.trim();
    presenceData.details = `Viewing ${author}'s fun`;
  } else if (document.location.pathname.slice(1).startsWith("legendary"))
    presenceData.details = "Viewing the most legendary fun";
  else if (document.location.pathname.slice(1).startsWith("search")) {
    const query = document.location.pathname.slice(
      10,
      document.location.pathname.length
    );
    presenceData.details = "Searching fun:";
    presenceData.state = query;
  }
  presence.setActivity(presenceData);
});
