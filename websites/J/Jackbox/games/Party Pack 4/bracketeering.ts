export const name = "Bracketeering";
export const logo = "https://i.imgur.com/oJJpQqi.png";

export function getPresenceData({
	playerState,
}: GameCallbackParams): PresenceData {
	const presenceData: PresenceData = {};
	presenceData.smallImageKey = getComputedStyle(
		document.querySelector<HTMLDivElement>("#playericon")
	).backgroundImage.match(/^url\("(.*)"\)$/)[1];
	switch (playerState.state) {
		case "Lobby": {
			return { state: "Waiting in lobby" };
		}
		case "MakeSingleChoice": {
			if (playerState.text === "Press this to skip the tutorial") {
				return { state: "Watching the tutorial" };
			} else if (
				(playerState.text as string).includes(
					"Which answer will get the most votes?"
				)
			)
				return { state: "Predicting the most popular answer" };
			else if (
				(playerState.text as string).includes(
					"Vote for the answer that deserves to win."
				)
			)
				return { state: "Voting on an answer" };
			break;
		}
		case "EnterSingleText": {
			return { state: "Answering a prompt" };
		}
		case "Logo": {
			return { state: "Waiting" };
		}
	}
	return {};
}
