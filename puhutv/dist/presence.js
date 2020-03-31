const presence = new Presence({
    clientId: "628341182581440531"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
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
            let data = {
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
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now(), endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQVEsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNqQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDckMseUdBQXlHLENBQzNGLENBQUM7SUFFakIsSUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHO1FBQ2pDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRO1FBQzNCLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEVBQ3RDO1FBQ0EsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNuQixhQUFhLEVBQUUsV0FBVztZQUMxQixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzdDLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLEtBQUssRUFBRSxRQUFRLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVztTQUN6RSxDQUFDLENBQUM7S0FDSjtTQUFNO1FBQ0wsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMsbUNBQW1DLENBQ2hCLENBQUM7UUFFdEIsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO2FBQ2Q7WUFDSCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFB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