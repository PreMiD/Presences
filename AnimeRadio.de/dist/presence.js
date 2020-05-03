const presence = new Presence({
    clientId: "687352219598585905"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "animeradio"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.host == "www.animeradio.de") {
        if (document.location.pathname.includes("/webplayer/")) {
            presenceData.details = "Hört AnimeRadio";
            presenceData.smallImageKey = "play";
        }
        else if (document.URL.includes("top100")) {
            presenceData.details = "Betrachtet Top100";
        }
        else if (document.URL.includes("events")) {
            presenceData.details = "Betrachtet Events";
        }
        else if (document.URL.includes("programm")) {
            presenceData.details = "Betrachtet Programm";
        }
    }
    else if (document.location.host == "www.animetreff.de") {
        presenceData.largeImageKey = "animetreff";
        if (document.URL.includes("/CustomPage/?id=1")) {
            presenceData.details = "Chattet";
            presenceData.smallImageKey = "writing";
        }
        else if (document.location.pathname.includes("/gallery/")) {
            if (document.location.pathname.includes("/Image/")) {
                presenceData.details = "Betrachtet Bild";
                presenceData.state = document.querySelector("#content > header > h1").textContent;
            }
            else if (document.location.pathname.includes("/Album/")) {
                presenceData.details = "Betrachtet Album";
                presenceData.state = document
                    .querySelector("#content > header > h1")
                    .textContent.replace(document.querySelector("#content > header > h1 > span").textContent, "");
            }
            else if (document.location.pathname.includes("/AlbumList/")) {
                presenceData.details = "Betrachtet Galerie";
            }
        }
        else if (document.location.pathname.includes("/calendar/")) {
            presenceData.details = "Betrachtet Kalender";
            presenceData.state = document.querySelector("#content > header > h1").textContent;
        }
        else if (document.location.pathname.includes("/MemberList/")) {
            presenceData.details = "Betrachtet Mitglieder";
        }
        else if (document.location.pathname.includes("/User/")) {
            presenceData.details = "Betrachtet Nutzer";
        }
        else if (document.location.pathname.includes("/Thread/")) {
            presenceData.details = "Liest Beiträge:";
            presenceData.state = document.querySelector("#content > header > h1 > a").textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/Board/")) {
            presenceData.details =
                "Betrachtet " +
                    document.querySelector("#content > header > h1 > a").textContent;
        }
        else if (document.location.pathname.includes("/Search/")) {
            if (document.querySelector("#errorMessage") !== null) {
                presenceData.details =
                    "Sucht nach " +
                        document
                            .querySelector("#errorMessage")
                            .textContent.split("„")[1]
                            .split("“")[0];
            }
            else {
                presenceData.details =
                    "Sucht nach " +
                        document.querySelector("#content > header > p > strong").textContent;
            }
        }
        else {
            presenceData.details = "Stöbert in den Foren";
        }
    }
    else if (document.location.host == "www.animenews.de") {
        presenceData.largeImageKey = "animenews";
        presenceData.details = "Liest Neuigkeiten";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.host == "www.animekino.de") {
        presenceData.largeImageKey = "animekino";
        if (document.URL.includes("partner")) {
            presenceData.details = "Betrachtet Partner";
        }
        else if (document.URL.includes("kontakt")) {
            presenceData.details = "Betrachtet Kontakt";
        }
        else if (document.URL.includes("ort")) {
            presenceData.details = "Betrachtet Ort";
        }
        else if (document.URL.includes("filme")) {
            presenceData.details = "Betrachtet Filmvorstellungen";
        }
        else {
            presenceData.details = "Betrachtet Kino";
        }
    }
    else if (document.location.host == "www.animehamburg.de") {
        if (document.URL.includes("partner")) {
            presenceData.details = "Betrachtet Partner";
        }
        else if (document.URL.includes("kontakt")) {
            presenceData.details = "Betrachtet Kontakt";
        }
        else if (document.URL.includes("ort")) {
            presenceData.details = "Betrachtet Ort";
        }
        else if (document.URL.includes("programm")) {
            presenceData.details = "Betrachtet Programm";
        }
        else {
            presenceData.details = "Betrachtet Hanmaco";
        }
    }
    else if (document.location.host == "www.animekultur.de") {
        if (document.URL.includes("joinus")) {
            presenceData.details = "Will ein Mitglied werden";
            presenceData.smallImageKey = "writing";
        }
        else if (document.URL.includes("projekte")) {
            presenceData.details = "Betrachtet Projekte";
        }
        else if (document.URL.includes("pressemitteilungen")) {
            presenceData.details = "Betrachtet Pressemitteilungen";
        }
        else if (document.URL.includes("marketing")) {
            presenceData.details = "Betrachtet Marketing";
        }
        else if (document.URL.includes("kontakt")) {
            presenceData.details = "Betrachtet Kontakt";
        }
        else if (document.URL.includes("hajime")) {
            presenceData.details = "Betrachtet Hanjime! Anime-Con";
        }
        else {
            presenceData.details = "Betrachtet Kultur / Über uns";
        }
    }
    else if (document.location.host == "www.animetickets.de") {
        if (document.location.pathname.includes("/event/")) {
            presenceData.details = "Betrachtet Eventtickets für";
            presenceData.state = document.querySelector("body > div > div > div > div:nth-child(2) > span").textContent;
        }
        else if (document.location.pathname.includes("/events")) {
            presenceData.details = "Betrachtet Events";
        }
        else if (document.location.pathname.includes("contact")) {
            presenceData.details = "Betrachtet Kontakt";
        }
        else if (document.location.pathname.includes("order")) {
            presenceData.details = "Betrachtet Order";
        }
    }
    else if (document.location.host == "www.animemesse.de") {
        presenceData.largeImageKey = "animemesse";
        presenceData.details =
            "Betrachtet " +
                document.querySelector("#content > li.active > a").textContent;
    }
    else if (document.location.host == "www.animefanshop.de") {
        presenceData.largeImageKey = "animefanshop";
        const product = document.querySelector(".product-info-title-desktop > span");
        if (product !== null) {
            presenceData.details = "Betrachtet Produkt:";
            presenceData.state = product.textContent;
        }
        else if (document.location.pathname.includes("/advanced_search_result")) {
            presenceData.details =
                "Sucht nach " +
                    document
                        .querySelector("#main > div > h1")
                        .textContent.split('"')[1]
                        .split('"')[0];
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsWUFBWTtLQUM1QixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxtQkFBbUIsRUFBRTtRQUNqRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1lBQ3pDLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1NBQ3JDO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxQyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1NBQzVDO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxQyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1NBQzVDO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1NBQzlDO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLG1CQUFtQixFQUFFO1FBQ3hELFlBQVksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1FBQzFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUM5QyxZQUFZLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUNqQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUN4QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO2dCQUN6QyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3pDLHdCQUF3QixDQUN6QixDQUFDLFdBQVcsQ0FBQzthQUNmO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN6RCxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO2dCQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVE7cUJBQzFCLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztxQkFDdkMsV0FBVyxDQUFDLE9BQU8sQ0FDbEIsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLFdBQVcsRUFDbkUsRUFBRSxDQUNILENBQUM7YUFDTDtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDN0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQzthQUM3QztTQUNGO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDNUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztZQUM3QyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3pDLHdCQUF3QixDQUN6QixDQUFDLFdBQVcsQ0FBQztTQUNmO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDOUQsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztTQUNoRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hELFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDNUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMxRCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1lBQ3pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDekMsNEJBQTRCLENBQzdCLENBQUMsV0FBVyxDQUFDO1lBQ2QsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDeEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN6RCxZQUFZLENBQUMsT0FBTztnQkFDbEIsYUFBYTtvQkFDYixRQUFRLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQUMsV0FBVyxDQUFDO1NBQ3BFO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUQsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDcEQsWUFBWSxDQUFDLE9BQU87b0JBQ2xCLGFBQWE7d0JBQ2IsUUFBUTs2QkFDTCxhQUFhLENBQUMsZUFBZSxDQUFDOzZCQUM5QixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDekIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BCO2lCQUFNO2dCQUNMLFlBQVksQ0FBQyxPQUFPO29CQUNsQixhQUFhO3dCQUNiLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxXQUFXLENBQUM7YUFDeEU7U0FDRjthQUFNO1lBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztTQUMvQztLQUNGO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxrQkFBa0IsRUFBRTtRQUN2RCxZQUFZLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUN6QyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1FBQzNDLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxrQkFBa0IsRUFBRTtRQUN2RCxZQUFZLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUN6QyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3BDLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7U0FDN0M7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzNDLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7U0FDN0M7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZDLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7U0FDekM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pDLFlBQVksQ0FBQyxPQUFPLEdBQUcsOEJBQThCLENBQUM7U0FDdkQ7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7U0FDMUM7S0FDRjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUkscUJBQXFCLEVBQUU7UUFDMUQsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1NBQzdDO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1NBQzdDO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN2QyxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1NBQ3pDO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1NBQzlDO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1NBQzdDO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLG9CQUFvQixFQUFFO1FBQ3pELElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbkMsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztZQUNsRCxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUN4QzthQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztTQUM5QzthQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtZQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLCtCQUErQixDQUFDO1NBQ3hEO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM3QyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1NBQy9DO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1NBQzdDO2FBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxQyxZQUFZLENBQUMsT0FBTyxHQUFHLCtCQUErQixDQUFDO1NBQ3hEO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDO1NBQ3ZEO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLHFCQUFxQixFQUFFO1FBQzFELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUM7WUFDckQsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN6QyxrREFBa0QsQ0FDbkQsQ0FBQyxXQUFXLENBQUM7U0FDZjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDNUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN6RCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1NBQzdDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkQsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztTQUMzQztLQUNGO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxtQkFBbUIsRUFBRTtRQUN4RCxZQUFZLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUMxQyxZQUFZLENBQUMsT0FBTztZQUNsQixhQUFhO2dCQUNiLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxXQUFXLENBQUM7S0FDbEU7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLHFCQUFxQixFQUFFO1FBQzFELFlBQVksQ0FBQyxhQUFhLEdBQUcsY0FBYyxDQUFDO1FBQzVDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLG9DQUFvQyxDQUNyQyxDQUFDO1FBQ0YsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3BCLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7WUFDN0MsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1NBQzFDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsRUFBRTtZQUN6RSxZQUFZLENBQUMsT0FBTztnQkFDbEIsYUFBYTtvQkFDYixRQUFRO3lCQUNMLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQzt5QkFDakMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtLQUNGO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==