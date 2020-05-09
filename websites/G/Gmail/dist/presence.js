var presence = new Presence({
  clientId: "620072679139180575"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  let data = {
    largeImageKey: "gmail-logo"
  };
  var path = window.location.href;
  var emailCheck = window.location.href.split("/").length == 7 ? false : true;
  console.log(emailCheck);
  if (emailCheck) {
    if (path.endsWith("#category/social")) {
      data.details = "Viewing Social Mails";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("#category/updates")) {
      data.details = "Viewing Updates Mails";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("#category/forums")) {
      data.details = "Viewing Forums Mails";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("#category/promotions")) {
      data.details = "Viewing Promotions Mails";
      data.startTimestamp = elapsed;
    } else if (path.match("/#label/")) {
      var labelname = document.querySelector("head > title").textContent;
      data.details = "In the Label: ";
      data.state = labelname.replace('"', "").split('" - ')[0];
      data.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/general")) {
      data.details = "In the General settings";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/labels")) {
      data.details = "In the Labels settings";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/inbox")) {
      data.details = "In the settings of the";
      data.state = "Inbox Mails";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/accounts")) {
      data.details = "In the Account settings";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/filters")) {
      data.details = "In the Filter settings";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/fwdandpop")) {
      data.details = "In the settings:";
      data.state = "POP and IMAP";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/addons")) {
      data.details = "In the Addons settings";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/chat")) {
      data.details = "In the Chat settings";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/labs")) {
      data.details = "In the Advanced settings";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/offline")) {
      data.details = "In the Offline settings";
      data.startTimestamp = elapsed;
    } else if (path.endsWith("/#settings/oldthemes")) {
      data.details = "In the Themes settings";
      data.startTimestamp = elapsed;
    } else if (path.match("/#search/")) {
      data.details = "Looking for a mail";
      data.startTimestamp = elapsed;
    } else {
      data.details = "Viewing an Email";
      data.startTimestamp = elapsed;
    }
  } else if (path.endsWith("inbox")) {
    data.details = "Viewing Inbox";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("compose=new")) {
    data.details = "Composing a New Email";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("starred")) {
    data.details = "Viewing Starred";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("snoozed")) {
    data.details = "Viewing Snoozed";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("sent")) {
    data.details = "Viewing Sent";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("drafts")) {
    data.details = "Viewing Drafts";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("imp")) {
    data.details = "Viewing Important";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("chats")) {
    data.details = "Viewing Chats";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("scheduled")) {
    data.details = "Viewing Scheduled";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("all")) {
    data.details = "Viewing All Mail";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("spam")) {
    data.details = "Viewing Spam";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("trash")) {
    data.details = "Viewing Trash";
    data.startTimestamp = elapsed;
  } else if (path.endsWith("#category/social")) {
    data.details = "Viewing Social Mails";
    data.startTimestamp = elapsed;
  } else {
    data.details = "Viewing Mail";
    data.startTimestamp = elapsed;
  }
  presence.setActivity(data);
});
