interface PageContext {
  middleware: (ref: Window, ...args: unknown[]) => boolean;
  exec: (
    context: Presence,
    data: PresenceData,
    options: { [key: string]: unknown }
  ) => Promise<PresenceData> | PresenceData;
}
interface VideoContext {
  video: boolean;
  duration: number;
  currentTime: number;
  paused: boolean;
}

const pages: PageContext[] = [
    {
      // anime info page
      middleware: (ref, [video]) =>
        !!ref.location.pathname.match(/\/anime\/(.*)/gi) && !video,
      exec: (
        context,
        data,
        { strings }: { strings: { [key: string]: string } }
      ) => {
        if (!context) return null;
        data.state = strings.browsing;
        data.details = document.title;
        return data;
      }
    },
    {
      // watch page
      middleware: (ref) =>
        !!ref.location.pathname.match(/^\/(.*)-episode-(\d+)/gi),
      exec: (
        context,
        data,
        {
          strings,
          video
        }: { strings: { [key: string]: string }; video?: VideoContext }
      ) => {
        if (!context) return null;
        if (video && video.video) {
          const [start, end] = presence.getTimestamps(
            Math.floor(video.currentTime),
            Math.floor(video.duration)
          );
          if (!video.paused) {
            data.state = strings.play;
            data.startTimestamp = start;
            data.endTimestamp = end;
          } else {
            data.state = strings.pause;
            delete data.startTimestamp;
            delete data.endTimestamp;
          }
        } else {
          data.state = strings.browsing;
          if (data.startTimestamp) delete data.startTimestamp;
          if (data.endTimestamp) delete data.endTimestamp;
        }
        data.details = document.title;
        return data;
      }
    },
    {
      middleware: (ref, [video]) => ref && !video,
      exec: (
        context,
        data,
        { strings }: { strings: { [key: string]: string } }
      ) => {
        if (!context) return null;
        data.details = strings.browsing;
        return data;
      }
    }
  ],
  presence = new Presence({
    clientId: "778672856347312129"
  });

(function () {
  let currentVideo: VideoContext,
    lastIframeData: Date = null;
  presence.on("iFrameData", (data: VideoContext) => {
    if (data && data.video) {
      currentVideo = data;
      lastIframeData = new Date();
    } else if (
      !lastIframeData ||
      (Date.now() - lastIframeData.getTime()) / 1000 / 60 > 10
    )
      currentVideo = null;
  });
  presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
      largeImageKey: "logo",
      largeImageText: "AnimePill"
    } as PresenceData;
    if (document.location.hostname === "animepill.com") {
      const strings: { [key: string]: string } = await presence.getStrings({
          play: "presence.playback.playing",
          pause: "presence.playback.paused",
          browsing: "presence.activity.browsing"
        }),
        context = pages.find((x) => x.middleware(window, [currentVideo]));
      if (!context) return false;
      const result = Promise.resolve(
        context.exec(presence, presenceData, { strings, video: currentVideo })
      );
      return result.then((data) => {
        if (!data.details) {
          data.details = strings.browsing;
          presence.setTrayTitle();
          presence.setActivity();
        } else presence.setActivity(data);
        return data;
      });
    }

    if (!presenceData.details) {
      presence.setTrayTitle();
      presence.setActivity();
    } else presence.setActivity(presenceData);
  });
})();
