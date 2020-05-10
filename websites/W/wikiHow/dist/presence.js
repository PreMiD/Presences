const presence = new Presence({
    clientId: "630570838084812801"
});
presence.on("UpdateData", async () => {
    const path = document.location.pathname, topic = document.querySelector("#intro > h1 > a"), category = document.querySelector("#article > div.wh_block > h1");
    if (topic && topic.textContent != "") {
        const author = document.querySelector("#expert_coauthor > a"), date = document.querySelector("#expert_coauthor > p"), presenceData = {
            details: topic.textContent,
            state: `by ${author && author.textContent != "" ? author.textContent : "unknown"}${date && date.textContent != ""
                ? ` (${date.textContent.replace("Updated: ", "")})`
                : ""} `,
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: decodeURIComponent(document.location.href),
            startTimestamp: Math.floor(Date.now() / 1000)
        };
        presence.setActivity(presenceData);
    }
    else if (category && category.textContent != "") {
        const presenceData = {
            details: "Viewing a category:",
            state: category.textContent,
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: decodeURIComponent(document.location.href),
            startTimestamp: Math.floor(Date.now() / 1000)
        };
        presence.setActivity(presenceData);
    }
    else if (path == "/index.php") {
        const newTopic = document.getElementsByClassName("firstHeading")[0]
            ? document.getElementsByClassName("firstHeading")[0].textContent
            : null, presenceData = {
            details: "Editing/Writing How to",
            state: `Topic: ${newTopic ? newTopic : "Unknown."} `,
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: decodeURIComponent(document.location.href),
            startTimestamp: Math.floor(Date.now() / 1000)
        };
        presence.setActivity(presenceData);
    }
    else if (path == "/wikiHowTo") {
        const searching = document.location.search.replace("?search=", ""), presenceData = {
            details: `Searching for:`,
            state: `${searching[0].toUpperCase() + searching.slice(1).toLowerCase()}`,
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: "Searching...",
            startTimestamp: Math.floor(Date.now() / 1000)
        };
        presence.setActivity(presenceData);
    }
    else {
        const presenceData = {
            details: "Viewing a page:",
            state: "Homepage",
            largeImageKey: "banner",
            smallImageKey: "logo",
            startTimestamp: Math.floor(Date.now() / 1000)
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUNqRCxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBRXBFLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsRUFDM0QsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsRUFDckQsWUFBWSxHQUFpQjtZQUMzQixPQUFPLEVBQUUsS0FBSyxDQUFDLFdBQVc7WUFDMUIsS0FBSyxFQUFFLE1BQ0wsTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUM1RCxHQUNFLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUU7Z0JBQzVCLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRztnQkFDbkQsQ0FBQyxDQUFDLEVBQ04sR0FBRztZQUNILGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxRQUFRLENB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