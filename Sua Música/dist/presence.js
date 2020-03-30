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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQUc7UUFDbEIsYUFBYSxFQUFFLFdBQVc7UUFDMUIsYUFBYSxFQUFFLFVBQVUsRUFBRTtRQUMzQixjQUFjLEVBQUUsa0JBQWtCO1FBQ2xDLE9BQU8sRUFBRSxlQUFlLEVBQUU7UUFDMUIsS0FBSyxFQUFFLGdCQUFnQixFQUFFO1FBQ3pCLGNBQWMsRUFBRSxDQUFDO1FBQ2pCLFlBQVksRUFBRSxDQUFDO0tBQ2YsQ0FBQztJQUVGLElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDakMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN2QjtTQUFNO1FBQ04sUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNuQztBQUNGLENBQUMsQ0FBQyxDQUFDO0FBTUgsU0FBUyxZQUFZLENBQUMsT0FBTztJQUM1QixJQUFJLE9BQU8sT0FBTyxJQUFJLFdBQVcsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ3JELE9BQU8sSUFBSSxDQUFDO0tBQ1o7U0FBTTtRQUNOLE9BQU8sS0FBSyxDQUFDO0tBQ2I7QUFDRixDQUFDO0FBS0QsU0FBUyxlQUFlO0lBQ3ZCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN6RCxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDMUQsT0FBTyxNQUFNLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqRDtTQUFNO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQztLQUN6QjtBQUNGLENBQUM7QUFLRCxTQUFTLGdCQUFnQjtJQUN4QixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDaEUsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxLQUFLLEVBQUU7UUFDeEQsT0FBTyxNQUFNLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqRDtTQUFNO1FBQ04sT0FBTyx1QkFBdUIsQ0FBQztLQUMvQjtBQUNGLENBQUM7QUFLRCxTQUFTLFVBQVU7SUFDbEIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3RFLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFCLE9BQU8sTUFBTSxDQUFDO0tBQ2Q7U0FBTTtRQUNOLE9BQU8sT0FBTyxDQUFDO0tBQ2Y7QUFDRixDQUFDO0FBS0QsU0FBUyxhQUFhLENBQUMsR0FBRztJQUN6QixPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVMsQ0FBQztRQUN6RCxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMifQ==