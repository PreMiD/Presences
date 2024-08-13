const presence = new Presence({
		clientId: "1272521587912081428",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/HccQ60t.png"
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Browsing...",
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, hostname } = document.location,
		buttons = await presence.getSetting<boolean>("buttons");
	switch (true) {
		case hostname === "komikindo.tv":
			presenceData.details = "Viewing Homepage";
			break;
		case pathname.endsWith("/daftar-komik/"):
			presenceData.details = "Viewing Popular Comics List";
			break;
		case pathname.endsWith("/komik-terbaru/"):
			presenceData.details = "Viewing Latest Comics List";
			break;
		case pathname.endsWith("/komik-berwarna/"):
			presenceData.details = "Viewing Colored Comics List";
			break;
		case pathname.endsWith("/daftar-manga"):
			presenceData.details = "Viewing Manga List";
			break;
		case pathname.endsWith("/manga/"):
			presenceData.details = "Viewing Manga";
			break;
		case pathname.endsWith("/manhwa/"):
			presenceData.details = "Viewing Manhwa";
			break;
		case pathname.endsWith("/manhua/"):
			presenceData.details = "Viewing Manhua";
			break;
		case pathname.endsWith("/akun/"):
			presenceData.details = "Viewing Account";
			break;
		case pathname.endsWith("/iklan/"):
			presenceData.details = "Contact Komikindo";
			break;
		case pathname.endsWith("/konten/ecchi/"):
			presenceData.details = "Viewing Ecchi Content";
			break;
		case href.includes("?s="): {
			const searchElement = document
				.querySelector("div.widget-title h1")
				.textContent.replace("Komik Hasil Pencarian ", "")
				.replace(/\t|\n/g, "");
			presenceData.state = `Searching: ${searchElement}`;
			presenceData.smallImageKey = Assets.Search;
			presenceData.details = "Searching for Comics";
			break;
		}
		case pathname.startsWith("/komik/"): {
			const titleElement = document
				.querySelector("h1.entry-title")
				.textContent.replace("Komik", "")
				.replace(/\t|\n/g, "");
			presenceData.details = `Viewing: ${titleElement}`;

			const infoElements = document.querySelectorAll(
				"div.infox > div.spe > span > b"
			);
			let author = "Unknown",
				comicType = "Unknown";

			for (const element of infoElements) {
				if (element.textContent.includes("Pengarang:"))
					author = element.nextSibling.textContent.trim();

				if (element.textContent.includes("Jenis Komik:"))
					comicType = element.nextElementSibling.textContent.trim();
			}

			presenceData.state = `Author: ${author} | Type: ${comicType}`;
			presenceData.smallImageText = titleElement;
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Comic",
						url: href,
					},
				];
			}
			break;
		}
		case href.includes("chapter-"): {
			const titleElement = document
				.querySelector("div.dtlx > h1.entry-title")
				.textContent.replace("Komik", "")
				.replace(/\t|\n/g, "");

			presenceData.details = titleElement;
			presenceData.state = "Reading Chapter";
			presenceData.smallImageText = titleElement;

			if (buttons) {
				presenceData.buttons = [
					{
						label: "Read Chapter",
						url: href,
					},
					{
						label: "View Comic",
						url: document
							.querySelectorAll("div.nextprev > a")[1]
							.getAttribute("href"),
					},
				];
			}
			break;
		}
		default:
			presenceData.details = "Browsing...";
			break;
	}

	presence.setActivity(presenceData);
});
