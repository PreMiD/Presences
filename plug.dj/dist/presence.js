var presence = new Presence({
    clientId: "475590192464396288"
});
presence.on("UpdateData", async () => {
    if (document.getElementsByClassName("community__name")[0]) {
        let testPresenceData = {
            details: document.getElementsByClassName("community__name")[0]
                .textContent,
            state: document.getElementsByClassName("community__song-playing")[0]
                .textContent,
            largeImageKey: "pdjlogo"
        };
        presence.setActivity(testPresenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksUUFBUSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDMUQsSUFBSSxnQkFBZ0IsR0FBaUI7WUFDcEMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDNUQsV0FBVztZQUNiLEtBQUssRUFBRSxRQUFRLENBQUMsc0JBQXNCLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2xFLFdBQVc7WUFDYixhQUFhLEVBQUUsU0FBUztTQUN4QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3ZDO0FBQ0YsQ0FBQyxDQUFDLENBQUMifQ==