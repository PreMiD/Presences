const presence = new Presence({
  clientId: "630777829478498326"
});

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "pastrlogo"
  };

  const pageTitle = document.title.slice(11);
  let action;
  let state;
  if (pageTitle == "Create") {
    action = "Creating a paste";
    let pasteName = (document.getElementById("paste-title") as HTMLInputElement)
      .value;
    if (!pasteName) {
      pasteName = "Untitled";
    }
    state = pasteName;
  } else if (pageTitle == "The smoothest paste service") {
    action = "Viewing a page";
    state = "Homepage";
  } else if (window.location.href.includes("view")) {
    action = "Viewing a paste";
    state = pageTitle;
  } else {
    action = "Viewing a page";
    state = pageTitle;
  }

  presenceData.details = action;
  presenceData.state = state;

  presence.setActivity(presenceData);
});
