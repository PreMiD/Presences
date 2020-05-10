const presence = new Presence({
    clientId: "691867169251655758"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.URL === "https://emojipedia.org/" ||
        document.URL === "https://emojipedia.org") {
        presenceData.details = "Staring at the main page";
    }
    else if (document.location.href.includes("https://blog.emojipedia.org")) {
        if (document.URL === "https://blog.emojipedia.org/" ||
            document.URL === "https://blog.emojipedia.org") {
            presenceData.details = "Skimming through the blog homepage";
        }
        else {
            presenceData.details = "Reading a blog post...";
            presenceData.state = document.getElementsByClassName("post-full-title")[0].textContent;
        }
    }
    else if (document.location.href.includes("/search")) {
        presenceData.details = "Searching for...";
        if (document.location.href.includes("/search/?q=")) {
            presenceData.state = document.getElementById("id_q").value;
        }
        else {
            presenceData.state = "Nothing.. you alright there?";
        }
    }
    else {
        const categoryURLs = [
            "https://emojipedia.org/people",
            "https://emojipedia.org/nature",
            "https://emojipedia.org/food-drink",
            "https://emojipedia.org/activity",
            "https://emojipedia.org/travel-places",
            "https://emojipedia.org/symbols",
            "https://emojipedia.org/flags"
        ];
        const eventURLs = [
            "https://emojipedia.org/australia-day",
            "https://emojipedia.org/bastille-day",
            "https://emojipedia.org/birthday",
            "https://emojipedia.org/black-friday",
            "https://emojipedia.org/canada-day",
            "https://emojipedia.org/carnaval",
            "https://emojipedia.org/chinese-new-year",
            "https://emojipedia.org/christmas",
            "https://emojipedia.org/cinco-de-mayo",
            "https://emojipedia.org/coronavirus",
            "https://emojipedia.org/diwali",
            "https://emojipedia.org/dragon-boat-festival",
            "https://emojipedia.org/easter",
            "https://emojipedia.org/emoji-movie",
            "https://emojipedia.org/fall-autumn",
            "https://emojipedia.org/fathers-day",
            "https://emojipedia.org/festivus",
            "https://emojipedia.org/graduation",
            "https://emojipedia.org/guy-fawkes",
            "https://emojipedia.org/halloween",
            "https://emojipedia.org/hanukkah",
            "https://emojipedia.org/hearts",
            "https://emojipedia.org/holi",
            "https://emojipedia.org/independence-day",
            "https://emojipedia.org/mothers-day",
            "https://emojipedia.org/new-years-eve",
            "https://emojipedia.org/olypmics",
            "https://emojipedia.org/pride",
            "https://emojipedia.org/queens-birthday",
            "https://emojipedia.org/ramadan",
            "https://emojipedia.org/spring",
            "https://emojipedia.org/st-patricks-day",
            "https://emojipedia.org/spring",
            "https://emojipedia.org/summer",
            "https://emojipedia.org/super-bowl",
            "https://emojipedia.org/thanksgiving",
            "https://emojipedia.org/valentines-day",
            "https://emojipedia.org/wedding-marriage",
            "https://emojipedia.org/winter",
            "https://emojipedia.org/winter-olympics",
            "https://emojipedia.org/world-cup",
            "https://emojipedia.org/world-emoji-day"
        ];
        let bypass = false;
        let isCategory = false;
        let isEvent = false;
        for (let n = 0; n < categoryURLs.length; n++) {
            if (document.URL.includes(categoryURLs[n]))
                (isCategory = true), (bypass = true);
        }
        if (bypass !== true) {
            for (let n = 0; n < eventURLs.length; n++) {
                if (document.URL.includes(eventURLs[n]))
                    (isEvent = true), (bypass = true);
            }
        }
        if (isCategory === true) {
            presenceData.details = "Viewing a category...";
            presenceData.state = document.getElementsByTagName("h1")[0].innerText;
        }
        else if (isEvent === true) {
            presenceData.details = "Viewing an event...";
            presenceData.state = document.getElementsByTagName("h1")[0].innerText;
        }
        else {
            if (document.getElementsByTagName("h1").length >= 1) {
                const emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
                if (emojiRegex.test(document.getElementsByTagName("h1")[0].innerText) ===
                    true) {
                    presenceData.details = "Viewing an emoji...";
                    presenceData.state = document.getElementsByTagName("h1")[0].innerText;
                }
                else {
                    presenceData.details = "Viewing a page...";
                    presenceData.state = document.getElementsByTagName("h1")[0].innerText;
                }
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQ0UsUUFBUSxDQUFDLEdBQUcsS0FBSyx5QkFBeUI7UUFDMUMsUUFBUSxDQUFDLEdBQUcsS0FBSyx3QkFBd0IsRUFDekM7UUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO0tBQ25EO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsRUFBRTtRQUN6RSxJQUNFLFFBQVEsQ0FBQyxHQUFHLEtBQUssOEJBQThCO1lBQy9DLFFBQVEsQ0FBQyxHQUFHLEtBQUssNkJBQTZCLEVBQzlDO1lBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQ0FBb0MsQ0FBQztTQUM3RDthQUFNO1lBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztZQUNoRCxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FDbEQsaUJBQWlCLENBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1NBQ2xCO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNyRCxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQzFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2xE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