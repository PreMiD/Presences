const presence = new Presence({
  clientId: "788274557571170314"
});

let lastPath: string,
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const curPath = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };
  if (lastPath !== curPath) {
    lastPath = curPath;
    browsingStamp = Math.floor(Date.now() / 1000);
  }
  const truyen = curPath.startsWith("/truyen"),
    sangTac = curPath.startsWith("/sang-tac"),
    convert = curPath.startsWith("/convert");

  if (curPath.startsWith("/ke-sach"))
    presenceData.details = "Đang xem tủ sách...";
  else if (curPath.startsWith("/thong-bao"))
    presenceData.details = "Đang xem thông báo...";
  else if (curPath.startsWith("/tin-nhan"))
    presenceData.details = "Đang nhắn tin...";
  else if (curPath.startsWith("/bookmark"))
    presenceData.details = "Đang xem bookmark...";
  else if (curPath.startsWith("/tim-kiem"))
    presenceData.details = "Đang tìm kiếm...";
  else if (curPath.startsWith("/danh-sach"))
    presenceData.details = "Đang xem danh sách truyện...";
  else if (curPath.startsWith("/lich-su-doc"))
    presenceData.details = "Đang xem lịch sử đọc truyện...";
  else if (curPath.startsWith("/login"))
    presenceData.details = "Đang đang nhập...";
  else if (curPath.startsWith("/password/reset"))
    presenceData.details = "Đang đặt lại mật khẩu...";
  else if (curPath.startsWith("/register"))
    presenceData.details = "Đang đăng ký...";
  else if (curPath.startsWith("/thanh-vien")) {
    presenceData.details = `Đang xem tường của: ${
      document.querySelector(".profile-intro>.profile-intro_name").innerHTML
    }`;
  } else if (curPath.startsWith("/xuat-ban")) {
    const title = document.querySelector(".volume-title>a"),
      author = document.querySelector(".info-value>a"),
      publisher = document.querySelector(".publisher-name>a");
    if (title !== null) {
      presenceData.details = `Đang xem: ${title.innerHTML} (${publisher.innerHTML} phát hành)`;
      presenceData.state = `Tác giả: ${author.innerHTML}`;
    } else presenceData.details = "Đang tìm truyện bản quyền...";
  } else if (curPath.startsWith("/action"))
    presenceData.details = "Đang xem bảng điều khiển...";
  else if (curPath.startsWith("/nhom-dich")) {
    const name = document.querySelector(".page-name");
    if (name !== null) {
      presenceData.details = `Đang xem nhóm dịch: ${name.innerHTML.substring(
        40
      )}`;
    } else presenceData.details = "Đang xem danh sách nhóm dịch...";
  } else if (truyen || sangTac || convert) {
    const name = document.querySelector(".series-name-group>.series-name>a"),
      title = document.querySelector(".rd_sidebar-name>h5>a"),
      chap = document.querySelector(".title-top>h4");
    if (name !== null || title !== null) {
      presenceData.details =
        name !== null
          ? "Đang chọn chap..."
          : `Đang đọc truyện: ${title.innerHTML}`;
      presenceData.state = name !== null ? name.innerHTML : chap.innerHTML;
    } else {
      presenceData.details = `Đang tìm ${
        truyen ? "truyện" : sangTac ? "sáng tác" : "convert"
      } ...`;
    }
  } else if (curPath.startsWith("/thao-luan")) {
    const title = document.querySelector(".sect-title>a"),
      author = document.querySelector(".author_name>a");
    if (title !== null) {
      presenceData.details = `Đang đọc: ${title.innerHTML}`;
      presenceData.state = `Tác giả: ${author.innerHTML}`;
    } else presenceData.details = "Đang xem danh sách thảo luận...";
  } else presenceData.details = "Đang xem trang chủ...";

  presenceData.startTimestamp = browsingStamp;
  presence.setActivity(presenceData);
});
