const presence = new Presence({
  clientId: "734436013493059665"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname.includes("/xem-phim/")) {
    const title = document.querySelector("h1"),
      brand = document.querySelector("#nhasx"),
      buttons = [{ label: "Xem ngay", url: document.location.href }];

    presenceData.details = title
      ? title.textContent.trim()
      : "Không tìm thấy tên phim";
    presenceData.state = brand.textContent.trim();
    presenceData.buttons = buttons;
  } else {
    presenceData.details = "Đang tìm mồi để fap...";
  }

  presence.setActivity(presenceData);
});
