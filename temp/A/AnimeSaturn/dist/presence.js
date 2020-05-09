const presence = new Presence({
    clientId: "669254632400355358"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
const browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo, currentTime, duration, paused, playback;
let pageNumber;
let videoName;
let videoEpisode;
let fullName;
let timestamps;
presence.on("iFrameData", (data) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.duration;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "asnew"
    };
    if (document.location.pathname == "/") {
        data.smallImageKey = "home";
        data.smallImageText = "Homepage";
        data.details = "Nella homepage";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/animelist")) {
        data.smallImageKey = "archive";
        data.smallImageText = "Archivio";
        data.details = "Sfoglia l'archivio";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/toplist")) {
        data.smallImageKey = "top";
        data.smallImageText = "Top degli anime";
        data.details = "Guarda la top list degli";
        data.state = "anime";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/animeincorso")) {
        if (document.location.href.includes("?page=")) {
            pageNumber = document.location.href.split("=")[1].split("#")[0];
            data.smallImageKey = "schedule";
            data.smallImageText = "Anime in corso";
            data.details = "Sfoglia gli anime in corso";
            data.state = "Pagina: " + pageNumber;
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "schedule";
            data.smallImageText = "Nuove aggiunte";
            data.details = "Sfoglia gli anime in corso";
            data.state = "Pagina: 1";
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/newest")) {
        if (document.location.href.includes("?page=")) {
            pageNumber = document.location.href.split("=")[1].split("#")[0];
            data.smallImageKey = "new";
            data.smallImageText = "Nuove aggiunte";
            data.details = "Sfoglia le nuove aggiunte";
            data.state = "Pagina: " + pageNumber;
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "new";
            data.smallImageText = "Nuove aggiunte";
            data.details = "Sfoglia le nuove aggiunte";
            data.state = "Pagina: 1";
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/upcoming")) {
        if (document.location.href.includes("?page=")) {
            pageNumber = document.location.href.split("=")[1].split("#")[0];
            data.smallImageKey = "schedule";
            data.smallImageText = "Prossime uscite";
            data.details = "Sfoglia le prossime uscite";
            data.state = "Pagina: " + pageNumber;
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "schedule";
            data.smallImageText = "Prossime uscite";
            data.details = "Sfoglia le prossime uscite";
            data.state = "Pagina: 1";
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/calendario")) {
        data.smallImageKey = "schedule";
        data.smallImageText = "Calendario";
        data.details = "Guarda il calendario degli";
        data.state = "anime";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/info")) {
        data.smallImageKey = "info";
        data.smallImageText = "Contatti";
        data.details = "Cerca di contattare lo";
        data.state = "staff di AnimeSaturn";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/anime")) {
        videoName = document.title
            .split("AnimeSaturn - ")[1]
            .split(" Streaming ")[0];
        if (videoName.includes(" (ITA)")) {
            videoName = videoName.replace(" (ITA)", "");
        }
        data.smallImageKey = "viewing";
        data.smallImageText = "Scheda di: " + videoName;
        data.details = "Guarda la scheda di:";
        data.state = videoName;
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/ep/")) {
        videoName = document.title
            .split("AnimeSaturn - ")[1]
            .split(" Episodio ")[0];
        if (videoName.includes(" (ITA)")) {
            videoName = videoName.replace(" (ITA)", "");
        }
        videoEpisode = document.title
            .split(" Episodio ")[1]
            .split(" Streaming ")[0];
        data.smallImageKey = "watching";
        data.smallImageText = "Sta per guardare: " + videoName;
        data.details = "Sta per guardare:\n" + videoName;
        data.state = "Episodio: " + videoEpisode;
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/movie/")) {
        videoName = document.title.split("AnimeSaturn - ")[1].split(" Movie ")[0];
        if (videoName.includes(" Movie")) {
            videoName = videoName.replace(" Movie", "");
        }
        if (videoName.includes(" (ITA)")) {
            videoName = videoName.replace(" (ITA)", "");
        }
        data.smallImageKey = "watching";
        data.smallImageText = "Sta per guardare il film: " + videoName;
        data.details = "Sta per guardare il film:";
        data.state = videoName;
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/oav/")) {
        videoName = document.title.split("AnimeSaturn - ")[1].split(" OVA ")[0];
        if (videoName.includes(" OVA")) {
            videoName = videoName.replace(" OVA", "");
        }
        if (videoName.includes(" OAV")) {
            videoName = videoName.replace(" OAV", "");
        }
        if (videoName.includes(" (ITA)")) {
            videoName = videoName.replace(" (ITA)", "");
        }
        data.smallImageKey = "watching";
        data.smallImageText = "Sta per guardare l'ova: " + videoName;
        data.details = "Sta per guardare l'ova:";
        data.state = videoName;
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/special/")) {
        videoName = document.title.split("AnimeSaturn - ")[1].split(" Special ")[0];
        if (videoName.includes(" Specials")) {
            videoName = videoName.replace(" Specials", "");
        }
        if (videoName.includes(" (ITA)")) {
            videoName = videoName.replace(" (ITA)", "");
        }
        data.smallImageKey = "watching";
        data.smallImageText = "Sta per guardare lo special: " + videoName;
        data.details = "Sta per guardare lo special:";
        data.state = videoName;
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/watch")) {
        fullName = document
            .querySelector("body > center > footer > div.container.rounded.bg-dark-as-box.text-white.mt-1.mb-1.p-2 > h4 > div")
            .textContent.trim();
        if (iFrameVideo === true) {
            timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
        }
        if (document.location.href.endsWith("=alt")) {
            if (fullName.includes(" Special")) {
                if (fullName.includes(" Specials Episodio ")) {
                    videoName = fullName.split(" Specials Episodio ")[0];
                    videoEpisode = fullName.split(" Specials Episodio ")[1];
                    if (videoName.includes(" (ITA)")) {
                        videoName = videoName.replace(" (ITA)", "");
                    }
                    data.smallImageKey = paused ? "pause" : "play";
                    data.smallImageText = paused ? "SA｜In pausa" : "SA｜In riproduzione";
                    data.details = "Guarda: " + videoName;
                    data.state = paused
                        ? videoEpisode + "° Special｜In pausa"
                        : videoEpisode + "° Special｜In riproduzione";
                    data.startTimestamp = paused ? "" : timestamps[0];
                    data.endTimestamp = paused ? "" : timestamps[1];
                    presence.setActivity(data);
                }
                else {
                    videoName = fullName.split(" Special ")[0];
                    videoEpisode = fullName.split(" Special ")[1];
                    if (videoName.includes(" Special")) {
                        videoName = videoName.replace(" Special", "");
                    }
                    if (videoName.includes(" (ITA)")) {
                        videoName = videoName.replace(" (ITA)", "");
                    }
                    data.smallImageKey = paused ? "pause" : "play";
                    data.smallImageText = paused ? "SA｜In pausa" : "SA｜In riproduzione";
                    data.details = "Guarda: " + videoName;
                    data.state = paused
                        ? videoEpisode + "° Special｜In pausa"
                        : videoEpisode + "° Special｜In riproduzione";
                    data.startTimestamp = paused ? "" : timestamps[0];
                    data.endTimestamp = paused ? "" : timestamps[1];
                    presence.setActivity(data);
                }
            }
            else if (fullName.includes(" Movie ")) {
                videoName = fullName.split(" Movie ")[0];
                if (videoName.includes(" Movie")) {
                    videoName = videoName.replace(" Movie", "");
                }
                if (videoName.includes(" (ITA)")) {
                    videoName = videoName.replace(" (ITA)", "");
                }
                data.smallImageKey = paused ? "pause" : "play";
                data.smallImageText = paused ? "SA｜In pausa" : "SA｜In riproduzione";
                data.details = "Guarda: " + videoName;
                data.state = paused ? "Film｜In pausa" : "Film｜In riproduzione";
                data.startTimestamp = paused ? "" : timestamps[0];
                data.endTimestamp = paused ? "" : timestamps[1];
                presence.setActivity(data);
            }
            else if (fullName.includes(" OVA ")) {
                videoName = fullName.split(" OVA ")[0];
                videoEpisode = fullName.split(" OVA ")[1];
                if (videoName.includes(" OVA")) {
                    videoName = videoName.replace(" OVA", "");
                }
                if (videoName.includes(" (ITA)")) {
                    videoName = videoName.replace(" (ITA)", "");
                }
                data.smallImageKey = paused ? "pause" : "play";
                data.smallImageText = paused ? "SA｜In pausa" : "SA｜In riproduzione";
                data.details = "Guarda: " + videoName;
                data.state = paused
                    ? videoEpisode + "° OVA｜In pausa"
                    : videoEpisode + "° OVA｜In riproduzione";
                data.startTimestamp = paused ? "" : timestamps[0];
                data.endTimestamp = paused ? "" : timestamps[1];
                presence.setActivity(data);
            }
            else {
                videoName = fullName.split(" Episodio ")[0];
                videoEpisode = fullName.split(" Episodio ")[1];
                if (videoName.includes(" (ITA)")) {
                    videoName = videoName.replace(" (ITA)", "");
                }
                data.smallImageKey = paused ? "pause" : "play";
                data.smallImageText = paused ? "SA｜In pausa" : "SA｜In riproduzione";
                data.details = "Guarda: " + videoName;
                data.state = paused
                    ? "Ep. " + videoEpisode + "｜In pausa"
                    : "Ep. " + videoEpisode + "｜In riproduzione";
                data.startTimestamp = paused ? "" : timestamps[0];
                data.endTimestamp = paused ? "" : timestamps[1];
                presence.setActivity(data);
            }
        }
        else {
            if (fullName.includes(" Special")) {
                if (fullName.includes(" Specials Episodio ")) {
                    videoName = fullName.split(" Specials Episodio ")[0];
                    videoEpisode = fullName.split(" Specials Episodio ")[1];
                    if (videoName.includes(" (ITA)")) {
                        videoName = videoName.replace(" (ITA)", "");
                    }
                    data.smallImageKey = paused ? "pause" : "play";
                    data.smallImageText = paused ? "SO｜In pausa" : "SO｜In riproduzione";
                    data.details = "Guarda: " + videoName;
                    data.state = paused
                        ? videoEpisode + "° Special｜In pausa"
                        : videoEpisode + "° Special｜In riproduzione";
                    data.startTimestamp = paused ? "" : timestamps[0];
                    data.endTimestamp = paused ? "" : timestamps[1];
                    presence.setActivity(data);
                }
                else {
                    videoName = fullName.split(" Special ")[0];
                    videoEpisode = fullName.split(" Special ")[1];
                    if (videoName.includes(" Special")) {
                        videoName = videoName.replace(" Special", "");
                    }
                    if (videoName.includes(" (ITA)")) {
                        videoName = videoName.replace(" (ITA)", "");
                    }
                    data.smallImageKey = paused ? "pause" : "play";
                    data.smallImageText = paused ? "SO｜In pausa" : "SO｜In riproduzione";
                    data.details = "Guarda: " + videoName;
                    data.state = paused
                        ? videoEpisode + "° Special｜In pausa"
                        : videoEpisode + "° Special｜In riproduzione";
                    data.startTimestamp = paused ? "" : timestamps[0];
                    data.endTimestamp = paused ? "" : timestamps[1];
                    presence.setActivity(data);
                }
            }
            else if (fullName.includes(" Movie ")) {
                videoName = fullName.split(" Movie ")[0];
                if (videoName.includes(" Movie")) {
                    videoName = videoName.replace(" Movie", "");
                }
                if (videoName.includes(" (ITA)")) {
                    videoName = videoName.replace(" (ITA)", "");
                }
                data.smallImageKey = paused ? "pause" : "play";
                data.smallImageText = paused ? "SO｜In pausa" : "SO｜In riproduzione";
                data.details = "Guarda: " + videoName;
                data.state = paused ? "Film｜In pausa" : "Film｜In riproduzione";
                data.startTimestamp = paused ? "" : timestamps[0];
                data.endTimestamp = paused ? "" : timestamps[1];
                presence.setActivity(data);
            }
            else if (fullName.includes(" OVA ")) {
                videoName = fullName.split(" OVA ")[0];
                videoEpisode = fullName.split(" OVA ")[1];
                if (videoName.includes(" OVA")) {
                    videoName = videoName.replace(" OVA", "");
                }
                if (videoName.includes(" (ITA)")) {
                    videoName = videoName.replace(" (ITA)", "");
                }
                data.smallImageKey = paused ? "pause" : "play";
                data.smallImageText = paused ? "SO｜In pausa" : "SO｜In riproduzione";
                data.details = "Guarda: " + videoName;
                data.state = paused
                    ? videoEpisode + "° OVA｜In pausa"
                    : videoEpisode + "° OVA｜In riproduzione";
                data.startTimestamp = paused ? "" : timestamps[0];
                data.endTimestamp = paused ? "" : timestamps[1];
                presence.setActivity(data);
            }
            else {
                videoName = fullName.split(" Episodio ")[0];
                videoEpisode = fullName.split(" Episodio ")[1];
                if (videoName.includes(" (ITA)")) {
                    videoName = videoName.replace(" (ITA)", "");
                }
                data.smallImageKey = paused ? "pause" : "play";
                data.smallImageText = paused ? "SO｜In pausa" : "SO｜In riproduzione";
                data.details = "Guarda: " + videoName;
                data.state = paused
                    ? "Ep. " + videoEpisode + "｜In pausa"
                    : "Ep. " + videoEpisode + "｜In riproduzione";
                data.startTimestamp = paused ? "" : timestamps[0];
                data.endTimestamp = paused ? "" : timestamps[1];
                presence.setActivity(data);
            }
        }
    }
    else if (document.location.pathname.startsWith("/admin")) {
        data.largeImageKey = "hitomi";
        data.smallImageKey = "working";
        data.smallImageText = "💜 Hitomi Lover";
        data.details = "Sta lavorando su";
        data.state = "AnimeSaturn";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else {
        data.smallImageKey = "search";
        data.smallImageText = "Navigando...";
        data.details = "Navigando...";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQU9ILFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BELElBQUksV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUN6RCxJQUFJLFVBQVUsQ0FBQztBQUNmLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxZQUFZLENBQUM7QUFDakIsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLFVBQVUsQ0FBQztBQUVmLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDakMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDOUQsSUFBSSxRQUFRLEVBQUU7UUFDWixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDNUMs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