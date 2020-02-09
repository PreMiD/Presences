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
    "browsing": "presence.activity.browsing",
    "reading": "presence.activity.reading"
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
            presenceData.smallImageKey = `reading`;
            presenceData.smallImageText = (yield strings).reading;
        }
        else {
            presenceData.details = "Browsing the forum";
        }
    }
    else if (pathname.startsWith(`/studio`)) {
        presenceData.details = "Viewing a studio";
        presenceData.state = document.querySelector('div.container > h1').textContent;
    }
    else if (pathname.startsWith(`/review`)) {
        const title = document.querySelector(`a.title`).textContent.trim();
        presenceData.details = `Reading a '${title}' review`;
        const author = document.querySelector(`a.author`).textContent.trim().replace(`a review `, ``);
        presenceData.state = `${author}`;
        presenceData.smallImageKey = `reading`;
        presenceData.smallImageText = (yield strings).reading;
    }
    presence.setActivity(presenceData, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBYyxJQUFJLFFBQVEsQ0FBQztJQUNuQyxRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsRUFDRixjQUFjLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQ3RELE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzFCLFVBQVUsRUFBRSw0QkFBNEI7SUFDeEMsU0FBUyxFQUFFLDJCQUEyQjtDQUN6QyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsTUFBTSxZQUFZLEdBQWtCO1FBQ2hDLGFBQWEsRUFBRSxZQUFZO1FBQzNCLGNBQWM7S0FDakIsQ0FBQztJQUNGLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3JDLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM5QixZQUFZLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDaEQsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDL0I7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDckMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDekQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2hDLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxJQUFJLGVBQWUsQ0FBQztTQUN6RDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFX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