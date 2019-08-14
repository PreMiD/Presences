{
    const presence = new Presence({
        clientId: "611012705306017792",
        mediaKeys: true
    });
    const strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });

    presence.on("MediaKeys", (key: string) => {
        if (
            location.pathname.startsWith("/animestore/sc_d_pc") &&
            document.querySelector("#video")
        ) {
            console.log(key);
            switch (key) {
                case "pause": {
                    const button: HTMLElement = document.querySelector(
                        ".playButton"
                    );
                    if (button) button.click();
                    break;
                }

                case "nextTrack": {
                    const button: HTMLElement = document.querySelector(
                        ".skipButton"
                    );
                    if (button) button.click();
                    break;
                }

                case "previousTrack": {
                    const button: HTMLElement = document.querySelector(
                        ".backButton"
                    );
                    if (button) button.click();
                    break;
                }
            }
        }
    });

    presence.on("UpdateData", async () => {
        if (
            location.pathname.startsWith("/animestore/sc_d_pc") &&
            document.querySelector("#video")
        ) {
            const video: HTMLVideoElement = document.querySelector("#video");
            const title = document.querySelector(".backInfoTxt1").textContent;
            const episode = document.querySelector(".backInfoTxt2").textContent;
            const epName = document.querySelector(".backInfoTxt3").textContent;

            const isPlaying = !video.paused;
            const elapsedSec = Math.floor(video.currentTime);

            const presenceData: presenceData = {
                details: `${title} - ${episode}`,
                state: epName,
                largeImageKey: "danime",
                smallImageKey: isPlaying ? "play" : "pause",
                smallImageText: isPlaying
                    ? (await strings).play
                    : (await strings).pause,
                startTimestamp: Math.floor(Date.now() / 1000) - elapsedSec
            };

            if (isPlaying) {
                presence.setTrayTitle(title);
            } else {
                delete presenceData.startTimestamp;
            }

            presence.setActivity(presenceData);
        }
    });
}
