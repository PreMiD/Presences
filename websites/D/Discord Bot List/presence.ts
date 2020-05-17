const presence = new Presence({
  clientId: "653644508507930645"
});

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "logo-dbl"
  };

  const browsingStamp = Math.floor(Date.now() / 1000);
  presenceData.startTimestamp = browsingStamp;

  if (window.location.pathname.endsWith("bots")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "All bots";
  } else if (window.location.pathname.endsWith("contact")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Contact";
  } else if (window.location.pathname.endsWith("api-docs")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "API Docs.";
  } else if (window.location.pathname.startsWith("/bots/")) {
    presenceData.details = "Viewing a bot:";
    presenceData.state = document.querySelector(
      "#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > strong"
    )
      ? document.querySelector(
          "#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > strong"
        ).textContent
      : "Viewing their bot(s)";
  } else if (window.location.pathname.includes("/my-bots/add")) {
    presenceData.state = "Adding a new bot";
  } else if (window.location.pathname.endsWith("partners")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Partners";
  } else if (window.location.pathname.startsWith("/tags/")) {
    presenceData.details = "Viewing a tag:";
    presenceData.state = document.querySelector("#header > h1").textContent;
  } else if (window.location.pathname.includes("/users/")) {
    presenceData.details = "Viewing a user:";
    presenceData.state =
      document.querySelector(
        "#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > strong"
      ).textContent +
      document.querySelector(
        "#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > span"
      ).textContent;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
