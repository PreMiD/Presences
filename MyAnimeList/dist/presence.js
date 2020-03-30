var presence = new Presence({
    clientId: "468420510632509473"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        let presenceData = {
            details: "Viewing the homepage",
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/anime.php" ||
        document.location.pathname.startsWith("/topanime") ||
        document.location.pathname.startsWith("/watch")) {
        let presenceData = {
            details: "Looking for anime",
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/manga.php" ||
        document.location.pathname.startsWith("/topmanga") ||
        document.location.pathname.startsWith("/store")) {
        let presenceData = {
            details: "Looking for manga",
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/forum")) {
        let presenceData = {
            details: "Viewing the forums",
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/users.php")) {
        let presenceData = {
            details: "Searching for users",
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/profile")) {
        let presenceData = {
            details: "Viewing a profile",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/animelist")) {
        let presenceData = {
            details: "Viewing an anime list",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/mangalist")) {
        let presenceData = {
            details: "Viewing a manga list",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/anime")) {
        if (document.getElementsByClassName("js-anime-edit-info-button")[0]) {
            let presenceData = {
                details: "Viewing an anime",
                state: document.getElementsByClassName("header-right")[0].parentNode
                    .childNodes[1].textContent,
                largeImageKey: "lg-mal"
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Looking for anime",
                largeImageKey: "lg-mal"
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.startsWith("/manga")) {
        if (document.getElementsByClassName("js-manga-edit-info-button")[0]) {
            let presenceData = {
                details: "Viewing a manga",
                state: document.getElementsByClassName("header-right")[0].parentNode
                    .childNodes[1].textContent,
                largeImageKey: "lg-mal"
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Looking for manga",
                largeImageKey: "lg-mal"
            };
            presence.setActivity(presenceData);
        }
    }
    else {
        let presenceData = {
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3RDLElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLGFBQWEsRUFBRSxRQUFRO1NBQ3ZCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxZQUFZO1FBQzFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDbEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUM5QztRQUNELElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLGFBQWEsRUFBRSxRQUFRO1NBQ3ZCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25DO1NBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxZQUFZO1FBQzFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDbEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUM5QztRQUNELElBQUksWUFBWSxHQUFpQjtZQUNoQyxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLGFB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