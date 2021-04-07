const presence = new Presence({
    clientId: "815515385326469131"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let search: HTMLInputElement, title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    page = window.location.pathname,
    expage = window.location.href;
  if (page === "/") {
    search = document.querySelector(
      "#masthead > div.header-search-wrap > div > form > label > input"
    );
    if (!search || search.value === "") {
      presenceData.details = "Viendo Inicio";
    } else {
      presenceData.details = "Buscando:";
      presenceData.state = search.value;
      presenceData.smallImageKey = "searching";
    }
  } else if (page === "/activity/") {
    presenceData.details = "Leyendo Sobre:";
    presenceData.state = "Actividad";
    presenceData.smallImageKey = "reading";
  } else if (page === "/members/") {
    presenceData.details = "Viendo:";
    presenceData.state = "Miembros";
  } else if (page === "/forums/") {
    presenceData.details = "Viendo:";
    presenceData.state = "Foro";
  } else if (page.includes("/topic/")) {
    title = document.querySelector(
      "#topic-6307-replies > li.bs-item-wrap.bs-header-item.align-items-center.no-hover-effect > div > div.item-title > h1"
    );
    presenceData.details = "Viendo Noticia Sobre:";
    presenceData.state = title.textContent;
  } else if (page.includes("/members/")) {
    const titles = document.querySelector(
      "#item-header-content > div > div > div.flex.align-items-center.member-title-wrap > h2"
    );
    presenceData.details = "Viendo:";
    presenceData.state = `${titles.textContent}'s Perfil`;
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
    presenceData.state = `Contacto`;
  } else if (expage.includes("/wp-login.php?action=lostpassword")) {
    presenceData.details = "Viendo:";
    presenceData.state = `Contraseña Olvidada`;
  } else if (expage === "https://worldhideaway.com/wp-login.php") {
    presenceData.details = "Conectar";
  } else if (page === "/register/") {
    presenceData.details = "Registro";
  } else if (page === "/logros/") {
    presenceData.details = "Viendo:";
    presenceData.state = `Logros`;
  } else if (page === "/events/") {
    presenceData.details = "Viendo:";
    presenceData.state = `Events`;
  } else if (page.includes("/event/")) {
    title = document.querySelector(
      "#tribe-events-content > div.bs-event-heading > div.tribe-event-schedule-long > div.bs-tribe-events-single-heading > h1"
    );
    presenceData.details = "Viendo:";
    presenceData.state = title.textContent;
  } else if (page === "/equipo/") {
    presenceData.details = "Viendo:";
    presenceData.state = `Equipo`;
  } else if (page === "/texto/") {
    presenceData.details = "Viendo:";
    presenceData.state = `Texto`;
  } else if (page === "/gestos/") {
    presenceData.details = "Viendo:";
    presenceData.state = `Gestos`;
  } else if (page === "/stickers/") {
    presenceData.details = "Viendo:";
    presenceData.state = `Pegatinas`;
  } else if (page === "/salas/") {
    presenceData.details = "Viendo:";
    presenceData.state = `Salas`;
  }
  const check = document.querySelector(
    "#main > div > div > section.elementor-section.elementor-top-section.elementor-element.elementor-element-7cf6a1d.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default > div > div > div > div > div > div > div > h1"
  );
  if (check) {
    presenceData.details = "Leyendo:";
    presenceData.state = check.textContent;
    presenceData.smallImageKey = "reading";
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
