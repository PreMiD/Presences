var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: '629413852391669791'
});
let presenceData = {
    largeImageKey: 'kitsu_lg'
};
let path, user, title;
let started = Math.floor(Date.now() / 1000);
let strings = presence.getStrings({
    "browsing": "presence.activity.browsing"
});
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    path = window.location.pathname;
    if (path == '/' || path.startsWith('/explore')) {
        presenceData.details = (yield strings).browsing;
        delete presenceData.state;
    }
    else if (path.includes('/users') && !path.includes('/library')) {
        user = document.querySelector(".cover-username").textContent.trim();
        presenceData.details = `Viewing ${user} profile`;
        delete presenceData.state, presenceData.startTimestamp;
    }
    else if (path.includes('/library')) {
        user = document.querySelector(".cover-username").textContent.trim();
        presenceData.details = `Viewing ${user} profile`;
        presenceData.state = 'Viewing their library';
        delete presenceData.startTimestamp;
    }
    else if (path.startsWith('/anime/')) {
        presenceData.details = 'Looking through anime';
        presenceData.state = `Viewing ${document.querySelector('h3').textContent.trim()}`;
    }
    else if (path.startsWith('/anime') && !path.startsWith('/anime/')) {
        presenceData.details = 'Browsing for anime';
        delete presenceData.state;
    }
    else if (path.startsWith('/manga/')) {
        presenceData.details = 'Looking through manga';
        presenceData.state = `Viewing ${document.querySelector('h3').textContent.trim()}`;
    }
    else if (path.startsWith('/manga') && !path.startsWith('/manga/')) {
        presenceData.details = 'Browsing for manga';
        delete presenceData.state;
    }
    else if (path.startsWith('/groups/')) {
        presenceData.details = 'Looking through groups';
        presenceData.state = `Viewing ${document.querySelector('.cover-username').textContent.trim()}`;
    }
    else if (path.startsWith('/groups') && !path.startsWith('/groups/')) {
        presenceData.details = 'Browsing for groups';
        delete presenceData.state;
    }
    presence.setActivity(presenceData, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUVILElBQUksWUFBWSxHQUFpQjtJQUM3QixhQUFhLEVBQUUsVUFBVTtDQUM1QixDQUFBO0FBR0QsSUFBSSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQWEsQ0FBQztBQUU5QixJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUduRCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzlCLFVBQVUsRUFBRSw0QkFBNEI7Q0FDM0MsQ0FBQyxDQUFBO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUVoQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDaEQsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO0tBQzdCO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM5RCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwRSxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsSUFBSSxVQUFVLENBQUM7UUFFakQsT0FBTyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxjQUFjLENBQUM7S0FDMUQ7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDbEMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLElBQUksVUFBVSxDQUFDO1FBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUM7UUFFN0MsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDO0tBQ3RDO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ25DLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUE7UUFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7S0FDckY7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ2pFLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUE7UUFFM0MsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFBO0tBQzVCO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ25DLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUE7UUFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7S0FDckY7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ2pFLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUE7UUFFM0MsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFBO0tBQzVCO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3BDLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUE7UUFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztLQUNsRztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDbkUsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQTtRQUU1QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUE7S0FDNUI7SUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUEsQ0FBQyxDQUFBIn0=