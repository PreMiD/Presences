var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var presence = new Presence({
    clientId: "693097839424831489",
    mediaKeys: false
});

var browsingStamp = Math.floor(Date.now() / 1000);

var user;
var thread;
var punishmentUser;

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "MCCentral"
    };

    if (document.location.pathname == "/community/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Home Page";
    }

    else if (document.location.pathname == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Store Home Page";
    }
    else if (document.location.pathname.includes("/category/91801")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Ranks";
    }

    else if (document.location.pathname.includes("/category/205563")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Coal Rank Upgrades";
    }
    else if (document.location.pathname.includes("/category/205565")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Iron Rank Upgrades";
    }
    else if (document.location.pathname.includes("/category/205567")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Gold Rank Upgrades";
    }
    else if (document.location.pathname.includes("/category/205569")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Lapis Rank Upgrades";
    }
    else if (document.location.pathname.includes("/category/205570")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Emerald Rank Upgrades";
    }
    else if (document.location.pathname.includes("/category/205571")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Diamond Rank Upgrades";
    }
    else if (document.location.pathname.includes("/category/512622")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Bedrock Rank Upgrades";
    }
    else if (document.location.pathname.includes("/category/860358")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Legend Rank Upgrades";
    }

    else if (document.location.pathname.includes("/category/860358")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Legend Rank Upgrades";
    }

    else if (document.location.pathname.includes("/category/519352")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Keys";
    }
    else if (document.location.pathname.includes("/category/462418")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Effects";
    }
    else if (document.location.pathname.includes("/category/676785")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Pocketpals";
    }
    else if (document.location.pathname.includes("/category/722423")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Boosters";
    }
    else if (document.location.pathname.includes("/category/1080289")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking on Store:";
        presenceData.state = "Gift Cards";
    }
    else if (document.location.pathname.includes("/checkout")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checkout on Store";
    }

    else if (document.location.pathname == "/community/forums/"){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Forums Main Page";
    }

    else if (document.location.pathname.includes("/add-reply")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Replying a Thread";
    }
    else if (document.location.pathname.includes("/threads/")){
        thread = document.querySelector(".titleBar > h1").innerText;
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the Thread:";
        presenceData.state = "\"" + thread + "\"";
    }

    else if (document.location.pathname.includes("/announcements/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Annoucements";
    }
    else if (document.location.pathname.includes("/changelog/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Changelogs";
    }
    else if (document.location.pathname.includes("/newspaper/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Newspaper";
    }
    else if (document.location.pathname.includes("/faq/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "FAQ";
    }
    else if (document.location.pathname.includes("/bugs/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Bug Reports Main Page";
    }
    else if (document.location.pathname.includes("/forms/bug-reports.15/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Reporting a Bug";
    }
    else if (document.location.pathname.includes("/support/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Support Forums";
    }

    else if (document.location.pathname.includes("/apply/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Staff Application Forums";
    }
    else if (document.location.pathname.includes("/forms/staff-application.5/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Applying for Staff";
    }
    else if (document.location.pathname.includes("/forms/previous-staff-application.7/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Applying for Returning Staff";
    }
    else if (document.location.pathname.includes("/youtuber/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Youtuber Application Forums";
    }
    else if (document.location.pathname.includes("/forms/youtuber-application.6/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Applying for Youtuber";
    }

    else if (document.location.pathname.includes("/reports/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Report Players Forums";
    }
    else if (document.location.pathname.includes("/forms/report-players.2/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Reporting a Player";
    }

    else if (document.location.pathname.includes("/reports-staff/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Report Staff Forums";
    }
    else if (document.location.pathname.includes("/forms/report-staff.17/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Reporting a Staff Member";
    }

    else if (document.location.pathname.includes("/appeals/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Punishment Appeals Forums";
    }
    else if (document.location.pathname.includes("/forms/punishment-appeal.1/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Making a Punishment Appeal";
    }

    else if (document.location.pathname.includes("/punishments/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Searching for Punishments";
    }
    
    else if (document.location.pathname.includes("/general/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "General Discussion Forums";
    }
    else if (document.location.pathname == ("/community/forums/skyblock/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Skyblock Discussion Forums";
    }
    else if (document.location.pathname == ("/community/forums/creative/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Creative Discussion Forums";
    }
    else if (document.location.pathname == ("/community/forums/kitpvp/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "KitPvP Discussion Forums";
    }
    else if (document.location.pathname == ("/community/forums/survival/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Survival Discussion Forums";
    }
    else if (document.location.pathname == ("/community/forums/prison/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Prison Discussion Forums";
    }
    else if (document.location.pathname == ("/community/forums/factions/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Factions Discussion Forums";
    }
    else if (document.location.pathname == ("/community/forums/minigames/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Minigames Discussion Forums";
    }

    else if (document.location.pathname.includes("/off-topic/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Off Topic Forums";
    }
    else if (document.location.pathname.includes("/giveaways/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Giveaways Forums";
    }
    else if (document.location.pathname.includes("/suggestions/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Server Suggestions Forums";
    }
    else if (document.location.pathname.includes("/maps/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Map Submission Forums";
    }
    else if (document.location.pathname.includes("/community-ticket/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Community Ticket Forums";
    }
    else if (document.location.pathname.includes("/forms/community-ticket.18/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Sending a Community Ticket";
    }

    else if (document.location.pathname.includes("/staff/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Staff Members Page";
    }
    else if (document.location.pathname.includes("/rules/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Rules Page";
    }
    else if (document.location.pathname.includes("/vote/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Voting Page";
    }

    else if (document.location.pathname == ("/community/leaderboards/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Leaderboards Page";
    }
    else if (document.location.pathname.includes("/guilds/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Guilds Leaderboards";
    }
    else if (document.location.pathname.includes("/survivalgames/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Survival Games Leaderboards";
    }
    else if (document.location.pathname.includes("/skywars/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Skywars Leaderboards";
    }
    else if (document.location.pathname.includes("/walls/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Speedy Walls Leaderboards";
    }
    else if (document.location.pathname.includes("/ctf/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "CTF Leaderboards";
    }
    else if (document.location.pathname.includes("/murder/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Murder Mayhem Leaderboards";
    }
    else if (document.location.pathname.includes("/championbuilder/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Champion Builder Leaderboards";
    }
    else if (document.location.pathname.includes("/cakewars/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Cakewars Leaderboards";
    }
    else if (document.location.pathname.includes("/uhc/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "UHC Leaderboards";
    }

    else if (document.location.pathname == ("/community/leaderboards/skyblock/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Skyblock Leaderboards";
    }
    else if (document.location.pathname == ("/community/leaderboards/survival/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Survival Leaderboards";
    }
    else if (document.location.pathname == ("/community/leaderboards/factions/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Factions Leaderboards";
    }
    else if (document.location.pathname == ("/community/leaderboards/prison/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Prison Leaderboards";
    }
    else if (document.location.pathname == ("/community/leaderboards/kitpvp/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "KitPvP Leaderboards";
    }
    else if (document.location.pathname == ("/community/leaderboards/arenapvp/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "ArenaPvP Leaderboards";
    }

    else if (document.location.pathname == ("/community/account/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Changing Personal Details";
    }
    else if (document.location.pathname.includes("/account/alerts")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Latest Alerts";
    }
    else if (document.location.pathname == ("/community/conversations/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Conversations";
    }
    else if (document.location.pathname == ("/community/conversations/add")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Starting a New Conversation";
    }
    else if (document.location.pathname.includes("/account/")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Account Details";
    }
    else if (document.location.pathname == ("/community/watched/threads")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Unread Watched Threads";
    }
    else if (document.location.pathname == ("/community/watched/forums")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = "Watched Forums";
    }

    else if (document.location.pathname.includes("/members/")) {
        user = document.querySelector(".mainText > h1").innerText;
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing:";
        presenceData.state = user + "\'s profile page";
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));