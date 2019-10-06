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
let path, user;
let strings = presence.getStrings({
    "browsing": "presence.activity.browsing"
});
presence.on('UpdateData', () => __awaiter(this, void 0, void 0, function* () {
    path = window.location.pathname;
    if (path == '/' || path.startsWith('/explore')) {
        presenceData.details = (yield strings).browsing;
        delete presenceData.state;
    }
    else if (path.includes('/users')) {
        user = document.querySelector(".cover-username").textContent.trim();
        presenceData.details = `Viewing ${user} profile`;
        switch (path.split('/')[3]) {
            case 'library':
                presenceData.state = 'Viewing their library';
                break;
            case 'reactions':
                presenceData.state = 'Viewing their reactions';
                break;
            case 'followers':
                presenceData.state = 'Viewing their followers';
                break;
            case 'following':
                presenceData.state = 'Viewing who they follow';
                break;
            case 'groups':
                presenceData.state = 'Viewing their groups';
                break;
            default:
                presenceData.state = 'Viewing their activity';
        }
    }
    else if (path.startsWith('/anime')) {
        presenceData.details = 'Looking through anime';
        if (path.split('/')[2]) {
            presenceData.state = `Viewing ${document.querySelector('h3').textContent.trim()}`;
        }
        else
            delete presenceData.state;
    }
    else if (path.startsWith('/manga')) {
        presenceData.details = 'Looking through manga';
        if (path.split('/')[2]) {
            presenceData.state = `Viewing ${document.querySelector('h3').textContent.trim()}`;
        }
        else
            delete presenceData.state;
    }
    else if (path.startsWith('/groups')) {
        presenceData.details = 'Looking through groups';
        if (path.split('/')[2]) {
            presenceData.state = `Viewing ${document.querySelector('.cover-username').textContent.trim()}`;
        }
        else
            delete presenceData.state;
    }
    else if (path.startsWith('/feedback')) {
        presenceData.details = 'Browsing feedback section';
        switch (path.split('/')[2]) {
            case 'bugs':
                presenceData.state = 'Viewing bugs';
                break;
            case 'feature-requests':
                presenceData.state = 'Viewing feature requests';
                break;
            case 'database-requests':
                presenceData.state = 'Viewing database requests';
                break;
            case 'mobile-bugs':
                presenceData.state = 'Viewing mobile bugs';
                break;
            case 'mobile-features':
                presenceData.state = 'Viewing mobile features';
                break;
            default:
                presenceData.state = 'some unknown place';
        }
    }
    else if (path.startsWith('/api')) {
        presenceData.details = 'Messing with the kitsu API';
        delete presenceData.state;
    }
    presence.setActivity(presenceData, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUM3QixhQUFhLEVBQUUsVUFBVTtDQUM1QixDQUFBO0FBRUQsSUFBSSxJQUFJLEVBQUUsSUFBWSxDQUFDO0FBQ3ZCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDOUIsVUFBVSxFQUFFLDRCQUE0QjtDQUMzQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRWhDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNoRCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7S0FDN0I7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDaEMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLElBQUksVUFBVSxDQUFDO1FBRWpELFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4QixLQUFLLFNBQVM7Z0JBQ1YsWUFBWSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQTtnQkFDNUMsTUFBTTtZ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