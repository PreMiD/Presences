const presence = new Presence({
  clientId: "759926761554313218"
});

// Timestamp
function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

// Variables
let Server: string, Region: string, Nickname: string, Mass: string;

presence.on("UpdateData", async () => {
  // Presence Data
  const data: PresenceData = { largeImageKey: "vanis_image" },
    massElement = document.querySelector("#hud .stats div:nth-child(3)"),
    overlay = <HTMLElement>document.querySelector("#overlay");

  if (overlay.style.display !== "none") {
    // Game not Ready
    const RegionElement = document.querySelector("#tab-menu .tabs .tab.active"),
      ServerElement = document.querySelector(
        "#tab-menu .server-list .active .server-name"
      ),
      NicknameElement = <HTMLInputElement>(
        document.querySelector("#player-data #nickname")
      );

    // Data Update
    Region = RegionElement && RegionElement.textContent.trim();
    Server = ServerElement && ServerElement.textContent.trim();
    Nickname = NicknameElement && NicknameElement.value;
    Mass = massElement && massElement.innerHTML.split(":")[1].trim();
  } else {
    // Game Started
    Mass = massElement && massElement.innerHTML.split(":")[1].trim();
  }

  if (overlay.style.display !== "none" && Mass.startsWith("0")) {
    data.details = "Main menu";
    data.startTimestamp = getTimeStamp();
  } else {
    data.details = `Playing on server: ${Region} | ${Server}`;
    data.state = `Player: ${Nickname} | Mass: ${Mass}`;
    data.startTimestamp = getTimeStamp();
  }

  presence.setActivity(data, true);
});
