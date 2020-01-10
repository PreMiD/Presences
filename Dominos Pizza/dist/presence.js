let presence = new Presence({
    clientId: "650464804276011009"
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "large_logo",
        startTimestamp: new Date().getTime()
    };

    const path = document.location.pathname;

    if (path === '/') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Home Page";
		presence.setActivity(presenceData);
	} else if (path === '/menu') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Menu";
		presence.setActivity(presenceData);
	} else if (path === '/deals/storedeals') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Viewing in-store deals";
		presence.setActivity(presenceData);
	} else if (path.startsWith('/menu/pizza/999')) {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Creating a custom pizza";
		presence.setActivity(presenceData);
	} else if (path.startsWith('/deals/deal') && Number(path.split('/')[path.split('/').length - 1])) {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Customising a deal";
		presence.setActivity(presenceData);
	} else if (path === '/user/login') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Logging in...";
		presence.setActivity(presenceData);
	} else if (path === '/user/register') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Creating an account";
		presence.setActivity(presenceData);
	} else if (path === '/welcome') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Home Page";
		presence.setActivity(presenceData);
	} else if (path === '/store/moreinfo')  {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Viewing store info";
		presence.setActivity(presenceData);
	} else if (path.startsWith('/storefinder/bystoreid')) {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Finding stores";
		presence.setActivity(presenceData);
	} else if (path === '/mydominos/addressbook') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Viewing my addresses";
		presence.setActivity(presenceData);
	} else if (path === '/mydominos') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Viewing my profile";
		presence.setActivity(presenceData);
	} else if (path === '/mydominos/favourites') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Viewing my favourited orders";
		presence.setActivity(presenceData);
	} else if (path === '/mydominos/offers') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Entering a promo code";
		presence.setActivity(presenceData);
	} else if (path === '/mydominos/paymentmethods') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Adding a payment method";
		presence.setActivity(presenceData);
	} else if (path === '/mydominos/personaldetails') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Editing personal details";
		presence.setActivity(presenceData);
	} else if (path === '/mydominos/savedpizzas') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Viewing saved pizzas";
		presence.setActivity(presenceData);
	} else if (path === '/mydominos/security') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Changing password";
		presence.setActivity(presenceData);
	} else if (path === '/contact') {
		presenceData.details = "Browing Domino's Pizza";
		presenceData.state = "Contacting support";
		presence.setActivity(presenceData);
	} else if (path === '/basketdetails/show') {
		let price = document.getElementsByClassName('new-basket-total-price basket-price')[0]
		let saving = document.getElementsByClassName('new-basket-total-price basket-alt-price')[0]

		if(price) price = price.innerHTML;
		if(saving) saving = saving.innerHTML;
		presenceData.details = "Viewing cart";
		presenceData.state = `Total: ${price} ${saving ? `(${saving} saved)` : ''}`;
		presence.setActivity(presenceData);
	} else {
		presenceData.details = "Browing Domino's Pizza";
		presence.setActivity(presenceData);
	}
});

function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}