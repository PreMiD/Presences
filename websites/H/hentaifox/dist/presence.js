const presence = new Presence({
    clientId: "732982987905302570"
});
let lastPlaybackState = null;
let reading;
let browsingStamp = Math.floor(Date.now() / 1000);
let title, title2, tabTitle, pageNumber, parody, language, character, tags, category, currentPage, profile, groups, homeCurrentPage, artist;
const pattern = "- Page";
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
        artist = document.querySelector("div.galleries_overview.g_center > h1.tag_info > span.skey");
        data.state = "Artist: " + artist.innerText;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/character/")) {
        data.details = "Browsing characters...";
        character = document.querySelector("div.galleries_overview.g_center > h1.tag_info > span.skey");
        data.state = "Character: " + character.innerText;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/parody/")) {
        data.details = "Browsing parodies...";
        parody = document.querySelector("div.galleries_overview.g_center > h1.tag_info > span.skey");
        data.state = "Parody: " + parody.innerText;
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
        const ret = profile.innerText.replace('Welcome,', '');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLElBQUksT0FBTyxDQUFDO0FBQ1osSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxLQUFrQixFQUNwQixNQUFXLEVBQ1gsUUFBYSxFQUNiLFVBQXVCLEVBQ3ZCLE1BQW1CLEVBQ25CLFFBQXFCLEVBQ3JCLFNBQXNCLEVBQ3RCLElBQWlCLEVBQ2pCLFFBQXFCLEVBQ3JCLFdBQXdCLEVBQ3hCLE9BQW9CLEVBQ3BCLE1BQW1CLEVBQ25CLGVBQTRCLEVBQzVCLE1BQW1CLENBQUM7QUFFdEIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBRXpCLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEQsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFckQsTUFBTSxhQUFhLEdBQUcsVUFBVSxHQUFXLEVBQUUsT0FBZTtJQUMxRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUM7QUFFRixJQUFJLGlCQUFpQixJQUFJLE9BQU8sRUFBRTtJQUNoQyxpQkFBaUIsR0FBRyxPQUFPLENBQUM7SUFDNUIsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcs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