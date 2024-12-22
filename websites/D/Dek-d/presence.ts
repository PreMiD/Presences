const presence = new Presence({
	clientId: "1314484095614451822",
}),
	browsingTimestamp = Math.floor(Date.now() / 1000);;

const enum Assets {
	Logo = "https://i.imgur.com/eq3Nmvz.png",
}

presence.on("UpdateData", async () => {
	const sections = {
		"quiz": ["horoscope", "habit", "character", "love", "entertainment", "joke", "education", "knowledge", "adventure", "music", "movie", "cartoon", "game", "novel", "sport", "pet", "other"],
		"tcas": ["dreamcareer", "reality", "onstage", "dreamcampus", "ontour", "review"],
		"activity": "",
		"studyabroad": ["exchange", "high_school", "bachelor", "master", "course", "work_travel", "foreign_culture", "global_review", "aec", "english_issue"],
		"nugirl": "",
		"teentrends": "",
		"pre-admission": "",
		"studyabroadfair": "",
		"wallet": "",
		"board": ["tcas", "entertainment", "knowledge", "teen", "nugirl", "education", "studyabroad", "writer", "problem",],
		"tag": "",
		"visualnovel": "",
		"loveroom": "",
		"featured": "",
		"store": "",
		"review": "",
		"collection": "",
	};
	const titleElement = document.querySelector('h1.title');
	const titleText = titleElement ? titleElement.textContent : '';
	const pathSegments = location.pathname.split("/");
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
		type: ActivityType.Watching,
		// initial details in case of no match displaying the 1st path segment
		details: `Browsing ${pathSegments[1]}`,
		buttons: [{ label: "Visit", url: document.URL }],
	};

	// board thread play function
	const displaySec = (categorys: any = ' ') => {
		let subsec = categorys
		presenceData.details = `Viewing${subsec}discussion thread`;
	}
	// main
	switch (location.hostname) {
		// handle subdomain ex novels.dek-d.com
		case "www.dek-d.com": {
			if (location.pathname === "/") {
				presenceData.details = "Viewing home page";
			}
			else if (Object.keys(sections).includes(pathSegments[1])) {
				switch (pathSegments[1]) {
					case "board": {
						displaySec(" ")
						if (sections.board.includes(pathSegments[2])) {
							displaySec(" " + pathSegments[2] + " ")
						}
						if (pathSegments[3] !== "") {
							presenceData.state = `${titleText}`
						}
						break;
					}
					case "tcas": {
						presenceData.details = `Viewing ${pathSegments[1]} thread`;
						if (!isNaN(Number(pathSegments[2]))) {
							presenceData.state = `${titleText}`
						}
						else if (sections.tcas.includes(pathSegments[2])) {
							presenceData.details = `Browsing ${pathSegments[2]} on ${pathSegments[1]} thread`
							presenceData.buttons = [
								{ label: "Visit", url: "https://example.com" },
							];
						}
						break;
					}
					case "quiz": {
						presenceData.details = `Choosing ${pathSegments[1]}`;
						//all quiz type
						if (sections.quiz.includes(pathSegments[3]) && pathSegments[2] === "all") {
							presenceData.details = `Choosing ${pathSegments[3]} ${pathSegments[1]}`;
						}
						//every type except all type
						else if (pathSegments[2] !== "") {
							presenceData.details = `Choosing ${pathSegments[2]}`;
							// history page
							if (pathSegments[2] === "history") {
								presenceData.details = `Watching quiz my ${pathSegments[2]}`;
							}
							// doning quiz
							else if (!isNaN(Number(pathSegments[3])) && pathSegments[3] !== "") {
								presenceData.details = `Doing ${pathSegments[2]}`;
								presenceData.state = `${titleText}`;
								const img = document.querySelectorAll('div.thumb-img .image')[0];
								if (img) {
									const computedStyle = window.getComputedStyle(img);
									const backgroundImage = computedStyle.getPropertyValue('background-image');
									const urlMatch = backgroundImage.match(/url\(["']?([^"']*)["']?\)/);
									const backgroundImageUrl = urlMatch ? urlMatch[1] : '';
									presenceData.largeImageKey = backgroundImageUrl;
								}
							}
							// browsing quiz status
							else if (sections.quiz.includes(pathSegments[3])) {
								presenceData.details = `Choosing ${pathSegments[3]} ${pathSegments[2]}`;
							}
						}
						break;
					}
					case "activity": {
						presenceData.details = `Browsing ${pathSegments[1]}`;
						if (pathSegments[2] !== "" && !isNaN(Number(pathSegments[2]))) {
							const img = document.querySelectorAll('a.link img')[0].getAttribute('src');
							presenceData.state = titleText;
							presenceData.largeImageKey = img;
							presenceData.smallImageKey = Assets.Logo;
						}
						else if (pathSegments[3] !== "" && !isNaN(Number(pathSegments[3]))) {
							const img = document.querySelector('img.sharethumb');
							const imgLink = img.getAttribute('src');
							const texts = document.querySelector('h2.header');
							const textContent = texts ? texts.textContent : "";
							presenceData.largeImageKey = imgLink;
							presenceData.smallImageKey = Assets.Logo;
							presenceData.details = `Reading ${pathSegments[1]}`;
							presenceData.state = `${textContent}`;
						}
						break;
					}
					case "studyabroad": {
						presenceData.details = `Browsing ${pathSegments[1]}`;
						if (pathSegments[2] !== "" && !isNaN(Number(pathSegments[2]))) {
							const img = document.querySelectorAll('.image img')[0].getAttribute('src');
							presenceData.state = titleText;
							presenceData.largeImageKey = img;
							presenceData.smallImageKey = Assets.Logo;
						}
						else if (sections.studyabroad.includes(pathSegments[2])) {
							presenceData.details = `Browsing ${pathSegments[2]} on ${pathSegments[1]}`;
						}
						break;
					}
					case "nugirl": {
						presenceData.details = `Browsing ${pathSegments[1]}`;
						if (pathSegments[2] !== "" && !isNaN(Number(pathSegments[2]))) {
							const img = document.querySelectorAll('.image img')[0].getAttribute('src');
							presenceData.state = titleText;
							presenceData.largeImageKey = img;
							presenceData.smallImageKey = Assets.Logo;
						}
						break;
					}
					case "teentrends": {
						presenceData.details = `Browsing ${pathSegments[1]}`;
						if (pathSegments[2] !== "" && !isNaN(Number(pathSegments[2]))) {
							const img = document.querySelectorAll('.image img')[0];
							if (img) {
								presenceData.largeImageKey = img.getAttribute('src');
							}
							else {
								//get iframe videoBg value idk how
							}
							presenceData.state = titleText;
							presenceData.smallImageKey = Assets.Logo;
						}


						break;
					}
					case "teentrend": {
						presenceData.details = `Browsing ${pathSegments[1]}`;
						break;
					}
					case "loveroom": {
						presenceData.details = `Browsing ${pathSegments[1]}`;

						break;
					}
					case "visualnovel": {
						if (pathSegments[2] !== "" && !isNaN(Number(pathSegments[2]))) {
							const img = document.querySelectorAll('.image img')[0].getAttribute('src');
							presenceData.state = titleText;
							presenceData.largeImageKey = img;
							presenceData.smallImageKey = Assets.Logo;
						}
						break;
					}
					case "pre-admission": {

						break;
					}
					case "studyabroadfair": {

						break;
					}
					case "wallet": {

						break;
					}
					case "tag": {

						break;
					}

					default: {
						break;
					}
				}
			}
			break;
		}
		case "novel.dek-d.com": {
			presenceData.details = "Choosing novel to read";
			if (Object.keys(sections).includes(pathSegments[1])) {
				presenceData.details = `Viewing novels ${pathSegments[1]}`;
			}
			switch (pathSegments[1]) {
				//  admin novel review
				case "article": {
					const headerTexts = document.getElementsByClassName('special-intro')[0];
					const headerT = headerTexts ? headerTexts.getElementsByTagName('h2')[0].textContent : "";
					presenceData.smallImageKey = Assets.Logo;
					presenceData.details = "Reading Admin Novels Review";
					presenceData.largeImageKey = document.querySelector('div.header-special picture img').getAttribute('src');
					console.log(headerT.split(" "));
					// assign the name of the novel to the state
					// incase there are white space in infront of the text but it worst for the Novel who have 2 or more words in the title
					for (let i = 0; i < headerT.split(" ").length; i++) {
						if (headerT.split(" ")[i] !== "") {
							presenceData.state = headerT.split(" ")[i];
							break;
						}
					}
					break;
				}
				// reader novel review
				case "novel": {
					const novelCoverElement = document.querySelector('div.novel-cover-img');
					if (novelCoverElement) {
						const computedStyle = window.getComputedStyle(novelCoverElement);
						const backgroundImage = computedStyle.getPropertyValue('background-image');
						const urlMatch = backgroundImage.match(/url\(["']?([^"']*)["']?\)/);
						const backgroundImageUrl = urlMatch ? urlMatch[1] : '';
						presenceData.largeImageKey = backgroundImageUrl;
					}
					const titleElement = document.querySelector('a.link').textContent;
					presenceData.state = titleElement;
					presenceData.smallImageKey = Assets.Logo;
					presenceData.details = "Reader Novels Review";
					break;
				}

			}
			break;
		}
		case "writer.dek-d.com": {
			presenceData.details = "Viewing Novel home page";
			const getUrl = document.URL;
			console.log(getUrl.split("/")[5].split(".")[0]);
			// console.log(document.URL.split("/")[5].split("."));
			if (pathSegments[2] == "writer" && getUrl.includes(document.URL.split("/")[5]) && document.URL.split("/")[5].split(".")[0] === "view" ) {
				const novelCoverElement = document.querySelector('div.novel-cover-img');
				if (novelCoverElement) {
					const computedStyle = window.getComputedStyle(novelCoverElement);
					const backgroundImage = computedStyle.getPropertyValue('background-image');
					const urlMatch = backgroundImage.match(/url\(["']?([^"']*)["']?\)/);
					const backgroundImageUrl = urlMatch ? urlMatch[1] : '';
					presenceData.largeImageKey = backgroundImageUrl;
					presenceData.smallImageKey = Assets.Logo;
					console.log("match1")
				}
			else if (pathSegments[2] == "writer" && getUrl.split("/")[5].split(".")[0] == "viewlongc") {	
				console.log("match")
			}
				const header = document.querySelector('p.novel-name').textContent;
				presenceData.state = header;
				
			}
			break;
		}
		// handle in case of no match subdomain
		default: {
			presenceData.details = "Browsing dek-d.com";
		}
	}
	presence.setActivity(presenceData);
});
