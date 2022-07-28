const presence = new Presence({
		clientId: "1001831947611426877",
	}),
	browsingTimestamp = Date.now();

presence.on("UpdateData", async () => {
	const { pathname: path } = document.location;

	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp,
	};

	const hideSearch = await presence.getSetting<boolean>("hideSearch");
	const hideFood = await presence.getSetting<boolean>("hideFood");

	if (path.includes("/store/") && !path.includes("/search/")) {
		const name = document.querySelector<HTMLSpanElement>(
				"h1.styles__TextElement-sc-1jrzcv7-0"
			).textContent,
			image = document.querySelector<HTMLImageElement>(
				".menu-header-styles__LogoInner-sc-1kgi6s8-6 > picture:nth-child(1) > img:nth-child(5)"
			).src;

		if (
			!document.querySelector<HTMLImageElement>(
				".styles__ModalContainer-sc-1r4qbfh-0"
			)
		) {
			presenceData.largeImageKey = image;
			presenceData.smallImageKey = "logo";
			presenceData.details = `Viewing the menu of ${name}`;
		} else {
			if (!hideFood) {
				const menuItemImage = document.querySelector<HTMLImageElement>(
					".BaseItemModalStyles__PictureFrame-sc-mpq8va-1 > picture:nth-child(1) > img:nth-child(5)"
				).src;
				presenceData.state = `Looking at ${
					document.querySelector<HTMLSpanElement>(".bbOfWk").textContent
				}`;
				presenceData.largeImageKey = menuItemImage;
			}

			presenceData.details = `Viewing the menu of ${name}`;
			presenceData.smallImageKey = image;
		}
	} else if (path.includes("/search/store/")) {
		if (!hideSearch) {
			const search =
				document.querySelector<HTMLInputElement>("#FieldWrapper-0");
			presenceData.details = `Searching for ${
				search ? search.value : "something"
			}`;
		}
	}

	switch (path) {
		case "/": {
			presenceData.details = "Browsing Doordash";
			let activeSpan: HTMLSpanElement;

			const spanArray = Array.from(document.querySelectorAll(".sc-hFLmAl"));

			for (const span of spanArray)
				if (span.attributes[1].value === "#EB1700")
					activeSpan = span as HTMLSpanElement;

			if (activeSpan) {
				presenceData.state = `Looking for ${activeSpan.textContent}`;
			}

			break;
		}
		case "/orders": {
			presenceData.details = "Viewing their orders";
			break;
		}
		case "/consumer/edit_profile/": {
			presenceData.details = "Editing their profile";
			break;
		}
		case "/saved-stores/": {
			presenceData.details = "Viewing their saved stores";
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
