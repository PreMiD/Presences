/* eslint-disable unicorn/prefer-dom-node-text-content */
const presence = new Presence({
		//The client ID of the Application created at https://discordapp.com/developers/applications
		clientId: "1013489969379152022",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/gtBvHQH.png",
			startTimestamp: browsingTimestamp,
		},
		lesson = document.querySelector(
			"body > div.page-container.lesson > header > div > div > h1"
		) as HTMLElement | null,
		course = document.querySelector(
			"body > div.gradient.odin-dark-bg > div > div:nth-child(1) > a > h1"
		) as HTMLElement | null,
		courseTitle = document.querySelector(
			"body > div.page-container.lesson > header > div > div > a > h2"
		) as HTMLElement | null;

	switch (document.location.pathname) {
		case "/paths": {
			presenceData.state = "𝐕𝐢𝐞𝐰𝐢𝐧𝐠 𝐚𝐥𝐥 𝐏𝐚𝐭𝐡𝐬";
			break;
		}
		case "/paths/full-stack-javascript": {
			presenceData.state = "𝗩𝗶𝗲𝘄𝗶𝗻𝗴 𝘁𝗵𝗲 𝗙𝘂𝗹𝗹 𝗦𝘁𝗮𝗰𝗸 𝗝𝗮𝘃𝗮𝘀𝗰𝗰𝗿𝗶𝗽𝘁 𝗣𝗮𝘁𝗵";
			break;
		}
		case "/paths/full-stack-ruby-on-rails": {
			presenceData.state = "𝗩𝗶𝗲𝘄𝗶𝗻𝗴 𝘁𝗵𝗲 𝗙𝘂𝗹𝗹 𝗦𝘁𝗮𝗰𝗸 𝗥𝘂𝗯𝘆 𝗼𝗻 𝗥𝗮𝗶𝗹𝘀 𝗣𝗮𝘁𝗵";
			break;
		}
		case "/paths/foundations/courses/foundations": {
			presenceData.state = "𝗩𝗶𝗲𝘄𝗶𝗻𝗴 𝘁𝗵𝗲 𝗙𝗼𝘂𝗻𝗱𝗮𝘁𝗶𝗼𝗻𝘀 𝗣𝗮𝘁𝗵";
			break;
		}
		default:
			presenceData.state = "Viewing Dashboard";
	}

	if (
		document.location.pathname.includes("/paths/full-stack-javascript/courses/")
	) {
		(presenceData.details = "𝗙𝘂𝗹𝗹 𝗦𝘁𝗮𝗰𝗸 𝗝𝗮𝘃𝗮𝘀𝗰𝗿𝗶𝗽𝘁 - 𝗖𝗼𝘂𝗿𝘀𝗲𝘀"),
			(presenceData.state = `${course.innerText}`);
	} else if (
		document.location.pathname.includes(
			"/paths/full-stack-ruby-on-rails/courses/"
		)
	) {
		(presenceData.details = "𝗙𝘂𝗹𝗹 𝗦𝘁𝗮𝗰𝗸 𝗥𝘂𝗯𝘆 - 𝗖𝗼𝘂𝗿𝘀𝗲𝘀"),
			(presenceData.state = `${course.innerText}`);
	} else if (document.location.pathname.includes("/foundations-")) {
		(presenceData.state = `${lesson.innerText}`),
			(presenceData.details = "𝙁𝙤𝙪𝙣𝙙𝙖𝙩𝙞𝙤𝙣𝙨 - 𝙇𝙚𝙨𝙨𝙤𝙣");
	} else if (document.location.pathname.includes("/lessons/node-")) {
		(presenceData.details = courseTitle.innerText),
			(presenceData.state = lesson.innerText);
	} else if (document.location.pathname.includes("/lessons/ruby-")) {
		(presenceData.details = courseTitle.innerText),
			(presenceData.state = lesson.innerText);
	}

	presence.setActivity(presenceData);
});
