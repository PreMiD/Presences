// ファイルをモジュールとしてエクスポートする
export {};

// presence.ts
const presence = new Presence({
    clientId: "864287927847170068"
});

presence.on("UpdateData", async () => {
    const video = document.querySelector<HTMLVideoElement>(".d-animeMovie video");

    // ビデオが存在している場合
    if (video) {
        const presenceData: PresenceData = {
            details: "Watching a video on dアニメストア",
            state: video.currentTime > 0 && !video.paused ? `Playing` : `Paused`,
            timestamps: {
                start: Math.floor(Date.now() / 1000) - video.currentTime
            },
            // サムネイル画像を表示
            largeImageKey: "d-animestore",
            smallImageKey: video.paused ? "paused" : "play",
            smallImageText: video.paused ? "Paused" : "Playing"
        };

        presence.setActivity(presenceData);
    } else {
        presence.setTrayTitle();
        presence.setActivity();
    }
});

// ページ読み込み時に presence を開始
presence.start();
