var iframe = new iFrame();
let videoMessage;

iframe.on("UpdateData", async () => {
    

    let title = document.querySelector('div.vjs-title-control > div');
    let season = document.querySelector('div.episode-selector.episode-selector-container > h3');
    let video: HTMLVideoElement = document.querySelector('video');
    
    if (video) {
        
        videoMessage = {
            paused: video.paused,
            duration: video.duration,
            currentTime: video.currentTime
        }
    
    }

    if (!title || !title.textContent) return;

    // Series

    if (title.textContent.includes('Bölüm')) {
        let titleArr = title.textContent.split('.'), epTitle: string;
        
        epTitle = titleArr[0].charAt(titleArr[0].length - 1)+"."+titleArr[1];
        
        let rx = new RegExp(epTitle, "g");
        let seriesName: string = title.textContent.charAt(0) === epTitle.split('.')[0] ? title.textContent.replace(rx, '') : null;
        
        iframe.send({
            video: {
                ...videoMessage
            },
            series: {
                seriesName,
                ep: epTitle,
                season: season && season.textContent && season.textContent.includes('Sezon') ? season.textContent : '1. Sezon'
            }
        });

    }

    //Movies

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
