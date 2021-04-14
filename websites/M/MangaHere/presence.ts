const presence = new Presence({
  clientId: "831262912815300638"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

// let username: string;

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

  if (hostname === "mangahere.cc" || hostname === "www.mangahere.cc") {

    if (pathname == "/") {
      data.details = "Viewing the Homepage";
      data.startTimestamp = browsingStamp;
      data.buttons = [{ label: "Visit the website", url: "www.mangahere.cc" }];
    }
    if (pathname == "/latest/") {
      data.details = "Browsing latest manga";
      data.startTimestamp = browsingStamp;
    }
    if (pathname == "/ranking/") {
      data.details = "Browsing by ranking";
      data.startTimestamp = browsingStamp;
    }
    if (pathname == "/spoilers/") {
      data.details = "Browsing spoilers and news";
      data.startTimestamp = browsingStamp;
    }
    if (pathname == "/directory/") {
      data.details = "Browsing all manga";
      data.startTimestamp = browsingStamp;
    }
    if (pathname == "/on_going/") {
      data.details = "Browsing ongoing manga";
      data.startTimestamp = browsingStamp;
    }
    //ganre/new/
    if (pathname.endsWith("/new/")) {
      let url = pathname;
      let splitUrl = url.split('/');
      if (splitUrl[1] == "new") {
        data.details = "Browsing new manga";
      } else {
        data.details = "Browsing new " + splitUrl[1] + " manga";
      }
      data.startTimestamp = browsingStamp;
    }
    //ganre/completed/
    if (pathname.endsWith("/completed/")) {
      var url = pathname;
      var splitUrl = url.split('/');
      if (splitUrl[1] == "completed") {
        data.details = "Browsing completed manga";
      } else {
        data.details = "Browsing completed " + splitUrl[1] + " manga";
      }
      data.startTimestamp = browsingStamp;
    }
    //ganre/on_going/
    if (pathname.endsWith("/on_going/")) {
      var url = pathname;
      var splitUrl = url.split('/');
      if (splitUrl[1] == "on_going") {
        data.details = "Browsing ongoing manga";
      } else {
        data.details = "Browsing ongoing " + splitUrl[1] + " manga";
      }
      data.startTimestamp = browsingStamp;
    }
    //Browisng ganre
    for(let i = 0; i<ganres.length; i++){
      if(pathname.substring(1, pathname.length-1) == ganres[i]){
        data.details = "Browsing:";
        data.state = ganres[i].replace('-',' ') +" manga";
      data.startTimestamp = browsingStamp;
      }
    }

    //Manga Viewing
    if (pathname.startsWith("/manga") && pathname.endsWith("/")) {
      const title = document.querySelector(".detail-info-right-title-font").textContent;
      let link = window.location.href;
      data.details = "Viewing manga:";
      data.state = title;
      data.startTimestamp = browsingStamp;
      data.buttons = [{ label: "Read", url: link }];
      data.smallImageKey = "viewing";
      data.smallImageText = "Viewing";
    }
    //Manga Reading
    if (pathname.startsWith("/manga") && pathname.endsWith(".html")) {
      let title = document.querySelector(".reader-header-title-1").textContent
      let chapter = document.querySelector(".reader-header-title-2").textContent;
      //setting up page progress
      let current = document.querySelector('.pager-list-left span');
      if(current == null){
        data.state = chapter;
      }else{
        let len = current.children.length;
        let totalPages = current.children[len - 2].textContent;
        let readingPage = document.querySelector(".pager-list-left > span > .active").textContent;
        let progress = readingPage + "/" + totalPages;
        data.state = chapter + " page " + progress;
      }
      
      data.details = title;
      data.startTimestamp = browsingStamp;
      data.smallImageKey = "reading";
      data.smallImageText = "Reading";
    }

    //Searching
    if (pathname.startsWith("/search")) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const search = urlParams.get('title');
      var searchName = "";
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
  }
  presence.setActivity(data);
});
