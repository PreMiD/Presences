var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "632293282847784973",
    mediaKeys: false
});
let presenceData = {
    largeImageKey: "logo"
};
let startTimestamp;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let path = document.location.pathname.split("/");
    path.shift();
    if (path[0] === "u") {
        path.splice(0, 2);
    }
    ;
    if (path[0] === "h") {
        presenceData.details = "Classes";
    }
    else if (path[0] === "calendar") {
        presenceData.details = "Calendar";
    }
    else if (path[0] === "a") {
        presenceData.details = "To-do";
    }
    else if (path[0] === "c") {
        if (!startTimestamp)
            startTimestamp = Date.now();
        const classroom = document.querySelector("span[class=\"YVvGBb dDKhVc\"]") ? `${document.querySelector("span[id=\"UGb2Qe\"]").textContent} - ${document.querySelector("span[class=\"YVvGBb dDKhVc\"]").textContent}` : document.querySelector("span[id=\"UGb2Qe\"]").textContent;
        presenceData.smallImageKey = "reading";
        presenceData.details = "In class:";
        presenceData.state = classroom;
        presenceData.startTimestamp = startTimestamp;
    }
    else if (path[0] === "s") {
        presenceData.details = "Classroom Settings";
    }
    ;
    presence.setActivity(presenceData);
    presenceData = {
        largeImageKey: "logo"
    };
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDbkIsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxZQUFZLEdBQWlCO0lBQzdCLGFBQWEsRUFBRSxNQUFNO0NBQ3hCLENBQUM7QUFDRixJQUFJLGNBQXNCLENBQUM7QUFFM0IsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksSUFBSSxHQUFhLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDYixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDckI7SUFBQSxDQUFDO0lBQ0YsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQ2pCLFlBQVksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO1FBQy9CLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0tBQ3JDO1NBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQ3hCLFlBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxjQUFjO1lBQUUsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqRCxNQUFNLFNBQVMsR0FBVyxRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFdBQVcsTUFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDeFIsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDbkMsWUFBWSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDL0IsWUFBWSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7S0FDaEQ7U0FBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDeEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztLQUMvQztJQUFBLENBQUM7SUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25DLFlBQVksR0FBRztRQUNYLGFBQWEsRUFBRSxNQUFNO0tBQ3hCLENBQUM7QUFDTixDQUFDLENBQUEsQ0FBQyxDQUFDIn0=