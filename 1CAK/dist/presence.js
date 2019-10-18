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
    else if (document.location.pathname === "/trending") {
        presenceData.details = "Trending Page";
    }
    else if (document.location.pathname === "/recent") {
        presenceData.details = "Recent Page";
    }
    else if (document.location.pathname === "/legendary") {
        presenceData.details = "Legendary Page";
    }
    else if (document.location.pathname === "/friends") {
        presenceData.details = "Friends Page";
    }
    else if (document.location.pathname === "/rules") {
        presenceData.details = "Reading the rules";
    }
    else if (document.location.pathname === "/weeklytop" || document.location.pathname === "/alltimetop") {
        presenceData.details = "Top Users";
    }
    else if (document.location.pathname === "/preferences" || document.location.pathname === "/privacy_setting") {
        presenceData.details = "Settings";
    }
    else if (document.location.pathname.slice(1).startsWith("of")) {
        presenceData.details = document.querySelector("#content > h3").textContent.trim();
    }
    else if (document.location.pathname.slice(1).startsWith("saved")) {
        if (!document.querySelector("#content > p")) {
            presenceData.details = "Saved Posts";
        }
        ;
    }
    else if (document.location.pathname.slice(1).startsWith("voteof")) {
        if (!document.querySelector("#content > p")) {
            presenceData.details = "Voted Posts";
        }
        ;
    }
    else if (!isNaN(parseInt(document.location.pathname.slice(1)))) {
        const author = document.querySelector("#content > div > table > tbody > tr > td > div > .blur a > b").textContent.trim();
        presenceData.details = `Viewing ${author}'s post`;
    }
    else {
        presenceData = {
            largeImageKey: "logo"
        };
    }
    ;
    presence.setActivity(presenceData);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUM3QixhQUFhLEVBQUUsTUFBTTtDQUN4QixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksY0FBYyxHQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN4QyxZQUFZLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUM3QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLEdBQUcsRUFBRTtRQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztLQUN0QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssV0FBVyxFQUFFO1FBQ25ELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO0tBQzFDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7UUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtRQUNwRCxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO0tBQzNDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7UUFDbEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7S0FDekM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUNoRCxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxZQUFZLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssYUFBYSxFQUFFO1FBQ3BHLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO0tBQ3RDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxjQUFjLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssa0JBQWtCLEVBQUU7UUFDM0csWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7S0FDckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDN0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNyRjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUN6QyxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztTQUN4QztRQUFBLENBQUM7S0FDTDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUN6QyxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztTQUN4QztRQUFBLENBQUM7S0FDTDtTQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDOUQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6SCxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsTUFBTSxTQUFTLENBQUM7S0FDckQ7U0FBTTtRQUNILFlBQVksR0FBRztZQUNYLGFBQWEsRUFBRSxNQUFNO1NBQ3hCLENBQUM7S0FDTDtJQUFBLENBQUM7SUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQSxDQUFDLENBQUMifQ==