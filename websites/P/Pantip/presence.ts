const presence = new Presence({
    clientId: "714416728448434218"
  }),
  // Const thing
  browsingTimestamp = Math.floor(Date.now() / 1000),
  //Changer
  tag1 =
    document.querySelector(
      "#__next > div > div > div:nth-child(4) > div > div > nav > div > a:nth-child(2)"
    )?.textContent ?? "เเท็กที่ไม่ทราบ",
  forum1 =
    document.querySelector(
      "#__next > div > div > div:nth-child(4) > div > div > nav > div > a"
    )?.textContent ?? "ห้องที่ไม่ทราบ",
  topic1 =
    document.querySelector("head > title")?.textContent ?? "หัวข้อที่ไม่ทราบ",
  message1 =
    document.querySelector(
      "#main-body-content > div.content > div.container-outer.container-liquid > div.display-post-wrapper.main-post.main-post-msg > div > div:nth-child(1) > h2"
    )?.textContent ?? "ไม่ทราบข้อความ",
  club1 =
    document.querySelector(
      "#main-body-content > div.content > div.container-wrap.bottombdr.bottomspc > div > div > ul > li"
    )?.textContent ?? "คลับที่ไม่ทราบ",
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
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "หน้าหลัก";
    } else if (path.pathname.includes("index.php")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "หน้าหลัก";
    } else if (path.pathname.includes("tags")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "เเท็ก ";
      if (path.pathname.includes("#myfollowing")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "ที่ติดตาม";
      } else if (path.pathname.includes("#tags")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "ทั้งหมด";
      }
    } else if (path.pathname.includes("tag")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "เเท็ก ";
      presenceData.state = tag1;
    } else if (path.pathname.includes("notifications")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "การเเจ้งเตือน ";
    } else if (path.pathname.includes("new_topic")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "กำลังตั้งกระทู้ใหม่ ";
    } else if (path.pathname.includes("forum")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "ห้อง ";
      presenceData.state = forum1;
    } else if (path.pathname.includes("search")) {
      presenceData.startTimestamp = browsingTimestamp;

      presenceData.details = "กำลังค้นหา ";
      presenceData.state =
        document.getElementById("search-text").getAttribute("value") ??
        "ไม่ทราบการค้นหา";
      presenceData.smallImageKey = "searching";
    } else if (path.pathname.includes("topic")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "กำลังอ่าน ";
      presenceData.state = topic1;
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("tos")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "กำลังอ่าน ";
      presenceData.state = "กฎ กติกา และมารยาท";
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("defamation")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "กำลังอ่าน ";
      presenceData.state = "การโพสต์ความคิดเห็นที่เข้าข่าย หมิ่นประมาท";
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("privacy")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "กำลังอ่าน ";
      presenceData.state = "นโยบายเกี่ยวกับข้อมูลส่วนบุคคล";
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("contect")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "กำลังอ่าน ";
      presenceData.state = "ติดต่อทีมงานพันทิป";
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("login")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "กำลังเข้าสู่ระบบ ";
    } else if (path.pathname.includes("register_member")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "กำลังสมัครใช้งาน ";
    } else if (path.pathname.includes("activities")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "กิจกรรม ";
    } else if (path.href.includes("profile")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "กำลังดูโปรไฟล์";
      if (path.href.includes("#topics")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "กระทู้ที่สร้าง";
      } else if (path.href.includes("#comments")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "กระทู้ที่ตอบ";
      } else if (path.href.includes("#bookmarks")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "กระทู้ที่ชอบ";
      } else if (path.href.includes("#history")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "กระทู้ที่เคยอ่าน";
      } else if (path.href.includes("#pantip_point")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "คะเเนนพันทิป";
      } else if (path.href.includes("#my_following")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "เเท็กที่ติดตาม";
      } else if (path.href.includes("#blogs")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "กำลังดูโปรไฟล์";
        presenceData.state = "บล็อกเเก้ง";
      } else if (path.pathname.includes("settings")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "จัดการข้อมูลส่วนตัว ";
      }
    } else if (path.pathname.includes("message")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "กล่องข้อความ ";
      if (path.href.includes("#outbox")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "ข้อความที่ส่งเเล้ว ";
      } else if (path.href.includes("#unblock")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "สมาชิกที่ถูกบล็อค ";
      } else if (path.href.includes("#inbox")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "กล่องข้อความ ";
      } else if (path.href) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "อยู่ในสนทนา ";
        presenceData.state = message1;
      }
    } else if (path.pathname.includes("club")) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "รายชื่อ Club";
      if (path.pathname.includes("new_topic")) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "กำลังตั้งกระทู้ใหม่ใน Club";
        presenceData.state = club1;
      } else if (path.href) {
        presenceData.startTimestamp = browsingTimestamp;
        presenceData.details = "กำลังดูใน Club";
        presenceData.state = club1;
      }
    } else if (path.href) {
      presenceData.startTimestamp = browsingTimestamp;
      presenceData.details = "หน้าที่ไม่ทราบ";
    }
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
