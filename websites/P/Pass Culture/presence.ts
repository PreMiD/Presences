const presence = new Presence({
	clientId: "1165384499987742800",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/ES9Hy84.png",
		},
		path = document.location.pathname.split("/"),
		showCounts = await presence.getSetting<boolean>("show_counts");

	switch (path[1]) {
		case "questionnaire-pratiques-initiales":
			presenceData.details = "En train de faire le questionnaire";
			break;
		case "accueil":
			presenceData.details = "Regarde la page d'accueil";
			break;
		case "accueil-thematique": {
			presenceData.details = "Regarde la page d'accueil";

			const offersType = document.querySelector<HTMLHeadingElement>(
				".css-175oi2r.r-43z982.r-1udh08x"
			)?.textContent;
			if (offersType) presenceData.state = offersType;
			break;
		}
		case "profil":
			presenceData.details = "Regarde son profil";
			break;
		case "recherche": {
			presenceData.details = "Recherche :";

			const query =
					document.querySelector<HTMLInputElement>("input[type=search]")?.value,
				results = parseInt(document.title);
			if (query && !isNaN(results))
				presenceData.state = `${query} (${results} résultats)`;
			break;
		}
		case "reservations": {
			const reservationsCount = document.querySelector<HTMLHeadingElement>(
				'[data-testid="OnGoingBookingsList"] h2.css-1rynq56'
			)?.textContent;

			presenceData.details = "Regarde ses réservations";
			if (reservationsCount && showCounts)
				presenceData.state = reservationsCount;
			break;
		}
		case "reservations-terminees": {
			const doneReservationsCount = document.querySelector<HTMLHeadingElement>(
				'[data-testid="EndedBookings"] h2.css-1rynq56'
			)?.textContent;

			presenceData.details = "Regarde ses réservations terminées";
			if (doneReservationsCount && showCounts)
				presenceData.state = doneReservationsCount;
			break;
		}
		case "reservation": {
			presenceData.details = "Regarde une réservation";

			const reservation = document.querySelector<HTMLHeadingElement>(
					".css-175oi2r.r-1777fci.r-cn4s0y h1.css-1rynq56.r-1rmcaf9.r-1gknse6"
				)?.textContent,
				reservationPrice = document
					.querySelector<HTMLSpanElement>("span.css-1qaijid.r-1rmcaf9.r-yv33h5")
					?.textContent.trim(),
				offerLink = document
					.querySelector<HTMLAnchorElement>(
						"a.AppButtonweb__Link-sc-1veyq7-1.hTlNnp.sc-iGgWBj.kxRSZa"
					)
					?.getAttribute("href");
			if (reservation && reservationPrice) {
				presenceData.state = `${reservation} (${reservationPrice})`;
				presenceData.buttons = [
					{
						label: "Voir l'offre",
						url: `${document.location.protocol}//${document.location.hostname}${
							offerLink.split("?")[0]
						}`,
					},
				];
			}
			break;
		}
		case "favoris": {
			presenceData.details = "Regarde ses favoris";

			const favoritesCount = document.querySelector(
				'[data-testid="favoritesResultsFlatlist"] h2.css-1rynq56'
			)?.textContent;
			if (favoritesCount && showCounts) presenceData.state = favoritesCount;
			break;
		}
		case "offre": {
			if (path[3] && path[3] === "description")
				presenceData.details = "Regarde les détails d'une offre";
			else {
				presenceData.details = "Regarde une offre";

				const offer = document.querySelector<HTMLHeadingElement>(
						'.css-175oi2r.r-1hy1u7s h1[data-testid^="Nom de l’offre"]'
					)?.textContent,
					price = document.querySelector<HTMLDivElement>(
						"div[data-testid=caption-iconPrice]"
					)?.textContent;
				if (offer && price) {
					presenceData.state = `${offer} (${price})`;
					presenceData.buttons = [
						{
							label: "Voir l'offre",
							url: document.location.href.split("?")[0],
						},
					];
				}
			}
			break;
		}
		default:
			presence.clearActivity();
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
