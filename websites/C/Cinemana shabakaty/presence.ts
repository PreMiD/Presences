const presence = new Presence({ clientId: "910855815617982524" }),browsingStamp = Math.floor(Date.now() / 1000);
let video = {duration: 0,currentTime: 0,paused: true};
const Time = (time:any) => new Date(time * 1000).toISOString().substr(11, 8);


presence.on("iFrameData",(data: { duration: number; currentTime: number; paused: boolean }) => video = data);

presence.on("UpdateData", async function () {
  const presenceData: PresenceData = {
    largeImageKey: "cin",
    startTimestamp: browsingStamp,
  };

  // console.log(document.location.href);
  if (document.location.pathname.startsWith("/home") || document.location.pathname.startsWith("/page/home/index/")) 
  {
    presenceData.details = "Viewing home page";
  } 
  else if (document.location.pathname.includes("/landing") || document.location.pathname.includes("/core/account/login")) 
  {
    presenceData.details = "Viewing login page";
  }
  else if (window.location.pathname.startsWith("/video/") || window.location.pathname.startsWith("/page/movie/watch/"))
  {
    // Check New ,Old Version Watch Title
    const WatchingName = document.querySelector(window.location.pathname.startsWith("/video/") ? "h1.title" : ".blog table tbody td h2.text-center").childNodes[0].nodeValue.replace(/\s+/g,' ').trim();
    // ..
    presenceData.details = "Watching " + WatchingName;
    presenceData.smallImageKey = video.paused ? "paused" : "playing";
    presenceData.smallImageText = video.paused ? "Paused" : "Playing";
    presenceData.state = `${Time(video.currentTime)}/${Time(video.duration)}`;
    presenceData.startTimestamp = null;
    presenceData.buttons = [
      {
        label: "Watch",
        url: window.location.href
      },
    ];  
  }
  else if (document.location.pathname.includes("/faq")) 
  {
    presenceData.details = "FAQ ...";
  }
  // Search Movies
  else if (document.location.pathname == "/movies" || document.location.pathname.startsWith("/page/movie/index/en/1") || document.location.pathname.startsWith("/page/movie/index/ar/1")) 
  {
    presenceData.details = "Searching Movies";
  }
  // Search Series
  else if (document.location.pathname == "/series" || document.location.pathname.startsWith("/page/movie/index/en/2") || document.location.pathname.startsWith("/page/movie/index/ar/2")) 
  {
    presenceData.details = "Searching Series";
  }
  // Search Use Search Bar // New Version
  else if (document.location.pathname.startsWith("/search")) 
  {
    presenceData.details = "Searching Series";
  }
  else{
    presenceData.details = "Viewing page";
  }
  presence.setActivity(presenceData);
});