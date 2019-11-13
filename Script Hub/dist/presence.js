var uvu = new Presence({
    clientId: "640212093869490214",
    mediaKeys: false
});
uvu.on("UpdateData", () => {
    let doc = document.location, path = doc.pathname, hash = doc.hash, route = hash.split("/"), route2 = hash.split("?id="), browsingStamp = Math.floor(Date.now() / 1000), presenceData = {
        largeImageKey: "scripth",
        startTimestamp: browsingStamp,
    };
    if (path === "/") {
        presenceData.details = "Página principal";
    }
    else if (path === "/docs/") {
        presenceData.details = "Documentación";
        if (route[1] === "home") {
            presenceData.details = "Documentación - Inicio";
        }
        else if (route[1] === "home?id=sobre-nosotros") {
            presenceData.details = "Documentación - Inicio";
            presenceData.state = "Sobre nosotros";
        }
        else if (route[1] === "general") {
            presenceData.details = "Documentación - Inicio";
            if (route[2] === "indice") {
                presenceData.state = "Índice";
            }
            else if (route[2] === "indice?id=listado-y-estatus-de-las-gu%c3%adas") {
                presenceData.state = "Índice - Listado y estatus de las guías";
            }
        }
        else if (route[1] === "guias") {
            presenceData.details = "Documentación - Guías";
            if (route[2] === "creando-aplicaci%C3%B3n-de-discord") {
                let a = route[2], b = `${a[0].toUpperCase()}${a.slice(1).toLocaleLowerCase()}`, c = `${b.includes("-") ? b.replace(/-/g, " ") : b}`, d = c.split("?");
                presenceData.state = `${c.includes("?") ? d[0] : c}`;
            }
            else if (route[2] === "utilizando-git") {
                let a = route[2], b = `${a[0].toUpperCase()}${a.slice(1).toLocaleLowerCase()}`, c = `${b.includes("-") ? b.replace(/-/g, " ") : b}`, d = c.split("?");
                presenceData.state = `${c.includes("?") ? d[0] : c}`;
            }
            else if (route[2] === "alojando-bot-en-heroku") {
                let a = route[2], b = `${a[0].toUpperCase()}${a.slice(1).toLocaleLowerCase()}`, c = `${b.includes("-") ? b.replace(/-/g, " ") : b}`, d = c.split("?");
                presenceData.state = `${c.includes("?") ? d[0] : c}`;
            }
            else if (route[2] === "asignar-base-de-datos-en-heroku") {
                let a = route[2], b = `${a[0].toUpperCase()}${a.slice(1).toLocaleLowerCase()}`, c = `${b.includes("-") ? b.replace(/-/g, " ") : b}`, d = c.split("?");
                presenceData.state = `${c.includes("?") ? d[0] : c}`;
            }
            if (route[2] === "java") {
                presenceData.smallImageKey = "javaowo";
                presenceData.smallImageText = "Java";
                if (route[3] === "jda") {
                    let a = route[4], b = `${a[0].toUpperCase()}${a.slice(1).toLocaleLowerCase()}`, c = `${b.includes("-") ? b.replace(/-/g, " ") : b}`, d = c.split("?");
                    presenceData.state = `JDA - ${c.includes("?") ? d[0] : c}`;
                }
            }
            else if (route[2] === "js") {
                presenceData.smallImageKey = "jsowo";
                presenceData.smallImageText = "JavaScript";
                if (route[3] === "djs") {
                    let a = route[4], b = `${a[0].toUpperCase()}${a.slice(1).toLocaleLowerCase()}`, c = `${b.includes("-") ? b.replace(/-/g, " ") : b}`, d = c.split("?");
                    presenceData.state = `Discord.js - ${c.includes("?") ? d[0] : c}`;
                }
                else if (route[3] === "eris") {
                    let a = route[4], b = `${a[0].toUpperCase()}${a.slice(1).toLocaleLowerCase()}`, c = `${b.includes("-") ? b.replace(/-/g, " ") : b}`, d = c.split("?");
                    presenceData.state = `Eris - ${c.includes("?") ? d[0] : c}`;
                }
            }
            else if (route[2] === "py") {
                presenceData.smallImageKey = "pyuwu";
                presenceData.smallImageText = "Python";
                if (route[3] === "dpy") {
                    let a = route[4], b = `${a[0].toUpperCase()}${a.slice(1).toLocaleLowerCase()}`, c = `${b.includes("-") ? b.replace(/-/g, " ") : b}`, d = c.split("?");
                    presenceData.state = `Discord.py - ${c.includes("?") ? d[0] : c}`;
                }
            }
            else if (route[2] === "rb") {
                presenceData.smallImageKey = "rbuwu";
                presenceData.smallImageText = "Ruby";
                if (route[3] === "drb") {
                    let a = route[4], b = `${a[0].toUpperCase()}${a.slice(1).toLocaleLowerCase()}`, c = `${b.includes("-") ? b.replace(/-/g, " ") : b}`, d = c.split("?");
                    presenceData.state = `Discord.rb - ${c.includes("?") ? d[0] : c}`;
                }
            }
        }
    }
    uvu.setActivity(presenceData);
});
