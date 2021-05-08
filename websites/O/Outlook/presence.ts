const presence = new Presence({
    clientId: "840489095767261194"
  }),
  elapsed = Math.floor(Date.now() / 1000);
let search: HTMLInputElement, title: HTMLElement, title2: HTMLElement;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    path = window.location.href;
  presenceData.details = "Viewing:";
  if (path.includes("mail")) {
    if (path.endsWith("inbox")) {
      title = document.querySelector(
        "#ReadingPaneContainerId > div > div > div > div._29NreFcQ3QoBPNO3rKXKB0 > div._3Yr_hO7j5doGUkhrRiP6uY > div:nth-child(1) > div > div._31eKqae41uP_KBAvjXjCLQ > div > div > div > div > div.ms-FocusZone.css-41 > div > div > input"
      );
      if (!title) {
        presenceData.state = "Inbox";
      } else {
        presenceData.state = "New Email";
      }
    } else if (path.endsWith("junkemail")) presenceData.state = "Junkemail";
    else if (path.endsWith("drafts")) presenceData.state = "Drafts";
    else if (path.endsWith("sentitems")) presenceData.state = "Sent Items";
    else if (path.endsWith("deleteditems"))
      presenceData.state = "Deleted Items";
    else if (path.endsWith("archive")) presenceData.state = "Archived Items";
    else if (path.endsWith("notes")) presenceData.state = "Notes";
    else if (path.endsWith("conversationhistory"))
      presenceData.state = "Conversation History";
    else presenceData.state = "Personal Folder";
  } else if (path.includes("calendar")) presenceData.state = "Calendar";
  else if (path.includes("people")) presenceData.state = "People";
  else if (path.includes("files")) presenceData.state = "Files";
  else if (path.includes("spaces")) presenceData.state = "Spaces";

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
