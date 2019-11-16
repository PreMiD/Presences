var uvu = new Presence({
    clientId: "645079866710163477",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
uvu.on("UpdateData", () => {
    let doc = document.location, path = doc.pathname, hash = doc.hash, owo = path.split("/"), presenceData = {
        largeImageKey: "maisbos_1_"
    };
    if (path === "/") {
        presenceData.details = "Viendo la página principal";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (owo[1] === "leaderboard") {
        presenceData.details = "Viendo tabla de clasificaciones de usuarios";
        presenceData.state = `Página ${path.split("?page=")[1] ? path.split("?page=")[1] : "1"}`;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (path[1] === "logros") {
        presenceData.details = "Viendo la lista de logros";
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
            presenceData.state = `MyBOT - ${owo[3][0].toUpperCase()}${owo[3].slice(1).replace(/-/g, " ")}`;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (owo[2] === "sqlite") {
            presenceData.state = `SQlite - ${owo[3][0].toUpperCase()}${owo[3].slice(1).replace(/-/g, " ")}`;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (owo[2] === "mybot-op") {
            presenceData.state = `MyBOT OP - ${owo[3][0].toUpperCase()}${owo[3].slice(1).replace(/-/g, " ")}`;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (owo[2] === "glitch") {
            presenceData.state = `Glitch - ${owo[3][0].toUpperCase()}${owo[3].slice(1).replace(/-/g, " ")}`;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (owo[2] === "heroku") {
            presenceData.state = `Heroku - ${owo[3][0].toUpperCase()}${owo[3].slice(1).replace(/-/g, " ")}`;
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
    else if (owo[1] === "app" && owo[2] === "verificador" && owo[3] === "perfil") {
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
    uvu.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLEdBQUcsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTFELEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUN0QixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUN2QixJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFDbkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQ2YsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JCLFlBQVksR0FBaUI7UUFDekIsYUFBYSxFQUFFLFlBQVk7S0FDOUIsQ0FBQztJQUVOLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtRQUNkLFlBQVksQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUM7UUFDcEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDL0M7U0FDRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxhQUFhLEVBQUU7UUFDMUIsWUFBWSxDQUFDLE9BQU8sR0FBRyw2Q0FBNkMsQ0FBQztRQUNyRSxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDekYsWUFBWSxDQUFDLGNBQWMsR0FBRyxh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