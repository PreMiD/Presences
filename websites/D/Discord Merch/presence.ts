const presence = new Presence({
  clientId: "792386383943172136"
});

presence.on("UpdateData", () => {
  const doc = document.location,
    path = doc.pathname,
    route = path.split("/"),
    browsingStamp = Math.floor(Date.now() / 1000),
    presenceData: PresenceData = {
      largeImageKey: "lg",
      startTimestamp: browsingStamp
    };

  if (path == "/") {
    presenceData.details = "Browsing the homepage";
  } else if (route[1] == "collections") {
    if (route[2] == "all") {
      if (route[3] == "products") {
        presenceData.details = "Viewing a product";
        presenceData.state = document.getElementsByClassName("product-single__title")[0].textContent;
      } else {
        presenceData.details = "Browsing all products";
      }
    } else if (route[2] == "cool-kids") {
      if (route[3] == "products") {
        presenceData.details = "Viewing a product";
        presenceData.state = document.getElementsByClassName("product-single__title")[0].textContent;
      } else {
        presenceData.details = "Viewing the Dark Theme collection";
      }
    } else if (route[2] == "snowsgiving-2020") {
      if (route[3] == "products") {
        presenceData.details = "Viewing a product";
        presenceData.state = document.getElementsByClassName("product-single__title")[0].textContent;
      } else {
        presenceData.details = "Viewing the Snowsgiving collection";
      }
    }
  } else if (route[1] == "products") {
    if (route[2]) {
      presenceData.details = "Viewing a product";
      presenceData.state = document.getElementsByClassName("product-single__title")[0].textContent;
    } else {
      presenceData.details = "Browsing the catalog";
    }
  } else if (route[1] == "cart") {
    presenceData.details = "Viewing their cart";
  } else if (route[1] == "pages") {
    if (route[2] == "contact") {
      presenceData.details = "Viewing the contact us page";
    } else if (route[2] == "faq") {
      presenceData.details = "Reading the frequently asked questions";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
