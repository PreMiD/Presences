const presence = new Presence({
    clientId: "645079866710163477"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const doc = document.location, path = doc.pathname, hash = doc.hash, owo = path.split("/"), presenceData = {
        largeImageKey: "maisbos_1_"
    };
    if (path === "/") {
        if (document.querySelector(".tab-item.active").id == "homeLink") {
            presenceData.details = "Viendo la página principal";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.querySelector(".tab-item.active").id == "guideLink") {
            presenceData.details = "Viendo la lista de guías";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.querySelector(".tab-item.active").id == "toolsLink") {
            presenceData.details = "Viendo la lista de herramientas";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.querySelector(".tab-item.active").id == "otherLink") {
            presenceData.details = `Viendo la lista de otros`;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (owo[1] === "leaderboard") {
        presenceData.details = "Viendo tabla de clasificaciones de usuarios";
        presenceData.state = `Página ${path.split("?page=")[1] ? path.split("?page=")[1] : "1"}`;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (owo[1] === "logros") {
        presenceData.details = "Viendo la lista de logros";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (owo[1] === "logro") {
        presenceData.details = `Viendo un logro (#${document
            .querySelector("kbd")
            .innerHTML.slice(10)})`;
        presenceData.state = `${document.querySelector(".card-title").innerHTML}`;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (owo[1] === "perfil") {
        if (owo[2] === "editar-perfil") {
            presenceData.details = "Editando su perfil";
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Viendo su perfil";
            presenceData.state = document.querySelector(".username").innerHTML.trim();
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (owo[1] === "guia") {
        presenceData.details = "Viendo una guía";
        if (owo[2] === "mybot") {
            presenceData.state = `MyBOT - ${document.querySelector("h1").innerText}`;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (owo[2] === "sqlite") {
            presenceData.state = `SQlite - ${document.querySelector("h1").innerText}`;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (owo[2] === "mybot-op") {
            presenceData.state = `MyBOT OP - ${document.querySelector("h1").innerText}`;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (owo[2] === "glitch") {
            presenceData.state = `Glitch - ${document.querySelector("h1").innerText}`;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (owo[2] === "heroku") {
            presenceData.state = `Heroku - ${document.querySelector("h1").innerText}`;
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.state = "Guía desconocida";
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (owo[1] === "u") {
        presenceData.details = "Viendo un perfil";
        presenceData.state = document.querySelector(".username").innerHTML.trim();
        presenceData.startTimestamp = browsingStamp;
    }
    else if (owo[1] === "mybotlist") {
        if (owo[2] === "bot") {
            if (owo[3] === "add") {
                presenceData.details = "Añadiendo un bot";
                presenceData.startTimestamp = browsingStamp;
            }
            else {
                presenceData.details = "Viendo un bot";
                presenceData.state = document.querySelector(".card-title").innerHTML;
                presenceData.startTimestamp = browsingStamp;
            }
        }
        else if (owo[2] === "user") {
            presenceData.details = "Viendo un usuario";
            presenceData.state = document.querySelectorAll(".card-title")[1].innerHTML;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (owo[2] === "me") {
            if (owo[3] === "edit") {
                presenceData.details = "Editando su perfil";
                presenceData.startTimestamp = browsingStamp;
            }
            else {
                presenceData.details = "Viendo su perfil";
                presenceData.startTimestamp = browsingStamp;
            }
        }
        else {
            presenceData.details = "Viendo la lista de bots";
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (owo[1] === "app" &&
        owo[2] === "verificador" &&
        owo[3] === "perfil") {
        if (hash === "#modal-reglas") {
            presenceData.details = "Leyendo reglas de la comunidad";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (hash === "#clave") {
            presenceData.details = "Obteniendo clave de verificación";
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Verificando usuario";
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (owo[1] === "comunidad") {
        if (owo[2] === "reglas") {
            presenceData.details = "Leyendo reglas de la comunidad";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (owo[2] === "videos") {
            presenceData.details = "Viendo videos de la comunidad";
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else {
        presenceData.details = "Navegando...";
        presenceData.startTimestamp = browsingStamp;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUMzQixJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFDbkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQ2YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JCLFlBQVksR0FBaUI7UUFDM0IsYUFBYSxFQUFFLFlBQVk7S0FDNUIsQ0FBQztJQUNKLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtRQUNoQixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLElBQUksVUFBVSxFQUFFO1lBQy9ELFlBQVksQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUM7WUFDcEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7U0FDN0M7YUFBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLElBQUksV0FBVyxFQUFFO1lBQ3ZFLFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7WUFDbEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7U0FDN0M7YUFBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLElBQUksV0FBVyxFQUFFO1lBQ3ZFLFlBQVksQ0FB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