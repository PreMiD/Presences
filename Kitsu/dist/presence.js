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
            case 'activity':
                presenceData.state = 'Viewing their activity';
                break;
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
                presenceData.state = 'I don\'t think they even know what they\'re viewing';
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
    presence.setActivity(presenceData, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUM3QixhQUFhLEVBQUUsVUFBVTtDQUM1QixDQUFBO0FBRUQsSUFBSSxJQUFJLEVBQUUsSUFBWSxDQUFDO0FBQ3ZCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDOUIsVUFBVSxFQUFFLDRCQUE0QjtDQUMzQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRWhDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNoRCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7S0FDN0I7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDaEMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLElBQUksVUFBVSxDQUFDO1FBRWpELFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4QixLQUFLLFVBQVU7Z0JBQ1gsWUFBWSxDQUFDLEtBQUssR0FBRyx3QkFBd0IsQ0FBQTtnQkFDN0MsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixZQUFZLENBQUMsS0FBSyxHQUFHLHVCQUF1QixDQUFBO2dCQUM1QyxNQUFNO1lBQ1YsS0FBSyxXQUFXO2dCQUNaLFlBQVksQ0FBQyxLQUFLLEdBQUcseUJBQXlCLENBQUE7Z0JBQzlDLE1BQU07WUFDVixLQUFLLFdBQVc7Z0JBQ1osWUFBWSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQTtnQkFDOUMsTUFBTTtZQUNWLEtBQUssV0FBVztnQkFDWixZQUFZLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFBO2dCQUM5QyxNQUFNO1lBQ1YsS0FBSyxRQUFRO2dCQUNULFlBQVksQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUE7Z0JBQzNDLE1BQU07WUFDVjtnQkFDSSxZQUFZLENBQUMsS0FBSyxHQUFHLHFEQUFxRCxDQUFBO1NBQ2pGO0tBQ0o7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbEMsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQTtRQUM5QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEIsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7U0FDckY7O1lBQU0sT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFBO0tBQ25DO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2xDLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUE7UUFDOUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3BCLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1NBQ3JGOztZQUFNLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQTtLQUNuQztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFBO1FBQy9DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1NBQ2xHOztZQUFNLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQTtLQUNuQztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNyQyxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFBO1FBQ2xELFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4QixLQUFLLE1BQU07Z0JBQ1AsWUFBWSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUE7Z0JBRW5DLE1BQU07WUFFVixLQUFLLGtCQUFrQjtnQkFDbkIsWUFBWSxDQUFDLEtBQUssR0FBRywwQkFBMEIsQ0FBQTtnQkFFL0MsTUFBTTtZQUVWLEtBQUssbUJBQW1CO2dCQUNwQixZQUFZLENBQUMsS0FBSyxHQUFHLDJCQUEyQixDQUFBO2dCQUVoRCxNQUFNO1lBRVYsS0FBSyxhQUFhO2dCQUNkLFlBQVksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUE7Z0JBRTFDLE1BQU07WUFFVixLQUFLLGlCQUFpQjtnQkFDbEIsWUFBWSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQTtnQkFFOUMsTUFBTTtZQUVWO2dCQUNJLFlBQVksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUE7U0FDaEQ7S0FDSjtJQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQSxDQUFDLENBQUEifQ==