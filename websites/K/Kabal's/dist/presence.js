const presence = new Presence({
    clientId: "655837567962447882"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    const browsingStamp = Math.floor(Date.now() / 1000);
    const page = window.location.pathname;
    if (page.endsWith("panel")) {
        presenceData.details = "Bir sayfayı görüntülüyor:";
        presenceData.state = "Panel";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (page.endsWith("yonetim")) {
        presenceData.details = "Bir sayfayı görüntülüyor:";
        presenceData.state = "Sunucularım";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (page.startsWith("/yonetim/")) {
        presenceData.details = "Bir sunucuyu yönetiyor:";
        presenceData.state = document.querySelector("body > div > div > div.col-4.col-sm-4.col-md-4.col-lg-4.col-xl-4 > div > div > h5 > center").textContent;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (page.endsWith("komutlar")) {
        presenceData.details = "Bir sayfayı görüntülüyor:";
        presenceData.state = "Komutlar";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (page.endsWith("irtibat")) {
        presenceData.details = "Bir sayfayı görüntülüyor:";
        presenceData.state = "İrtibat";
        presenceData.startTimestamp = browsingStamp;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3BELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRXRDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxQixZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO1FBQ25ELFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQzdCLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQzdDO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ25DLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7UUFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7UUFDbkMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDN0M7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztRQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3pDLDRGQUE0RixDQUM3RixDQUFDLFdBQVcsQ0FBQztRQUNkLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQzdDO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3BDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7UUFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDaEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDN0M7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbkMsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztRQUNuRCxZQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUMvQixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUM3QztJQUNELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=