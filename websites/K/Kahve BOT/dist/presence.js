const presence = new Presence({
    clientId: "652193616617537577"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    const browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.startTimestamp = browsingStamp;
    if (window.location.pathname.endsWith("blog")) {
        presenceData.details = "Tüm bloglara göz atıyor...";
    }
    else if (window.location.pathname.endsWith("faq")) {
        presenceData.details = "Tüm sıkça sorulan sorulara göz atıyor...";
    }
    else if (window.location.pathname.endsWith("commands")) {
        presenceData.details = "Tüm komutlara göz atıyor...";
    }
    else if (window.location.pathname.endsWith("menu")) {
        presenceData.details = "Kahve menüsüne göz atıyor...";
    }
    else if (window.location.pathname.endsWith("dashboard")) {
        presenceData.details = "Sunucularına göz atıyor...";
    }
    else if (window.location.pathname.startsWith("/dashboard/")) {
        presenceData.details = "Bir sunucuyu dashboard üzerinden kontrol ediyor:";
        presenceData.state = document.querySelector("html body.scrollbar.scrollbar-night-fade div.navbar-expand-lg.navbar-dark div.container-fluid ul.navbar-nav.text-white li.nav-item.avatar.dropdown > a ").textContent;
    }
    else if (window.location.pathname.endsWith("discord-bot-ekleme")) {
        presenceData.details = "Discord Bot Ekleme bloguna göz atıyor...";
    }
    else if (window.location.pathname.endsWith("kahve-bot-projesi-nasil-basladi")) {
        presenceData.details =
            "Kahve bot projesi nasıl başladı bloguna göz atıyor...";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3BELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzdDLFlBQVksQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUM7S0FDckQ7U0FBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuRCxZQUFZLENBQUMsT0FBTyxHQUFHLDBDQUEwQyxDQUFDO0tBQ25FO1NBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQztLQUN0RDtTQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BELFlBQVksQ0FBQyxPQUFPLEdBQUcsOEJBQThCLENBQUM7S0FDdkQ7U0FBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN6RCxZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO0tBQ3JEO1NBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDN0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxrREFBa0QsQ0FBQztRQUMxRSxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3pDLHlKQUF5SixDQUMxSixDQUFDLFdBQVcsQ0FBQztLQUNmO1NBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtRQUNsRSxZQUFZLENBQUMsT0FBTyxHQUFHLDBDQUEwQyxDQUFDO0tBQ25FO1NBQU0sSUFDTCxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUNBQWlDLENBQUMsRUFDcEU7UUFDQSxZQUFZLENBQUMsT0FBTztZQUNsQix1REFBdUQsQ0FBQztLQUMzRDtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=