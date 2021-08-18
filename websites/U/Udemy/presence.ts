const udemy = new Presence({
    clientId: "639131130703904808"
  }),
  strings = udemy.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  pages: { [k: string]: string } = {
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

udemy.on("UpdateData", async () => {
  const page = document.location.pathname,
    video = document.querySelector("video"),
    presenceData: PresenceData = {
      largeImageKey: "ud-logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  if (page.includes("/courses/search")) {
    const searching = new URLSearchParams(location.search)
      .get("q")
      ?.split("+")
      ?.join(" ");

    presenceData.details = "Searching for:";
    presenceData.smallImageKey = "search";
    presenceData.state = searching || "Something";
  } else if (page.includes("/courses/")) {
    const category = document.querySelector(
      "div h1[class*=category--heading-primary]"
    );

    presenceData.details = "Browsing courses:";
    presenceData.smallImageKey = "search";
    presenceData.state = category?.textContent || "Unknown Category";
  } else if (page.includes("/course/") && video && video.currentTime) {
    const title = document.querySelector(
        "header a[class*=header--course-title] div.sr-only"
      ),
      episode = document.querySelector(
        "li[class*=curriculum-item-link--is-current] span > span"
      ),
      [, endTimestamp] = udemy.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

    presenceData.details = title?.textContent || "Unknown Course";
    presenceData.state = episode?.textContent || "Unknown Episode";

    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;

    if (!isNaN(endTimestamp)) presenceData.endTimestamp = endTimestamp;

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else if (page.includes("/course/") && !video) {
    const courseTitle = document.querySelector(
      ".clp-component-render h1.clp-lead__title"
    );

    presenceData.details = "Viewing a course:";
    presenceData.state = courseTitle?.textContent || "Unknown Course";
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    presenceData.details = "Viewing a page:";
    presenceData.state = pages[page] || pages[page.slice(0, -1)];
  } else {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Homepage";
  }

  udemy.setActivity(presenceData);
});
