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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksUUFBUSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDekQsSUFBSSxnQkFBZ0IsR0FBaUI7WUFDbkMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDM0QsV0FBVztZQUNkLEtBQUssRUFBRSxRQUFRLENBQUMsc0JBQXNCLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pFLFdBQVc7WUFDZCxhQUFhLEVBQUUsU0FBUztTQUN6QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3hDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==