const presence = new Presence({
	//The client ID of the Application created at https://discordapp.com/developers/applications
	clientId: "1018020550095945828",
});

presence.on("UpdateData", async () => {
	/*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.
	
	It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

	// for my own convenience, I'm using the link for presence data
	// substring function to get rid of the initial '/'
	const // this array will be used for the logic
		Splitted: string[] = window.location.pathname.substring(1).split("/"),
		// this dictionary stores all the available sub communities
		SubComms: Record<string, string> = {
			["half-life"]: "Half-Life",
			["portal"]: "Portal",
			["tf2"]: "Team Fortess 2",
			["valve"]: "Valve",
			["lambdageneration"]: "LambdaGeneration",
			["black-mesa"]: "Black Mesa",
			["sfm"]: "Source Film Maker",
			["sven-co-op"]: "Sven Co-op",
			["gmod"]: "Garry's Mod",
			["csgo"]: "CS:GO",
			["l4d"]: "Left 4 Dead",
		},
		// Pagee will be used as the actual status
		Pagee: string[] = ["Viewing", "trending"];
	switch (Splitted.length) {
		case 1: {
			// if on the most basic of links,
			// return just either what's in the sub-community dictionary, if it's the LFT store, or just that part of the link
			Pagee[0] += ":";
			if (window.location.hostname.includes("lft")) Pagee[1] = "LFTs";
			else if (SubComms[Splitted[0]]) Pagee[1] += ` in ${SubComms[Splitted[0]]}`;
			else if (Splitted[0] !== "") Pagee[1] = Splitted[0];

			break;
		}

		case 2:
		case 3: {
			if (Splitted[0] === "user") {
				// if first part of the path is "user," display viewing username
				Pagee[0] = "Viewing user:";
				Pagee[1] = document.querySelectorAll(
					".PROFILE_NAME.Title"
				)[0].innerHTML;
				break;
			} else if (Splitted[1] === "post") {
				// if first part of the path is "post," display who the post is by
				Pagee[0] = "Viewing post by:";
				Pagee[1] = document.querySelectorAll(
					".TEXT_CLIP.POST_DISPLAY_NAME.AuthorName"
				)[0].innerHTML;
				break;
			} else if (Splitted[0] === "search") {
				// if the first part of the path is "search," get what the heading title is and display that
				Pagee[0] = "Searching for";
				if (Splitted[2] === "users") {
					// if the person is searching in users, add on user to the status
					Pagee[0] += " user";
				}
				Pagee[0] += ":";
				Pagee[1] = document.querySelectorAll(".Title")[0].innerHTML;
				break;
			} else if (
				Splitted[0].includes("image") ||
				Splitted[0].includes("video") ||
				Splitted[1].includes("img")
			) {
				// if the first part has "image" or "video," or the secon part has "img," return that the user is looking at media
				Pagee[0] += " directly:";
				Pagee[1] = "media";
				break;
			} else if (SubComms[Splitted[0]]) {
				Pagee[0] += ":";
				// below is where statuses with subcomms are made
				if (!Splitted[2] || Splitted[2] === Splitted[1].substring(0, 3)) {
					// if there isn't a third part to the path, then just work with the two (or if it's new news, just act like the "/new" isn't there)
					Pagee[1] = `${Splitted[1]} in ${SubComms[Splitted[0]]}`;
				} else {
					// if there is a third part to the link, work with it
					Pagee[1] = `${Splitted[2]} ${Splitted[1]} in ${
						SubComms[Splitted[0]]
					}`;
				}

				break;
			}
			// just display whatever is in the first part of the path, because IDK
			Pagee[0] += ":";
			Pagee[1] = Splitted[0];
			break;
		}
	}

	const presenceData: PresenceData = {
		//The large image on the presence. This can be a key of an image uploaded on the Discord Developer Portal - Rich Presence - Art Assets, or a URL to an image
		largeImageKey: "lambda",
		//The upper section of the presence text
		details: Pagee[0],
		state: Pagee[1],
	};

	//Update the presence with all the values from the presenceData object
	if (presenceData.details) presence.setActivity(presenceData);
	//Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
	else presence.setActivity();
});
