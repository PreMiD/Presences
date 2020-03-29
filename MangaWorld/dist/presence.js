var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "667275999288754182",
    mediaKeys: false
});
let browsingStamp = Math.floor(Date.now() / 1000);
let manganame;
let chapternumber;
let pagenumber;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxhQUFhLENBQUM7QUFDbEIsSUFBSSxVQUFVLENBQUM7QUFFZixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsSUFBSSxJQUFJLEdBQWlCO1FBQ3JCLGFBQWEsRUFBRSxPQUFPO0tBQ3pCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMseUJBQXlCLENBQUMsRUFBRTtRQUN2RCxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVE7WUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVO1lBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYztZQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCO1NBQ0ksSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDeEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLO1lBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsc0JBQXNCO1lBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsa0NBQWtDO1lBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLFFBQVEsQ0FBQyxX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