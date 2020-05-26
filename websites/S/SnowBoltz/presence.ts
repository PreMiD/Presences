const presence = new Presence({
  clientId: "666246771785334784"
});

const browsingStamp = Math.floor(Date.now() / 1000);
const params = document.location.search
const uid = document.querySelector("#navbar_global > ul.navbar-nav.align-items-lg-center.ml-lg-auto > li.nav-item.d-none.d-lg-block.ml-lg-4.dropdown > div > a:nth-child(3)");
const gruid = document.querySelector("body > main > div > section > div.container.shape-container.py-md-md > div > div.col-12.col-md-9.pl-md-0 > div > div.card-body > p:nth-child(6) > b");
const trfuid = document.querySelector("body > main > div > section > div.container.shape-container.py-md-md > div > div.col-12.col-md-9.pl-md-0 > div > div.card-body > p:nth-child(3) > b");
const uid1 = uid?.textContent ?? "ยังไม่เข้าสู่ระบบ";
const gruid1 = gruid?.textContent.replace("สมาชิกหมายเลข", "ของหมายเลข ") ?? "ไม่ทราบสมาชิก"
const trfuid1 = trfuid?.textContent.replace("สมาชิกหมายเลข", "ของหมายเลข ") ?? "ไม่ทราบสมาชิก"
const idpasuid1 = "รออัพเดท"

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
  largeImageKey: "icon"
};


if (document.location.hostname == "snowboltz.net") {
  if (params.includes("home")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังดูที่หน้าหลัก...";
      presenceData.state = uid1;
  } else if (params.includes("robux_group")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "กำลังซื้อ R$ เเบบกลุ่ม...";
    presenceData.state = uid1;
  } else if (params.includes("robux_idpass")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังซื้อ R$ เเบบหรัส...";
  } else if (params.includes("luckybox")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.state = uid1;
    presenceData.details = "กำลังดูที่กล่องสุ่ม...";
  } else if (params.includes("coupon")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังรอใส่โค้ด...";
  } else if (params.includes("topup_tmn")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังเติมด้วยบัตรเงินสด...";
  } else if (params.includes("topup_wallet")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังเติมด้วยวอเลท...";
  } else if (params.includes("topup")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.state = uid1;
    presenceData.details = "กำลังเลือกช่องทางเติมเงิน...";
  } else if (params.includes("history")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.state = uid1;
    presenceData.details = "กำลังดูประวัติการใช้จ่าย...";
  } else if (params.includes("profile")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.state = uid1;
    presenceData.details = "กำลังดูโปรไฟล์...";
  } else if (params.includes("login")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังล็อกอิน...";
  } else if (params.includes("register")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังสมัครใช้งาน...";
  } else if (params.includes("queue_wallet")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = "หน้าหลัก";
    presenceData.details = "ตรวจสอบการโอนเงิน";
    presenceData.smallImageKey = "reading";
    if (params.includes ("id")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "ตรวจสอบการโอนเงิน";
      presenceData.state = trfuid1;
      presenceData.smallImageKey = "reading";
    }
  }  else if (params.includes("queue_group")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "ตรวจสอบการเติมเเบบกลุ่ม";
    presenceData.state = "หน้าหลัก";
    presenceData.smallImageKey = "reading";
    if (params.includes ("id")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "ตรวจสอบการเติมเเบบกลุ่ม";
      presenceData.state = gruid1;
      presenceData.smallImageKey = "reading";
    }
  } else if (params.includes("queue_idpass")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = "หน้าหลัก";
    presenceData.details = "ตรวจสอบการเติมเเบบหรัส";
    presenceData.smallImageKey = "reading";
    presenceData.state = "หน้าหลัก";
    if (params.includes ("id")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "ตรวจสอบการเติมเเบบหรัส";
      presenceData.state = idpasuid1;
      presenceData.smallImageKey = "reading";
    }
  } else if (params.includes("man_user")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "จัดการสมาชิก";
    presenceData.smallImageKey = "reading";
    presenceData.state = uid1;
  } else if (params.includes("queue")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.smallImageKey = "reading";
    presenceData.details = "กำลังดูคิว...";
  }  else if (params.includes("admin")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = "หน้าหลัก";
    presenceData.details = "อยู่ที่หน้าเเอดมิน";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "กำลังดูที่หน้าหลัก...";
    presenceData.state = uid1;
  } else if (document.location.href) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "หน้าที่ไม่ทราบ";
  }
}

if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});

