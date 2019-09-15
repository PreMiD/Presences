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
    clientId: "503557087041683458"
});
var oldState = null;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "lg"
    };
    if (document.location.pathname.startsWith("/store"))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztBQUNwQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDbkMsSUFBSSxZQUFZLEdBQWlCO1FBQy9CLGFBQWEsRUFBRSxJQUFJO0tBQ3BCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDakQsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDMUIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQzFELFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1NBQzlCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQztRQUM3RCxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztTQUNqQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDeEQsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7U0FDbEMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBQ3hELFlBQVksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7U0FDbkMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BELFlBQVksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7U0FDckMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BELFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ3pCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNwRCxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQzs7UUFDekIsWUFBWSxHQUFHLElBQUksQ0FBQztJQUV6QixJQUFJLFFBQVEsS0FBSyxZQUFZLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtRQUN0RCxRQUFRLEdBQUcsWUFBWSxDQUFDO1FBQ3hCLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDN0Q7SUFFRCxZQUFZLEtBQUssSUFBSTtRQUNuQixDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUN4QixDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUEsQ0FBQyxDQUFDIn0=