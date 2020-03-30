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
    clientId: "691325899307483197",
    
});
var user;
var title;
var replace;
var search;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "logo"
    };
    var route = document.location.pathname.split('/');
    if (document.location.pathname === "/") {
        presenceData.details = "Home";
    }
    else if (document.location.pathname.includes("/dashboard")) {
        presenceData.details = "Dashboard";
        presenceData.state = "Choosing a server...";
    }
    else if (document.location.pathname.includes("/server/")) {
        presenceData.details = "Edit a server : " + document.querySelector(".title").textContent;
        if (!route[3]) {
            presenceData.state = "Main";
        }
        else {
            presenceData.state = document.querySelector("a.is-active").textContent;
        }
    }
    else if (document.location.pathname.includes("/status")) {
        presenceData.details = "Status";
        presenceData.state = "Watching current status of Koya";
    }
    else if (document.location.pathname.includes("/commands")) {
        presenceData.details = "Commands";
        presenceData.state = document.querySelector("a.cat-toggle.is-active").textContent;
    }
    else if (document.location.pathname.includes("/premium")) {
        presenceData.details = "Premium";
        presenceData.state = "Watching premium page";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        if (presenceData.state == null)
            presenceData.state = "Navigating...";
        presence.setActivity(presenceData);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILElBQUksSUFBVSxDQUFDO0FBQ2YsSUFBSSxLQUFXLENBQUM7QUFDaEIsSUFBSSxPQUFhLENBQUM7QUFDbEIsSUFBSSxNQUFZLENBQUM7QUFFakIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUM7QUFFaEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksWUFBWSxHQUFpQjtRQUM3QixhQUFhLEVBQUUsTUFBTTtLQUN4QixDQUFDO0lBRUYsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxELElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxFQUFFO1FBQ25DLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0tBQ2pDO1NBQU0sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDekQsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDbkMsWUFBWSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztLQUM3QztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3ZELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDdkYsSUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNWLFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQy9CO2FBQU07WUFDSCxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsV0FBVyxDQUFDO1NBQzFFO0tBQ0o7U0FBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztRQUNoQyxZQUFZLENBQUMsS0FBSyxHQUFHLGlDQUFpQyxDQUFDO0tBQzFEO1NBQU0sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDbEMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUMsV0FBVyxDQUFDO0tBQ3JGO1NBQU0sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDdkQsWUFBWSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDakMsWUFBWSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQztLQUNoRDtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDOUIsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUMxQjtTQUFNO1FBQ0gsSUFBRyxZQUFZLENBQUMsS0FBSyxJQUFJLElBQUk7WUFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUNsRSxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3RDO0FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQyJ9
