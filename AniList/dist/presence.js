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
    clientId: "614220272790274199"
}), startTimestamp = Math.floor(Date.now() / 1000), strings = presence.getStrings({
    "browsing": "presence.activity.browsing"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const presenceData = {
        largeImageKey: "anilist_lg",
        startTimestamp
    };
    const { pathname } = window.location;
    if (pathname.startsWith(`/home`)) {
        presenceData.details = (yield strings).browsing;
        presenceData.state = "Home";
    }
    else if (pathname.startsWith(`/user`)) {
        const user = document.querySelector('.name').textContent;
        if (pathname.includes(`mangalist`)) {
            presenceData.details = `Viewing ${user}'s manga list`;
        }
        else if (pathname.includes(`animelist`)) {
            presenceData.details = `Viewing ${user}'s anime list`;
        }
        else {
            presenceData.details = `Viewing ${user}'s profile`;
        }
    }
    else if (pathname.startsWith(`/search`)) {
        presenceData.details = "Searching";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Searching";
    }
    else if (pathname.startsWith(`/anime`)) {
        const title = document.querySelector('div.content > h1').textContent.trim();
        presenceData.details = "Viewing an anime";
        presenceData.state = title;
    }
    else if (pathname.startsWith(`/manga`)) {
        const title = document.querySelector('div.content > h1').textContent.trim();
        presenceData.details = "Viewing a manga";
        presenceData.state = title;
    }
    else if (pathname.startsWith(`/forum`)) {
        if (pathname.split('/').length > 3) {
            presenceData.details = "Reading a forum post";
            presenceData.state = `'${document.querySelector('h1.title').textContent.trim()}'`;
        }
        else {
            presenceData.details = "Browsing the forum";
        }
    }
    else if (pathname.startsWith(`/studio`)) {
        presenceData.details = "Viewing a studio";
        presenceData.state = document.querySelector('div.container > h1').textContent;
    }
    presence.setActivity(presenceData, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBYyxJQUFJLFFBQVEsQ0FBQztJQUNuQyxRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsRUFDRixjQUFjLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQ3RELE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzFCLFVBQVUsRUFBRSw0QkFBNEI7Q0FDM0MsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLE1BQU0sWUFBWSxHQUFrQjtRQUNoQyxhQUFhLEVBQUUsWUFBWTtRQUMzQixjQUFjO0tBQ2pCLENBQUM7SUFDRixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDOUIsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2hELFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQy9CO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ3pELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNoQyxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsSUFBSSxlQUFlLENBQUM7U0FDekQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLElBQUksZUFBZSxDQUFDO1NBQ3pEO2FBQU07WUFDSCxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsSUFBSSxZQUFZLENBQUM7U0FDdEQ7S0FDSjtTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN2QyxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztLQUM3QztTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN0QyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVFLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDOUI7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDdEMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1RSxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1FBQ3pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQzlCO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3RDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUE7WUFDN0MsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7U0FDckY7YUFBTTtZQUNILFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7U0FDL0M7S0FDSjtTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN2QyxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQztLQUNqRjtJQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQSxDQUFDLENBQUEifQ==