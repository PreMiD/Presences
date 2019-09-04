const presence = new Presence({
  clientId: "618138980273094695",
  mediaKeys: false
});
const AMAZON_URL_REGEX = /www\.amazon\.(de|ca|cn|es|fr|nl|in|co\.jp|ae|co\.uk|com(\.(tr|br|au))?)/;
const startTimestamp = Math.floor(Date.now() / 1000);

function updateDropdownPresenceData(
  dropdown: HTMLSelectElement,
  presenceData: presenceData
): void {
  const selectedValueStr = dropdown.value;
  const selectedOption: HTMLOptionElement = document.querySelector(
    `#searchDropdownBox > option[value="${selectedValueStr}"]`
  );

  presenceData.details = "Browsing category:";
  presenceData.state = selectedOption.innerText;
}

presence.on("UpdateData", async () => {
  const { hostname, pathname } = window.location;
  const presenceData: presenceData = {
    largeImageKey: "amazon",
    startTimestamp
  };

  if (hostname.match(AMAZON_URL_REGEX) === null) {
    presence.setActivity();
    presence.setTrayTitle();
    return;
  }

  const productTitleSpan: HTMLSpanElement = document.querySelector(
    "span#productTitle"
  );
  const primeVideoTitle: HTMLHeadingElement = document.querySelector(
    "#a-page > div.av-page-desktop.avu-retail-page > div.avu-content.avu-section > div > div > div.DVWebNode-detail-atf-wrapper.DVWebNode > div.av-detail-section > div > h1"
  );
  const searchTermSpan: HTMLSpanElement = document.querySelector(
    "#search > span > h1 > div > div.sg-col-14-of-20.sg-col-26-of-32.sg-col-18-of-24.sg-col.sg-col-22-of-28.s-breadcrumb.sg-col-10-of-16.sg-col-30-of-36.sg-col-6-of-12 > div > div > span.a-color-state.a-text-bold"
  );
  const gcAsinTitle: HTMLSpanElement = document.querySelector("#gc-asin-title");

  if (productTitleSpan !== null) {
    const productTitle = productTitleSpan.innerText;

    presenceData.details = "Viewing product:";
    presenceData.state =
      productTitle.length > 128
        ? productTitle.substring(0, 125) + "..."
        : productTitle;
  } else if (primeVideoTitle !== null) {
    presenceData.details = "Viewing Prime Video:";
    presenceData.state = primeVideoTitle.innerText;
  } else if (pathname.includes("/s") && searchTermSpan !== null) {
    presenceData.details = "Searching for:";
    presenceData.state = searchTermSpan.innerText;
    presenceData.smallImageKey = "search";
  } else if (gcAsinTitle !== null) {
    const title = gcAsinTitle.innerText;

    presenceData.details = "Viewing product:";
    presenceData.state =
      title.length > 128 ? title.substring(0, 125) + "..." : title;
  } else if (pathname.includes("/profile")) {
    const nameSpan: HTMLSpanElement = document.querySelector(
      "#customer-profile-name-header > div.a-row.a-spacing-none.name-container > span"
    );
    presenceData.details = "Viewing profile:";
    presenceData.state = nameSpan.innerText;
  } else if (pathname.includes("/store")) {
    presenceData.details = "Viewing store:";
    presenceData.state = document.title.split(":")[1];
  } else if (pathname.includes("/history")) {
    presenceData.details = "Viewing their history";
  } else if (pathname.includes("/gift-cards")) {
    presenceData.details = "Viewing Giftcards";
  } else if (pathname.includes("/yourstore")) {
    presenceData.details = "Viewing recommended";
  } else if (pathname.includes("/wishlist")) {
    presenceData.details = "Viewing their wishlist";
  } else if (pathname.includes("/cart")) {
    presenceData.details = "Viewing their cart";
  } else if (pathname.includes("/order-history")) {
    presenceData.details = "Viewing their";
    presenceData.state = "order history";
  } else if (pathname.includes("/order-details")) {
    presenceData.details = "Viewing their";
    presenceData.state = "order details";
  } else if (pathname.includes("/amazonprime")) {
    presenceData.details = "Viewing Amazon Prime";
  } else if (pathname.includes("/site-directory")) {
    presenceData.details = "Viewing all categories";
  } else if (pathname.includes("/yourpets")) {
    presenceData.details = "Viewing pets";
  } else if (pathname.includes("/addresses")) {
    presenceData.details = "Viewing addresses";
  } else if (pathname.includes("/managepaymentmethods")) {
    presenceData.details = "Viewing payment methods";
  } else if (pathname.includes("/balance")) {
    presenceData.details = "Viewing their balance";
  } else if (pathname.includes("/adprefs")) {
    presenceData.details = "Viewing their adprefs";
  } else if (pathname.includes("/yourmembershipsandsubscriptions")) {
    presenceData.details = "Viewing subscriptions";
  } else if (
    document.location.search.includes("nav_youraccount_ya") ||
    pathname.includes("/your-account")
  ) {
    presenceData.details = "Viewing their account";
  } else if (pathname.includes("/help/")) {
    presenceData.details = "Viewing Help Center";
  } else if (document.querySelector("#searchDropdownBox") !== null) {
    const dropdown: HTMLSelectElement = document.querySelector(
      "#searchDropdownBox"
    );

    updateDropdownPresenceData(dropdown, presenceData);
    dropdown.onchange = () =>
      updateDropdownPresenceData(dropdown, presenceData);
  }

  if (!presenceData.details) {
    presence.setActivity();
    presence.setTrayTitle();
  } else {
    presence.setActivity(presenceData);
  }
});
