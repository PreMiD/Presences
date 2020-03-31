var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_info(message) {
    console.log("%cPreMiD%cINFO%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;", "color: unset;");
}
function PMD_error(message) {
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
function PMD_success(message) {
    console.log("%cPreMiD%cSUCCESS%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle +
        "border-radius: 0 25px 25px 0; background: #50ff50; color: black;", "color: unset;");
}
var presence = new Presence({
    clientId: "617500416887881748"
});
var group, typing, chat, user, search, card, bot, personal2, profile, board2;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "fror_why"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "web.skype.com") {
        user = document.querySelector("body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > button > div > div");
        typing = document.querySelector("body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div > span > br");
        bot = document.querySelector("body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > button > div > div");
        if (user !== null) {
            if (typing == null) {
                presenceData.details = "Typing in chat:";
                presenceData.state = user.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Reading chat:";
                presenceData.state = user.innerText;
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
        }
        else if (bot !== null) {
            if (typing == null) {
                presenceData.details = "Typing in chat:";
                presenceData.state = bot.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Reading chat:";
                presenceData.state = bot.innerText;
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "preview.web.skype.com") {
        user = document.querySelector("body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div > div > button > div > div");
        typing = document.querySelector("body > div.app-container > div > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > div > div > span > span");
        if (user !== null) {
            if (typing !== null) {
                presenceData.details = "Typing in chat:";
                presenceData.state = user.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Reading chat:";
                presenceData.state = user.innerText;
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "www.skype.com") {
        presenceData.details = "Skype";
        presenceData.state = "Browsing...";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV2RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLE9BQU87SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxvQkFBb0IsR0FBRyxPQUFPLEVBQzlCLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxlQUFlLENBQ2hCLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsT0FBTztJQUMxQixPQUFPLENBQUMsR0FBRyxDQUNULHNCQUFzQixHQUFHLE9BQU8sRUFDaEMsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZO1FBQ1Ysa0VBQWtFLEVBQ3BFLGVBQWUsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksS0FBVSxFQUNaLE1BQVcsRUFDWCxJQUFTLEVBQ1QsSUFBUyxFQUNULE1BQVcsRUFDWCxJQUFTLEVBQ1QsR0FBUSxFQUNSLFNBQWMsRUFDZCxPQUFZLEVBQ1osTUFBVyxDQUFDO0FBRWQsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxZ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