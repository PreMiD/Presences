const presence = new Presence({
  clientId: "835652520637890620"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  },
    pathname = document.location.pathname

    if (pathname === "/"){
      data.details = "Viewing the Homepage";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.startsWith("/podcast")){
      const title = document.querySelector(".caption").textContent;
      data.details = "Viewing:";
      data.state = title;
    }
    else if(pathname.startsWith("/episode")){
      const title = document.querySelector(".pure-button").innerHTML,
      episode = document.querySelector(".title").textContent,
      playPause = document.querySelector("#play-pause-button");
      let remainingTime = document.querySelector("#remainingTime").textContent.substr(1);
      //let elapsedTime = document.querySelector("#elapsedTime").textContent;

      let rem = presence.timestampFromFormat(remainingTime);
     // let elap = presence.timestampFromFormat(elapsedTime);
      //let times = presence.getTimestamps(elap, rem);


      data.details = title;
      data.state = episode;
      if(!playPause.classList.contains('fa-play-circle')){
        //data.startTimestamp = times[0];
        data.endTimestamp = rem;
        data.smallImageKey = "play"
      }else
      data.smallImageKey = "pause";
    }
  presence.setActivity(data);
});
