export const presence = new Presence({
	clientId: "1222797423953575977",
});

export let browsingTimestamp = Math.floor(Date.now() / 1000);

export function getWindString(windIndex: number): string {
	switch (windIndex) {
		case 0:
			return "East";
		case 1:
			return "South";
		case 2:
			return "West";
		case 3:
			return "North";
	}
}

export function getPositionString(position: number): string {
	switch (position) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}
