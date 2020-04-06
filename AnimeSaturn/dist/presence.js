let presence = new Presence({
    clientId: "669254632400355358"
});
let browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo, currentTime, duration, paused, playback;
let pageNumber;
let videoName;
let videoEpisode;
let fullName;
let timestamps;
presence.on("iFrameData", data => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.duration;
        paused = data.iframe_video.paused;
    }
});
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "asnew"
    };
    if (document.location.pathname == ("/")) {
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
        videoName = document.title.split("AnimeSaturn - ")[1].split(" Streaming ")[0];
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
        videoName = document.title.split("AnimeSaturn - ")[1].split(" Episodio ")[0];
        if (videoName.includes(" (ITA)")) {
            videoName = videoName.replace(" (ITA)", "");
        }
        videoEpisode = document.title.split(" Episodio ")[1].split(" Streaming ")[0];
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
        fullName = document.querySelector("body > center > footer > div.container.rounded.bg-dark-as-box.text-white.mt-1.mb-1.p-2 > h4 > div").textContent.trim();
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
                    data.state = paused ? videoEpisode + "° Special｜In pausa" : videoEpisode + "° Special｜In riproduzione";
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
                    data.state = paused ? videoEpisode + "° Special｜In pausa" : videoEpisode + "° Special｜In riproduzione";
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
                data.state = paused ? videoEpisode + "° OVA｜In pausa" : videoEpisode + "° OVA｜In riproduzione";
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
                data.state = paused ? "Ep. " + videoEpisode + "｜In pausa" : "Ep. " + videoEpisode + "｜In riproduzione";
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
                    data.state = paused ? videoEpisode + "° Special｜In pausa" : videoEpisode + "° Special｜In riproduzione";
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
                    data.state = paused ? videoEpisode + "° Special｜In pausa" : videoEpisode + "° Special｜In riproduzione";
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
                data.state = paused ? videoEpisode + "° OVA｜In pausa" : videoEpisode + "° OVA｜In riproduzione";
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
                data.state = paused ? "Ep. " + videoEpisode + "｜In pausa" : "Ep. " + videoEpisode + "｜In riproduzione";
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
function getTimestamps(videoTime, videoDuration) {
    let startTime = Date.now();
    let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUN6RCxJQUFJLFVBQVUsQ0FBQztBQUNmLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxZQUFZLENBQUM7QUFDakIsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLFVBQVUsQ0FBQztBQUVmLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQ2hDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzlELElBQUksUUFBUSxFQUFFO1FBQ2IsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1FBQzVDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN6QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDdEMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0tBQ2xDO0FBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLElBQUksR0FBaUI7UUFDeEIsYUFBYSxFQUFFLE9BQU87S0FDdEIsQ0FBQztJ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