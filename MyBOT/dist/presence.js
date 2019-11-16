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
