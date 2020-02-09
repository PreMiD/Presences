var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: '671918505267822594'
});
var strings = presence.getStrings({
    browsing: 'presence.activity.browsing'
});
var oldUrl, elapsed;
var data = {
    details: undefined,
    state: undefined,
    largeImageKey: 'pmg',
    smallImageKey: undefined,
    smallImageText: undefined,
    startTimestamp: undefined,
    endTimestamp: undefined
};
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    const static = {
        '': {
            details: 'Browsing'
        },
        '/privacy.html': {
            details: 'Viewing',
            state: 'Privacy and Terms of Service'
        }
    };
    const host = location.host;
    const path = location.pathname.replace(/\/$/, '');
    if (oldUrl !== host) {
        oldUrl = host;
        elapsed = Math.floor(Date.now() / 1000);
    }
    if (elapsed) {
        data.startTimestamp = elapsed;
    }
    if (path in static) {
        data = Object.assign({}, data, static[path]);
    }
    if (data.details !== undefined) {
        if (data.details.match('(Viewing|Browsing)')) {
            data.smallImageKey = 'reading';
            data.smallImageText = (yield strings).browsing;
        }
        presence.setActivity(data);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
const getElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
        return element.textContent;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQyxRQUFRLEVBQUUsNEJBQTRCO0NBQ3ZDLENBQUMsQ0FBQztBQUVILElBQUksTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUVwQixJQUFJLElBQUksR0FBaUI7SUFDdkIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsS0FBSyxFQUFFLFNBQVM7SUFDaEIsYUFBYSxFQUFFLEtBQUs7SUFDcEIsYUFBYSxFQUFFLFNBQVM7SUFDeEIsY0FBYyxFQUFFLFNBQVM7SUFDekIsY0FBYyxFQUFFLFNBQVM7SUFDekIsWUFBWSxFQUFFLFNBQVM7Q0FDeEIsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNuQyxNQUFNLE1BQU0sR0FBRztRQUNiLEVBQUUsRUFBRTtZQUNGLE9BQU8sRUFBRSxVQUFVO1NBQ3BCO1FBQ0QsZUFBZSxFQUFFO1lBQ2YsT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLDhCQUE4QjtTQUN0QztLQUNGLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQzNCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVsRCxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN6QztJQUVELElBQUksT0FBTyxFQUFFO1FBQ1gsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FDL0I7SUFFRCxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7UUFDbEIsSUFBSSxxQkFBUSxJQUFJLEVBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7S0FDckM7SUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1FBQzlCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztZQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDaEQ7UUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3pCO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFO0lBQ3RDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFakQsSUFBSSxPQUFPLEVBQUU7UUFDWCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUM7S0FDNUI7QUFDSCxDQUFDLENBQUMifQ==