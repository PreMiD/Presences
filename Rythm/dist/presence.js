//-----------------------------------------------------------------------------------------------------------------------------------------------------
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: new P(function (resolve) {
							resolve(result.value);
					  }).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};

var presence = new Presence({
		clientId: "683285340571566091",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		search: "presence.activity.searching",
		reading: "presence.activity.reading",
		browsing: "presence.activity.browsing",
	});
//-----------------------------------------------------------------------------------------------------------------------------------------------------
presence.on("UpdateData", () =>
	__awaiter(this, void 0, void 0, function* () {
		const host = window.location.hostname.replace("www.", "");
		const path = window.location.pathname.split("/").slice(1);
		var presenceData = {
			details: "Rythm",
			largeImageKey: "logo_big",
		};

		switch (host) {
			//Homepage
			//---------------------------------------------------------------------------------------------------------------------
			case "rythmbot.co":
				switch (path[0]) {
					//Features & Commands
					//------------------------------------------------------------------------------
					case "features":
						presenceData.details = "Features & Commands";
						if (new URL(window.location).hash == "#list") {
							presenceData.smallImageKey = "reading";
							presenceData.smallImageText = (yield strings).browsing;

							presenceData.state = "Browsing Commands";
						}
						break;
					//Rythm FAQ
					//------------------------------------------------------------------------------
					case "faq":
						presenceData.details = "Frequently Asked Questions";
						if (document.getElementById("search").value.length > 0) {
							presenceData.smallImageKey = "search";
							presenceData.smallImageText = (yield strings).search;

							presenceData.state = `Searching for "${
								document.getElementById("search").value
							}"`;
						} else {
							presenceData.smallImageKey = "reading";
							presenceData.smallImageText = (yield strings).reading;
						}
						break;
					//Troubleshooting Guide
					//------------------------------------------------------------------------------
					case "troubleshooting":
						presenceData.details = "Troubleshooting";
						if (document.getElementById("search").value.length > 0) {
							presenceData.smallImageKey = "search";
							presenceData.smallImageText = (yield strings).search;

							presenceData.state = `Searching for "${
								document.getElementById("search").value
							}"`;
						} else {
							presenceData.smallImageKey = "reading";
							presenceData.smallImageText = (yield strings).reading;
						}
						break;
					//Contact Us
					//------------------------------------------------------------------------------
					case "contact":
						presenceData.details = "Contact Us";
						break;
					//Terms of Service
					//------------------------------------------------------------------------------
					case "tos":
						presenceData.details = "Terms of Service";
						break;
					//Community Reviews
					//------------------------------------------------------------------------------
					case "reviews":
						presenceData.details = "Community Reviews";
						break;
					//Add to Discord
					//------------------------------------------------------------------------------
					case "invite":
					case "rythm":
					case "rythm2":
					case "rythmcanary":
					//Support Server
					//------------------------------------------------------------------------------
					case "support":
					//Unknown
					//------------------------------------------------------------------------------
					default:
						presence.setTrayTitle();
						presence.setActivity();
						return;
					//------------------------------------------------------------------------------
				}
				break;
			//Web Dashboard
			//---------------------------------------------------------------------------------------------------------------------
			case "web.rythmbot.co":
				presenceData.details = "Web Dashboard";
				break;

			//! The web dashboard is currently non functional - This part will be added once it's possible to use it again
			/*switch(path[0]) {
                //Manage Guilds
                //------------------------------------------------------------------------------
                //TODO: Server-Selection, Player-Status (Play, Pause, Nothing, Current Time)
                case 'guilds':
                    presenceData.details = 'Manage Guilds';
                    if(document.getElementById('guild_search').value.length > 0) presenceData.state = `Searching for "${document.getElementById('guild_search').value}"`;
                    break;
                //Login
                //------------------------------------------------------------------------------
                case 'login':
                //Logout
                //------------------------------------------------------------------------------
                case 'logout':
                //Unknown
                //------------------------------------------------------------------------------
                //TODO Server-IDs
                default:
                    presence.setTrayTitle();
                    presence.setActivity();
                    return;
                //------------------------------------------------------------------------------
            }
            break;*/
		}

		presence.setActivity(presenceData);
	})
);
//-----------------------------------------------------------------------------------------------------------------------------------------------------
presence.on("MediaKeys", (key) => {
	const host = window.location.hostname.replace("www.", "");
	const path = window.location.pathname.split("/").slice(1);
	return;

	//! The web dashboard is currently non functional - This part will be added once it's possible to use it again
	/*if(host == 'web.rythmbot.co') {
        //TODO: Interaction with the web dashboard & validation of the path
        switch(key) {
            //Play / Pause / Stop
            //------------------------------------------------------------------------------
            case 'pause':
                //TODO Usage of "!pause" & "!resume"
                break;
            //Skip
            //------------------------------------------------------------------------------
            case 'nextTrack':
                //TODO Usage of "!skip"
                break;
            //Rewind
            //------------------------------------------------------------------------------
            case 'previousTrack':
                //TODO Usage of "!replay"
                break;
            //------------------------------------------------------------------------------
        }
    }*/
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------
