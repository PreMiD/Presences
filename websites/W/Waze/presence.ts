const presence = new Presence({
    clientId: "854718080433520661",
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: ~~(Date.now() / 1000),
  },
  pages: { [key: string]: string } = {
    "/": "Homepage",
    "/waze-app/": "Mobile App",
    "/waze/": "Features",
    "/carpool/": "Waze Carpool",
    "/events/": "Events",
    "/partners/": "Partners",
    "/wazeforcities/": "Waze for Cities",
    "/product-partners/": "Product Partners",
    "/ads/": "Waze Ads",
    "/carpool/companies/": "Carpool Partners",
    "/editor/": "Map Editor",
    "/about/": "About Us",
    "/careers/": "Waze Careers",
    "/contact/": "Contact Us",
    "/communities": "Waze Communities",
    "/legal/tos/": "Terms of Use",
    "/legal/privacy/": "Privacy Policy",
    "/legal/copyright/": "Copyright Policy",
    "/ccp": "Waze for Cities",
    "/forum/": "Forum",
    "/press/": "Press",
  };

let path: string, start: string, end: string, mapelem: string, maploc: string;

function fnd() {
  path = window.location.pathname;
  if (!path.endsWith("/")) path = `${path}/`;
  path = path.replace(/(\/[a-z]{2}|\/[a-z]{2}-[A-Z]{2})\//, "/");

  if (path.includes("/live-map")) {
    start =
      document.querySelector<HTMLSpanElement>(
        "div.wz-search-container.is-origin > div > div > div.wm-search__selected > span.wm-search__primary"
      )?.textContent ?? "somewhere";
    end =
      document.querySelector<HTMLSpanElement>(
        "div.wz-search-container.is-destination > div > div > div.wm-search__selected > span.wm-search__primary"
      )?.textContent ?? "somewhere";

    presenceData.details = "Planning a route";
    presenceData.state = `From ${start} to ${end}`;
  } else if (path.includes("/editor")) {
    if (
      document.querySelector<HTMLSpanElement>(
        "#segment-edit-general > ul > li.length-attribute"
      )
    ) {
      let fullRoadName =
        document.querySelector<HTMLSpanElement>(
          "#segment-edit-general > div.address-edit > div > div.clearfix.preview > div.full-address-container > span"
        )?.textContent ?? "Roads";
      let roadName = fullRoadName.split(",");
      mapelem = roadName[0];
    } else if (
      document.querySelector<HTMLSpanElement>(
        "#venue-edit-general > form > div:nth-child(1) > div:nth-child(2)"
      )
    ) {
      let placecat = document.querySelectorAll(".category-name");
      if (placecat[0].innerHTML.length == 0) {
        mapelem = "a place";
      } else {
        mapelem = "a " + placecat[0].innerHTML.toLowerCase();
      }
    } else {
      mapelem = "something";
    }
    maploc =
      document.querySelector<HTMLSpanElement>(
        "#topbar-container > div > div > div.location-info-region > div > span"
      )?.textContent ?? "somewhere";

    presenceData.details = `Editing ${mapelem} on the map`;
    presenceData.state = `Near ${maploc}`;
  } else {
    presenceData.details = "Browsing";
    presenceData.state = pages[path] ?? null;
  }
}
fnd();
setInterval(fnd, 5000);
presence.on("UpdateData", async () => {
  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});
