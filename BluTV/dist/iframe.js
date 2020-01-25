var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var iframe = new iFrame();
let videoMessage;
iframe.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let title = document.querySelector('div.vjs-title-control > div');
    let season = document.querySelector('div.episode-selector.episode-selector-container > h3');
    let video = document.querySelector('video');
    if (video) {
        videoMessage = {
            paused: video.paused,
            duration: video.duration,
            currentTime: video.currentTime
        };
    }
    if (!title || !title.textContent)
        return;
    if (title.textContent.includes('Bölüm')) {
        let titleArr = title.textContent.split('.'), epTitle;
        epTitle = titleArr[0].charAt(titleArr[0].length - 1) + "." + titleArr[1];
        let rx = new RegExp(epTitle, "g");
        let seriesName = title.textContent.charAt(0) != epTitle.split('.')[0] ? title.textContent.replace(rx, '') : null;
        iframe.send({
            video: Object.assign({}, videoMessage),
            series: {
                name: seriesName,
                ep: epTitle,
                season: season && season.textContent && season.textContent.includes('Sezon') ? season.textContent : '1. Sezon'
            }
        });
    }
    else {
        iframe.send({
            video: Object.assign({}, videoMessage),
            movie: {
                name: title.textContent
            }
        });
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsSUFBSSxZQUFZLENBQUM7QUFFakIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBRy9CLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUNsRSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNEQUFzRCxDQUFDLENBQUM7SUFDNUYsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUQsSUFBSSxLQUFLLEVBQUU7UUFFUCxZQUFZLEdBQUc7WUFDWCxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDcEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztTQUNqQyxDQUFBO0tBRUo7SUFFRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7UUFBRSxPQUFPO0lBSXpDLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDckMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBZSxDQUFDO1FBRTdELE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRSxJQUFJLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxVQUFVLEdBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFekgsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNSLEtBQUssb0JBQ0UsWUFBWSxDQUNsQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsTUFBTSxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFVO2FBQ2pIO1NBQ0osQ0FBQyxDQUFDO0tBRU47U0FJSTtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDUixLQUFLLG9CQUNFLFlBQVksQ0FDbEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLEtBQUssQ0FBQyxXQUFXO2FBQzFCO1NBQ0osQ0FBQyxDQUFDO0tBRU47QUFHTCxDQUFDLENBQUEsQ0FBQyxDQUFDIn0=