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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksZ0JBQWdCLEdBQWlCO1FBQ3BDLE9BQU8sRUFBRSwwQkFBMEI7UUFDbkMsS0FBSyxFQUFFLFlBQVk7UUFDbkIsYUFBYSxFQUFFLFlBQVk7S0FDM0IsQ0FBQztJQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUMsQ0FBQyJ9