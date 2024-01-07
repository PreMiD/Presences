const presence = new Presence({
	clientId: "1193651901221306378",
});

const enum Assets {
	icon = "icon",
}

presence.on("UpdateData", async () => {
	const currentPath = document.location.pathname,
		presenceData: PresenceData = {
			details: "Twoja wiedza jest tu",
			largeImageKey: Assets.icon,
			startTimestamp: new Date(),
			buttons: [
				{ label: "Odwiedź stronę", url: "https://notespace.edu.pl/" },
				{
					label: "Odwiedź bieżącą stronę",
					url: `https://notespace.edu.pl${document.location.pathname}`,
				},
			],
		};

	if (currentPath.endsWith("/") || currentPath.includes("strona-glowna"))
		presenceData.details = "Przegląda stronę główną";
	else if (currentPath.includes("kursy")) {
		presenceData.details = "Przegląda kursy";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.state = document.querySelector("h1").textContent;
	} else if (currentPath.includes("kurs")) {
		presenceData.details = "Przegląda kurs";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Reading...";
		presenceData.state = document.querySelector("h1").textContent;
	} else if (currentPath.includes("ankieta"))
		presenceData.details = "Przegląda strone ankiety";
	else if (currentPath.includes("o-nas"))
		presenceData.details = "Przegląda strone o nas";
	else if (currentPath.includes("kontakt"))
		presenceData.details = "Przegląda strone kontaktów";
	else if (currentPath.includes("dokumenty"))
		presenceData.details = "Przegląda stronę dokumentów";
	else if (currentPath.includes("polityka-prywatnosci"))
		presenceData.details = "Przegląda dokument polityki o prywatności";
	else if (currentPath.includes("polityka-cookies"))
		presenceData.details = "Przegląda dokument polityki o cookies";

	presence.setActivity(presenceData);
});
