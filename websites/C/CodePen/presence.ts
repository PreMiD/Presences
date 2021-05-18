const presence = new Presence({
  clientId: "670111348130185267"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: "logo-outline",
    smallImageText: "codepen.io",
    details: "Codepen.io",
    state: "Coding..."
  };

  if (
    window.location.pathname.includes("/fullpage/") ||
    window.location.pathname.includes("/pen/")
  ) {
    presenceData.details = "Editing a pen";
    presenceData.state =
      document.getElementById("editable-title-span").innerHTML +
      " by " +
      document
        .getElementsByClassName("ItemTitle_ownerLink-tMhWC")[0]
        .innerHTML.split("<")[0];
  } else if (window.location.pathname.includes("/collection/")) {
    presenceData.details =
      "Looking at collection " +
      document.getElementById("collection-name").innerText;
    if (document.getElementById("collection-desc").innerText == "") {
      presenceData.state =
        "Collection by " +
        document
          .getElementsByClassName("content-author")[0]
          .textContent.split("\n")[0];
    } else {
      presenceData.state = document.getElementById("collection-desc").innerText;
    }
  } else if (window.location.pathname.includes("/topic/")) {
    presenceData.details =
      "Looking at topic " +
      document.getElementsByClassName("Topics_topicTitle-3OfJU")[0].textContent;
    presenceData.state = document
      .getElementsByClassName("Topics_topicDescription-2CNwF")[0]
      .textContent.split("\n")[3];
  } else if (window.location.pathname.includes("/tv/")) {
    presenceData.details =
      "Watching " +
      document
        .getElementsByClassName("collection-details")[0]
        .textContent.replace("From “", "")
        .replace("”", "") +
      " on Codepen TV";
    presenceData.state =
      document.getElementsByClassName("item-title")[0].textContent +
      " " +
      document.getElementsByClassName("pen-author")[0].textContent;
  } else if (
    window.location.pathname.includes("/project/") ||
    window.location.pathname.includes("/project/")
  ) {
    presenceData.details = "Editing a project";
    presenceData.state =
      document.getElementById("editable-title-span").innerHTML +
      " by " +
      document
        .getElementsByClassName("ItemTitle_ownerLink-tMhWC")[0]
        .innerHTML.split("<")[0];
  } else if (window.location.pathname == "/write/") {
    presenceData.details = "Making a post";
    if ((document.getElementById("title") as HTMLInputElement).value == "") {
      presenceData.state = "Thinking about what the title should be.";
    } else {
      presenceData.state = (
        document.getElementById("title") as HTMLInputElement
      ).value;
    }
  } else if (window.location.pathname == "/") {
    presenceData.details = "On the home page";
    presenceData.state = "Looking at code snippets.";
  } else if (window.location.pathname == "/dashboard/") {
    presenceData.details = "On dashboard";
    presenceData.state = "Admiring their own pens.";
  } else if (window.location.pathname.includes("/search/")) {
    presenceData.details = "Searching for pens";
    presenceData.state = "Looking for " + location.search.replace("?q=", "");
  } else {
    if (document.getElementsByClassName("title-header")[0] == undefined) {
      presenceData.details = "Looking at page";
      presenceData.state = document.title;
    } else {
      presenceData.details = "Looking at page";
      presenceData.state = document
        .getElementsByClassName("title-header")[0]
        .textContent.split("\n")[0];
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
