const presence = new Presence({
  clientId: "802379096122196050"
});
let timestart = Math.round(new Date().getTime() / 1000),
  prevPage = "",
  currPage = "";

function refreshTime() {
  timestart = Math.round(new Date().getTime() / 1000);
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "online_sequencer_icon",
    startTimestamp: timestart
  };
  if (document.getElementsByClassName("fas fa-stop")[0] != undefined) {
    prevPage = currPage;
    currPage = "l";
    presenceData.details = "Listening to a sequence";
    presenceData.state =
      "Title: " + (document.getElementById("title") as HTMLInputElement).value;
    presenceData.buttons = [
      { label: "View Sequence", url: window.location.href },
      {
        label: "View Creator",
        url: (document.querySelector("#titlebar div a") as HTMLAnchorElement)
          .href
      }
    ];
  } else if (document.location.pathname === "/") {
    prevPage = currPage;
    currPage = "w";
    presenceData.details = "Writing a new sequence";
    presenceData.state =
      "Title: " + (document.getElementById("title") as HTMLInputElement).value;
  } else if (document.location.pathname === "/sequences") {
    prevPage = currPage;
    currPage = "bs";
    presenceData.details = "Browsing sequences";
    if (document.getElementsByTagName("input")[2].value != "") {
      presenceData.state =
        "Searching: " +
        (document.getElementsByTagName("input")[2] as HTMLInputElement).value;
    }
  } else if (document.location.pathname === "/memberlist") {
    prevPage = currPage;
    currPage = "ml";
    presenceData.details = "Viewing members";
    if (document.getElementsByTagName("input")[2].value != "") {
      presenceData.state =
        "Searching: " +
        (document.getElementsByTagName("input")[2] as HTMLInputElement).value;
    }
  } else if (document.location.pathname.startsWith("/members/")) {
    prevPage = currPage;
    currPage = "m";
    presenceData.details = "Viewing member:";
    presenceData.state = (document.getElementsByClassName(
      "profile_header"
    )[0] as HTMLElement).innerText;
  } else if (document.location.pathname.startsWith("/import")) {
    prevPage = currPage;
    currPage = "i";
    presenceData.details = "Importing MIDI file";
  } else if (document.location.pathname.startsWith("/forum/showthread")) {
    prevPage = currPage;
    currPage = "ft";
    presenceData.details = "Viewing Forum Thread:";
    const threadtitle = (document.getElementsByClassName(
      "thead"
    )[0] as HTMLElement).innerText;
    if (threadtitle.includes("Thread Modes")) {
      presenceData.state = threadtitle.substr(13);
    } else {
      presenceData.state = threadtitle;
    }
  } else if (document.location.pathname.startsWith("/forum/announcements")) {
    prevPage = currPage;
    currPage = "fa";
    presenceData.details = "Viewing Forum Announcement:";
    presenceData.state = (document.getElementsByClassName(
      "thead"
    )[0] as HTMLElement).innerText;
  } else if (document.location.pathname.startsWith("/forum/forumdisplay")) {
    prevPage = currPage;
    currPage = "fd";
    presenceData.details = "Viewing Forum Category:";
    presenceData.state = (document.getElementsByClassName(
      "pull-left navbar-header"
    )[0] as HTMLElement).innerText;
  } else if (document.location.pathname.startsWith("/forum/memberlist")) {
    prevPage = currPage;
    currPage = "fm";
    presenceData.details = "Viewing Forum Members";
  } else if (document.location.pathname.startsWith("/forum")) {
    prevPage = currPage;
    currPage = "f";
    presenceData.details = "Viewing Forum";
  } else if (!isNaN(parseInt(document.location.pathname.substr(1)))) {
    prevPage = currPage;
    currPage = "s";
    if (
      document.getElementsByClassName("active tooltipstered")[0] === undefined
    ) {
      presenceData.details = "Viewing a sequence";
      presenceData.buttons = [
        { label: "View Sequence", url: window.location.href },
        {
          label: "View Creator",
          url: (document.querySelector("#titlebar div a") as HTMLAnchorElement)
            .href
        }
      ];
    } else {
      presenceData.details = "Editing a sequence";
    }
    const str = (document.getElementsByClassName(
      "text"
    )[1] as HTMLElement).innerHTML.trim();
    if (str.includes("by <a")) {
      presenceData.state = "Title: " + str.substring(0, str.indexOf("by <a"));
    } else {
      presenceData.state = "Title: " + str;
    }
  }

  if (document.getElementById("chatbox") != null) {
    prevPage = currPage;
    currPage = "c";
    presenceData.details = "Viewing Chat";
  }

  if (prevPage != currPage) {
    refreshTime();
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
