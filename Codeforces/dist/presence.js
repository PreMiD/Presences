let presence = new Presence({
    clientId: "639889063469645854"
}), startTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "large_img",
        startTimestamp
    };
    const url = window.location.href;
    if (url.includes("/submit")) {
        presenceData.details = "Submitting code";
    }
    else if (url.includes("/contest/") ||
        url.includes("/gym/") ||
        url.includes("/problem/")) {
        var tokens = document.title.split("-");
        if (url.includes("/problem/")) {
            presenceData.details =
                "Problem " +
                    document
                        .getElementsByClassName("title")[0]
                        .innerText.replace(".", " -");
            var val = 0;
            if (url.includes("/group")) {
                val = 1;
            }
            tokens[1] = document.getElementsByTagName("th")[val].innerText;
        }
        else {
            presenceData.details = tokens[0].trim();
        }
        presenceData.state = tokens
            .join("-")
            .replace(tokens[0] + "-", "")
            .replace("- Codeforces", "");
    }
    else if (url.includes("/group/")) {
        presenceData.details =
            "Viewing " + document.title.replace(" - Codeforces", "");
        presenceData.state = document.getElementsByTagName("th")[0].innerText;
    }
    else if (url.includes("/problemset")) {
        presenceData.details = "Browsing Problemset";
        if (url.includes("?")) {
            presenceData.details = "Searching...";
            presenceData.smallImageKey = "search";
        }
    }
    else if (url.includes("/blog/entry/")) {
        const author = document
            .getElementsByClassName("info")[0]
            .outerText.split(",")[0]
            .substring(3);
        presenceData.state = author + "'s blog entry";
        presenceData.details = document.title.replace(" - Codeforces", "");
    }
    else if (url.includes("/profile/")) {
        presenceData.details = "Viewing someone's profile";
    }
    else {
        presenceData.state = "Browsing";
    }
    presence.setActivity(presenceData, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDaEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxXQUFXO1FBQzFCLGNBQWM7S0FDZCxDQUFDO0lBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFakMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzVCLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7S0FDekM7U0FBTSxJQUNOLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQ3hCO1FBQ0QsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlCLFlBQVksQ0FBQyxPQUFPO2dCQUNuQixVQUFVO29CQUNWLFFBQVE7eUJBQ04sc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNsQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzNCLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDUjtZQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQy9EO2FBQU07WUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN4QztRQUNELFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTTthQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ1QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDO2FBQzVCLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDOUI7U0FBTSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbkMsWUFBWSxDQUFDLE9BQU87WUFDbkIsVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRCxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7S0FDdEU7U0FBTSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7WUFDdEMsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7U0FDdEM7S0FDRDtTQUFNLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUN4QyxNQUFNLE1BQU0sR0FBRyxRQUFRO2FBQ3JCLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sR0FBRyxlQUFlLENBQUM7UUFDOUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbkU7U0FBTSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztLQUNuRDtTQUFNO1FBQ04sWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7S0FDaEM7SUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUMsQ0FBQyJ9