var presence = new Presence({
    clientId: "555834227833307146"
});
presence.on("UpdateData", async () => {
    var presenceData = await presence.getPageLetiable("PreMiD_PresenceData");
    if (presenceData === null)
        presence.setActivity();
    else
        presence.setActivity(presenceData.data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFHLE1BQU0sUUFBUSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRXpFLElBQUksWUFBWSxLQUFLLElBQUk7UUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBQzdDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlDLENBQUMsQ0FBQyxDQUFDIn0=