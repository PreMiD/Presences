const presence = new Presence({
    clientId: "639131130703904808"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
}), pages = {
    "/": "Homepage",
    "/user/view-notifications": "Notifications",
    "/message": "Messages",
    "/dashboard/purchase-history/": "Purchase History",
    "/instructor/account/notifications/": "Account",
    "/instructor/account/api": "API",
    "/instructor/account/close": "Close Account",
    "/instructor/account/security": "Account Security",
    "/instructor/courses": "Create a Course",
    "/course/create": "Create a Course",
    "/instructor/communication/qa": "Q&A",
    "/instructor/communication/assignments": "Assignments",
    "/instructor/communication/announcements": "Announcements",
    "/instructor/communication/messages": "Messages",
    "/instructor/performance/overview": "Performance Overview",
    "/instructor/performance/students": "Student Performance",
    "/instructor/performance/reviews": "Reviews",
    "/instructor/performance/engagement": "Engagement",
    "/instructor/performance/conversion/visitors": "Visitors",
    "/instructor/tools": "Tools",
    "/home/teaching/test-video": "Test Video",
    "/instructor/marketplace-insights/": "Marketplace Insights",
    "/instructor/help": "Resources",
    "/support": "Support",
    "/cart": "Cart",
    "/affiliate": "Udemy Affiliate",
    "/mobile": "Udemy Mobile",
    "/teaching": "Teaching",
    "/user/edit-credit-cards": "Payment Methods",
    "/dashboard/credit-history": "Udemy Credits",
    "/home/my-courses/learning": "My Courses",
    "/home/my-courses": "My Courses",
    "/home/my-courses/search": "My Courses",
    "/home/my-courses/collections": "My Courses (Collections)",
    "/home/my-courses/wishlist": "My Courses (Wishlist)",
    "/home/my-courses/archived": "My Courses (Archived)"
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname, courseTitle = document.querySelector("#udemy > div.main-content-wrapper > div.main-content > div.full-width.full-width--streamer.streamer--complete > div > div:nth-child(2) > div.col-xxs-8.left-col > div > div > div.clp-component-render > h1") ||
        document.querySelector("#udemy > div.main-content-wrapper > div.main-content > div.container > div.row.row--component-margin.clp-lead__wrapper > div.col-xxs-8.clp-lead__content > div.clp-lead > div > div.clp-component-render > h1"), video = document.querySelector("video");
    if (page.includes("/courses/search")) {
        const searching = document.querySelector("#search-result-page-v3 > div > div > div.search-result-page--result-header--2MN29 > div.container > div > div.search-result-page--head-container--3IBoo > div.search-result-page--num-results-container--3b2ip > div > strong");
        presence.setActivity({
            largeImageKey: "ud-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Searching for:",
            smallImageKey: "search",
            state: searching && searching.textContent != ""
                ? searching.textContent
                : "Something"
        });
    }
    else if (page.includes("/courses/")) {
        const category = document.querySelector("#udemy > div.main-content-wrapper > div.main-content > div > div > div.jumbotron__collapsed.browse-full-width-container--full-width-container--1v4rg.browse-full-width-container--is-desktop--169rt > div > h1");
        presence.setActivity({
            largeImageKey: "ud-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Browsing courses:",
            smallImageKey: "search",
            state: category && category.textContent != ""
                ? category.textContent
                : "Unknown Category"
        });
    }
    else if (page.includes("/course/") && video && video.currentTime) {
        const title = document.querySelector("#udemy > div.main-content-wrapper > div.main-content > div > div > div.app--row--1ydzX.app--header--3crNp > div > div > div.header--course-details--3Swxk > a > span > span:nth-child(1) > span") ||
            document.querySelector("#udemy > div:nth-child(26) > div.generic-modal.fade.in.modal > div > div > div > div > div > div > div.course-preview__title > span.course-preview__text"), episode = document.querySelector("#udemy > div.main-content-wrapper > div.main-content > div > div > div.app--column-container--3AItG > div > div.app--row--1ydzX.app--body-container--10gJo > div > div > div > div > div > div > div > div > div > div.lecture-view--container--pL22J > div > div.user-activity--hide-when-user-inactive--pDPGx > div.video-viewer--title-overlay--OoQ6e.video-viewer--title-overlay-no-sidebar--1BzL_") ||
            document.querySelector("#udemy > div.main-content-wrapper > div.main-content > div > div > div.app--column-container--3AItG > div.app--content-column--HC_i1 > div.app--row--1ydzX.app--body-container--10gJo > div > div > div > div > div > div > div > div > div > div.lecture-view--container--pL22J > div > div.user-activity--hide-when-user-inactive--pDPGx > div.video-viewer--title-overlay--OoQ6e.video-viewer--title-overlay-fullscreen-mode--2C1nE") ||
            document.querySelector("#udemy > div.main-content-wrapper > div.main-content > div > div > div.app--column-container--3AItG > div.app--sidebar-column--2t0E8 > div > div.sidebar--content---4z0- > div > div:nth-child(1) > ul > li.curriculum-item-link--curriculum-item--KX9MD.curriculum-item-link--is-current--31BPo > div > div > div.curriculum-item-link--title--zI5QT > span > span:nth-child(1) > span") ||
            document.querySelector("#udemy > div.main-content-wrapper > div.main-content > div > div > div.app--column-container--3AItG > div.app--sidebar-column--2t0E8 > div > div.sidebar--content---4z0- > div > div:nth-child(1) > div > div.section--title--eCwjX > span > span:nth-child(1)"), timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        let data = {
            largeImageKey: "ud-logo",
            details: title && title.textContent != "" ? title.textContent : "Unknown Course",
            state: episode && episode.textContent != ""
                ? episode.textContent
                : "Unknown Episode",
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
                ? (await strings).pause
                : (await strings).play
        };
        if (!isNaN(timestamps[0]) && !isNaN(timestamps[1])) {
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
        }
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
        presence.setActivity(data);
    }
    else if (page.includes("/course/") &&
        !video &&
        courseTitle &&
        courseTitle.textContent != "") {
        presence.setActivity({
            largeImageKey: "ud-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Viewing a course:",
            state: courseTitle.textContent
        });
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "ud-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Viewing a page:",
            state: pages[page] || pages[page.slice(0, -1)]
        });
    }
    else {
        presence.setActivity({
            largeImageKey: "ud-logo",
            startTimestamp: Math.floor(Date.now() / 1000),
            details: "Viewing a page:",
            state: "Homepage"
        });
    }
});
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now(), endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNQLEdBQUcsRUFBRSxVQUFVO0lBQ2YsMEJBQTBCLEVBQUUsZUFBZTtJQUMzQyxVQUFVLEVBQUUsVUFBVTtJQUN0Qiw4QkFBOEIsRUFBRSxrQkFBa0I7SUFDbEQsb0NBQW9DLEVBQUUsU0FBUztJQUMvQyx5QkFBeUIsRUFBRSxLQUFLO0lBQ2hDLDJCQUEyQixFQUFFLGVBQWU7SUFDNUMsOEJBQThCLEVBQUUsa0JBQWtCO0lBQ2xELHFCQUFxQixFQUFFLGlCQUFpQjtJQUN4QyxnQkFBZ0IsRUFBRSxpQkFBaUI7SUFDbkMsOEJBQThCLEVBQUUsS0FBSztJQUNyQyx1Q0FBdUMsRUFBRSxhQUFhO0lBQ3RELHlDQUF5QyxFQUFFLGVBQWU7SUFDMUQsb0NBQW9DLEVBQUUsVUFBVTtJQUNoRCxrQ0FBa0MsRUFBRSxzQkFBc0I7SUFDMUQsa0NBQWtDLEVBQUUscUJBQXFCO0lBQ3pELGlDQUFpQyxFQUFFLFNBQVM7SUFDNUMsb0NBQW9DLEVBQUUsWUFBWTtJQUNsRCw2Q0FBNkMsRUFBRSxVQUFVO0lBQ3pELG1CQUFtQixFQUFFLE9BQU87SUFDNUIsMkJBQTJCLEVBQUUsWUFBWTtJQUN6QyxtQ0FBbUMsRUFBRSxzQkFBc0I7SUFDM0Qsa0JBQWtCLEVBQUUsV0FBVztJQUMvQixVQUFVLEVBQUUsU0FBUztJQUNyQixPQUFPLEVBQUUsTUFBTTtJQUNmLFlBQVksRUFBRSxpQkFBaUI7SUFDL0IsU0FBUyxFQUFFLGNBQWM7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