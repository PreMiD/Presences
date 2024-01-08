const presence = new Presence({
	clientId: "1193651901221306378",
});

const enum Assets {
	Icon = "https://i.imgur.com/W7Ybot8.png",
}

presence.on("UpdateData", async () => {
	const currentPath = document.location.pathname,
		presenceData: PresenceData = {
			details: "Twoja wiedza jest tu",
			largeImageKey: Assets.Icon,
			smallImageKey: Assets.Viewing,
			smallImageText: "Przegląda...",
			startTimestamp: new Date(),
			buttons: [
				{
					label: "Odwiedź stronę o nas",
					url: "https://notespace.edu.pl/o-nas",
				},
			],
		};

	if (currentPath.endsWith("/") || currentPath.includes("strona-glowna"))
		presenceData.details = "Przegląda stronę główną";
	else if (currentPath.includes("kursy")) {
		presenceData.details = "Przegląda kursy";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Czyta...";
		presenceData.state = document.querySelector("h1").textContent;
	} else if (currentPath.includes("kurs")) {
		presenceData.details = "Przegląda kurs";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Czyta...";
		presenceData.state = document.querySelector("h1").textContent;
	} else if (currentPath.includes("ankieta")) {
		presenceData.details = "Przegląda strone ankiety";
		presenceData.state = "Wypełnia ankietę";
		presenceData.smallImageKey = Assets.Writing;
		presenceData.smallImageText = "Pisze...";
		presenceData.buttons = [
			{ label: "Odwiedź stronę o nas", url: "https://notespace.edu.pl/o-nas" },
			{ label: "Wypełnij ankietę", url: "https://notespace.edu.pl/ankieta" },
		];
	} else if (currentPath.includes("o-nas"))
		presenceData.details = "Przegląda strone o nas";
	else if (currentPath.includes("kontakt")) {
		presenceData.details = "Przegląda strone kontaktów";
		presenceData.smallImageKey = Assets.Call;
		presenceData.smallImageText = "Kontaktuje się z nami...";
		presenceData.buttons = [
			{ label: "Odwiedź stronę o nas", url: "https://notespace.edu.pl/o-nas" },
			{
				label: "Skontaktuj się z nami",
				url: "https://notespace.edu.pl/kontakt",
			},
		];
	} else if (currentPath.includes("dokumenty"))
		presenceData.details = "Przegląda stronę dokumentów";
	else if (currentPath.includes("polityka-prywatnosci")) {
		presenceData.details = "Przegląda dokument";
		presenceData.state = "Polityka prywatności";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Czyta...";
		presenceData.buttons = [
			{ label: "Odwiedź stronę o nas", url: "https://notespace.edu.pl/o-nas" },
			{
				label: "Dowiedz sie o naszej polityce",
				url: "https://notespace.edu.pl/polityka-prywatnosci",
			},
		];
	} else if (currentPath.includes("polityka-cookies")) {
		presenceData.details = "Przegląda dokument";
		presenceData.state = "Polityka cookies";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Czyta...";
		presenceData.buttons = [
			{ label: "Odwiedź stronę o nas", url: "https://notespace.edu.pl/o-nas" },
			{
				label: "Dowiedz sie o naszej polityce",
				url: "https://notespace.edu.pl/polityka-cookies",
			},
		];
	}

	presence.setActivity(presenceData);
});
