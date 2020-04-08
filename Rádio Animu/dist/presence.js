const presence = new Presence({
    clientId: "691794350081966080"
}), strings = presence.getStrings({
    play: "presence.playback.playing"
});
const browsingStamp = Math.floor(Date.now() / 1000);
let artist;
let title;
let playing;
presence.on("iFrameData", (data) => {
    playing = data.iframe_radio.playing;
    if (playing) {
        artist = data.iframe_radio.artist;
        title = data.iframe_radio.title;
    }
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "animu"
    };
    presenceData.startTimestamp = browsingStamp;
    if (playing) {
        presenceData.details = artist;
        presenceData.state = title;
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await strings).play;
    }
    else if (document.location.pathname.includes("/grade/")) {
        presenceData.details = "Grade de Programação";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/pedidos/")) {
        presenceData.details = "Pedidos";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/equipe/")) {
        presenceData.details = "Equipe";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/sobre/")) {
        presenceData.details = "Sobre";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/fazerparte/")) {
        presenceData.details = "Faça Parte da Equipe";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/parceria/")) {
        presenceData.details = "Parceria";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/suafansingaqui/")) {
        presenceData.details = "Sua Fansing Aqui";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Página inicial";
        presenceData.smallImageKey = "reading";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0NBQ2xDLENBQUMsQ0FBQztBQUVMLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BELElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxLQUFLLENBQUM7QUFDVixJQUFJLE9BQU8sQ0FBQztBQUVaLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDakMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO0lBQ3BDLElBQUksT0FBTyxFQUFFO1FBQ1gsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQ2xDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztLQUNqQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxPQUFPO0tBQ3ZCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUM1QyxJQUFJLE9BQU8sRUFBRTtRQUNYLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzlCLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzNCLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztLQUNwRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7UUFDOUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUNqQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztLQUN4QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzFELFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDekQsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUM5RCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1FBQzlDLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDNUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDbEMsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ2xFLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDMUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1FBQ3hDLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO0tBQ3hDO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==