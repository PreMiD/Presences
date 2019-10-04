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
    else if (path.includes('/users') && !path.includes('/library')) {
        user = document.querySelector(".cover-username").textContent.trim();
        presenceData.details = `Viewing ${user} profile`;
        delete presenceData.state, presenceData.startTimestamp;
    }
    else if (path.includes('/library')) {
        user = document.querySelector(".cover-username").textContent.trim();
        presenceData.details = `Viewing ${user} profile`;
        presenceData.state = 'Viewing their library';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUNILElBQUksWUFBWSxHQUFpQjtJQUM3QixhQUFhLEVBQUUsVUFBVTtDQUM1QixDQUFBO0FBRUQsSUFBSSxJQUFJLEVBQUUsSUFBWSxDQUFDO0FBQ3ZCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDOUIsVUFBVSxFQUFFLDRCQUE0QjtDQUMzQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRWhDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNoRCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7S0FDN0I7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzlELElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BFLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxJQUFJLFVBQVUsQ0FBQztRQUVqRCxPQUFPLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLGNBQWMsQ0FBQztLQUMxRDtTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNsQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwRSxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsSUFBSSxVQUFVLENBQUM7UUFDakQsWUFBWSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQztLQUNoRDtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFBO1FBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO0tBQ3JGO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNqRSxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFBO1FBRTNDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQTtLQUM1QjtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFBO1FBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO0tBQ3JGO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNqRSxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFBO1FBRTNDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQTtLQUM1QjtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFBO1FBQy9DLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7S0FDbEc7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ25FLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUE7UUFFNUMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFBO0tBQzVCO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUE7UUFDbEQsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3hCLEtBQUssTUFBTTtnQkFDUCxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQTtnQkFFbkMsTUFBTTtZQUVWLEtBQUssa0JBQWtCO2dCQUNuQixZQUFZLENBQUMsS0FBSyxHQUFHLDBCQUEwQixDQUFBO2dCQUUvQyxNQUFNO1lBRVYsS0FBSyxtQkFBbUI7Z0JBQ3BCLFlBQVksQ0FBQyxLQUFLLEdBQUcsMkJBQTJCLENBQUE7Z0JBRWhELE1BQU07WUFFVixLQUFLLGFBQWE7Z0JBQ2QsWUFBWSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQTtnQkFFMUMsTUFBTTtZQUVWLEtBQUssaUJBQWlCO2dCQUNsQixZQUFZLENBQUMsS0FBSyxHQUFHLHlCQUF5QixDQUFBO2dCQUU5QyxNQUFNO1lBRVY7Z0JBQ0ksWUFBWSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQTtTQUNoRDtLQUNKO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFBLENBQUMsQ0FBQSJ9