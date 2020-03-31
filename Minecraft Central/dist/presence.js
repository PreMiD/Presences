var presence = new Presence({
    clientId: "693097839424831489",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var thread;
var punishmentUser;
presence.on("UpdateData", async () => {
    let presenceData = {
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
            presenceData.state = "\"" + thread.innerText + "\"";
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
        else if (document.location.pathname == ("/community/forums/skyblock/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Skyblock Discussion forums";
        }
        else if (document.location.pathname == ("/community/forums/creative/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Creative Discussion forums";
        }
        else if (document.location.pathname == ("/community/forums/kitpvp/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "KitPvP Discussion forums";
        }
        else if (document.location.pathname == ("/community/forums/survival/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Survival Discussion forums";
        }
        else if (document.location.pathname == ("/community/forums/prison/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Prison Discussion forums";
        }
        else if (document.location.pathname == ("/community/forums/factions/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Factions Discussion forums";
        }
        else if (document.location.pathname == ("/community/forums/minigames/")) {
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
        else if (document.location.pathname == ("/community/leaderboards/")) {
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
        else if (document.location.pathname == ("/community/leaderboards/skyblock/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Skyblock leaderboards";
        }
        else if (document.location.pathname == ("/community/leaderboards/survival/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Survival leaderboards";
        }
        else if (document.location.pathname == ("/community/leaderboards/factions/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Factions leaderboards";
        }
        else if (document.location.pathname == ("/community/leaderboards/prison/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Prison leaderboards";
        }
        else if (document.location.pathname == ("/community/leaderboards/kitpvp/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "KitPvP leaderboards";
        }
        else if (document.location.pathname == ("/community/leaderboards/arenapvp/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "ArenaPvP leaderboards";
        }
        else if (document.location.pathname == ("/community/account/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Changing personal details";
        }
        else if (document.location.pathname.includes("/account/alerts")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Latest alerts";
        }
        else if (document.location.pathname == ("/community/conversations/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Conversations";
        }
        else if (document.location.pathname == ("/community/conversations/add")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Starting a:";
            presenceData.state = "New conversation...";
        }
        else if (document.location.pathname.includes("/account/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Account details";
        }
        else if (document.location.pathname == ("/community/watched/threads")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Unread watched threads";
        }
        else if (document.location.pathname == ("/community/watched/forums")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = "Watched forums";
        }
        else if (document.location.pathname.includes("/members/")) {
            user = document.querySelector(".mainText > h1");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:";
            presenceData.state = user.innerText + "\'s profile page";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDO0FBRWhELElBQUksSUFBVSxDQUFDO0FBQ2YsSUFBSSxNQUFZLENBQUM7QUFDakIsSUFBSSxjQUFvQixDQUFDO0FBRXpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBRWpDLElBQUksWUFBWSxHQUFpQjtRQUM3QixhQUFhLEVBQUUsZUFBZTtLQUNqQyxDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFlLEVBQUU7UUFDL0MsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxhQUFhLEVBQUU7WUFDN0MsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDbEMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDcEM7YUFFSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLG9CQUFvQixFQUFDO1lBQ3hELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7U0FDM0M7YUFFSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBQztZQUN2RCxZ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