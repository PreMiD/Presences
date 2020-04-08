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
function firstLetterUp(str) {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQU1ILFNBQVMsWUFBWSxDQUFDLE9BQU87SUFDM0IsSUFBSSxPQUFPLE9BQU8sSUFBSSxXQUFXLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtRQUNwRCxPQUFPLElBQUksQ0FBQztLQUNiO1NBQU07UUFDTCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQztBQUtELFNBQVMsZUFBZTtJQUN0QixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekQsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3pELE9BQU8sTUFBTSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNMLE9BQU8saUJBQWlCLENBQUM7S0FDMUI7QUFDSCxDQUFDO0FBS0QsU0FBUyxnQkFBZ0I7SUFDdkIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ2hFLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksS0FBSyxFQUFFO1FBQ3ZELE9BQU8sTUFBTSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNMLE9BQU8sdUJBQXVCLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBS0QsU0FBUyxVQUFVO0lBQ2pCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUN0RSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN6QixPQUFPLE1BQU0sQ0FBQztLQUNmO1NBQU07UUFDTCxPQUFPLE9BQU8sQ0FBQztLQUNoQjtBQUNILENBQUM7QUFLRCxTQUFTLGFBQWEsQ0FBQyxHQUFHO0lBQ3hCLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDO1FBQ3pELE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFHO1FBQ2pCLGFBQWEsRUFBRSxXQUFXO1FBQzFCLGFBQWEsRUFBRSxVQUFVLEVBQUU7UUFDM0IsY0FBYyxFQUFFLGtCQUFrQjtRQUNsQyxPQUFPLEVBQUUsZUFBZSxFQUFFO1FBQzFCLEtBQUssRUFBRSxnQkFBZ0IsRUFBRTtRQUN6QixjQUFjLEVBQUUsQ0FBQztRQUNqQixZQUFZLEVBQUUsQ0FBQztLQUNoQixDQUFDO0lBRUYsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==