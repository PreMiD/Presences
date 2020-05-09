const presence = new Presence({
    clientId: "685827254256795677"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "dafont",
        startTimestamp: Math.floor(Date.now() / 1000)
    }, Path = document.location.pathname;
    let details;
    if (Path == "/") {
        details = document.querySelector("#width > div.minwidth > div > div > div:nth-child(9) > div:nth-child(3) > div.dfsmall > strong").textContent;
        presenceData.details = `Browsing the main page :`;
        presenceData.state = `${details}`;
    }
    else if (Path.startsWith("/themes.php")) {
        details = document.querySelector("#menuthemespp > table > tbody > tr")
            .children.length;
        presenceData.details = `Browsing the theme's page :`;
        presenceData.state = `${details} total themes`;
    }
    else if (Path.startsWith("/theme.php")) {
        details = document
            .querySelector("#width > div > div > div > div:nth-child(9) > div:nth-child(3) > div.dffont2")
            .innerHTML.replace("&gt;", ">");
        presenceData.details = `Browsing a sub-theme's page :`;
        presenceData.state = `${details}`;
    }
    else if (Path.startsWith("/mtheme.php")) {
        details = document.querySelector("#width > div > div > div > div:nth-child(9) > div:nth-child(5) > div.dffont2").innerHTML;
        presenceData.details = `Browsing a main-theme's page :`;
        presenceData.state = `${details}`;
    }
    else if (Path.startsWith("/new.php")) {
        details = document.querySelector("#width > div > div > div > div:nth-child(9) > div:nth-child(5) > span > span").textContent;
        presenceData.details = `Browsing the new fonts :`;
        presenceData.state = `${details}`;
    }
    else if (Path.startsWith("/top.php")) {
        details = document.location.search.length > 1 ? "All Time" : "Yesterday";
        presenceData.details = `Browsing the top fonts :`;
        presenceData.state = `${details}`;
    }
    else if (Path.startsWith("/authors.php")) {
        presenceData.details = `Browsing the authors :`;
        if (document.location.search.startsWith("?letter")) {
            presenceData.state = `Sorted by letter : ${document.location.search
                .replace("?letter=", "")
                .toUpperCase()}`;
        }
        else if (document.location.search.startsWith("?cc")) {
            presenceData.state = `Sorted by country : ${document.querySelector("#width > div > div.layout > div > div:nth-child(9) > div > div:nth-child(2) > div:nth-child(11) > div:nth-child(1)").innerHTML}`;
        }
        else {
            presenceData.state = `All authors`;
        }
    }
    else if (Path.startsWith("/forum")) {
        presenceData.details = `On the forum`;
    }
    else if (Path.startsWith("/faq.php")) {
        presenceData.details = `Reading the FAQ `;
    }
    else if (Path.startsWith("/soft.php")) {
        presenceData.details = `Viewing the tools `;
    }
    else if (Path.startsWith("/login.php")) {
        presenceData.details = `Logging into their account `;
    }
    else if (Path.startsWith("/register.php")) {
        presenceData.details = `Registering a new account  `;
    }
    else if (Path.endsWith(".font")) {
        presenceData.details = `Viewing a font's page :`;
        presenceData.state = `${document.querySelector("#width > div > div > div > div:nth-child(9) > h1")
            .textContent} ( ${document.querySelector("#width > div > div > div > div:nth-child(9) > div.lv2right > span").textContent} )`;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFFBQVE7UUFDdkIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztLQUM5QyxFQUNELElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxJQUFJLE9BQU8sQ0FBQztJQUVaLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtRQUNmLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM5QixnR0FBZ0csQ0FDakcsQ0FBQyxXQUFXLENBQUM7UUFDZCxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO1FBQ2xELFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztLQUNuQztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUN6QyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQ0FBb0MsQ0FBQzthQUNuRSxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ25CLFlBQVksQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUM7UUFDckQsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLE9BQU8sZUFBZSxDQUFDO0tBQ2hEO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ3hDLE9BQU8sR0FBRyxRQUFRO2FBQ2YsYUFBYSxDQUNaLDhFQUE4RSxDQUMvRTthQUNBLFNB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