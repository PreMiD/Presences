
var presence = new Presence({
  clientId: "711393222252822539"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => { // You had it like {} and forgot to put the code used in those two brackets
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };
  //This one is for posts that are made in the /news section of Bungie.net
  //This one is for the title of forum posts on Bungie.net
  //This one is for posts that are on the featured section of the homepage on Bungie.net. 
  //let titleThree = document.querySelector("#article-container > h1")
  //All of these statements will be the menu buttons first. Just to make it easier on myself. 
  let path = document.location.pathname;
  if (window.location.hostname == "bungie.net" || window.location.hostname == "www.bungie.net"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = ("Viewing the Bungie.net Homepage")
  }
  else if (window.location.hostname == "comics.bungie.net"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = ("Readig Destiny Comics")
  }
//Destiny Two NewLight don't know why I'm making this comment... I mean it's not like it's in the URL or anything like that...
if  (path == "/7/en/Destiny/NewLight"){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at Destiny Two NewLight")
}
//Destiny Two Downloadable Content URLs
  else  if (path == "/7/en/Destiny/Shadowkeep"){
presenceData.startTimestamp = browsingStamp;
presenceData.details = ("Checking out Destiny Two Shadowkeep")
}
else if (path =="/7/en/Destiny/Forsaken"){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Checking out Destiny Two Forsaken")
  }
  // Destiny Two Seasons
  else if (path =="/7/en/Seasons/SeasonOfTheWorthy"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = ("Checking out Destiny Two Season of the Worthy")
  }
  else if (path =="/7/en/Seasons/SeasonOfDawn"){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Checking out Destiny Two Season of Dawn")
  }
  else if (path =="/7/en/Seasons/SeasonOfTheUndying"){
  presenceData.startTimestamp = browsingStamp; 
  presenceData.details = ("Checking out Destiny Two Season of the Undying")
  }
//Bungie.net News Pages
  else if (path.includes ("/en/Explore/Detail/News/")){
  let title = document.querySelector("#article-container > h1").innerHTML
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Reading "+ title)
}


else if (path =="/en/News"){
presenceData.startTimestamp = browsingStamp; 
presenceData.details = ("Cheking out the news from Bungie")
}

//Bungie,net Community Button (You can hover over it and it gives you a bunch of different options.)
else if (path == "/en/ClanV2/Chat") {
  let titleSix = document.querySelector("#clanSideBar > div.container-left.customScroll.customScrollOff > a > div.compact-clanidentity-containter > div.clanNameContainer > h2").innerHTML
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at thier clan " + titleSix.replace("<span>","").replace("</span>",""));
}
//Bungie.net Forum pages
else if (path.includes ("/en/Forums/Topics")){
  let titleThirteen = document.querySelector("head > title")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at "+titleThirteen.innerHTML);
}
else if (path.includes ("/en/Forums/Post/")){
 let  titleFourteen = document.querySelector("#topicPost > div > div.threadMeta > div > div > div.authorMeta > a")
  let titleTwo = document.querySelector("#topicPost > div > div.threadMeta > div > h1")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at: "+titleTwo.innerHTML + "By: " + titleFourteen.innerHTML)
}
else if (path.includes ("/en/ClanV2/MyClans")){
 presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at the clans they are apart of")
}
else if (path.includes ("/en/ClanV2/Index")){
  let titleSeven = document.querySelector("#mainContent > div.darkThemeContent.grid.full-screen > div > div.container_bodyContent.customScroll > div.header > div.clanIdentity > h1")
presenceData.startTimestamp = browsingStamp;
presenceData.details = ("Concerding joining clan "+titleSeven)
}
else if (path.includes ("/en/ClanV2/Fireteam")){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Checking out the available fireteams")
}
else if (path.includes ("/en/ClanV2/PublicFireteam")){
  let titleNine = document.querySelector("#clan-container > div > div > div > div > div.activity-header > h2")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Interested in in fireteam "+titleNine.innerHTML)
}
else if (path.includes ("en/Groups/SuggestedGroups")){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at the groups Bungie suggested to them")
}
else if (path.includes ("en/Groups/MyGroups")){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Searching for groups")
}

else if (path.includes ("en/Groups/Popular")){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at the groups they're apart of")
}

else if (path.includes ("/en/Groups/Search")){
presenceData.startTimestamp = browsingStamp;
presenceData.details = ("Searching for groups")
}

else if  (path.includes ("/en/Groups/Chat")){
  let titleTen = document.querySelector("#groupName")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Interested/Joined group "+titleTen.innerHTML)
}
//Creations 
else if  (path.includes ("/en/Community/Creations")){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at the creations the community made")
}
else if  (path.includes ("/en/Community/Detail")){
 let titleEleven = document.querySelector("#mainContent > div.community-detail-header > div > div > div.community-details.flex > div.title")
let titleTwelve = document.querySelector("#mainContent > div.community-detail-header > div > div > div.community-meta > span:nth-child(1) > a")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at "+titleEleven.innerHTML + " By: " +titleTwelve.innerHTML) //("By:"+titleTwelve ))
  

}
//Bungie,net Help Page
else if (path== "/en/Help"){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Getting help from Bungie")
}
else if (path== "/en/Support"){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Getting help from Bungie")
}
else if  (path.includes ("/en/Help/Index")){
  let titleFifteen = document.querySelector("#searchValue")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Helpful " +titleFifteen.innerHTML)
}
else if (path.includes ("/en/Help/Article/")){
  let titleSeventeen = document.querySelector("#mainContent > div.content_main > div.container_help.grid > div.container_helpContent.grid-col-9.grid-col-9-medium.grid-col-12-mobile > div.content_help > div > div.HelpItemTitle")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Reading "+titleSeventeen.innerHTML)
}
else if (path.includes ("/en/guide/destiny2")){
  let titleEighteen = document.querySelector("#guide-container > div.header > h1")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Reading "+titleEighteen.innerHTML)
}
else if (path.includes ("/en/Help/Troubleshoot")){
 let titleNinteen = document.querySelector("#mainContent > div.content_main > div.container_help.grid > div.container_helpContent.grid-col-9.grid-col-9-medium.grid-col-12-mobile > div.troubleshootStep > h3")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Reading "+titleNinteen.innerHTML)
}
else if  (path.includes ("/en/Support/Troubleshoot")){
  let titleTwenty = document.querySelector("#mainContent > div.content_main > div.container_help.grid > div.container_helpContent.grid-col-9.grid-col-9-medium.grid-col-12-mobile > div.troubleshootStep > h3")
presenceData.startTimestamp = browsingStamp;
presenceData.details = ("Reading "+titleTwenty.innerHTML)
}
if (presenceData.details == null) {
  presence.setTrayTitle(); 
  presence.setActivity(); 
}
else {
  presence.setActivity(presenceData);
}})
