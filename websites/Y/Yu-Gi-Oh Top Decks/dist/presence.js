const presence = new Presence({
    clientId: "630550023133724692"
});
var deck;
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        const presenceData = {
            details: "Browsing Decks..",
            state: "at Homepage",
            largeImageKey: "banner",
            smallImageKey: "icon",
            smallImageText: "browsing"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/decklists") {
        var pagenumber = document.getElementsByClassName("current")[0]
            .firstElementChild.textContent;
        var no1 = document.getElementById("deck_lists").lastElementChild
            .firstElementChild.children[2].textContent;
        var auth = document.getElementById("deck_lists").lastElementChild
            .firstElementChild.children[1].ENTITY_NODE;
        var deckurl = document.getElementById("deck_lists").lastElementChild
            .firstElementChild.children[2].firstElementChild.href;
        const presenceData = {
            details: "Looking at Decklists",
            state: `Page: ${pagenumber} top: ${no1} by ${auth}`,
            largeImageKey: "banner",
            smallImageKey: "icon",
            smallImageText: deckurl
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/top_decks") {
        const top = document
            .getElementsByClassName("sortable")[0]
            .children[1].firstElementChild.children[1].textContent.replace("Most Used Cards", "");
        const presenceData = {
            details: "Looking at Top decks",
            state: `Current Meta: ${top}`,
            largeImageKey: "banner",
            smallImageKey: "icon",
            smallImageText: "looking"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/top_cards") {
        const top = document.getElementsByClassName("sortable")[0].children[1]
            .firstElementChild.children[2].textContent;
        var price = document.getElementsByClassName("sortable")[0].children[1]
            .firstElementChild.children[4].textContent;
        const presenceData = {
            details: "Looking at Top Cards",
            state: `Top Card: ${top} Price: ${price}`,
            largeImageKey: "banner",
            smallImageKey: "icon",
            smallImageText: "looking"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/new_deck") {
        deck = document.getElementsByName("deck_name")[0]
            .value;
        const presenceData = {
            details: "Building Deck",
            state: `Editing: ${deck}`,
            largeImageKey: "banner",
            smallImageKey: "icon",
            smallImageText: "creating deck"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/deck")) {
        if (/\d/.test("/deck/8205")) {
            deck = document.getElementsByClassName("large-12 columns panel")[0]
                .firstElementChild.textContent;
            var by = document.getElementsByClassName("large-12 columns panel")[0]
                .children[1].children[1].textContent;
            var archetype = document.getElementsByClassName("large-12 columns panel")[0].children[1].children[10].textContent;
            var value = document
                .getElementsByClassName("large-12 columns panel")[1]
                .children[1].textContent.replace("\n", ":")
                .split(":")[1];
            const presenceData = {
                details: `Viewing deck: ${deck} (archetype: ${archetype})`,
                state: `by: ${by}, price: ${value}`,
                largeImageKey: "banner",
                smallImageKey: "icon",
                smallImageText: document.location.href
            };
            presence.setActivity(presenceData);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksSUFBSSxDQUFDO0FBRVQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsTUFBTSxZQUFZLEdBQWlCO1lBQ2pDLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsS0FBSyxFQUFFLGFBQWE7WUFFcEIsYUFBYSxFQUFFLFFBQVE7WUFDdkIsYUFBYSxFQUFFLE1BQU07WUFDckIsY0FBYyxFQUFFLFVBQVU7U0FDM0IsQ0FBQztRQUVGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFlBQVksRUFBRTtRQUNyRCxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNELGlCQUFpQixDQUFDLFdBQVcsQ0FBQztRQUNqQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQjthQUM3RCxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzdDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsZ0JBQWdCO2FBQzlELGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDN0MsSUFBSSxPQUFPLEdBQUksUUFBUSxDQUFDLGNBQWMsQ0FB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