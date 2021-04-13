const presence = new Presence({
  clientId: "831262912815300638"
}),
browsingStamp = Math.floor(Date.now() / 1000);

// let username: string;

presence.on("UpdateData", async () => {
const data: PresenceData = {
  largeImageKey: "mangahere"
};

if (document.location.pathname == "/") {
  data.details = "Viewing the Homepage";
  data.startTimestamp = browsingStamp;
}else if(document.location.pathname == "/latest/"){
  data.details = "Browsing latest manga";
  data.startTimestamp = browsingStamp;
}else if(document.location.pathname == "/ranking/"){
  data.details = "Browsing by ranking";
  data.startTimestamp = browsingStamp;
}else if(document.location.pathname == "/spoilers/"){
  data.details = "Browsing spoilers and news";
  data.startTimestamp = browsingStamp;
}else if(document.location.pathname == "/directory/"){
  data.details = "Browsing all manga";
  data.startTimestamp = browsingStamp;
}else if(document.location.pathname == "/new/"){
  data.details = "Browsing new manga";
  data.startTimestamp = browsingStamp;
}else if(document.location.pathname == "/completed/"){
  data.details = "Browsing completed manga";
  data.startTimestamp = browsingStamp;
}else if(document.location.pathname == "/on_going/"){
  data.details = "Browsing ongoing manga";
  data.startTimestamp = browsingStamp;
}
//ganre/new/
else if(document.location.pathname.endsWith("/new/")){
  var url = document.location.pathname;
  var splitUrl = url.split('/');
  data.details = "Browsing new"+splitUrl[1]+"manga";
  data.startTimestamp = browsingStamp;
}

//MANGA reading and checking out
else if(document.location.pathname.startsWith("/manga") && document.location.pathname.endsWith("/")){
  const title = document.querySelector(".detail-info-right-title-font").textContent;
  data.details = "Checking out";
  var link = window.location.search;
  data.state = title;
  data.startTimestamp = browsingStamp;
  console.log("Works");
  data.buttons = [{label: "Read",url: link}];
}
else if(document.location.pathname.startsWith("/manga") && document.location.pathname.endsWith(".html")){
  const title = document.querySelector(".reader-header-title-1").textContent;
  const chapter = document.querySelector(".reader-header-title-2").textContent;
  data.details = title;
  data.state = chapter;
  data.startTimestamp = browsingStamp;
  data.smallImageKey = "reading";
}

//Searching
else if(document.location.pathname.startsWith("/search")){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get('title');
  var searchName = "";
  if(search == ""){
     searchName = urlParams.get('name');
  }else{
     searchName = urlParams.get('title')
  }
  data.details = "Searching:";
  data.state = searchName;
  data.startTimestamp = browsingStamp;
}
presence.setActivity(data);
});
