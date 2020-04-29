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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBS0YsU0FBUyxXQUFXO1FBQ2xCLE9BQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBc0IsQ0FBQztJQUM1RSxDQUFDO0lBS0QsU0FBUyxZQUFZO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQU9ELEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxXQUFtQixFQUFFLE9BQWdCO1FBQ25FLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsSUFDRSxRQUFRLENBQUMsR0FBRyxLQUFLLHlCQUF5QjtRQUMxQyxRQUFRLENBQUMsR0FBRyxLQUFLLHdCQUF3QjtRQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQ3pDO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNwRSxZQUFZLENBQUMsY0FBYyxHQUFHLFlBQVksRUFBRSxDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDdkQsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLFFBQVEsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNwRSxZQUFZLENBQUMsY0FBYyxHQUFHLFlBQVksRUFBRSxDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDakQsWUFBWSxDQUFDLGNBQWMsR0FBRyxZQUFZLEVBQUUsQ0FBQztRQUU3QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNoRCxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDNUQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDOUQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDOUQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDN0Q7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN6RCxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNqRTthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzNELFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ2xFO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDekQsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDakU7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDL0Q7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN2RCxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sZ0JBQWdCLENBQzNDLGFBQWEsRUFDYixRQUFRO2lCQUNMLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMzQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQzFDLENBQUM7U0FDSDthQUFNO1lBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDakU7S0FDRjtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7UUFDakMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=