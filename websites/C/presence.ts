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

let video = { duration: 0, currentTime: 0, paused: true };

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
					let element = document.querySelector("[data-testid='profile-photo-invite-section-title']");
					let name = `Viewing ${element.textContent}'s Profile`;
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
					var title =document.title
					var index = title.lastIndexOf(" ")-1
					var result =  `Subject: ${title.substring(0, index)}`
					return(result)

				}
				
					,
					details: () =>
					{
						var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url:(()=>{
							var currentUrl = document.location.href;
						var parts = currentUrl.split("/").slice(0, 5);
						var result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.*\/home\/week\/.*$/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[4].split("-").join(" ");
						return replaced;

				}
					,
					details: () =>
					{
						var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[6].split("-").join(" ");
						var result = (`Viewing : ${replaced.toUpperCase() + " " + parts[7]}'s content`)
						return result;
					},
					buttons: () => [
						{ label: "View Course", url:(()=>{
							var currentUrl = document.location.href;
						var parts = currentUrl.split("/").slice(0, 5);
						var result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.*\/home\/(?!.*\bweek\b).*$/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[6].toUpperCase().split("-").join(" ");
						var result = `Viewing Course ${replaced}`
						return result;

				}
					,
					details: () =>
					{
						var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url:(()=>{
							var currentUrl = document.location.href;
						var parts = currentUrl.split("/").slice(0, 5);
						var result = parts.join("/");
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
					details: () =>
					{
						var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url:(()=>{
							var currentUrl = document.location.href;
						var parts = currentUrl.split("/").slice(0, 5);
						var result = parts.join("/");
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
					details: () =>
					{
						var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url:(()=>{
							var currentUrl = document.location.href;
						var parts = currentUrl.split("/").slice(0, 5);
						var result = parts.join("/");
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
					details: () =>
					{
						var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url:(()=>{
							var currentUrl = document.location.href;
						var parts = currentUrl.split("/").slice(0, 5);
						var result = parts.join("/");
						return result;
						})() },
						
					],
				
			},

			{
				path: /^\/learn\/.+\/lecture\/*/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					var title =document.title
					var index = title.lastIndexOf(" ") -1
					var result =  `Lecture: ${title.substring(0, index)}`
					return(result)

				}
					,
					details: () =>
					{
						var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url:(()=>{
							var currentUrl = document.location.href;
						var parts = currentUrl.split("/").slice(0, 5);
						var result = parts.join("/");
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
					details: () =>
					{
						var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url:(()=>{
							var currentUrl = document.location.href;
						var parts = currentUrl.split("/").slice(0, 5);
						var result = parts.join("/");
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
					details: () =>
					{
						var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url:(()=>{
							var currentUrl = document.location.href;
						var parts = currentUrl.split("/").slice(0, 5);
						var result = parts.join("/");
						return result;
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.+\/ungraded*\/*/,
				smallImageKey: () => Assets.Writing,
				smallImageText: () => "Learning",
				state: () =>{
					var title =document.title
					var index = title.lastIndexOf(" ") -1
					var result =  `Subject: ${title.substring(0, index)}`
					return(result)

				}
					,
					details: () =>
					{
						var currentUrl = document.location.href;
						var parts = currentUrl.split("/");
						var replaced = parts[4].split("-").join(" ");
						return replaced;
					},
					buttons: () => [
						{ label: "View Course", url:(()=>{
							var currentUrl = document.location.href;
						var parts = currentUrl.split("/").slice(0, 5);
						var result = parts.join("/");
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
				state: () =>
					{
					var element = document.querySelector("[data-e2e='hero-title']");
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
				state: () =>
					{
					var element = document.querySelector("[data-e2e='hero-title']");
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
					var url = document.location.href;
						var urlObj = new URL(url);
					var query = urlObj.searchParams.get("query");
					return("searching for \"" + query +"\"" ); 

				}
					,
				state: () =>{
					let element = document.querySelector("[data-e2e='NumberOfResultsSection']")
					let text = element.textContent.split(" ");
					return(`Found ${text[0]} results`);}
					,
				buttons: () => [{ label: "Results", url: location.href }],
			},
			{
				path: /^\/+.*$/,
				details: () =>
					{
						var currentUrl = document.location.href;
						// check if currentUrl contains "my-learning"
						if (currentUrl.indexOf("my-learning") !== -1) {
 						 // if yes, return "My courses"
 						 return "My Courses";
							} else {
 							 // if no, continue with the original code
 							 var parts = currentUrl.split("/");
 							 var replaced = parts[3].toUpperCase().split("-").join(" ");
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

	let presenceData: PresenceData = {
		largeImageKey: LoAssets.Logo,
	};

	if (showTimestamp) presenceData.startTimestamp = startTimestamp;

	const route = router({
		presenceData,
		path: location.href.replace(`https://${location.hostname}`, ""),
	});

	if (!route) return presence.setActivity(presenceData);

	if (route.run) presenceData = route.run();
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
