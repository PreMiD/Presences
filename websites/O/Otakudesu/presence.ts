const presence = new Presence({
    clientId: "794916348761210920"
}), 
$ = document.querySelector,
presenceData: PresenceData = {
    largeImageKey: "logo"
};

let video: Record<"currentTime"|"duration"|"paused", boolean|number> | void = undefined;

interface iFrameData {
  currentTime: number;
  duration: number;
  paused: boolean;
}

// function getTimestamps(
//   videoTime: number,
//   videoDuration: number
// ): Array<number> {
//   const startTime = Date.now(),
//   endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
//   return [Math.floor(startTime / 1000), endTime];
// }

presence.on("UpdateData", async () => {
    const startTimestamp: number = Date.now();
    presenceData.startTimestamp = startTimestamp;
    switch (
        document.location.pathname.endsWith("/") &&
        document.location.pathname.length > 1
        ? document.location.pathname.slice(
            0,
            document.location.pathname.length - 1
            )
        : document.location.pathname
    ) {
        case "/":
            presenceData.details = "Viewing homepage";
            break;
        case "/anime-list":
            presenceData.details = "Viewing anime list";
            break;
        case "/jadwal-rilis":
            presenceData.details = "Viewing release schedule";
            break;
        case "/ongoing-anime":
            presenceData.details = "Viewing ongoing anime list";
            break;
        case "/genre-list":
            presenceData.details = "Viewing anime genre list";
            break;
        default: {
            if (document.location.search.startsWith("?s")) {
              const params = document.location.search.substring(1),
              { s }: Record<"s"|"post_type", string> = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
              presenceData.details = "Searching for:";
              presenceData.state = s;
              presenceData.smallImageKey = "search";
            }
            const mirrorStream: HTMLDivElement = $(".mirrorstream");
            if (mirrorStream && video) {
              if (video.paused) {
                presenceData.smallImageText = "Paused playback";
                presenceData.smallImageKey = "pause";
              } else {
                presenceData.smallImageText = "Resumed playback";
                presenceData.smallImageKey = "play";
              }
              presenceData.details = `Watching ${$(".posttl").textContent.replace(/Subtitle Indonesia/gi, "")}`;
              presenceData.state = $(".posttl").textContent;
            } else {
              presenceData.details = "Viewing anime:";
              presenceData.state = $(".subheading > h2").textContent;
            }
          break;
        }
    }
    presence.setActivity(presenceData);
});

presence.on("iFrameData", (data: iFrameData) => {
  video = data;
});
