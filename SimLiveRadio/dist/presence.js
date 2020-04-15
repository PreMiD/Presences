var presence = new Presence({
    clientId: "699961797041455174"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "simlive"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.host == "laut.fm") {
        if (document.querySelector(".player-display--meta.player-display__meta--station-name") !== null &&
            document.querySelector(".player-display--meta.player-display__meta--station-name").textContent == "SimLiveRadio") {
            presenceData.details = document
                .querySelector(".player-display__meta.player-display__meta--artist")
                .textContent.trim();
            presenceData.state = document
                .querySelector(".player-display__meta.player-display__meta--title")
                .textContent.trim()
                .replace('"', "")
                .replace('"', "");
            presenceData.smallImageKey = "play";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.host == "simliveradio.net") {
        if (document.location.pathname == "/") {
            presenceData.details = "Browsing...";
        }
        else if (document.querySelector(".entry-title") !== null) {
            presenceData.details = "Reading article:";
            presenceData.state = document.querySelector(".entry-title").textContent;
        }
        else if (document.location.pathname.includes("/hoeren")) {
            presenceData.details = "Reading how to listen to SimLiveRadio";
        }
        else if (document.location.pathname.includes("/historie")) {
            presenceData.details = "Viewing the song history";
        }
        else if (document.location.pathname.includes("/mediathek")) {
            presenceData.details = "Viewing the mediathek";
        }
        else if (document.location.pathname.includes("/sendeplan")) {
            presenceData.details = "Viewing the upcoming DJs";
        }
        else if (document.location.pathname.includes("/wunschbox")) {
            presenceData.details = "Viewing the wish box";
        }
        else if (document.location.pathname.includes("/news")) {
            presenceData.details = "Viewing the latest articles";
        }
        else if (document.location.pathname.includes("/team")) {
            presenceData.details = "Viewing the team";
        }
        else if (document.location.pathname.includes("/jobs")) {
            presenceData.details = "Viewing the jobs";
        }
        else if (document.location.pathname.includes("/kontakt")) {
            presenceData.details = "Writing to SimLiveRadio";
            presenceData.smallImageKey = "writing";
        }
        else if (document.location.pathname.includes("/studiohotline")) {
            presenceData.details = "Viewing the Studio Hot Line";
        }
        else if (document.location.pathname.includes("/teamspeak")) {
            presenceData.details = "Viewing TeamSpeak";
        }
        else if (document.location.pathname.includes("/projektanfrage")) {
            presenceData.details = "Reading about the interviews";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/unterstuetzen")) {
            presenceData.details = "Viewing the support page";
        }
        else if (document.location.pathname.includes("/downloads")) {
            presenceData.details = "Viewing the downloads page";
        }
        else if (document.location.pathname.includes("/lets-player-und-streamer")) {
            presenceData.details = "Viewing the streamer page";
        }
        else if (document.location.pathname.includes("/partner")) {
            presenceData.details = "Viewing the partner page";
        }
        else if (document.location.pathname.includes("/ueber-uns")) {
            presenceData.details = "Reading about SimLiveRadio";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/faq")) {
            presenceData.details = "Reading the FAQs";
            presenceData.smallImageKey = "reading";
        }
        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        }
        else {
            presence.setActivity(presenceData);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsU0FBUztLQUN6QixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxTQUFTLEVBQUU7UUFDdkMsSUFDRSxRQUFRLENBQUMsYUFBYSxDQUNwQiwwREFBMEQsQ0FDM0QsS0FBSyxJQUFJO1lBQ1YsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsMERBQTBELENBQzNELENBQUMsV0FBVyxJQUFJLGNBQWMsRUFDL0I7WUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVE7aUJBQzVCLGFBQWEsQ0FBQyxvREFBb0QsQ0FBQztpQkFDbkUsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RCLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUTtpQkFDMUIsYUFBYSxDQUFDLG1EQUFtRCxDQUFDO2lCQUNsRSxXQUFXLENBQUMsSUFBSSxFQUFFO2lCQUNsQixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztpQkFDaEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwQixZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUVwQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFD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