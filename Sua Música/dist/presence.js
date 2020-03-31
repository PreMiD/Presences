var presence = new Presence({
    clientId: "692230804402864148"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxZQUFZLEdBQUc7UUFDakIsYUFBYSxFQUFFLFdBQVc7UUFDMUIsYUFBYSxFQUFFLFVBQVUsRUFBRTtRQUMzQixjQUFjLEVBQUUsa0JBQWtCO1FBQ2xDLE9BQU8sRUFBRSxlQUFlLEVBQUU7UUFDMUIsS0FBSyxFQUFFLGdCQUFnQixFQUFFO1FBQ3pCLGNBQWMsRUFBRSxDQUFDO1FBQ2pCLFlBQVksRUFBRSxDQUFDO0tBQ2hCLENBQUM7SUFFRixJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQU1ILFNBQVMsWUFBWSxDQUFDLE9BQU87SUFDM0IsSUFBSSxPQUFPLE9BQU8sSUFBSSxXQUFXLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtRQUNwRCxPQUFPLElBQUksQ0FBQztLQUNiO1NBQU07UUFDTCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQztBQUtELFNBQVMsZUFBZTtJQUN0QixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekQsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3pELE9BQU8sTUFBTSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNMLE9BQU8saUJBQWlCLENBQUM7S0FDMUI7QUFDSCxDQUFDO0FBS0QsU0FBUyxnQkFBZ0I7SUFDdkIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ2hFLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksS0FBSyxFQUFFO1FBQ3ZELE9BQU8sTUFBTSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNMLE9BQU8sdUJBQXVCLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBS0QsU0FBUyxVQUFVO0lBQ2pCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUN0RSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN6QixPQUFPLE1BQU0sQ0FBQztLQUNmO1NBQU07UUFDTCxPQUFPLE9BQU8sQ0FBQztLQUNoQjtBQUNILENBQUM7QUFLRCxTQUFTLGFBQWEsQ0FBQyxHQUFHO0lBQ3hCLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBUyxDQUFDO1FBQ3hELE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9