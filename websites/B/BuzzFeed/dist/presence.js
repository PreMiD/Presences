const presence = new Presence({
    clientId: "650492842615242765"
}), pages = {
    "/trending": "Trending ",
    "/lol": "Lol ",
    "/win": "Win ",
    "/quizzes": "Quiz ",
    "/giftguide": "Gift Guide ",
    "/shopping": "Shopping ",
    "/tvandmovies": "Tv & Movies ",
    "/celebrity": "Celebrity ",
    "/newsletters": "Newsletter "
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname, posttitle = document.querySelector("#mod-buzz-header-1 > div.buzz-header__hgroup.xs-my2.md-mt0 > h1"), user = document.querySelector("body > main > div > div > div > div.user-info.xs-px2.sm-p0.xs-mb3.md-mb4 > div > div.xs-ml2.xs-flex.xs-flex-column > div > h1");
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if (posttitle && posttitle.textContent != "") {
        presenceData.details = "Reads a Post:";
        presenceData.state = `${posttitle.textContent}`;
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presenceData.details = "Viewing Page:";
        presenceData.state = pages[page] || pages[page.slice(0, -1)];
    }
    else if (page.includes("/search")) {
        presenceData.details = "Searching:";
        presenceData.state = document.title;
        presenceData.smallImageKey = "logo";
    }
    else if (user && user.textContent != "") {
        presenceData.details = "Viewing User Profile:";
        presenceData.state = user.textContent;
    }
    else {
        presenceData.details = "Viewing Page:";
        presenceData.state = "Homepage";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixXQUFXLEVBQUUsV0FBVztJQUN4QixNQUFNLEVBQUUsTUFBTTtJQUNkLE1BQU0sRUFBRSxNQUFNO0lBQ2QsVUFBVSxFQUFFLE9BQU87SUFDbkIsWUFBWSxFQUFFLGFBQWE7SUFDM0IsV0FBVyxFQUFFLFdBQVc7SUFDeEIsY0FBYyxFQUFFLGNBQWM7SUFDOUIsWUFBWSxFQUFFLFlBQVk7SUFDMUIsY0FBYyxFQUFFLGFBQWE7Q0FDOUIsQ0FBQztBQUVKLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDaEMsaUVBQWlFLENBQ2xFLEVBQ0QsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLCtIQUErSCxDQUNoSSxDQUFDO0lBQ0osTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxNQUFNO1FBQ3JCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDOUMsQ0FBQztJQUVGLElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDakQ7U0FBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUQ7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFDcEMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO0tBQ3JDO1NBQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUU7UUFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztRQUMvQyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDdkM7U0FBTTtRQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO0tBQ2pDO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==