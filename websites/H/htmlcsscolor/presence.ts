const presence = new Presence({
  clientId: "630441527826579467"
});

presence.on("UpdateData", async () => {
  const Data: PresenceData = {
    largeImageKey: "htmlcsscolor"
  };

  // My special Format
  // Detail: The action (viewing/generating/listening/etc).
  // State: tells you what they are doing with the action (viewing blah/generating blah/listening blah/etc)

  if (document.location.pathname.startsWith("/hex")) {
    Data.details = `Viewing ${
      document.querySelector("#uscBootStrapHeader_lblTitle > strong")
        .textContent
    }`;
    Data.state = `${
      document
        .querySelector("#uscBootStrapHeader_lblTitle > small")
        .textContent.split("#")[0]
    }`;
  }

  // Wheel. Since its on main page the main page is also considered wheel.
  if (
    document.location.href.endsWith("/#wheel") ||
    document.location.pathname === "/"
  ) {
    Data.details = "Viewing on wheel";
    Data.state = `${
      (document.querySelector("#cntMain_txtColor") as HTMLInputElement).value
    }`;
  }

  // Sub pages
  if (document.location.pathname.startsWith("/html-color-names")) {
    Data.details = "Viewing the list of";
    Data.state = "html color names.";
  }
  if (document.location.pathname.startsWith("/color-names-rgb-values")) {
    Data.details = "Viewing the list of";
    Data.state = "RGB color names.";
  }
  if (document.location.pathname.startsWith("/web-safe-colors")) {
    Data.details = "Viewing the list of";
    Data.state = "web save colors.";
  }
  if (document.location.pathname.startsWith("/random-colors")) {
    Data.details = "Viewing a list of";
    Data.state = "random colors.";
  }
  if (document.location.pathname.startsWith("/color-gradient")) {
    Data.details = "Generating a";
    Data.state = "color gradient.";
  }
  if (document.location.pathname.startsWith("/contacts")) {
    Data.details = "Viewing the";
    Data.state = "contacts page.";
  }

  presence.setActivity(Data);
});
