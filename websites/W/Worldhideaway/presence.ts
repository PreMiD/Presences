const presence = new Presence({
		clientId: "815515385326469131",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/P3S7UhZ.png",
			startTimestamp: browsingTimestamp,
		},
		search = document.querySelector<HTMLInputElement>(
			"#masthead > div.header-search-wrap > div > form > label > input"
		),
		{ href, pathname } = document.location,
		[privacy, buttons, covers] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]);
	if (privacy) presenceData.details = "Hojeada";
	else {
		switch (pathname.split("/")[1]) {
			case "": {
				if (search?.value) {
					presenceData.details = "Buscando";
					presenceData.state = search.value;
					presenceData.smallImageKey = "searching";
				} else presenceData.details = "Viendo Inicio";

				break;
			}
			case "register": {
				presenceData.details = "Registro";
				break;
			}
			case "logros": {
				presenceData.details = "Viendo logros";
				presenceData.buttons = [
					{
						label: "Viendo Logros",
						url: href,
					},
				];
				break;
			}
			case "events": {
				presenceData.details = "Viendo events";
				presenceData.buttons = [
					{
						label: "Viendo Events",
						url: href,
					},
				];
				break;
			}
			case "activity": {
				presenceData.details = "Leyendo sobre";
				presenceData.state = "Actividad";
				presenceData.smallImageKey = "reading";
				presenceData.buttons = [
					{
						label: "Leyendo Sobre",
						url: href,
					},
				];

				break;
			}
			case "topic": {
				presenceData.details = "Viendo noticia sobre";
				presenceData.state = document.querySelector(
					"#topic-6307-replies > li.bs-item-wrap.bs-header-item.align-items-center.no-hover-effect > div > div.item-title > h1"
				).textContent;
				presenceData.buttons = [
					{
						label: "Viendo Noticia Sobre",
						url: href,
					},
				];
				break;
			}
			case "members": {
				if (document.querySelector('[id="members-all"]')) {
					presenceData.details = "Viendo miembros";
					presenceData.buttons = [
						{
							label: "Viendo Miembros",
							url: href,
						},
					];
				} else {
					presenceData.buttons = [
						{
							label: "Viendo Miembro",
							url: href,
						},
					];
					presenceData.largeImageKey = document
						.querySelector('[alt*="Profile photo of"]')
						.getAttribute("src");
					presenceData.details = `Viendo ${
						document.querySelector(
							"#item-header-content > div > div > div.flex.align-items-center.member-title-wrap > h2"
						)?.textContent
					}'s Perfil`;
				}
				break;
			}
			case "category": {
				presenceData.buttons = [
					{
						label: "Viendo Categoría",
						url: href,
					},
				];
				presenceData.details = "Viendo categoría";
				presenceData.state = document.querySelector(
					"#main > header > h1 > span"
				).textContent;
				break;
			}
			case "faqs": {
				presenceData.buttons = [
					{
						label: "Leyendo FAQ",
						url: href,
					},
				];
				presenceData.details = "Leyendo FAQ";
				presenceData.smallImageKey = "reading";
				break;
			}
			case "contacto": {
				presenceData.buttons = [
					{
						label: "Viendo Contacto",
						url: href,
					},
				];
				presenceData.details = "Viendo contacto";
				break;
			}
			default: {
				const check = document.querySelector(
						"#main > div > div > section.elementor-section.elementor-top-section.elementor-element.elementor-element-7cf6a1d.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default > div > div > div > div > div > div > div > h1"
					),
					active =
						document.querySelector('[aria-current="page"]') ??
						document.querySelector('[class="current_page_item"]');

				if (check) {
					presenceData.buttons = [
						{
							label: "Leyendo",
							url: href,
						},
					];
					presenceData.details = `Leyendo ${check.textContent}`;
					presenceData.smallImageKey = "reading";
				} else if (active) {
					presenceData.buttons = [
						{
							label: "Viendo",
							url: href,
						},
					];
					presenceData.details = `Viendo ${active.textContent}`;
				} else presenceData.details = "Página no encontrada";
				break;
			}
		}
	}

	if (!buttons) delete presenceData.buttons;
	if (!covers) presenceData.largeImageKey = "https://i.imgur.com/P3S7UhZ.png";
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
