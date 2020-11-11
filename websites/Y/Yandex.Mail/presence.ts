const presence = new Presence({
    clientId: "776062087797407745"
  });
  
  const elapsed = Math.floor(Date.now() / 1000);
  
  presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
      largeImageKey: "yandexmail-logo",
      smallImageText: "Yandex.Mail is a free email service developed by Yandex."
    };
  
    const path = window.location.href;
    const emailCheck = window.location.href.split("/").length == 7 ? false : true;
  
    if (emailCheck) {
      if (path.endsWith("inbox")) {
        presenceData.details = "Viewing Inbox Folder...";
        presenceData.startTimestamp = elapsed;
      } else if (path.endsWith("sent")) {
        presenceData.details = "Viewing Sent Folder...";
        presenceData.startTimestamp = elapsed;
      } else if (path.endsWith("trash")) {
        presenceData.details = "Viewing Trash Folder...";
        presenceData.startTimestamp = elapsed;
      } else if (path.endsWith("spam")) {
        presenceData.details = "Viewing Spam Folder...";
        presenceData.startTimestamp = elapsed;
      } else if (path.endsWith("draft")) {
        presenceData.details = "Viewing Drafts Folder...";
        presenceData.startTimestamp = elapsed;
      } else {
        presenceData.details = "Viewing an Email...";
        presenceData.startTimestamp = elapsed;
      }
    }
  
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  });