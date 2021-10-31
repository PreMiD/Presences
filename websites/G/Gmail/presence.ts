const presence = new Presence({
    clientId: "808667100319186964"
  }),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: elapsed
    },
    path = window.location.href,
    emailCheck = window.location.href.split("/").length === 7 ? false : true;

  if (emailCheck) {
    if (path.endsWith("#category/social"))
      presenceData.details = "Viewing Social Mails";
    else if (path.endsWith("#category/updates"))
      presenceData.details = "Viewing Updates Mails";
    else if (path.endsWith("#category/forums"))
      presenceData.details = "Viewing Forums Mails";
    else if (path.endsWith("#category/promotions"))
      presenceData.details = "Viewing Promotions Mails";
    else if (path.match("/#label/")) {
      const labelname = document.querySelector("head > title").textContent,
        email = labelname.match(
          /([a-zA-Z][\w.-]*[a-zA-Z0-9])@([a-zA-Z0-9][\w.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z.]*[a-zA-Z])/
        );
      presenceData.details = "In the Label: ";
      presenceData.state = labelname
        .replace('"', "")
        .split('" - ')[0]
        .replace(` - ${email[0]} - Gmail`, "");
    } else if (path.endsWith("/#settings/general"))
      presenceData.details = "In the General settings";
    else if (path.endsWith("/#settings/labels"))
      presenceData.details = "In the Labels settings";
    else if (path.endsWith("/#settings/inbox")) {
      presenceData.details = "In the settings of the";
      presenceData.state = "Inbox Mails";
    } else if (path.endsWith("/#settings/accounts"))
      presenceData.details = "In the Account settings";
    else if (path.endsWith("/#settings/filters"))
      presenceData.details = "In the Filter settings";
    else if (path.endsWith("/#settings/fwdandpop")) {
      presenceData.details = "In the settings:";
      presenceData.state = "POP and IMAP";
    } else if (path.endsWith("/#settings/addons"))
      presenceData.details = "In the Addons settings";
    else if (path.endsWith("/#settings/chat"))
      presenceData.details = "In the Chat settings";
    else if (path.endsWith("/#settings/labs"))
      presenceData.details = "In the Advanced settings";
    else if (path.endsWith("/#settings/offline"))
      presenceData.details = "In the Offline settings";
    else if (path.endsWith("/#settings/oldthemes"))
      presenceData.details = "In the Themes settings";
    else if (path.match("/#search/"))
      presenceData.details = "Looking for a mail";
    else presenceData.details = "Viewing an Email";
  } else if (path.endsWith("inbox")) presenceData.details = "Viewing Inbox";
  else if (path.endsWith("compose=new"))
    presenceData.details = "Composing a New Email";
  else if (path.endsWith("starred")) presenceData.details = "Viewing Starred";
  else if (path.endsWith("snoozed")) presenceData.details = "Viewing Snoozed";
  else if (path.endsWith("sent")) presenceData.details = "Viewing Sent";
  else if (path.endsWith("drafts")) presenceData.details = "Viewing Drafts";
  else if (path.endsWith("imp")) presenceData.details = "Viewing Important";
  else if (path.endsWith("chats")) presenceData.details = "Viewing Chats";
  else if (path.endsWith("scheduled"))
    presenceData.details = "Viewing Scheduled";
  else if (path.endsWith("all")) presenceData.details = "Viewing All Mail";
  else if (path.endsWith("spam")) presenceData.details = "Viewing Spam";
  else if (path.endsWith("trash")) presenceData.details = "Viewing Trash";
  else if (path.endsWith("#category/social"))
    presenceData.details = "Viewing Social Mails";
  else presenceData.details = "Viewing Mail";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
