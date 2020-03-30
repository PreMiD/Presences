var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}

			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}

			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};

const presence = new Presence({
	clientId: "651445584955310100",
});

presence.on("UpdateData", () =>
	__awaiter(this, void 0, void 0, function* () {
		const page = document.location.pathname,
			article = document.querySelector(
				"#js-post-container > div > div.grid-layout-main.xs-mb2.lg-mb0 > header > h1"
			),
			sections = document.querySelector(
				"#news-content > div.content-column.xs-mt2.lg-mt0.md-mb4 > h1 > span"
			),
			writer = document.querySelector(
				"#js-post-container > div > div.grid-layout-main.xs-mb2.lg-mb0 > header > div.news-article-header__byline-wrapper-desktop > a > span > span.news-byline-full__name.xs-block.link-initial--text-black"
			);

		let data = {
			largeImageKey: "bfnews-logo",
			startTimestamp: Math.floor(Date.now() / 1000),
		};

		if (page.includes("/section")) {
			data.details = "Viewing To Section:";
			data.state = sections.textContent;
		} else if (page.includes("/article")) {
			data.details = "Reads a Article:";
			data.state = article.textContent;
		} else if (page.includes("/author")) {
			data.details = "Viewing User Profile:";
			data.state = user.textContent;
		} else {
			data.details = "Viewing Page:";
			data.state = "Homepage";
		}

		if (data.details && data.state && data.details != "" && data.state != "")
			presence.setActivity(data);
	})
);
