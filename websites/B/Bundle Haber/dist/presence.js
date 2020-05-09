const presence = new Presence({
    clientId: "651771207385088031"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "bundle"
    };
    if (window.location.pathname.startsWith("/detay/")) {
        const kaynak = document.querySelector("body > div.site > div.detailpage > div > div.detail > div.channel > h4").textContent;
        presenceData.details = "Bir haber okuyor:";
        presenceData.state =
            document.querySelector("body > div.site > div.detailpage > div > h2")
                .textContent +
                " | " +
                kaynak;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFFBQVE7S0FDeEIsQ0FBQztJQUVGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ2xELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ25DLHdFQUF3RSxDQUN6RSxDQUFDLFdBQVcsQ0FBQztRQUVkLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDM0MsWUFBWSxDQUFDLEtBQUs7WUFDaEIsUUFBUSxDQUFDLGFBQWEsQ0FBQyw2Q0FBNkMsQ0FBQztpQkFDbEUsV0FBVztnQkFDZCxLQUFLO2dCQUNMLE1BQU0sQ0FBQztLQUNWO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==