const presence = new Presence({
    clientId: "633985961604415519"
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
    const player = document.querySelector("#audio-player_html5_api"), playing = player ? (player.paused ? false : true) : false;
    const data = {
        largeImageKey: "fizy-logo"
    };
    const songName = document.querySelector("body > div.main-wrapper.ng-scope > ui-view > main > div > media-player > div > div.player > div.player__wrapper > div.player__metadata > div > div.player__media-name.radio__media-name > a"), artistName = document.querySelector("body > div.main-wrapper.ng-scope > ui-view > main > div > media-player > div > div.player > div.player__wrapper > div.player__metadata > div > div.player__media-artists > a"), timestamps = player
        ? getTimestamps(Math.floor(player.currentTime), Math.floor(player.duration))
        : null;
    if (songName &&
        songName.textContent != "" &&
        artistName &&
        artistName.textContent != "") {
        data.details = songName.textContent;
        data.state = artistName.textContent.trim();
        if (playing &&
            timestamps &&
            !isNaN(timestamps[0]) &&
            !isNaN(timestamps[1])) {
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
        }
        else if (!playing) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        data.smallImageText = playing
            ? (await strings).play
            : (await strings).pause;
        playing ? (data.smallImageKey = "play") : (data.smallImageKey = "pause");
        presence.setTrayTitle(songName.textContent);
        presence.setActivity(data);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBT0wsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxNQUFNLEdBQ1IsUUFBUSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBcUIsRUFDdkUsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFNUQsTUFBTSxJQUFJLEdBQXlCO1FBQ2pDLGFBQWEsRUFBRSxXQUFXO0tBQzNCLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNuQyw2TEFBNkwsQ0FDOUwsRUFDRCxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsOEtBQThLLENBQy9LLEVBQ0QsVUFBVSxHQUFHLE1BQU07UUFDakIsQ0FBQyxDQUFDLGFBQWEsQ0FDWCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQzVCO1FBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUVYLElBQ0UsUUFBUTtRQUNSLFFBQVEsQ0FBQyxXQUFXLElBQUksRUFBRTtRQUMxQixVQUFVO1FBQ1YsVUFBVSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQzVCO1FBQ0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzQyxJQUNFLE9BQU87WUFDUCxVQUFVO1lBQ1YsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNyQjtZQUNBLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DO2FBQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPO1lBQzNCLENBQUMsQ0FBQyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSTtZQUN0QixDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMxQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBRXpFLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUI7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9