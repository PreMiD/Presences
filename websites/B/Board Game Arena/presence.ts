import getGame from "./games";
import { getGameTag, getMetadata } from "./util";

const presence = new Presence({
		clientId: "1089962805270171689",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/uCstmQE.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		pathList = pathname.split("/").find(x => x);

	switch (true) {
		case pathList === "tutorial": {
			presenceData.details = `Playing tutorial for ${await getMetadata<string>(
				presence,
				"game_name_displayed"
			)}`;
			break;
		}
		case pathList === "gamepanel": {
			presenceData.details = "Viewing game panel";
			presenceData.state =
				document.querySelector<HTMLSpanElement>(
					".text-bga-gamename"
				).textContent;
			presenceData.buttons = [
				{
					label: "View Game",
					url: href,
				},
			];
			break;
		}
		case pathList === "player": {
			presenceData.details = "Viewing player profile";
			presenceData.state = document
				.querySelector<HTMLSpanElement>("#player_name")
				.textContent.trim();
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("#player_avatar img").src;
			break;
		}
		case /^\d+$/.test(pathList): {
			const game = getGame(await getGameTag(presence));
			presenceData.details = `Playing ${await getMetadata<string>(
				presence,
				"game_name_displayed"
			)}`;
			presenceData.largeImageKey = game.logo;
			Object.assign(presenceData, await game.getData(presence));
			break;
		}
	}

	presence.setActivity(presenceData);
});
