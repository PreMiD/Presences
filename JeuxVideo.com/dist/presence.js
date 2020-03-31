var presence = new Presence({
    clientId: "651930315279040512"
});
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.pathname == "/") {
        presenceData.details = "Page d'accueil";
    }
    else if (document.location.pathname.includes("/news/")) {
        let article = document.querySelector("div.titre-wrapper").textContent;
        presenceData.details = "Lis une actualité";
        presenceData.state = truncateString(article, 128);
    }
    else if (document.location.pathname.includes("/videos/")) {
        let video = document.querySelector("div.titre-video").textContent;
        presenceData.details = "Regarde une vidéo";
        presenceData.state = truncateString(video, 128);
    }
    else if (document.location.pathname.includes("/test/")) {
        let test = document.querySelector(".gameHeaderBanner__title").textContent;
        let note = document.querySelector(".bloc-avis-testeur > .note > strong")
            .textContent;
        presenceData.details = "Lis un test";
        presenceData.state = truncateString(test, 128) + " (" + note + "/20)";
    }
    else if (document.location.pathname.includes("/messages-prives/")) {
        presenceData.details = "Lis ses MP";
    }
    else if (document.location.pathname.includes("/forums/0-")) {
        let forum = document.querySelector("#forum-main-col > .titre-head-bloc > .titre-bloc-forum").textContent;
        let connected = document.querySelector(".panel-heading > .nb-connect-fofo")
            .textContent;
        presenceData.details = truncateString(forum, 64);
        presenceData.state = connected;
    }
    else if (document.location.pathname.includes("/forums/")) {
        let forum = document.querySelector(".bloc-fil-ariane-crumb-forum > .fil-ariane-crumb > span:last-of-type > a").textContent;
        let thread = document.querySelector("#forum-main-col > .titre-head-bloc > .titre-bloc-forum > #bloc-title-forum").textContent;
        presenceData.details = truncateString(forum, 64);
        presenceData.state = truncateString(thread, 128);
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
function truncateString(text, length) {
    if (text.length > length) {
        return text.substring(0, length - 3) + "...";
    }
    else {
        return text;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztLQUN6QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3hELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDdEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDbkQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMxRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ2pEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEQsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUMxRSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHFDQUFxQyxDQUFDO2FBQ3JFLFdBQVcsQ0FBQztRQUNmLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQztLQUN2RTtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7UUFDbkUsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7S0FDckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUM1RCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNoQyx3REFBd0QsQ0FDekQsQ0FBQyxXQUFXLENBQUM7UUFDZCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1DQUFtQyxDQUFDO2FBQ3hFLFdBQVcsQ0FBQztRQUNmLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztLQUNoQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzFELElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2hDLDBFQUEwRSxDQUMzRSxDQUFDLFdBQVcsQ0FBQztRQUNkLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2pDLDRFQUE0RSxDQUM3RSxDQUFDLFdBQVcsQ0FBQztRQUNkLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDbEQ7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQU9ILFNBQVMsY0FBYyxDQUFDLElBQVksRUFBRSxNQUFjO0lBQ2xELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7UUFDeEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQzlDO1NBQU07UUFDTCxPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQyJ9