const presence = new Presence({
		//The client ID of the Application created at https://discordapp.com/developers/applications
		clientId: "1018020550095945828"
	}),
	//You can use this to get translated strings in their browser language
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused"
	});

/*function GetPage(): string {
    //Grab and process all your data here

    // element grabs //
    // api calls //
    // variable sets //
	
	
	
	
	// Pagee is what's mostly used for returning the 
	console.log("doot")
	// trending page doesn't have any path
	if (Linkk == "") Pagee = "trending";
	// see if the first part is user, post, or search
	else if (Linkk[0] == "_") {
		// there is a file path with "_nuxt," IDK what to display with this, so I've just decided to do this
		Pagee = "something"
	} else if (Linkk.substring(0,4) == "user") {
		// if it's a user, return the username from title
		return "Viewing user: " + document.getElementsByClassName("TEXT Title")[0].innerHTML;
	} else if (Linkk.substring(0,4) == "post") {
		// if it's a post, return "viewing <post category>"
		// temporarily just "viewing a post"
		Pagee = "post by " + document.getElementsByClassName("TEXT_CLIP POST_DISPLAY_NAME AuthorName")[0].innerHTML;
	} else if (Linkk.substring(0,6) == "search") {
		// return what the user is searching for
		return "Searching for: " + (<HTMLInputElement>document.getElementsByClassName("INPUT_BORDER TEXT Field")[0]).value;
	} else if (Linkk.includes("image") || Linkk.includes("video")) {
		// return that the user is looking directly at a piece of media (whether it is an image or video)
		Pagee = "media"
	} else if (Linkk.includes("/")) {
		console.log(Linkk)
		// if it's some other path with a '/', it's probably some sorted category
		// split the link, swap arround the two parts, can use Pagee as temp for swap
		Splitted = Linkk.split("/")
		Pagee = Splitted[0]
		Splitted[0] = Splitted[1]
		Splitted[1] = Pagee
		Pagee = Splitted.join(" ")
	} else {
		Pagee = Linkk;
	}
	// just return whatever the path is if nothing before worked
	return "Viewing: " + Pagee;
	
	
	
	if (Splitted[0] == undefined) {
		// if the path is blank, it's the home page
		Pagee += " home page: trending";
	} else if (Splitted[0] == "user") {
		// if first part of the path is "user," display viewing username
		Pagee +=  " user: " + document.getElementsByClassName("TEXT Title")[0].innerHTML;;
	} else if (Splitted[0] == "post") {
		// if first part of the path is "post," display who the post is by
		Pagee = " post by: " + document.getElementsByClassName("TEXT_CLIP POST_DISPLAY_NAME AuthorName")[0].innerHTML;
	} else if (Splitted[0] == "search") {
		// if the first part of the path is "search," get what the heading title is and display that
		Pagee = "Searching for: " + (<HTMLInputElement>document.getElementsByClassName("Title")[0]).value;
	} else if (Splitted[0].includes("image") || Splitted[0].includes("video") || Splitted[1].includes("img")) {
		// if the first part has "image" or "video," or the secon part has "img," return that the user is looking at media
		Pagee += " directly: media";
	} else {
		// here is where things get a little more broad
		if (Splitted.includes(Splitted[0]) {
			// this is where status on subcomunities are made
			if (Splitted.length == 3) {
				// if there are three parts to the link, create the status similar to "Viewing: top Half-Life news"
				Pagee += ": " + Splitted[2] + " in " Splitted[0] + " " + Splitted[1];
			} else if {
				// if there is no sort in the link, then use "trending"
				Pagee += ": trending in ";
			}
			// put category and then 
		} else {
		
		
		
	}
	
	
}*/

presence.on("UpdateData", async () => {
	/*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.
	
	It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/
	
	// for my own convenience, I'm using the link for presence data
	// substring function to get rid of the initial '/'
	let Linkk: string = window.location.pathname.substring(1),
	// this array will be used for the logic
	Splitted: string[] = Linkk.split("/"),
	// this dictionary stores all the available sub communities
	SubComms: any = {
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
		["l4d"]: "Left 4 Dead"
	},
	// Pagee will be used as the actual status
	Pagee: string[] = ["Viewing","trending"];
	switch (Splitted.length) {
		case 1: {
			// if on the most basic of links, return just either what's in the sub-community dictionary or just that part of the link
			Pagee[0]+=":";
			if (SubComms[Splitted[0]] != undefined) {
				Pagee[1]+=" in " + SubComms[Splitted[0]];
			} else if (Splitted[0] != "") {
				Pagee[1]= Splitted[0];
			}
			break;
		}
		
		case 2:
		case 3: {
			if (Splitted[0] == "user") {
				// if first part of the path is "user," display viewing username
				Pagee[0]= "Viewing user:";
				Pagee[1]= document.getElementsByClassName("PROFILE_NAME Title")[0].innerHTML;
				break;
			} else if (Splitted[1] == "post") {
				// if first part of the path is "post," display who the post is by
				Pagee[0] = "Viewing post by:";
				Pagee[1] = document.getElementsByClassName("TEXT_CLIP POST_DISPLAY_NAME AuthorName")[0].innerHTML;
				break;
			} else if (Splitted[0] == "search") {
				// if the first part of the path is "search," get what the heading title is and display that
				Pagee[0] = "Searching for";
				if (Splitted[2] == "users") {
					// if the person is searching in users, add on user to the status
					Pagee[0]+= " user";
				}
				Pagee[0]+= ":";
				Pagee[1]= document.getElementsByClassName("Title")[0].innerHTML;
				break;
			} else if (Splitted[0].includes("image") || Splitted[0].includes("video") || Splitted[1].includes("img")) {
				// if the first part has "image" or "video," or the secon part has "img," return that the user is looking at media
				Pagee[0]+= " directly:";
				Pagee[1]= "media";
				break;
			} else if (SubComms[Splitted[0]] != undefined) {
				Pagee[0]+= ":";
				// below is where statuses with subcomms are made
				if (Splitted[2] == undefined || Splitted[2] == "" || Splitted[2] == Splitted[1].substring(0,3)) {
					// if there isn't a third part to the path, then just work with the two (or if it's new news, just act like the "/new" isn't there)
					Pagee[1]= Splitted[1] + " in " + SubComms[Splitted[0]];
				} else {
					// if there is a third part to the link, work with it
					Pagee[1]= Splitted[2] + " " + Splitted[1] + " in " + SubComms[Splitted[0]];
				}
				
				
				break;
			}
			// just display whatever is in the first part of the path, because IDK
			Pagee[0]+=":";
			Pagee[1]=Splitted[0];
			break;
		}
		
		
	}
	
	
	
	
	const presenceData: PresenceData = {
		//The large image on the presence. This can be a key of an image uploaded on the Discord Developer Portal - Rich Presence - Art Assets, or a URL to an image
		largeImageKey: "lambda",
		//The upper section of the presence text
		details: Pagee[0],
		state: Pagee[1]
	};
	
	//Update the presence with all the values from the presenceData object
	if (presenceData.details) presence.setActivity(presenceData);
	//Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
	else presence.setActivity();
});