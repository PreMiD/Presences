var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
{
    const presence = new Presence({
        clientId: "610102236374368267"
    });
    const strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        const player = document.querySelector(".player");
        if (player) {
            const title = player.querySelector(".player-cloudcast-title")
                .textContent;
            const author = player.querySelector(".player-cloudcast-author-link")
                .textContent;
            const elapsed = player
                .querySelector(".player-time")
                .textContent.split(":");
            let elapsedSec;
            if (elapsed.length === 3) {
                elapsedSec =
                    parseInt(elapsed[0]) * 60 * 60 +
                        parseInt(elapsed[1]) * 60 +
                        parseInt(elapsed[2]);
            }
            else {
                elapsedSec = parseInt(elapsed[0]) * 60 + parseInt(elapsed[1]);
            }
            const isPlaying = player.querySelector(".pause-state")
                ? true
                : false;
            const presenceData = {
                details: title,
                state: author,
                largeImageKey: "mixcloud",
                smallImageKey: isPlaying ? "play" : "pause",
                smallImageText: isPlaying
                    ? (yield strings).play
                    : (yield strings).pause,
                startTimestamp: Math.floor(Date.now() / 1000) - elapsedSec
            };
            if (isPlaying) {
                presence.setTrayTitle(title);
            }
            else {
                delete presenceData.startTimestamp;
            }
            presence.setActivity(presenceData);
        }
        else {
            presence.clearActivity();
        }
    }));
}
