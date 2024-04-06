const presence = new Presence({
		clientId: "1193651901221306378",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Icon = "https://cdn.rcd.gg/PreMiD/websites/N/notespace/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const currentPath = document.location.href.replace(
			"https://notespace.edu.pl",
			""
		),
		presenceData: PresenceData = {
			details: "Nauka nigdy nie była prostsza.",
			largeImageKey: Assets.Icon,
			smallImageKey: Assets.Viewing,
			smallImageText: "Przegląda...",
			startTimestamp: browsingTimestamp,
			buttons: [
				{
					label: "Odwiedź stronę o nas",
					url: "https://notespace.edu.pl/o-nas",
				},
			],
		};

	if (document.title.includes("404")) {
		presenceData.details = "404: Nie znaleziono strony";
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.smallImageText = "Coś poszło nie tak...";
		return presence.setActivity(presenceData);
	}

	if (currentPath.endsWith("/") && currentPath.includes("strona-glowna"))
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
			{ label: "Wypełnij ankietę", url: "https://notespace.edu.pl/ankieta" },
		];
	} else if (currentPath.includes("centrum-pomocy"))
		presenceData.details = "Przegląda centrum pomocy";
	else if (currentPath.includes("o-nas"))
		presenceData.details = "Przegląda strone o nas";
	else if (currentPath.includes("kontakt")) {
		presenceData.details = "Przegląda strone kontaktów";
		presenceData.smallImageKey = Assets.Call;
		presenceData.smallImageText = "Kontaktuje się z nami...";
		presenceData.buttons = [
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
			{
				label: "Dowiedz sie o naszej polityce o prywatności",
				url: "https://notespace.edu.pl/polityka-prywatnosci",
			},
		];
	} else if (currentPath.includes("polityka-cookies")) {
		presenceData.details = "Przegląda dokument";
		presenceData.state = "Polityka cookies";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Czyta...";
		presenceData.buttons = [
			{
				label: "Dowiedz sie o naszej polityce o ciasteczkach",
				url: "https://notespace.edu.pl/polityka-cookies",
			},
		];
	} else if (currentPath.includes("rodo")) {
		presenceData.details = "Przegląda dokument";
		presenceData.state = "RODO";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Czyta...";
		presenceData.buttons = [
			{
				label: "Dowiedz sie o naszej polityce o RODO",
				url: "https://notespace.edu.pl/rodo",
			},
		];
	} else if (currentPath.includes("warunki-uzytkowania")) {
		presenceData.details = "Przegląda dokument";
		presenceData.state = "Warunki użytkowania";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Czyta...";
		presenceData.buttons = [
			{
				label: "Dowiedz sie o naszych warunkach użytkowania",
				url: "https://notespace.edu.pl/warunki-uzytkowania",
			},
		];
	} else if (currentPath.includes("archiwum-dokumentow")) {
		presenceData.details = "Przegląda archiwum dokumentów";
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Czyta...";
		presenceData.buttons = [
			{
				label: "Przejrzyj nasze stare dokumenty",
				url: "https://notespace.edu.pl/archiwum-dokumentow",
			},
		];
	} else if (currentPath.includes("logowanie")) {
		presenceData.state = "Wprowadza dane";
		presenceData.smallImageKey = Assets.Writing;
		presenceData.smallImageText = "Pisze...";
		if (currentPath.includes("zaloguj-sie"))
			presenceData.details = "Loguje się";
		else if (currentPath.includes("zarejestruj-sie"))
			presenceData.details = "Rejestruje się";
	} else if (currentPath.startsWith("/app/")) {
		presenceData.details = "Korzysta z aplikacji";
		presenceData.state = "Przegląda stronę główną aplikacji";
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.smallImageText = "Przegląda...";
		presenceData.buttons = [
			{ label: "Użyj naszej aplikacji", url: "https://notespace.edu.pl/app" },
		];
		if (currentPath.includes("biblioteka")) {
			if (
				currentPath.includes("ulubione") ||
				currentPath.includes("polubione")
			) {
				presenceData.state = "Przegląda swoje polubione notatki/zbiory";
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = "Przegląda...";
				presenceData.buttons = [
					{
						label: "Przeglądnij swoją liste polubionych",
						url: "https://notespace.edu.pl/app/#/biblioteka/ulubione",
					},
				];
			} else if (currentPath.includes("moje-notatki")) {
				presenceData.state = "Przegląda swoje notatki";
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = "Czyta...";
				presenceData.buttons = [
					{
						label: "Przeglądnij swoje notatki",
						url: "https://notespace.edu.pl/app/#/biblioteka/moje-notatki",
					},
				];
			} else if (currentPath.includes("notatka")) {
				presenceData.state = "Przegląda notatke";
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = "Czyta...";
			} else if (currentPath.includes("zbior")) {
				presenceData.state = "Przegląda zbiór";
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = "Czyta...";
			} else {
				presenceData.state = "Przegląda biblioteke";
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = "Przegląda...";
				presenceData.buttons = [
					{
						label: "Przeglądnij swoją biblioteke",
						url: "https://notespace.edu.pl/app/#/biblioteka",
					},
				];
			}
		} else if (
			currentPath.includes("menu") ||
			currentPath.includes("ustawienia")
		) {
			if (
				!currentPath.endsWith("ustawienia") &&
				!currentPath.endsWith("menu") &&
				!currentPath.endsWith("ustawienia/") &&
				!currentPath.endsWith("menu/")
			) {
				presenceData.smallImageKey = Assets.Writing;
				presenceData.smallImageText = "Ustawianie...";
				if (currentPath.includes("moje-konto"))
					presenceData.state = "Zmienia ustawienia konta";
				else if (currentPath.includes("prywatnosc-i-bezpieczenstwo"))
					presenceData.state = "Zmienia ustawienia prywatności";
				else if (currentPath.includes("preferencje"))
					presenceData.state = "Zmienia ustawienia preferencji";
				else if (currentPath.includes("o-aplikacji")) {
					presenceData.state = "Informacje o aplikacji";
					presenceData.smallImageKey = Assets.Viewing;
					presenceData.smallImageText = "Przegląda...";
				}
			} else {
				presenceData.state = "Przegląda ustawienia uzytkownika";
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = "Przegląda...";
			}
		} else if (currentPath.includes("wyszukiwarka")) {
			presenceData.state = "Używa wyszukiwarke";
			presenceData.smallImageKey = Assets.Writing;
			presenceData.smallImageText = "Szuka...";
		} else if (
			currentPath.includes("przeslij") ||
			currentPath.includes("dodaj-zbior")
		) {
			presenceData.smallImageKey = Assets.Uploading;
			presenceData.smallImageText = "Przesyła...";
			if (currentPath.includes("przeslij"))
				presenceData.state = "Przesyła notatke";
			else if (currentPath.includes("dodaj-zbior"))
				presenceData.state = "Dodaje zbiór";
		} else if (currentPath.includes("profil")) {
			presenceData.state = `Przegląda profil: ${
				currentPath.split("/")[currentPath.split("/").length - 1]
			}`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Przegląda...";
		}
	}

	presence.setActivity(presenceData);
});
