const presence = new Presence({
  clientId: "650464804276011009"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "large_logo",
      startTimestamp: new Date().getTime()
    },
    path = document.location.pathname;

  if (path === "/") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Home Page";
  } else if (path === "/menu") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Menu";
  } else if (path === "/deals/storedeals") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Viewing in-store deals";
  } else if (path.startsWith("/menu/pizza/999")) {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Creating a custom pizza";
  } else if (
    path.startsWith("/deals/deal") &&
    Number(path.split("/")[path.split("/").length - 1])
  ) {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Customising a deal";
  } else if (path === "/user/login") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Logging in...";
  } else if (path === "/user/register") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Creating an account";
  } else if (path === "/welcome") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Home Page";
  } else if (path === "/store/moreinfo") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Viewing store info";
  } else if (path.startsWith("/storefinder/bystoreid")) {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Finding stores";
  } else if (path === "/mydominos/addressbook") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Viewing my addresses";
  } else if (path === "/mydominos") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Viewing my profile";
  } else if (path === "/mydominos/favourites") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Viewing my favourited orders";
  } else if (path === "/mydominos/offers") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Entering a promo code";
  } else if (path === "/mydominos/paymentmethods") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Adding a payment method";
  } else if (path === "/mydominos/personaldetails") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Editing personal details";
  } else if (path === "/mydominos/savedpizzas") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Viewing saved pizzas";
  } else if (path === "/mydominos/security") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Changing password";
  } else if (path === "/contact") {
    presenceData.details = "Browing Domino's Pizza";
    presenceData.state = "Contacting support";
  } else if (path === "/basketdetails/show") {
    const [price] = document.getElementsByClassName(
        "new-basket-total-price basket-price"
      ),
      [saving] = document.getElementsByClassName(
        "new-basket-total-price basket-alt-price"
      );

    let priceText, savingText;

    if (price) priceText = price.innerHTML;

    if (saving) savingText = saving.innerHTML;

    presenceData.details = "Viewing cart";
    presenceData.state = `Total: ${priceText} ${
      saving ? `(${savingText} saved)` : ""
    }`;
  } else presenceData.details = "Browing Domino's Pizza";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
