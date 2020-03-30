var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "689724677274337290",
    
});
let timeElapsed = Math.floor(Date.now() / 1000), strings = presence.getStrings({
    live: "presence.playback.live"
}), songName, albumName, artistName;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    songName = document.querySelector("span#cardTitle.card-title.playerText.truncate");
    albumName = document.querySelector("p#cardAlbum.playerText.truncate");
    artistName = document.querySelector("p#cardArtist.playerText.truncate");
    if (albumName.innerText == "Press the Play button to start the radio") {
        let presenceData = {
            details: "Not tuned in.",
            largeImageKey: "clouds",
            smallImageKey: "pause"
        };
        presence.setActivity(presenceData);
    }
    else {
        let presenceData = {
            details: songName.innerText,
            state: artistName.innerText + " - " + albumName.innerText,
            largeImageKey: "clouds",
            smallImageKey: "live",
            startTimestamp: timeElapsed
        };
        presence.setActivity(presenceData);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxDQUFDO0FBRUgsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQzdDLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSx3QkFBd0I7Q0FDL0IsQ0FBQyxFQUNGLFFBQVEsRUFDUixTQUFTLEVBQ1QsVUFBVSxDQUFDO0FBRWIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ25DLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLCtDQUErQyxDQUFDLENBQUM7SUFDbkYsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN0RSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQ3hFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksMENBQTBDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksWUFBWSxHQUFpQjtZQUMvQixPQUFPLEVBQUUsZUFBZTtZQUN4QixhQUFhLEVBQUUsUUFBUTtZQUN2QixhQUFhLEVBQUUsT0FBTztTQUN2QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixJQUFJLFlBQVksR0FBaUI7WUFDL0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzNCLEtBQUssRUFBRSxVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUztZQUN6RCxhQUFhLEVBQUUsUUFBUTtZQUN2QixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsV0FBVztTQUM1QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNyQyxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQyJ9