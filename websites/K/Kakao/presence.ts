const presence = new Presence({
    clientId: "871655598146609174"
  }),
  read = {
    current: 0,
    duration: 0
  },
  browsingStamp = Math.floor(Date.now() / 1000),
  title = document.querySelector("head > title")?.textContent ?? "ไม่พบ",
  path = document.location;

presence.on("UpdateData", async () => {
  const time = await presence.getSetting("timestamps"),
    privacy = await presence.getSetting("privacy"),
    buttons = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "kakaopage",
      startTimestamp: browsingStamp
    };

  // Presence
  if (document.location.href === "https://page.kakao.com/") 
    presenceData.details = "หน้าหลัก ";
  else if (path.pathname.includes("main")) {
    presenceData.details = "ดูหมวดหมู่",
    presenceData.state = title;
  } else if (path.pathname.includes("home")) {
    presenceData.details = "เลือกซีรี่ส์",
    presenceData.state = title;
  }else if (path.pathname.includes("up/today")) {
    presenceData.details = "วันนี้",
    presenceData.state = title;
  }else if (document.location.href === "https://store.kakaofriends.com/") 
    presenceData.details = title;
  else if (path.pathname.includes("index")) {
    presenceData.details = "หน้าหลัก",
    presenceData.state = title;
  }else if (document.location.pathname === "/") 
    presenceData.details = "แนะนำ";
  else if (path.pathname.includes("original-webtoon"))
    presenceData.details = "ตารางเว็บตูน ";
  else if (path.pathname.includes("ranking"))
    presenceData.details = "อันดับ ";
  else if (path.pathname.includes("gift"))
    presenceData.details = "กล่องของขวัญ ";
  else if (path.pathname.includes("my-page"))
    presenceData.details = "ชั้นหนังสือ ";
  else if (path.pathname.includes("more"))
    presenceData.details = "เมนู ";
  else if (path.pathname.includes("event")) {
    presenceData.details = "เหตุการณ์ ",
    presenceData.state = document.querySelector("head > title")?.textContent ?? "ไม่พบเหตุการณ์";
  } else if (path.pathname.includes("content")) {
    presenceData.details = "เนื้อหา ",
    presenceData.state = document.querySelector("head > title")?.textContent ?? "ไม่พบเนื้อหา";
  } else if (path.pathname.includes("viewer") || (path.pathname.includes("theme"))) {
    let reading;
    const timestamps = presence.getTimestamps(
      Math.floor(read.current),
      Math.floor(read.duration)
    );
    if (path.href) {
      reading = "กำลังอ่าน ";
      presenceData.state = document.querySelector("head > title")?.textContent ?? "ไม่พบ",
      presenceData.details = reading;
    } else if (!read) [, presenceData.endTimestamp] = timestamps;
  } else {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  if (!time) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  if (privacy) {
    delete presenceData.details;
    delete presenceData.state;
  }
  if (buttons) {
    presenceData.buttons = [
      {
        label: "Go to page",
        url: document.location.href.replace(/#\d+/, "")
      }
    ];
  }
  if (document.location.host === "page.kakao.com") 
    presenceData.largeImageKey = "kakaopage";
  if (document.location.host === "store.kakaofriends.com") 
    presenceData.largeImageKey = "kakaofriends";
  if (document.location.host === "th.kakaowebtoon.com") 
    presenceData.largeImageKey = "kakaowebtoon";
  
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
