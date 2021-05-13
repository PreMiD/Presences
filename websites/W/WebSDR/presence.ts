const presence = new Presence({
    clientId: "715344422039977994"
  }),
  strings = {
    listen: "Listening",
    mute: "Muted",
    record: "Recording",
    view: "Viewing",
    read: "Reading"
  };

const browsingStamp = Math.floor(Date.now() / 1000);

const modes = ["CW", "LSB", "USB", "AM", "FM", "AMsync"];

let frequency: string;
let mode = 2;
let intHandle: number;

function updateMode(): void {
  let i = 0;
  Array.from(
    document.querySelector("div.ctl > form > div.buttonrow").children
  ).forEach((node) => {
    if ((node as HTMLElement).style.background != "") {
      mode = i;
      return;
    }
    i++;
  });
  return;
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "favicon",
    //smallImageKey: "key",
    smallImageText: "University of Twente SDR",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/") {
    if (intHandle == undefined) intHandle = setInterval(updateMode, 1000);

    frequency = (
      document.querySelector(
        "div.ctl > form > span > input"
      ) as HTMLInputElement
    ).value;

    presenceData.details = frequency + " " + modes[mode];

    if (document.getElementById("recbutton").innerHTML === "stop") {
      presenceData.state = strings.record;
    } else if (
      (document.getElementById("mutecheckbox") as HTMLInputElement).checked ===
      true
    ) {
      presenceData.state = strings.mute;
    } else {
      presenceData.state = strings.listen;
    }
  } else if (document.location.pathname === "/wspr/") {
    presenceData.details = "WSPR Map";
    presenceData.state = strings.view;
  } else if (document.location.pathname === "/chirps/") {
    presenceData.details = "Chirp Signals";
    presenceData.state = strings.view;
  } else if (document.location.pathname === "/chirps/article/") {
    presenceData.details = "Chirp Signal Article";
    presenceData.state = strings.read;
  } else if (document.location.pathname === "/fullday/") {
    presenceData.details = "Full Day Waterfall";
    presenceData.state = strings.view;
  } else if (document.location.pathname === "/oldnews.html") {
    presenceData.details = "Old News";
    presenceData.state = strings.read;
  } else if (document.location.pathname === "/qrt.html") {
    presenceData.details = "History";
    presenceData.state = strings.read;
  }

  if (presenceData.details == null) {
    //This will fire if you do not set presence details
    presence.setTrayTitle(); //Clears the tray title for mac users
    presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  } else {
    //This will fire if you set presence details
    presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }
});
