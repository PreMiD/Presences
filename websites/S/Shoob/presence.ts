const presence = new Presence({
		clientId: "719127768868061246",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
    largeImageKey: "shooblb",
    startTimestamp: browsingTimestamp,
    details: "Viewing home page",
};
if (
    document.location.pathname === "/" ||
    document.location.pathname === "/home/"
)
    presenceData.details = "Viewing home page";
else if (document.location.pathname.includes("/user"))
    presenceData.details = `Viewing ${document.title}`;
else if (document.location.pathname.includes("/dashboard"))
    presenceData.details = "Viewing the Dashboard";
else if (document.location.pathname.includes("/premium"))
    presenceData.details = "Viewing Premium";
else if (document.location.pathname.includes("/giveaway"))
    presenceData.details = "Viewing Giveaways";
else if (document.location.pathname.includes("/settings"))
    presenceData.details = "Viewing Settings";
else if (document.location.pathname.includes("/market"))
    presenceData.details = "Viewing the Market";
else if (document.location.pathname.includes("/notifications"))
    presenceData.details = "Viewing Notifications";
else if (document.location.pathname.includes("/events"))
    presenceData.details = "Viewing Events";
else if (document.location.pathname.includes("/anime"))
    presenceData.details = "Viewing Anime";
else if (document.location.pathname.includes("/shop"))
    presenceData.details = "Viewing the Shop";
else if (document.location.pathname.includes("/bank"))
    presenceData.details = "Viewing the Bank";
else if (document.location.pathname.includes("/cards"))
    presenceData.details = "Viewing the Cards";
else if (document.location.pathname.includes("/card-abilities"))
    presenceData.details = "Viewing Card Abilities";
else if (document.location.pathname.includes("/card-events"))
    presenceData.details = "Viewing Card Events";
else if (document.location.pathname.includes("/inventory"))
    presenceData.details = "Viewing Inventory";
else if (document.location.pathname.includes("/fusion"))
    presenceData.details = "Fusing Cards";
else if (document.location.pathname.includes("/auction"))
    presenceData.details = "Viewing the Auction";
else if (document.location.pathname.includes("/trades"))
    presenceData.details = "Viewing Trades";
/// Anime Soul games section ///
else if (document.location.pathname.includes("/this-or-that"))
    presenceData.details = "Playing This or That";
else if (document.location.pathname.includes("/mini-games"))
    presenceData.details = "Playing Mini Games";
/// Anime Soul community section ///
else if (document.location.pathname.includes("/creators"))
    presenceData.details = "Viewing Creators";
else if (document.location.pathname.includes("/medals"))
    presenceData.details = "Viewing Medals";
else if (document.location.pathname.includes("/friends"))
    presenceData.details = "Viewing Friends";
else if (document.location.pathname.includes("/leaderboards"))
    presenceData.details = "Viewing Leaderboards";
else if (document.location.pathname.includes("/cardmakers/leaderboard"))
    presenceData.details = "Viewing CardMaker Leaderboards";
else if (document.location.pathname.includes("/servers"))
    presenceData.details = "Viewing Servers";
else if (document.location.pathname.includes("/appeals"))
    presenceData.details = "Viewing Appeals";
else if (document.location.pathname.includes("/updates"))
    presenceData.details = "Viewing Updates";
else if (document.location.pathname.includes("/articles?category=Guides"))
    presenceData.details = "Viewing Guides";
else if (document.location.pathname.includes("/rules"))
    presenceData.details = "Reading the Rules";
else if (document.location.pathname.includes("/staff-list"))
    presenceData.details = "Viewing Staff List";
else if (document.location.pathname.includes("/staff"))
    presenceData.details = "Viewing Staff Pages";

if (!presenceData.details) presence.setActivity();
else presence.setActivity(presenceData);
});
