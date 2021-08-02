const presence = new Presence({
    clientId: "871655598146609174"
  }),
  read = {
    current: 0,
    duration: 0
  },
  browsingStamp = Math.floor(Date.now() / 1000),
  title = document.querySelector("head > title")?.textContent ?? "ไม่พบ",
  ep = document.querySelector("head > title")?.textContent ?? "ไม่พบ",
  path = document.location;

presence.on("UpdateData", async () => {
  const time = await presence.getSetting("timestamps"),
    privacy = await presence.getSetting("privacy"),
    buttons = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "kakaowebtoon",
      startTimestamp: browsingStamp
    };

  // Presence
  if (time) presenceData.startTimestamp = browsingStamp;
  if (document.location.pathname === "/") 
    presenceData.details = "แนะนำ";
  else if (path.pathname.includes("original-webtoon"))
    presenceData.details = "ตารางเว็บตูน ";
  else if (path.pathname.includes("ranking"))
    presenceData.details = "อันดับ ";
  else if (path.pathname.includes("gift"))
    presenceData.details = "กล่องของขวัญ ";
  else if (path.pathname.includes("my-page"))
    presenceData.details = "ชั้นหนังสือ ";
  else if (path.pathname.includes("event"))
    presenceData.details = "เหตุการณ์ ";
  else if (path.pathname.includes("more"))
    presenceData.details = "เมนู ";
  else if (path.pathname.includes("content")) {
    presenceData.details = "เนื้อหา ",
    presenceData.state = title;
  } else if (path.pathname.includes("viewer")) {
    let reading;
    const timestamps = presence.getTimestamps(
      Math.floor(read.current),
      Math.floor(read.duration)
    );
    if (path.href) {
      reading = "กำลังอ่าน ";
      presenceData.state = ep;
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
        label: "Reading",
        url: "https://th.kakaowebtoon.com"
      }
    ];
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
