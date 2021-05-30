const presence = new Presence({
  clientId: "846071986902925312"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "nekopost_logo"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.host == "www.nekopost.net") {
    if (document.location.pathname.includes("/manga")) {
        if(document.querySelector("head > title").textContent.split("-")[1] != undefined) {
          presenceData.details ="Manga :" + document.querySelector("head > title").textContent.split("-")[1];
          presenceData.state = document
          .querySelector("head > title")
          .textContent.split(" ")[0];
          presenceData.smallImageKey = "reading";
        }
        else {
          presenceData.details ="Manga :" +  document
          .querySelector("head > title")
          .textContent;
        }
    } else if (document.location.pathname.includes("/novel")) {
      if(document.querySelector("head > title").textContent.split("-")[1] != undefined) {
        presenceData.details ="Novel :" +  document.querySelector("head > title").textContent.split("-")[1];
        presenceData.state = document
        .querySelector("head > title")
        .textContent.split(" ")[0];
        presenceData.smallImageKey = "reading";
      }
      else {
        presenceData.details ="Novel :" +  document
        .querySelector("head > title")
        .textContent;
      }
    } else if (document.location.pathname.includes("/comic")) {
      if(document.querySelector("head > title").textContent.split("-")[1] != undefined) {
        presenceData.details ="Comic :" +  document.querySelector("head > title").textContent.split("-")[1];
        presenceData.state = document
        .querySelector("head > title")
        .textContent.split(" ")[0];
        presenceData.smallImageKey = "reading";
      }
      else {
        presenceData.details ="Comic :" +  document
        .querySelector("head > title")
        .textContent;
      }
    } else if (document.location.pathname.includes("/fiction")) {
      if(document.querySelector("head > title").textContent.split("-")[1] != undefined) {
        presenceData.details ="ONovel :" +  document.querySelector("head > title").textContent.split("-")[1];
        presenceData.state = document
        .querySelector("head > title")
        .textContent.split(" ")[0];
        presenceData.smallImageKey = "reading";
      }
      else {
        presenceData.details ="ONovel :" +  document
        .querySelector("head > title")
        .textContent;
      }
    } else if (document.location.pathname.includes("/explore")) {
      presenceData.details = "กำลังอ่าน Project list";
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname == "/") {
      presenceData.details = "กำลังหา...";
      presenceData.smallImageKey = "search";
    }
  } 

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
