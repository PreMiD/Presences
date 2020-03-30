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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNuQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLElBQUksR0FBaUI7UUFDeEIsYUFBYSxFQUFFLGNBQWM7S0FDN0IsQ0FBQztJQU1GLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsV0FDZCxRQUFRLENBQUMsYUFBYSxDQUFDLHVDQUF1QyxDQUFDO2FBQzdELFdBQ0gsRUFBRSxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUNaLFFBQVE7YUFDTixhQUFhLENBQUMsc0NBQXNDLENBQUM7YUFDckQsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQzNCLEVBQUUsQ0FBQztLQUNIO0lBR0QsSUFDQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFDaEM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBSSxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFzQixDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzFGO0lBR0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsRUFBRTtRQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUM7S0FDakM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1FBQ3JFLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztLQUNoQztJQUNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO0tBQ2hDO0lBQ0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUM1RCxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7S0FDOUI7SUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1FBQzdELElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7S0FDL0I7SUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO0tBQzlCO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQyJ9