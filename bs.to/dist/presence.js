var presence = new Presence({
    clientId: "639568013590528030"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var search;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "bs"
    };
    if (document.location.hostname == "bs.to") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.location.pathname.includes("/serie/")) {
            presenceData.startTimestamp = browsingStamp;
            user = document.querySelector("#sp_left > h2");
            presenceData.details = "Viewing serie:";
            presenceData.state = user.innerText;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/andere-serien")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing all series";
        }
        else if (document.location.pathname.includes("/search")) {
            search = document.querySelector("#root > section > form > fieldset > label:nth-child(1) > input[type=text]");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Searching for:";
            presenceData.state = search.value;
            presenceData.smallImageKey = "search";
        }
    }
    else if (document.location.hostname == "board.bs.to") {
        if (document.URL.includes("/topic/")) {
            title = document.querySelector("#ipsLayout_mainArea > div.ipsPageHeader.ipsClearfix > div.ipsPhotoPanel.ipsPhotoPanel_small.ipsPhotoPanel_notPhone.ipsClearfix > div > h1 > span.ipsType_break.ipsContained > span");
            presenceData.details = "Forums, viewing thread:";
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/trending/")) {
            presenceData.details = "Forums, Viewing the list of";
            presenceData.state = "trending threads";
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/profile")) {
            user = document.querySelector("#elProfileHeader > div.ipsColumns.ipsColumns_collapsePhone > div.ipsColumn.ipsColumn_fluid > div > h1");
            presenceData.details = "Viewing the profile of:";
            presenceData.state = user.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/whats-new/") &&
            document.URL.includes("/profile-posts")) {
            presenceData.details = "Forums, Viewing the list of";
            presenceData.state = "latest profile posts";
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/whats-new/") &&
            document.URL.includes("/posts")) {
            presenceData.details = "Forums, Viewing the list of";
            presenceData.state = "latest posts";
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/whats-new/") &&
            document.URL.includes("/news-feed")) {
            presenceData.details = "Forums, Viewing the";
            presenceData.state = "news feed";
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/whats-new/") &&
            document.URL.includes("/news-feed")) {
            presenceData.details = "Forums, Viewing the";
            presenceData.state = "latest activity";
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/whats-new/")) {
            presenceData.details = "Forums, Viewing whats new";
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/watched/")) {
            if (document.URL.includes("/threads")) {
                presenceData.details = "Forums, Viewing their";
                presenceData.state = "watched threads";
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, Viewing their";
                presenceData.state = "watched forums";
                presence.setActivity(presenceData);
            }
        }
        else if (document.URL.includes("/search/")) {
            search = document.querySelector("#ipsLayout_mainArea > div > div.ipsResponsive_hidePhone.ipsResponsive_block.ipsPageHeader > p");
            if (search != null) {
                presenceData.details = "Forums, searching for:";
                presenceData.state = search.innerText
                    .replace("Showing results for '", "")
                    .replace("'.", "");
                presenceData.smallImageKey = "search";
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, about to search";
                presenceData.state = "something up";
                presenceData.smallImageKey = "search";
                presence.setActivity(presenceData);
            }
        }
        else if (document.URL.includes("/account/")) {
            presenceData.details = "Forums, account settings";
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/members/")) {
            if (document.URL.includes("key=staff_members")) {
                presenceData.details = "Viewing the list";
                presenceData.state = "of staff members";
                presence.setActivity(presenceData);
            }
            else if (document.URL.includes("key=todays_birthdays")) {
                presenceData.details = "Viewing list of members";
                presenceData.state = "with today as their birthday";
                presence.setActivity(presenceData);
            }
            else if (document.URL.includes("/banned")) {
                presenceData.details = "Viewing the list";
                presenceData.state = "of banned users";
                presence.setActivity(presenceData);
            }
            else if (document.URL.includes("/list")) {
                presenceData.details = "Viewing the list";
                presenceData.state = "of all users";
                presence.setActivity(presenceData);
            }
            else if (document.URL.includes("key=most_likes")) {
                presenceData.details = "Viewing list of members";
                presenceData.state = "with the most reactions";
                presence.setActivity(presenceData);
            }
            else if (document.URL.includes("key=most_messages")) {
                presenceData.details = "Viewing list of members";
                presenceData.state = "with the most messages";
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Viewing overview of members";
                presence.setActivity(presenceData);
            }
        }
        else if (document.URL.includes("/forum/")) {
            title = document.querySelector("#ipsLayout_mainArea > div.ipsPageHeader.ipsClearfix > header > h1");
            if (title != null) {
                presenceData.details = "Forums, viewing category:";
                presenceData.state = title.innerText;
            }
            else {
                presenceData.details = "Forums, Browsing...";
            }
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE1BQVcsQ0FBQztBQUVoQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFO1FBQ3pDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1lBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDNUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN6RCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMvQyxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1lBQ3hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNwQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUN4QzthQUFNLElBQUksUUFBUSxDQUFD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