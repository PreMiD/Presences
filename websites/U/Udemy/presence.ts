const presence = new Presence({
    clientId: "639131130703904808"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  pages = {
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

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    courseTitle =
      document.querySelector(
        "#udemy > div.main-content-wrapper > div.main-content > div.full-width.full-width--streamer.streamer--complete > div > div:nth-child(2) > div.col-xxs-8.left-col > div > div > div.clp-component-render > h1"
      ) ||
      document.querySelector(
        "#udemy > div.main-content-wrapper > div.main-content > div.container > div.row.row--component-margin.clp-lead__wrapper > div.col-xxs-8.clp-lead__content > div.clp-lead > div > div.clp-component-render > h1"
      ),
    video = document.querySelector("video");

  if (page.includes("/courses/search")) {
    const searching = document.querySelector(
      "#search-result-page-v3 > div > div > div.search-result-page--result-header--2MN29 > div.container > div > div.search-result-page--head-container--3IBoo > div.search-result-page--num-results-container--3b2ip > div > strong"
    );

    presence.setActivity({
      largeImageKey: "ud-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Searching for:",
      smallImageKey: "search",
      state:
        searching && searching.textContent != ""
          ? searching.textContent
          : "Something"
    });
  } else if (page.includes("/courses/")) {
    const category = document.querySelector(
      "#udemy > div.main-content-wrapper > div.main-content > div > div > div.jumbotron__collapsed.browse-full-width-container--full-width-container--1v4rg.browse-full-width-container--is-desktop--169rt > div > h1"
    );

    presence.setActivity({
      largeImageKey: "ud-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Browsing courses:",
      smallImageKey: "search",
      state:
        category && category.textContent != ""
          ? category.textContent
          : "Unknown Category"
    });
  } else if (page.includes("/course/") && video && video.currentTime) {
    const title =
        document.querySelector(
          "#udemy > div.main-content-wrapper > div.main-content > div > div > div.app--row--1ydzX.app--header--3crNp > div > div > div.header--course-details--3Swxk > a > span > span:nth-child(1) > span"
        ) ||
        document.querySelector(
          "#udemy > div:nth-child(26) > div.generic-modal.fade.in.modal > div > div > div > div > div > div > div.course-preview__title > span.course-preview__text"
        ),
      episode =
        document.querySelector(
          "#udemy > div.main-content-wrapper > div.main-content > div > div > div.app--column-container--3AItG > div > div.app--row--1ydzX.app--body-container--10gJo > div > div > div > div > div > div > div > div > div > div.lecture-view--container--pL22J > div > div.user-activity--hide-when-user-inactive--pDPGx > div.video-viewer--title-overlay--OoQ6e.video-viewer--title-overlay-no-sidebar--1BzL_"
        ) ||
        document.querySelector(
          "#udemy > div.main-content-wrapper > div.main-content > div > div > div.app--column-container--3AItG > div.app--content-column--HC_i1 > div.app--row--1ydzX.app--body-container--10gJo > div > div > div > div > div > div > div > div > div > div.lecture-view--container--pL22J > div > div.user-activity--hide-when-user-inactive--pDPGx > div.video-viewer--title-overlay--OoQ6e.video-viewer--title-overlay-fullscreen-mode--2C1nE"
        ) ||
        document.querySelector(
          "#udemy > div.main-content-wrapper > div.main-content > div > div > div.app--column-container--3AItG > div.app--sidebar-column--2t0E8 > div > div.sidebar--content---4z0- > div > div:nth-child(1) > ul > li.curriculum-item-link--curriculum-item--KX9MD.curriculum-item-link--is-current--31BPo > div > div > div.curriculum-item-link--title--zI5QT > span > span:nth-child(1) > span"
        ) ||
        document.querySelector(
          "#udemy > div.main-content-wrapper > div.main-content > div > div > div.app--column-container--3AItG > div.app--sidebar-column--2t0E8 > div > div.sidebar--content---4z0- > div > div:nth-child(1) > div > div.section--title--eCwjX > span > span:nth-child(1)"
        ),
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

    const data: { [k: string]: any } = {
      largeImageKey: "ud-logo",
      details:
        title && title.textContent != "" ? title.textContent : "Unknown Course",
      state:
        episode && episode.textContent != ""
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
  } else if (
    page.includes("/course/") &&
    !video &&
    courseTitle &&
    courseTitle.textContent != ""
  ) {
    presence.setActivity({
      largeImageKey: "ud-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Viewing a course:",
      state: courseTitle.textContent
    });
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    presence.setActivity({
      largeImageKey: "ud-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Viewing a page:",
      state: pages[page] || pages[page.slice(0, -1)]
    });
  } else {
    presence.setActivity({
      largeImageKey: "ud-logo",
      startTimestamp: Math.floor(Date.now() / 1000),
      details: "Viewing a page:",
      state: "Homepage"
    });
  }
});
