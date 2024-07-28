const presence = new Presence({
	clientId: "1265368122689458378",
}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/idEEfM8.png",
	Logo2 = "https://i.imgur.com/mYXLmgF.png",
	Buy = "https://i.imgur.com/Z8xQXY4.png",
	Train = "https://i.imgur.com/Jz7uUX1.png",
	Ticket = "https://i.imgur.com/PDNRKZ0.png"
}

let oldStations: string | string[] = undefined;

function NoPage(presenceData: PresenceData): void {
	presenceData.name = "KOLEO - 404";
	presenceData.details = "Nie znaleziono strony.";
	presenceData.largeImageKey = Assets.Logo;
	presenceData.state = "";
	presenceData.smallImageText = "Zgubił się...";
	presenceData.smallImageKey = Assets.Question;
}

const operators = ["pkp-intercity", "polregio", "arriva", "leo-express", "koleje-wielkopolskie", "koleje-dolnoslaskie", "koleje-mazowieckie", "koleje-malopolskie", "wkd", "lka", "koleje-slaskie", "skm-trojmiasto"]

presence.on("UpdateData", async () => {
	const { href } = document.location,
		presenceData: PresenceData = {
			details: "Ładowanie.",
			largeImageKey: Assets.Logo,
			smallImageText: "Ładowanie...",
			smallImageKey: Assets.Train,
			startTimestamp: browsingTimestamp,
		}, [privacySetting] = await Promise.all([presence.getSetting<boolean>("privacy")]);

	let currentPath

	if (href.startsWith("https://koleo.pl")) {
		currentPath = href.replace("https://koleo.pl", "");
		presenceData.details = "Szuka połączenia rozkładu koleji.";
		if (href.endsWith("koleo.pl/") || href.endsWith("koleo.pl/#") || currentPath.includes("rozklad-jazdy") || operators.includes(currentPath.split("/")[1])) {
			let startText: string, endText: string, dateText: string;

			if (href.endsWith("koleo.pl/") || href.endsWith("koleo.pl/#")) {
				const startStation = document.getElementById("query_start_station") as HTMLInputElement;
				const endStation = document.getElementById("query_end_station") as HTMLInputElement;
				const date = document.getElementById("query_date") as HTMLInputElement;
				if (startStation && endStation && date) {
					startText = startStation.value;
					endText = endStation.value;
					dateText = date.value;
					presenceData.state = "W całym KOLEO...";
				}
			} else if (currentPath.includes("rozklad-jazdy") || operators.includes(currentPath.split("/")[1])) {
				const startStationButton = document.querySelector(".closest-station");
				const endStationButton = document.querySelector(".swap-stations");
				const dateInputWrapper = document.querySelector(".form-date-input__input-wrapper");

				if (startStationButton && endStationButton && dateInputWrapper) {
					const startStation = startStationButton.closest(".icon-input-action").querySelector("input") as HTMLInputElement;
					const endStation = endStationButton.closest(".icon-input-action").querySelector("input") as HTMLInputElement;
					const date = dateInputWrapper.querySelector("input") as HTMLInputElement;

					startText = startStation.value;
					endText = endStation.value;
					dateText = date.value;

					const transportation = document.querySelector(".top-banner__heading") || { textContent: "caŁym KOLEO" };
					presenceData.state = `W ${transportation.textContent}...`;
				}
			}
			presenceData.smallImageText = "Szuka połączenia...";
			presenceData.buttons = [
				{ label: "Rozkład jazdy", url: "https://koleo.pl/rozklad-jazdy" },
			];

			if (!privacySetting) {
				if (startText && endText) {
					presenceData.details = `Szuka połączenia z ${startText} do ${endText} na ${dateText}`;
				} else if (startText && !endText) {
					presenceData.details = `Szuka połączenia z ${startText} na ${dateText}`;
				} else if (!startText && endText) {
					presenceData.details = `Szuka połączenia do ${endText} na ${dateText}`;
				}
			}
		} else if (currentPath.startsWith("/rozklad-pkp")) {
			presenceData.state = "W rozkładzie PKP...";
			const startStation = document.getElementById("query_start_station") as HTMLInputElement;
			const endStation = document.getElementById("query_end_station") as HTMLInputElement;
			const date = document.getElementById("query_date") as HTMLInputElement;
			if (startStation && endStation && date) {
				const [startText, endText, dateText] = [startStation.value, endStation.value, date.value];
				if (href && startText && endText && dateText) {
					if (oldStations === undefined || oldStations[0] !== href) oldStations = [href, startText, endText, dateText.replace(/_/g, " ")];
				}

				if (oldStations !== undefined && oldStations[0] === href) {
					if (!privacySetting) {
						if (oldStations !== undefined && oldStations[0] === href && startText === oldStations[1] && endText === oldStations[2] && dateText === oldStations[3]) {
							if (startText === oldStations[1] && endText === oldStations[2] && dateText === oldStations[3]) {
								presenceData.details = `Wybiera połączenie z ${startText} do ${endText} na ${dateText}`;
							} else if (startText === oldStations[1] && !endText && dateText === oldStations[3]) {
								presenceData.details = `Wybiera połączenie z ${startText} na ${dateText}`;
							} else if (!startText && endText === oldStations[2] && dateText === oldStations[3]) {
								presenceData.details = `Wybiera połączenie do ${endText} na ${dateText}`;
							}
							presenceData.smallImageText = "Wybiera najlepsze połączenie...";
						} else {
							if (startText && endText) {
								presenceData.details = `Szuka połączenia z ${startText} do ${endText} na ${dateText}`;
							} else if (startText && !endText) {
								presenceData.details = `Szuka połączenia z ${startText} na ${dateText}`;
							} else if (!startText && endText) {
								presenceData.details = `Szuka połączenia do ${endText} na ${dateText}`;
							}
							presenceData.smallImageText = "Szuka połączenia...";
						}
						presenceData.buttons = [
							{ label: "Zobacz połączenia", url: `https://koleo.pl/${currentPath.split("/").slice(1, 5).join("/")}` },
						];
					} else {
						if (startText === oldStations[1] && endText === oldStations[2] && dateText === oldStations[3]) {
							presenceData.details = "Wyświetlanie wyników na rozkład kolei na wyznaczone stacje.";
							presenceData.smallImageText = "Wybiera najlepszą oferte...";
							presenceData.smallImageKey = Assets.Ticket;
						} else {
							presenceData.details = "Szuka połączenia rozkładu koleji na wyznaczone stacje.";
							presenceData.smallImageText = "Szuka...";
							presenceData.smallImageKey = Assets.Train;
						}
						presenceData.buttons = [
							{ label: "Zobacz połączenia", url: `https://koleo.pl/rozklad-jazdy` },
						];
					}
				}
			}
		} else if (currentPath.includes("bilety-miesieczne")) {
			const transportation = document.querySelector(".top-banner__heading");
			if (transportation) {
				presenceData.details = `Przegląda bilety miesięczne w ${transportation.textContent}.`;
				presenceData.smallImageText = "Przegląda bilety...";
				presenceData.smallImageKey = Assets.Ticket;
			}
			const typeOfTicket = document.querySelector(".active-ticket__ticket-name");
			if (typeOfTicket) {
				const stepOfBuying = document.querySelector(".step-breadcrumbs__step--is-active").querySelector(".step-breadcrumbs__number-badge").textContent;
				const offers = document.querySelector(".carrier-season-ticket__total-price");
				const transportation = document.querySelector(".active-ticket__carrier-name")?.textContent;
				presenceData.details = `Kupuje ${typeOfTicket.textContent.toLowerCase()} w ${transportation}.`;
				presenceData.smallImageKey = Assets.Buy;
				if (stepOfBuying === "2" && !offers) {
					const startStationButton = document.querySelector(".closest-station");
					const endStationButton = document.querySelector(".swap-stations");
					const dateInputWrapper = document.querySelector(".form-date-input__input-wrapper");

					if (startStationButton && endStationButton && dateInputWrapper) {
						const startStation = startStationButton.closest(".icon-input-action").querySelector("input") as HTMLInputElement;
						const endStation = endStationButton.closest(".icon-input-action").querySelector("input") as HTMLInputElement;
						const date = dateInputWrapper.querySelector("input") as HTMLInputElement;
						const [startText, endText, dateText] = [startStation.value, endStation.value, date.value];


						presenceData.smallImageText = "Szuka połączenia...";
						presenceData.smallImageKey = Assets.Train;
						if (!privacySetting) {
							if (startText && endText) {
								presenceData.state = `Szuka połączenia z ${startText} do ${endText} na ${dateText}`;
							} else if (startText && !endText) {
								presenceData.state = `Szuka połączenia z ${startText} na ${dateText}`;
							} else if (!startText && endText) {
								presenceData.state = `Szuka połączenia do ${endText} na ${dateText}`;
							}
						}
					}

					presenceData.smallImageText = "Wybiera stację...";
					presenceData.state = "Wybiera stację docelową...";
				} else if (stepOfBuying === "2" && offers) {
					presenceData.state = "Wybiera offertę biletu...";
					presenceData.smallImageText = "Wybiera offertę...";
					const offer = document.querySelector(".tile-radio--is-checked").textContent;
					const offerCost = document.querySelector(".tile-radio--is-checked").querySelector(".tile-offer-radio__price").textContent;
					if (offer) {
						presenceData.state = `Wybrał/a ofertę za ${offerCost}.`;
						presenceData.smallImageKey = ""
						presenceData.smallImageText = ""
					}
				}
			}
		} else if (currentPath.startsWith("/summary")) {
			const tempTitleOfOrder = document.querySelector(".tile-order .tile-order__name")
			let titleOfOrder: string = undefined;
			if (tempTitleOfOrder) titleOfOrder = tempTitleOfOrder.textContent;
			const tempDateOfTransport = document.querySelector(".tile-order__date")
			let dateOfTransport: string = undefined;
			if (tempDateOfTransport) dateOfTransport = tempDateOfTransport.textContent;
			const tempTypeOfTicket = document.querySelector(".order-summary-info__content")
			let typeOfTicket: string = undefined;
			if (tempTypeOfTicket) typeOfTicket = tempTypeOfTicket.textContent;
			const tempCostOfOrder = document.querySelector(".order-summary-total__price")
			let costOfOrder: string = undefined;
			if (tempCostOfOrder) costOfOrder = tempCostOfOrder.textContent;
			if (!titleOfOrder || !dateOfTransport || !typeOfTicket || !costOfOrder) {
				presenceData.details = "Ładuje zamówienie...";
				presenceData.smallImageText = "Ładuje zamówienie...";
				presenceData.smallImageKey = Assets.Buy;
				return presence.setActivity(presenceData);
			}


			const startStation = titleOfOrder.split(" - ")[0];
			const endStation = titleOfOrder.split(" - ")[1];

			const paymentMethod = document.querySelector(".tile-radio--is-checked .payment-method-radio__control span");
			let title: string = undefined;
			if (paymentMethod) {
				if (paymentMethod.classList.contains("payment-method-wallet__name")) title = "środków na koncie KOLEO";
				else if (paymentMethod.classList.contains("payment-method-blik__name")) title = "BLIKa";
				else if (paymentMethod.classList.contains("payment-method-card__name")) title = "karty płatniczej";
			}

			if (!privacySetting) presenceData.details = `Kupuje bilet ${typeOfTicket} z ${startStation} do ${endStation} na ${dateOfTransport} za ${costOfOrder}.`;
			else presenceData.details = `Kupuje bilet ${typeOfTicket} za ${costOfOrder}.`;
			if (title !== undefined) presenceData.state = `Za pomocą ${title}.`;
			presenceData.smallImageText = "Kupuje bilet...";
			presenceData.smallImageKey = Assets.Buy;
		} else if (currentPath.startsWith("/ticket/")) {
			const tickets = document.querySelectorAll('.ticket');
			if (!tickets) {
				presenceData.details = "Ładuje bilet/y...";
				presenceData.smallImageText = "Ładuje bilet/y...";
				presenceData.smallImageKey = Assets.Ticket;
				return presence.setActivity(presenceData);
			}

			if (!privacySetting && tickets.length > 0) {
				const mergedTicketData: { stations: string[], trainClasses: string[], operators: string[], distance: string, tempDistance: number, price: string, tempPrice: number } = {
					stations: [],
					trainClasses: [],
					operators: [],
					distance: '0 km',
					tempDistance: 0,
					price: '0 zł',
					tempPrice: 0
				}

				const uniqueStations = new Set();
				const uniqueClasses = new Set();
				const uniqueOperators = new Set();

				tickets.forEach((ticket) => {
					const stations = ticket.querySelector('.ticket-stations .ticket-station span')?.textContent.replace(/\n/g, ' ').trim().replace(/  /g, ' ').split(' — ');
					const trainClasses = ticket.querySelector('.ticket-trains:nth-of-type(1) .train-class')?.textContent.replace(/\n/g, ' ').trim().replace(/  /g, ' ');
					const operators = ticket.querySelector('.ticket-trains:nth-of-type(2) strong')?.textContent.replace(/\n/g, ' ').trim().replace(/  /g, ' ');
					const distance = parseFloat(ticket.querySelector('.ticket-distance span')?.textContent.replace(/\n/g, ' ').trim().replace(/  /g, ' ').replace(',', '.'));
					const price = parseFloat(ticket.querySelector('.ticket-price .price-value')?.textContent.replace(/\n/g, ' ').trim().replace(/  /g, ' ').replace('zł', '').replace(',', '.'));

					if (stations) stations.forEach((station: string) => uniqueStations.add(station));
					if (trainClasses) uniqueClasses.add(trainClasses.replace('Klasa ', ''));
					if (operators) uniqueOperators.add(operators);

					if (distance && !isNaN(distance)) {
						mergedTicketData.tempDistance += distance;
					}

					if (price && !isNaN(price)) {
						mergedTicketData.tempPrice += price;
					}
				});

				mergedTicketData.stations = Array.from(uniqueStations) as string[];
				mergedTicketData.trainClasses = Array.from(uniqueClasses) as string[];
				mergedTicketData.operators = Array.from(uniqueOperators) as string[];
				mergedTicketData.price = (mergedTicketData.tempPrice).toFixed(2) + ' zł';
				mergedTicketData.distance = mergedTicketData.tempDistance + ' km';

				const stations = mergedTicketData.stations.join(' - ');
				const startStation = stations.split(" - ")[0];
				const endStation = stations.split(" - ")[stations.split(" - ").length - 1];
				const trainClasses = mergedTicketData.trainClasses.join(', ');
				const operators = mergedTicketData.operators.join(', ');
				const distance = mergedTicketData.distance;
				const price = mergedTicketData.price;

				presenceData.details = `Przegląda ${tickets.length > 1 ? "bilety" : "bilet"} z ${startStation} do ${endStation} (${distance}) za ${price}.`;
				presenceData.state = `${trainClasses.length > 1 ? "Klasy pociągów" : "Klasa pociągu"}: ${trainClasses}, ${operators.length > 1 ? "Operatorzy" : "Operator"}: ${operators}.`;
			} else presenceData.details = `Przegląda ${tickets.length > 1 ? "swoje bilety" : "swój bilet"}.`;
			presenceData.smallImageText = `Przegląda ${tickets.length > 1 ? "bilety" : "bilet"}...`;
			presenceData.smallImageKey = Assets.Ticket;
			presenceData.buttons = [
				{ label: "Moje bilety", url: "https://koleo.pl/my/orders" },
			];
		} else if (currentPath.startsWith("/travel-options/")) {
			const stationText = document.querySelector('.traveloptions .connection-relation .small-16 h2')
			let stations: string[] = [];
			if (stationText) stations = stationText.textContent.split('—').map(station => station.trim());
			const startStation = stations[0];
			const endStation = stations[stations.length - 1];

			const dateTimeText = document.querySelector('.traveloptions .connection-relation .connection-relation-date')
			let dateText: string = undefined;
			if (dateTimeText) dateText = dateTimeText.textContent.split('–')[0].trim();

			const travelOptions = Array.from(document.querySelectorAll('.traveloptions-option'));
			let travelOffer: string = undefined;
			travelOptions.forEach((option) => {
				const input = option.querySelector('input[type="radio"]') as HTMLInputElement;
				if (input && input.checked) {
					const offer = option.querySelector('.traveloptions-offers strong')
					if (offer) travelOffer = offer.textContent.trim();
				}
			});

			const tempPriceText = document.querySelector('.summary .traveloptions-price strong:nth-of-type(1)')
			let priceText: string = undefined;
			if (tempPriceText) priceText = tempPriceText.textContent.trim() + " zł";


			if (travelOffer !== undefined && priceText !== undefined) {
				if (!privacySetting) presenceData.details = `Wybiera ofertę biletu ${travelOffer} z ${startStation} do ${endStation} na ${dateText}.`;
				else presenceData.details = `Wybiera ofertę biletu ${travelOffer}.`;
				presenceData.state = `Za cenę ${priceText}.`;
				presenceData.smallImageText = "Wybiera ofertę...";
				presenceData.smallImageKey = Assets.Ticket;
			} else {
				if (!privacySetting) presenceData.details = `Przegląda oferty biletów z ${startStation} do ${endStation} na ${dateText}.`;
				else presenceData.details = "Przegląda oferty biletów.";
				presenceData.smallImageText = "Przegląda oferty...";
				presenceData.smallImageKey = Assets.Ticket;
			}
		} else if (currentPath.startsWith("/my")) {
			presenceData.details = "Przegląda swoje konto KOLEO.";
			presenceData.smallImageText = "Przegląda konto...";
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.buttons = [
				{ label: "Moje konto", url: href },
			];
			if (currentPath.startsWith("/my/account")) {
				presenceData.details = "Wprowadza zmiany w swoje dane konta KOLEO - konto KOLEO";
				presenceData.smallImageText = "Zmienia dane...";
				presenceData.smallImageKey = Assets.Writing;
				if (currentPath.startsWith("/my/account/change-password")) {
					presenceData.details = "Zmienia swoje hasło do konta KOLEO - konto KOLEO";
					presenceData.smallImageText = "Zmienia hasło...";
					presenceData.smallImageKey = Assets.Writing;
				}
			} else if (currentPath.startsWith("/my/orders")) {
				presenceData.details = "Przegląda swoje bilety - konto KOLEO";
				presenceData.smallImageText = "Przegląda...";
				if (currentPath.startsWith("/my/orders/archive")) {
					presenceData.details = "Przegląda swoje archiwalne bilety.";
					presenceData.smallImageText = "Przegląda...";
				}
			} else if (currentPath.startsWith("/my/passengers")) {
				presenceData.details = "Przegląda swoich pasażerów - konto KOLEO";
				presenceData.smallImageText = "Przegląda...";
				if (currentPath.startsWith("/my/passengers/new")) {
					presenceData.details = "Dodaje nowego pasażera - konto KOLEO";
					presenceData.smallImageText = "Dodaje...";
					presenceData.smallImageKey = Assets.Writing;
				} else if (currentPath.startsWith("/my/passengers/edit")) {
					presenceData.details = "Edytuje swoich pasażerów - konto KOLEO";
					presenceData.smallImageText = "Edytuje...";
					presenceData.smallImageKey = Assets.Writing;
				}
			} else if (currentPath.startsWith("/my/finances")) {
				presenceData.details = "Przegląda środki na swoim koncie KOLEO - konto KOLEO";
				presenceData.smallImageText = "Przegląda środki...";
				if (currentPath.startsWith("/my/finances/") && !currentPath.includes("invoice-details") && !currentPath.includes("transactions")) {
					let title
					if (currentPath.endsWith("/blik")) title = "BLIKa";
					else if (currentPath.endsWith("/transfer")) title = "przelewu";
					else if (currentPath.endsWith("/postal-order")) title = "przekazu pocztowym"
					else if (currentPath.endsWith("/payment-cards")) title = "karty płatniczej";
					else if (currentPath.endsWith("/gift-card")) title = "karty podarunkowej";

					const formAmount = document.querySelector(".form-base .form-input__control") as HTMLInputElement;

					presenceData.details = "Doładowuje środki na swoje konto KOLEO.";
					presenceData.state = `Przy użyciu ${title}.`;
					presenceData.smallImageKey = Assets.Buy;
					presenceData.smallImageText = "Doładowuje konto...";
					if (formAmount && formAmount.getAttribute("inputmode") === "decimal") presenceData.state = `Doładowuje konto o ${formAmount.value} przy użyciu ${title}.`;
				} else if (currentPath.includes("invoice-details")) {
					presenceData.details = "Wypełnia dane do faktury - konto KOLEO";
					presenceData.smallImageKey = Assets.Writing;
					presenceData.smallImageText = "Wypełnia...";
				} else if (currentPath.includes("transactions")) {
					presenceData.details = "Przegląda swoje transakcje - konto KOLEO";
					presenceData.smallImageText = "Przegląda...";
				}
			} else if (currentPath.startsWith("/my/linked-accounts")) {
				presenceData.details = "Przegląda swoje połączone konta - konto KOLEO";
				presenceData.smallImageText = "Przegląda...";
			} else if (currentPath.startsWith("/my/settings")) {
				presenceData.details = "Wprowadza zmiany w swojich ustawieniach konta - konto KOLEO";
				presenceData.smallImageText = "Zmienia ustawienia...";
				presenceData.smallImageKey = Assets.Writing;
			}
		} else if (currentPath.startsWith("/signin") || (currentPath.startsWith("/users/auth") && currentPath.includes("intent=login"))) {
			presenceData.details = "Loguje się...";
			presenceData.smallImageText = "Loguje się...";
			presenceData.smallImageKey = Assets.Writing;
		} else if (currentPath.startsWith("/signup") || (currentPath.startsWith("/users/auth") && currentPath.includes("intent=signup"))) {
			presenceData.details = "Rejestruje się...";
			presenceData.smallImageText = "Rejestruje się...";
			presenceData.smallImageKey = Assets.Writing;
		} else if (currentPath.startsWith("/kontakt")) {
			presenceData.details = "Przegląda informacje kontaktowe.";
			presenceData.smallImageText = "Przegląda informacje...";
			presenceData.smallImageKey = Assets.Viewing;
		} else if (currentPath.startsWith("/privacy_policy")) {
			presenceData.details = "Czyta politykę prywatności.";
			presenceData.smallImageText = "Czyta politykę...";
			presenceData.smallImageKey = Assets.Reading;
		} else if (currentPath.startsWith("/media")) {
			presenceData.details = "Przegląda media KOLEO.";
			presenceData.smallImageText = "Przegląda media...";
			presenceData.smallImageKey = Assets.Viewing;
		} else NoPage(presenceData);
	} else if (href.startsWith("https://pomoc.koleo.pl")) {
		currentPath = href.replace("https://pomoc.koleo.pl", "");
		presenceData.name = "KOLEO - pomoc"
		presenceData.largeImageKey = Assets.Logo2;
		presenceData.smallImageText = "Przegląda pomoc...";
		presenceData.smallImageKey = Assets.Viewing;

		if (href.endsWith("https://pomoc.koleo.pl") || href.endsWith("https://pomoc.koleo.pl/")) presenceData.details = "Przegląda pomoc KOLEO.";
		else if (currentPath.startsWith("/?s")) {
			const searchTab = document.querySelector("#hkb-search") as HTMLInputElement;
			presenceData.details = `Szuka: ${searchTab?.value}`;
			presenceData.smallImageText = "Szuka...";
			presenceData.smallImageKey = Assets.Search;
		} else if (currentPath.startsWith("/faq")) presenceData.details = "Przegląda często zadane pytania."
		else if (currentPath.startsWith("/wp-content")) presenceData.details = "Przegląda pliki."
		else {
			if (!privacySetting) {
				const articleTitle = document.querySelector(".hkb-article__title") || document.querySelector(".entry-header .entry-title");
				const searchTab = document.querySelector("#hkb-search") as HTMLInputElement;
				presenceData.details = `Czyta artykuł${articleTitle ? ` - ${articleTitle.textContent}` : ""}.`;
				if (searchTab && searchTab.value.length > 0) presenceData.state = `Szuka: ${searchTab.value}`;
				presenceData.buttons = [{ label: "Przeczytaj artykuł", url: href }];
			} else {
				presenceData.details = "Czyta artykuł.";
			}

			presenceData.smallImageText = "Czyta artykuł...";
			presenceData.smallImageKey = Assets.Reading;
		}
	} else if (href.startsWith("https://magazyn.koleo.pl")) {
		currentPath = href.replace("https://magazyn.koleo.pl", "");
		presenceData.name = "KOLEO - magazyn"
		presenceData.largeImageKey = Assets.Logo2;
		presenceData.smallImageKey = Assets.Viewing;
		if (href.endsWith("https://magazyn.koleo.pl") || href.endsWith("https://magazyn.koleo.pl/")) {
			presenceData.details = "Przegląda artykuły w magazynie KOLEO.";
			presenceData.smallImageText = "Przegląda artykuły...";
		} else if (currentPath.startsWith("/o-koleo")) {
			presenceData.details = "Przegląda informacje o KOLEO.";
			presenceData.smallImageText = "Przegląda informacje...";
		} else if (currentPath.startsWith("/author/")) {
			const authorName = document.querySelector(".module-title");
			const posts = document.querySelector(".gridlove-posts").children;
			if (authorName) {
				presenceData.details = `Przegląda artykuły napisane przez ${authorName.textContent}.`;
				presenceData.state = `Ilość artykułów: ${posts.length}`;
				presenceData.smallImageText = "Przegląda profil...";
			}
		} else if (currentPath.startsWith("/opinie")) {
			presenceData.details = "Przegląda opinie ludzi.";
			presenceData.smallImageText = "Przegląda opinie...";

			const tempOpinion = document.querySelector('rw-popup-review.hydrated');
			if (tempOpinion) {
				const shadowRootOpinion = tempOpinion.shadowRoot;
				const opinionUserElement = shadowRootOpinion.querySelector(".main .header .info .name");
				const opinionStarsElements = shadowRootOpinion.querySelectorAll(".main .stat .icon-star");
				const opinionLinkElement = shadowRootOpinion.querySelector(".main .header .info .channel-link a");

				if (opinionUserElement && opinionStarsElements && opinionLinkElement) {
					const opinionUser = opinionUserElement.textContent.trim();
					const opinionStars = opinionStarsElements.length;
					const opinionLink = opinionLinkElement.getAttribute("href");

					presenceData.details = `Przegląda opinię ${opinionUser}, który/a ocenił/a KOLEO na ${opinionStars} gwiazdki.`;
					presenceData.buttons = [
						{ label: "Zobacz opinię", url: opinionLink },
					];
				}
			}
		} else {
			const topicOfPage = document.title.split("›")[0].trim() || document.querySelector(".entry-header h1.entry-title")?.textContent;
			const authorOfPage = document.querySelector(".mks_author_widget .widget-title")?.textContent;
			const metaOfPage = document.querySelector(".entry-meta");
			const dateOfPage = metaOfPage?.querySelector("div.meta-date span")?.textContent;
			const readTimeOfPage = metaOfPage?.querySelector("div.meta-rtime")?.textContent;

			if (authorOfPage) {
				presenceData.details = `Czyta temat${(authorOfPage && !privacySetting) ? ` napisany przez ${authorOfPage}` : ""}.`;
				if (!privacySetting) presenceData.state = [topicOfPage, dateOfPage, readTimeOfPage].filter(Boolean).join(" | ");
				presenceData.smallImageText = "Czyta temat...";
				presenceData.smallImageKey = Assets.Reading;
			} else {
				const tagName = document.querySelector(".module-title h1.h2");
				const tagPosts = document.querySelector(".gridlove-posts").children;
				presenceData.details = `Przegląda artykuły${!privacySetting ? ` zawierające ${tagName?.textContent}` : ""}.`;
				if (!privacySetting) presenceData.state = `Ilość artykułów: ${tagPosts.length} | Utworzono: ${dateOfPage}`;
				presenceData.smallImageText = "Przegląda profil przewoźnika...";
			}
			if (!privacySetting) presenceData.buttons = [{ label: "Przeczytaj artykuł", url: href }];
		}
	} else if (href.startsWith("https://travel.koleo.pl")) {
		currentPath = href.replace("https://travel.koleo.pl", "")
		presenceData.name = "KOLEO - travel"
		presenceData.largeImageKey = Assets.Logo2;
		presenceData.smallImageKey = Assets.Viewing;
		if (href.endsWith("travel.koleo.pl") || href.endsWith("travel.koleo.pl/")) {
			presenceData.details = "Przegląda travel KOLEO.";
			presenceData.smallImageText = "Przegląda travel...";
		} else {
			const topicOfPage = document.title.split("›")[0].trim() || document.querySelector(".entry-header h1.entry-title")?.textContent;
			if (topicOfPage) {
				const authorOfPage = document.querySelector(".mks_author_widget .widget-title")?.textContent;
				const dateOfPage = document.querySelector(".entry-meta div.meta-date span")?.textContent;

				console.log(authorOfPage, dateOfPage)

				if (dateOfPage) {
					presenceData.details = `Czyta informacje${(authorOfPage && !privacySetting) ? ` napisane przez ${authorOfPage}` : ""}.`;
					if (!privacySetting) presenceData.state = [topicOfPage, dateOfPage].filter(Boolean).join(" | ");
					presenceData.smallImageText = "Czyta informacje...";
					presenceData.smallImageKey = Assets.Reading;
				} else {
					const countryPosts = document.querySelector(".gridlove-posts").children;
					presenceData.details = `Przegląda informacji${!privacySetting ? ` o ${topicOfPage.toLowerCase()}` : ""}.`;
					if (!privacySetting) presenceData.state = `Ilość informacji: ${countryPosts.length}`;
					presenceData.smallImageText = "Przegląda strone kraju...";
				}
				if (!privacySetting) presenceData.buttons = [{ label: "Przeczytaj informacje", url: href },];
			} else {
				presenceData.details = "Przegląda travel KOLEO.";
				presenceData.smallImageText = "Przegląda travel...";
			}
		}
	} else if (href.startsWith("https://sklep.koleo.pl")) {
		currentPath = href.replace("https://sklep.koleo.pl", "");
		presenceData.name = "KOLEO - sklep"
		presenceData.largeImageKey = Assets.Logo2;
		presenceData.smallImageKey = Assets.Viewing;
		if (href.endsWith("https://sklep.koleo.pl") || href.endsWith("https://sklep.koleo.pl/")) {
			presenceData.details = "Przegląda sklep KOLEO.";
			presenceData.smallImageText = "Przegląda sklep...";
		} else if (currentPath.startsWith("/katalog")) {
			const page = document.querySelector(".page-numbers.current")?.textContent;
			presenceData.details = "Przegląda katalog produktów.";
			if (page) presenceData.state = `Strona: ${page}`;
			presenceData.smallImageText = "Przegląda katalog...";
			presenceData.buttons = [
				{ label: "Zobacz katalog", url: "https://sklep.koleo.pl/katalog" },
			];
		} else if (currentPath.startsWith("/koleo-kids")) {
			const page = document.querySelector(".page-numbers.current")?.textContent;
			presenceData.details = "Przegląda produkty dla dzieci.";
			if (page) presenceData.state = `Strona: ${page}`;
			presenceData.smallImageText = "Przegląda produkty...";
		} else if (currentPath.startsWith("/klocki-lego/") || currentPath.startsWith("/kolejki-drewniane") || currentPath.startsWith("/kdd") || currentPath.startsWith("/ksiazki-dla-dzieci") || currentPath.startsWith("/plakaty-kolejowe") || currentPath.startsWith("/kubki-barowe") || currentPath.startsWith("/odziez") || currentPath.startsWith("/ksiazki") || currentPath.startsWith("/karta-podarunkowa-koleo") || currentPath.startsWith("/modelarstwo") || currentPath.startsWith("/marka")) {
			const pageTitle = document.querySelector(".woocommerce-products-header__title")?.textContent.toLowerCase()
			const pageNumber = document.querySelector(".page-numbers.current")?.textContent;
			presenceData.details = `Przegląda produkty ${currentPath.startsWith("/marka") ? "marki" : "katalogu"} - ${pageTitle}.`;
			if (pageNumber) presenceData.state = `Strona: ${pageNumber}`;
			presenceData.smallImageText = "Przegląda katalog...";
			presenceData.buttons = [{ label: "Zobacz katalog", url: href }];
		} else if (currentPath.startsWith("/passy")) {
			presenceData.details = "Przegląda dostępne passy."
			presenceData.smallImageText = "Przegląda passy..."
			const productTitle = document.querySelector(".product_title");
			if (productTitle) {
				presenceData.details = `Przegląda pass${privacySetting ? "" : ` - ${productTitle.textContent}`}.`;
				presenceData.state = `Cena: ${document.querySelector("div.woocommerce-variation-price span.price span.woocommerce-Price-amount.amount bdi")?.textContent}`;
				presenceData.smallImageText = "Przegląda pass...";
				if (!privacySetting) presenceData.buttons = [{ label: "Zobacz pass", url: href }];
				else presenceData.buttons = [{ label: "Zobacz passy", url: "https://sklep.koleo.pl/passy" }];
			}
		} else if (currentPath.startsWith("/koszyk/")) {
			const cartItems = document.querySelectorAll(".cart_item");
			const price = document.querySelector(".order-total .woocommerce-Price-amount")?.textContent

			presenceData.details = "Przegląda swój koszyk.";
			if (!privacySetting) presenceData.state = `${cartItems.length > 0 ? `Ilość produktów w koszyku: ${cartItems.length} | Cena za wszystko: ${price}` : "Nie ma nic w koszyku"}`;
			presenceData.smallImageText = "Przegląda koszyk...";
			presenceData.smallImageKey = Assets.Buy;
		} else if (currentPath.startsWith("/zamowienie")) {
			const cartItems = document.querySelectorAll(".cart_item");

			if (cartItems.length > 0) {
				const price = document.querySelector(".order-total .woocommerce-Price-amount bdi")?.textContent;
				presenceData.details = "Realizuje swoje zamówienie.";
				presenceData.state = `Cena za ${cartItems.length > 1 ? `${cartItems.length} produktów` : `${cartItems.length} produkt`} wynosi ${price}`;
				presenceData.smallImageText = "Realizuje zamówienie...";
				presenceData.smallImageKey = Assets.Buy;
			} else {
				presenceData.details = "Przegląda swoje zamówienie.";
				presenceData.smallImageText = "Przegląda zamówienie...";
				presenceData.smallImageKey = Assets.Buy;
			}
		} else if (currentPath.startsWith("/moje-konto")) {
			const loginPage = document.querySelector(".woocommerce-form-login__submit");
			if (loginPage) {
				presenceData.details = "Loguje się do swojego konta KOLEO.";
				presenceData.smallImageText = "Loguje się...";
				presenceData.smallImageKey = Assets.Writing;
			} else {
				presenceData.details = "Przegląda swoje konto KOLEO.";
				presenceData.smallImageText = "Przegląda konto...";
			}

			if (currentPath.startsWith("/moje-konto/lost-password")) {
				presenceData.details = "Resetuje swoje hasło do konta KOLEO.";
				presenceData.smallImageText = "Resetuje hasło...";
				presenceData.smallImageKey = Assets.Writing;
			}
		} else if (currentPath.startsWith("/regulamin")) {
			presenceData.details = "Czyta regulamin sklepu KOLEO.";
			presenceData.smallImageText = "Czyta regulamin...";
			presenceData.smallImageKey = Assets.Reading;
		} else if (currentPath.startsWith("/polityka-prywatnosci")) {
			presenceData.details = "Czyta politykę prywatności sklepu KOLEO.";
			presenceData.smallImageText = "Czyta politykę...";
			presenceData.smallImageKey = Assets.Reading;
		} else if (currentPath.startsWith("/francuska-11a")) {
			presenceData.details = "Przegląda informacje kontaktowe KOLEO.";
			presenceData.smallImageText = "Przegląda informacje...";
		} else if (currentPath.startsWith("/sklep-stacjonarny")) {
			presenceData.details = "Przegląda informacje o sklepie stacjonarnym KOLEO.";
			presenceData.smallImageText = "Przegląda informacje...";
		} else if (currentPath.startsWith("/dostawa")) {
			presenceData.details = "Przegląda informacje o dostawie w sklepie KOLEO.";
			presenceData.smallImageText = "Przegląda informacje...";
		} else if (currentPath.startsWith("/interrail-najczesciej-zadawane-pytania")) {
			presenceData.details = "Przegląda najczęściej zadawane pytania o bilety Interrail.";
			presenceData.smallImageText = "Przegląda pytania...";
		} else {
			const productTitle = document.querySelector(".product_title");
			if (productTitle) {
				presenceData.details = `Przegląda produkt${privacySetting ? "" : ` - ${productTitle.textContent}`}.`;
				presenceData.state = `${privacySetting ? "" : `Marka: ${document.querySelector(".pwb-single-product-brands a").textContent} | `}Cena: ${document.querySelector(".price span.woocommerce-Price-amount bdi")?.textContent}`;
				presenceData.smallImageText = "Przegląda produkt...";
				if (!privacySetting) presenceData.buttons = [{ label: "Zobacz produkt", url: href }];
				else presenceData.buttons = [{ label: "Zobacz katalog", url: "https://sklep.koleo.pl/katalog" }];
			} else NoPage(presenceData);
		}
	} else NoPage(presenceData)

	presence.setActivity(presenceData);
});