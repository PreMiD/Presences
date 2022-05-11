const presence = new Presence({
		clientId: "973027832307535952"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
function getElementByXpath(path: string) {
	return document.evaluate(
		path,
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "stats_fm",
			startTimestamp: browsingTimestamp
		},
		{ pathname } = window.location;
	switch (true) {
		case pathname === "/": {
			presenceData.details = "Browsing the main page";
			break;
		}
		case pathname.includes("/album/"): {
			presenceData.details = "Viewing an album";
			presenceData.state = document.querySelector("h1.text-center").textContent;
			presenceData.buttons = [
				{
					label: "View Album",
					url: location.href
				}
			];
			break;
		}
		case pathname.includes("/artist/"): {
			presenceData.details = "Viewing an artist";
			presenceData.state = `${
				getElementByXpath("/html/body/div[1]/div[1]/div/div[2]/h1").textContent
			}`;
			presenceData.buttons = [
				{
					label: "View Artist",
					url: location.href
				}
			];
			break;
		}
		case pathname.includes("/track/"): {
			presenceData.details = "Viewing stats for a track";
			presenceData.state = `${
				getElementByXpath("/html/body/div[1]/div[1]/div/div/div[2]/h1")
					.textContent
			}`;
			presenceData.buttons = [
				{
					label: "View Track",
					url: location.href
				}
			];
			break;
		}
	}
	presence.setActivity(presenceData);
});
