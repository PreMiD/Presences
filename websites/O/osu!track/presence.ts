const presence = new Presence({
	clientId: "861180231909113866"
}),

 timestampe = Math.floor(Date.now() / 1000);

presence.on('UpdateData', async() => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: timestampe
	},

	{pathname} = location,
	
	urlSplit = document.URL.split('/'),

	decodeURL = decodeURIComponent(urlSplit[5]);

	if (pathname === "/osutrack/") 
		presenceData.details = "Viewing homepage";
	else if (pathname === "/osutrack/user/") {
		presenceData.details = "Viewing a user's statistics";
		presenceData.state = "User not found!";
	} else if (pathname === `/osutrack/user/${urlSplit[5]}`) {
		presenceData.details = "Viewing a user's statistics";
		presenceData.state = decodeURL;
		presenceData.smallImageKey = "osu_std_logo";
		presenceData.smallImageText = "osu!standard";
	} else if (pathname === `/osutrack/user/${urlSplit[5]}/`) {
		presenceData.details = "Viewing a user's statistics";
		presenceData.state = decodeURL;
		presenceData.smallImageKey = "osu_std_logo";
		presenceData.smallImageText = "osu!standard";
	} else if (pathname === `/osutrack/user/${urlSplit[5]}/taiko`) {
		presenceData.details = "Viewing a user's statistics";
		presenceData.state = `${decodeURL} in osu!taiko`;
		presenceData.smallImageKey = "taiko";
		presenceData.smallImageText = "Taiko";
	} else if (pathname === `/osutrack/user/${urlSplit[5]}/taiko/`) {
		presenceData.details = "Viewing a user's statistics";
		presenceData.state = `${decodeURL} in osu!taiko`;
		presenceData.smallImageKey = "taiko";
		presenceData.smallImageText = "Taiko";
	} else if (pathname === `/osutrack/user/${urlSplit[5]}/ctb`) {
		presenceData.details = "Viewing a user's statistics";
		presenceData.state = `${decodeURL} in osu!catch the beat`;
		presenceData.smallImageKey = "ctb";
		presenceData.smallImageText = "Catch The Beat (CTB)";
	} else if (pathname === `/osutrack/user/${urlSplit[5]}/ctb/`) {
		presenceData.details = "Viewing a user's statistics";
		presenceData.state = `${decodeURL} in osu!catch the beat`;
		presenceData.smallImageKey = "ctb";
		presenceData.smallImageText = "mania";
	} else if (pathname === `/osutrack/user/${urlSplit[5]}/mania`) {
		presenceData.details = "Viewing a user's statistics";
		presenceData.state = `${decodeURL} in osu!mania`;
		presenceData.smallImageKey = "mania";
		presenceData.smallImageText = "Mania";
	} else if (pathname === `/osutrack/user/${urlSplit[5]}/mania/`) {
		presenceData.details = "Viewing a user's statistics";
		presenceData.state = `${decodeURL} in osu!mania`;
		presenceData.smallImageKey = "mania";
		presenceData.smallImageText = "Mania";
	} else if (pathname === "/osutrack/bestplays/") {
		presenceData.details = "Viewing at the Best Plays";
		presenceData.state = "osu!standard";
		presenceData.smallImageKey = "osu_std_logo";
		presenceData.smallImageText = "osu!standard";
	} else if (pathname === "/osutrack/bestplays/taiko/") {
		presenceData.details = "Viewing at the Best Plays";
		presenceData.state = "osu!taiko";
		presenceData.smallImageKey = "taiko";
		presenceData.smallImageText = "osu!taiko";
	} else if (pathname === "/osutrack/bestplays/ctb/") {
		presenceData.details = "ViewKing at the Best Plays";
		presenceData.state = "osu!catch the beat (cbt)";
		presenceData.smallImageKey = "ctb";
		presenceData.smallImageText = "osu!catch the beat";
	} else if (pathname === "/osutrack/bestplays/mania/") {
		presenceData.details = "Viewing at the Best Plays";
		presenceData.state = "osu!mania";
		presenceData.smallImageKey = "mania";
		presenceData.smallImageText = "osu!mania";
	} else if (pathname === "/osutrack/b/") {
		const indexText = document.querySelector("body > h1");

		presenceData.details = `Viewing ${indexText.textContent}`;
	} else if (pathname === "/osutrack/b/ads/") 
		presenceData.details = "Viewing About Ads on osu!track";
	else if (pathname === "/osutrack/b/discord/") 
		presenceData.details = "Viewing about osu!track's Discord Bot";
	else if (pathname === "/osutrack/b/mailer/") 
		presenceData.details = "Viewing abotu osu!track's Mailerbot Refrence";
	else if (pathname === "/osutrack/b/pp/") {
		presenceData.details = "Viewing at Top 10 PP Plays of osu!";
    presenceData.state = "As of 10/10/2014";
	} else if (pathname === "/osutrack/updater/") 
    presenceData.details = "Viewing at the IRC Bot's Documentation";
   else if (pathname === "/osutrack/updater/index.php") 
    presenceData.details = "Viewing at the IRC Bot's Documentation";
  

	if (presenceData.details === null) {
    //This will fire if you do not set presence details
    presence.setTrayTitle(); //Clears the tray title for mac users
    presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  } else {
    //This will fire if you set presence details
    presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }
});