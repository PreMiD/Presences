export const name = "Zeeple Dome";
export const logo = "https://i.imgur.com/QqEKHgG.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	const presenceData: PresenceData = {};
	switch (playerState.state) {
		case "Lobby": {
			presenceData.state = "Waiting in lobby";
			break;
		}
		case "Logo": {
			presenceData.state = "Waiting";
			break;
		}
		case "Shoot": {
			presenceData.state = "Shooting";
			break;
		}
	}
	return presenceData;
}
