let presence = new Presence({
    clientId: "664350968585912350"
});
let strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
let startTimestamp = Math.floor(Date.now() / 1000);
let video;
presence.on("iFrameData", async (msg) => {
    if (!msg)
        return;
    video = msg;
});
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "diziay"
    };
    let seriesBool = document.querySelector("body > section > div > div > div.content__inner.movie__page.d-flex.justify-content-between > div.content__sidebar > div.card.card__bg1.mb-4.mb-hidden > div.card__title.title__no-icon.d-flex.justify-content-between > h2")
        ? true
        : false;
    let movieBool = document.querySelector("body > section > div > div.content > div > div.content__sidebar > div.card.card__bg1.mb-4 > div.card__title.title__1 > h2 > strong")
        ? true
        : false;
    if (!seriesBool && !movieBool) {
        video = null;
    }
    if (seriesBool) {
        let seriesTitle = document.querySelector("body > section > div > div > div.content__inner.movie__page.d-flex.justify-content-between > div.content__container > div > div.card__content.pb-md-1.pb-0 > div > div.watch__title > div.watch__title__name > div > h2").textContent;
        presenceData.details = seriesTitle.split("-")[0];
        presenceData.state = seriesTitle.split("-")[1].replace("n", "n |");
    }
    else if (movieBool) {
        let movieTitle = document.querySelector("body > section > div > div.content > div > div.content__container > div:nth-child(1) > div > div > div.watch__title > div.watch__title__name > div > h2").textContent;
        let movieTitle2 = document.querySelector("body > section > div > div.content > div > div.content__container > div:nth-child(1) > div > div > div.watch__title > div.watch__title__name > div > span").textContent;
        presenceData.details = movieTitle;
        presenceData.state = movieTitle2;
    }
    else {
        presenceData.details = (await strings).browsing;
        presenceData.startTimestamp = startTimestamp;
    }
    if (video) {
        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused
            ? (await strings).paused
            : (await strings).playing;
        if (!video.paused && video.duration) {
            let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }
    }
    presence.setActivity(presenceData);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDakMsT0FBTyxFQUFFLDJCQUEyQjtJQUNwQyxNQUFNLEVBQUUsMEJBQTBCO0lBQ2xDLFFBQVEsRUFBRSw0QkFBNEI7Q0FDdEMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbkQsSUFBSSxLQUF1QixDQUFDO0FBRTVCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtJQUNyQyxJQUFJLENBQUMsR0FBRztRQUFFLE9BQU87SUFDakIsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxRQUFRO0tBQ3ZCLENBQUM7SUFFRixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN0Qyw0TkFBNE4sQ0FDNU47UUFDQSxDQUFDLENBQUMsSUFBSTtRQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDVCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNyQyxvSUFBb0ksQ0FDcEk7UUFDQSxDQUFDLENBQUMsSUFBSTtRQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFVCxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQzlCLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDYjtJQUlELElBQUksVUFBVSxFQUFFO1FBQ2YsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdkMseU5BQXlOLENBQ3pOLENBQUMsV0FBVyxDQUFDO1FBRWQsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ25FO1NBR0ksSUFBSSxTQUFTLEVBQUU7UUFDbkIsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdEMseUpBQXlKLENBQ3pKLENBQUMsV0FBVyxDQUFDO1FBQ2QsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdkMsMkpBQTJKLENBQzNKLENBQUMsV0FBVyxDQUFDO1FBRWQsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDbEMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7S0FDakM7U0FHSTtRQUNKLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNoRCxZQUFZLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztLQUM3QztJQUVELElBQUksS0FBSyxFQUFFO1FBQ1YsWUFBWSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM3RCxZQUFZLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxNQUFNO1lBQ3pDLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsTUFBTTtZQUN4QixDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3BDLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUMxQixDQUFDO1lBQ0YsWUFBWSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsWUFBWSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7S0FDRDtJQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzlELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRCxDQUFDIn0=