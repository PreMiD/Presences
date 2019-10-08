var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "631039621656084480",
    mediaKeys: false
});
timeNyaned = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/") {
        let presenceData = {
            details: "Nyaning",
            largeImageKey: "nyan",
            startTimestamp: timeNyaned
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith)
        "/index.php";
}));
{
    let presenceData = {
        details: "Nyaning",
        largeImageKey: "nyan",
        startTimestamp: timeNyaned
    };
    presence.setActivity(presenceData);
}
if (document.location.pathname == "/credits.php") {
    let presenceData = {
        details: "Looking at the credits",
        state: "...and probably nyaning",
        largeImageKey: "nyan",
        startTimestamp: timeNyaned
    };
    presence.setActivity(presenceData);
}
else if (document.location.pathname == "/stats.php") {
    let presenceData = {
        details: "Looking at their stats",
        state: "...and probably nyaning",
        largeImageKey: "nyan",
        startTimestamp: timeNyaned
    };
    presence.setActivity(presenceData);
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxDQUFDO0FBRUgsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNuQyxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksWUFBWSxHQUFpQjtZQUMvQixPQUFPLEVBQUUsU0FBUztZQUNsQixhQUFhLEVBQUUsTUFBTTtZQUNyQixjQUFjLEVBQUUsVUFBVTtTQUMzQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVcsQ0FBQztRQUFELFlBQVksQ0FBQTtBQUFBLENBQUMsQ0FBRCxDQUFDLENBQUE7QUFBQyxDQUFDO0lBQzdELElBQUksWUFBWSxHQUFpQjtRQUMvQixPQUFPLEVBQUUsU0FBUztRQUNsQixhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsVUFBVTtLQUMzQixDQUFDO0lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBQU0sRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQztJQUN2RCxJQUFJLFlBQVksR0FBaUI7UUFDL0IsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxLQUFLLEVBQUUseUJBQXlCO1FBQ2hDLGFBQWEsRUFBRSxNQUFNO1FBQ3JCLGNBQWMsRUFBRSxVQUFVO0tBQzNCLENBQUM7SUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNyRCxJQUFJLFlBQVksR0FBaUI7UUFDL0IsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxLQUFLLEVBQUUseUJBQXlCO1FBQ2hDLGFBQWEsRUFBRSxNQUFNO1FBQ3JCLGNBQWMsRUFBRSxVQUFVO0tBQzNCLENBQUM7SUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFDRCxDQUFDIn0=