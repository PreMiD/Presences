var presence = new Presence({
    clientId: "629751665242669056"
});
presence.on("UpdateData", async () => {
    let testPresenceData = {
        details: "Luister radio op juke.nl",
        state: "Browsen...",
        largeImageKey: "juke-large"
    };
    presence.setActivity(testPresenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksZ0JBQWdCLEdBQWlCO1FBQ25DLE9BQU8sRUFBRSwwQkFBMEI7UUFDbkMsS0FBSyxFQUFFLFlBQVk7UUFDbkIsYUFBYSxFQUFFLFlBQVk7S0FDNUIsQ0FBQztJQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUMsQ0FBQyJ9