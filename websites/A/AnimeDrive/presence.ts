const presence = new Presence({
	clientId: "1211027222815711282",
}), browsingTimestamp = Math.floor(Date.now() / 1000);;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.discordapp.com/icons/702098578251841577/be50b5dbcb30bd99512b6df29284db0c.webp",
		startTimestamp: browsingTimestamp,
		buttons: [{ 
            label: "Meglátogatás", 
            url: "https://animedrive.hu/" 
        }]
	},
		{ pathname, search } = document.location;

	switch (pathname) {
		case "/": {
			presenceData.details = "Főoldal Böngészése";
			break;
		}
		case "/search/": {
			presenceData.details = "Anime Keresése";
			break;
		}
		case "/anime/": {
			if (search.startsWith("?id=")) {
				const animeId = search.split("?id=")[1].split("&")[0];
				const contentDiv = document.querySelector('.col-sm-12.col-md-8.col-lg-9');
				const h2Content = contentDiv ? contentDiv.querySelector('h2') : null;
				const h4Content = contentDiv ? contentDiv.querySelector('h4') : null;

				if (h4Content && h4Content.textContent.trim()) {
					presenceData.details = `Adatlap böngészése:`;
					presenceData.state = `${h2Content.textContent.trim()}`;
				} else if (h2Content && h2Content.textContent.trim()) {
					presenceData.details = `Adatlap böngészése:`;
					presenceData.state = `${h2Content.textContent.trim()}`;
				} else {
					presenceData.details = `Adatlap böngészése:`;
					presenceData.state = `ID: ${animeId}`;
				}

				presenceData.buttons.push({
					label: "Adatlap",
					url: `https://animedrive.hu/anime/?id=${animeId}`
				});
			} else {
				presenceData.details = "Anime Böngészése";
			}
			break;
		}
		case "/watch/": {
			if (search.startsWith("?id=")) {
				const animeId = search.split("?id=")[1].split("&")[0];
				const linkElement = document.querySelector('a.text-white[href^="https://animedrive.hu/anime/?id="]');
				const h2Element = linkElement ? linkElement.querySelector('h2') : null;

				const episodeElement = document.querySelector('a.nk-pagination-current-white');
				const epModified = episodeElement.textContent.match(/\d+/)[0];
		
				if (h2Element && h2Element.textContent.trim()) {
					presenceData.details = `${h2Element.textContent.trim()}`;
					presenceData.state = `Epizód: ${episodeElement.textContent.trim()}`;
				} else {
					presenceData.details = `Adatlap böngészése:`;
					presenceData.state = `ID: ${animeId}`;
				}
		
				presenceData.buttons.push({
					label: "Lejátszás",
					url: `https://animedrive.hu/watch/?id=${animeId}&ep=${epModified}`
				});
			} else {
				presenceData.details = "Anime Nézése";
			}
			break;
		}		
		default:
			presenceData.details = "AnimeDrive Böngészése";
	}
	presence.setActivity(presenceData);
});
