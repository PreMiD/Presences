const presence = new Presence({
	clientId: "1001831947611426877",
});

const started = Date.now();

presence.on("UpdateData", async () => {
	const path: string = document.location.pathname;

	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: started,
	};

	// If they're using includes statements, it means the page is not a static page (like home, orders, etc.)

	// Store page
	if (path.includes("/store/") && !path.includes("/search/")) {
		const name = document.querySelector<HTMLSpanElement>("h1.styles__TextElement-sc-1jrzcv7-0").textContent;
		const image = document.querySelector<HTMLImageElement>(".menu-header-styles__LogoInner-sc-1kgi6s8-6 > picture:nth-child(1) > img:nth-child(5)");

		const menuItemModal = document.querySelector<HTMLImageElement>(".styles__ModalContainer-sc-1r4qbfh-0")
		const hideFood = await presence.getSetting<boolean>("hideFood");

		if (menuItemModal === null) {
			presenceData.largeImageKey = image.src;
			presenceData.smallImageKey = "logo";
			presenceData.details = `Viewing the menu of ${name}`;
		} else {
			if (!hideFood) {
				const menuItemName = document.querySelector<HTMLSpanElement>(".bbOfWk").textContent;
				const menuItemImage = document.querySelector<HTMLImageElement>(".BaseItemModalStyles__PictureFrame-sc-mpq8va-1 > picture:nth-child(1) > img:nth-child(5)");
				presenceData.state = `Looking at ${menuItemName}`;
				presenceData.largeImageKey = menuItemImage.src;
			}

			presenceData.details = `Viewing the menu of ${name}`;
			presenceData.smallImageKey = image.src;
		}

		// Search page
	} else if (path.includes("/search/store/")) {
		const hideSearch = await presence.getSetting<boolean>("hideSearch");
		if (!hideSearch) {
			const search = document.querySelector<HTMLInputElement>("#FieldWrapper-0");
			const searchItem = search ? search.value : "something";
			presenceData.details = `Searching for ${searchItem}`;
		}
	}

	switch (path) {
		// Home page
		case "/": {
			presenceData.details = "Browsing Doordash";
			let activeSpan;

			// Get active menu type (Fast Food, Pizza, etc.)

			const menuTypes = document.getElementsByClassName('sc-hFLmAl');
			// Loop through all spans to find the active one
			Array.from(menuTypes).forEach((item: HTMLSpanElement) => {
				// Get the color of the span
				const color = item.attributes[1].value;
				// If the color is red, it's the active one, so set it
				if (color === "#EB1700")
					activeSpan = item;
			})

			// If there is an active span, set the rpc state to the text of the span
			if (activeSpan) {
				let span = activeSpan as HTMLSpanElement;
				presenceData.state = `Looking for ${span.textContent}`;
			}
			break;
		}
		// Orders page
		case "/orders": {
			presenceData.details = "Viewing their orders";
			break;
		}
		// Edit profile page
		case "/consumer/edit_profile/": {
			presenceData.details = "Editing their profile";
			break;
		}
		// Saved stores page
		case "/saved-stores/": {
			presenceData.details = "Viewing their saved stores";
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
