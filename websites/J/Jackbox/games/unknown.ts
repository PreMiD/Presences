export const tag = "unknown";
export const name = "Unknown Game";
export const logo = "https://i.imgur.com/SXfEdnL.png";

export function getPresenceData(info: GameCallbackParams): PresenceData {
	return {
		state: `Playing an unsupported game (${info.tag})`,
	};
}
