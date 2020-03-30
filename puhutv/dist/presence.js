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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQVEsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNsQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdEMseUdBQXlHLENBQzFGLENBQUM7SUFFakIsSUFDQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHO1FBQ2pDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRO1FBQzNCLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEVBQ3JDO1FBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNwQixhQUFhLEVBQUUsV0FBVztZQUMxQixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQzdDLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLEtBQUssRUFBRSxRQUFRLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVztTQUN4RSxDQUFDLENBQUM7S0FDSDtTQUFNO1FBQ04sTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbkMsbUNBQW1DLENBQ2YsQ0FBQztRQUV0QixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87YUFDZDtZQUNKLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFh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