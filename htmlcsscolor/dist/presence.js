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
    clientId: "630441527826579467"
}), strings = presence.getStrings({});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let Data = {
        largeImageKey: "htmlcsscolor",
    };
    if (document.location.pathname.startsWith("/hex")) {
        Data.details = `Viewing ${document.querySelector("#uscBootStrapHeader_lblTitle > strong").textContent}`;
        Data.state = `${document.querySelector("#uscBootStrapHeader_lblTitle > small").textContent.split("#")[0]}`;
    }
    if (document.location.href.endsWith("/#wheel") || document.location.pathname == "/") {
        Data.details = `Viewing on wheel`;
        Data.state = `${document.querySelector("#cntMain_txtColor").value}`;
    }
    if (document.location.pathname.startsWith("/html-color-names")) {
        Data.details = `Viewing the list of`;
        Data.state = `html color names.`;
    }
    if (document.location.pathname.startsWith("/color-names-rgb-values")) {
        Data.details = `Viewing the list of`;
        Data.state = `RGB color names.`;
    }
    if (document.location.pathname.startsWith("/web-safe-colors")) {
        Data.details = `Viewing the list of`;
        Data.state = `web save colors.`;
    }
    if (document.location.pathname.startsWith("/random-colors")) {
        Data.details = `Viewing a list of`;
        Data.state = `random colors.`;
    }
    if (document.location.pathname.startsWith("/color-gradient")) {
        Data.details = `Generating a`;
        Data.state = `color gradient.`;
    }
    if (document.location.pathname.startsWith("/contacts")) {
        Data.details = `Viewing the`;
        Data.state = `contacts page.`;
    }
    presence.setActivity(Data);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDQSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUM3QixDQUFDLENBQUM7QUFDTCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDbkMsSUFBSSxJQUFJLEdBQWlCO1FBQ3ZCLGFBQWEsRUFBRSxjQUFjO0tBQzlCLENBQUM7SUFNRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3ZHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNDQUFzQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0tBQzNHO0lBR0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7S0FBQztJQUc5TCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1FBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUM7S0FBQztJQUN6SSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1FBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7S0FBQztJQUM5SSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7S0FBQztJQUN2SSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7S0FBQztJQUNqSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1FBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO0tBQUM7SUFDOUgsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFBQyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7S0FBQztJQUd0SCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTdCLENBQUMsQ0FBQSxDQUFDLENBQUMifQ==