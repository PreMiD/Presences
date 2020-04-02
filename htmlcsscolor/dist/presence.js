var presence = new Presence({
    clientId: "630441527826579467"
}), strings = presence.getStrings({});
presence.on("UpdateData", async () => {
    let Data = {
        largeImageKey: "htmlcsscolor"
    };
    if (document.location.pathname.startsWith("/hex")) {
        Data.details = `Viewing ${document.querySelector("#uscBootStrapHeader_lblTitle > strong")
            .textContent}`;
        Data.state = `${document
            .querySelector("#uscBootStrapHeader_lblTitle > small")
            .textContent.split("#")[0]}`;
    }
    if (document.location.href.endsWith("/#wheel") ||
        document.location.pathname == "/") {
        Data.details = `Viewing on wheel`;
        Data.state = `${document.querySelector("#cntMain_txtColor").value}`;
    }
    if (document.location.pathname.startsWith("/html-color-names")) {
        Data.details = `Viewing the list of`;
        Data.state = `html color names.`;
    }
    if (document.location.pathname.startsWith("/color-names-rgb-values")) {
        Data.details = `Viewing the list of`;
        Data.state = `RGB color names.`;
    }
    if (document.location.pathname.startsWith("/web-safe-colors")) {
        Data.details = `Viewing the list of`;
        Data.state = `web save colors.`;
    }
    if (document.location.pathname.startsWith("/random-colors")) {
        Data.details = `Viewing a list of`;
        Data.state = `random colors.`;
    }
    if (document.location.pathname.startsWith("/color-gradient")) {
        Data.details = `Generating a`;
        Data.state = `color gradient.`;
    }
    if (document.location.pathname.startsWith("/contacts")) {
        Data.details = `Viewing the`;
        Data.state = `contacts page.`;
    }
    presence.setActivity(Data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLElBQUksR0FBaUI7UUFDdkIsYUFBYSxFQUFFLGNBQWM7S0FDOUIsQ0FBQztJQU1GLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsV0FDYixRQUFRLENBQUMsYUFBYSxDQUFDLHVDQUF1QyxDQUFDO2FBQzVELFdBQ0wsRUFBRSxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUNYLFFBQVE7YUFDTCxhQUFhLENBQUMsc0NBQXNDLENBQUM7YUFDckQsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQzdCLEVBQUUsQ0FBQztLQUNKO0lBR0QsSUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFDakM7UUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FDVixRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFzQixDQUFDLEtBQ3BFLEVBQUUsQ0FBQztLQUNKO0lBR0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsRUFBRTtRQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUM7S0FDbEM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1FBQ3BFLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztLQUNqQztJQUNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO0tBQ2pDO0lBQ0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUMzRCxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7S0FDL0I7SUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1FBQzVELElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7S0FDaEM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO0tBQy9CO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQyJ9