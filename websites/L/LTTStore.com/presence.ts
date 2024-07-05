const presence = new Presence({
	clientId: "1258619078201839646",
});

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://www.lttstore.com/cdn/shop/files/LTT_Logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		buttons: [
			{
				label: "Visit LTTStore",
				url: "https://www.lttstore.com/",
			},
		],
	};

	if (
		document.location.hostname === "www.lttstore.com" ||
		document.location.hostname === "lttstore.com"
	) {
		presenceData.largeImageKey = Assets.Logo;
		if (
			document.location.pathname === "/" ||
			document.location.pathname === ""
		) {
			presenceData.details = "Browsing";
			presenceData.state = "Home";
		} else if (document.location.pathname.includes("/products/")) {
			const modalOpener = document.querySelector("modal-opener");
			if (modalOpener) {
				const firstImgSrcSplit = (
					modalOpener.querySelector("img")?.getAttribute("src") as string
				).split("");
				for (let i = 0; i < firstImgSrcSplit.length; i++) {
					if (firstImgSrcSplit[i] !== "/") {
						firstImgSrcSplit.splice(0, i);
						break;
					}
				}
			}

			presenceData.largeImageKey = `https://${firstImgSrcSplit.join("")}`;
			presenceData.smallImageKey = Assets.Logo;
			presenceData.smallImageText = "LTTStore.com";
			presenceData.details = "Viewing Product";
			presenceData.state = (
				document.querySelector("div.product__title h1") as HTMLElement
			).textContent;
		} else if (document.location.pathname.includes("/collections/")) {
			if (document.location.pathname.includes("/collections/accessories")) {
				presenceData.details = "Browsing";
				presenceData.state = "Gear & Accessories";
			} else if (document.location.pathname.includes("/collections/clothing")) {
				presenceData.details = "Browsing";
				presenceData.state = "Clothing";
			} else if (document.location.pathname.includes("/collections/all")) {
				presenceData.details = "Browsing";
				presenceData.state = "All Products";
			} else {
				presenceData.details = "Browsing";
				presenceData.state = "Collections";
			}
		} else if (document.location.pathname.includes("/blogs/")) {
			presenceData.details = "Reading";
			presenceData.state = document.querySelector(
				"h1.article-template__title"
			)?.textContent;
		} else if (document.location.pathname.includes("/cart")) {
			presenceData.details = "Viewing Cart";
			presenceData.state = "";
		} else {
			presenceData.details = "Browsing";
			presenceData.state = "";
		}
		presence.setActivity(presenceData);
	}
});
