const presence = new Presence({
    clientId: "650464804276011009"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "large_logo",
        startTimestamp: new Date().getTime()
    };
    const path = document.location.pathname;
    if (path === "/") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Home Page";
    }
    else if (path === "/menu") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Menu";
    }
    else if (path === "/deals/storedeals") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Viewing in-store deals";
    }
    else if (path.startsWith("/menu/pizza/999")) {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Creating a custom pizza";
    }
    else if (path.startsWith("/deals/deal") &&
        Number(path.split("/")[path.split("/").length - 1])) {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Customising a deal";
    }
    else if (path === "/user/login") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Logging in...";
    }
    else if (path === "/user/register") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Creating an account";
    }
    else if (path === "/welcome") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Home Page";
    }
    else if (path === "/store/moreinfo") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Viewing store info";
    }
    else if (path.startsWith("/storefinder/bystoreid")) {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Finding stores";
    }
    else if (path === "/mydominos/addressbook") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Viewing my addresses";
    }
    else if (path === "/mydominos") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Viewing my profile";
    }
    else if (path === "/mydominos/favourites") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Viewing my favourited orders";
    }
    else if (path === "/mydominos/offers") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Entering a promo code";
    }
    else if (path === "/mydominos/paymentmethods") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Adding a payment method";
    }
    else if (path === "/mydominos/personaldetails") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Editing personal details";
    }
    else if (path === "/mydominos/savedpizzas") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Viewing saved pizzas";
    }
    else if (path === "/mydominos/security") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Changing password";
    }
    else if (path === "/contact") {
        presenceData.details = "Browing Domino's Pizza";
        presenceData.state = "Contacting support";
    }
    else if (path === "/basketdetails/show") {
        const price = document.getElementsByClassName("new-basket-total-price basket-price")[0];
        const saving = document.getElementsByClassName("new-basket-total-price basket-alt-price")[0];
        let priceText, savingText;
        if (price) {
            priceText = price.innerHTML;
        }
        if (saving) {
            savingText = saving.innerHTML;
        }
        presenceData.details = "Viewing cart";
        presenceData.state = `Total: ${priceText} ${saving ? `(${savingText} saved)` : ""}`;
    }
    else {
        presenceData.details = "Browing Domino's Pizza";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFlBQVk7UUFDM0IsY0FBYyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO0tBQ3JDLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUV4QyxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7UUFDaEIsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztRQUNoRCxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztLQUNsQztTQUFNLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUMzQixZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO1FBQ2hELFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQzdCO1NBQU0sSUFBSSxJQUFJLEtBQUssbUJBQW1CLEVBQUU7UUFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztRQUNoRCxZQUFZLENBQUMsS0FBSyxHQUFHLHdCQUF3QixDQUFDO0tBQy9DO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDN0MsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztRQUNoRCxZQUFZLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFDO0tBQ2hEO1NBQU0sSUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFD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