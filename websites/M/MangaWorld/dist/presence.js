const presence = new Presence({
    clientId: "667275999288754182"
});
const browsingStamp = Math.floor(Date.now() / 1000);
let manganame;
let chapternumber;
let pagenumber;
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "mwnew"
    };
    if (document.location.href == "https://mangaworld.tv/") {
        data.smallImageKey = "search";
        data.smallImageText = "Homepage";
        data.details = "Navigando...";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/about-us/")) {
        data.smallImageKey = "tec";
        data.smallImageText = "Termini e Condizioni";
        data.details = "Guardando i Termini e Condizioni";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/contact/")) {
        data.smallImageKey = "info";
        data.smallImageText = "Info";
        data.details = "Guardando le Info su MangaWorld";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("/user-settings/")) {
        data.smallImageKey = "profile";
        data.smallImageText = "Profilo";
        data.details = "Nel suo profilo";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=bookmark")) {
        data.smallImageKey = "favorite";
        data.smallImageText = "Preferiti";
        data.details = "Nei suoi Preferiti";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=history")) {
        data.smallImageKey = "history";
        data.smallImageText = "Cronologia";
        data.details = "Nella sua Cronologia";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=reader-settings")) {
        data.smallImageKey = "settings";
        data.smallImageText = "Opzioni";
        data.details = "Nelle sue Opzioni";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.endsWith("?tab=account-settings")) {
        data.smallImageKey = "settings";
        data.smallImageText = "Impostazioni";
        data.details = "Nelle sue Impostazioni";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.endsWith("/listing-simple-list/")) {
        data.smallImageKey = "new";
        data.smallImageText = "Nuove Uscito";
        data.details = "Sfogliando le Ultime Uscite";
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.href.includes("/?s=")) {
        if (document.location.pathname.startsWith("/page/")) {
            data.smallImageKey = "search";
            data.smallImageText = document.title
                .split("cercato ")[1]
                .split(" - Pagina")[0];
            data.details =
                "Sta cercando: " +
                    document.title.split("cercato ")[1].split(" - Pagina")[0];
            data.state = document.title
                .split(" - ")[1]
                .replace(" - MangaWorld", "")
                .split(" di")[0]
                .replace("Pagina", "Pagina:");
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "search";
            data.smallImageText = document.title
                .split("cercato ")[1]
                .split(" - MangaWorld")[0];
            data.details =
                "Sta cercando: " +
                    document.title.split("cercato ")[1].split(" - MangaWorld")[0];
            data.state = "Pagina: 1";
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/manga-genre/")) {
        if (document.location.pathname.includes("/page/")) {
            data.smallImageKey = "search";
            data.smallImageText = document.title.split(" Archivi")[0];
            data.details = "Naviga nel Genere:";
            data.state =
                document.title.split(" Archivi")[0] +
                    document.title
                        .split(" Archivi")[1]
                        .split(" - MangaWorld")[0]
                        .split(" di")[0]
                        .replace(" - Pagina ", "｜Pag. ");
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "search";
            data.smallImageText = document.title.split(" Archivi")[0];
            data.details = "Naviga nel Genere:";
            data.state = document.title.split(" Archivi")[0] + "｜Pag. 1";
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/manga/")) {
        if (document.location.pathname.match("/capitolo")) {
            manganame = document.title
                .replace(" - MangaWorld", "")
                .replace(" scan ITA", "");
            if (manganame.includes("- Scan ITA")) {
                manganame = manganame.replace(" - Scan ITA", "");
            }
            chapternumber = document.location.href
                .split("capitolo-")[1]
                .split("/p/")[0]
                .replace("-", ".");
            pagenumber = document.location.href.split("/p/")[1].replace("/", "");
            data.smallImageKey = "reading";
            data.smallImageText = "Legge";
            data.details = "Legge: " + manganame;
            data.state = "Capitolo: " + chapternumber + "｜Pag. " + pagenumber;
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.match("/oneshot")) {
            pagenumber = document.location.href.split("/p/")[1].replace("/", "");
            manganame = document.title
                .replace(" - MangaWorld", "")
                .replace(" scan ITA", "");
            if (manganame.includes("- Scan ITA")) {
                manganame = manganame.replace(" - Scan ITA", "");
            }
            data.smallImageKey = "reading";
            data.smallImageText = "Legge";
            data.details = "Legge: " + manganame;
            data.state = "Oneshot｜Pag. " + pagenumber;
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.href.endsWith("/?m_orderby=trending")) {
            data.smallImageKey = "trending";
            data.smallImageText = "Tendenze";
            data.details = "Visualizza le Tendenze";
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            manganame = document.title
                .replace(" - MangaWorld", "")
                .replace(" scan ITA", "");
            if (manganame.includes("- Scan ITA")) {
                manganame = manganame.replace(" - Scan ITA", "");
            }
            data.smallImageKey = "viewing";
            data.smallImageText = "Visualizza";
            data.details = "Visualizza il Manga:";
            data.state = manganame;
            data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else if (document.location.pathname.startsWith("/manga-release/")) {
        data.smallImageKey = "search";
        data.smallImageText = document.title.split("Archivi - ")[0];
        data.details =
            "Naviga nei manga del " + document.title.split("Archivi - ")[0];
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/manga-artist/")) {
        data.smallImageKey = "search";
        data.smallImageText = document.title.split("Archivi - ")[0];
        data.details = "Visualizza l'Artista:";
        data.state = document.title.split("Archivi - ")[0];
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/manga-author/")) {
        data.smallImageKey = "search";
        data.smallImageText = document.title.split("Archivi - ")[0];
        data.details = "Visualizza l'Autore:";
        data.state = document.title.split("Archivi - ")[0];
        data.startTimestamp = browsingStamp;
        presence.setActivity(data);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BELElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxhQUFhLENBQUM7QUFDbEIsSUFBSSxVQUFVLENBQUM7QUFFZixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBaUI7UUFDekIsYUFBYSxFQUFFLE9BQU87S0FDdkIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksd0JBQXdCLEVBQUU7UUFDdEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDcEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzVELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsc0JBQXNCLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQ0FBa0MsQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUNwQyxRQUFRLENBQUMsV0FBVyxD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