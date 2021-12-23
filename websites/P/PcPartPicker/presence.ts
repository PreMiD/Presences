const presence = new Presence({
    clientId: "857912880947265566"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "pcpartpicker_logo_",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location;

  if (pathname === "/") presenceData.details = "Browsing Home Page";
  else if (pathname.startsWith("/guide/")) {
    const title: HTMLHeadingElement = document.querySelector(
        "h1.pageTitle.guide__title"
      ),
      price: HTMLTableDataCellElement = document.querySelector(
        "tr.tr__total.tr__total--final > td.td__price"
      );
    presenceData.details = title
      ? `Browsing ${title.textContent}`
      : "Browsing Guide";
    if (price) presenceData.state = `Price: ${price.textContent}`;
    presenceData.buttons = [
      {
        label: "Browse Guide",
        url: document.location.href
      }
    ];
  } else if (pathname.startsWith("/b/")) {
    const build: HTMLHeadingElement = document.querySelector(
        "h1.pageTitle.build__name"
      ),
      user: HTMLAnchorElement = document.querySelector("div.user > a"),
      price: HTMLTableDataCellElement = document.querySelector(
        "tr.tr__total.tr__total--grandtotal > td.td__price"
      );
    if (build && user)
      presenceData.details = `Viweing ${build.textContent} by ${user.textContent}`;
    if (price) presenceData.state = `Price: ${price.textContent}`;
    presenceData.buttons = [
      {
        label: "View Build",
        url: document.location.href
      }
    ];
  } else if (pathname.startsWith("/product/")) {
    const productType: HTMLAnchorElement = document.querySelector(
        "section.breadcrumb > ol.list-unstyled > li > a"
      ),
      productName: HTMLHeadingElement = document.querySelector("h1.pageTitle");
    if (productType)
      presenceData.details = `Looking at ${productType.textContent}`;
    if (productName) presenceData.state = productName.textContent;
    presenceData.buttons = [
      {
        label: "Look at product",
        url: document.location.href
      }
    ];
  } else if (pathname.startsWith("/products/")) {
    presenceData.details =
      pathname === "/products/"
        ? "Viewing All Product List"
        : `Looking for ${pathname
            .substring(10, pathname.lastIndexOf("/"))
            .split("-")
            .join(" ")
            .replace(/\b\w/g, c => c.toUpperCase())}`; // Capitalize first char of every word
  } else if (pathname.startsWith("/user/")) {
    const [, , username, section = ""] = pathname.split("/");
    presenceData.details = `Viewing ${username}'s ${
      section === "" ? "profile" : section
    }`;
    presenceData.buttons = [
      {
        label: "View User",
        url: document.location.href
      }
    ];
  } else if (pathname.startsWith("/list/")) {
    const price: HTMLTableDataCellElement = document.querySelector(
        "tr.tr__total.tr__total--final > td.td__price"
      ),
      link: HTMLInputElement = document.querySelector(
        "div.actionBox.actionBox__permalink > input.text-input"
      );
    presenceData.details = "Building System";
    presenceData.state = price ? `Price: ${price.textContent}` : "Price: $0";
    if (link) {
      presenceData.buttons = [
        {
          label: "View System",
          url: link.value
        }
      ];
    }
  } else if (pathname.startsWith("/forums/")) {
    const topic: HTMLHeadingElement = document.querySelector("h1.pageTitle");
    presenceData.details = "Browsing Forums";
    if (topic) {
      presenceData.state = topic.textContent;
      presenceData.buttons = [
        {
          label: "View Thread",
          url: document.location.href
        }
      ];
    }
  } else if (pathname.startsWith("/trends/")) {
    presenceData.details = "Looking at price trends";
    if (pathname !== "/trends/") {
      presenceData.state = `for ${
        document.querySelector("h1.pageTitle").textContent
      }`;
    }
    presenceData.buttons = [
      {
        label: "View Trends",
        url: document.location.href
      }
    ];
  } else if (pathname.startsWith("/builds/"))
    presenceData.details = "Viewing Completed Builds";
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
