var presence = new Presence({
    clientId: "692230804402864148"
});
function elementExist(element) {
    if (typeof element != "undefined" && element != null) {
        return true;
    }
    else {
        return false;
    }
}
function firstLetterUp(str) {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
}
function getTrackPlaying() {
    const element = document.querySelector("#trackInfo > a");
    if (elementExist(element) && element.innerHTML.length > 0) {
        return "🎧  " + firstLetterUp(element.innerHTML);
    }
    else {
        return "📀 Navegando...";
    }
}
function getArtistPlaying() {
    const element = document.querySelector("#trackInfo > span > a");
    if (elementExist(element) && element.innerHTML != " - ") {
        return "🎤  " + firstLetterUp(element.innerHTML);
    }
    else {
        return "🇧🇷 suamusica.com.br";
    }
}
function actionPlay() {
    const element = document.querySelector("a.btnPlayer.playPause.pause");
    if (elementExist(element)) {
        return "play";
    }
    else {
        return "pause";
    }
}
presence.on("UpdateData", async () => {
    var presenceData = {
        largeImageKey: "mini_logo",
        smallImageKey: actionPlay(),
        smallImageText: "suamusica.com.br",
        details: getTrackPlaying(),
        state: getArtistPlaying(),
        startTimestamp: 0,
        endTimestamp: 0
    };
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQU1ILFNBQVMsWUFBWSxDQUFDLE9BQU87SUFDM0IsSUFBSSxPQUFPLE9BQU8sSUFBSSxXQUFXLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtRQUNwRCxPQUFPLElBQUksQ0FBQztLQUNiO1NBQU07UUFDTCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQztBQUtELFNBQVMsYUFBYSxDQUFDLEdBQUc7SUFDeEIsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUM7UUFDekQsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBS0QsU0FBUyxlQUFlO0lBQ3RCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN6RCxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDekQsT0FBTyxNQUFNLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsRDtTQUFNO1FBQ0wsT0FBTyxpQkFBaUIsQ0FBQztLQUMxQjtBQUNILENBQUM7QUFLRCxTQUFTLGdCQUFnQjtJQUN2QixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDaEUsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxLQUFLLEVBQUU7UUFDdkQsT0FBTyxNQUFNLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsRDtTQUFNO1FBQ0wsT0FBTyx1QkFBdUIsQ0FBQztLQUNoQztBQUNILENBQUM7QUFLRCxTQUFTLFVBQVU7SUFDakIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3RFLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3pCLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7U0FBTTtRQUNMLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFHO1FBQ2pCLGFBQWEsRUFBRSxXQUFXO1FBQzFCLGFBQWEsRUFBRSxVQUFVLEVBQUU7UUFDM0IsY0FBYyxFQUFFLGtCQUFrQjtRQUNsQyxPQUFPLEVBQUUsZUFBZSxFQUFFO1FBQzFCLEtBQUssRUFBRSxnQkFBZ0IsRUFBRTtRQUN6QixjQUFjLEVBQUUsQ0FBQztRQUNqQixZQUFZLEVBQUUsQ0FBQztLQUNoQixDQUFDO0lBRUYsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==