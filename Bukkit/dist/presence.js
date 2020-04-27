var presence = new Presence({
    clientId: "626481021843669044"
});
var user, search, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "bukkit"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "bukkit.org" ||
        document.location.hostname == "dl.bukkit.org") {
        if (document.location.pathname.includes("/threads/")) {
            title = document.querySelector("#content > div.pageWidth > div.pageContent > div.titleBar > h1");
            presenceData.details = "Forums, viewing thread:";
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/forums/")) {
            title = document.querySelector("#content > div.pageWidth > div.pageContent > div.titleBar > h1");
            if (title != null) {
                presenceData.details = "Forums, viewing category:";
                presenceData.state = title.innerText;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, Browsing...";
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/search/")) {
            search = document.querySelector("#content > div.pageWidth > div.pageContent > div.mainContainer > div > div.titleBar > h1 > a > em");
            if (search !== null) {
                presenceData.details = "Forums, Searching for:";
                presenceData.state = search.innerText;
                presenceData.smallImageKey = "search";
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, Going to search";
                presenceData.state = "something up";
                presenceData.smallImageKey = "search";
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/members/")) {
            if (document.URL.includes("type=iwd_staff-members")) {
                presenceData.details = "Forums, Viewing the list";
                presenceData.state = "of staff members";
                presence.setActivity(presenceData);
            }
            else if (document.URL.includes("type=points")) {
                presenceData.details = "Forums, Viewing list of";
                presenceData.state = "members with the most points";
                presence.setActivity(presenceData);
            }
            else if (document.URL.includes("type=staff")) {
                presenceData.details = "Forums, Viewing list of";
                presenceData.state = "staff members";
                presence.setActivity(presenceData);
            }
            else if (document.URL.includes("type=positive_ratings")) {
                presenceData.details = "Forums, Viewing list of";
                presenceData.state = "members with the most reactions";
                presence.setActivity(presenceData);
            }
            else if (document.querySelector("#content > div.pageWidth > div.pageContent > div.profilePage > div.mainProfileColumn > div > div > h1") !== null) {
                user = document.querySelector("#content > div.pageWidth > div.pageContent > div.profilePage > div.mainProfileColumn > div > div > h1");
                presenceData.details = "Forums, Viewing user:";
                presenceData.state = user.innerText;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, Viewing list of";
                presenceData.state = "members with the most messages";
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/XenStaff/")) {
            presenceData.details = "Forums, viewing staff list";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/account/")) {
            presenceData.details = "Forums, account settings";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/help/")) {
            title = document.querySelector("#content > div.pageWidth > div.pageContent > div.titleBar > h1");
            presenceData.details = "Help Center, reading:";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/pages/")) {
            title = document.querySelector("#content > div.pageWidth > div.pageContent > div.titleBar > h1");
            presenceData.details = "Forums, reading:";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "bukkit.gamepedia.com") {
        title = document.querySelector("#firstHeading");
        if (title != null) {
            presenceData.details = "Docs, reading:";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Docs, Browsing...";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "dev.bukkit.org") {
        if (document.location.pathname.includes("/dashboard")) {
            presenceData.details = "Devs, viewing:";
            presenceData.state = "Dashboard";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/paste")) {
            presenceData.details = "Devs, viewing:";
            presenceData.state = "Paste";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/bukkit-plugins/")) {
            title = document.querySelector("#content > section > section.level-categories.categories-tier > div > div > ul > li.tier-holder > ul > li.level-categories-nav.highlight > a > span");
            presenceData.details = "Devs, viewing plugins in";
            presenceData.state = "category: " + title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/bukkit-plugins")) {
            presenceData.details = "Devs, viewing:";
            presenceData.state = "bukkit plugins";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/search")) {
            search = document.querySelector("#field-search");
            presenceData.details = "Devs, searching for:";
            presenceData.state = search.value;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/members/")) {
            title = document.querySelector("#content > section > section > div.p-user-info > ul.p-user-details > li.username");
            presenceData.details = "Devs, viewing user:";
            presenceData.state = title.innerText;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/members")) {
            presenceData.details = "Devs, viewing all users";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/projects/")) {
            title = document.querySelector("#site-main > section.atf > div > div > div.project-details-container > div > h1 > a > span");
            presenceData.details = "Devs, viewing project:";
            if (title.innerText.length > 128) {
                presenceData.state = title.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = title.innerText;
            }
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUFFLE1BQVcsRUFBRSxLQUFVLENBQUM7QUFFdkMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxRQUFRO0tBQ3hCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUM1QyxJQUNFLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFlBQVk7UUFDMUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUM3QztRQUNBLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3BELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QixnRUFBZ0UsQ0FDakUsQ0FBQztZQUVGLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7WUFDakQsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ2hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUNoRTtpQkFBTTtnQkFDTCxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDdEM7WUFDRCxR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