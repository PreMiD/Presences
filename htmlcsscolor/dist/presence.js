var presence = new Presence({
    clientId: "630441527826579467"
});
presence.on("UpdateData", async () => {
    const Data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFpQjtRQUN6QixhQUFhLEVBQUUsY0FBYztLQUM5QixDQUFDO0lBTUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUNiLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUNBQXVDLENBQUM7YUFDNUQsV0FDTCxFQUFFLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQ1gsUUFBUTthQUNMLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQzthQUNyRCxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDN0IsRUFBRSxDQUFDO0tBQ0o7SUFHRCxJQUNFLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDMUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUNqQztRQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUNWLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQXNCLENBQUMsS0FDcEUsRUFBRSxDQUFDO0tBQ0o7SUFHRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1FBQzlELElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztLQUNsQztJQUNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7UUFDcEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO0tBQ2pDO0lBQ0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7S0FDakM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztLQUMvQjtJQUNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztLQUNoQztJQUNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7S0FDL0I7SUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDIn0=