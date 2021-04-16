const presence = new Presence({
  clientId: "831262912815300638"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "mangahere"
  },
    pathname = document.location.pathname,
    hostname = document.location.hostname,
    ganres = ["martial-arts", "action", "school-life",
              "sci-fi", "yoi", "shotacon", "mystery", "shoujo",
              "ecchi", "doujinshi", "lolicon", "adventure", "romance",
              "gender-bender", "harem", "sports", "webtoons", "comedy",
              "shounen-ai", "josei", "shoujo-ai", "adult", "fantasy", "supernatural",
              "psychological", "yuri", "one-shot", "historical", "drama",
              "seinen", "mature", "smut", "horror", "shounen", "slice-of-life",
              "tragedy", "mecha"
            ];

  if (hostname === "www.mangahere.cc") {

    if (pathname == "/") {
      data.details = "Viewing the Homepage";
      data.startTimestamp = browsingStamp;
      data.buttons = [{ label: "Visit the website", url: "www.mangahere.cc" }];
    }
    else if (pathname == "/latest/") {
      data.details = "Browsing latest manga";
      data.startTimestamp = browsingStamp;
    }
    else if (pathname == "/ranking/") {
      data.details = "Browsing by ranking";
      data.startTimestamp = browsingStamp;
    }
    else if (pathname == "/spoilers/") {
      data.details = "Browsing spoilers and news";
      data.startTimestamp = browsingStamp;
    }
    else if (pathname == "/directory/") {
      data.details = "Browsing all manga";
      data.startTimestamp = browsingStamp;
    }
    else if (pathname == "/on_going/") {
      data.details = "Browsing ongoing manga";
      data.startTimestamp = browsingStamp;
    }
    //ganre/new/
    else if (pathname.endsWith("/new/")) {
      const url = pathname,
       splitUrl = url.split('/');
      data.details = splitUrl[1] === "new" ? "Browsing new manga" : `Browsing new ${splitUrl[1]} manga`
      data.startTimestamp = browsingStamp;
    }
    //ganre/completed/
    else if (pathname.endsWith("/completed/")) {
      const url = pathname,
       splitUrl = url.split('/');
      if (splitUrl[1] == "completed") {
        data.details = "Browsing completed manga";
      } else {
        data.details = "Browsing completed " + splitUrl[1] + " manga";
      }
      data.startTimestamp = browsingStamp;
    }
    //ganre/on_going/
    else if (pathname.endsWith("/on_going/")) {
      const url = pathname,
       splitUrl = url.split('/');
      if (splitUrl[1] == "on_going") {
        data.details = "Browsing ongoing manga";
      } else {
        data.details = "Browsing ongoing " + splitUrl[1] + " manga";
      }
      data.startTimestamp = browsingStamp;
    }
    //Manga Viewing
    else if (pathname.startsWith("/manga") && pathname.endsWith("/")) {
      const title = document.querySelector(".detail-info-right-title-font").textContent,
       link = window.location.href;
      data.details = "Viewing manga:";
      data.state = title;
      data.startTimestamp = browsingStamp;
      data.buttons = [{ label: "Read", url: link }];
      data.smallImageKey = "viewing";
      data.smallImageText = "Viewing";
    }
    //Manga Reading
    else if (pathname.startsWith("/manga") && pathname.endsWith(".html")) {
      const title = document.querySelector(".reader-header-title-1").textContent,
       chapter = document.querySelector(".reader-header-title-2").textContent,
      //setting up page progress
       current = document.querySelector('.pager-list-left span');
      if(current == null){
        data.state = chapter;
      }else{
         const len = current.children.length,
         totalPages = current.children[len - 2].textContent,
         readingPage = document.querySelector(".pager-list-left > span > .active").textContent,
         progress = readingPage + "/" + totalPages;
        data.state = chapter + " page " + progress;
      }
      data.details = title;
      data.startTimestamp = browsingStamp;
      data.smallImageKey = "reading";
      data.smallImageText = "Reading";
    }
    //Searching
    else if (pathname.startsWith("/search")) {
      const queryString = window.location.search,
       urlParams = new URLSearchParams(queryString),
       search = urlParams.get('title');
       let searchName = "";
      if (search == "") {
        searchName = urlParams.get('name');
      } else {
        searchName = urlParams.get('title');
      }
      data.details = "Searching:";
      data.state = searchName;
      data.startTimestamp = browsingStamp;
      data.smallImageKey = "searching";
      data.smallImageText = "Searching";
    }
    //Browisng ganre
    for(let i = 0; i<ganres.length; i++){
      if(pathname.substring(1, pathname.length-1) == ganres[i]){
        data.details = "Browsing:";
        data.state = ganres[i].replace('-',' ') +" manga";
      data.startTimestamp = browsingStamp;
      }
    }
  }
  presence.setActivity(data);
});
