const presence = new Presence({
	clientId: "967174885992456292"
});
const browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/H/Hyakanime/assets/logo.png"
}

const routes = {
	anime: "/anime/",
	user: "/user/",
	explore: "/explore",
	new: "/new",
	edit: "/edit/",
	settings: "/settings",
	team: "/team",
	premium: "/premium",
	legalNotice: "/mentions-legales",
	agenda: "/agenda"
};

const pageDetails = {
	[routes.anime]: "Regarde la fiche:",
	[routes.explore]: "Cherche une fiche...",
	[routes.new]: "Soumets une nouvelle fiche",
	[routes.edit]: "Édit une fiche",
	[routes.settings]: "Regarde ses paramètres",
	[routes.team]: "Regarde l'équipe de modération",
	[routes.premium]: "Considère l'achat du premium",
	[routes.legalNotice]: "Regarde les mentions légales",
	[routes.agenda]: "Regarde l'agenda de la semaine"
};

presence.on("UpdateData", async () => {
	const page = document.location.pathname;
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
		details: "Sur la page d'accueil"
	};

	for (const [route, detail] of Object.entries(pageDetails)) {
		if (page.startsWith(route)) {
			presenceData.details = detail;
			break;
		}
	}

	if (page.startsWith(routes.anime)) {
		const animeTitle = document.querySelector(".anime-title")?.textContent;
		presenceData.state = animeTitle?.split("Adulte")[0];
		presenceData.largeImageKey = document.querySelector(".anime-affiche")?.getAttribute('src') || Assets.Logo;
		presenceData.smallImageKey = Assets.Logo;
		presenceData.buttons = [{
			label: "Afficher la fiche",
			url: document.location.href
		}];
	}

	if (page.startsWith(routes.user)) {
		const username = document.querySelector(".user-banner__username")?.textContent;
		const userImage = document.querySelector(".user-banner__picture")?.getAttribute('src');

		presenceData.details = page.includes("/anime")
			? `Regarde la bibliothèque de :`
			: `Regarde le profil de :`;

		presenceData.state = username;
		presenceData.largeImageKey = userImage || Assets.Logo;
		presenceData.smallImageKey = Assets.Logo;
		presenceData.buttons = [{
			label: 'Afficher le profil',
			url: document.location.href
		}];
	}

	if (page.startsWith(routes.agenda)) {
		presenceData.buttons = [{
			label: "Afficher l'agenda",
			url: document.location.href
		}];
	}
	presence.setActivity(presenceData);
});