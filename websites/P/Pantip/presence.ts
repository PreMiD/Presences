const presence = new Presence({
    clientId: "714416728448434218"
  }),
  // Const thing
  browsingStamp = Math.floor(Date.now() / 1000),
  tag = document.querySelector(
    "#__next > div > div > div:nth-child(4) > div > div > nav > div > a:nth-child(2)"
  ),
  forum = document.querySelector(
    "#__next > div > div > div:nth-child(4) > div > div > nav > div > a"
  ),
  topic = document.querySelector("head > title"),
  message = document.querySelector(
    "#main-body-content > div.content > div.container-outer.container-liquid > div.display-post-wrapper.main-post.main-post-msg > div > div:nth-child(1) > h2"
  ),
  club = document.querySelector(
    "#main-body-content > div.content > div.container-wrap.bottombdr.bottomspc > div > div > ul > li"
  ),
  //Changer
  tag1 = tag?.textContent ?? "เเท็กที่ไม่ทราบ",
  forum1 = forum?.textContent ?? "ห้องที่ไม่ทราบ",
  topic1 = topic?.textContent ?? "หัวข้อที่ไม่ทราบ",
  message1 = message?.textContent ?? "ไม่ทราบข้อความ",
  club1 = club?.textContent ?? "คลับที่ไม่ทราบ",
  path = document.location;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  // Presence
  if (
    path.hostname === "pantip.com" ||
    path.hostname.includes("([a-z0-9-]+[.])*")
  ) {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "หน้าหลัก";
    } else if (path.pathname.includes("index.php")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "หน้าหลัก";
    } else if (path.pathname.includes("tags")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "เเท็ก ";
      if (path.pathname.includes("#myfollowing")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "ที่ติดตาม";
      } else if (path.pathname.includes("#tags")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "ทั้งหมด";
      }
    } else if (path.pathname.includes("tag")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "เเท็ก ";
      presenceData.state = tag1;
    } else if (path.pathname.includes("notifications")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "การเเจ้งเตือน ";
    } else if (path.pathname.includes("new_topic")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังตั้งกระทู้ใหม่ ";
    } else if (path.pathname.includes("forum")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "ห้อง ";
      presenceData.state = forum1;
    } else if (path.pathname.includes("search")) {
      presenceData.startTimestamp = browsingStamp;
      const search =
        document.getElementById("search-text").getAttribute("value") ??
        "ไม่ทราบการค้นหา";
      presenceData.details = "กำลังค้นหา ";
      presenceData.state = search;
      presenceData.smallImageKey = "searching";
    } else if (path.pathname.includes("topic")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังอ่าน ";
      presenceData.state = topic1;
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("tos")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังอ่าน ";
      presenceData.state = "กฎ กติกา และมารยาท";
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("defamation")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังอ่าน ";
      presenceData.state = "การโพสต์ความคิดเห็นที่เข้าข่าย หมิ่นประมาท";
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("privacy")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังอ่าน ";
      presenceData.state = "นโยบายเกี่ยวกับข้อมูลส่วนบุคคล";
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("contect")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังอ่าน ";
      presenceData.state = "ติดต่อทีมงานพันทิป";
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("login")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังเข้าสู่ระบบ ";
    } else if (path.pathname.includes("register_member")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังสมัครใช้งาน ";
    } else if (path.pathname.includes("activities")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กิจกรรม ";
    } else if (path.href.includes("profile")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังดูโปรไฟล์";
      if (path.href.includes("#topics")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "กระทู้ที่สร้าง";
      } else if (path.href.includes("#comments")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "กระทู้ที่ตอบ";
      } else if (path.href.includes("#bookmarks")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "กระทู้ที่ชอบ";
      } else if (path.href.includes("#history")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "กระทู้ที่เคยอ่าน";
      } else if (path.href.includes("#pantip_point")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "คะเเนนพันทิป";
      } else if (path.href.includes("#my_following")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "เเท็กที่ติดตาม";
      } else if (path.href.includes("#blogs")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "บล็อกเเก้ง";
      } else if (path.pathname.includes("settings")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "จัดการข้อมูลส่วนตัว ";
      }
    } else if (path.pathname.includes("message")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กล่องข้อความ ";
      if (path.href.includes("#outbox")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "ข้อความที่ส่งเเล้ว ";
      } else if (path.href.includes("#unblock")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "สมาชิกที่ถูกบล็อค ";
      } else if (path.href.includes("#inbox")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "กล่องข้อความ ";
      } else if (path.href) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "อยู่ในสนทนา ";
        presenceData.state = message1;
      }
    } else if (path.pathname.includes("club")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "รายชื่อ Club";
      if (path.pathname.includes("new_topic")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "กำลังตั้งกระทู้ใหม่ใน Club";
        presenceData.state = club1;
      } else if (path.href) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "กำลังดูใน Club";
        presenceData.state = club1;
      }
    } else if (path.href) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "หน้าที่ไม่ทราบ";
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
