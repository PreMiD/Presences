const presence = new Presence({
		clientId: "815515385326469131",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let search: HTMLInputElement, title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		page = window.location.pathname,
		expage = window.location.href;
	switch (page) {
		case "/": {
			search = document.querySelector(
				"#masthead > div.header-search-wrap > div > form > label > input"
			);
			if (!search || search.value === "")
				presenceData.details = "Viendo Inicio";
			else {
				presenceData.details = "Buscando:";
				presenceData.state = search.value;
				presenceData.smallImageKey = "searching";
			}

			break;
		}
		case "/activity/": {
			presenceData.details = "Leyendo Sobre:";
			presenceData.state = "Actividad";
			presenceData.smallImageKey = "reading";

			break;
		}
		case "/members/": {
			presenceData.details = "Viendo:";
			presenceData.state = "Miembros";

			break;
		}
		case "/forums/": {
			presenceData.details = "Viendo:";
			presenceData.state = "Foro";

			break;
		}
		default:
			if (page.includes("/topic/")) {
				title = document.querySelector(
					"#topic-6307-replies > li.bs-item-wrap.bs-header-item.align-items-center.no-hover-effect > div > div.item-title > h1"
				);
				presenceData.details = "Viendo Noticia Sobre:";
				presenceData.state = title.textContent;
			} else if (page.includes("/members/")) {
				presenceData.details = "Viendo:";
				presenceData.state = `${
					document.querySelector(
						"#item-header-content > div > div > div.flex.align-items-center.member-title-wrap > h2"
					).textContent
				}'s Perfil`;
			} else if (page.includes("/category/")) {
				title = document.querySelector("#main > header > h1 > span");
				presenceData.details = "Viendo Categoría:";
				presenceData.state = title.textContent;
			} else if (page === "/faqs/") {
				presenceData.details = "Leyendo:";
				presenceData.state = "FAQ";
				presenceData.smallImageKey = "reading";
			} else if (page === "/contacto/") {
				presenceData.details = "Viendo:";
				presenceData.state = "Contacto";
			} else if (expage.includes("/wp-login.php?action=lostpassword")) {
				presenceData.details = "Viendo:";
				presenceData.state = "Contraseña Olvidada";
			} else if (expage === "https://worldhideaway.com/wp-login.php")
				presenceData.details = "Conectar";
			else {
				switch (page) {
					case "/register/": {
						presenceData.details = "Registro";
						break;
					}
					case "/logros/": {
						presenceData.details = "Viendo:";
						presenceData.state = "Logros";

						break;
					}
					case "/events/": {
						presenceData.details = "Viendo:";
						presenceData.state = "Events";

						break;
					}
					default:
						if (page.includes("/event/")) {
							title = document.querySelector(
								"#tribe-events-content > div.bs-event-heading > div.tribe-event-schedule-long > div.bs-tribe-events-single-heading > h1"
							);
							presenceData.details = "Viendo:";
							presenceData.state = title.textContent;
						} else {
							switch (page) {
								case "/equipo/": {
									presenceData.details = "Viendo:";
									presenceData.state = "Equipo";

									break;
								}
								case "/texto/": {
									presenceData.details = "Viendo:";
									presenceData.state = "Texto";

									break;
								}
								case "/gestos/": {
									presenceData.details = "Viendo:";
									presenceData.state = "Gestos";

									break;
								}
								case "/stickers/": {
									presenceData.details = "Viendo:";
									presenceData.state = "Pegatinas";

									break;
								}
								case "/salas/": {
									presenceData.details = "Viendo:";
									presenceData.state = "Salas";

									break;
								}
								// No default
							}
						}
				}
			}
	}
	const check = document.querySelector(
		"#main > div > div > section.elementor-section.elementor-top-section.elementor-element.elementor-element-7cf6a1d.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default > div > div > div > div > div > div > div > h1"
	);
	if (check) {
		presenceData.details = "Leyendo:";
		presenceData.state = check.textContent;
		presenceData.smallImageKey = "reading";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
