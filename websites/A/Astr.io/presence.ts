const presence = new Presence({
  clientId: "683626678492332069"
});
let tag, nickname;
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "astriologo",
    smallImageKey: "transparent"
  };

  if (window.location.pathname === "/") {
    const size = document
      .getElementById("stats-hud")
      .innerHTML.split("|").length;
    const hstats = document.getElementById("stats-hud").innerHTML.split(" | ");
    const mass = document
      .getElementById("stats-hud")
      .innerHTML.split("|")[0]
      .replace("Score: ", "");
    const modepr = document.getElementsByClassName("is-active")[2].id;
    const mode = modepr.charAt(0).toUpperCase() + modepr.substring(1);
    const region = document
      .getElementsByClassName("is-active")[1]
      .id.replace("europe", "EU")
      .replace("america", "NA")
      .replace("asia", "AS");

    if ((document.getElementById("nick") as HTMLInputElement).value === "") {
      nickname = "Unnamed";
    } else {
      nickname = (document.getElementById("nick") as HTMLInputElement).value;
    }

    if ((document.getElementById("tag") as HTMLInputElement).value === "") {
      tag = "";
    } else {
      tag = `[${(document.getElementById("tag") as HTMLInputElement).value}]`;
    }

    if (size === 2) {
      presenceData.details = `${region} - Main Menu`;
      presenceData.state = "Gamemode: " + mode;
      presenceData.smallImageText = document
        .getElementById("stats-hud")
        .innerHTML.replace("|", "•");
    } else if (size === 3) {
      presenceData.details = `${region} ${mode} • Mass:  ${mass}`;
      presenceData.state = `Nickname: ${tag} ${nickname}`;

      presenceData.smallImageText = document
        .getElementById("stats-hud")
        .innerHTML.replace(hstats[0] + " |", "")
        .replace("|", "•");
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
