const presence = new Presence({
    clientId: "630418879411126282"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "habbologo"
    };
    presenceData.startTimestamp = browsingStamp;
    if (window.location.pathname.toLowerCase().includes("/client")) {
        presenceData.state = "Playing Hangout Hotel";
    }
    if (window.location.pathname.toLowerCase().startsWith("/community/articles")) {
        presenceData.details = "Reading an article:";
        presenceData.state =
            "Article number: " +
                window.location.pathname.replace("/community/articles/", "");
    }
    if (window.location.pathname.toLowerCase() === "/community/articles") {
        presenceData.details = "Community:";
        presenceData.state = "Articles";
    }
    if (window.location.pathname.toLowerCase() === "/community") {
        presenceData.details = "Community";
    }
    if (window.location.pathname.toLowerCase() === "/community/articles/") {
        presenceData.details = "Community:";
        presenceData.state = "Articles";
    }
    if (window.location.pathname.toLowerCase() === "/community/") {
        presenceData.details = "Community";
    }
    if (window.location.pathname.toLowerCase().startsWith("/community/photos")) {
        presenceData.details = "Community:";
        presenceData.state = "Photos";
    }
    if (window.location.pathname.toLowerCase().startsWith("/community/leaderboards")) {
        presenceData.details = "Community:";
        presenceData.state = "Leaderboards";
    }
    if (window.location.pathname.toLowerCase().startsWith("/community/management")) {
        presenceData.details = "Community:";
        presenceData.state = "Management";
    }
    if (window.location.pathname.toLowerCase().startsWith("/store/packages")) {
        presenceData.details = "Store:";
        presenceData.state = "Packages";
    }
    if (window.location.pathname.toLowerCase().startsWith("/store/ranks")) {
        presenceData.details = "Store:";
        presenceData.state = "Ranks";
    }
    if (window.location.pathname.toLowerCase() === "/settings") {
        presenceData.details = "Settings";
    }
    if (window.location.pathname.toLowerCase() === "/settings/") {
        presenceData.details = "Settings";
    }
    if (window.location.pathname.toLowerCase().startsWith("/settings/password")) {
        presenceData.details = "Settings:";
        presenceData.state = "Changing password";
    }
    if (window.location.pathname.toLowerCase().startsWith("/home")) {
        presenceData.details = "Home:";
        presenceData.state = document.title.replace("Hangout - ", "");
    }
    if (window.location.pathname.toLowerCase().startsWith("/me")) {
        presenceData.details = "Home";
    }
    if (window.location.pathname.toLowerCase().startsWith("/login")) {
        presenceData.details = "Logging in";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFdBQVc7S0FDM0IsQ0FBQztJQUNGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzlELFlBQVksQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUM7S0FDOUM7SUFDRCxJQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUN4RTtRQUNBLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFDN0MsWUFBWSxDQUFDLEtBQUs7WUFDaEIsa0JBQWtCO2dCQUNsQixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDaEU7SUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLHFCQUFxQixFQUFFO1FBQ3BFLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO0tBQ2pDO0lBQ0Qs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