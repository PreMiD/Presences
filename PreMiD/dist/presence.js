var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "503557087041683458"
});
var oldState = null;
var presenceName, profileName;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "lg"
    };
    presenceName = document.querySelector("div.header__title > h1.presence-name");
    profileName = document.querySelector("div.userpage__header > div.user-data > p");
    if (document.location.pathname.startsWith("/store") && presenceName == null)
        presenceData.state = "Store";
    else if (document.location.pathname.startsWith("/downloads"))
        presenceData.state = "Downloads";
    else if (document.location.pathname.startsWith("/contributors"))
        presenceData.state = "Contributors";
    else if (document.location.pathname.startsWith("/cookies"))
        presenceData.state = "Cookie Policy";
    else if (document.location.pathname.startsWith("/privacy"))
        presenceData.state = "Privacy Policy";
    else if (document.location.pathname.startsWith("/tos"))
        presenceData.state = "Terms of Service";
    else if (document.location.hostname.startsWith("wiki"))
        presenceData.state = "Wiki";
    else if (document.location.hostname.startsWith("docs"))
        presenceData.state = "Docs";
    else if (document.location.pathname.includes("/store/presences/")) {
        presenceData.details = "Presence Page";
        presenceData.state = presenceName.innerText;
    }
    else if (document.location.pathname.startsWith("/users")) {
        presenceData.details = "User Profile";
        presenceData.state = profileName.innerText;
    }
    else
        presenceData = null;
    if (oldState !== presenceData && presenceData !== null) {
        oldState = presenceData;
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    presenceData === null
        ? presence.setActivity()
        : presence.setActivity(presenceData);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLElBQUksWUFBa0IsRUFBRSxXQUFpQixDQUFDO0FBQzFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFDOUUsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMENBQTBDLENBQUMsQ0FBQztJQUVqRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFZLElBQUksSUFBSTtRQUN6RSxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztTQUMxQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFDMUQsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDOUIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDO1FBQzdELFlBQVksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1NBQ2pDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUN4RCxZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztTQUNsQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDeEQsWUFBWSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztTQUNuQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDcEQsWUFBWSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztTQUNyQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDcEQsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7U0FDekIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BELFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ3pCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUM7UUFDaEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO0tBQzdDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUM7UUFDekQsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDdEMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO0tBQzVDOztRQUNJLFlBQVksR0FBRyxJQUFJLENBQUM7SUFFekIsSUFBSSxRQUFRLEtBQUssWUFBWSxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7UUFDdEQsUUFBUSxHQUFHLFlBQVksQ0FBQztRQUN4QixZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQzdEO0lBRUQsWUFBWSxLQUFLLElBQUk7UUFDbkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDeEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFBLENBQUMsQ0FBQyJ9