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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsSUFBSSxZQUFZLENBQUM7QUFFakIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbEMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ2xFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLHNEQUFzRCxDQUN0RCxDQUFDO0lBQ0YsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUQsSUFBSSxLQUFLLEVBQUU7UUFDVixZQUFZLEdBQUc7WUFDZCxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDcEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztTQUM5QixDQUFDO0tBQ0Y7SUFFRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7UUFBRSxPQUFPO0lBSXpDLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDeEMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzFDLE9BQWUsQ0FBQztRQUVqQixPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekUsSUFBSSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksVUFBVSxHQUNiLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFVCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1gsS0FBSyxFQUFFO2dCQUNOLEdBQUcsWUFBWTthQUNmO1lBQ0QsTUFBTSxFQUFFO2dCQUNQLElBQUksRUFBRSxVQUFVO2dCQUNoQixFQUFFLEVBQUUsT0FBTztnQkFDWCxNQUFNLEVBQ0wsTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO29CQUNuRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVc7b0JBQ3BCLENBQUMsQ0FBQyxVQUFVO2FBQ2Q7U0FDRCxDQUFDLENBQUM7S0FDSDtTQUdJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQztZQUNYLEtBQUssRUFBRTtnQkFDTixHQUFHLFlBQVk7YUFDZjtZQUNELEtBQUssRUFBRTtnQkFDTixJQUFJLEVBQUUsS0FBSyxDQUFDLFdBQVc7YUFDdkI7U0FDRCxDQUFDLENBQUM7S0FDSDtBQUNGLENBQUMsQ0FBQyxDQUFDIn0=