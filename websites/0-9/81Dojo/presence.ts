const presence = new Presence({
		clientId: "1338891034310213683"
	})
const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://81dojo.com/dojo/images/avatars/study_black.jpg"
	};
	switch (document.location.hostname){
		case "81dojo.com":
			if (document.location.pathname == "/")
				presenceData.details = "Viewing home page"; // todo: statuses for more pages
			else if (document.location.pathname.includes("/client/")){
				if (parseFloat(document.getElementById("layerLogin").style.opacity) > 0)
					presenceData.details = "Logging in to client";
				else{ 
					let server = document.getElementById("header-serverName").innerText.slice(0,-3)
					let username = document.getElementById("header-playerName").innerText.slice(0,-3)
					if (document.getElementById("layerLobby").style.display == "block")
						presenceData.details = "In " + server + " lobby"
					else{
						let playerElements = document.querySelectorAll("[id='player-info-name']")
						let playerElementIndex = 0;
						const players = [];
						const ratings = [];
						for (let i = 0; i < playerElements.length; i++){
							players.push(playerElements[i].innerHTML)
							ratings.push(playerElements[i].parentElement.children.item(4).innerHTML.slice(3,7))
						}
						if (username in players){
							for (let i = 0; i < playerElements.length; i++){
								if (playerElements[i].innerHTML == username)
									playerElementIndex = i;
							}
							const opponentName = players[1-players.indexOf(username)]
							const opponentRate = playerElements[1-playerElementIndex].parentNode.children.item(4).innerHTML.slice(3,7)
							if (playerElements[0].classList.contains("name-winner"))
								presenceData.details = "In post-game analysis"
							else{
								presenceData.details = "In a game"
							}
							presenceData.state = "vs. " + opponentName + "(" + opponentRate + ")"
						}
						else{
							presenceData.details = "Spectating"
							presenceData.state = players[0] + " (" + ratings[0] + ") vs. " + players[1] + " (" + ratings[1] + ")"
						}
					}
				}
			}
			break
		case "system.81dojo.com":
			presenceData.details = "Viewing WebSystem"; //todo: status for individual pages
			
	}
	presence.setActivity(presenceData);
});
