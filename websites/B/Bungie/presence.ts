const presence = new Presence({
    clientId: "711393222252822539"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData: presenceData = {
        largeImageKey: "logo"
    };
   
    //This is just here so that I can have "changes"  to push to GitHub
    //This is just to push to GitHub 
    const path = document.location.pathname;
    if (window.location.hostname == "bungie.net" || window.location.hostname == "www.bungie.net") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Viewing the Bungie.net Homepage");
    }
    else if (window.location.hostname == "comics.bungie.net") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Readig Destiny Comics");
    }
    if (path == "/7/en/Destiny/NewLight") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Looking at Destiny Two NewLight");
    }
    else if (path == "/7/en/Destiny/Shadowkeep") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Checking out Destiny Two Shadowkeep");
    }
    else if (path == "/7/en/Destiny/Forsaken") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Checking out Destiny Two Forsaken");
    }
    else if (path == "/7/en/Seasons/SeasonOfTheWorthy") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Checking out Destiny Two Season of the Worthy");
    }
    else if (path == "/7/en/Seasons/SeasonOfDawn") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Checking out Destiny Two Season of Dawn");
    }
    else if (path == "/7/en/Seasons/SeasonOfTheUndying") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Checking out Destiny Two Season of the Undying");
    }
    else if (path.includes("/en/Explore/Detail/News/")) {
        const title = document.querySelector("#article-container > h1").innerHTML;
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Reading " + title);
    }
    else if (path == "/en/News") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Cheking out the news from Bungie");
    }
    else if (path == "/en/ClanV2/Chat") {
        const titleSix = document.querySelector("#clanSideBar > div.container-left.customScroll.customScrollOff > a > div.compact-clanidentity-containter > div.clanNameContainer > h2").innerHTML;
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Looking at thier clan " + titleSix.replace("<span>", "").replace("</span>", ""));
    }
    else if (path.includes("/en/Forums/Topics")) {
        const titleThirteen = document.querySelector("head > title");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Looking at " + titleThirteen.innerHTML);
    }
    else if (path.includes("/en/Forums/Post/")) {
        const titleFourteen = document.querySelector("#topicPost > div > div.threadMeta > div > div > div.authorMeta > a");
        const titleTwo = document.querySelector("#topicPost > div > div.threadMeta > div > h1");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Looking at: " + titleTwo.innerHTML + "By: " + titleFourteen.innerHTML);
    }
    else if (path.includes("/en/ClanV2/MyClans")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Looking at the clans they are apart of");
    }
    else if (path.includes("/en/ClanV2/Index")) {
        const titleSeven = document.querySelector("#mainContent > div.darkThemeContent.grid.full-screen > div > div.container_bodyContent.customScroll > div.header > div.clanIdentity > h1");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Concerding joining clan " + titleSeven);
    }
    else if (path.includes("/en/ClanV2/Fireteam")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Checking out the available fireteams");
    }
    else if (path.includes("/en/ClanV2/PublicFireteam")) {
        const titleNine = document.querySelector("#clan-container > div > div > div > div > div.activity-header > h2");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Interested in in fireteam " + titleNine.innerHTML);
    }
    else if (path.includes("en/Groups/SuggestedGroups")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Looking at the groups Bungie suggested to them");
    }
    else if (path.includes("en/Groups/MyGroups")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Searching for groups");
    }
    else if (path.includes("en/Groups/Popular")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Looking at the groups they're apart of");
    }
    else if (path.includes("/en/Groups/Search")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Searching for groups");
    }
    else if (path.includes("/en/Groups/Chat")) {
        const titleTen = document.querySelector("#groupName");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Interested/Joined group " + titleTen.innerHTML);
    }
    else if (path.includes("/en/Community/Creations")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Looking at the creations the community made");
    }
    else if (path.includes("/en/Community/Detail")) {
        const titleEleven = document.querySelector("#mainContent > div.community-detail-header > div > div > div.community-details.flex > div.title");
        const titleTwelve = document.querySelector("#mainContent > div.community-detail-header > div > div > div.community-meta > span:nth-child(1) > a");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Looking at " + titleEleven.innerHTML + " By: " + titleTwelve.innerHTML);
    }
    else if (path == "/en/Help") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Getting help from Bungie");
    }
    else if (path == "/en/Support") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Getting help from Bungie");
    }
    else if (path.includes("/en/Help/Index")) {
        const titleFifteen = document.querySelector("#searchValue");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Helpful " + titleFifteen.innerHTML);
    }
    else if (path.includes("/en/Help/Article/")) {
        const titleSeventeen = document.querySelector("#mainContent > div.content_main > div.container_help.grid > div.container_helpContent.grid-col-9.grid-col-9-medium.grid-col-12-mobile > div.content_help > div > div.HelpItemTitle");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Reading " + titleSeventeen.innerHTML);
    }
    else if (path.includes("/en/guide/destiny2")) {
        const titleEighteen = document.querySelector("#guide-container > div.header > h1");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Reading " + titleEighteen.innerHTML);
    }
    else if (path.includes("/en/Help/Troubleshoot")) {
        const titleNinteen = document.querySelector("#mainContent > div.content_main > div.container_help.grid > div.container_helpContent.grid-col-9.grid-col-9-medium.grid-col-12-mobile > div.troubleshootStep > h3");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Reading " + titleNinteen.innerHTML);
    }
    else if (path.includes("/en/Support/Troubleshoot")) {
        const titleTwenty = document.querySelector("#mainContent > div.content_main > div.container_help.grid > div.container_helpContent.grid-col-9.grid-col-9-medium.grid-col-12-mobile > div.troubleshootStep > h3");
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = ("Reading " + titleTwenty.innerHTML);
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBTUYsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDdEMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxZQUFZLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZ0JBQWdCLEVBQUM7UUFDM0YsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7S0FDM0Q7U0FDSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFtQixFQUFDO1FBQ3ZELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0tBQ2pEO0lBRUgsSUFBSyxJQUFJLElBQUksd0JBQXdCLEVBQUM7UUFDcEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7S0FDM0Q7U0FFTyxJQUFJLElBQUksSUFBSSwwQkFBMEIsRUFBQztRQUMvQyxZQ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
