var presence = new Presence({
  clientId: "696341580096733185"
});

var videoInfos = {
  duration: 0,
  currentTime: 0,
  paused: true
};

presence.on("iFrameData", videoData => {
  videoInfos = videoData;
});

presence.on("UpdateData", () => {
  var url = document.location.pathname;
  var detail = "Browsing . . .";
  var state : string;
  var smallImage = "browsing";
  const is404 = document.querySelector("#wrapper_bg > section > section.content_left > h1");
  if (is404 != null && is404.textContent === "404"){
       detail = "404";
       state = "Page non existant";
  }

  else if(url === "/"){
    state = "Recent animes release";
  }

  else if(url === "/login.html") {
    detail = "Logging in . . .";
  }

  else if(url === "/register.html") {
    detail = "Signing up . . .";
  }

  else if(url === "/user/bookmark") {
    detail = "Managing bookmarks";
  }

  else if(url === "/anime-list.html") {
    state = "Animes list";
  }

  else if(url === "//search.html"){
    detail = "Searching . . .";
    let anime = decodeURI(document.location.href).split("=")[1].split(" ");
    state = "Anime: " + formatAnime(anime);
  }

    else if(url === "/new-season.html") {
      state = "Newest animes";
    }

    else if(url === "/anime-movies.html") {
      state = "Animes' movies";
    }

    else if(url === "/popular.html"){
      state = "Popular animes";
    }

    else if(url.includes("/genre/")) {
      let genre = url.split("/").pop();
      state = "Anime genre: " + upperCaseFirstChar(genre);
    }

    else if(url.includes("/category/")) {
      let anime = url.split("/").pop().split("-");
      state = "Anime: " + formatAnime(anime);
    }

    else {
      detail = "Watching . . .";
      let anime =  url.split("/").pop().split("-");
      let episode = anime[anime.length - 2] + " " + anime[anime.length - 1];
      anime = anime.slice(0,anime.length - 2);
      state = formatAnime(anime) + ": " + upperCaseFirstChar(episode);
      smallImage = videoInfos.paused ? "pause" : "play";
    }

    var presenceData : presenceData = {
      largeImageKey: "logo",
      smallImageKey: smallImage,
      details: detail,
      state: state,
    }; 
      
    if(detail === "Watching . . ." && videoInfos != null) {
      if(videoInfos.paused) {
        presenceData.smallImageText = getTimestampAsString(videoInfos.duration, videoInfos.currentTime) + " left";
        delete presenceData.endTimestamp;
      }

      else {
        presenceData.endTimestamp = getEndTime(Math.floor(videoInfos.currentTime),Math.floor(videoInfos.duration));
      }
      presence.setActivity(presenceData,!videoInfos.paused);
    }

    else {
      presenceData.startTimestamp = new Date().getTime();
      presence.setActivity(presenceData);
    }
  });
      
  function formatAnime(anime:string[]) {
    let format = "";
    for(var i = 0; i< anime.length;i++) {
      let part = anime[i];
      format += upperCaseFirstChar(part) + " ";
    }
    return format.replace("Dub","(Dub)");
}
    
function upperCaseFirstChar(word:string) {

  return word[0].toUpperCase() + word.slice(1,word.length)
}

function getEndTime(current:number,duration:number) {
  let startTime = Date.now();
  let endTime = Math.floor(startTime / 1000) - current + duration;
  return endTime;
}

function getTimestampAsString(duration:number,current:number){
  return new Date((duration - current) * 1000).toISOString().substr(11, 8);
}