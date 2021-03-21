const presence = new Presence({
  clientId: "734436013493059665"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    pathname = document.location.pathname,
    search = document.location.search;

  if (pathname === "/login") {
    presenceData.details = "Đăng nhập HentaiZ";
  } else if (search.includes("?s=")) {
    const keyword = search.split("?s=").pop();
    presenceData.details = "Tìm kiếm trên HentaiZ";
    presenceData.state = `Đang tìm tài liệu về "${keyword}"`;
  } else if (pathname.includes("/category")) {
    const title = document.querySelector("title");
    presenceData.details = title.textContent.trim();
  } else if (pathname.includes("/hentai-uncensored")) {
    presenceData.details = "HentaiZ Uncensored";
    presenceData.state = "Đang thủ dâm tại trang uncensored";
  } else if (pathname.includes("/completed-hentai")) {
    presenceData.details = "HentaiZ Completed Hentai";
    presenceData.state = "Đang tìm tài liệu thủ dâm";
  } else if (pathname.includes("/trailer-hentai")) {
    presenceData.details = "HentaiZ Trailer";
    presenceData.state = "Đang đặt gạch hóng hớt tại trang phim sắp phát hành";
  } else if (pathname.includes("/favorite-hentai")) {
    presenceData.details = "Danh sách phim đã lưu tại Hentai";
    presenceData.state = "Đang tìm lại phim đã fap";
  } else if (pathname.includes("/xem-phim")) {
    const title = document.querySelector("h1"),
      brand = document.querySelector("#nhasx");

    presenceData.details = title
      ? title.textContent.trim()
      : "Không tìm thấy tên phim";
    presenceData.state = brand.textContent.trim();
  } else if (pathname.includes("/images-gallery")) {
    presenceData.details = "Bộ sưu tập HentaiZ";
    presenceData.state = "Chán xem phim, đang thủ dâm bằng ảnh";
  } else {
    presenceData.details = "Đang tìm tài liệu thủ dâm...";
  }

  presence.setActivity(presenceData);
});
