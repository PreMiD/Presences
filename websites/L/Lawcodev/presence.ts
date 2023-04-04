const presence = new Presence({
	clientId: "651439039156715531",
});

presence.on("UpdateData", () => {
	const path = document.location.pathname,
		route = path.split("/"),
		browsingTimestamp = Math.floor(Date.now() / 1000),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/vADndhN.png",
			startTimestamp: browsingTimestamp,
		};

	if (path === "/")
		presenceData.details = "Navegando por la página principal...";
	else {
		switch (route[1]) {
			case "login": {
				presenceData.details = "Entrando a la cuenta";
				break;
			}
			case "logout": {
				presenceData.details = "Saliendo de la sesión";
				break;
			}
			case "register": {
				presenceData.details = "Registrando una nueva cuenta";
				break;
			}
			case "blogs": {
				presenceData.details = "Viendo los artículos";
				break;
			}
			case "my-blogs": {
				presenceData.details = "Viendo sus artículos";
				break;
			}
			case "read-blog": {
				presenceData.details = "Viendo un artículo";
				presenceData.state = `Artículo: ${
					document.querySelector("h1").textContent.length > 15
						? document.querySelector("h1").textContent.slice(0, 15)
						: document.querySelector("h1").textContent
				}...`;

				break;
			}
			case "create-blog": {
				presenceData.details = "Creando un blog";
				break;
			}
			case "messages": {
				presenceData.details = "Chateando";
				presenceData.state = `Con: ${
					document.querySelector(".list-group-item").childNodes[5].childNodes[0]
						.textContent
				}`;

				break;
			}
			case "groups": {
				presenceData.details = "Viendo sus grupos";
				break;
			}
			case "suggested-groups": {
				presenceData.details = "Viendo sugerencias de grupos";
				break;
			}
			case "create-group": {
				presenceData.details = "Creando un grupo";
				break;
			}
			case "pages": {
				presenceData.details = "Viendo las páginas";
				break;
			}
			case "albums": {
				presenceData.details = "Viendo los álbumes";
				break;
			}
			case "create-album": {
				presenceData.details = "Creando un álbum";
				break;
			}
			case "post": {
				presenceData.details = "Viendo un post";
				presenceData.state = `De ${document.querySelector("b").textContent}`;

				break;
			}
			case "setting": {
				presenceData.details = "Cambiando configuraciones";
				presenceData.state = `${
					route[2][0].toUpperCase().includes("-")
						? `${
								route[2][0].toUpperCase().replace(/-+/g, " ") +
								route[2].slice(1)
						  }`
						: `${route[2][0].toUpperCase() + route[2].slice(1)}`
				}`;

				break;
			}
			default: {
				try {
					presenceData.details = "Viendo un usuario o página";
					presenceData.state = `${
						(
							document.querySelectorAll(".title")[0]
								.childNodes[1] as HTMLElement
						).textContent
					}`;
				} catch {
					presenceData.details = "Navegando espacialmente";
					presenceData.state = "404";
				}
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
