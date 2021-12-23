const presence = new Presence({
    clientId: "631566704648126503"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);
let user: HTMLElement,
  title: HTMLElement,
  replace: HTMLElement,
  search: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "9gag",
    startTimestamp: browsingTimestamp
  };

  if (document.location.hostname === "9gag.com") {
    if (document.location.pathname === "/")
      presenceData.details = "Viewing home page";
    else if (document.location.pathname.includes("/u/")) {
      user = document.querySelector(
        "#container > div.page > div.main-wrap > div > section > header > h2"
      );
      presenceData.details = "Viewing user:";
      presenceData.state = user.textContent;
    } else if (
      document.querySelector(
        "#container > div.page > div.main-wrap > div.profile > section > header > h2"
      )
    ) {
      user = document.querySelector(
        "#container > div.page > div.main-wrap > div.profile > section > header > h2"
      );

      presenceData.details = "Viewing catagory:";
      presenceData.state = user.textContent;
    } else if (document.location.pathname.includes("/gag/")) {
      title = document.querySelector(
        "#individual-post > article > header > h1"
      );

      presenceData.details = "Viewing gag:";
      if (title.textContent.length > 128)
        presenceData.state = `${title.textContent.substring(0, 125)}...`;
      else presenceData.state = title.textContent;
    } else if (document.location.pathname.includes("/hot"))
      presenceData.details = "Viewing what's hot";
    else if (document.location.pathname.includes("/trending"))
      presenceData.details = "Viewing what's trending";
    else if (document.location.pathname.includes("/fresh"))
      presenceData.details = "Viewing what's fresh";
    else if (document.location.pathname.includes("/tag")) {
      title = document.querySelector(
        "#container > div.page > div.main-wrap > div.profile > section > header > h1"
      );

      presenceData.details = "Viewing tag:";
      presenceData.state = title.textContent;
    } else if (document.location.pathname.includes("/search")) {
      search = document.querySelector("#search-hero");

      presenceData.details = "Searching for:";
      presenceData.state = (search as HTMLInputElement).value;
      presenceData.smallImageKey = "search";
    }
  } else if (document.location.hostname === "about.9gag.com") {
    presenceData.details = "Reading all about 9GAG";
    presenceData.smallImageKey = "reading";
  } else if (document.location.hostname === "shop.9gag.com") {
    if (document.location.pathname === "/")
      presenceData.details = "Viewing store page";
    else if (document.location.pathname.includes("/products/")) {
      title = document.querySelector(
        "#ProductSection-product-template > div > div:nth-child(2) > div.product-single__meta > h1"
      );

      presenceData.details = "Shop - Viewing product:";
      presenceData.state = title.textContent;
    } else if (document.location.pathname.includes("/collections/")) {
      title = document.querySelector(
        "#shopify-section-collection-template > div > header > div > div > h1 > span"
      );
      replace = document.querySelector(
        "#shopify-section-collection-template > div > header > div > div > h1 > span > span"
      );

      presenceData.details = "Shop - Viewing collection:";
      presenceData.state = title.textContent.replace(replace.textContent, "");
    } else if (document.location.pathname.includes("/cart"))
      presenceData.details = "Shop - Viewing their cart";
    else if (document.location.pathname.includes("/search")) {
      search = document.querySelector("#SearchInput");

      presenceData.details = "Shop - Searching for:";
      presenceData.state = (search as HTMLInputElement).value;
      presenceData.smallImageKey = "search";
    }
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
