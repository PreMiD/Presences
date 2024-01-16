const presence = new Presence({ clientId: "1196469492310618142" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Icon = "https://i.imgur.com/w5E2gIj.png",
	DesolationIcon = "https://i.imgur.com/TUZ9rwv.png",
	ConsumerCatalog = "https://i.imgur.com/FxjlP2Z.png",
}

presence.on("UpdateData", async () => {
	const currentPath = document.location.pathname.toLowerCase().split("/"),
		presenceData: PresenceData = {
			smallImageKey: Assets.Viewing,
			smallImageText: "Viewing...",
			startTimestamp: browsingTimestamp,
		};

	if (!currentPath[1]) {
		presenceData.details = "Emberspark Games";
		presenceData.largeImageKey = Assets.Icon;
		presenceData.state = "Viewing the home page";
	} else if (currentPath[1] === "desolation") {
		presenceData.details = "Portal 2: Desolation mod";
		presenceData.largeImageKey = Assets.DesolationIcon;
		if (!currentPath[2] || currentPath[2] === "about")
			presenceData.state = "Viewing the about page";
		else {
			switch (currentPath[2]) {
				case "news": {
					presenceData.state = "Viewing the changelog page";
					if (currentPath[3]) {
						presenceData.smallImageText = "Viewing a changelog post...";
						const newsHeadline = document
							.querySelector(".newsHeadline")
							.textContent.toLowerCase();
						if (newsHeadline)
							presenceData.state = `Viewing the changelog from ${newsHeadline}`;
					}

					break;
				}
				case "media": {
					presenceData.state = "Viewing the media page";

					break;
				}
				case "catalog": {
					presenceData.details = "Portal 2: Desolation mod - Catalog";
					presenceData.state = "In the test subject waiting area";
					presenceData.smallImageKey = Assets.ConsumerCatalog;
					presenceData.smallImageText = "Sitting in the waiting area...";

					if (
						document
							.querySelector("#catalogue-container")
							.classList.contains("scroll-in")
					) {
						if (
							!document.querySelector("#PreMiD-EmbersparkGames-presence-script")
						) {
							const script = document.createElement("script");
							script.id = "PreMiD-EmbersparkGames-presence-script";
							script.innerHTML = `
					const pageNumber = document.createElement("span");
					pageNumber.id = "pageNumber";
					pageNumber.style.display = "none";
					pageNumber.textContent = $("#catalogue").turn("page");
					document.body.appendChild(pageNumber);

					let currentPageNumber = pageNumber.textContent;

					setInterval(() => {
						const newPageNumber = $("#catalogue").turn("page");
						if (newPageNumber !== currentPageNumber) {
							pageNumber.textContent = newPageNumber;
							currentPageNumber = newPageNumber;
						}
					}, 1000);
					`;
							document.head.appendChild(script);
						}

						presenceData.smallImageKey = Assets.Reading;
						presenceData.smallImageText = "Reading the catalogue...";
						presenceData.state = `Reading the catalogue, currently on the ${getNumberSuffix(
							parseInt(document.querySelector("#pageNumber").textContent)
						)} page`;
					}

					break;
				}
				case "gallery": {
					presenceData.state = "Viewing the gallery page";

					const activeImage = document.querySelector(
						".splide__slide.is-active.is-visible"
					);
					if (
						getComputedStyle(document.querySelector("#fullScreenContainer"))
							.transform === "matrix(1, 0, 0, 1, 0, 0)" &&
						activeImage
					) {
						presenceData.details = "Portal 2: Desolation mod - Gallery";
						presenceData.smallImageText = "Viewing an image...";
						presenceData.state = `Viewing the ${getNumberSuffix(
							parseInt(
								activeImage.id
									.split("-")[2]
									.split("slide")[1]
									.replace(/^0+/, "")
							)
						)} image`;
					}

					break;
				}
				case "team": {
					presenceData.state = "Viewing the list of our team members";

					break;
				}
				case "faq": {
					presenceData.state = "Viewing the FAQ page";
					presenceData.smallImageText = "Viewing all the questions...";
					const activeQuestion = document.querySelector(".collapsible.active");
					if (activeQuestion) {
						presenceData.smallImageKey = Assets.Question;
						presenceData.smallImageText = "Reading a question...";
						presenceData.state = `Reading: "${
							activeQuestion.querySelector("h1").textContent
						}"`;
					}

					break;
				}
			}
		}
	}

	presence.setActivity(presenceData);
});

function getNumberSuffix(number: number): string {
	switch (number) {
		case 1: {
			return `${number}st`;
		}
		case 2: {
			return `${number}nd`;
		}
		case 3: {
			return `${number}rd`;
		}
		default: {
			return `${number}th`;
		}
	}
}
