var presence = new Presence({
    clientId: "651406405093425152"
}), presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/" ||
        document.location.pathname == "/home") {
        presenceData.details = "Viewing the homepage";
    }
    else if (document.location.pathname.startsWith("/team")) {
        presenceData.details = "Looking at the team";
    }
    else if (document.location.pathname.startsWith("/faq")) {
        presenceData.details = "Reading the FAQ";
    }
    else if (document.location.pathname.startsWith("/rules")) {
        presenceData.details = "Reading their rules";
    }
    else if (document.location.pathname.startsWith("/contact")) {
        presenceData.details = "Reading the contact informations";
    }
    else if (document.location.pathname.startsWith("/downloads")) {
        presenceData.details = "Looking at the download page";
    }
    else {
        presenceData = {
            largeImageKey: "logo"
        };
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUNFLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUc7UUFDakMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksT0FBTyxFQUNyQztRQUNBLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FDL0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN6RCxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztLQUMxQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzFELFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7S0FDOUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM1RCxZQUFZLENBQUMsT0FBTyxHQUFHLGtDQUFrQyxDQUFDO0tBQzNEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDOUQsWUFBWSxDQUFDLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztLQUN2RDtTQUFNO1FBQ0wsWUFBWSxHQUFHO1lBQ2IsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztLQUNIO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQyJ9