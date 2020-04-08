const presence = new Presence({
    clientId: "628341182581440531"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("UpdateData", async () => {
    const category = document.querySelector("#widget_serie_contents_3 > section > div > div > div.category-main-content-right > header > h1 > strong");
    if (document.location.pathname == "/" ||
        !document.location.pathname ||
        (category && category.innerHTML != "")) {
        presence.setActivity({
            largeImageKey: "puhu-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Geziniyor...",
            state: category && category.innerHTML ? category.innerHTML : "Ana Sayfa"
        });
    }
    else {
        const video = document.querySelector("#dyg_player_dogusPlayer_html5_api");
        if (!video)
            return;
        else {
            const title = document.querySelector("#widget_video_detail_3 > section.hero.hero--video-detay.hero--subpages > header > div > div.video-detay-header-content > h1 > a"), episode = title &&
                document.querySelector("#widget_video_detail_3 > section.hero.hero--video-detay.hero--subpages > header > div > div.video-detay-header-content > h1")
                ? document
                    .querySelector("#widget_video_detail_3 > section.hero.hero--video-detay.hero--subpages > header > div > div.video-detay-header-content > h1")
                    .innerHTML.replace(title.outerHTML + " ", "")
                : null, timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            if (!title || title.innerHTML == "")
                return;
            const data = {
                largeImageKey: "puhu-logo",
                details: title.innerHTML,
                state: episode != ""
                    ? episode
                    : `${document.querySelector("#widget_serie_detail_tab_5 > section > div > div > div > div.kunye-content-left > div:nth-child(3)")
                        ? document.querySelector("#widget_serie_detail_tab_5 > section > div > div > div > div.kunye-content-left > div:nth-child(3)").innerText.replace("\n", ": ")
                        : null}`,
                smallImageKey: video.paused ? "paused" : "playing",
                smallImageText: video.paused
                    ? (await strings).pause
                    : (await strings).play
            };
            if (!isNaN(timestamps[0]) && !isNaN(timestamps[1])) {
                data.startTimestamp = timestamps[0];
                data.endTimestamp = timestamps[1];
            }
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
            presence.setActivity(data);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQVEsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNqQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBT0wsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxRQUFRLEdBQ1osUUFBUSxDQUFDLGFBQWEsQ0FDcEIseUdBQXlHLENBQzNGLENBQUM7SUFFbkIsSUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHO1FBQ2pDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRO1FBQzNCLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEVBQ3RDO1FBQ0EsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNuQixhQUFhLEVBQUUsV0FBVztZQUMxQixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzdDLE9B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