const presence = new Presence({
    clientId: "691534544301457449"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    function searchQuery() {
        return document.getElementById("search_form_input");
    }
    function setTimestamp() {
        return Math.floor(Date.now() / 1000);
    }
    async function handleFormatting(settingName, content) {
        const setting = await presence.getSetting(settingName);
        if (!content)
            return setting.replace("%search%", searchQuery().value);
        return setting.replace("%content%", content);
    }
    if (document.URL === "https://duckduckgo.com/" ||
        document.URL === "https://duckduckgo.com" ||
        document.location.href.includes("/&t=h_")) {
        presenceData.details = await presence.getSetting("homepageMessage");
        presenceData.startTimestamp = setTimestamp();
    }
    else if (document.location.href.includes("/settings")) {
        presenceData.details = await presence.getSetting("settingsMessage");
        presenceData.startTimestamp = setTimestamp();
    }
    else if (document.location.href.includes("?q=")) {
        presenceData.startTimestamp = setTimestamp();
        presenceData.smallImageKey = "search";
        if (document.location.href.includes("iaxm=maps")) {
            presenceData.details = await handleFormatting("mapSearch");
        }
        else if (document.location.href.includes("iax=images")) {
            presenceData.details = await handleFormatting("imageSearch");
        }
        else if (document.location.href.includes("iax=videos")) {
            presenceData.details = await handleFormatting("videoSearch");
        }
        else if (document.location.href.includes("iar=news")) {
            presenceData.details = await handleFormatting("newsSearch");
        }
        else if (document.location.href.includes("ia=meanings")) {
            presenceData.details = await handleFormatting("meaningsSearch");
        }
        else if (document.location.href.includes("ia=definition")) {
            presenceData.details = await handleFormatting("definitonSearch");
        }
        else if (document.location.href.includes("ia=shopping")) {
            presenceData.details = await handleFormatting("shoppingSearch");
        }
        else if (document.location.href.includes("ia=recipes")) {
            presenceData.details = await handleFormatting("recipeSearch");
        }
        else if (document.location.href.includes("&ia=stock")) {
            presenceData.details = await handleFormatting("stockSearch", document
                .getElementsByClassName("stocks__header")[0]
                .getElementsByTagName("a")[0].innerText);
        }
        else {
            presenceData.details = await handleFormatting("standardSearch");
        }
    }
    if (presenceData.details === null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBS0YsU0FBUyxXQUFXO1FBQ2xCLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBcUIsQ0FBQztJQUMxRSxDQUFDO0lBS0QsU0FBUyxZQUFZO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQU9ELEtBQUssVUFBVSxnQkFBZ0IsQ0FDN0IsV0FBbUIsRUFDbkIsT0FBZ0I7UUFFaEIsTUFBTSxPQUFPLEdBQUcsTUFBTSxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUNFLFFBQVEsQ0FBQyxHQUFHLEtBQUsseUJBQXlCO1FBQzFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssd0JBQXdCO1FBQ3pDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFDekM7UUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsQ0FBQyxp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