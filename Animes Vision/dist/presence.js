var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: '666023707243839530',
    mediaKeys: true
}), startedBrowsing = Math.floor(Date.now() / 1000), playback, video, currentTime, duration, timestamps, videoTitle, episode, paused, path = window.location.pathname, strings = presence.getStrings({
    "browsing": "presence.activity.browsing",
    "playing": "presence.playback.playing",
    "paused": "presence.playback.paused"
}), presenceData = {
    largeImageKey: "vision_img",
    startTimestamp: startedBrowsing
};
presence.on("MediaKeys", (key) => {
    if (video) {
        if (key == "pause")
            paused ? video.play() : video.pause();
    }
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    playback = document.querySelector('div#playersd > div > div > video') || document.querySelector('div#playerhd > div > div > video') || document.querySelector('div#playerfhd > div > div > video') ? true : false;
    if (playback) {
        video = document.querySelector('div#playerhd > div > div > video');
        video = video.currentTime != 0 ? video : document.querySelector('div#playersd > div > div > video');
    }
    if (playback && Math.floor(video.currentTime) != 0) {
        duration = Math.floor(document.querySelector('video').duration);
        videoTitle = document.querySelector('.novisao').textContent.split('–')[0].trim();
        episode = document.querySelector('.novisao').textContent.split('–')[1].trim();
        paused = video.paused;
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused ? (yield strings).paused : (yield strings).playing;
        if (!paused) {
            currentTime = Math.floor(document.querySelector('video').currentTime);
            timestamps = getTimestamps(currentTime, duration);
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }
        else {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
        presenceData.details = 'Assistindo ' + videoTitle;
        presenceData.state = episode;
    }
    else if (path.startsWith('/all-series')) {
        presenceData.details = 'Vendo Lista de Animes';
    }
    else if (path.startsWith('/lancamentos')) {
        presenceData.details = 'Vendo os Lançamentos';
    }
    else if (path.startsWith('/animes-dublado')) {
        presenceData.details = 'Vendo Animes Dublados';
    }
    else if (path.startsWith('/doramas')) {
        presenceData.details = 'Vendo Lista de Doramas';
    }
    else if (path.startsWith('/cartoons')) {
        presenceData.details = 'Vendo Lista de Cartoons';
    }
    else if (path.startsWith('/filmes')) {
        presenceData.details = 'Vendo Lista de Filmes';
    }
    else {
        presenceData.details = (yield strings).browsing;
    }
    presence.setActivity(presenceData, true);
}));
function getTimestamps(curr, dura) {
    let startTime = Math.floor(Date.now() / 1000), duration = startTime - curr + dura;
    return [startTime, duration];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxJQUFJO0NBQ2xCLENBQUMsRUFDRixlQUFlLEdBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQ3hELFFBQWtCLEVBQ2xCLEtBQXdCLEVBQ3hCLFdBQW9CLEVBQ3BCLFFBQWlCLEVBQ2pCLFVBQXFCLEVBQ3JCLFVBQW1CLEVBQ25CLE9BQWdCLEVBQ2hCLE1BQWdCLEVBQ2hCLElBQUksR0FBWSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDeEMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDMUIsVUFBVSxFQUFFLDRCQUE0QjtJQUN4QyxTQUFTLEVBQUUsMkJBQTJCO0lBQ3RDLFFBQVEsRUFBRSwwQkFBMEI7Q0FDdkMsQ0FBQyxFQUNGLFlBQVksR0FBa0I7SUFDMUIsYUFBYSxFQUFFLFlBQVk7SUFDM0IsY0FBYyxFQUFFLGVBQWU7Q0FDbEMsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBVyxFQUFFLEVBQUU7SUFDckMsSUFBSSxLQUFLLEVBQUU7UUFDUCxJQUFJLEdBQUcsSUFBSSxPQUFPO1lBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN6QztBQUNMLENBQUMsQ0FDSixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtDQUFrQyxDQUFDLElB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