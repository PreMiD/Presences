const presence = new Presence({
		clientId: "1001831947611426877",
	}),
	started = Date.now();

presence.on("UpdateData", async () => {
	const path: string = document.location.pathname,
		presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: started,
		};

	// If they're using includes statements, it means the page is not a static page (like home, orders, etc.)

	// Store page
	if (path.includes("/store/") && !path.includes("/search/")) {
		const name = document.querySelector<HTMLSpanElement>(
				"h1.styles__TextElement-sc-1jrzcv7-0"
			).textContent,
			image = document.querySelector<HTMLImageElement>(
				".menu-header-styles__LogoInner-sc-1kgi6s8-6 > picture:nth-child(1) > img:nth-child(5)"
			),
			hideFood = await presence.getSetting<boolean>("hideFood");

		if (
			document.querySelector<HTMLImageElement>(
				".styles__ModalContainer-sc-1r4qbfh-0"
			) === null
		) {
			presenceData.largeImageKey = image.src;
			presenceData.smallImageKey = "logo";
			presenceData.details = `Viewing the menu of ${name}`;
		} else {
			if (!hideFood) {
				const menuItemImage = document.querySelector<HTMLImageElement>(
					".BaseItemModalStyles__PictureFrame-sc-mpq8va-1 > picture:nth-child(1) > img:nth-child(5)"
				);
				presenceData.state = `Looking at ${
					document.querySelector<HTMLSpanElement>(".bbOfWk").textContent
				}`;
				presenceData.largeImageKey = menuItemImage.src;
			}

			presenceData.details = `Viewing the menu of ${name}`;
			presenceData.smallImageKey = image.src;
		}

		// Search page
	} else if (path.includes("/search/store/")) {
		const hideSearch = await presence.getSetting<boolean>("hideSearch");
		if (!hideSearch) {
			const search =
				document.querySelector<HTMLInputElement>("#FieldWrapper-0");
			presenceData.details = `Searching for ${
				search ? search.value : "something"
			}`;
		}
	}

	switch (path) {
		// Home page
		case "/": {
			presenceData.details = "Browsing Doordash";
			let activeSpan;

			const spanArray = Array.from(document.querySelectorAll(".sc-hFLmAl"));

			for (const span of spanArray) {
				// If the color is red, it's the active one, so set it
				if (span.attributes[1].value === "#EB1700") activeSpan = span;
			}

			// If there is an active span, set the rpc state to the text of the span
			if (activeSpan) {
				presenceData.state = `Looking for ${
					(activeSpan as HTMLSpanElement).textContent
				}`;
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
