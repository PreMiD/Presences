const presence = new Presence({
    clientId: "841014953439264841"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const time = await presence.getSetting("time"),
    buttons = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };

  switch (document.domain.split(".")[0]) {
    case "www":
      if (document.location.pathname.includes("/compare/")) {
        presenceData.details = "Comparing Products";
        presenceData.state = (document.querySelectorAll("select._9ere").item(0) as HTMLSelectElement).value.toUpperCase().replace("-", " ")
          + " / "
          + (document.querySelectorAll("select._9ere").item(1) as HTMLSelectElement).value.toUpperCase().replace("-", " ");
      }
      else if (document.location.pathname.includes("/cart/")) {
        presenceData.details = "Viewing Cart";
        if (document.querySelectorAll("span.rbpbduva.slrhy5ou.ozgaokry.ghiirjs1.mm8y8im2.i7qx9w64.rhjqn6gv.p5bjl15m.rz0v8pod.mnbq7hy4").item(1) !== null)
          presenceData.state = document.querySelector("h6.rbpbduva.slrhy5ou.ttdjqg0v.djm2tae1.ldul3zmy.ldt1369w.dos3uok6.mm8y8im2.e5fbeixf.i13o4lny.tcjo4660.mnbq7hy4").textContent
            + " ("
            + document.querySelectorAll("span.rbpbduva.slrhy5ou.ozgaokry.ghiirjs1.mm8y8im2.i7qx9w64.rhjqn6gv.p5bjl15m.rz0v8pod.mnbq7hy4").item(1).textContent
            + ")";
        else
          presenceData.state = document.querySelector("h6.rbpbduva.slrhy5ou.ttdjqg0v.djm2tae1.ldul3zmy.ldt1369w.dos3uok6.mm8y8im2.e5fbeixf.i13o4lny.tcjo4660.mnbq7hy4").textContent;
      }
      else if (document.location.pathname.includes("/blog/")) {
        if (document.getElementById("blog-heading").textContent === "Blog")
        presenceData.details = "Browsing Blogs";
        else if (document.getElementById("blog-heading") !== null) {
          presenceData.details = "Viewing Blog Post"
          presenceData.state = document.getElementById("blog-heading").textContent;
          presenceData.buttons = [
            {
              label: "View Page",
              url: document.location.href
            }
          ];
        }
      }
      else if (document.location.pathname.includes("/rift-s/")) {
        presenceData.buttons = [
          {
            label: "View Page",
            url: document.location.href
          }
        ];
        presenceData.details = "Viewing Product";
        presenceData.state = "Rift S";
        presenceData.smallImageKey = "rifts";
        if (document.location.pathname.includes("/accessories/"))
          presenceData.details = "Viewing Accessories";
        else if (document.location.pathname.includes("/where-to-buy/"))
          presenceData.details = "Viewing Retailers";
        else if (document.location.pathname.includes("/features/"))
          presenceData.details = "Viewing Features";
      }
      else if (document.location.pathname.includes("/quest-2/")) {
        presenceData.details = "Viewing Product";
        presenceData.state = "Quest 2";
        presenceData.smallImageKey = "quest2";
        if (document.location.pathname.includes("/accessories/"))
          presenceData.details = "Viewing Accessories";
      }
      else if (document.location.pathname.includes("/experiences/")) {
        if (document.location.pathname.includes("/rift/")) {
          presenceData.details = "Browsing Rift Apps";
          if (document.location.pathname.includes("/search")) {
            presenceData.details = "Searching Rift Apps";
            presenceData.state = document.querySelector("div.disco-search__query").textContent;
          }
          else if (document.location.pathname.includes("/section/")) {
            presenceData.state = "Category: " + document.querySelector("div.section-header__title").textContent;
          }
          else if (document.querySelector("div.app-description__title") !== null) {
            presenceData.state = document.querySelector("div.app-description__title").textContent;
            presenceData.buttons = [
              {
                label: "View Page",
                url: document.location.href
              }
            ];
            switch (document.querySelector("a.buy-box-detail__label.buy-box-detail__label--link.link.link--clickable").textContent) {
              case "Comfortable":
                presenceData.smallImageKey = "comfortable";
                presenceData.smallImageText = "Comfort: Comfortable";
                break;
              case "Comfort: Moderate":
                presenceData.smallImageKey = "moderate";
                presenceData.smallImageText = "Comfort: Moderate";
                break;
              case "Comfort: Intense":
                presenceData.smallImageKey = "intense";
                presenceData.smallImageText = "Comfort: Intense";
                break;
              case "Comfort: Unrated":
                presenceData.smallImageKey = "unrated";
                presenceData.smallImageText = "Comfort: Unrated";
                break;
            }
          }
        }
        else if (document.location.pathname.includes("/quest/")) {
          presenceData.details = "Browsing Quest Apps";
          if (document.location.pathname.includes("/search")) {
            presenceData.details = "Searching Quest Apps";
            presenceData.state = document.querySelector("div.disco-search__query").textContent;
          }
          else if (document.location.pathname.includes("/section/")) {
            presenceData.state = "Category: " + document.querySelector("div.section-header__title").textContent;
          }
          else if (document.querySelector("div.app-description__title") !== null) {
            presenceData.state = document.querySelector("div.app-description__title").textContent;
            presenceData.buttons = [
              {
                label: "View Page",
                url: document.location.href
              }
            ];
            switch (document.querySelector("a.buy-box-detail__label.buy-box-detail__label--link.link.link--clickable").textContent) {
              case "Comfortable":
                presenceData.smallImageKey = "comfortable";
                presenceData.smallImageText = "Comfort: Comfortable";
                break;
              case "Comfort: Moderate":
                presenceData.smallImageKey = "moderate";
                presenceData.smallImageText = "Comfort: Moderate";
                break;
              case "Comfort: Intense":
                presenceData.smallImageKey = "intense";
                presenceData.smallImageText = "Comfort: Intense";
                break;
              case "Comfort: Unrated":
                presenceData.smallImageKey = "unrated";
                presenceData.smallImageText = "Comfort: Unrated";
                break;
            }
          }
        }
        else if (document.location.pathname.includes("/go/")) {
          presenceData.details = "Browsing Go Apps";
          if (document.location.pathname.includes("/search")) {
            presenceData.details = "Searching Go Apps";
            presenceData.state = document.querySelector("div.disco-search__query").textContent;
          }
          else if (document.location.pathname.includes("/section/")) {
            presenceData.state = "Category: " + document.querySelector("div.section-header__title").textContent;
          }
          else if (document.querySelector("div.app-description__title") !== null) {
            presenceData.state = document.querySelector("div.app-description__title").textContent;
            presenceData.buttons = [
              {
                label: "View Page",
                url: document.location.href
              }
            ];
            switch (document.querySelector("a.buy-box-detail__label.buy-box-detail__label--link.link.link--clickable").textContent) {
              case "Comfortable":
                presenceData.smallImageKey = "comfortable";
                presenceData.smallImageText = "Comfort: Comfortable";
                break;
              case "Comfort: Moderate":
                presenceData.smallImageKey = "moderate";
                presenceData.smallImageText = "Comfort: Moderate";
                break;
              case "Comfort: Intense":
                presenceData.smallImageKey = "intense";
                presenceData.smallImageText = "Comfort: Intense";
                break;
              case "Comfort: Unrated":
                presenceData.smallImageKey = "unrated";
                presenceData.smallImageText = "Comfort: Unrated";
                break;
            }
          }
        }
        else if (document.location.pathname.includes("/gear-vr/")) {
          presenceData.details = "Browsing Gear VR Apps";
          if (document.location.pathname.includes("/search")) {
            presenceData.details = "Searching Gear VR Apps";
            presenceData.state = document.querySelector("div.disco-search__query").textContent;
          }
          else if (document.location.pathname.includes("/section/")) {
            presenceData.state = "Category: " + document.querySelector("div.section-header__title").textContent;
          }
          else if (document.querySelector("div.app-description__title") !== null) {
            presenceData.state = document.querySelector("div.app-description__title").textContent;
            presenceData.buttons = [
              {
                label: "View Page",
                url: document.location.href
              }
            ];
            switch (document.querySelector("a.buy-box-detail__label.buy-box-detail__label--link.link.link--clickable").textContent) {
              case "Comfortable":
                presenceData.smallImageKey = "comfortable";
                presenceData.smallImageText = "Comfort: Comfortable";
                break;
              case "Comfort: Moderate":
                presenceData.smallImageKey = "moderate";
                presenceData.smallImageText = "Comfort: Moderate";
                break;
              case "Comfort: Intense":
                presenceData.smallImageKey = "intense";
                presenceData.smallImageText = "Comfort: Intense";
                break;
              case "Comfort: Unrated":
                presenceData.smallImageKey = "unrated";
                presenceData.smallImageText = "Comfort: Unrated";
                break;
            }
          }
        }
      }
      else if (document.location.pathname.includes("/")) {
        presenceData.details = "Viewing Homepage";
      }
      break;
    case "support":
      presenceData.details = "Browsing Support";
      if (document.querySelector("a[href='/" + document.location.href.split("/")[3] + "/']") !== null) {
        presenceData.state = document.querySelector("a[href='/" + document.location.href.split("/")[3] + "/']").textContent;
        if (document.querySelector("a[href='/" + document.location.href.split("/")[3] + "/']").parentElement.parentElement.parentElement !== null)
          if (document.querySelector("a[href='/" + document.location.href.split("/")[3] + "/']").parentElement.parentElement.parentElement.localName.includes("li"))
            presenceData.state = document.querySelector("a[href='/"
              + document.location.href.split("/")[3]
              + "/']").parentElement.parentElement.parentElement.children.item(1).textContent
              + " / "
              + document.querySelector("a[href='/"
                + document.location.href.split("/")[3]
                + "/']").textContent;

        if (document.querySelector("a[href='/" + document.location.href.split("/")[3] + "/']").parentElement.parentElement.parentElement.parentElement.parentElement !== null)
          if (document.querySelector("a[href='/" + document.location.href.split("/")[3] + "/']").parentElement.parentElement.parentElement.parentElement.parentElement.localName.includes("li"))
            presenceData.state = document.querySelector("a[href='/"
              + document.location.href.split("/")[3]
              + "/']").parentElement.parentElement.parentElement.parentElement.parentElement.children.item(1).textContent
              + " / " + document.querySelector("a[href='/"
                + document.location.href.split("/")[3]
                + "/']").parentElement.parentElement.parentElement.children.item(1).textContent
              + " / " + document.querySelector("a[href='/"
                + document.location.href.split("/")[3]
                + "/']").textContent;
      }
      else if (document.querySelector("a[href='/" + document.location.href.split("/")[3] + "']") !== null) {
        presenceData.state = document.querySelector("a[href='/" + document.location.href.split("/")[3] + "']").textContent;
        if (document.querySelector("a[href='/" + document.location.href.split("/")[3] + "']").parentElement.parentElement.parentElement !== null)
          if (document.querySelector("a[href='/" + document.location.href.split("/")[3] + "']").parentElement.parentElement.parentElement.localName.includes("li"))
            presenceData.state = document.querySelector("a[href='/"
              + document.location.href.split("/")[3]
              + "']").parentElement.parentElement.parentElement.children.item(1).textContent
              + " / "
              + document.querySelector("a[href='/"
                + document.location.href.split("/")[3]
                + "']").textContent;

        if (document.querySelector("a[href='/" + document.location.href.split("/")[3] + "']").parentElement.parentElement.parentElement.parentElement.parentElement !== null)
          if (document.querySelector("a[href='/" + document.location.href.split("/")[3] + "']").parentElement.parentElement.parentElement.parentElement.parentElement.localName.includes("li"))
            presenceData.state = document.querySelector("a[href='/"
              + document.location.href.split("/")[3]
              + "']").parentElement.parentElement.parentElement.parentElement.parentElement.children.item(1).textContent
              + " / " + document.querySelector("a[href='/"
                + document.location.href.split("/")[3]
                + "']").parentElement.parentElement.parentElement.children.item(1).textContent
              + " / " + document.querySelector("a[href='/"
                + document.location.href.split("/")[3]
                + "']").textContent;
      }
      else if (document.querySelector("a[href='#" + document.location.href.split("#")[1] + "']") !== null)
        presenceData.state = document.querySelector("a[href='#" + document.location.href.split("#")[1] + "']").textContent;
      else if (document.querySelector("a[href='#faq_" + document.location.href.split("/")[3] + "']") !== null)
        presenceData.state = document.querySelector("a[href='#faq_" + document.location.href.split("/")[3] + "']").textContent;
      if (document.location.pathname !== "/")
        presenceData.buttons = [
          {
            label: "View Page",
            url: document.location.href
          }
        ];
      break;
    case "forums":
      if (document.getElementById("list") !== null) {
        switch (document.getElementById("list").children.item(0).textContent.slice(0, -4).slice(5)) {
          case "community":
            presenceData.details = "Community Forums";
            break;
          case "developer":
            presenceData.details = "Developer Forums";
            break;
        }
        switch (document.getElementById("list").children.length) {
          case 3:
            presenceData.state = document.getElementById("list").children.item(2).textContent.slice(0, -4).slice(5);
            break;
          case 5:
            presenceData.state = document.getElementById("list").children.item(2).textContent.slice(0, -4).slice(5) + " > " + document.getElementById("list").children.item(4).textContent.slice(0, -4).slice(5);
            if (document.querySelector(".lia-message-subject") !== null) {
              presenceData.state = document.getElementById("list").children.item(2).textContent.slice(0, -4).slice(5) + " > " + document.querySelector(".lia-message-subject").textContent.slice(64);
              presenceData.buttons = [
                {
                  label: "View Post",
                  url: document.location.href
                }
              ]
            }
            break;
        }
      }
      else {
        presenceData.details = "Browsing Forums";
        if (document.location.pathname.includes("/searchpage/")) {
          presenceData.details = "Searching Forum " + document.querySelector(".tab-link.lia-link-disabled").textContent;
          presenceData.state = (document.getElementById("lia-searchQuery") as HTMLInputElement).value;
        }
      }
      break;
    case "secure":
      presenceData.details = "Secure Pages";
      presenceData.state = "Viewing " + document.querySelector("h3").textContent;
      if (document.location.pathname.includes("/referrals/"))
        presenceData.state = "Viewing Referrals";
      break;
    case "tickets":
      presenceData.details = "Submitting Ticket";
      break;
    default:
      presenceData.details = "Unsupported Subdomain";
      break;
  }
  if (!time) delete presenceData.startTimestamp;

  if (!buttons) delete presenceData.buttons;

  presence.setActivity(presenceData);
});
