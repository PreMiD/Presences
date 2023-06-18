const presence = new Presence({ clientId: "1112901248421732462" });

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
	largeImageKey: "app_icon",
	startTimestamp: Math.floor(Date.now() / 1000)
	},
	pathDetailsMap = {
//	  "/": { details: "Viewing", state: "Startpage" },
	  "/terms-of-service": { details: "Reading:", state: "Terms of Service", largeImageKey: "", },
	  "/privacy-policy": { details: "Reading:", state: "Privacy Policy", largeImageKey: "", },
	  "/dmca-policy": { details: "Reading:", state: "DMCA Policy", largeImageKey: "", },
	  "/categories/games/fortnite": { details: "Viewing:", state: "Fortnite", largeImageKey: "https://files.kick.com/images/subcategories/3/banner/responsives/fortnite___banner_293_391.webp", },
    "/categories/games/call-of-duty-warzone-2.0": { details: "Viewing Category:", state: "Games | Call of Duty Warzone 2.0", largeImageKey: "https://files.kick.com/images/subcategories/4/banner/responsives/07291281-adfc-45fa-aa17-18770cfdfe97___banner_205_273.webp", },
    "/categories/games/valorant": { details: "Viewing Category:", state: "Games | VALORANT", largeImageKey: "https://files.kick.com/images/subcategories/64/banner/responsives/valorant___banner_293_391.webp", },
    "/categories/games/dota-2": { details: "Viewing Category:", state: "Games | Dota 2", largeImageKey: "https://files.kick.com/images/subcategories/14/banner/responsives/9720b78b-f76e-4d0f-9f0d-e60aa5bf424a___banner_294_392.webp", },
    "/categories/games/league-of-legends": { details: "Viewing Category:", state: "Games | League of Legends", largeImageKey: "https://files.kick.com/images/subcategories/5/banner/responsives/lol___banner_205_273.webp", },
    "/categories/games/gta-rp": { details: "Viewing Category:", state: "Games | GTA RP", largeImageKey: "https://files.kick.com/images/subcategories/355/banner/responsives/1db2c8bd-8008-466e-832d-cf6d3bfe6246___banner_245_327.webp", },
    "/categories/games/diablo-iv": { details: "Viewing Category:", state: "Games | Diablo IV", largeImageKey: "https://files.kick.com/images/subcategories/265/banner/responsives/02d640ab-c540-4d01-938a-9931876b6749___banner_205_273.webp" },
    "/categories/games/call-of-duty-modern-warfare-ii": { details: "Viewing Category:", state: "Games | Call of Duty Modern Warfare II", largeImageKey: "https://files.kick.com/images/subcategories/265/banner/responsives/02d640ab-c540-4d01-938a-9931876b6749___banner_205_273.webp" },
    "/categories/games/only-up!": { details: "Viewing Category:", state: "Games | Only Up!", largeImageKey: "https://files.kick.com/images/subcategories/3524/banner/responsives/19002d0c-9626-4d9d-9e54-7ea9f0bfe94d___banner_245_327.webp" },
    "/categories/games/minecraft": { details: "Viewing Category:", state: "Games | Minecraft", largeImageKey: "https://files.kick.com/images/subcategories/10/banner/responsives/0355aea1-85e2-4d57-a335-8d33c3ec8d69___banner_293_391.webp" },
    "/categories/games/counter-strike-global-offensive": { details: "Viewing Category:", state: "Games | CSGO", largeImageKey: "https://files.kick.com/images/subcategories/12/banner/responsives/csgo___banner_294_392.webp" },
    "/categories/games/overwatch-2": { details: "Viewing Category:", state: "Games | Overwatch 2", largeImageKey: "https://files.kick.com/images/subcategories/6/banner/responsives/58557526-80b5-4e0b-945a-4ca4449cd518___banner_294_392.webp" },
    "/categories/games/rocket-league": { details: "Viewing Category:", state: "Games | Rocket League", largeImageKey: "https://files.kick.com/images/subcategories/77/banner/responsives/a0d9cc7e-626d-4020-b1ca-2bc02308de2d___banner_205_273.webp" },
    "/categories/games/dead-by-daylight": { details: "Viewing Category:", state: "Games | Dead by Daylight", largeImageKey: "https://files.kick.com/images/subcategories/94/banner/responsives/f83a3d53-ccfa-496a-bb25-1c8a1485e99e___banner_245_327.webp" },
    "/categories/games/DayZ": { details: "Viewing Category:", state: "Games | DayZ", largeImageKey: "https://files.kick.com/images/subcategories/152/banner/responsives/ed759d5f-724b-4217-a4c3-abd0fbd6196c___banner_205_273.webp" },
    "/categories/games/world-of-warcraft": { details: "Viewing Category:", state: "Games | World of Warcraft", largeImageKey: "https://files.kick.com/images/subcategories/66/banner/responsives/wow___banner_205_273.webp" },
    "/categories/games/Escape-From-Tarkov": { details: "Viewing Category:", state: "Games | Escape From Tarkov", largeImageKey: "https://files.kick.com/images/subcategories/84/banner/responsives/599546ff-8e13-4f98-a384-2cf96714bce9___banner_294_392.webp" },
    "/categories/games/rust": { details: "Viewing Category:", state: "Games | Rust", largeImageKey: "https://files.kick.com/images/subcategories/13/banner/responsives/rust___banner_245_327.webp" },
    "/categories/games/Tom-Clancy's-Rainbow-Six-Siege": { details: "Viewing Category:", state: "Games | Tom Clancy's Rainbow Six Siege", largeImageKey: "https://files.kick.com/images/subcategories/79/banner/responsives/409e8511-7e09-44a7-8308-3f0bc117ae47___banner_294_392.webp" },
    "/categories/games/Roblox": { details: "Viewing Category:", state: "Games | Roblox", largeImageKey: "https://files.kick.com/images/subcategories/97/banner/responsives/335b8f97-a7f9-4e0f-bb73-f09a00f27550___banner_205_273.webp" },
    "/categories/games/fifa-23": { details: "Viewing Category:", state: "Games | Fifa 23", largeImageKey: "https://files.kick.com/images/subcategories/9/banner/responsives/fifa23___banner_245_327.webp" },
    "/categories/irl/just-chatting": { details: "Viewing Category:", state: "IRL | Just Chatting", largeImageKey: "https://files.kick.com/images/subcategories/15/banner/responsives/8f43401b-0d59-4802-8f70-cd5e259adc9b___banner_245_327.webp", },
    "/categories/irl/pools-hot-tubs-bikinis": { details: "Viewing Category:", state: "IRL | Pools & Hot Tubs", largeImageKey: "https://files.kick.com/images/subcategories/16/banner/responsives/803cea32-1ef3-4620-8731-f3cdcf8b6206___banner_245_327.webp" },
    "/categories/irl/asmr": { details: "Viewing Category:", state: "IRL | Asmr", largeImageKey: "https://files.kick.com/images/subcategories/17/banner/responsives/asmr___banner_294_392.webp" },
    "/categories/irl/travel-and-outdoors": { details: "Viewing Category:", state: "IRL | Travel and Outdoors", largeImageKey: "https://files.kick.com/images/subcategories/21/banner/responsives/5a921c76-1231-4902-a5ce-d73304f89960___banner_172_229.webp" },
    "/categories/irl/animals-aquariums-zoos": { details: "Viewing Category:", state: "IRL | Animals Aquariums Zoos", largeImageKey: "https://files.kick.com/images/subcategories/67/banner/responsives/animals-aquariums-zoos___banner_294_392.webp" },
    "/categories/irl/motorsports": { details: "Viewing Category:", state: "IRL | Motorsports", largeImageKey: "https://files.kick.com/images/subcategories/1155/banner/responsives/e09946a4-d4b3-4728-b688-56e5138d92f7___banner_238_316.webp" },
    "/categories/irl/news": { details: "Viewing Category:", state: "IRL | News", largeImageKey: "https://files.kick.com/images/subcategories/73/banner/responsives/news___banner_205_273.webp" },
    "/categories/irl/fishing": { details: "Viewing Category:", state: "IRL | Fishing", largeImageKey: "https://files.kick.com/images/subcategories/1556/banner/responsives/868a27e9-63da-484d-9680-3e50b3ea5ef6___banner_172_229.webp" },
    "/categories/irl/food-drink": { details: "Viewing Category:", state: "IRL | Food & Drink", largeImageKey: "https://files.kick.com/images/subcategories/23/banner/responsives/4c6d85ae-5984-4914-92af-225304749a86___banner_205_273.webp" },
    "/categories/irl/chess": { details: "Viewing Category:", state: "IRL | Chess", largeImageKey: "https://files.kick.com/images/subcategories/68/banner/responsives/chess___banner_351_468.webp" },
    "/categories/irl/botany": { details: "Viewing Category:", state: "IRL | Botany", largeImageKey: "https://files.kick.com/images/subcategories/1792/banner/responsives/233b234d-d51b-43f4-b499-0237416531a9___banner_351_468.webp" },
    "/categories/irl/3d-printing": { details: "Viewing Category:", state: "IRL | 3D Printing", largeImageKey: "https://files.kick.com/images/subcategories/1179/banner/responsives/3dc207eb-99df-4974-91cf-25c95e2db832___banner_351_468.webp" },
    "/categories/irl/science-technology": { details: "Viewing Category:", state: "IRL | Science & Technology", largeImageKey: "https://files.kick.com/images/subcategories/70/banner/responsives/20f2beae-a2bf-4ed8-8f31-64857d61db96___banner_294_392.webp" },
    "/categories/irl/podcasts": { details: "Viewing Category:", state: "IRL | Podcasts", largeImageKey: "https://files.kick.com/images/subcategories/20/banner/responsives/podcast___banner_245_327.webp" },
    "/categories/irl/reading": { details: "Viewing Category:", state: "IRL | Reading", largeImageKey: "https://files.kick.com/images/subcategories/616/banner/responsives/3221e941-d0a7-4f82-9c8a-3618aea1d532___banner_245_327.webp" },
    "/categories/irl/couponing": { details: "Viewing Category:", state: "IRL | Couponing ", largeImageKey: "https://files.kick.com/images/subcategories/1425/banner/responsives/461fce44-7d2c-4729-97bb-d8e677ff6f56___banner_351_468.webp" },
    "/categories/irl/storage-work": { details: "Viewing Category:", state: "IRL | Storage Work", largeImageKey: "https://files.kick.com/images/subcategories/2994/banner/responsives/69c45506-5089-4fbf-a971-de3e12a29adf___banner_172_229.webp" },
    "/categories/irl/fitness-and-health": { details: "Viewing Category:", state: "IRL | Fitness & Health", largeImageKey: "https://files.kick.com/images/subcategories/22/banner/responsives/30c84c80-6d6e-4935-b286-b8997539b27f___banner_205_273.webp" },
    "/categories/music/music": { details: "Viewing Category:", state: "Music | Music", largeImageKey: "https://files.kick.com/images/subcategories/246/banner/responsives/aed1856e-a4c2-4d66-9e6d-439db331d922___banner_245_327.webp" },
    "/categories/music/dj": { details: "Viewing Category:", state: "Music | DJ", largeImageKey: "https://files.kick.com/images/subcategories/26/banner/responsives/36dd7da4-0270-4488-81f2-6cdc3553463a___banner_294_392.webp" },
    "/categories/music/guitar": { details: "Viewing Category:", state: "Music | Guitar", largeImageKey: "https://files.kick.com/images/subcategories/27/banner/responsives/guitar___banner_294_392.webp" },
    "/categories/music/Acoustics": { details: "Viewing Category:", state: "Music | Acoustics", largeImageKey: "https://files.kick.com/images/subcategories/25/banner/responsives/acoustics___banner_351_468.webp" },
    "/categories/music/dance": { details: "Viewing Category:", state: "Music | Dance", largeImageKey: "https://files.kick.com/images/subcategories/532/banner/responsives/7098ad2f-e90b-4930-9151-a7e0fae0ac33___banner_245_327.webp" },
    "/categories/gambling/slots": { details: "Viewing Category:", state: "Gambling | Slots", largeImageKey: "https://files.kick.com/images/subcategories/28/banner/responsives/5d5a7c84-0791-4e4c-9e9e-2ff031c88f8f___banner_172_229.webp" },
    "/categories/gambling/poker": { details: "Viewing Category:", state: "Gambling | Poker", largeImageKey: "https://files.kick.com/images/subcategories/30/banner/responsives/poker___banner_351_468.webp" },
    "/categories/gambling/sports-betting": { details: "Viewing Category:", state: "Gambling | Sports Betting", largeImageKey: "https://files.kick.com/images/subcategories/509/banner/responsives/9993ad2f-7741-47cd-9367-b9435b44d1bb___banner_205_273.webp" },
    "/categories/gambling/sports-breaks": { details: "Viewing Category:", state: "Gambling | Sports Breaks", largeImageKey: "https://files.kick.com/images/subcategories/2095/banner/responsives/406bc667-0816-4853-aea6-25ab9602d638___banner_205_273.webp" },
    "/categories/gambling/table-games": { details: "Viewing Category:", state: "Gambling | Table Games", largeImageKey: "https://files.kick.com/images/subcategories/29/banner/responsives/053e6a44-7cda-4407-8ce5-99e002551d76___banner_294_392.webp" },
    "/categories/gambling/dice": { details: "Viewing Category:", state: "Gambling | Dice", largeImageKey: "https://files.kick.com/images/subcategories/31/banner/responsives/e3145dfc-2d74-474a-9e04-619bb8a72fd4___banner_501_668.webp" },
    "/categories/creative/makers-&-crafting": { details: "Viewing Category:", state: "Creative | Makers & Crafting", largeImageKey: "https://files.kick.com/images/subcategories/439/banner/responsives/6d94dc8b-a17e-499e-9864-c80290bc1ec9___banner_245_327.webp" },
    "/categories/creative/music-production": { details: "Viewing Category:", state: "Creative | Music Production", largeImageKey: "https://files.kick.com/images/subcategories/453/banner/responsives/fb0e51a1-0e68-4392-a65d-da4cefe2eea4___banner_205_273.webp" },
    "/categories/creative/software-development": { details: "Viewing Category:", state: "Creative | Software Development", largeImageKey: "https://files.kick.com/images/subcategories/34/banner/responsives/software-game-development___banner_293_391.webp" },
    "/categories/creative/digital-art": { details: "Viewing Category:", state: "Creative | Digital Art", largeImageKey: "https://files.kick.com/images/subcategories/1634/banner/responsives/8886c2d5-183e-405d-9fa1-66977c581144___banner_245_327.webp" },
    "/categories/creative/art": { details: "Viewing Category:", state: "Creative | Art", largeImageKey: "https://files.kick.com/images/subcategories/32/banner/responsives/a5ba9fcd-fb9e-41a2-a742-10c6ed81959c___banner_294_392.webp" },
    "/categories/creative/video-production": { details: "Viewing Category:", state: "Creative | Video Production", largeImageKey: "https://files.kick.com/images/subcategories/35/banner/responsives/video-production___banner_294_392.webp" },
    "/categories/creative/body-art": { details: "Viewing Category:", state: "Creative | Body Art", largeImageKey: "https://files.kick.com/images/subcategories/1058/banner/responsives/9742449f-bd7f-4a5b-a911-7a404b2b041b___banner_205_273.webp" },
    "/categories/creative/photography": { details: "Viewing Category:", state: "Creative | Photography", largeImageKey: "https://files.kick.com/images/subcategories/2098/banner/responsives/6264bcd1-eefe-4bb0-9c02-8a11d1336f5b___banner_245_327.webp" },
    "/categories/creative/custom-keyboards": { details: "Viewing Category:", state: "Creative | Custom Keyboards", largeImageKey: "https://files.kick.com/images/subcategories/454/banner/responsives/9340020f-03a2-4d1e-a21f-5562baf8dbca___banner_294_392.webp" },
    "/categories/creative/graphic-design": { details: "Viewing Category:", state: "Creative | Graphic Design", largeImageKey: "https://files.kick.com/images/subcategories/33/banner/responsives/graphic-design___banner_294_392.webp" },
    "/categories/creative/3d-animation": { details: "Viewing Category:", state: "Creative | 3D Animation", largeImageKey: "https://files.kick.com/images/subcategories/3279/banner/responsives/1e56186f-38e6-473b-8c76-c114027dc5ca___banner_245_327.webp" },
    "/categories/alternative/just-sleeping": { details: "Viewing Category:", state: "Alternative | Just Sleeping", largeImageKey: "https://files.kick.com/images/subcategories/544/banner/responsives/c59cbd7d-89a0-4ed2-9d94-7434f0c48241___banner_245_327.webp" },
    "/categories/alternative/sports": { details: "Viewing Category:", state: "Alternative | Sports", largeImageKey: "https://files.kick.com/images/subcategories/75/banner/responsives/sports___banner_205_273.webp" },
    "/categories/alternative/crypto-and-trading": { details: "Viewing Category:", state: "Alternative | Crypto & Trading", largeImageKey: "https://files.kick.com/images/subcategories/320/banner/responsives/baf793ae-8585-454d-aca2-5114434763fa___banner_172_229.webp" },
    "/categories/alternative/kick-tv-channels": { details: "Viewing Category:", state: "Alternative | Kick TV Channels", largeImageKey: "https://files.kick.com/images/subcategories/1682/banner/responsives/8d4c1ac3-39df-4b6c-a027-f7309bd2a824___banner_294_392.webp" },
    "/categories/alternative/documentation": { details: "Viewing Category:", state: "Alternative | Documentation", largeImageKey: "https://files.kick.com/images/subcategories/3213/banner/responsives/0a48082a-2332-4092-8548-8b6833f035b7___banner_294_392.webp" },
    "/categories/alternative/mass-effect-datapad": { details: "Viewing Category:", state: "Alternative | Mass Effect Datapad", largeImageKey: "https://files.kick.com/images/subcategories/1516/banner/responsives/7555eff6-9123-498f-9501-36d0b98b49e1___banner_245_327.webp" },
    "/categories/alternative/virtual": { details: "Viewing Category:", state: "Alternative | Virtual", largeImageKey: "https://files.kick.com/images/subcategories/263/banner/responsives/14fdca71-07fc-44e2-84b5-ce7764d46b69___banner_205_273.webp" },
    "/categories/alternative/stocks": { details: "Viewing Category:", state: "Alternative | Stocks", largeImageKey: "https://files.kick.com/images/subcategories/1059/banner/responsives/97be21a7-42fc-4a6d-bf25-a4a222853f78___banner_351_468.webp" },
    "/categories/alternative/politics": { details: "Viewing Category:", state: "Alternative | Politics", largeImageKey: "https://files.kick.com/images/subcategories/308/banner/responsives/afea08ee-721c-4515-b076-492345822017___banner_293_391.webp" },
    "/categories/games": { details: "Viewing Category:", state: "Games", largeImageKey: "https://dbxmjjzl5pc1g.cloudfront.net/8f452ba1-93c8-46b9-9d49-b9ccffd85612/images/categories/games.gif" },
    "/categories/irl": { details: "Viewing Category:", state: "IRL", largeImageKey: "https://dbxmjjzl5pc1g.cloudfront.net/8f452ba1-93c8-46b9-9d49-b9ccffd85612/images/categories/irl.gif" },
    "/categories/music": { details: "Viewing Category:", state: "Music", largeImageKey: "https://dbxmjjzl5pc1g.cloudfront.net/8f452ba1-93c8-46b9-9d49-b9ccffd85612/images/categories/music.gif" },
    "/categories/gambling": { details: "Viewing Category:", state: "Gambling", largeImageKey: "https://dbxmjjzl5pc1g.cloudfront.net/8f452ba1-93c8-46b9-9d49-b9ccffd85612/images/categories/gambling.gif" },
    "/categories/creative": { details: "Viewing Category:", state: "Creative", largeImageKey: "https://dbxmjjzl5pc1g.cloudfront.net/8f452ba1-93c8-46b9-9d49-b9ccffd85612/images/categories/creative.gif" },
    "/categories/alternative": { details: "Viewing Category:", state: "Alternative", largeImageKey: "https://dbxmjjzl5pc1g.cloudfront.net/8f452ba1-93c8-46b9-9d49-b9ccffd85612/images/categories/alternative.gif" },
    "/categories": { details: "Viewing Categories", state: "", largeImageKey: "" },
	},
	{ pathname } = document.location,
	pathDetails = Object.entries(pathDetailsMap).find(([pathPrefix]) => pathname.startsWith(pathPrefix));

	if (pathDetails) {
	  presenceData.details = pathDetails[1].details;
	  presenceData.state = pathDetails[1].state;
    //slideshow.deleteAllSlides();
    if (pathDetails[1].largeImageKey) {
      presenceData.largeImageKey = pathDetails[1].largeImageKey;
    }
	} else { // could check the pathname (There shouldn't be anything after the username)
	  const username = document.location.pathname.split("/").pop();
	  if (username) {
	    // could get the streamer profile image to display.
		presenceData.details = "Watching";
		presenceData.state = username;
		presenceData.buttons = [
		  { label: "Watch Stream", url: `https://kick.com/${username}` }
		];
	  } else {
		presenceData.details = "Viewing Kick.com";
		//presenceData.state = "Kick";
	  }
	} 
  presence.setActivity(presenceData);
 });