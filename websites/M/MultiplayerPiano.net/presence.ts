const presence = new Presence({
	clientId: "1240257888514080830",
});

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://www.virtualdrumming.com/icons-piano/icons-512.png",
}

async function getShowJoinButton(): Promise<boolean> {
	const joinButtonSetting =
		await presence.getSetting<boolean>("showJoinButton");
	return joinButtonSetting;
}

async function getShowRoomName(): Promise<boolean> {
	const roomNameSetting = await presence.getSetting<boolean>("showRoomName");
	return roomNameSetting;
}

function getRoomName(): string {
	return decodeURIComponent(
		document.location.href.match(/[?&]c=([^&#]*)/)
			? document.location.href.match(/[?&]c=([^&#]*)/)[1]
			: "lobby"
	);
}

function getAFK(): boolean {
	return document.querySelector('.name.me [id^="afktag-"]') !== null;
}

const presenceData: PresenceData = {
	largeImageKey: Assets.Logo,
	startTimestamp: Math.floor(Date.now() / 1000),
};

presence.on("UpdateData", async () => {
	const { href } = document.location;
	if (getAFK()) presenceData.details = "Currently AFK";
	else presenceData.details = "Playing piano";

	if (await getShowRoomName())
		presenceData.state = `in room "${getRoomName()}"`;

	if (await getShowJoinButton()) {
		presenceData.buttons = [
			{
				label: "Join Room",
				url: href,
			},
		];
	}

	presence.setActivity(presenceData);
});
