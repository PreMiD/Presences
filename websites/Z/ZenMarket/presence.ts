const presence = new Presence({
		clientId: "971483473024004157",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.ibb.co/n3h8QbV/zenlogo-sm.png",
}

// Function to remove the lang prefixes that occur with different languages
async function removeLangPath(path: string) {
	const splitPath = path.split('/');
	const locales: Set<String> = new Set(['en', 'ru', 'de', 'ua', 'ja', 'cn', 'tw', 'es', 'fr', 'ms', 'vi', 'ar', 'id' , 'th', 'it', 'pt', 'tr', 'pl', 'ko']);

	if (locales.has(splitPath[1])) {
		return splitPath.filter(part => !locales.has(part)).join('/');
	} else {
		return path;
	}
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
		details: 'Browsing ZenMarket',
	};

	const path = await removeLangPath(document.location.pathname);

	// Home

	if (path === '/') {
		presenceData.details = 'Viewing Main Page';
	}

	// Profile

	if (path === '/profile/' || path === '/profile/default.aspx') {
		const warehouseTable: HTMLTableElement = document.querySelector(
			'#productsBought > div:nth-child(1) > table'
		);
		const cartTable: HTMLTableElement = document.querySelector('.shop-stripped');

		// remove one from cartItems as there is an information table row which isn't one of the items
		const cartItems = cartTable ? cartTable.rows.length - 1 : 0;
		const warehouseItems = warehouseTable ? warehouseTable.rows.length : 0;

		presenceData.details = 'Viewing Account';
		presenceData.state = `${warehouseItems > 1 || warehouseItems === 0 ? `${warehouseItems} items` : `${warehouseItems} item`} in warehouse || ${cartItems > 1 || cartItems === 0 ? `${cartItems} items` : `${cartItems} item`} in cart`;
	}

	if (path === '/profile/messages.aspx' || path === '/profile/support.aspx') {
		presenceData.details = 'Viewing Messages';
	}

	if (path === '/profile/actions.aspx') {
		presenceData.details = 'Looking at Events';
	}

	if (path === '/profile/watchlist.aspx') {
		if (document.location.search.includes('tab=auctions') && !document.location.search.includes('history') || !document.location.search) {
			const products = document.querySelector(
                '#auctions > div:nth-child(2) > .col-md-12'
            );
			const watchCount = products ? products.children.length - 1 : 0;

			presenceData.details = 'Looking at watched auction items';
			presenceData.state = `${watchCount > 1 || watchCount === 0 ? `${watchCount} items` : `${watchCount} item`} on the watchlist`;
		} else if (document.location.search.includes('tab=auctions') && document.location.search.includes('history')) {
			presenceData.details = 'Viewing history of watched auction items';
		} else if (document.location.search.includes('tab=products')) {
			const products = document.querySelector(
                '#products > div:nth-child(2) > .col-md-12'
            );
			const watchCount = products ? products.children.length : 0;

			presenceData.details = 'Looking at watched items';
			presenceData.state = `${watchCount > 1 || watchCount === 0 ? `${watchCount} items` : `${watchCount} item`} on the watchlist`;
		} else if (document.location.search.includes('tab=sellers')) {
			presenceData.details = 'Viewing watched sellers';
		} else if (document.location.search.includes('tab=recent')) {
			presenceData.details = 'Looking at recently viewed items';
		}
	}

	if (path === '/profile/parcel.aspx') {
		presenceData.details = 'Viewing parcels';
	}

	if (path === '/profile/payments.aspx') {
		presenceData.details = 'Viewing transactions';
	}

	if (path === '/profile/levels.aspx') {
		presenceData.details = 'Checking current level';
		presenceData.state = `Current Level: ${(document.querySelector('#lblCurrentTier') as HTMLSpanElement).innerText}`;
	}

	if (path === '/profile/settings.aspx') {
		presenceData.details = 'Viewing settings';
	}

	// Product view

	if (path === '/auction.aspx' && document.location.search.includes('itemCode')) {
		const itemTitle: HTMLSpanElement = document.querySelector('#itemTitle');
		const price: HTMLSpanElement = document.querySelector('#lblPriceY');
		const bids: HTMLSpanElement = document.querySelector('#bidNum');
		const condition: HTMLSpanElement = document.querySelector('#lblItemStatus');
		const seller: HTMLSpanElement = document.querySelector('#seller');
		const url: HTMLAnchorElement = document.querySelector('#productPage');

		presenceData.details = `Looking at ${itemTitle.innerText}`;
		presenceData.state = `Price: ${price.innerText} || Bids: ${bids.innerText} || Condition: ${condition.innerText} || Seller: ${seller.innerText}`;
		presenceData.buttons = [
			{
				label: 'View on ZenMarket',
				url: document.location.href,
			},
			{
				label: 'View on Yahoo Auctions',
				url: url.href,
			}
		]
	}

	if (path === '/yshoppingproduct.aspx') {
		const itemTitle: HTMLSpanElement = document.querySelector('#itemTitle');
		const price: HTMLSpanElement = document.querySelector('#lblPrice');
		const condition: HTMLSpanElement = document.querySelector('#lblItemCondition');
		const seller: HTMLSpanElement = document.querySelector('#seller');
		const url: HTMLAnchorElement = document.querySelector('#productPage');

		presenceData.details = `Looking at ${itemTitle.innerText}`;
		presenceData.state = `Price: ${price.innerText} || Condition: ${condition.innerText} || Seller: ${seller.innerText}`;
		presenceData.buttons = [
			{
				label: 'View on ZenMarket',
				url: document.location.href,
			},
			{
				label: 'View on Yahoo Shopping',
				url: url.href,
			}
		]
	}

	if (path === '/mercariproduct.aspx') {
		const itemTitle: HTMLSpanElement = document.querySelector('#itemTitle');
		const price: HTMLSpanElement = document.querySelector('#lblPrice');
		const seller: HTMLSpanElement = document.querySelector('#seller');
		const url: HTMLAnchorElement = document.querySelector('#productPage');

		presenceData.details = `Looking at ${itemTitle.innerText}`;
		presenceData.state = `Price: ${price.innerText} || Seller: ${seller.innerText}`;
		presenceData.buttons = [
			{
				label: 'View on ZenMarket',
				url: document.location.href,
			},
			{
				label: 'View on Mercari',
				url: url.href,
			}
		]
	}

	if (path === '/rakumaproduct.aspx') {
		const itemTitle: HTMLSpanElement = document.querySelector('#itemTitle');
		const price: HTMLSpanElement = document.querySelector('#lblPrice');
		const seller: HTMLSpanElement = document.querySelector('#seller');
		const url: HTMLAnchorElement = document.querySelector('#productPage');

		presenceData.details = `Looking at ${itemTitle.innerText}`;
		presenceData.state = `Price: ${price.innerText} || Seller: ${seller.innerText}`;
		presenceData.buttons = [
			{
				label: 'View on ZenMarket',
				url: document.location.href,
			},
			{
				label: 'View on Rakuma',
				url: url.href,
			}
		]
	}

	if (path === '/rakutenproduct.aspx') {
		const itemTitle: HTMLSpanElement = document.querySelector('#itemTitle');
		const price: HTMLSpanElement = document.querySelector('#lblPrice');
		const seller: HTMLSpanElement = document.querySelector('#seller');
		const url: HTMLAnchorElement = document.querySelector('#productPage');

		presenceData.details = `Looking at ${itemTitle.innerText}`;
		presenceData.state = `Price: ${price.innerText} || Seller: ${seller.innerText}`;
		presenceData.buttons = [
			{
				label: 'View on ZenMarket',
				url: document.location.href,
			},
			{
				label: 'View on Rakuten',
				url: url.href,
			}
		]
	}

	if (path === '/amazonproduct.aspx') {
		const itemTitle: HTMLSpanElement = document.querySelector('#itemTitle');
		const price: HTMLSpanElement = document.querySelector('#lblPrice');
		const condition: HTMLSpanElement = document.querySelector('#lblConditionName');
		const url: HTMLAnchorElement = document.querySelector('#productPage');

		presenceData.details = `Looking at ${itemTitle.innerText}`;
		presenceData.state = `Price: ${price.innerText} ${condition ? `|| Condition: ${condition.innerText}` : ''}`;
		presenceData.buttons = [
			{
				label: 'View on ZenMarket',
				url: document.location.href,
			},
			{
				label: 'View on Amazon',
				url: url.href,
			}
		]
	}

	if (path === '/othershopproduct.aspx') {
		const itemTitle: HTMLSpanElement = document.querySelector('#itemTitle');
		const price: HTMLSpanElement = document.querySelector('#lblPrice');
		const url: HTMLAnchorElement = document.querySelector('#productPage');

		presenceData.details = `Looking at ${itemTitle.innerText}`;
		presenceData.state = `Price: ${price.innerText}`;
		presenceData.buttons = [
			{
				label: 'View on ZenMarket',
				url: document.location.href,
			},
			{
				label: 'View on original page',
				url: url.href,
			}
		]
	}

	if (path.includes('/s/') && path.split('/').length === 4 && document.querySelector('#itemTitle')) {
		const itemTitle: HTMLSpanElement = document.querySelector('#itemTitle');
		const price: HTMLSpanElement = document.querySelector('#lblPrice');
		const seller: HTMLSpanElement = document.querySelector('#aSeller');

		presenceData.details = `Looking at ${itemTitle.innerText}`;
		presenceData.state = `Price: ${price.innerText} || Seller: ${seller.innerText}`;
		presenceData.buttons = [
			{
				label: 'View on ZenMarket',
				url: document.location.href,
			},
			{
				label: 'View on ZenPlus',
				url: (document.querySelector('#itemUrl') as HTMLAnchorElement).href,
			}
		]
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
