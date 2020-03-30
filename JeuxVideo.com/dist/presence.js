var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "651930315279040512",
    
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
        let note = document.querySelector(".bloc-avis-testeur > .note > strong").textContent;
        presenceData.details = "Lis un test";
        presenceData.state = truncateString(test, 128) + " (" + note + "/20)";
    }
    else if (document.location.pathname.includes("/messages-prives/")) {
        presenceData.details = "Lis ses MP";
    }
    else if (document.location.pathname.includes("/forums/0-")) {
        let forum = document.querySelector("#forum-main-col > .titre-head-bloc > .titre-bloc-forum").textContent;
        let connected = document.querySelector(".panel-heading > .nb-connect-fofo").textContent;
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
}));
function truncateString(text, length) {
    if (text.length > length) {
        return text.substring(0, length - 3) + "...";
    }
    else {
        return text;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNqQyxJQUFJLFlBQVksR0FBaUI7UUFDN0IsYUFBYSxFQUFFLE1BQU07S0FDeEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ25DLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7S0FDM0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN0RCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ3RFLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3JEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDeEQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNsRSxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1FBQzNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNuRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3RELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDMUUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUNyRixZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUNyQyxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUM7S0FDekU7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1FBQ2pFLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDMUQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUN6RyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1DQUFtQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ3hGLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztLQUNsQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3hELElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEVBQTBFLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDM0gsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUM5SCxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakQsWUFBWSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3BEO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUM5QixRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzFCO1NBQU07UUFDSCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3RDO0FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQU9ILFNBQVMsY0FBYyxDQUFDLElBQVksRUFBRSxNQUFjO0lBQ2hELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7UUFDdEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ2hEO1NBQU07UUFDSCxPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQyJ9