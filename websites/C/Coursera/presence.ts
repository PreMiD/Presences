type Functionlize<T> = {
	[P in keyof T]: () => T[P];
};

interface Route extends Functionlize<Partial<PresenceData>> {
	path: RegExp;
	playback?(): boolean;
	run?(): PresenceData;
}

const enum LoAssets {
	Logo = "https://i.imgur.com/P4XquqE.png",

}

enum Settings {
	TIMESTAMP = "timestamp",
	BUTTONS = "buttons",
}


const presence = new Presence({
		clientId: "1179996601327026227",
	}),
	startTimestamp: number = Math.floor(Date.now() / 1000),
	router = ({
		path,
		
	}: {
		path: string;
		presenceData: PresenceData;
	}): Route => {
		const routes: Route[] = [
			{
				path: /^\/$/,
				details: () => "On Homepage",
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Browsing",
			},
			
			{
				path: /^\/account-profile$/,
				details: () => " Viewing own Profile",
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Browsing",
			},
			{
				path: /^\/user\/.*$/,
				details: () => {
					const element = document.querySelector("[data-testid='profile-photo-invite-section-title']");
					const name = `Viewing ${element.textContent}'s Profile`;
						return(name); 

				},
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Browsing",
				buttons: () => [{ label: "Profile Link", url: location.href }],
			},
			{
				path: /^\/learn\/(?!.*\bhome\b).*\/$/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					const title =document.title;
					const index = title.lastIndexOf(" ") -1;
					const result =  `Subject: ${title.substring(0, index)}`;
					return(result);

				}
				
					,
					details: () =>{
						const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							const currentUrl = document.location.href;
						const parts = currentUrl.split("/").slice(0, 5);
						const result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.*\/home\/week\/.*$/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[4].split("-").join(" ");
						return replaced;

				}
					,
					details: () =>{
						const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[6].split("-").join(" ");
						const result = (`Viewing : ${replaced.toUpperCase() + " " + parts[7]}'s content`);
						return result;
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							const currentUrl = document.location.href;
						const parts = currentUrl.split("/").slice(0, 5);
						const result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.*\/home\/(?!.*\bweek\b).*$/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[6].toUpperCase().split("-").join(" ");
						const result = `Viewing Course ${replaced}`;
						return result;

				}
					,
					details: () =>{
						const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							const currentUrl = document.location.href;
						const parts = currentUrl.split("/").slice(0, 5);
						const result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.*\/discussions$/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					
						return ("Reading Course Discussions Forums");

				}
					,
					details: () =>{
						const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url:(()=>{
							const currentUrl = document.location.href;
						const parts = currentUrl.split("/").slice(0, 5);
						const result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.*\/resources\/.*$/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					
						return ("Viewing Course Resources");

				}
					,
					details: () =>{
						const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							const currentUrl = document.location.href;
						const parts = currentUrl.split("/").slice(0, 5);
						const result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.*\/course-inbox$/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					
						return ("Checking Course Inbox");

				}
					,
					details: () =>{
						const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							const currentUrl = document.location.href;
						const parts = currentUrl.split("/").slice(0, 5);
						const result = parts.join("/");
						return result;
						})() },
						
					],
				
			},

			{
				path: /^\/learn\/.+\/lecture\/*/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					const title =document.title;
					const index = title.lastIndexOf(" ") -1;
					const result =  `Lecture: ${title.substring(0, index)}`;
					return(result);

				}
					,
					details: () =>{
						const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							const currentUrl = document.location.href;
						const parts = currentUrl.split("/").slice(0, 5);
						const result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.+\/quiz\/*/,
				smallImageKey: () => Assets.Writing,
				smallImageText: () => "Learning",
				state: () =>{
					return("Taking a Quiz")

				}
					,
					details: () =>{
						const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							const currentUrl = document.location.href;
						const parts = currentUrl.split("/").slice(0, 5);
						const result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.+\/exam\/*/,
				smallImageKey: () => Assets.Writing,
				smallImageText: () => "Learning",
				state: () =>{
					return("Solving an Exam")

				}
					,
					details: () =>{
						const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							const currentUrl = document.location.href;
						const parts = currentUrl.split("/").slice(0, 5);
						const result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.+\/ungraded*\/*/,
				smallImageKey: () => Assets.Writing,
				smallImageText: () => "Learning",
				state: () =>{
					const title =document.title;
					const index = title.lastIndexOf(" ") -1;
					const result =  `Subject: ${title.substring(0, index)}`;
					return(result);

				}
					,
					details: () =>{
						const currentUrl = document.location.href;
						const parts = currentUrl.split("/");
						const replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							const currentUrl = document.location.href;
						const parts = currentUrl.split("/").slice(0, 5);
						const result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			
			{
				path: /^\/learn\/.*\/?$/,
				smallImageKey: () => Assets.Viewing,
				smallImageText: () => "Viewing",
				details: () =>`
				Viewing a Course`
					,
				state: () =>{
					const element = document.querySelector("[data-e2e='hero-title']");
							return(element.textContent); 
					},
					buttons: () => [
						{ label: "Course Link", url: location.href },]
				
			},
			{
				path: /^\/specializations\/.+$/,
				smallImageKey: () => Assets.Viewing,
				smallImageText: () => "Viewing",
				details: () =>`
				Viewing a Course`
					,
				state: () =>{
					const element = document.querySelector("[data-e2e='hero-title']");
							return(element.textContent); 
					},
					buttons: () => [
						{ label: "Course Link", url: location.href },]
				
			},
			{
				path: /^\/search*/,
				smallImageKey: () => Assets.Search,
				smallImageText: () => "Searching",
				details: () =>{
					const url = document.location.href;
						const urlObj = new URL(url);
					const query = urlObj.searchParams.get("query");
					return("searching for \"" + query +"\"" ); 

				}
					,
				state: () =>{
					const element = document.querySelector("[data-e2e='NumberOfResultsSection']")
					const text = element.textContent.split(" ");
					return(`Found ${text[0]} results`);}
					,
				buttons: () => [{ label: "Results", url: location.href }],
			},
			{
				path: /^\/+.*$/,
				details: () =>{
						const currentUrl = document.location.href;
						// check if currentUrl contains "my-learning"
						if (currentUrl.indexOf("my-learning") !== -1) {
 						 // if yes, return "My courses"
 						 return "My Courses";
							} else {
 							 // if no, continue with the original code
 							 const parts = currentUrl.split("/");
 							 const replaced = parts[3].toUpperCase().split("-").join(" ");
 						 return replaced;
					}

					},
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Browsing",
			},
			
		];

		return routes.find(route => route.path.test(path));
	};

presence.on("UpdateData", async () => {
	const [showTimestamp, showButtons] = await Promise.all([
		presence.getSetting<boolean>(Settings.TIMESTAMP),
		presence.getSetting<boolean>(Settings.BUTTONS),
	]);

	const presenceData: PresenceData = {
		largeImageKey: LoAssets.Logo,
	};

	if (showTimestamp) presenceData.startTimestamp = startTimestamp;

	const route = router({
		presenceData,
		path: document.location.href.replace(`https://${document.location.hostname}`, ""),
	});

	if (!route) return presence.setActivity(presenceData);

	if (route.state) presenceData.state = route.state();
	if (route.details) presenceData.details = route.details();
	if (showButtons && route.buttons) presenceData.buttons = route.buttons();
	if (route.largeImageKey) presenceData.largeImageKey = route.largeImageKey();
	if (route.smallImageKey) presenceData.smallImageKey = route.smallImageKey();
	if (route.smallImageText)
		presenceData.smallImageText = route.smallImageText();

	if (showTimestamp && route.endTimestamp)
		presenceData.endTimestamp = route.endTimestamp();

	presence.setActivity(presenceData, route.playback ? route.playback() : false);
});
