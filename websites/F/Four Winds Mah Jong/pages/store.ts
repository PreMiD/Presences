export default function handler(
	pathList: string[],
	presenceData: PresenceData
) {
	const { href, search, pathname } = document.location,
		mainPath = pathList[0] ?? "/",
		title = document.querySelector("h1");
	if (mainPath === "/") {
		if (new URLSearchParams(search).get("s")) {
			presenceData.details = "Searching the store";
			presenceData.state = title.querySelector("span");
		} else {
			presenceData.details = "Browsing the store";
		}
	} else if (mainPath === "product") {
		presenceData.details = "Viewing a product";
		presenceData.state = title;
		presenceData.buttons = [{ label: "View Product", url: href }];
	} else if (mainPath === "product-category") {
		presenceData.details = "Viewing a product category";
		presenceData.state = title;
	} else if (mainPath === "cart" || mainPath === "checkout") {
		presenceData.details = "Viewing the cart";
	} else if (mainPath === "about") {
		presenceData.details = "Reading about Four Winds Mah Jong";
	} else if (mainPath === "category") {
		presenceData.details = "Viewing a category";
		presenceData.state = title.querySelector("span");
	} else if (mainPath === "author") {
		presenceData.details = "Viewing posts by an author";
		presenceData.state = title.querySelector("span");
	} else if (/^[/]store[/]\d{4}[/](\d{2}[/])?(\d+)?/.test(pathname)) {
		presenceData.details = "Browsing posts by date";
		presenceData.state = title;
	} else if (document.querySelector<HTMLSpanElement>(".posted-on")) {
		presenceData.details = "Reading a post";
		presenceData.state = title;
		presenceData.buttons = [{ label: "Read Post", url: href }];
	}
}
