var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "636322995329302543",
    mediaKeys: false
}), strings = presence.getStrings({
    playing: 'presence.playback.playing',
    paused: 'presence.playback.paused',
    browsing: 'presence.activity.browsing',
    episode: 'presence.media.info.episode'
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        details: "Home",
        largeImageKey: "main"
    };
    if (document.location.pathname == ("/home")) {
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == ("/buscar-projeto/anime")) {
        presenceData.details = "Procurando anime...";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/projeto/")) {
        let vid = document.getElementById("playerIframe");
        vid = vid.contentDocument.getElementsByTagName("video")[0];
        let anime = document.querySelectorAll(".content-heading h3")[0];
        if (document.getElementsByClassName("modal-open").length > 0) {
            if (vid && vid.currentTime > 0 && !vid.paused) {
                var { currentTime, duration } = vid;
                const start = Math.floor(Date.now() / 1000);
                presenceData.startTimestamp = start;
                presenceData.endTimestamp = Math.floor(start - currentTime + duration);
                presenceData.smallImageKey = 'play';
                presenceData.smallImageText = (yield strings).playing;
                let ep = document.getElementsByClassName("modal-title")[0];
                presenceData.details = anime.innerText;
                presenceData.state = `EP ${ep.innerText.substr(-2)}`;
            }
            else if (vid && vid.paused) {
                presenceData.details = anime.innerText;
                presenceData.smallImageKey = 'paused';
                presenceData.smallImageText = (yield strings).paused;
            }
            else {
                presenceData.details = `${anime.innerText}`;
            }
        }
        else {
            presenceData.details = `${anime.innerText}`;
        }
        presence.setActivity(presenceData);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixPQUFPLEVBQUUsMkJBQTJCO0lBQ3BDLE1BQU0sRUFBRSwwQkFBMEI7SUFDbEMsUUFBUSxFQUFFLDRCQUE0QjtJQUN0QyxPQUFPLEVBQUUsNkJBQTZCO0NBQ3ZDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsT0FBTyxFQUFFLE1BQU07UUFDZixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBQ0YsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FFcEM7U0FBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLENBQUMsdUJBQXVCLENBQUMsRUFBRTtRQUNqRSxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFBO1FBQzVDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUU1RCxJQUFJLEdBQUcsR0FBUSxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQ3RELEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzFELElBQUksS0FBSyxHQUFRLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBR3BFLElBQUksUUFBUSxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUQsSUFBRyxHQUFHLElBQUksR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDO2dCQUMzQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQTtnQkFDbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBRTVDLFlBQVksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUNwQyxZQUFZLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQztnQkFDdkUsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7Z0JBQ3BDLFlBQVksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFFdEQsSUFBSSxFQUFFLEdBQVEsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUUvRCxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUE7Z0JBQ3RDLFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7YUFDckQ7aUJBQUssSUFBRyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBQztnQkFDekIsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFBO2dCQUN0QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztnQkFDdEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO2FBQ3REO2lCQUFJO2dCQUNILFlBQVksQ0FBQyxPQUFPLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUE7YUFDNUM7U0FDRjthQUFJO1lBQ0gsWUFBWSxDQUFDLE9BQU8sR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQTtTQUM1QztRQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDIn0=