const presence = new Presence({
		clientId: "1029595348844429382",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/zn1sM5L.png",
			startTimestamp: browsingTimestamp,
		},
		mainPath = window.location.pathname.split("/")[1] ?? "";

	switch (mainPath) {
		case "register":
		case "login": {
			presenceData.details = "Logging in";
			break;
		}
		case "create-zip-archive": {
			presenceData.details = "Creating zip archives";
			break;
		}
		case "extract-zip-archive": {
			presenceData.details = "Extracting zip archives";
			break;
		}
		case "merge-pdf": {
			presenceData.details = "Merging files into a PDF";
			break;
		}
		case "apis": {
			presenceData.details = "Viewing an API's about page";
			presenceData.state = document.querySelector("h1").textContent;
			break;
		}
		case "api": {
			presenceData.details = "Browsing the API documentation";
			presenceData.state = document.querySelector<HTMLHeadingElement>(
				".content-header-title"
			).textContent;
			break;
		}
		case "dashboard": {
			presenceData.details = "Viewing dashboard";
			presenceData.state =
				document.querySelector<HTMLLIElement>(".active").textContent;
			break;
		}
		case "settings": {
			presenceData.details = "Managing account settings";
			break;
		}
		default: {
			if (
				mainPath === "" ||
				mainPath.endsWith("-converter") ||
				/-to-/.test(mainPath)
			) {
				presenceData.details = "Converting files";
				presenceData.state = [
					...document.querySelectorAll<HTMLButtonElement>("h2 button"),
				]
					.map(button => button.textContent)
					.join(" to ");
			} else if (
				mainPath === "save-website-pdf" ||
				/^website-[a-z]+-screenshot$/.test(mainPath)
			) {
				presenceData.details = "Creating website screenshots";
				presenceData.state = document.querySelector<HTMLInputElement>(
					"[aria-describedby='button-add-url']"
				).value;
			} else {
				presenceData.details = "Browsing";
				presenceData.state = document.title.match(
					/^(.*?)( \| CloudConvert)?$/
				)[1];
			}
		}
	}

	presence.setActivity(presenceData);
});
