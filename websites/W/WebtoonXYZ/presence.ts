const presence = new Presence({
  clientId: "836962986451140609"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const v2icons = await presence.getSetting("v2icons"),
        logo = await presence.getSetting("logo"),
        data: PresenceData = {
          largeImageKey: logo==0 ? "logo" : "logo-v2",
          startTimestamp: browsingStamp
        },
    pathname = document.location.pathname;

    if(pathname == "/" && window.location.search.substr(0,2) == "?s"){
      const urlParams = new URLSearchParams(window.location.search),
            nsfw = urlParams.get("adult"),
            search = nsfw == "1" ? "nsfw" : nsfw == "0" ? "non nsfw" : urlParams.get("s"),
            results = document.querySelector(".c-blog__heading > .h4").textContent.split(" ")[1];
      data.details = "Searching:";
      data.state = search + " 🔸 " + results +" results";
      data.smallImageKey = v2icons ? "search-v2" : "search";
    }    
    else if(pathname == "/")
      data.details = "Viewing the homepage"
    else if(pathname.endsWith("/webtoons/")){
      const results = document.querySelector(".c-blog__heading > .h4").textContent;
      data.details = "Browsing all webtoons";
      data.state = results;
    }
    else if(pathname.startsWith("/webtoon-genre/")){
      const genre = document.querySelector(".item-title").textContent,
            results = document.querySelector(".c-blog__heading > .h4").textContent;
      data.details = "Browsing " + genre + " webtoons";
      data.state = "📋 " +results; 
      data.smallImageKey = v2icons ? "search-v2" : "search";
    }
    else if(pathname == "/completed-webtoons/"){
      data.details = "Browsing:";
      data.state = "Completed webtoons"
      data.smallImageKey = v2icons ? "search-v2" : "search";
    } 

    presence.setActivity(data);
  });
  