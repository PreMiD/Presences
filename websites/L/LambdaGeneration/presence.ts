const presence = new Presence({
	clientId: "1018020550095945828",
});

presence.on("UpdateData", async () => {
	const splitted: string[] = window.location.pathname.substring(1).split("/"),
		subComms: Record<string, string> = {
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
		pagee: string[] = ["Viewing", "trending"];
	if (window.location.hostname.includes("lambdabuilds")) {
		if (splitted[0]) {
			pagee[0] += " competition:";
			pagee[1] = document.querySelectorAll("h1.Title")[0].innerHTML;
		} else {
			pagee[0] += ":";
			pagee[1] = "competitions";
		}
	} else {
		switch (splitted.length) {
			case 1: {
				pagee[0] += ":";
				if (window.location.hostname.includes("lft")) pagee[1] = "LFTs";
				else if (subComms[splitted[0]])
					pagee[1] += ` in ${subComms[splitted[0]]}`;
				else if (splitted[0]) pagee[1] = splitted[0];
				break;
			}

			case 2:
			case 3: {
				if (splitted[0] === "user") {
					pagee[0] += " user:";
					pagee[1] = document.querySelectorAll(
						".PROFILE_NAME.Title"
					)[0].innerHTML;
					break;
				} else if (splitted[1] === "post") {
					pagee[0] += " post by:";
					pagee[1] = document.querySelectorAll(
						".TEXT_CLIP.POST_DISPLAY_NAME.AuthorName"
					)[0].innerHTML;
					break;
				} else if (splitted[0] === "search") {
					pagee[0] = "Searching for";
					if (splitted[2] === "users") pagee[0] += " user";

					pagee[0] += ":";
					pagee[1] = document.querySelectorAll(".Title")[0].innerHTML;
					break;
				} else if (
					splitted[0].includes("image") ||
					splitted[0].includes("video") ||
					splitted[1].includes("img")
				) {
					pagee[0] += " directly:";
					pagee[1] = "media";
					break;
				} else if (subComms[splitted[0]]) {
					pagee[0] += ":";
					if (!splitted[2])
						pagee[1] = `${splitted[1]} in ${subComms[splitted[0]]}`;
					else {
						pagee[1] = `${splitted[2]} ${splitted[1]} in ${
							subComms[splitted[0]]
						}`;
					}

					break;
				}
				pagee[0] += ":";
				pagee[1] = splitted[0];
				break;
			}
		}
	}

	const presenceData: PresenceData = {
		largeImageKey: "lambda",
		details: pagee[0],
		state: pagee[1],
	};

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
