const presence = new Presence({
  clientId: "842704573877714974"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "app"
  };

  if (document.location.hostname === "roulette.hitmaps.com") {
    presenceData.details = "Playing HITMAPS™ Roulette";
    if (document.querySelector("h1")?.innerHTML.includes("SELECT MISSION"))
      presenceData.state = "Choosing a mission";
    if (document.querySelector("h1")?.innerHTML.includes("CURRENT MISSION"))
      presenceData.state =
        "Mission:" +
        document.querySelector("h1").innerHTML.split("CURRENT MISSION:")[1];
  } else if (document.location.pathname === "/") {
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname === "/support-the-site") {
    presenceData.details = "Viewing donation page";
  } else if (document.location.pathname === "/brand") {
    presenceData.details = "Viewing branding page";
  } else if (document.location.pathname === "/privacy-policy") {
    presenceData.details = "Reading the privacy policy";
  } else if (document.location.pathname === "/terms-of-use") {
    presenceData.details = "Reading the terms of use";
  }

  if (document.location.pathname.split("/games/")[1]) {
    switch (document.location.pathname.split("/games/")[1].split("/")[0]) {
      case "hitman":
        presenceData.details = "Viewing HITMAN™";
        break;
      case "hitman2":
        presenceData.details = "Viewing HITMAN™ 2";
        break;
      case "hitman3":
        presenceData.details = "Viewing HITMAN 3";
        break;
      case "sniper-assassin":
        presenceData.details = "Viewing HITMAN™ 2: Sniper Assassin";
        break;
      case "absolution":
        presenceData.details = "Viewing Hitman: Absolution";
        break;
      default:
        presenceData.details = "Viewing a game";
        break;
    }
  }

  if (
    document.location.pathname.split("/games/")[1] &&
    document.location.pathname.split("/")[3]
  ) {
    presenceData.state = capitaliseEachWord(
      document.location.pathname
        .split("/")[3]
        .replace(/[0-9]/g, "")
        .replace(/-/g, " ")
    );

    if (document.title.includes(" | HITMAPS™")) {
      presenceData.state += " - " + document.title.split(" | HITMAPS™")[0];
    } else if (document.location.pathname.split("/")[4]) {
      presenceData.state +=
        " - " +
        capitaliseEachWord(
          document.location.pathname.split("/")[4].replace(/-/g, " ")
        );
    }
    if (document.querySelector('meta[property="og:image"]')) {
      if (
        document
          .querySelector('meta[property="og:image"]')
          .getAttribute("content")
          .includes("elusive")
      ) {
        presenceData.state += " (Elusive Target)";
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

function capitaliseEachWord(string: string) {
  const words = string.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}
