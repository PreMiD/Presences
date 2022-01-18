const presence = new Presence({
  clientId: "651439039156715531"
});

presence.on("UpdateData", () => {
  const path = document.location.pathname,
    route = path.split("/"),
    browsingTimestamp = Math.floor(Date.now() / 1000),
    presenceData: PresenceData = {
      largeImageKey: "lawco",
      startTimestamp: browsingTimestamp
    };

  if (path === "/")
    presenceData.details = "Navegando por la página principal...";
  else if (route[1] === "login") presenceData.details = "Entrando a la cuenta";
  else if (route[1] === "logout")
    presenceData.details = "Saliendo de la sesión";
  else if (route[1] === "register")
    presenceData.details = "Registrando una nueva cuenta";
  else if (route[1] === "blogs") presenceData.details = "Viendo los artículos";
  else if (route[1] === "my-blogs")
    presenceData.details = "Viendo sus artículos";
  else if (route[1] === "read-blog") {
    presenceData.details = "Viendo un artículo";
    presenceData.state = `Artículo: ${
      document.querySelector("h1").textContent.length > 15
        ? document.querySelector("h1").textContent.slice(0, 15)
        : document.querySelector("h1").textContent
    }...`;
  } else if (route[1] === "create-blog")
    presenceData.details = "Creando un blog";
  else if (route[1] === "messages") {
    presenceData.details = "Chateando";
    presenceData.state = `Con: ${
      document.querySelector(".list-group-item").childNodes[5].childNodes[0]
        .textContent
    }`;
  } else if (route[1] === "groups") presenceData.details = "Viendo sus grupos";
  else if (route[1] === "suggested-groups")
    presenceData.details = "Viendo sugerencias de grupos";
  else if (route[1] === "create-group")
    presenceData.details = "Creando un grupo";
  else if (route[1] === "pages") presenceData.details = "Viendo las páginas";
  else if (route[1] === "albums") presenceData.details = "Viendo los álbumes";
  else if (route[1] === "create-album")
    presenceData.details = "Creando un álbum";
  else if (route[1] === "post") {
    presenceData.details = "Viendo un post";
    presenceData.state = `De ${document.querySelector("b").textContent}`;
  } else if (route[1] === "setting") {
    presenceData.details = "Cambiando configuraciones";
    presenceData.state = `${
      route[2][0].toUpperCase().includes("-")
        ? `${route[2][0].toUpperCase().replace(/-+/g, " ") + route[2].slice(1)}`
        : `${route[2][0].toUpperCase() + route[2].slice(1)}`
    }`;
  } else {
    try {
      presenceData.details = "Viendo un usuario o página";
      presenceData.state = `${
        (document.querySelectorAll(".title")[0].childNodes[1] as HTMLElement)
          .textContent
      }`;
    } catch {
      presenceData.details = "Navegando espacialmente";
      presenceData.state = "404";
    }
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
