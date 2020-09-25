const presence = new Presence({
    clientId: "758692661846081615"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
}), presenceData = {
    largeImageKey: 'ifi-logo'
}, browsingStamp = Math.floor(Date.now() / 1000), pages = {
    "/": "Ana Sayfa",
    "/turkce-altyazili-film-izle": "Türkçe Altyazılı Filmler",
    "/en-cok-goruntulenen-filmler": "En Çok Görüntülenen Filmler",
    "/imdb-7-filmler": "IMDb 7+ Filmler",
    "/arama-robotu": "Tavsiye Robotu",
    "/boxset-seri-filmler": "Boxset – Seri Filmler",
    "/oyuncu-listesi": "Oyuncular",
    "/yabanci-dizi-izle": "Yabancı Diziler",
    "/haberler": "Haberler",
    "/iletisim": "İletişim",
    "/efsane-filmler": "Efsane Filmler"
};
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
const video = {};
presence.on("iFrameData", (data) => {
    if (!data.error) {
        video.dataAvailable = true;
        video.currentTime = data.currentTime;
        video.duration = data.duration;
        video.paused = data.paused;
    }
});
presence.on("UpdateData", async () => {
    const page = document.location.pathname, movieTitle = document.querySelector("#t1 > li > div.ssag > h1")?.textContent.split('|')[0].replace('izle', ''), isVideoData = Object.keys(video).length > 0 ? true : false;
    if (page.includes("/?s")) {
        presenceData.details = "Arama sonuçları:";
        presenceData.state = document.querySelector("#sayfa > div.sayfa-sol > div:nth-child(1)")?.textContent.replace(' Video Arama Sonuçları', '');
    }
    if (pages[page] || pages[page.slice(0, -1)]) {
        presenceData.details = "Bir sayfaya göz atıyor:";
        presenceData.state = pages[page] || pages[page.slice(0, -1)];
        presenceData.startTimestamp = browsingStamp;
    }
    if (page.startsWith('/kategori/')) {
        presenceData.details = "Bir kategoriye göz atıyor:";
        presenceData.state = document.querySelector("#sayfa > div.sayfa-sol > div.t-baslik")?.textContent;
        presenceData.startTimestamp = browsingStamp;
    }
    if (page.startsWith('/uye/')) {
        if (document.querySelector("#sayfa > div.uye-sol > div.kullanici > h4")?.textContent) {
            presenceData.details = "Bir üyeye göz atıyor:";
            presenceData.state = document.querySelector("#sayfa > div.uye-sol > div.kullanici > h4")?.textContent;
        }
        if ((new URLSearchParams(window.location.search)).get('i') == 'wl') {
            presenceData.details = "Bir sayfaya göz atıyor:";
            presenceData.state = "İzleme Listem";
        }
        else if ((new URLSearchParams(window.location.search)).get('i') == 'v') {
            presenceData.details = "Bir sayfaya göz atıyor:";
            presenceData.state = "Video Yöneticisi";
        }
        else if ((new URLSearchParams(window.location.search)).get('i') == 'e') {
            presenceData.details = "Bir sayfaya göz atıyor:";
            presenceData.state = "Bilgileri Düzenle";
        }
    }
    if (document.querySelector("#t1 > li > div.ssag > h1")?.textContent && video?.currentTime && isVideoData) {
        let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        if (!isNaN(timestamps[0]) && !isNaN(timestamps[1])) {
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
        }
        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused ? (await strings).pause : (await strings).play;
        presenceData.state = movieTitle;
        if (movieTitle.includes('Sezon') && movieTitle.includes('Bölüm'))
            presenceData.details = 'Bir dizi izliyor:';
        else
            presenceData.details = 'Bir film izliyor:';
        if (video.paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
        }
    }
    else if (document.querySelector("#t1 > li > div.ssag > h1")?.textContent && isVideoData) {
        if (movieTitle.includes('Sezon') && movieTitle.includes('Bölüm'))
            presenceData.details = 'Bir diziye göz atıyor:';
        else
            presenceData.details = 'Bir filme göz atıyor:';
        presenceData.state = movieTitle;
        presenceData.startTimestamp = browsingStamp;
    }
    if (/\/dizi\/.+\//g.test(page) && document.querySelector("#t1 > li > div.ssag > h1")) {
        presenceData.details = 'Bir diziyi inceliyor:';
        presenceData.state = document.querySelector("#t1 > li > div.ssag > h1")?.textContent;
        presenceData.startTimestamp = browsingStamp;
    }
    if (!presenceData.details || !presenceData.state) {
        presenceData.details = 'Bilinmeyen bir sayfada...';
        presenceData.startTimestamp = browsingStamp;
    }
    presence.setActivity(presenceData);
});
