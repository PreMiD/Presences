const presence = new Presence({
  clientId: "802379096122196050"
});
let timestart = Math.round(new Date().getTime() / 1000);

function refreshTime() {
  timestart = Math.round(new Date().getTime() / 1000);
}

presence.on("UpdateData", async () => {
  let upperText,
    lowerText,
    refreshtime = true;
  if (document.getElementsByClassName("fas fa-stop")[0] != undefined) {
    upperText = "Listening to a sequence";
    lowerText =
      "Title: " + (<HTMLInputElement>document.getElementById("title")).value;
  } else if (document.location.pathname == "/") {
    upperText = "Writing a new sequence";
    lowerText =
      "Title: " + (<HTMLInputElement>document.getElementById("title")).value;
  } else if (document.location.pathname == "/sequences") {
    upperText = "Browsing sequences";
    if (document.getElementsByTagName("input")[2].value != "") {
      refreshtime = false;
      lowerText =
        "Searching: " +
        (<HTMLInputElement>document.getElementsByTagName("input")[2]).value;
    }
  } else if (document.location.pathname == "/memberlist") {
    upperText = "Viewing members";
    if (document.getElementsByTagName("input")[2].value != "") {
      refreshtime = false;
      lowerText =
        "Searching: " +
        (<HTMLInputElement>document.getElementsByTagName("input")[2]).value;
    }
  } else if (document.location.pathname.startsWith("/members/")) {
    upperText = "Viewing member:";
    lowerText = (<HTMLElement>(
      document.getElementsByClassName("profile_header")[0]
    )).innerText;
  } else if (document.location.pathname.startsWith("/import")) {
    upperText = "Importing MIDI file";
  } else if (document.location.pathname.startsWith("/forum/showthread")) {
    upperText = "Viewing Forum Thread:";
    const threadtitle = (<HTMLElement>(
      document.getElementsByClassName("thead")[0]
    )).innerText;
    if (threadtitle.includes("Thread Modes")) {
      lowerText = threadtitle.substr(13);
    } else {
      lowerText = threadtitle;
    }
  } else if (document.location.pathname.startsWith("/forum/announcements")) {
    upperText = "Viewing Forum Announcement:";
    lowerText = (<HTMLElement>document.getElementsByClassName("thead")[0])
      .innerText;
  } else if (document.location.pathname.startsWith("/forum/forumdisplay")) {
    upperText = "Viewing Forum Category:";
    lowerText = (<HTMLElement>(
      document.getElementsByClassName("pull-left navbar-header")[0]
    )).innerText;
  } else if (document.location.pathname.startsWith("/forum/memberlist")) {
    upperText = "Viewing Forum Members";
  } else if (document.location.pathname.startsWith("/forum")) {
    upperText = "Viewing Forum";
  } else if (!isNaN(parseInt(document.location.pathname.substr(1)))) {
    if (
      document.getElementsByClassName("active tooltipstered")[0] == undefined
    ) {
      upperText = "Viewing a sequence";
    } else {
      upperText = "Editing a sequence";
    }
    const str = (<HTMLElement>(
      document.getElementsByClassName("text")[1]
    )).innerHTML.trim();
    if (str.includes("by <a")) {
      lowerText = "Title: " + str.substring(0, str.indexOf("by <a"));
    } else {
      lowerText = "Title: " + str;
    }
  }

  if (document.getElementById("chatbox") != null) {
    refreshtime = true;
    upperText = "Viewing Chat";
  }

  if (refreshtime) {
    refreshTime();
  }

  const presenceData: PresenceData = {
    largeImageKey: "online_sequencer_icon",
    details: upperText,
    state: lowerText,
    startTimestamp: timestart
  };

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
