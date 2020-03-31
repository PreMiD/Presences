let presence = new Presence({
    clientId: "667275999288754182",
    mediaKeys: false
});
let browsingStamp = Math.floor(Date.now() / 1000);
let manganame;
let chapternumber;
let pagenumber;
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "mwnew"
    };
    if (document.location.href == ("https://mangaworld.biz/")) {
        data.smallImageKey = "search",
            data.smallImageText = "Homepage",
            data.details = "Navigando...",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/about-us/")) {
        data.smallImageKey = "tec",
            data.smallImageText = "Termini e Condizioni",
            data.details = "Guardando i Termini e Condizioni",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/contact/")) {
        data.smallImageKey = "info",
            data.smallImageText = "Info",
            data.details = "Guardando le Info su MangaWorld",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("/user-settings/")) {
        data.smallImageKey = "profile",
            data.smallImageText = "Profilo",
            data.details = "Nel suo profilo",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=bookmark")) {
        data.smallImageKey = "favorite",
            data.smallImageText = "Preferiti",
            data.details = "Nei suoi Preferiti",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=history")) {
        data.smallImageKey = "history",
            data.smallImageText = "Cronologia",
            data.details = "Nella sua Cronologia",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=reader-settings")) {
        data.smallImageKey = "settings",
            data.smallImageText = "Opzioni",
            data.details = "Nelle sue Opzioni",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=account-settings")) {
        data.smallImageKey = "settings",
            data.smallImageText = "Impostazioni",
            data.details = "Nelle sue Impostazioni",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/listing-simple-list/")) {
        data.smallImageKey = "new",
            data.smallImageText = "Nuove Uscito",
            data.details = "Sfogliando le Ultime Uscite",
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.includes("/?s=")) {
        if (document.location.pathname.startsWith("/page/")) {
            data.smallImageKey = "search",
                data.smallImageText = document.title.split("cercato ")[1].split(" - Pagina")[0],
                data.details = "Sta cercando: " + document.title.split("cercato ")[1].split(" - Pagina")[0],
                data.state = document.title.split(" - ")[1].replace(" - MangaWorld", "").split(" di")[0].replace("Pagina", "Pagina:");
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "search",
                data.smallImageText = document.title.split("cercato ")[1].split(" - MangaWorld")[0],
                data.details = "Sta cercando: " + document.title.split("cercato ")[1].split(" - MangaWorld")[0],
                data.state = "Pagina: 1",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/manga-genre/")) {
        if (document.location.pathname.includes("/page/")) {
            data.smallImageKey = "search",
                data.smallImageText = document.title.split(" Archivi")[0],
                data.details = "Naviga nel Genere:",
                data.state = document.title.split(" Archivi")[0] + document.title.split(" Archivi")[1].split(" - MangaWorld")[0].split(" di")[0].replace(" - Pagina ", "｜Pag. "),
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "search",
                data.smallImageText = document.title.split(" Archivi")[0],
                data.details = "Naviga nel Genere:",
                data.state = document.title.split(" Archivi")[0] + "｜Pag. 1",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/manga/")) {
        if (document.location.pathname.match("/capitolo")) {
            manganame = document.title.replace(" - MangaWorld", "").replace(" scan ITA", "");
            if (manganame.includes("- Scan ITA")) {
                manganame = manganame.replace(" - Scan ITA", "");
            }
            ;
            chapternumber = document.location.href.split("capitolo-")[1].split("/p/")[0].replace("-", ".");
            pagenumber = document.location.href.split("/p/")[1].replace("/", "");
            data.smallImageKey = "reading",
                data.smallImageText = "Legge",
                data.details = "Legge: " + manganame,
                data.state = "Capitolo: " + chapternumber + "｜Pag. " + pagenumber,
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.match("/oneshot")) {
            pagenumber = document.location.href.split("/p/")[1].replace("/", "");
            manganame = document.title.replace(" - MangaWorld", "").replace(" scan ITA", "");
            if (manganame.includes("- Scan ITA")) {
                manganame = manganame.replace(" - Scan ITA", "");
            }
            ;
            data.smallImageKey = "reading",
                data.smallImageText = "Legge",
                data.details = "Legge: " + manganame,
                data.state = "Oneshot｜Pag. " + pagenumber,
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.href.endsWith("/?m_orderby=trending")) {
            data.smallImageKey = "trending",
                data.smallImageText = "Tendenze",
                data.details = "Visualizza le Tendenze",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            manganame = document.title.replace(" - MangaWorld", "").replace(" scan ITA", "");
            if (manganame.includes("- Scan ITA")) {
                manganame = manganame.replace(" - Scan ITA", "");
            }
            ;
            data.smallImageKey = "viewing",
                data.smallImageText = "Visualizza",
                data.details = "Visualizza il Manga:",
                data.state = manganame,
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/manga-release/")) {
        data.smallImageKey = "search",
            data.smallImageText = document.title.split("Archivi - ")[0],
            data.details = "Naviga nei manga del " + document.title.split("Archivi - ")[0],
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/manga-artist/")) {
        data.smallImageKey = "search",
            data.smallImageText = document.title.split("Archivi - ")[0],
            data.details = "Visualizza l'Artista:",
            data.state = document.title.split("Archivi - ")[0],
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/manga-author/")) {
        data.smallImageKey = "search",
            data.smallImageText = document.title.split("Archivi - ")[0],
            data.details = "Visualizza l'Autore:",
            data.state = document.title.split("Archivi - ")[0],
            data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxhQUFhLENBQUM7QUFDbEIsSUFBSSxVQUFVLENBQUM7QUFFZixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNqQyxJQUFJLElBQUksR0FBaUI7UUFDckIsYUFBYSxFQUFFLE9BQU87S0FDekIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1FBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUTtZQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVU7WUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ3ZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7U0FDSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUN4RCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUs7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxzQkFBc0I7WUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQ0FBa0M7WUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDdkMsUUFBUSxDQUFDLFdBQVcs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