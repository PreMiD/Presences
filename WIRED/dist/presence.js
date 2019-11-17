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
    clientId: '645051733961211934',
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var elapsed, oldURL;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let details, state;
    let title = document.title;
    if (window.location.href !== oldURL) {
        oldURL = window.location.href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    if (document.location.pathname === "/") {
        details = "Browsing: ";
        state = title;
    }
    if (document.location.pathname.includes("/gallery/") || document.location.pathname.includes("/story/")) {
        details = "Reading: ";
        state = title.replace(" | WIRED", "");
    }
    if (document.location.pathname === "/video") {
        details = "Browsing: ";
        state = title.replace(" | WIRED", "");
    }
    if (document.location.pathname.includes("/video/watch/")) {
        details = "Watching: ";
        state = title.replace(" | WIRED Video | CNE", "");
    }
    if (document.location.pathname.includes("/author/") || document.location.pathname.includes("/category/") || document.location.pathname.includes("/coupons") || document.location.pathname.includes("/subscribe/") || document.location.pathname.includes("/wired-advertising/") || document.location.pathname.includes("/sitemap/") || document.location.pathname.includes("/about/") || document.location.pathname.includes("/securedrop/") || document.location.pathname.includes("/newsletter")) {
        details = "Browsing: ";
        state = title.replace(" | WIRED", "");
    }
    var data = {
        details: details,
        state: state,
        largeImageKey: "WIRED",
        startTimestamp: elapsed,
    };
    presence.setActivity(data);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDcEMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxPQUFPLEVBQUUsTUFBTSxDQUFDO0FBRXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVEsRUFBRTtJQUNoQyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFDbkIsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUUzQixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNqQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQzNDO0lBRUQsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxHQUFHLEVBQUU7UUFDbkMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUN2QixLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ2pCO0lBRUQsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ25HLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDdEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7UUFDeEMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUN2QixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDekM7SUFFRCxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNyRCxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQ3ZCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBRXJEO0lBRUQsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQy9kLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFDdkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsSUFBSSxJQUFJLEdBQWlCO1FBQ3JCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEtBQUssRUFBRSxLQUFLO1FBQ1osYUFBYSxFQUFFLE9BQU87UUFDdEIsY0FBYyxFQUFFLE9BQU87S0FDMUIsQ0FBQztJQUVGLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFBLENBQUMsQ0FBQyJ9