const presence = new Presence({
    clientId: "787715073007026187"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let lastPlaybackState: boolean,
  lastPath: string,
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const playback =
      document.getElementById("title") !== null ||
      (document.getElementsByTagName("video").length !== 0 &&
        document.getElementsByTagName("video")[0].className !== "previewVideo"),
    curPath = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };

  if (lastPath !== curPath || lastPlaybackState !== playback) {
    lastPath = curPath;
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }
  if (!playback) {
    if (curPath.startsWith("/entity.php")) {
      presenceData.details = document.getElementById("entityTitle").innerHTML;
      presenceData.state = "Đang chọn tập...";
    } else if (curPath.startsWith("/profile.php"))
      presenceData.details = "Đang xem profile...";
    else if (curPath.startsWith("/search.php"))
      presenceData.details = "Đang tìm kiếm...";
    else if (curPath.startsWith("/login.php"))
      presenceData.details = "Đang đăng nhập...";
    else if (curPath.startsWith("/register.php"))
      presenceData.details = "Đang đăng ký...";
    else if (curPath.startsWith("/genres.php")) {
      presenceData.state =
        "Thể loại: " + document.querySelector(".genreh2").innerHTML;
      presenceData.details = "Đang chọn phim...";
    } else if (curPath.startsWith("/history.php"))
      presenceData.details = "Đang xem lịch sử...";
    else if (curPath.startsWith("/saved.php"))
      presenceData.details = "Đang xem danh sách theo dõi...";
    else if (curPath.startsWith("/reset-password"))
      presenceData.details = "Đang đặt lại mật khẩu...";
    else presenceData.details = "Đang xem trang chủ...";
    presenceData.startTimestamp = browsingStamp;

    if (
      !curPath.startsWith("/entity.php") &&
      !curPath.startsWith("/genres.php")
    )
      delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
    return;
  }

  const video = document.getElementsByTagName("video")[0];

  if (video !== null && !isNaN(video.duration)) {
    const titleArr = (document.getElementById("title") !== null
        ? document.getElementById("title").innerHTML
        : "Không thấy tên phim!... - Tập ?"
      ).split(" - "),
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    presence.setTrayTitle(video.paused ? "" : titleArr[0]);

    presenceData.details = "Đang xem: " + titleArr[0];
    presenceData.state = titleArr[1];

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
    presence.setActivity(presenceData, true);
  }
});
