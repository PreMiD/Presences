const presence = new Presence({
  clientId: "952575137180442626"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const data: PresenceData = {
    largeImageKey: "php_logo",
    startTimestamp: browsingStamp
  },
    route = document.location.pathname.split("/");
  if (route.length === 1 || route[1] === "")
    data.details = "Browsing the main page...";
  else if (route[1] === "downloads" || route[1] === "downloads.php")
    data.details = "Browsing the download section";
  else if (route[1] === "docs.php")
    data.details = "Browsing the documentation";
  else if (route[1] === "download-docs.php")
    data.details = "Downloading the documentation";
  else if (route[1].toLowerCase().includes("changelog"))
    data.details = "Reading the changelogs";
  else if (route[1] === "download-logos.php")
    data.details = "Viewing the official logos";
  else if (route[1] === "manual") {
    data.details = "Viewing the documentation: ";

    let manualTitle = document.title.replaceAll("PHP: ", "").replaceAll(" - Manual", "");
    if (route[3].includes("function.")) {
      data.state = `Function: ${manualTitle}`;
    } else if (route[3].includes("language.")) {
      let c = route[3].split(".")[1];
      data.state = `${c.charAt(0).toUpperCase() + c.slice(1)}: ${manualTitle}`;
    } else {
      data.state = manualTitle;
    }
  } else if (route[1] === "releases") {
    if (route[2] != '') {
      data.details = "Viewing an release version:";
      data.state = `PHP v${route[2]}`;
    } else {
      data.details = "Viewing the releases";
    }
  } else {
    data.details = "Browsing the website";
  }
  presence.setActivity(data);
});
