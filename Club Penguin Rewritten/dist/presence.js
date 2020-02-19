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
    clientId: "679008701063102512",
    mediaKeys: false
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.URL.includes("/#/login")) {
        let data = {
            largeImageKey: "cprlogo",
            details: "In-Game",
            startTimestamp: elapsed
        };
        presence.setActivity(data);
    }
    else if (document.URL.includes("/#/redeem")) {
        let data = {
            largeImageKey: "redeemred",
            details: "Redeeming a Code",
            startTimestamp: elapsed
        };
        presence.setActivity(data);
    }
    else {
        let data = {
            largeImageKey: "idlepuffle",
            details: "Viewing Homepage",
            startTimestamp: elapsed
        };
        presence.setActivity(data);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDO0FBRTFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNqQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ25DLElBQUksSUFBSSxHQUFpQjtZQUNyQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUsU0FBUztZQUNsQixjQUFjLEVBQUUsT0FBTztTQUMxQixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtTQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDM0MsSUFBSSxJQUFJLEdBQWlCO1lBQ3JCLGFBQWEsRUFBRSxXQUFXO1lBQzFCLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsY0FBYyxFQUFFLE9BQU87U0FDMUIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7U0FBTTtRQUNILElBQUksSUFBSSxHQUFpQjtZQUNyQixhQUFhLEVBQUUsWUFBWTtZQUMzQixPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLGNBQWMsRUFBRSxPQUFPO1NBQzFCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCO0FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQyJ9