const presence = new Presence({
	clientId: "1264754447276310599",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
Logo = "https://cdn2.steamgriddb.com/icon/6ef77bd3e3cfb00cd02bba48e6e9a9e3.png",
}

let video = {
exists: false,
duration: 0,
currentTime: 0,
paused: true,
};

presence.on(
"iFrameData",
(data: {
	exists: boolean;
	duration: number;
	currentTime: number;
	paused: boolean;
}) => {
	video = data;
}
);

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
	largeImageKey: Assets.Logo,
	startTimestamp: browsingTimestamp,
},
{ href, pathname, search } = document.location;

if(pathname === "/" || pathname === "/home")
	presenceData.details = "Viewing Homepage";
else if (pathname.includes("/search"))
	presenceData.details = `Viewing results: ${search.split("=")[1]}`;
else if (pathname.includes("/watch/")) {
	presenceData.details = document.title.replace(/^Watch /, "").replace(/ online free on 9anime$/, "");
	const coverArt = document
		.querySelector<HTMLImageElement>('[class="anime-poster"]')
		?.querySelector("img")
		?.getAttribute("src"),
	episodeNumber = document
		.querySelector('[class="item ep-item active"]')
		?.textContent?.match(/[1-9]{1}[0-9]{0,}/)?.[0];

	presenceData.state = `Episode ${episodeNumber}`;
	presenceData.largeImageKey = coverArt;
	presenceData.buttons = [
		{
			label: "View Anime",
			url: href,
		},
	];
	if(video.exists) {
		if(video.paused)
			presenceData.smallImageKey = Assets.Pause;
		else
			presenceData.smallImageKey = Assets.Play;
	} else
		presenceData.smallImageKey = Assets.Logo;
}

presence.setActivity(presenceData);
});
