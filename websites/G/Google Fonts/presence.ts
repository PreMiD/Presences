const presence = new Presence({
    clientId: "814919836835905566"
  }),
  tmb = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "fontsred",
      smallImageKey: "google",
      startTimestamp: tmb
    },
    path = document.location.pathname.toLowerCase(),
    showButton = await presence.getSetting("showButton");

  if (path === "/") {
    const categspan = document.querySelector(
        "#main-content > gf-global-toolbar > div.global-toolbar__filters-area > gf-global-filters-row > div > div > gf-toolbar-category-filter > button > span.mat-button-wrapper"
      ),
      categ = categspan.getElementsByClassName(
        "gf-outlined-menu-button-content"
      )[0].textContent;
    if (categ === " Categories ") {
      presenceData.state = "All categories";
    } else {
      if (categ.includes("+")) {
        const UrlResearch = new URL(document.location.href).searchParams,
          Urlcategories = UrlResearch.get("category"),
          reg = /,/gi;
        presenceData.state = "Categories: " + Urlcategories.replace(reg, ", ");
      } else {
        presenceData.state = "Category: " + categ;
      }
    }
    presenceData.details = "Browsing fonts";
  } else if (path.includes("/specimen")) {
    const fontName = document.querySelector(
        "#main-content > gf-sticky-header > div > h1"
      ).textContent,
      fontMenu = document.getElementsByClassName("gf-nav__link--active")[0]
        .textContent;
    presenceData.details = "Looking at font: " + fontName;
    presenceData.state = 'Viewing the "' + fontMenu.trim() + '" tab';
    if (showButton) {
      presenceData.buttons = [
        {
          label: "View font",
          url: document.URL
        }
      ];
    }
  } else if (path === "/featured") {
    presenceData.details = "Looking at the featured fonts";
  } else if (path.includes("/featured/")) {
    let featuredFonts;
    if (document.getElementsByClassName("gmat-headline-1")[0]) {
      featuredFonts = document.getElementsByClassName("gmat-headline-1")[0]
        .textContent;
    } else if (!document.getElementsByClassName("gmat-headline-1")[0]) {
      featuredFonts = document.getElementsByClassName("gmat-headline-4")[0]
        .textContent;
    }
    presenceData.details = "Looking at a featured font:";
    presenceData.state = featuredFonts;

    if (showButton) {
      presenceData.buttons = [
        {
          label: "View featured font",
          url: document.URL
        }
      ];
    }
  } else if (path === "/about") {
    presenceData.details = "Viewing the about page";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
