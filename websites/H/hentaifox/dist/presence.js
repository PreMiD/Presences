const presence = new Presence({
    clientId: "732982987905302570"
});
let lastPlaybackState = null;
let reading;
let browsingStamp = Math.floor(Date.now() / 1000);
let title, title2, currentPage, pageNumber, tabTitle, homeCurrentPage, tags, bartist, bcharacter, parodies, groups, language, category, profile, parodie1, parodie;
const pattern = "- Page";
let character, parody, group, tag, artist;
const searchURL = new URL(document.location.href);
const searchResult = searchURL.searchParams.get("q");
const truncateAfter = function (str, pattern) {
    return str.slice(0, str.indexOf(pattern));
};
if (lastPlaybackState != reading) {
    lastPlaybackState = reading;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "largeimage"
    };
    tabTitle = document.title;
    title = document.querySelector("div.gallery_right > div.info > h1");
    if (document.location.pathname.includes("/parodies/") || document.location.pathname.includes("/tags/") || document.location.pathname.includes("/characters/") || document.location.pathname.includes("/artists/") || document.location.pathname.includes("/groups/")) {
        var pathname = false;
    }
    else if (document.location.pathname.includes("/pag/")) {
        var pathname = true;
    }
    if (document.location.pathname == "/" || pathname == true || !document.location.pathname) {
        homeCurrentPage = document.querySelector("ul.pagination > li.page-item.active > a.page-link");
        data.details = "Home";
        data.state = "Page: " + homeCurrentPage.innerText;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/gallery/") || document.location.pathname.includes("/g/")) {
        if (tabTitle.includes("Page")) {
            currentPage = document.querySelector("div.gallery_pagination > button > span.current");
            pageNumber = document.querySelector("div.gallery_pagination > button > span.total_pages");
            title2 = truncateAfter(tabTitle, pattern);
            data.details = "Reading: " + title2;
            data.state = "Current page: " + currentPage.innerText + "/" + pageNumber.innerText;
            data.startTimestamp = browsingStamp;
        }
        else if (title.innerText.length > 0) {
            if (title.innerText.length > 128) {
                data.state = "Title longer than 128 characters.";
            }
            else {
                data.state = title.innerText;
            }
            data.details = "Viewing a page: ";
            data.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.includes("/tag/")) {
        data.details = "Browsing tags...";
        tags = document.querySelector("div.galleries_overview.g_center > h1.tag_info > span.skey");
        data.state = "Tag: " + tags.innerText;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/artist/")) {
        data.details = "Browsing artists...";
        bartist = document.querySelector("div.galleries_overview.g_center > h1.tag_info > span.skey");
        data.state = "Artist: " + bartist.innerText;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/character/")) {
        data.details = "Browsing characters...";
        bcharacter = document.querySelector("div.galleries_overview.g_center > h1.tag_info > span.skey");
        data.state = "Character: " + bcharacter.innerText;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/parody/")) {
        data.details = "Browsing parodies...";
        parodies = document.querySelector("div.galleries_overview.g_center > h1.tag_info > span.skey");
        data.state = "Parody: " + parodies.innerText;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/group/")) {
        data.details = "Browsing groups...";
        groups = document.querySelector("div.galleries_overview.g_center > h1.tag_info > span.skey");
        data.state = "Group: " + groups.innerText;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/language/")) {
        data.details = "Browsing language...";
        language = document.querySelector("div.galleries_overview.g_center > h1.tag_info > span.skey");
        data.state = "Language: " + language.innerText;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/category/")) {
        data.details = "Browsing category...";
        category = document.querySelector("div.galleries_overview.g_center > h1.tag_info > span.skey");
        data.state = "Category: " + category.innerText;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/parodies/")) {
        data.details = "Browsing parodies...";
        data.startTimestamp = browsingStamp;
        delete data.state;
    }
    else if (document.location.pathname.includes("/tags/")) {
        data.details = "Browsing tags...";
        data.startTimestamp = browsingStamp;
        delete data.state;
    }
    else if (document.location.pathname.includes("/characters/")) {
        data.details = "Browsing characters...";
        data.startTimestamp = browsingStamp;
        delete data.state;
    }
    else if (document.location.pathname.includes("/artists/")) {
        data.details = "Browsing artists...";
        data.startTimestamp = browsingStamp;
        delete data.state;
    }
    else if (document.location.pathname.includes("/groups/")) {
        data.details = "Browsing groups...";
        data.startTimestamp = browsingStamp;
        delete data.state;
    }
    else if (document.location.pathname.includes("/faplist/")) {
        data.details = "Browsing faplist...";
        data.startTimestamp = browsingStamp;
        delete data.state;
    }
    else if (document.location.pathname.includes("/contact/")) {
        data.details = "Browsing contact...";
        data.startTimestamp = browsingStamp;
        delete data.state;
    }
    else if (document.location.pathname.includes("/profile/")) {
        profile = document.querySelector("div.row.profile_block > div.pb_left > h2");
        data.details = "Viewing an profile:";
        var ret = profile.innerText.replace('Welcome,', '');
        data.state = ret;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/search/")) {
        data.details = "Searching for: ";
        data.state = searchResult;
        data.startTimestamp = browsingStamp;
    }
    else {
        data.details = "Browsing...";
        data.startTimestamp = browsingStamp;
        delete data.state;
        delete data.smallImageKey;
    }
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLElBQUksT0FBTyxDQUFDO0FBQ1osSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxLQUFVLEVBQ1osTUFBVyxFQUNYLFdBQWdCLEVBQ2hCLFVBQWUsRUFDZixRQUFhLEVBQ2IsZUFBb0IsRUFDcEIsSUFBUyxFQUNULE9BQVksRUFDWixVQUFlLEVBQ2YsUUFBYSxFQUNiLE1BQVcsRUFDWCxRQUFhLEVBQ2IsUUFBYSxFQUNiLE9BQVksRUFDWixRQUFhLEVBQ2IsT0FBWSxDQUFDO0FBRWYsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBRXpCLElBQUksU0FBYyxFQUNoQixNQUFXLEVBQ1gsS0FBa0IsRUFDbEIsR0FBZ0IsRUFDaEIsTUFBbUIsQ0FBQztBQUV0QixNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xELE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXJELE1BQU0sYUFBYSxHQUFHLFVBQVUsR0FBVyxFQUFFLE9BQWU7SUFDMUQsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxDQUFDO0FBRUYsSUFBSSxpQkFBaUIsSUFBSSxPQUFPLEVBQUU7SUFDaEMsaUJBQWlC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