const presence = new Presence({
		clientId: "901821070263336971",
	}),
	pages: Record<string, string> = {
		"/": "Home",
		"/downloads": "Downloads",
		"/quickstart": "Quickstart",
		"/plugins": "Plugins",
		"/wiki": "Wiki",
		"/about": "About",
		"/imprint": "Imprint",
		"/privacy-policy": "Privacy Policy",
	},
	browsingTimestamp = Math.round(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/B/Blockbench/assets/logo.png",
	Generic = "https://cdn.discordapp.com/app-assets/901821070263336971/901847182079066143.png?size=512",
	BlockItem = "https://cdn.discordapp.com/app-assets/901821070263336971/901847182410416168.png?size=512",
	Bedrock = "https://cdn.discordapp.com/app-assets/901821070263336971/901847182301335584.png?size=512",
	Modded = "https://cdn.discordapp.com/app-assets/901821070263336971/901847182452326420.png?size=512",
	Optifine = "https://cdn.discordapp.com/app-assets/901821070263336971/901847182251020348.png?size=512",
	Skin = "https://cdn.discordapp.com/app-assets/901821070263336971/901847182242631681.png?size=512",
}

presence.on("UpdateData", async () => {
	const page = location.pathname,
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		pluginHeader = document.querySelector(
			"#content_wrapper > div > div > h2"
		)?.textContent;

	if (location.host.split(".")[0] === "web") {
		const modelType = document.querySelectorAll<HTMLDivElement>(
			"#page_wrapper #status_bar div[title]:not(.f_left)"
		)[1]?.title;

		switch (modelType?.toLowerCase()) {
			case "generic model":
				presenceData.smallImageKey = Assets.Generic;
				break;
			case "java block/item":
				presenceData.smallImageKey = Assets.BlockItem;
				break;
			case "bedrock model":
				presenceData.smallImageKey = Assets.Bedrock;
				break;
			case "modded entity":
				presenceData.smallImageKey = Assets.Modded;
				break;
			case "optifine entity":
				presenceData.smallImageKey = Assets.Optifine;
				break;
			case "minecraft skin":
				presenceData.smallImageKey = Assets.Skin;
				break;
			default:
				break;
		}

		presenceData.details = "Web App";
		switch (
			document
				.querySelector("#main_toolbar #mode_selector li.selected")
				?.textContent.toLowerCase() ||
			"Unknown"
		) {
			case "Unknown":
				presenceData.state = "Just started";
				break;
			case "edit":
				presenceData.state = `Editing a ${modelType}`;
				break;
			case "paint":
				presenceData.state = `Painting a ${modelType}`;
				break;
			case "animate":
				presenceData.state = `Animating a ${modelType}`;
				break;
			default:
				presenceData.state = "Unknown activity";
		}
	} else if (page.includes("/plugins") && pluginHeader) {
		presenceData.details = "Looking at a plugin:";
		presenceData.state = pluginHeader;
		presenceData.buttons = [{ label: "View Plugin", url: location.href }];
	} else if (page.includes("/wiki")) {
		presenceData.details = "Blockbench Wiki";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Reading";
		presenceData.state =
			document.querySelector(
				"#wiki_wrapper div.content > div.nuxt-content > h1"
			)?.textContent ||
			document.querySelector("#wiki_wrapper div.content > h1")?.textContent ||
			"Unknown Wiki Page";
		presenceData.buttons = [{ label: "Read Wiki", url: location.href }];
	} else if (pages[page])
		presenceData.details = `Looking at the ${pages[page]} page`;

	presence.setActivity(presenceData);
});
