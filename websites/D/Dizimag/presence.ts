const presence = new Presence({
  clientId: "777146104117854230"
});

let stream: { duration: number; currentTime: number; paused: boolean };
presence.on("iFrameData",(data: { duration: number; currentTime: number; paused: boolean }) => stream = data);

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
  const path: string = document.location.pathname,
  ayrac: string[] = path.split("/"),
  test: PresenceData = {
      largeImageKey: "dizimag"
  };
    if(path.startsWith("/uye-ol")){

      test.details = "Bir sayfaya bakıyor:";
      test.state = "Üye Ol";
      test.startTimestamp = Date.now();

    }else if(path.startsWith("/yabanci-diziler")){

      test.details = "Bir sayfaya bakıyor:";
      test.state = "Yabancı Diziler";
      test.startTimestamp = Date.now();

    }else if(path.startsWith("/iletisim")){

      test.details = "Bir sayfaya bakıyor:";
      test.state = "İletişim";
      test.startTimestamp = Date.now();

    }else if(path.startsWith("/gelisme-sureci")){

      test.details = "Bir sayfaya bakıyor:";
      test.state = "Gelişme Süreci";
      test.startTimestamp = Date.now();

    }else if(path.startsWith("/ne-izlesem")){

      test.details = "Bir sayfaya bakıyor:";
      test.state = "Ne İzlesem?";
      test.startTimestamp = Date.now();

    }else if(path.startsWith("/trend")){

      test.details = "Bir sayfaya bakıyor:";
      test.state = "Trendler";
      test.startTimestamp = Date.now();

    }else if(path.startsWith("/uye")){
      const name: string = document.querySelector("span.text-white").textContent;
      test.details = "Bir profile bakıyor:";
      test.state = name;
      test.startTimestamp = Date.now();

    }else if(path.startsWith("/oyuncu")){

      const name: string = document.querySelector("div.text-orange > div.pull-left").textContent;
      test.details = "Bir oyuncuya bakıyor:";
      test.state = name || "Bulunamadı";
      test.startTimestamp = Date.now();

    }else if(path.startsWith("/dizi") && ayrac[3] == ""){
        const name: string = document.querySelector("h1.text-nowrap").textContent;
        test.details = "Bir diziye bakıyor:";
        test.state = name || "Bulunamadı";
        test.startTimestamp = Date.now();

    }else if(!isNaN(stream.duration) && !isNaN(stream.currentTime) && typeof stream.paused == "boolean"){

      const name: string[] = document.querySelector("h1.text-sans > a").textContent.split("-");
        // let name1: string = document.querySelector("span.text-orange").textContent;
        test.details = name[0] || "Bulunamadı";
        test.state = name[1] || "Bulunamadı";

      if(stream.paused == true){

        test.smallImageKey = "pause";
        test.smallImageText = "Durduruldu";
        delete test.startTimestamp;
        delete test.endTimestamp;

      }else{
        const timestamps = getTimestamps(
          Math.floor(stream?.currentTime),
          Math.floor(stream?.duration)
        );

        test.smallImageKey = "play";
        test.smallImageText = "Oynatılıyor";
        test.startTimestamp = timestamps[0];
        test.endTimestamp = timestamps[1];

      }
    }else if(path == "/" || path == "/profil"){
      test.details = "Bir sayfaya bakıyor:";
      test.state = "Ana Sayfa";
      test.startTimestamp = Date.now();
    }

    presence.setActivity(test);
});
