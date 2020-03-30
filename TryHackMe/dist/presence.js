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
    clientId: "656826806061498368",
    
}), presenceData = {
    largeImageKey: "icon",
}, customData = false;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    customData = false;
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname == ("/dashboard")) {
        presenceData.details = "Viewing the Dashboard!";
    }
    else if (document.location.pathname == ("/profile")) {
        presenceData.details = "Viewing their profile!";
    }
    else if (document.location.pathname.startsWith("/room")) {
        var title = document.querySelector("#title");
        if (title != null) {
            customData = true;
            var roomData = {
                details: "Completing room:",
                state: title.innerText,
                largeImageKey: "icon",
                startTimestamp: browsingStamp
            };
            presence.setActivity(roomData);
        }
        else {
            presenceData.details = "Looking at rooms!";
        }
    }
    else if (document.location.pathname == "/upload" || document.location.pathname == "/manage-rooms" || document.location.pathname.startsWith("/room/manage") || document.location.pathname == "/assign-tasks" || document.location.pathname == "/your-material") {
        presenceData.details = "Managing a room!";
        presenceData.state = "Page: " + document.location.pathname;
    }
    else if (document.location.pathname == "/leaderboards") {
        presenceData.details = "Checking the leaderboards!";
    }
    else {
        presenceData.details = "Breaking stuff!";
    }
    if (!customData) {
        presence.setActivity(presenceData);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFBQyxZQUFZLEdBQWlCO0lBQzVCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLEVBQUUsVUFBVSxHQUFXLEtBQUssQ0FBQztBQUVoQyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQztBQUVoRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFFakMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUNuQixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUU1QyxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFFN0MsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztLQUVuRDtTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUVsRCxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO0tBRW5EO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFFdkQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3QyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDZixVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQUksUUFBUSxHQUFpQjtnQkFDekIsT0FBTyxFQUFFLGtCQUFrQjtnQkFDM0IsS0FBSyxFQUFHLEtBQXFCLENBQUMsU0FBUztnQkFDdkMsYUFBYSxFQUFFLE1BQU07Z0JBQ3JCLGNBQWMsRUFBRSxhQUFhO2FBQ2hDLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2xDO2FBQUk7WUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFBO1NBQzdDO0tBRUo7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFNBQVMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFlLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWUsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxnQkFBZ0IsRUFBRTtRQUU1UCxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFBO1FBQ3pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0tBRzlEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFlLEVBQUU7UUFFdEQsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQTtLQUV0RDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksRUFBRSxFQUFFO0tBRTVDO1NBQU07UUFDSCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFBO0tBQzNDO0lBRUQsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNiLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdEM7QUFJTCxDQUFDLENBQUEsQ0FBQyxDQUFDIn0=
