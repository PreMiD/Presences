const presence = new Presence({
    clientId: "653220659887079434"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname != "/projects/premid/custom-status") {
        const details = document.querySelector("[name~=premid-details][content]")
            ? document.querySelector("[name~=premid-details][content]").content
            : null, state = document.querySelector("[name~=premid-state][content]")
            ? document.querySelector("[name~=premid-state][content]").content
            : null, smallImage = document.querySelector("[name~=premid-smallImage][content]")
            ? document.querySelector("[name~=premid-smallImage][content]").content
            : null;
        if (state && details)
            presence.setActivity({
                largeImageKey: "ec-logo",
                details: details,
                state: state,
                smallImageKey: smallImage ? smallImage : "SOMETHING-SKETCHY",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
        else
            presence.setActivity({
                largeImageKey: "ec-logo",
                details: "Viewing a page:",
                state: "Homepage",
                startTimestamp: Math.floor(Date.now() / 1000)
            });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBRW5DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZ0NBQWdDLEVBQUU7UUFFbEUsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQztZQUNyRSxDQUFDLENBQUUsUUFBUSxDQUFDLGFBQWEsQ0FDckIsaUNBQWlDLENBQ2QsQ0FBQyxPQUFPO1lBQy9CLENBQUMsQ0FBQyxJQUFJLEVBQ1IsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsK0JBQStCLENBQUM7WUFDN0QsQ0FBQyxDQUFFLFFBQVEsQ0FBQyxhQUFhLENBQ3JCLCtCQUErQixDQUNaLENBQUMsT0FBTztZQUMvQixDQUFDLENBQUMsSUFBSSxFQUNSLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9DQUFvQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBRSxRQUFRLENBQUMsYUFBYSxDQUNyQixvQ0FBb0MsQ0FDakIsQ0FBQyxPQUFPO1lBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFWCxJQUFJLEtBQUssSUFBSSxPQUFPO1lBQ2xCLFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0JBQ25CLGFBQWEsRUFBRSxTQUFTO2dCQUN4QixPQUFPLEVBQUUsT0FBTztnQkFDaEIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7Z0JBQzVELGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDOUMsQ0FBQyxDQUFDOztZQUVILFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0JBQ25CLGFBQWEsRUFBRSxTQUFTO2dCQUN4QixPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixLQUFLLEVBQUUsVUFBVTtnQkFDakIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQzthQUM5QyxDQUFDLENBQUM7S0FDTjtBQUNILENBQUMsQ0FBQyxDQUFDIn0=