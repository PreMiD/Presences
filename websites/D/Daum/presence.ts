class DaumPresence extends Presence {
  constructor(presenceOptions: PresenceOptions){
    super(presenceOptions);
  }

  get serviceName(){
    const url = document.location.hostname;

    switch (true) {
      case !!url.match(/movie([.]v)?[.]daum[.]([a-z0-9]+)/):
        return "DAUM_MOVIE";
      case !!url.match(/news([.]v)?[.]daum[.]([a-z0-9]+)/):
        return "DAUM_NEWS";
      case !!url.match(/sports([.]v)?[.]daum[.]([a-z0-9]+)/):
        return "DAUM_SPORTS";
      case !!url.match(/entertain([.]v)?[.]daum[.]([a-z0-9]+)/):
        return "DAUM_ENTERTAIN";
      case !!url.match(/blog([.]v)?[.]daum[.]([a-z0-9]+)/):
        return "DAUM_BLOG";
      case !!url.match(/auto([.]v)?[.]daum[.]([a-z0-9]+)/):
        return "DAUM_AUTO"
      case !!url.match(/mail([.]v)?[.]daum[.]([a-z0-9]+)/):
        return "DAUM_MAIL" 
      case !!url.match(/([a-z]+)([.]v)?[.]daum[.]([a-z0-9]+)/):
        return "DAUM";
      default:
        break;
    }
  }

  get isReadingArticle(){
    return !!document.location.hostname.match(/([a-z]+)([.]v)[.]daum[.]([a-z0-9]+)/);
  }
}

const presence = new DaumPresence({
    clientId: "829266476875120650"
}),
  data: {
    settings?: {
      id: string,
      delete?: boolean,
      data: string[];
    }[],
    presence: {
      [key: string]: {
        service:
          | "DAUM"
          | "DAUM_MOVIE"
          | "DAUM_AUTO"
          | "DAUM_NEWS"
          | "DAUM_SPORTS"
          | "DAUM_BLOG"
          | "DAUM_BLOG"
          | "DAUM_MAIL"
          | "DAUM_ENTERTAIN"
          | "ANY";
          href?: boolean,
          hash?: boolean,
          artitle?: boolean
        setPresenceData?: () => void;
      }
    }
  } = {
    presence: null
  },
  startTime = Math.floor(Date.now() / 1000);

let video : {
  duration: number,
  currentTime: number,
  paused: boolean,
  title?: string,
};

presence.on("iFrameData", (data: {
  duration: number,
  currentTime: number,
  paused: boolean,
  title?: string
}) => video = data );

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
      largeImageKey: "daum",
      startTimestamp: startTime
    };

    if (presence.serviceName === "DAUM_MAIL")
        presenceData.largeImageKey = "daum_mail";

    data.presence = {
      "/v/([0-9a-zA-Z]+)": {
        service: "ANY",
        artitle: true,
        setPresenceData(){
          presenceData.details = "Reading article:";
          presenceData.state = document.querySelector("h3.tit_view")?.textContent;

          presenceData.buttons = [{
            url: document.baseURI,
            label: "Read Article"
          }];

          if (video){
            const timestamps = presence.getTimestamps(video.currentTime, video.duration);

            presenceData.details = "Watching video:";
            presenceData.state = video.title ?? document.querySelector("h3.tit_view")?.textContent;

            presenceData.smallImageKey = video.paused ? "pause" : "play";
            presenceData.smallImageText = video.paused ? "Paused" : "Playing";

            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];

            presenceData.buttons = [{
              label: "Watch Video",
              url: document.baseURI
            }];

            if (video.paused){
              delete presenceData.startTimestamp;
              delete presenceData.endTimestamp;
            }
          }
        }
      },
      "vod/view/([0-9a-zA-Z]+)": {
        service: "DAUM_AUTO",
        setPresenceData(){
          const timestamps = presence.getTimestamps(video?.currentTime, video?.duration);
          
          presenceData.details = "Watching video:";
          presenceData.state = document.querySelector("strong.tit_vod")?.textContent;

          presenceData.smallImageKey = video?.paused ? "pause" : "play";
          presenceData.smallImageText = video?.paused ? "Paused" : "Playing";

          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];

          presenceData.buttons = [{
            label: "Watch Video",
            url: document.baseURI
          }];

          if (video?.paused){
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }
        }
      },
      "/newcar/model/([0-9a-zA-Z]+)": {
        service: "DAUM_AUTO",
        setPresenceData(){
          presenceData.details = "Viewing car:";
          presenceData.state = document.querySelector("h3.tit_model")?.textContent;

          presenceData.buttons = [{
            label: "View Car",
            url: document.baseURI
          }];
        }
      },
      "/moviedb/": {
        service: "DAUM_MOVIE",
        setPresenceData(){
          presenceData.details = "Viewing movie:";
          presenceData.state = document.querySelector('span.txt_tit')?.textContent;

          presenceData.buttons = [{
            label: "View Movie",
            url: document.baseURI
          }];
        }
      },
      "/person/": {
        service: "DAUM_MOVIE",
        setPresenceData(){
          presenceData.details = "Viewing cast:";
          presenceData.state = document.querySelector('span.txt_tit')?.textContent;

          presenceData.buttons = [{
            label: "View Cast",
            url: document.baseURI
          }];
        }
      },
      "/moviedb/contents": {
        service: "DAUM_MOVIE",
        setPresenceData(){
          if (video){
            const timestamps = presence.getTimestamps(video.currentTime, video.duration);

            presenceData.details = "Watching video:";
            presenceData.state = document.querySelector("strong.tit_player")?.textContent;

            presenceData.smallImageKey = video.paused ? "pause" : "play";
            presenceData.smallImageText = video.paused ? "Paused" : "Playing";

            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];

            presenceData.buttons = [{
              label: "Watch Video",
              url: document.baseURI
            }];

            if (video.paused){
              delete presenceData.startTimestamp;
              delete presenceData.endTimestamp;
            }
          }
        }
      },
      "/video/([0-9a-zA-Z]+)": {
        service: "DAUM_SPORTS",
        setPresenceData(){
          const timestamps = presence.getTimestamps(video?.currentTime, video?.duration);
          
          presenceData.details = "Watching video:";
          presenceData.state = document.querySelector("strong.tit_vod")?.textContent;

          presenceData.smallImageKey = video?.paused ? "pause" : "play";
          presenceData.smallImageText = video?.paused ? "Paused" : "Playing";

          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];

          presenceData.buttons = [{
            label: "Watch Video",
            url: document.baseURI
          }];

          if (video?.paused){
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }
        }
      },
      "/tv/([0-9]+)/video/([0-9]+)": {
        service: "DAUM_ENTERTAIN",
        setPresenceData(){
          const timestamps = presence.getTimestamps(video?.currentTime, video?.duration);
          
          presenceData.details = video?.title ?? document.querySelector('span.inner_tit2')?.textContent;
          presenceData.state = document.querySelector('a.link_txt')?.textContent.trim();

          presenceData.smallImageKey = video?.paused ? "pause" : "play";
          presenceData.smallImageText = video?.paused ? "Paused" : "Playing";

          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];

          presenceData.buttons = [{
            label: "Watch Video",
            url: document.baseURI
          },{
            label: "View Channel",
            url: document.querySelector<HTMLAnchorElement>('a.link_txt')?.href
          }];

          if (video?.paused){
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }
        }
      },
      "#INBOX": {
        service: "DAUM_MAIL",
        hash: true,
        setPresenceData(){
          presenceData.details = "Viewing Inbox";
        }
      },
      "#INBOX/": {
        service: "DAUM_MAIL",
        hash: true,
        setPresenceData(){
          presenceData.details = "Reading mail";
        }
      },
      "#MINE": {
        service: "DAUM_MAIL",
        hash: true,
        setPresenceData(){
          presenceData.details = "Viewing Inbox";
        }
      },
      "#DRAFT": {
        service: "DAUM_MAIL",
        hash: true,
        setPresenceData(){
          presenceData.details = "Viewing drafts";
        }
      },
      "#SENT": {
        service: "DAUM_MAIL",
        hash: true,
        setPresenceData(){
          presenceData.details = "Viewing sent";
        }
      },
      "#TRASH": {
        service: "DAUM_MAIL",
        hash: true,
        setPresenceData(){
          presenceData.details = "Viewing trash";
        }
      },
      "#SPAM": {
        service: "DAUM_MAIL",
        hash: true,
        setPresenceData(){
          presenceData.details = "Viewing spam";
        }
      },
      "#ALL": {
        service: "DAUM_MAIL",
        hash: true,
        setPresenceData(){
          presenceData.details = "Viewing all mail";
        }
      },
      "#UNREAD": {
        service: "DAUM_MAIL",
        hash: true,
        setPresenceData(){
          presenceData.details = "Viewing unread mail";
        }
      },
      "#setting": {
        service: "DAUM_MAIL",
        hash: true,
        setPresenceData(){
          presenceData.details = "Viewing thier settings"
        }
      },
      "\\?composer": {
        service: "DAUM_MAIL",
        href: true,
        setPresenceData(){
          presenceData.details = "Composing a new mail";
        }
      }
    };

    data.settings = [
      {
        id: "timestamp",
        delete: true,
        data: ["startTimestamp", "endTimestamp"]
      },
      {
        id: "buttons",
        delete: true,
        data: ["buttons"]
      }
    ];

    for (const [pathname, PData] of Object.entries(data.presence)){
      if ((document.location.pathname.match(pathname) || PData.hash && document.location.hash.match(pathname) || PData.href && document.location.href.match(pathname)) && (PData.service === presence.serviceName || PData.service === "ANY")){
        if (PData.artitle && PData.artitle === presence.isReadingArticle)
            PData.setPresenceData();
        else if (!PData.artitle) PData.setPresenceData();
      }
    }

    for (const setting of data.settings){
       const settingValue = await presence.getSetting(setting.id);

       if (!settingValue && setting.delete)
        for (const PData of setting.data){
          delete presenceData[PData as keyof PresenceData];
        }
    }

    if (!presenceData.details){
      presence.setTrayTitle();
      presence.setActivity();
    } else presence.setActivity(presenceData);
});