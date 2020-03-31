var iframe = new iFrame();
let videoMessage;
iframe.on("UpdateData", async () => {
    let title = document.querySelector("div.vjs-title-control > div");
    let season = document.querySelector("div.episode-selector.episode-selector-container > h3");
    let video = document.querySelector("video");
    if (video) {
        videoMessage = {
            paused: video.paused,
            duration: video.duration,
            currentTime: video.currentTime
        };
    }
    if (!title || !title.textContent)
        return;
    if (title.textContent.includes("Bölüm")) {
        let titleArr = title.textContent.split("."), epTitle;
        epTitle = titleArr[0].charAt(titleArr[0].length - 1) + "." + titleArr[1];
        let rx = new RegExp(epTitle, "g");
        let seriesName = title.textContent.charAt(0) != epTitle.split(".")[0]
            ? title.textContent.replace(rx, "")
            : null;
        iframe.send({
            video: {
                ...videoMessage
            },
            series: {
                name: seriesName,
                ep: epTitle,
                season: season && season.textContent && season.textContent.includes("Sezon")
                    ? season.textContent
                    : "1. Sezon"
            }
        });
    }
    else {
        iframe.send({
            video: {
                ...videoMessage
            },
            movie: {
                name: title.textContent
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsSUFBSSxZQUFZLENBQUM7QUFFakIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ2xFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2pDLHNEQUFzRCxDQUN2RCxDQUFDO0lBQ0YsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUQsSUFBSSxLQUFLLEVBQUU7UUFDVCxZQUFZLEdBQUc7WUFDYixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDcEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztTQUMvQixDQUFDO0tBQ0g7SUFFRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7UUFBRSxPQUFPO0lBSXpDLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDdkMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3pDLE9BQWUsQ0FBQztRQUVsQixPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekUsSUFBSSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksVUFBVSxHQUNaLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFWCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1YsS0FBSyxFQUFFO2dCQUNMLEdBQUcsWUFBWTthQUNoQjtZQUNELE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsTUFBTSxFQUNKLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztvQkFDbEUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXO29CQUNwQixDQUFDLENBQUMsVUFBVTthQUNqQjtTQUNGLENBQUMsQ0FBQztLQUNKO1NBR0k7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1YsS0FBSyxFQUFFO2dCQUNMLEdBQUcsWUFBWTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsS0FBSyxDQUFDLFdBQVc7YUFDeEI7U0FDRixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQyxDQUFDIn0=