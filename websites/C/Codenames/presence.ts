type availableColors = "red" | "blue" | "beige";

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/logo.png",
	Beige5 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859768344510484.png?size=512",
	Red6 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859768722128966.png?size=512",
	Blue1 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859769020710954.png?size=512",
	Red8 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859769657982977.png?size=512",
	Red4 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859769741213716.png?size=512",
	Beige3 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859769859047454.png?size=512",
	Blue4 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859769955254342.png?size=512",
	Codenames = "https://cdn.discordapp.com/app-assets/817859401477259315/817859770009780264.png?size=512",
	Blue8 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859770043596830.png?size=512",
	Blue5 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859770069155890.png?size=512",
	Blue9 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859770169163776.png?size=512",
	Beige2 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859770688995348.png?size=512",
	Blue7 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859770722811905.png?size=512",
	Blue6 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859770874069003.png?size=512",
	Blue2 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859771012743189.png?size=512",
	Blue3 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859771067138079.png?size=512",
	Red9 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859771155611709.png?size=512",
	Beige4 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859771180646430.png?size=512",
	Beige6 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859771310407742.png?size=512",
	Red5 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859771314602036.png?size=512",
	Red2 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859771335966810.png?size=512",
	Red7 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859771402158080.png?size=512",
	Red1 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859771411464212.png?size=512",
	Red3 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859771414741012.png?size=512",
	Beige1 = "https://cdn.discordapp.com/app-assets/817859401477259315/817859771569799168.png?size=512",
}

const presence = new Presence({
		clientId: "817859401477259315",
	}),
	slideshow = presence.createSlideshow(),
	icons = {
		red: [
			Assets.Red1,
			Assets.Red2,
			Assets.Red3,
			Assets.Red4,
			Assets.Red5,
			Assets.Red6,
			Assets.Red7,
			Assets.Red8,
			Assets.Red9,
		],
		blue: [
			Assets.Blue1,
			Assets.Blue2,
			Assets.Blue3,
			Assets.Blue4,
			Assets.Blue5,
			Assets.Blue6,
			Assets.Blue7,
			Assets.Blue8,
			Assets.Blue9,
		],
		beige: [
			Assets.Beige1,
			Assets.Beige2,
			Assets.Beige3,
			Assets.Beige4,
			Assets.Beige5,
			Assets.Beige6,
		],
	};

let browsingTimestamp = Math.floor(Date.now() / 1000),
	lastTeamLog: availableColors = "beige",
	currentlySetColor: availableColors = "beige";

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
	};

	const buttons = await presence.getSetting<boolean>("buttons");

	//* If in a game or not
	if (document.querySelector("#gamescene")) {
		if (buttons) {
			presenceData.buttons = [
				{
					label: "Join room",
					url: document.URL,
				},
			];
		}
		if (document.querySelector(".justify-start.items-center")) {
			presenceData.details = "Waiting for game";
			presenceData.state = "to start...";
			if (lastTeamLog !== "beige") {
				browsingTimestamp = Math.floor(Date.now() / 1000);
				lastTeamLog = "beige";
			}
			presenceData.startTimestamp = browsingTimestamp;
			if (slideshow.getSlides().length) {
				presence.info("Removing all cards from SlideShow.");
				slideshow.deleteAllSlides();
			}
		} else {
			const logDataLength =
				document.querySelector(".scrollTarget").children.length;
			if (logDataLength) {
				const team = document
					.querySelector(".scrollTarget")
					.children[logDataLength - 1].className.split("team-")[1]
					.split(" ")[0] as availableColors;
				if (team !== lastTeamLog) {
					browsingTimestamp = Math.floor(Date.now() / 1000);
					slideshow.deleteAllSlides();
					presence.info("Removing all cards from SlideShow.");
					lastTeamLog = team;
				}
			}
			presenceData.startTimestamp = browsingTimestamp;
			const allCards = Array.from(document.querySelectorAll("section")).filter(
					s => s.className?.includes("items-center")
				),
				availableCards = Array.from(document.querySelectorAll("section"))
					.filter(s => s.className?.includes("items-center"))
					.filter(i => {
						const style = i.parentElement.parentElement.style.transform;
						if (
							Array.from(document.querySelectorAll(".coverToken")).find(
								t =>
									(t as HTMLElement).style.transform.split("scale")[0] ===
									style.split("scale")[0]
							)
						)
							return false;
						else return true;
					}),
				foundCards = allCards.filter(x => !availableCards.includes(x)),
				currentClueData = Array.from(document.querySelectorAll("div")).filter(
					d => d.className?.includes("items-center text")
				), //Empty array if no clue, else [0] then its split into 2 divs 1 with clue other with amount
				color = Array.from(document.querySelectorAll("button"))
					.find(b => b.className?.includes("text-base color-"))
					.attributes.getNamedItem("color").textContent as availableColors;

			if (color !== currentlySetColor) {
				slideshow.deleteAllSlides();
				presence.info("Removing all cards from SlideShow.");
				currentlySetColor = color;
			}

			let randomInt = 0;
			for (const [index, card] of availableCards.entries()) {
				const name = card.textContent;
				if (!slideshow.hasSlide(name)) {
					presence.info(`Adding ${name} card to SlideShow.`);
					if (randomInt > icons[color].length) randomInt = 0;
					slideshow.addSlide(
						name,
						{
							smallImageKey: icons[color][randomInt],
							smallImageText: `Available cards: ${name} (${index + 1}/${
								availableCards.length
							})`,
						},
						5000
					);
					randomInt++;
				}
			}
			for (const card of foundCards) {
				const name = card.textContent;
				if (slideshow.hasSlide(name)) {
					presence.info(`Removing ${name} card from SlideShow.`);
					slideshow.deleteSlide(name);
				}
			}

			presenceData = { ...presenceData, ...slideshow.currentSlide };

			if (color === "beige") {
				//* Spectating
				if (currentClueData.length) {
					presenceData.details = "Spectating... Current clue:";
					presenceData.state = `${currentClueData[0].firstElementChild.textContent} (Matches ${currentClueData[0].children[1].textContent} cards)`;
				} else presenceData.details = "Spectating...";
			} else if (document.querySelector("input")) {
				//* is spymaster and has to put in a clue rn
				presenceData.details = "Giving a clue";
				presenceData.state = "to their operatives...";
			} else if (document.querySelector(".cursor-pointer")) {
				//* their turn to guess the clue
				presenceData.details = "Guessing clue:";
				presenceData.state = `${currentClueData[0].firstElementChild.textContent} (Matches ${currentClueData[0].children[1].textContent} cards)`;
			} else if (currentClueData.length) {
				//* waiting for clue to be guessed
				presenceData.details = "Waiting for operatives to guess clue:";
				presenceData.state = `${currentClueData[0].firstElementChild.textContent} (Matches ${currentClueData[0].children[1].textContent} cards)`;
			} else {
				//* waiting for clue to be given
				presenceData.details = "Waiting for spymaster(s)";
				presenceData.state = "to give clue...";
			}
		}
	} else {
		presenceData.startTimestamp = browsingTimestamp;
		if (slideshow.getSlides().length) {
			presence.info("Removing all cards from SlideShow.");
			slideshow.deleteAllSlides();
		}

		if (document.location.pathname.includes("/room/create")) {
			presenceData.details = "Creating a room...";
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Join room",
						url: document.URL,
					},
				];
			}
		} else if (document.location.pathname.includes("/room/")) {
			presenceData.details = "Joining a room...";
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Join room",
						url: document.URL,
					},
				];
			}
		} else presenceData.details = "Browsing...";
	}
	presence.setActivity(presenceData);
});
