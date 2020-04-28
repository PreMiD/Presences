var iframe = new iFrame();
let videoMessage;
iframe.on("UpdateData", async () => {
    const title = document.querySelector("div.vjs-title-control > div");
    const season = document.querySelector("div.episode-selector.episode-selector-container > h3");
    const video = document.querySelector("video");
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
        const titleArr = title.textContent.split("."), epTitle = titleArr[0].charAt(titleArr[0].length - 1) + "." + titleArr[1];
        const rx = new RegExp(epTitle, "g");
        const seriesName = title.textContent.charAt(0) != epTitle.split(".")[0]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsSUFBSSxZQUFZLENBQUM7QUFFakIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ25DLHNEQUFzRCxDQUN2RCxDQUFDO0lBQ0YsTUFBTSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFaEUsSUFBSSxLQUFLLEVBQUU7UUFDVCxZQUFZLEdBQUc7WUFDYixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDcEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztTQUMvQixDQUFDO0tBQ0g7SUFFRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7UUFBRSxPQUFPO0lBSXpDLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDdkMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzNDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzRSxNQUFNLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsTUFBTSxVQUFVLEdBQ2QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVYLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDVixLQUFLLEVBQUU7Z0JBQ0wsR0FBRyxZQUFZO2FBQ2hCO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxVQUFVO2dCQUNoQixFQUFFLEVBQUUsT0FBTztnQkFDWCxNQUFNLEVBQ0osTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO29CQUNsRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVc7b0JBQ3BCLENBQUMsQ0FBQyxVQUFVO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7U0FHSTtRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDVixLQUFLLEVBQUU7Z0JBQ0wsR0FBRyxZQUFZO2FBQ2hCO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxLQUFLLENBQUMsV0FBVzthQUN4QjtTQUNGLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==