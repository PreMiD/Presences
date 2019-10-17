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
    clientId: "634332519398899724",
    mediaKeys: false
});
let presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let startTimestamp = Date.now();
    presenceData.startTimestamp = startTimestamp;
    if (document.location.pathname === "/") {
        presenceData.details = "Home Page";
    }
    else if (!isNaN(parseInt(document.location.pathname.slice(1)))) {
        const author = document.querySelector("#content > div > table > tbody > tr > td > div > .blur a > b").textContent.trim();
        presenceData.details = `Viewing a post from:`;
        presenceData.state = author;
    }
    else {
        presenceData = {
            largeImageKey: "logo"
        };
    }
    ;
    presence.setActivity(presenceData);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUM3QixhQUFhLEVBQUUsTUFBTTtDQUN4QixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksY0FBYyxHQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN4QyxZQUFZLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUM3QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEdBQUcsRUFBRTtRQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztLQUN0QztTQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDOUQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6SCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1FBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQy9CO1NBQU07UUFDSCxZQUFZLEdBQUc7WUFDWCxhQUFhLEVBQUUsTUFBTTtTQUN4QixDQUFDO0tBQ0w7SUFBQSxDQUFDO0lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUEsQ0FBQyxDQUFDIn0=