type availableColors = "red" | "blue" | "beige";

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/logo.png",
	Beige5 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/0.png",
	Red6 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/1.png",
	Blue1 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/2.png",
	Red8 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/3.png",
	Red4 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/4.png",
	Beige3 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/5.png",
	Blue4 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/6.png",
	Codenames = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/7.png",
	Blue8 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/8.png",
	Blue5 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/9.png",
	Blue9 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/10.png",
	Beige2 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/11.png",
	Blue7 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/12.png",
	Blue6 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/13.png",
	Blue2 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/14.png",
	Blue3 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/15.png",
	Red9 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/16.png",
	Beige4 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/17.png",
	Beige6 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/18.png",
	Red5 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/19.png",
	Red2 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/20.png",
	Red7 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/21.png",
	Red1 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/22.png",
	Red3 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/23.png",
	Beige1 = "https://cdn.rcd.gg/PreMiD/websites/C/Codenames/assets/24.png",
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
