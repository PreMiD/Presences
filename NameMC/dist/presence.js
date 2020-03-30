var presence = new Presence({
    clientId: "617622829978091530"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        let homepagePresence = {
            details: "Viewing the homepage",
            largeImageKey: "namemc-logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(homepagePresence);
    }
    else if (document.location.pathname.startsWith("/minecraft-names")) {
        let presenceData = {
            details: "Viewing Upcoming Names",
            largeImageKey: "namemc-logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/minecraft-skins")) {
        if (document.location.pathname.endsWith("/top")) {
            let presenceData = {
                details: "Viewing Top Skins",
                largeImageKey: "namemc-logo",
                startTimestamp: browsingStamp
            };
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("/new")) {
            let presenceData = {
                details: "Viewing New Skins",
                largeImageKey: "namemc-logo",
                startTimestamp: browsingStamp
            };
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("/random")) {
            let presenceData = {
                details: "Viewing Random Skins",
                largeImageKey: "namemc-logo",
                startTimestamp: browsingStamp
            };
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.startsWith("/minecraft-skins/tag")) {
            if (document.location.pathname.endsWith("/minecraft-skins/tag")) {
                let presenceData = {
                    details: "Viewing Tagged Skins",
                    largeImageKey: "namemc-logo",
                    startTimestamp: browsingStamp
                };
                presence.setActivity(presenceData);
            }
            else {
                var tag = document.location.pathname.split("/")[3];
                let presenceData = {
                    details: "Viewing Skins with " + tag + " Tag",
                    largeImageKey: "namemc-logo",
                    startTimestamp: browsingStamp
                };
                presence.setActivity(presenceData);
            }
        }
        else {
            let presenceData = {
                details: "Viewing Trending Skins",
                largeImageKey: "namemc-logo",
                startTimestamp: browsingStamp
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.startsWith("/capes")) {
        let presenceData = {
            details: "Viewing Capes",
            largeImageKey: "namemc-logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/minecraft-servers")) {
        let presenceData = {
            details: "Viewing Servers",
            largeImageKey: "namemc-logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/claim-your-profile")) {
        let presenceData = {
            details: "Viewing How To Claim Profile",
            largeImageKey: "namemc-logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/my-profile")) {
        if (document.location.pathname.endsWith("/info")) {
            let presenceData = {
                details: "Editing Profile Info",
                largeImageKey: "namemc-logo",
                startTimestamp: browsingStamp
            };
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("/skins")) {
            let presenceData = {
                details: "Viewing Profile Skins",
                largeImageKey: "namemc-logo",
                startTimestamp: browsingStamp
            };
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("/friends")) {
            let presenceData = {
                details: "Viewing Profile Friends",
                largeImageKey: "namemc-logo",
                startTimestamp: browsingStamp
            };
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("/emoji")) {
            let presenceData = {
                details: "Viewing Profile Emojis",
                largeImageKey: "namemc-logo",
                startTimestamp: browsingStamp
            };
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("/abandon")) {
            let presenceData = {
                details: "Viewing Profile Abandon Page",
                largeImageKey: "namemc-logo",
                startTimestamp: browsingStamp
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.startsWith("/profile")) {
        var userlink = document.location.pathname.split("/")[2];
        var username = userlink.split(".")[0];
        let presenceData = {
            details: "Viewing a Profile",
            state: username,
            largeImageKey: "namemc-logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/privacy")) {
        let presenceData = {
            details: "Viewing Privacy Policy",
            largeImageKey: "namemc-logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/skin")) {
        let presenceData = {
            details: "Viewing a Skin",
            largeImageKey: "namemc-logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/cape")) {
        var title = document.querySelector(".default-skin main.container h1");
        var cape = title.innerHTML.split("<")[0];
        let presenceData = {
            details: "Viewing a Cape",
            state: cape + " Cape",
            largeImageKey: "namemc-logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/server")) {
        var server = document.location.pathname.split("/")[2];
        let presenceData = {
            details: "Viewing a Server",
            state: server,
            largeImageKey: "namemc-logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/search")) {
        var searchURL = new URL(document.location.href);
        var searchuser = searchURL.searchParams.get("q");
        let presenceData = {
            details: "Searching for a Profile",
            state: searchuser,
            largeImageKey: "namemc-logo",
            startTimestamp: browsingStamp
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3RDLElBQUksZ0JBQWdCLEdBQWlCO1lBQ3BDLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsYUFBYSxFQUFFLGFBQWE7WUFDNUIsY0FBYyxFQUFFLGFBQWE7U0FDN0IsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN2QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDckUsSUFBSSxZQUFZLEdBQWlCO1lBQ2hDLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsYUFBYSxFQUFFLGFBQWE7WUFDNUIsY0FBYyxFQUFFLGFBQWE7U0FDN0IsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ3JFLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hELElBQUksWUFBWSxHQUFpQjtnQkFDaEMsT0FBTyxFQUFFLG1CQUFtQjtnQkFD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