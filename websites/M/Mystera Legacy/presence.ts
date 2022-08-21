const presence = new Presence({
		clientId: "1010667786919497789",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://i.imgur.com/XBaHzfF.png",
		details: "Mystera Legacy",
		startTimestamp: browsingTimestamp,
	};
	// does not support itch.io game - only the mystera legacy website
	if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.includes("/about"))
		presenceData.details = "Viewing about page";
	else if (document.location.pathname.includes("/mystera-legacy-players-guide"))
		presenceData.details = "Viewing the guide";
	else if (document.location.pathname.includes("/mystera-legacy-leaderboards"))
		presenceData.details = "Viewing the leaderboards";
	else if (document.location.pathname.includes("/contact"))
		presenceData.details = "Viewing the contact page";
	else if (document.location.pathname.includes("/play-ml"))
		presenceData.details = "Playing Mystera Legacy";
	else if (document.location.pathname.includes("/play/full.php"))
		presenceData.details = "Playing Mystera Legacy";
	else if (document.location.pathname.includes("/lostpassword"))
		presenceData.details = "Resetting password";
	else if (document.location.pathname.includes("/login"))
		presenceData.details = "Logging in";
	else if (document.location.pathname.includes("/your-profile"))
		presenceData.details = "Viewing profile";
	else if (document.location.pathname.includes("/perks"))
		presenceData.details = "Viewing the perks page";
	else if (document.location.pathname.includes("/logout"))
		presenceData.details = "Logging out";
	else if (document.location.pathname.includes("/earn"))
		presenceData.details = "Earning diamonds";
	else if (document.location.pathname.includes("/credits"))
		presenceData.details = "Viewing the credits";
	else if (document.location.pathname.includes("/terms"))
		presenceData.details = "Viewing the Terms of Service";
	else if (document.location.pathname.includes("/privacy"))
		presenceData.details = "Viewing the privacy page";
	else if (document.location.pathname.includes("/forums"))
		presenceData.details = "Viewing the forums";
	else if (document.location.pathname.includes("/become-a-supporter"))
		presenceData.details = "Becoming a Supporter";

	if (presenceData.details) presence.setActivity(presenceData);
	//Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
	else presence.setActivity();
});
