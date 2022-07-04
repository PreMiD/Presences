const presence = new Presence({
	clientId: "993496501886136371",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

function lettersOnly(str: string) {
	return str.replace(/[^a-zA-Z]/g," ");
}

presence.on("UpdateData", async () => {
	// if (document.location.pathname.includes("/maps")) {
		const presenceData: PresenceData = {
			largeImageKey: "logo",
		};
		presenceData.startTimestamp = browsingTimestamp;
		if (document.location.pathname.includes("/place")) {
			const place = document.location.href,
			indexes = [];
			for (let index = 0; index < place.length; index++) {
				if (place[index] === "/") 
				indexes.push(index);
			}
		
			const placeName = lettersOnly(place.substring(indexes[4] + 1, indexes[5]));
			presenceData.details = `Viewing ${placeName}`;
			presenceData.buttons = [
				{ label: "View Place", url: document.location.href },
			];
		} else if (document.location.pathname.includes("/dir")) {
			presenceData.details = "Viewing directions";
			let from,
			 destination;
			console.log(document.querySelector("#sb_ifc50 > input"));
			if(document.querySelector("#sb_ifc50 > input") === null) {
			console.log(1);
			from = document.querySelector("#sb_ifc51 > input").getAttribute("aria-label"),
			destination = document.querySelector("#sb_ifc52 > input").getAttribute("aria-label");
			} else {
			console.log(2);
			from = document.querySelector("#sb_ifc50 > input").getAttribute("aria-label"),
			destination = document.querySelector("#sb_ifc51 > input").getAttribute("aria-label");
			}
			presenceData.state = `${from}, ${destination}`;
			presenceData.buttons = [
				{ label: "View Directions", url: document.location.href },
			];
		} else if (document.location.pathname.includes("/search")) {
			const search = document.location.href,
			indexes = [];
			for (let index = 0; index < search.length; index++) {
				if (search[index] === "/") 
				indexes.push(index);
			}
		
			const searchName = lettersOnly(search.substring(indexes[4] + 1, indexes[5]));
			console.log(searchName);
			presenceData.details = `Searching for ${searchName}`;
		} else 
			presenceData.details = "Viewing map";
		
		presence.setActivity(presenceData);
	// }
});
