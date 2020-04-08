var presence = new Presence({
    clientId: "693097839424831489"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var thread;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "mccentrallogo"
    };
    if (document.location.hostname == "mccentral.org") {
        if (document.location.pathname == "/community/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Home page";
        }
        else if (document.location.pathname == "/community/forums/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Forums main page";
        }
        else if (document.location.pathname.includes("/add-reply")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Replying a thread";
        }
        else if (document.location.pathname.includes("/threads/")) {
            thread = document.querySelector(".titleBar > h1");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the thread:";
            presenceData.state = '"' + thread.innerText + '"';
        }
        else if (document.location.pathname.includes("/announcements/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Annoucements";
        }
        else if (document.location.pathname.includes("/changelog/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Changelogs";
        }
        else if (document.location.pathname.includes("/newspaper/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Newspaper";
        }
        else if (document.location.pathname.includes("/faq/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "FAQ";
        }
        else if (document.location.pathname.includes("/bugs/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Bug Reports main page";
        }
        else if (document.location.pathname.includes("/forms/bug-reports.15/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reporting a bug";
        }
        else if (document.location.pathname.includes("/support/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Support forums";
        }
        else if (document.location.pathname.includes("/apply/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Staff Application forums";
        }
        else if (document.location.pathname.includes("/forms/staff-application.5/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Applying for staff";
        }
        else if (document.location.pathname.includes("/forms/previous-staff-application.7/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Applying for returning staff";
        }
        else if (document.location.pathname.includes("/youtuber/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Youtuber Application forums";
        }
        else if (document.location.pathname.includes("/forms/youtuber-application.6/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Applying for Youtuber";
        }
        else if (document.location.pathname.includes("/reports/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Report Players forums";
        }
        else if (document.location.pathname.includes("/forms/report-players.2/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reporting a player";
        }
        else if (document.location.pathname.includes("/reports-staff/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Report Staff forums";
        }
        else if (document.location.pathname.includes("/forms/report-staff.17/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reporting a staff member";
        }
        else if (document.location.pathname.includes("/appeals/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Punishment Appeals forums";
        }
        else if (document.location.pathname.includes("/forms/punishment-appeal.1/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Making a punishment appeal";
        }
        else if (document.location.pathname.includes("/punishments/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Searching for punishments";
        }
        else if (document.location.pathname.includes("/general/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "General Discussion forums";
        }
        else if (document.location.pathname == "/community/forums/skyblock/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Skyblock Discussion forums";
        }
        else if (document.location.pathname == "/community/forums/creative/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Creative Discussion forums";
        }
        else if (document.location.pathname == "/community/forums/kitpvp/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "KitPvP Discussion forums";
        }
        else if (document.location.pathname == "/community/forums/survival/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Survival Discussion forums";
        }
        else if (document.location.pathname == "/community/forums/prison/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Prison Discussion forums";
        }
        else if (document.location.pathname == "/community/forums/factions/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Factions Discussion forums";
        }
        else if (document.location.pathname == "/community/forums/minigames/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Minigames Discussion forums";
        }
        else if (document.location.pathname.includes("/off-topic/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Off Topic forums";
        }
        else if (document.location.pathname.includes("/giveaways/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Giveaways forums";
        }
        else if (document.location.pathname.includes("/suggestions/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Server Suggestions forums";
        }
        else if (document.location.pathname.includes("/maps/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Map Submission forums";
        }
        else if (document.location.pathname.includes("/community-ticket/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Community Ticket forums";
        }
        else if (document.location.pathname.includes("/forms/community-ticket.18/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Sending a Community Ticket";
        }
        else if (document.location.pathname.includes("/staff/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Staff Members page";
        }
        else if (document.location.pathname.includes("/rules/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Rules page";
        }
        else if (document.location.pathname.includes("/vote/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Voting page";
        }
        else if (document.location.pathname == "/community/leaderboards/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Leaderboards page";
        }
        else if (document.location.pathname.includes("/guilds/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Guilds leaderboards";
        }
        else if (document.location.pathname.includes("/survivalgames/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Survival Games leaderboards";
        }
        else if (document.location.pathname.includes("/skywars/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Skywars leaderboards";
        }
        else if (document.location.pathname.includes("/walls/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Speedy Walls leaderboards";
        }
        else if (document.location.pathname.includes("/ctf/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "CTF leaderboards";
        }
        else if (document.location.pathname.includes("/murder/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Murder Mayhem leaderboards";
        }
        else if (document.location.pathname.includes("/championbuilder/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Champion Builder leaderboards";
        }
        else if (document.location.pathname.includes("/cakewars/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Cakewars leaderboards";
        }
        else if (document.location.pathname.includes("/uhc/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "UHC leaderboards";
        }
        else if (document.location.pathname == "/community/leaderboards/skyblock/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Skyblock leaderboards";
        }
        else if (document.location.pathname == "/community/leaderboards/survival/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Survival leaderboards";
        }
        else if (document.location.pathname == "/community/leaderboards/factions/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Factions leaderboards";
        }
        else if (document.location.pathname == "/community/leaderboards/prison/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Prison leaderboards";
        }
        else if (document.location.pathname == "/community/leaderboards/kitpvp/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "KitPvP leaderboards";
        }
        else if (document.location.pathname == "/community/leaderboards/arenapvp/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "ArenaPvP leaderboards";
        }
        else if (document.location.pathname == "/community/account/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Changing personal details";
        }
        else if (document.location.pathname.includes("/account/alerts")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Latest alerts";
        }
        else if (document.location.pathname == "/community/conversations/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Conversations";
        }
        else if (document.location.pathname == "/community/conversations/add") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Starting a:";
            presenceData.state = "New conversation...";
        }
        else if (document.location.pathname.includes("/account/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Account details";
        }
        else if (document.location.pathname == "/community/watched/threads") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Unread watched threads";
        }
        else if (document.location.pathname == "/community/watched/forums") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Watched forums";
        }
        else if (document.location.pathname.includes("/members/")) {
            user = document.querySelector(".mainText > h1");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = user.innerText + "'s profile page";
        }
        else if (document.location.pathname.includes("/search/search")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Searching for:";
            presenceData.state = "No results.";
        }
        else if (document.location.pathname.includes("/search/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Searching...";
        }
    }
    else if (document.location.hostname == "buy.mccentral.org") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Store home page";
        }
        else if (document.location.pathname.includes("/category/91801")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Ranks";
        }
        else if (document.location.pathname.includes("/category/205563")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Coal Rank upgrades";
        }
        else if (document.location.pathname.includes("/category/205565")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Iron Rank upgrades";
        }
        else if (document.location.pathname.includes("/category/205567")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Gold Rank upgrades";
        }
        else if (document.location.pathname.includes("/category/205569")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Lapis Rank upgrades";
        }
        else if (document.location.pathname.includes("/category/205570")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Emerald Rank upgrades";
        }
        else if (document.location.pathname.includes("/category/205571")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Diamond Rank upgrades";
        }
        else if (document.location.pathname.includes("/category/512622")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Bedrock Rank upgrades";
        }
        else if (document.location.pathname.includes("/category/860358")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Legend Rank upgrades";
        }
        else if (document.location.pathname.includes("/category/519352")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Keys";
        }
        else if (document.location.pathname.includes("/category/462418")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Effects";
        }
        else if (document.location.pathname.includes("/category/676785")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Pocketpals";
        }
        else if (document.location.pathname.includes("/category/722423")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Boosters";
        }
        else if (document.location.pathname.includes("/category/1080289")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checking on Store:";
            presenceData.state = "Gift Cards";
        }
        else if (document.location.pathname.includes("/checkout")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Checkout on Store";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxNQUFXLENBQUM7QUFFaEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxlQUFlO0tBQy9CLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWUsRUFBRTtRQUNqRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRTtZQUMvQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztTQUNsQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksb0JBQW9CLEVBQUU7WUFDN0QsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDbEMsWUFBWSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztTQUN6QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzVELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FB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QUFZLENBQUMsS0FBSyxHQUFHLDJCQUEyQixDQUFDO1NBQ2xEO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSw2QkFBNkIsRUFBRTtZQUN0RSxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO1NBQ25EO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSw2QkFBNkIsRUFBRTtZQUN0RSxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO1NBQ25EO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSwyQkFBMkIsRUFBRTtZQUNwRSxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLDBCQUEwQixDQUFDO1NBQ2pEO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSw2QkFBNkIsRUFBRTtZQUN0RSxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO1NBQ25EO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSwyQkFBMkIsRUFBRTtZQUNwRSxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLDBCQUEwQixDQUFDO1NBQ2pEO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFB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