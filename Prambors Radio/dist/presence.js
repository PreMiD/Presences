var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "630428033966276612",
    mediaKeys: false
});
const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.hostname.startsWith("streaming")) {
        const status = document.querySelector("#playerBtn") ? document.querySelector("#playerBtn").className : null;
        if (status === "stopped") {
            delete presenceData.startTimestamp;
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = (yield strings).pause;
        }
        else if (status === "playing") {
            presenceData.smallImageKey = "live";
            presenceData.smallImageText = "Streaming";
        }
        else {
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = (yield strings).play;
        }
        ;
        presenceData.state = document.querySelectorAll("span[data-radium=true]").item(3).textContent;
        presenceData.details = document.querySelectorAll("span[data-radium=true]").item(2).textContent;
        presenceData.startTimestamp = Date.now();
    }
    else {
        presenceData = null;
    }
    ;
    presenceData ? presence.setActivity(presenceData) : presence.setActivity();
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDbkIsQ0FBQyxDQUFBO0FBQ0YsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQyxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDcEMsQ0FBQyxDQUFBO0FBQ0YsSUFBSSxZQUFZLEdBQWlCO0lBQzdCLGFBQWEsRUFBRSxNQUFNO0NBQ3hCLENBQUM7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDcEQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM1RyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDdEIsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDO1lBQ25DLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1lBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN2RDthQUFNLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUM3QixZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUNwQyxZQUFZLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztTQUM3QzthQUFNO1lBQ0gsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDcEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3REO1FBQUEsQ0FBQztRQUNGLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUM3RixZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDL0YsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDNUM7U0FBTTtRQUNILFlBQVksR0FBRyxJQUFJLENBQUM7S0FDdkI7SUFBQSxDQUFDO0lBQ0YsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDL0UsQ0FBQyxDQUFBLENBQUMsQ0FBQyJ9