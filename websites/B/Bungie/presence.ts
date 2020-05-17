
var presence = new Presence({
  clientId: "711393222252822539"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
var titleTwo;
var titleThree;
var titleFour;
var titleFive;
var titleSix;
var titleSeven;
var titleEight;
var titleNine;
var titleTen;
var titleEleven;
var titleTwelve;
var titleThirteen;
var titleFourteen;
var titleFifteen;
var titleSixteen;
var titleSeventeen;
var titleEighteen;
var titleNinteen;
var titleTwenty
var titleTwentyOne;
var titleTwentyTwo;
var titleTwentyThree;
var titleTwentyFour
presence.on("UpdateData", async () => { // You had it like {} and forgot to put the code used in those two brackets
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };
console.log ("Test")
  //This one is for posts that are made in the /news section of Bungie.net
  //This one is for the title of forum posts on Bungie.net
  //This one is for posts that are on the featured section of the homepage on Bungie.net. 
  //let titleThree = document.querySelector("#article-container > h1")
  //All of these statements will be the menu buttons first. Just to make it easier on myself. 
  let path = document.location.pathname;
  //titleFive = document.querySelector("#clanSideBar > div.container-left.customScroll.customScrollOff > a > div.compact-clanidentity-containter > div.clanNameContainer > h2 > span")
  if (window.location.hostname == "bungie.net" || window.location.hostname == "www.bungie.net"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = ("Viewing the Bungie.net Homepage")
  }
  else if (window.location.hostname == "comics.bungie.net"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = ("Readig Destiny Comics")
  }
    //else if (path.includes("/en/News/") && title) {
  //presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Looking at " + title.textContent);
  //}
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
  title = document.querySelector("#article-container > h1").innerHTML
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Reading "+ title)
}


else if (path =="/en/News"){
presenceData.startTimestamp = browsingStamp; 
presenceData.details = ("Cheking out the news from Bungie")
}

//Bungie,net Community Button (You can hover over it and it gives you a bunch of different options.)
else if (path == "/en/ClanV2/Chat") {
  titleSix = document.querySelector("#clanSideBar > div.container-left.customScroll.customScrollOff > a > div.compact-clanidentity-containter > div.clanNameContainer > h2").innerHTML
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at thier clan " + titleSix.replace("<span>","").replace("</span>",""));
}
//Bungie.net Forum pages
else if (path.includes ("/en/Forums/Topics")){
  titleThirteen = document.querySelector("head > title")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at "+titleThirteen.innerHTML);
}
else if (path.includes ("/en/Forums/Post/")){
  titleFourteen = document.querySelector("#topicPost > div > div.threadMeta > div > div > div.authorMeta > a")
  titleTwo = document.querySelector("#topicPost > div > div.threadMeta > div > h1")
  //document.querySelector("#topicPost > div > div.threadMeta > div > h1")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at: "+titleTwo.innerHTML + "By: " + titleFourteen.innerHTML)
}
else if (path.includes ("/en/ClanV2/MyClans")){
  titleEight = document.querySelector("#clan-container > div > div.container_bodyContent > div > h1")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at the clans they are apart of")
}
else if (path.includes ("/en/ClanV2/Index")){
  titleSeven = titleSeven = document.querySelector("#mainContent > div.darkThemeContent.grid.full-screen > div > div.container_bodyContent.customScroll > div.header > div.clanIdentity > h1")
presenceData.startTimestamp = browsingStamp;
presenceData.details = ("Concerding joining clan "+titleSeven)
}
else if (path.includes ("/en/ClanV2/Fireteam")){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Checking out the available fireteams")
}
else if (path.includes ("/en/ClanV2/PublicFireteam")){
  titleNine = document.querySelector("#clan-container > div > div > div > div > div.activity-header > h2")
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
  titleTen = document.querySelector("#groupName")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Interested/Joined group "+titleTen.innerHTML)
  console.log (titleTen.innerHTML)
}
//Creations 
else if  (path.includes ("/en/Community/Creations")){
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at the creations the community made")
}
else if  (path.includes ("/en/Community/Detail")){
 titleEleven = document.querySelector("#mainContent > div.community-detail-header > div > div > div.community-details.flex > div.title")
  //titleEleven = document.querySelector("#mainContent > div.community-detail-header > div > div > div.community-details.flex > div.title")
titleTwelve = document.querySelector("#mainContent > div.community-detail-header > div > div > div.community-meta > span:nth-child(1) > a")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Looking at "+titleEleven.innerHTML + " By: " +titleTwelve.innerHTML) //("By:"+titleTwelve ))
  console.log (titleEleven)
  //presenceData.details = ("Test")
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
  titleFifteen = document.querySelector("#searchValue")
   //document.querySelector("#SearchedPanel > div")
  //document.querySelector("#searchValue")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Helpful " +titleFifteen.innerHTML)
}
else if (path.includes ("/en/Help/Article/")){
  titleSeventeen = document.querySelector("#mainContent > div.content_main > div.container_help.grid > div.container_helpContent.grid-col-9.grid-col-9-medium.grid-col-12-mobile > div.content_help > div > div.HelpItemTitle")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Reading "+titleSeventeen.innerHTML)
}
else if (path.includes ("/en/guide/destiny2")){
  titleEighteen = document.querySelector("#guide-container > div.header > h1")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Reading "+titleEighteen.innerHTML)
}
else if (path.includes ("/en/Help/Troubleshoot")){
  titleNinteen = document.querySelector("#mainContent > div.content_main > div.container_help.grid > div.container_helpContent.grid-col-9.grid-col-9-medium.grid-col-12-mobile > div.troubleshootStep > h3")
  presenceData.startTimestamp = browsingStamp;
  presenceData.details = ("Reading "+titleNinteen.innerHTML)
}
else if  (path.includes ("/en/Support/Troubleshoot")){
  titleTwenty = document.querySelector("#mainContent > div.content_main > div.container_help.grid > div.container_helpContent.grid-col-9.grid-col-9-medium.grid-col-12-mobile > div.troubleshootStep > h3")
presenceData.startTimestamp = browsingStamp;
presenceData.details = ("Reading "+titleTwenty.innerHTML)
}
//The Bungie Store 
//else if (window.location.hostname == "bungiestore.com"){
  //presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Looking at the Bungie Shop")
//}
//if (path ==("/collections/whats-new")){
  //presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Seeing what's new from the Bungie Shop")
//}
//else if (path.includes ("/collections/art-books")){
  //presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Seeing what art/books are for sale at the Bungie Shop")
//}
//else if (path.includes ("/collections/collectibles")){
//  presenceData.startTimestamp = browsingStamp;
 // presenceData.details = ("Seeing what collectables are for sale at the Bungie Shop")
//}
//else if (path.includes ("/collections/accessories")){
  //presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Seeing accessories are for sale at the Bungie Shop")
//}
//else if (path.includes ("/collections/apparel")){
  //presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Seeing what apparel are for sale at the Bungie Shop")
//}
//else if (path.includes ("/collections/drinkware")){
  //presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Seeing what drinkwares are for sale at the Bungie Shop")
//}
//else if (path.includes ("/collections/games")){
 // presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Seeing what games are for sale at the Bungie Shop")
//}
//else if (path.includes ("/collections/art-books")){/
 // presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Seeing what art/books are for sale at the Bungie Shop")
//}
//else if (path.includes ("/collections/art-books")){
 // presenceData.startTimestamp = browsingStamp;
 //presenceData.details = ("Seeing what art/books are for sale at the Bungie Shop")
//}
//else if (path.includes ("/collections/art-books")){
 // presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Seeing what art/books are for sale at the Bungie Shop")
//}
//else if (path.includes ("/collections/foundation")){
 // presenceData.startTimestamp = browsingStamp;
 // presenceData.details = ("Seeing what Bungie Foundation items are for sale at the Bungie Shop")
//}
//else if (path.includes ("/pages/pin-collectors-guide")){
 // presenceData.startTimestamp = browsingStamp;
//  presenceData.details = ("Seeing Bungie's pin collecting guide on the Bungie Shop")
//}
//else if (path.includes ("/collections/community-artist-series")){
 // presenceData.startTimestamp = browsingStamp;
 // presenceData.details = ("Seeing the Community Artist Series on the Bungie Shop")
//}
//else if (path.includes ("/pages/community-artist-series-guide")){
 // presenceData.startTimestamp = browsingStamp;
 // presenceData.details = ("Seeing what Community Artist Series Guide on the Bungie Shop")
//}
//else if (path.includes ("/collections/bungie-rewards")){
 // presenceData.startTimestamp = browsingStamp;
 // presenceData.details = ("Seeing what Bungie Rewards are about on the Bungie Shop")
//}
//else if (path.includes ("/pages/bungie-rewards-guide")){
 // presenceData.startTimestamp = browsingStamp;
 // presenceData.details = ("Seeing what Bungie Rewards rewards are available on the Bungie Shop")
//}
//else if (path.includes ("/collections/last-chance")){
 // presenceData.startTimestamp = browsingStamp;
 // presenceData.details = ("This is your last chance to get these items on the Bungie Shop!")
//}
//else if  (path.includes ("/collections/whats-new/products/preorder")){
  //console.log(titleTwentyOne)
  //titleTwentyOne = document.querySelector("#product > div.row.clearfix > div:nth-child(3) > h1 > div")
  //titleTwentyTwo = document.querySelector("#price-preview")
  //presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Looking at "+titleTwentyOne.innerHTML.replace ('<div name="secomapp-fg-image-4456031551575" style="display: none;"> <img src="//cdn.shopify.com/s/files/1/0417/0233/t/21/assets/icon-freegift.png?v=10831135327727470632" alt="Free Gift" class="sca-fg-img-label"> </div>',"") + "Price: "+titleTwentyTwo.innerHTML)
//}
//else if  (path.includes ("/collections/whats-new/products/")){
  //titleTwentyThree = document.querySelector("#product > div.row.clearfix > div:nth-child(3) > h1 > div")
  //document.querySelector("#product > div.row.clearfix > div:nth-child(3) > h1 > div")
  //document.querySelector("#product > div.row.clearfix > div:nth-child(3) > h1")
  //<div style="position:relative;"> Fading Light T-Shirt <div name="secomapp-fg-image-4358729597015" style="display: none;"> <img src="//cdn.shopify.com/s/files/1/0417/0233/t/21/assets/icon-freegift.png?v=10831135327727470632" alt="Free Gift" class="sca-fg-img-label"> </div> </div>
  //document.querySelector("#product > div.row.clearfix > div:nth-child(3) > h1 > div")
  //titleTwentyFour = document.querySelector("#product > div.row.clearfix > div:nth-child(3) > div.purchase > h2")
  //presenceData.startTimestamp = browsingStamp;
  //presenceData.details = ("Looking at "+ titleTwentyThree.innerHTML.replace ('<div name="secomapp-fg-image-4358729597015" style="display: none;"> <img src="//cdn.shopify.com/s/files/1/0417/0233/t/21/assets/icon-freegift.png?v=10831135327727470632" alt="Free Gift" class="sca-fg-img-label"> </div>',"")+ " Price: "+titleTwentyFour.innerHTML)
//}
if (presenceData.details == null) {
  presence.setTrayTitle(); 
  presence.setActivity(); 
}
else {
  presence.setActivity(presenceData);
}})