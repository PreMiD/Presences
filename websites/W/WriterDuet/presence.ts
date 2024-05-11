const presence = new Presence({
		clientId: "1234183805380857907",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/W/WriterDuet/assets/logo.png",
}

const enum Pages {
	home = "",
	script = "script",
	blog = "blog",
	help = "category",
	pricing = "pricing",
	article = "article",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		[, page, subpage] = document.location.pathname.split("/");

	switch (page.split("#")[0]) {
		case Pages.script:
			{
				presenceData.details = document.title;
				presenceData.state = document
					.querySelector(".Mui-selected")
					.querySelector("[data-tip]").textContent;
				presence.setActivity(presenceData);
			}
			break;

		case Pages.home:
			{
				presenceData.details = "Browsing Home";
			}
			break;

		case Pages.help:
		case Pages.article:
			{
				(presenceData.details = "Browsing Help"),
					(presenceData.state =
						document.querySelector("#categoryHead > h1")?.textContent ||
						document.querySelector(".title").textContent);
			}
			break;

		case Pages.pricing:
			presenceData.details = "Reviewing Payement Plans";
			break;

		case Pages.blog:
			{
				if (subpage) {
					presenceData.details = "Reading Blog Article";
					presenceData.state = document.querySelector(
						".jupiterx-post-title"
					).textContent;
				} else presenceData.details = "Reading the Blog";
			}
			break;

		default:
			presenceData.details = "Browsing the Site";
	}

	presence.setActivity(presenceData);
});
