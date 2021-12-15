const presence = new Presence({
  clientId: "685491676155871281"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "pypi"
    },
    Path = document.location.pathname;
  presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  if (Path === "/") {
    const total = document.querySelector(
      "#content > div.horizontal-section.horizontal-section--grey.horizontal-section--thin.horizontal-section--statistics > div > p:nth-child(1)"
    ).textContent;
    presenceData.details = "Viewing the home-page :";
    presenceData.state = `${total}`;
  } else if (Path.startsWith("/help")) {
    const total = document.querySelector("#content > div:nth-child(1) > div")
      .children.length;
    presenceData.details = "Viewing the help-page :";
    presenceData.state = `${total} total topics`;
  } else if (Path.startsWith("/account/login"))
    presenceData.details = "Logging into their account ";
  else if (Path.startsWith("/account/register"))
    presenceData.details = "Registering a new account ";
  else if (Path.startsWith("/search")) {
    const query = (document.querySelector("#search") as HTMLInputElement).value,
      totalResults = document.querySelector(
        "#content > div > div > div.left-layout__main > form > div.split-layout.split-layout--table.split-layout--wrap-on-tablet > div:nth-child(1) > p > strong"
      ).textContent;
    presenceData.details = `Searching for ${query} :`;
    presenceData.state = `${totalResults} total results`;
  } else if (Path.startsWith("/project")) {
    const name = document.querySelector(
        "#content > div.banner > div > div.package-header__left > h1"
      ).textContent,
      author = document.querySelector(
        "#content > div:nth-child(3) > div > div > div.vertical-tabs__tabs > div:nth-child(5) > span > a > span.sidebar-section__user-gravatar-text"
      ).textContent;
    presenceData.details = "Viewing a package :";
    presenceData.state = `${name} BY ${author}`;
  } else if (Path.startsWith("/security"))
    presenceData.details = "Reporting a security flaw ";
  else if (Path.startsWith("/policy/terms-of-use/"))
    presenceData.details = "Viewing the terms of use ";
  else presenceData.details = "Browsing the site ";

  presence.setActivity(presenceData);
});
