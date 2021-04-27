const presence = new Presence({
  clientId: "836534947170353173"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  },
    pathname = document.location.pathname;
    console.log(pathname);
    if (pathname === "/genshin/"){
      data.details = "Viewing the Homepage";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.endsWith("/home/1") && document.location.search.substr(6) == "create"){
      data.details = "Viewing tavern page";
      data.state = "New";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.endsWith("/home/1") && document.location.search.substr(6) == "reply"){
      data.details = "Viewing tavern page";
      data.state = "New replies";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.endsWith("/home/1") && document.location.search.substr(6) == "2"){
      data.details = "Viewing tavern page";
      data.state = "Featured";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.endsWith("/home/1")){
      data.details = "Viewing tavern page";
      data.state = "Hot";
      data.startTimestamp = browsingStamp;
    }
    //Official Page
    else if(pathname.endsWith("/home/3") && document.location.search.substr(6) == "1"){
      data.details = "Viewing official page";
      data.state = "Notices";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.endsWith("/home/3") && document.location.search.substr(6) == "3"){
      data.details = "Viewing official page";
      data.state = "Info";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.endsWith("/home/3") && document.location.search.substr(6) == "contribution"){
      data.details = "Viewing official page";
      data.state = "Submission events";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.endsWith("/home/3")){
      data.details = "Viewing official page";
      data.state = "Events";
      data.startTimestamp = browsingStamp;
    }
    //Billboards
    else if(pathname.endsWith("/home/2") && document.location.search.substr(6) == "create"){
      data.details = "Viewing billboards page";
      data.state = "New";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.endsWith("/home/2") && document.location.search.substr(6) == "reply"){
      data.details = "Viewing billboards page";
      data.state = "New replies";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.endsWith("/home/2") && document.location.search.substr(6) == "2"){
      data.details = "Viewing billboards page";
      data.state = "Featured";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.endsWith("/home/2")){
      data.details = "Viewing billboards page";
      data.state = "Hot";
      data.startTimestamp = browsingStamp;
    }
    //Articles
    else if(pathname.startsWith("/genshin/article/")){
      const title = document.querySelector(".mhy-article-page__title > h1").textContent,
      author = document.querySelector(".mhy-article-page-author > .mhy-user-card__info > a > span").innerHTML,
      link = window.location.href;

      data.details = title;
      data.state = "by: " + author;
      data.startTimestamp = browsingStamp;
      data.buttons = [{ label: "Visit", url: link }];
    }
    else if(pathname.endsWith("/topic")){
      data.details = "Browsing topics";
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.startsWith("/genshin/topicDetail/")){
      const title = document.querySelector(".mhy-topic-card__name").textContent;

      data.details = "Browsing topic:";
      data.state = title;
      data.startTimestamp = browsingStamp;
    }
    else if(pathname.startsWith("/genshin/search")){
      const queryString = window.location.search,
      urlParams = new URLSearchParams(queryString),
      search = urlParams.get('keyword');

      data.details = "Searching:";
      data.state = search;
      data.startTimestamp = browsingStamp;
      data.smallImageKey = "search";
    }
    presence.setActivity(data);
  });
  