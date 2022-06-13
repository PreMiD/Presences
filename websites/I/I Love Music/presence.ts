//______________________________________________________________________________________
const presence = new Presence({
	clientId: "477919120789078026",
});
let { language } = navigator;

switch (language) {
	// By ACertainCoder#9011
	//German
	//---------------------------------------
	case "de":
	case "de-CH":
	case "de-AT":
	case "de-LU":
	case "de-LI":
		language = "de";
		break;

	//English / Unknown
	//---------------------------------------
	case "en":
	case "en-US":
	case "en-EG":
	case "en-AU":
	case "en-GB":
	case "en-CA":
	case "en-NZ":
	case "en-IE":
	case "en-ZA":
	case "en-JM":
	case "en-BZ":
	case "en-TT":
	default:
		language = "en";
		break;
}
//__________________________________________________________________________________________

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
	};
	if (parseInt(document.querySelector("#playstop").textContent) > 0) {
		switch (language) {
			case "de":
				presenceData.details = "Spielt gerade";
				break;
			case "en":
				presenceData.details = "Listening to";
				break;
		}
		presenceData.state =
			document.querySelectorAll(".channelname")[0].textContent;
		presenceData.smallImageKey = "live";
		presence.setActivity(presenceData);
	} else {
		try {
			switch (language) {
				case "de":
					presenceData.details = "Stöbert durch";
					break;
				case "en":
					presenceData.details = "Browsing through";
					break;
			}
			presenceData.state = document.querySelector("#content > h1").textContent;
			presence.setActivity(presenceData);
		} catch (e) {
			//nothing
		}
		// __________________________________________________________________ Path's
		switch (document.location.pathname) {
			case "/": {
				// --------------------- Home
				switch (language) {
					case "de":
						presenceData.details = "Stöbert durch";
						presenceData.state = "die Startseite";
						break;
					case "en":
						presenceData.details = "Browsing through";
						presenceData.state = "mainpage";
						break;
				}
				presence.setActivity(presenceData);

				break;
			}
			case "/voting/": {
				//--------- Voting for Songs
				switch (language) {
					case "de":
						presenceData.details = "Votet für";
						presenceData.state = "neue Lieder";
						break;
					case "en":
						presenceData.details = "Voting for";
						presenceData.state = "new songs";
						break;
				}
				presence.setActivity(presenceData);

				break;
			}
			case "/the-battle/": {
				//------- Voting for The Battle
				switch (language) {
					case "de":
						presenceData.details = "Votet für";
						presenceData.state = "The Battle";
						break;
					case "en":
						presenceData.details = "Voting for";
						presenceData.state = "the battlee";
						break;
				}
				presence.setActivity(presenceData);

				break;
			}
			case "/charts/": {
				// ----------- Charts
				switch (language) {
					case "de":
						presenceData.details = "Sucht in Charts...";
						break;
					case "en":
						presenceData.details = "Looking for charts...";
						break;
				}
				presence.setActivity(presenceData);

				break;
			}
			case "/dance/": {
				// ------------- Dance & DJ's
				switch (language) {
					case "de":
						presenceData.details = "Sucht in Dance & DJ's...";
						break;
					case "en":
						presenceData.details = "Looking for";
						presenceData.state = "Dance & DJ's...";
						break;
				}
				presence.setActivity(presenceData);

				break;
			}
			case "/hiphop/": {
				// ------------- Hip Hop
				switch (language) {
					case "de":
						presenceData.details = "Sucht in Hip Hop...";
						break;
					case "en":
						presenceData.details = "Looking for Hip Hop...";
						break;
				}
				presence.setActivity(presenceData);

				break;
			}
			case "/channels/": {
				// ------------- Channellist
				switch (language) {
					case "de":
						presenceData.details = "Durchsucht die";
						presenceData.state = "Channelliste";
						break;
					case "en":
						presenceData.details = "Search in";
						presenceData.state = "Channel list";
						break;
				}
				presence.setActivity(presenceData);

				break;
			}
			case "/streams/": {
				// --------------- Streams
				switch (language) {
					case "de":
						presenceData.details = "Sucht nach";
						presenceData.state = "Streamlinks";
						break;
					case "en":
						presenceData.details = "Looking for";
						presenceData.state = "stream links";
						break;
				}
				presence.setActivity(presenceData);

				break;
			}
			case "/datenschutz/": {
				// ------------- Privacy policy
				switch (language) {
					case "de":
						presenceData.details = "Liest den Datenschutz...";
						break;
					case "en":
						presenceData.details = "Reading privacy policy";
						break;
				}
				presence.setActivity(presenceData);

				break;
			}
			case "/impressum/": {
				// ---------------- Imprint
				switch (language) {
					case "de":
						presenceData.details = "Liest das Impressum...";
						break;
					case "en":
						presenceData.details = "Reading imprint...";
						break;
				}
				presence.setActivity(presenceData);

				break;
			}
			// No default
		}
		presence.setActivity(presenceData);
	}
});
