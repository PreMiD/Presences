const presence = new Presence({
    clientId: "1240257888514080830",
});

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://cdn.discordapp.com/attachments/587336926533648409/1240591699034767380/mpp2.png?ex=66471e8e&is=6645cd0e&hm=b288e175fe293d96c41c4041773d370a231a52a4cdd818eaa88342731a6762f9&",
}

async function getShowJoinButton(): Promise<boolean> {
    const joinButtonSetting = await presence.getSetting<boolean>("showJoinButton");
    return joinButtonSetting;
}

async function getShowRoomName(): Promise<boolean> {
    const roomNameSetting = await presence.getSetting<boolean>("showRoomName");
    return roomNameSetting;
}

function getRoomName(): string {
    return document.location.href.match(/[?&]c=([^&#]*)/) ? document.location.href.match(/[?&]c=([^&#]*)/)[1] : "lobby";
}

function getAFK(): boolean {
    return document.querySelector('.name.me [id^="afktag-"]') !== null;
}

const presenceData: PresenceData = {
    largeImageKey: Assets.Logo,
    startTimestamp: Math.floor(Date.now() / 1000),
};

presence.on("UpdateData", async () => {

    if (getAFK()) presenceData.details = "Currently AFK";
    else presenceData.details = "Playing piano";
    
    if (await getShowRoomName()) presenceData.state = `in room "${getRoomName()}"`;

    if (await getShowJoinButton()) {
        presenceData.buttons = [{
            label: "Join Room",
            url: `https://multiplayerpiano.net/?c=${getRoomName()}`
        }];
    }

    presence.setActivity(presenceData);
});