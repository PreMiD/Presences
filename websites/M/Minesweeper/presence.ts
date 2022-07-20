const presence = new Presence({
	clientId: "989759189394030613",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
	largeImageKey: "https://i.imgur.com/KtDhLn7.png",
	startTimestamp: browsingTimestamp,
};

if (window.location.href.includes("my-games"))
	presenceData.details = "Viewing their games";
else if (window.location.href.includes("help"))
	presenceData.details = "Viewing the help page";
else if (window.location.href.includes("game"))
	presenceData.details = "Clicking cells";
else if (window.location.href.includes("ranking"))
	presenceData.details = "Viewing the rankings";
else if (window.location.href.includes("best-players"))
	presenceData.details = "Viewing the best players";
else if (window.location.href.includes("season-leaders"))
	presenceData.details = "Viewing this season's leaders";
else if (window.location.href.includes("quests"))
	presenceData.details = "Viewing their quests";
else if (window.location.href.includes("arena"))
	presenceData.details = "In the arena";
else if (window.location.href.includes("equipment"))
	presenceData.details = "Viewing their equipment";
else if (window.location.href.includes("marketplace"))
	presenceData.details = "Viewing the marketplace";
else if (window.location.href.includes("events"))
	presenceData.details = "Viewing the event";
else if (window.location.href.includes("players-online"))
	presenceData.details = "Viewing players online";
else if (window.location.href.includes("player"))
	presenceData.details = "Viewing their profile";
else if (window.location.href.includes("news"))
	presenceData.details = "Viewing the news";
else if (window.location.href.includes("statistics"))
	presenceData.details = "Viewing statistics";
else if (window.location.href.includes("chat"))
	presenceData.details = "Chatting";
else if (window.location.href.includes("premium"))
	presenceData.details = "Viewing the premium perks";
else if (window.location.href.includes("shop"))
	presenceData.details = "Viewing the shop";
else if (window.location.href.includes("profile"))
	presenceData.details = "Managing their account details";
else presenceData.details = "On the home page";

presence.setActivity(presenceData);
});
