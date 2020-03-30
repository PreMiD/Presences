let presence = new Presence({
    clientId: "614220272790274199"
}), startTimestamp = Math.floor(Date.now() / 1000), strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    reading: "presence.activity.reading"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "anilist_lg",
        startTimestamp
    };
    const { pathname } = window.location;
    if (pathname.startsWith(`/home`)) {
        presenceData.details = (await strings).browsing;
        presenceData.state = "Home";
    }
    else if (pathname.startsWith(`/user`)) {
        const user = document.querySelector(".name").textContent;
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
        const title = document.querySelector("div.content > h1").textContent.trim();
        presenceData.details = "Viewing an anime";
        presenceData.state = title;
    }
    else if (pathname.startsWith(`/manga`)) {
        const title = document.querySelector("div.content > h1").textContent.trim();
        presenceData.details = "Viewing a manga";
        presenceData.state = title;
    }
    else if (pathname.startsWith(`/forum`)) {
        if (pathname.split("/").length > 3) {
            presenceData.details = "Reading a forum post";
            presenceData.state = `'${document
                .querySelector("h1.title")
                .textContent.trim()}'`;
            presenceData.smallImageKey = `reading`;
            presenceData.smallImageText = (await strings).reading;
        }
        else {
            presenceData.details = "Browsing the forum";
        }
    }
    else if (pathname.startsWith(`/studio`)) {
        presenceData.details = "Viewing a studio";
        presenceData.state = document.querySelector("div.container > h1").textContent;
    }
    else if (pathname.startsWith(`/review`)) {
        const title = document.querySelector(`a.title`).textContent.trim();
        presenceData.details = `Reading a '${title}' review`;
        const author = document
            .querySelector(`a.author`)
            .textContent.trim()
            .replace(`a review `, ``);
        presenceData.state = `${author}`;
        presenceData.smallImageKey = `reading`;
        presenceData.smallImageText = (await strings).reading;
    }
    presence.setActivity(presenceData, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixjQUFjLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQ3RELE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsT0FBTyxFQUFFLDJCQUEyQjtDQUNwQyxDQUFDLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxNQUFNLFlBQVksR0FBaUI7UUFDbEMsYUFBYSxFQUFFLFlBQVk7UUFDM0IsY0FBYztLQUNkLENBQUM7SUFDRixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDakMsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2hELFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQzVCO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ3pELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsSUFBSSxlQUFlLENBQUM7U0FDdEQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFD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