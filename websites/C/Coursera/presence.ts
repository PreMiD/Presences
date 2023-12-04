	BUTTONS = "buttons",
}
const { href } = document.location,
presence = new Presence({
	presence = new Presence({
		clientId: "1179996601327026227",
	}),
	startTimestamp: number = Math.floor(Date.now() / 1000),
	router = ({ path }: { path: string; presenceData: PresenceData }): Route => {
		
		const routes: Route[] = [
			{
				path: /^\/$/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () => {
					return `Viewing Course ${href
						.split("/")[6]
						.split("-")
						.join(" ")}`;
					return `Viewing Course ${href.split("/")[6].split("-").join(" ")}`;
				},
				details: () => {
					return href.split("/")[4].split("-").join(" ");
				smallImageKey: () => Assets.Search,
				smallImageText: () => "Searching",
				details: () => {
					return `searching for "${new URL(
						href
					).searchParams.get("query")}"`;
					return `searching for "${new URL(href).searchParams.get("query")}"`;
				},

				state: () => {

	const route = router({
		presenceData,
		path: location.href.replace(
			`https://${location.hostname}`,
			""
		),
		path: location.href.replace(`https://${location.hostname}`, ""),
	});

	if (!route) return presence.setActivity(presenceData);
