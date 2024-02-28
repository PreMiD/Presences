const presence = new Presence({
	clientId: "1212508565802192936",
});


// Other default assets can be found at index.d.ts
const enum Assets {
	Logo = "https://libraryofbabel.info/img/hex802.png",
	smallImageKey = "",
}

const enum Pages {
	homepage = "/",
	about = "/about.html",
	search = "/search.html",
	sRes = "/search.cgi",
	book = "/book.cgi",
	browse = "/browse.cgi",
	bookmark = "/bookmark.cgi",
	anglishized = "/anglishize.cgi",
	theory = "/theory.html",
	images = "/slideshow.html",
	imgsearch = "/imagesearch.html",
	imgSRes = "/imagesearch.cgi",
	coloroscopy = "/coloroscopy.html",
	refhex = "/referencehex.html"
}

presence.on("UpdateData", async () => {
	const page = document.location.toString();
	if (!page) return;

	let base = window.location.pathname;
	if (base.includes("theory")) base = "/theory.html";

	const title = document.title.replace("Anglishized", "").replace("Theory - ", "").replace("Image Search: ", ""),
	presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		largeImageText: "hex802",
		name: "Library of Babel",
		type: ActivityType.Watching,
	},
	p = (document.querySelector("#page") as HTMLInputElement)?.value;

	switch (base) {
		case Pages.homepage:
				presenceData.details = "in the lobby (home)";
			break;
			
		case Pages.about:
				presenceData.details = "learning about the archives";
			break;

		case Pages.search:
				presenceData.details = "searching through the archives";
			break;

		case Pages.imgsearch:
				presenceData.details = "searching through the image archives";
			break;

		case Pages.imgSRes:
				presenceData.details = `viewing image ${title}`;
			break;

		case Pages.sRes: {
				const keyWord = title.replace("Search - ", "");
				presenceData.details = `searching the archives for ${keyWord}`;
			}
			break;
			
		case Pages.anglishized: {
			presenceData.details = `reading ${title.replace(` ${p}`, "")} (page ${p}, anglishized)`;
		}
		break;

		case Pages.book:
		case Pages.bookmark:
				presenceData.details = `reading ${title.replace(` ${p}`, "")} (page ${p})`;
			break;

		case Pages.browse: {
			// find the shelf and page (nah)
			presenceData.details = "browsing the archives";
		}
			break;


		case Pages.theory:
		case Pages.refhex:
				presenceData.details = `learning about ${title}`;
			break;

		case Pages.images:
				presenceData.details = "viewing images";
			break;

		case Pages.coloroscopy:
				presenceData.details = "undergoing coloroscopy";
			break;

		default:
				// console.log(base);
				presenceData.details = "navigating the site";
			break;
	}

	presence.setActivity(presenceData);
});
