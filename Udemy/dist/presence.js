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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
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
        const data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxFQUNGLEtBQUssR0FBRztJQUNOLEdBQUcsRUFBRSxVQUFVO0lBQ2YsMEJBQTBCLEVBQUUsZUFBZTtJQUMzQyxVQUFVLEVBQUUsVUFBVTtJQUN0Qiw4QkFBOEIsRUFBRSxrQkFBa0I7SUFDbEQsb0NBQW9DLEVBQUUsU0FBUztJQUMvQyx5QkFBeUIsRUFBRSxLQUFLO0lBQ2hDLDJCQUEyQixFQUFFLGVBQWU7SUFDNUMsOEJBQThCLEVBQUUsa0JBQWtCO0lBQ2xELHFCQUFxQixFQUFFLGlCQUFpQjtJQUN4QyxnQkFBZ0IsRUFBRSxpQkFBaUI7SUFDbkMsOEJBQThCLEVBQUUsS0FBSztJQUNyQyx1Q0FBdUMsRUFBRSxhQUFhO0lBQ3RELHlDQUF5QyxFQUFFLGVBQWU7SUFDMUQsb0NBQW9DLEVBQUUsVUFBVTtJQUNoRCxrQ0FBa0MsRUFBRSxzQkFBc0I7SUFDMUQsa0NBQWtDLEVBQUUscUJBQXFCO0lBQ3pELGlDQUFpQyxFQUFFLFNBQVM7SUFDNUMsb0NBQW9DLEVBQUUsWUFBWTtJQUNsRCw2Q0FBNkMsRUFBRSxVQUFVO0lBQ3pELG1CQUFtQixFQUFFLE9BQU87SUFDNUIsMkJBQTJCLEVBQUUsWUFBWTtJQUN6QyxtQ0FBbUMsRUFBRSxzQkFBc0I7SUFDM0Qsa0JBQWtCLEVBQUUsV0FBVztJQUMvQixVQUFVLEVBQUUsU0FBUztJQUNyQixPQUFPLEVBQUUsTUFBTTtJQUNmLFlBQVksRUFBRSxpQkFBaUI7SUFDL0IsU0FBUyxFQUFFLGNBQWM7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