const presence = new Presence({
    clientId: "680498892651233310"
}), strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    reading: "presence.activity.reading"
});
presence.on("UpdateData", async () => {
    const path = window.location.pathname.split("/").slice(1);
    const presenceData = {
        details: "My Nintendo",
        largeImageKey: "logo_big"
    };
    if (path.length > 0) {
        switch (path[0]) {
            case "reward_categories":
                presenceData.smallImageKey = "reading";
                presenceData.smallImageText = (await strings).browsing;
                presenceData.details = document.getElementsByClassName("PageHeader_title")[0].textContent;
                if (path.length > 1)
                    presenceData.state = document.getElementsByClassName("PageSubHeader_title")[0].textContent;
                break;
            case "rewards":
                presenceData.smallImageKey = "reading";
                presenceData.smallImageText = (await strings).reading;
                if (!path.includes("media")) {
                    presenceData.details = document.getElementsByClassName("PageHeader_title")[0].textContent;
                    if (path.length > 1)
                        presenceData.state = document.getElementsByClassName("RewardHeader_title")[0].textContent;
                }
                break;
            case "missions":
                presenceData.smallImageKey = "reading";
                presenceData.smallImageText = (await strings).browsing;
                presenceData.details = document.getElementsByClassName("PageHeader_title")[0].textContent;
                break;
            case "point":
                if (path.length > 1) {
                    switch (path[1]) {
                        case "wallet":
                            presenceData.details = document.getElementsByClassName("PageHeader_title")[0].textContent;
                            presenceData.state = document.getElementsByClassName("PageSubHeader_title")[0].textContent;
                            break;
                        default:
                            presence.setTrayTitle();
                            presence.setActivity();
                            return;
                    }
                }
                else {
                    presence.setTrayTitle();
                    presence.setActivity();
                    return;
                }
                break;
            case "news":
                presenceData.details = document.getElementsByClassName("PageHeader_title")[0].textContent;
                if (path.length > 1) {
                    presenceData.smallImageKey = "reading";
                    presenceData.smallImageText = (await strings).reading;
                    presenceData.state = document.getElementsByClassName("NewsDetail_title")[0].textContent;
                }
                else {
                    presenceData.smallImageKey = "reading";
                    presenceData.smallImageText = (await strings).browsing;
                    presenceData.state = document.getElementsByClassName("PageSubHeader_title")[0].textContent;
                }
                break;
            case "serial_number":
                presenceData.details = document.getElementsByClassName("PageHeader_title")[0].textContent;
                break;
            case "getting_started":
                presenceData.smallImageKey = "reading";
                presenceData.smallImageText = (await strings).reading;
                presenceData.details = document.getElementsByClassName("PageHeader_title")[0].textContent;
                break;
            case "about_point":
                presenceData.smallImageKey = "reading";
                presenceData.smallImageText = (await strings).reading;
                presenceData.details = document.getElementsByClassName("PageHeader_title")[0].textContent;
                break;
            case "about_gold_point":
                presenceData.smallImageKey = "reading";
                presenceData.smallImageText = (await strings).reading;
                presenceData.details = document.getElementsByClassName("PageHeader_title")[0].textContent;
                break;
            default:
                presence.setTrayTitle();
                presence.setActivity();
                return;
        }
    }
    else {
        presence.setTrayTitle();
        presence.setActivity();
        return;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixRQUFRLEVBQUUsNEJBQTRCO0lBQ3RDLE9BQU8sRUFBRSwyQkFBMkI7Q0FDckMsQ0FBQyxDQUFDO0FBRUwsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxNQUFNLFlBQVksR0FBaUI7UUFDakMsT0FBTyxFQUFFLGFBQWE7UUFDdEIsYUFBYSxFQUFFLFVBQVU7S0FDMUIsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFFbkIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFFZixLQUFLLG1CQUFtQjtnQkFDdEIsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0JBQ3ZDLFlBQVksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFFdkQsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQ3BELGtCQUFrQixDQUNuQixDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQkFFakIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQ2pCLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUNsRCxxQkFBcUIsQ0FDdEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxX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