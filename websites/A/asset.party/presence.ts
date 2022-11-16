/* eslint-disable unicorn/prefer-switch */
const presence = new Presence({
	clientId: "1042537481058394164",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
		},
		{ pathname, href } = document.location,
		pathSplit = pathname.split(/^.(.*)\/([^/]*)$/).filter(String);
	//  use if you want to add username support :)
	//  showUsername = await presence.getSetting<boolean>("show-username"),
	//  UsernameSelector = document.querySelectorAll(".username");
	//  let Username = "";

	// if (UsernameSelector.length !== 0 && showUsername === true ) {
	// 	if (UsernameSelector[0] && UsernameSelector[0].innerHTML)
	// 		Username = UsernameSelector[0].innerHTML;

	// else
	// 	console.log("failed!");
	// }
	if (pathname === "/") presenceData.details = "Exploring asset.party";
	else if (pathname === "/get/developer/preview") {
		const KeyDetails = document.querySelectorAll(".tag");
		presenceData.details = "Going through key torture...";
		presenceData.state = `🔑${KeyDetails[0].innerHTML.match(/\d+/)[0]} 🧍 ${
			KeyDetails[2].innerHTML.match(/\d+/)[0]
		} 👀 ${KeyDetails[2].innerHTML.match(/\d+/)[0]} `;
		presenceData.smallImageKey = "key";
		presenceData.smallImageText = "torture.";
	} else if (pathname === "/api-history/")
		presenceData.details = "Viewing API History";
	else if (
		document.querySelectorAll(".nav-thumb").length !== 0 &&
		document.querySelectorAll(".page-header-block").length !== 0
	) {
		const Details = document.querySelectorAll(".page-header-block");
		if (
			Details.length !== 0 &&
			document.querySelectorAll(".nav-thumb").length !== 0
		) {
			presenceData.details = `Viewing ${Details[2].innerHTML} `;
			presenceData.state = `Developed by ${Details[1].innerHTML}`;
			presenceData.buttons = [
				{
					label: "Open Project",
					url: href,
				},
			];
		}
	} else if (pathSplit.length !== 0 && pathSplit[0] === "api") {
		presenceData.details = "Viewing API documentation";
		if (pathSplit[1]) {
			presenceData.state = `Learning ${pathSplit[1]}`;
			presenceData.buttons = [
				{
					label: "View documentation",
					url: href,
				},
			];
		}
	}

	presence.setActivity(presenceData);
});
