export const name = "Zeeple Dome";
export const logo = "https://i.imgur.com/QqEKHgG.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	switch (playerState.state) {
		case "Lobby": {
			return { state: "Waiting in lobby" };
		}
		case "Logo": {
			return { state: "Waiting" };
		}
		case "Shoot": {
			return { state: "Shooting" };
		}
	}
	return {};
}
