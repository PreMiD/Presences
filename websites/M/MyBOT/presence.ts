const presence = new Presence({
    clientId: "719604498389270599"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const route = document.location.pathname.split("/"),
    data: PresenceData = {
      largeImageKey: "mybot",
      startTimestamp: browsingStamp
    };

  if (!route[1]) data.details = "Viendo la página principal";
  else if (route[1] === "guias") data.details = "Viendo las guías";
  else if (route[1] === "guia") {
    data.details = "Viendo la guía:";
    if (route[2] === "mybot") data.state = "MyBOT";
    else if (route[2] === "sqlite") data.state = "SQLite";
    else if (route[2] === "mybot-op") data.state = "MyBOT OP";
    else {
      data.state = route[2]
        .replace(/-/g, "")
        .replace(/^[a-z]/i, (c) => c.toUpperCase());
    }
  } else if (route[1] === "tools") {
    data.details = "Viendo las herramientas";
    data.state = "de desarrollo";
  } else if (route[1] === "otros") data.details = "Viendo otras guías";
  else if (route[1] === "logros") data.details = "Viendo los logros";
  else if (route[1] === "logro") {
    data.details = "Viendo el logro:";
    data.state = document.querySelector(".card-title.text-bold.mb-2").innerHTML;
  } else if (route[1] === "team") {
    if (!route[2]) data.details = "Viendo al equipo";
    else if (route[2] === "roles") data.details = "Viendo los roles";
    else if (route[2] === "banderas") data.details = "Viendo las banderas";
    else if (route[2] === "reglas") data.details = "Viendo las reglas";
  } else if (route[1] === "leaderboard")
    data.details = "Viendo el top de usuarios";
  else if (route[1] === "puntos") {
    data.details = "Viendo acciones para";
    data.state = "conseguir puntos";
  } else if (route[1] === "mybotlist") {
    if (!route[2]) data.details = "Viendo MyBOT List";
    else if (route[2] === "bot") {
      if (!route[3]) {
        data.details = "Viendo el bot:";
        data.state = document.querySelector(".card-title").innerHTML;
      } else if (route[3] === "add") data.details = "Añadiendo un bot";
    } else if (route[2].startsWith("tag")) {
      data.details = "Viendo bots de:";
      data.state = route[2]
        .split("?c=")[1]
        .replace(/^[a-z]/i, (c) => c.toUpperCase());
    } else if (route[2] === "me") data.details = "Viendo su perfil";
    else if (route[2] === "edit") data.details = "Editando un bot";
  } else if (route[1] === "codes") data.details = "Viendo los códigos";
  else if (route[1] === "code") {
    data.details = "Viendo el código:";
    data.state = document.querySelector(".text-dark").innerHTML.slice(2);
  } else if (route[1] === "comunidad") {
    if (route[2] === "videos") {
      data.details = "Viendo videos de la";
      data.state = "comunidad";
    }
  } else if (route[1] === "publicidad") data.details = "Añadiendo publicidad";
  else if (route[1] === "perfil") {
    if (!route[2]) data.details = "Viendo su perfil";
    else if (route[2] === "editar-perfil") data.details = "Editando su perfil";
  } else if (route[1] === "u") {
    data.details = "Viendo el perfil de:";
    data.state = document.querySelector(".username").innerHTML.trim();
  }

  presence.setActivity(data);
});
