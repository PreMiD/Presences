const presence = new Presence({
  clientId: "754549450772316160"
});

let elapsed = 0,
  old = "";

presence.on("UpdateData", () => {
  if (window.location.href !== old) {
    old = window.location.href;
    elapsed = Math.round(Date.now() / 1000);
  }

  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: "help",
    startTimestamp: elapsed
  };

  if (
    !document.body.textContent.includes("404 Not Found\nnginx") &&
    !isNaN(Number(location.pathname.replace(/\//g, "")))
  ) {
    presenceData.smallImageText = document
      .querySelector("#comic > img")
      .getAttribute("title");
    presenceData.details = `Reading #${
      document
        .querySelector('[property="og:url"]')
        .getAttribute("content")
        .split("xkcd.com/")[1]
        .split("/")[0]
    }`;
    presenceData.state = document.getElementById("ctitle").textContent;
  } else presenceData.details = "Browsing XKCD";

  presence.setActivity(presenceData);
});
