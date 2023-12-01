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
						return(`Viewing ${(document.querySelector("[data-testid='profile-photo-invite-section-title']")).textContent}'s Profile`); 

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
					return(`Subject: ${document.title.substring(0, ((document.title).lastIndexOf(" ") - 1))}`);

				}
				
					,
					details: () =>{
						return ((document.location.href).split("/"))[4].split("-").join(" ");
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
						return ((document.location.href).split("/").slice(0, 5)).join("/");
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.*\/home\/week\/.*$/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					return ((document.location.href).split("/"))[4].split("-").join(" ");

				}
					,
					details: () =>{
						return (`Viewing : ${(((document.location.href).split("/"))[6].split("-").join(" ")).toUpperCase() + " " + ((document.location.href).split("/"))[7]}'s content`);
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							return ((document.location.href).split("/").slice(0, 5)).join("/");
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.*\/home\/(?!.*\bweek\b).*$/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
						return `Viewing Course ${(((document.location.href).split("/"))[6].split("-").join(" "))}`;

				}
					,
					details: () =>{
						return ((document.location.href).split("/"))[4].split("-").join(" ");
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							return ((document.location.href).split("/").slice(0, 5)).join("/");
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
						return ((document.location.href).split("/"))[4].split("-").join(" ");
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							return ((document.location.href).split("/").slice(0, 5)).join("/");
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
						return ((document.location.href).split("/"))[4].split("-").join(" ");
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							return ((document.location.href).split("/").slice(0, 5)).join("/");
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
						return ((document.location.href).split("/"))[4].split("-").join(" ");
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							return ((document.location.href).split("/").slice(0, 5)).join("/");
						})() },
						
					],
				
			},

			{
				path: /^\/learn\/.+\/lecture\/*/,
				smallImageKey: () => Assets.Reading,
				smallImageText: () => "Learning",
				state: () =>{
					return(`Lecture: ${(document.title).substring(0, ((document.title).lastIndexOf(" ") - 1))}`);

				}
					,
					details: () =>{
						return ((document.location.href).split("/"))[4].split("-").join(" ");
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							return ((document.location.href).split("/").slice(0, 5)).join("/");
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.+\/quiz\/*/,
				smallImageKey: () => Assets.Writing,
				smallImageText: () => "Learning",
				state: () =>{
					return("Taking a Quiz");

				}
					,
					details: () =>{
						return ((document.location.href).split("/"))[4].split("-").join(" ");
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							return ((document.location.href).split("/").slice(0, 5)).join("/");
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.+\/exam\/*/,
				smallImageKey: () => Assets.Writing,
				smallImageText: () => "Learning",
				state: () =>{
					return("Solving an Exam");

				}
					,
					details: () =>{
						return ((document.location.href).split("/"))[4].split("-").join(" ");
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							return ((document.location.href).split("/").slice(0, 5)).join("/");
						})() },
						
					],
				
			},
			{
				path: /^\/learn\/.+\/ungraded*\/*/,
				smallImageKey: () => Assets.Writing,
				smallImageText: () => "Learning",
				state: () =>{
					return(`Subject: ${(document.title).substring(0, ((document.title).lastIndexOf(" ") - 1))}`);

				}
					,
					details: () =>{
						return ((document.location.href).split("/"))[4].split("-").join(" ");
					},
					buttons: () => [
						{ label: "View Course", url: (()=>{
							return ((document.location.href).split("/").slice(0, 5)).join("/");
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
							return((document.querySelector("[data-e2e='hero-title']")).textContent); 
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
							return((document.querySelector("[data-e2e='hero-title']")).textContent);
					},
					buttons: () => [
						{ label: "Course Link", url: location.href },]
				
			},
			{
				path: /^\/search*/,
				smallImageKey: () => Assets.Search,
				smallImageText: () => "Searching",
				details: () =>{
					return("searching for \"" + (new URL(document.location.href)).searchParams.get("query") + "\"" ); 
				},
					
				state: () =>{
					return(`Found ${((document.querySelector("[data-e2e='NumberOfResultsSection']")).textContent.split(" "))[0]} results`);
				},
				buttons: () => [{ label: "Results", url: location.href }],
			},
			{
				path: /^\/+.*$/,
				details: () =>{
						const currentUrl = document.location.href;
						if (currentUrl.indexOf("my-learning") !== - 1) {
 						 return "My Courses";
							} else {
 						 return (currentUrl.split("/"))[3].split("-").join(" ");
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
