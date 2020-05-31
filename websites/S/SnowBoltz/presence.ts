const presence = new Presence({
  clientId: "666246771785334784"
});

const browsingStamp = Math.floor(Date.now() / 1000);
const path = document.location.search;
const uid1 = document.querySelector(
  "#navbar_global > ul.navbar-nav.align-items-lg-center.ml-lg-auto > li.nav-item.d-none.d-lg-block.ml-lg-4.dropdown > div > a:nth-child(3)"
);
const id1 = document.querySelector(
  "body > main > div > section > div.container.shape-container.py-md-md > div > div.col-12.col-md-9.pl-md-0 > div > div.card-body > p:nth-child(6) > b"
);
const maid1 = document.querySelector(
  "body > main > div > section > div.container.shape-container.py-md-md > div > div.col-12.col-md-9.pl-md-0 > div > div.card-body > div > h4"
);
const uid = uid1?.textContent ?? "ยังไม่เข้าสู่ระบบหรือไม่พบข้อมูล";
const id =
  id1?.textContent.replace("สมาชิกหมายเลข", "ของหมายเลข ") ?? "ไม่ทราบสมาชิก";
const maid =
  maid1?.textContent.replace("สมาชิกหมายเลข", "ของหมายเลข ") ?? "ไม่ทราบสมาชิก";

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  if (document.location.hostname == "snowboltz.net") {
    if (path.includes("home")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังดูที่หน้าหลัก..";
      presenceData.state = uid;
    } else if (path.includes("robux_group")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังซื้อเเบบกลุ่ม..";
      presenceData.state = uid;
    } else if (path.includes("robux_idpass")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังซื้อเเบบหรัส..";
      presenceData.state = uid;
    } else if (path.includes("luckybox")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังสุ่มวงล้อ..";
      presenceData.state = uid;
    } else if (path.includes("coupon")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังรอใส่คูปอง..";
      presenceData.state = uid;
    } else if (path.includes("topup")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังเลือกวิธีเติม..";
      presenceData.state = uid;
      if (path.includes("topup_tmn")) {
        presenceData.details = "กำลังเติมผ่านบัตรเงินสด..";
        presenceData.state = uid;
        presenceData.startTimestamp = browsingStamp;
      } else if (path.includes("topu_wallet")) {
        presenceData.details = "กำลังเติมผ่านวอเลท..";
        presenceData.state = uid;
        presenceData.startTimestamp = browsingStamp;
      }
    } else if (path.includes("admin")) {
      presenceData.details = "อยู่ที่หน้าเเอดมิน";
      presenceData.state = "หน้าหลัก";
      presenceData.startTimestamp = browsingStamp;
      if (path.includes("queue_group")) {
        presenceData.details = "ตรวจสอบการเติมเเบบโอน";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
        if (path.includes("id")) {
          presenceData.details = "ตรวจสอบการเติมเเบบโอน";
          presenceData.state = id;
          presenceData.startTimestamp = browsingStamp;
          presenceData.smallImageKey = "reading";
        }
      } else if (path.includes("queue_idpass")) {
        presenceData.details = "ตรวจสอบการเติมเเบบหรัส";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
        if (path.includes("id")) {
          presenceData.details = "ตรวจสอบการเติมเเบบโอน";
          presenceData.state = id;
          presenceData.startTimestamp = browsingStamp;
          presenceData.smallImageKey = "reading";
        }
      } else if (path.includes("queue_wallet")) {
        presenceData.details = "ตรวจสอบการโอนเงิน";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
        if (path.includes("id")) {
          presenceData.details = "ตรวจสอบการโอนเงิน";
          presenceData.state = id;
          presenceData.startTimestamp = browsingStamp;
          presenceData.smallImageKey = "reading";
        }
      } else if (path.includes("man_user")) {
        presenceData.details = "จัดการสมาชิก";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
        if (path.includes("id")) {
          presenceData.details = "จัดการสมาชิก";
          presenceData.state = maid;
          presenceData.startTimestamp = browsingStamp;
          presenceData.smallImageKey = "reading";
        }
      } else if (path.includes("man_random")) {
        presenceData.details = "จัดการวงล้อ";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
      } else if (path.includes("man_coupon")) {
        presenceData.details = "จัดการคูปอง";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
      } else if (path.includes("cfg_topup")) {
        presenceData.details = "จัดการการเติมเงิน";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
      } else if (path.includes("cfg_group")) {
        presenceData.details = "จัดการการเติมเเบบกลุ่ม";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
      } else if (path.includes("cfg_idpass")) {
        presenceData.details = "จัดการการเติมเเบบหรัส";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
      } else if (path.includes("history")) {
        presenceData.details = "ประวัติการเงิน";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "reading";
      }
    } else if (path.includes("queue")) {
      presenceData.details = "ตรวจสอบคิว";
      presenceData.state = uid;
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "reading";
    } else if (path.includes("history")) {
      presenceData.details = "ตรวจสอบการใช้จ่าย";
      presenceData.state = uid;
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "reading";
    } else if (path.includes("profile")) {
      presenceData.details = "หน้าโปรไฟล์";
      presenceData.state = uid;
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "reading";
    } else if (path.includes("login")) {
      presenceData.details = "กำลังล็อกอิน..";
      presenceData.state = uid;
      presenceData.startTimestamp = browsingStamp;
    } else if (path.includes("register")) {
      presenceData.details = "กำลังสมัครใช้งาน..";
      presenceData.state = uid;
      presenceData.startTimestamp = browsingStamp;
    } else {
      presenceData.details = "หน้าที่ไม่ทราบ";
      presenceData.startTimestamp = browsingStamp;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
