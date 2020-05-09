var presence = new Presence({
    clientId: "707985888814039040"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function getAuthorString() {
    var authors = document.querySelectorAll("#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.leftColumn--5B2JF > div.dragItem--3WWiC > div.mediaInformation--1dAUh > div.mediaArtists--3UIyd > a"), authorsArray, authorString;
    if (authors.length > 1) {
        authorsArray = Array.from(authors);
        authorString = `${authorsArray
            .slice(0, authorsArray.length - 1)
            .map((a) => a.innerText)
            .join(", ")} - ${authorsArray[authorsArray.length - 1].innerText}`;
    }
    else
        authorString = document.querySelector("#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.leftColumn--5B2JF > div.dragItem--3WWiC > div.mediaInformation--1dAUh > div.mediaArtists--3UIyd > a").innerText;
    return authorString;
}
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
presence.on("UpdateData", async () => {
    var title = document.querySelector("#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.leftColumn--5B2JF > div.dragItem--3WWiC > div.mediaInformation--1dAUh > span > a").innerText, current = document.querySelector("#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.rightColumn--ZsskN > div:nth-child(2) > time.currentTime--2fCqA").innerText, fulltime = document.querySelector("#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.rightColumn--ZsskN > div:nth-child(2) > time.duration--3f3-B").innerText, playingfrom = document.querySelector("#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.leftColumn--5B2JF > div.dragItem--3WWiC > div.mediaInformation--1dAUh > div.container--UiaTi.playingFrom--3x_p7 > a > h4").innerText, playingbutton = document.querySelector("#wimp > div > div > div > div.footerPlayer--2d1-L > div.bottomRow--25xS1 > div.centerColumn--1MAnN > div > button.playback-controls__button--white-icon.playbackToggle--1eQO2").attributes["data-type"];
    if (title !== "" && current) {
        var a = current.replace(":", " ").split(" ").slice(0);
        var b = fulltime.replace(":", " ").split(" ").slice(0);
        var a1 = Number(a[0]);
        var a2 = Number(a[1]);
        var b1 = Number(b[0]);
        var b2 = Number(b[1]);
        var videoCurrent = a1 * 60 + a2;
        var videoFull = b1 * 60 + b2;
        var timestamps = getTimestamps(Math.floor(videoCurrent), Math.floor(videoFull)), presenceData = {
            details: playingfrom ? `${title} (From: ${playingfrom})` : title,
            state: getAuthorString(),
            largeImageKey: "tidal-logo",
            smallImageKey: "play",
            smallImageText: (await strings).play,
            startTimestamp: timestamps[0],
            endTimestamp: timestamps[1]
        };
        if (playingbutton.textContent === "button__pause") {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = (await strings).pause;
            presence.setTrayTitle();
        }
        else
            presence.setTrayTitle(title);
        presence.setActivity(presenceData);
    }
    else
        presence.setActivity();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQVEsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNqQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsU0FBUyxlQUFlO0lBRXRCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDbkMsb0xBQW9MLENBQ3BKLEVBQ2xDLFlBQXNDLEVBQ3RDLFlBQW9CLENBQUM7SUFHdkIsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUV0QixZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUduQyxZQUFZLEdBQUcsR0FBRyxZQUFZO2FBQzNCLEtBQUssQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDakMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUN0RTs7UUFDQyxZQUFZLEdBQUksUUFBUSxDQUFDLGFBQWEsQ0FDcEMsb0xBQW9MLENBQy9KLENBQUMsU0FBUyxDQUFDO0lBRXBDLE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFPRCxTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLEtBQUssR0FBSSxRQUFRLENBQUMsYUFBYSxDQUMvQixpS0FBaUssQ0FDbEosQ0FBQyxTQUFTLEVBQzNCLE9BQU8sR0FBSSxRQUFRLENBQUMsYUFBYSxDQUMvQixnSkFBZ0osQ0FDakksQ0FBQyxTQUFTLEVBQzNCLFFBQVEsR0FBSSxRQUFRLENBQUMsYUFBYSxDQUNoQyw2SUFBNkksQ0FDOUgsQ0FBQyxTQUFTLEVBQzNCLFdBQVcsR0FBSSxRQUFRLENBQUMsYUFBYSxDQUNuQyx5TUFBeU0sQ0FDMUwsQ0FBQyxTQUFTLEVBQzNCLGFBQWEsR0FBSSxRQUFRLENBQUMsYUFBYSxDQUNyQywrS0FBK0ssQ0FDaEssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFNUMsSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLE9BQU8sRUFBRTtRQUMzQixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksWUFBWSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLElBQUksU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRTdCLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FDdEIsRUFDRCxZQUFZLEdBQWlCO1lBQzNCLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxXQUFXLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQ2hFLEtBQUssRUFBRSxlQUFlLEVBQUU7WUFDeEIsYUFBYSxFQUFFLFlBQVk7WUFDM0IsYUFBYSxFQUFFLE1BQU07WUFDckIsY0FBYyxFQUFFLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJO1lBQ3BDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQzVCLENBQUM7UUFFSixJQUFJLGFBQWEsQ0FBQyxXQUFXLEtBQUssZUFBZSxFQUFFO1lBQ2pELE9BQU8sWUFBWSxDQUFDLGNBQWMsQ0FBQztZQUNuQyxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7WUFDakMsWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3BELFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN6Qjs7WUFBTSxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7O1FBQU0sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2hDLENBQUMsQ0FBQyxDQUFDIn0=