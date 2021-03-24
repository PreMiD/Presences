const presence = new Presence({
    clientId: "808667100319186964"
  }),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    path = window.location.href,
    emailCheck = window.location.href.split("/").length == 7 ? false : true;

  if (emailCheck) {
    if (path.endsWith("#category/social")) {
      presenceData.details = "Viewing Social Mails";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("#category/updates")) {
      presenceData.details = "Viewing Updates Mails";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("#category/forums")) {
      presenceData.details = "Viewing Forums Mails";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("#category/promotions")) {
      presenceData.details = "Viewing Promotions Mails";
      presenceData.startTimestamp = elapsed;
    } else if (path.match("/#label/")) {
      const labelname = document.querySelector("head > title").textContent;
      presenceData.details = "In the Label: ";
      presenceData.state = labelname.replace('"', "").split('" - ')[0];
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/general")) {
      presenceData.details = "In the General settings";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/labels")) {
      presenceData.details = "In the Labels settings";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/inbox")) {
      presenceData.details = "In the settings of the";
      presenceData.state = "Inbox Mails";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/accounts")) {
      presenceData.details = "In the Account settings";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/filters")) {
      presenceData.details = "In the Filter settings";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/fwdandpop")) {
      presenceData.details = "In the settings:";
      presenceData.state = "POP and IMAP";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/addons")) {
      presenceData.details = "In the Addons settings";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/chat")) {
      presenceData.details = "In the Chat settings";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/labs")) {
      presenceData.details = "In the Advanced settings";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/offline")) {
      presenceData.details = "In the Offline settings";
      presenceData.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/oldthemes")) {
      presenceData.details = "In the Themes settings";
      presenceData.startTimestamp = elapsed;
    } else if (path.match("/#search/")) {
      presenceData.details = "Looking for a mail";
      presenceData.startTimestamp = elapsed;
    } else {
      presenceData.details = "Viewing an Email";
      presenceData.startTimestamp = elapsed;
    }
  } else if (path.endsWith("inbox")) {
    presenceData.details = "Viewing Inbox";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("compose=new")) {
    presenceData.details = "Composing a New Email";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("starred")) {
    presenceData.details = "Viewing Starred";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("snoozed")) {
    presenceData.details = "Viewing Snoozed";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("sent")) {
    presenceData.details = "Viewing Sent";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("drafts")) {
    presenceData.details = "Viewing Drafts";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("imp")) {
    presenceData.details = "Viewing Important";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("chats")) {
    presenceData.details = "Viewing Chats";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("scheduled")) {
    presenceData.details = "Viewing Scheduled";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("all")) {
    presenceData.details = "Viewing All Mail";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("spam")) {
    presenceData.details = "Viewing Spam";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("trash")) {
    presenceData.details = "Viewing Trash";
    presenceData.startTimestamp = elapsed;
  } else if (path.endsWith("#category/social")) {
    presenceData.details = "Viewing Social Mails";
    presenceData.startTimestamp = elapsed;
  } else {
    presenceData.details = "Viewing Mail";
    presenceData.startTimestamp = elapsed;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
