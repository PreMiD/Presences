const presence = new Presence({
    clientId: "830476272978362408",
    injectOnComplete: true,
    appMode: true
  }),
  strings = presence.getStrings({
    playing: "general.playing",
    paused: "general.paused"
  });

let video = { playback: false, currentTime: 0, duration: 0, paused: false };

presence.on(
  "iFrameData",
  (data: {
    playback: boolean;
    currentTime: number;
    duration: number;
    paused: boolean;
  }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "javx",
      startTimestamp: Math.floor(Date.now() / 1000)
    },
    { pathname, search } = document.location;

  if (search.startsWith("?s")) {
    const s = new URLSearchParams(search).get("s");

    if (s) {
      presenceData.details = "Đang tìm phim với từ khoá:";
      presenceData.state = encodeURI(s);
    } else {
      presenceData.details = "Đang tìm phim";
    }
  } else if (pathname === "/") {
    presenceData.details = "Đang ở trang chủ";
  } else if (pathname.startsWith("/sign-up")) {
    presenceData.details = "Đang đăng ký tài khoản";
  } else if (pathname.startsWith("/sign-in")) {
    presenceData.details = "Đang đăng nhập";
  } else if (pathname.startsWith("/profile")) {
    presenceData.details = "Đang xem hồ sơ cá nhân";
  } else if (pathname.startsWith("/favorite")) {
    presenceData.details = "Đang xem danh sách các phim đã lưu";
  } else if (pathname.startsWith("/censored")) {
    presenceData.details = "Đang ở trang JAV có che";
  } else if (pathname.startsWith("/uncensored")) {
    presenceData.details = "Đang ở trang JAV không che";
  } else if (pathname.startsWith("/porn")) {
    presenceData.details = "Đang ở trang Porn châu Âu";
  } else if (pathname.startsWith("/actresses")) {
    presenceData.details = "Đang xem danh sách JAV Idols (diễn viễn JAV)";
  } else if (pathname.startsWith("/studios")) {
    presenceData.details = "Đang xem danh sách JAV Studios (hãng sản xuất JAV)";
  } else if (pathname.startsWith("/years")) {
    presenceData.details = "Đang xem danh sách các năm phát hành JAV";
  } else if (pathname.startsWith("/category/")) {
    const labelWithVideoCounter = document
        .querySelector("h2")
        .textContent.trim(),
      labelWithoutCounter = labelWithVideoCounter.replace(/\(\d+\)$/, "");

    presenceData.details = "Đang xem các phim thuộc thể loại:";
    presenceData.state = labelWithoutCounter;
  } else if (pathname.startsWith("/tag/")) {
    const labelWithVideoCounter = document
        .querySelector("h2")
        .textContent.trim(),
      labelWithoutCounter = labelWithVideoCounter.replace(/\(\d+\)$/, "");

    presenceData.details = "Đang xem các phim có nhãn:";
    presenceData.state = labelWithoutCounter;
  } else if (pathname.startsWith("/actress/")) {
    const nameWithVideoCounter = document
        .querySelector("h2")
        .textContent.trim(),
      nameWithoutCounter = nameWithVideoCounter.replace(/\(\d+\)$/, "");

    presenceData.details = "Đang xem các phim của idol:";
    presenceData.state = nameWithoutCounter;
  } else if (pathname.startsWith("/studio/")) {
    const nameWithVideoCounter = document
        .querySelector("h2")
        .textContent.trim(),
      nameWithoutCounter = nameWithVideoCounter.replace(/\(\d+\)$/, "");

    presenceData.details = "Đang xem các phim của hãng:";
    presenceData.state = nameWithoutCounter;
  } else if (pathname.startsWith("/release_year/")) {
    const yearWithVideoCounter = document
        .querySelector("h2")
        .textContent.trim(),
      yearWithoutCounter = yearWithVideoCounter.replace(/\(\d+\)$/, "");

    presenceData.details = "Đang xem các phim của năm:";
    presenceData.state = yearWithoutCounter;
  } else if (Object.keys(video).length > 0) {
    const title = document.querySelector("#title").textContent.trim(),
      actresses: string[] = [],
      studios: string[] = [];

    document
      .querySelectorAll("#actresses .stretched-link")
      .forEach((actress) => actresses.push(actress.textContent.trim()));
    document
      .querySelectorAll("#studios .stretched-link")
      .forEach((studio) => studios.push(studio.textContent.trim()));

    const strActresses = actresses.join(", "),
      strStudios = studios.join(", ");

    presenceData.details = title;
    presenceData.state = `${strActresses} - ${strStudios}`;

    const { playback, currentTime, duration, paused } = video;

    if (playback) {
      const [start, end] = presence.getTimestamps(currentTime, duration);

      presenceData.startTimestamp = start;
      presenceData.endTimestamp = end;
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).paused
        : (await strings).playing;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else {
    delete presenceData.startTimestamp;
  }

  presence.setActivity(presenceData, !!presenceData.startTimestamp);
});
