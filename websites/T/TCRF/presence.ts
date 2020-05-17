const presence = new Presence({
  clientId: "631259475038175232"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };
  if (document.location.pathname == "/The_Cutting_Room_Floor") {
    presenceData.details = "browsing TCRF";
    presenceData.state = "at Homepage";
  } else if (
    ["/Help:Contents", "/Category:To_do", "/Special:RecentChanges"].includes(
      document.location.pathname
    )
  ) {
    var d = document.location.pathname.replace("/", "").split(":");
    presenceData.details = `browsing ${d[0]}`;
    presenceData.state = `at ${d[1]}`;
  } else if (document.location.pathname.startsWith("/Help:Contents/")) {
    var help = document.location.pathname.split("/");
    d = help[1].split(":");
    presenceData.details = `getting ${d[0]}`;
    presenceData.state = `${d[1]}: ${help[2]
      .replace("%26", "&")
      .split("_")
      .join(" ")}`;
  } else {
    var name = document
      .getElementById("firstHeading")
      .innerText.replace(")", "")
      .split("(");
    if (name[0].startsWith("Prerelease:")) {
      d = name[0].split(":");
      var x = `Game: ${d[1]}(${d[0]})`;
    } else {
      var x = `Game: ${name[0]}`;
    }
    let stated;
    if (name[1] == undefined) {
      stated = "Platform: Multiple";
    } else {
      stated = `Platform: ${name[1]} `;
    }
    //var year = document.getElementsByClassName("mw-headline")[1].innerText
    presenceData.details = `${x}`;
    presenceData.state = stated;
  }
});
