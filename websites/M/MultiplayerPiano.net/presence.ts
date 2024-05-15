const presence = new Presence({
		clientId: "1240257888514080830",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "logo",
}

async function getShowJoinButton(): Promise<boolean> {
    const joinButtonSetting = await presence.getSetting<boolean>("showJoinButton");
    return joinButtonSetting;
}
async function getShowRoomName(): Promise<boolean> {
    const roomNameSetting = await presence.getSetting<boolean>("showRoomName");
    return roomNameSetting;
}
async function getShowStatus(): Promise<boolean> {
    const roomNameSetting = await presence.getSetting<boolean>("showStatus");
    return roomNameSetting;
}

function getRoomName(): string {
	const url = window.location.href;
	const regex = /[?&]c=([^&#]*)/;
	const matches = url.match(regex)
	return matches ? matches[1] : "lobby"
}

function getAFK(): boolean {
    const afkElement = document.querySelector('.name.me [id^="afktag-"]');
    return afkElement !== null;
}

const presenceData: PresenceData = {
	largeImageKey: Assets.Logo,
	startTimestamp: browsingTimestamp,
}

presence.on("UpdateData", async () => {
	const showRoomName = await getShowRoomName();
	const showJoinButton = await getShowJoinButton();
    const roomName = getRoomName();
	const isAFK = getAFK();

    const presenceData: PresenceData = {
        largeImageKey: Assets.Logo,
        startTimestamp: browsingTimestamp,
    };

	if (isAFK) presenceData.details = "Currently AFK"
	else presenceData.details = "Playing piano";

	if (showRoomName) {
		presenceData.state = "in room \"" + roomName + "\""
	}
    
	if (showJoinButton) {
        presenceData.buttons = [{
            label: "Join Room",
            url: `https://multiplayerpiano.net/?c=${roomName}`
        }];
    }

	presence.setActivity(presenceData);
});
