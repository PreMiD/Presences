const presence = new Presence({
    clientId: "818550584994168934"
});

let stream: { duration: number; currentTime: number; paused: boolean };
presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) =>
    (stream = data)
);

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}


presence.on("UpdateData", async () => {
    const path: string = document.location.pathname;
    const presenceData: PresenceData = {largeImageKey: "diziroll"};
    if(path.startsWith("/arsiv")){
    presenceData.details = "Bir sayfaya bakıyor:";
    presenceData.state = "Arşiv";
    presenceData.startTimestamp = Date.now();
    }else if(path.startsWith("/listeler")){
    presenceData.details = "Bir sayfaya bakıyor:";
    presenceData.state = "Listeler";
    presenceData.startTimestamp = Date.now(); 
    }else if(path.startsWith("/hesabim")){
        presenceData.details = "Bir sayfaya bakıyor:";
        presenceData.state = "Hesabım";
        presenceData.startTimestamp = Date.now();    
    }else if(path == "/"){
        presenceData.details = "Bir sayfaya bakıyor:";
        presenceData.state = "Ana Sayfa";
        presenceData.startTimestamp = Date.now();  
    }else if(document.getElementById("archive-page")){
        presenceData.details = "Bir dizi türünü inceliyor: ";
        presenceData.state = document.querySelector("div.title").innerText;
        presenceData.startTimestamp = Date.now();    
    }else if(document.getElementById("series-page")){
        presenceData.details = "Bir diziyi inceliyor:";
        presenceData.state = document.querySelector("div.top > h1").innerText;
        presenceData.startTimestamp = Date.now();  
    }else if(document.getElementsByClassName("episode-detail").length > 0){
        presenceData.details = document.getElementsByClassName("series-name")[0].title || "Bulunamadı";
        presenceData.state = `${document.querySelector("div.select-season > a").innerText ? document.querySelector("div.select-season > a").innerText : "Bulunamadı"}- ${document.querySelector("div.select-episode > a").innerText ? document.querySelector("div.select-episode > a").innerText : "Bulunamadı"}`;
        presenceData.buttons = [
          {label: "İzle", url: document.location.href},
          {label: "Diziyi Görüntüle", url: document.location.origin + "/" +document.location.pathname.split("/")[1]}
        ];
        if (stream.paused == true) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "Durduruldu";
          } else {
            const timestamps = getTimestamps(
              Math.floor(stream?.currentTime),
              Math.floor(stream?.duration)
            );
      
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Oynatılıyor";
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
          }

    }
    presence.setActivity(presenceData);
});
