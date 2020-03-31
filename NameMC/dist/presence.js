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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLElBQUksZ0JBQWdCLEdBQWlCO1lBQ25DLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsYUFBYSxFQUFFLGFBQWE7WUFDNUIsY0FBYyxFQUFFLGFBQWE7U0FDOUIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN4QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDcEUsSUFBSSxZQUFZLEdBQWlCO1lBQy9CLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsYUFBYSxFQUFFLGFBQWE7WUFDNUIsY0FBYyxFQUFFLGFBQWE7U0FDOUIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ3BFLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9DLElBQUksWUFBWSxHQUFpQjtnQkFDL0IsT0FBTyxFQUFFLG1CQUFtQjtnQkFDNUIsYUFBYSxFQUFFLGFBQWE7Z0JBQzVCLGNBQWMsRUFBRSxhQUFhO2FBQzlCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEQsSUFBSSxZQUFZLEdBQWlCO2dCQUMvQixPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixhQUFhLEVBQUUsYUFBYTtnQkFDNUIsY0FBYyxFQUFFLGFBQWE7YUFDOUIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN6RCxJQUFJLFlBQVksR0FBaUI7Z0JBQy9CLE9BQU8sRUFBRSxzQkFBc0I7Z0JBQy9CLGFBQWEsRUFBRSxhQUFhO2dCQUM1QixjQUFjLEVBQUUsYUFBYTthQUM5QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFDeEUsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtnQkFDL0QsSUFBSSxZQUFZLEdBQWlCO29CQUMvQixPQUFPLEVBQUUsc0JBQXNCO29CQUMvQixhQUFhLEVBQUUsYUFBYTtvQkFDNUIsY0FBYyxFQUFFLGFBQWE7aUJBQzlCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDTCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELElBQUksWUFBWSxHQUFpQjtvQkFDL0IsT0FBTyxFQUFFLHFCQUFxQixHQUFHLEdBQUcsR0FBRyxNQUFNO29CQUM3QyxhQUFhLEVBQUUsYUFBYTtvQkFDNUIsY0FBYyxFQUFFLGFBQWE7aUJBQzlCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztTQUNGO2FBQU07WUFDTCxJQUFJLFlBQVksR0FBaUI7Z0JBQy9CLE9BQU8sRUFBRSx3QkFBd0I7Z0JBQ2pDLGFBQWEsRUFBRSxhQUFhO2dCQUM1QixjQUFjLEVBQUUsYUFBYTthQUM5QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztLQUNGO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDMUQsSUFBSSxZQUFZLEdBQWlCO1lBQy9CLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGNBQWMsRUFBRSxhQUFhO1NBQzlCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsRUFBRTtRQUN0RSxJQUFJLFlBQVksR0FBaUI7WUFDL0IsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixhQUFhLEVBQUUsYUFBYTtZQUM1QixjQUFjLEVBQUUsYUFBYTtTQUM5QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7UUFDdkUsSUFBSSxZQUFZLEdBQWlCO1lBQy9CLE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsYUFBYSxFQUFFLGFBQWE7WUFDNUIsY0FBYyxFQUFFLGFBQWE7U0FDOUIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUMvRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNoRCxJQUFJLFlBQVksR0FBaUI7Z0JBQy9CLE9BQU8sRUFBRSxzQkFBc0I7Z0JBQy9CLGFBQWEsRUFBRSxhQUFhO2dCQUM1QixjQUFjLEVBQUUsYUFBYTthQUM5QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hELElBQUksWUFBWSxHQUFpQjtnQkFDL0IsT0FBTyxFQUFFLHVCQUF1QjtnQkFDaEMsYUFBYSxFQUFFLGFBQWE7Z0JBQzVCLGNBQWMsRUFBRSxhQUFhO2FBQzlCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUQsSUFBSSxZQUFZLEdBQWlCO2dCQUMvQixPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxhQUFhLEVBQUUsYUFBYTtnQkFDNUIsY0FBYyxFQUFFLGFBQWE7YUFDOUIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4RCxJQUFJLFlBQVksR0FBaUI7Z0JBQy9CLE9BQU8sRUFBRSx3QkFBd0I7Z0JBQ2pDLGFBQWEsRUFBRSxhQUFhO2dCQUM1QixjQUFjLEVBQUUsYUFBYTthQUM5QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFELElBQUksWUFBWSxHQUFpQjtnQkFDL0IsT0FBTyxFQUFFLDhCQUE4QjtnQkFDdkMsYUFBYSxFQUFFLGFBQWE7Z0JBQzVCLGNBQWMsRUFBRSxhQUFhO2FBQzlCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM1RCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLFlBQVksR0FBaUI7WUFDL0IsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixLQUFLLEVBQUUsUUFBUTtZQUNmLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGNBQWMsRUFBRSxhQUFhO1NBQzlCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDNUQsSUFBSSxZQUFZLEdBQWlCO1lBQy9CLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsYUFBYSxFQUFFLGFBQWE7WUFDNUIsY0FBYyxFQUFFLGFBQWE7U0FDOUIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN6RCxJQUFJLFlBQVksR0FBaUI7WUFDL0IsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixhQUFhLEVBQUUsYUFBYTtZQUM1QixjQUFjLEVBQUUsYUFBYTtTQUM5QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3pELElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUN0RSxJQUFJLElBQUksR0FBSSxLQUFxQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxZQUFZLEdBQWlCO1lBQy9CLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsS0FBSyxFQUFFLElBQUksR0FBRyxPQUFPO1lBQ3JCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGNBQWMsRUFBRSxhQUFhO1NBQzlCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDM0QsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksWUFBWSxHQUFpQjtZQUMvQixPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLEtBQUssRUFBRSxNQUFNO1lBQ2IsYUFBYSxFQUFFLGFBQWE7WUFDNUIsY0FBYyxFQUFFLGFBQWE7U0FDOUIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUMzRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUksWUFBWSxHQUFpQjtZQUMvQixPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLEtBQUssRUFBRSxVQUFVO1lBQ2pCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGNBQWMsRUFBRSxhQUFhO1NBQzlCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==