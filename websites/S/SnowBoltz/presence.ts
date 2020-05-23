const presence = new Presence({
  clientId: "666246771785334784"
});

var browsingStamp = Math.floor(Date.now() / 1000);
var params = new URL(document.location.href).toString(); 
var uid = document.querySelector(
  "#navbar_global > ul.navbar-nav.align-items-lg-center.ml-lg-auto > li.nav-item.d-none.d-lg-block.ml-lg-4.dropdown > div > a:nth-child(3)"
);
var uid1 = uid.textContent

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
  largeImageKey: "icon"
};


if (document.location.hostname == "snowboltz.net") {
  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "กำลังดูที่หน้าหลัก...";
    presenceData.state = uid1;
  } else if (params.includes("p=home")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังดูที่หน้าหลัก...";
      presenceData.state = uid1;
  } else if (params.includes("index.php?p=home")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "กำลังดูที่หน้าหลัก...";
    presenceData.state = uid1;
  } else if (params.includes("p=robux_group")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "กำลังซื้อ R$ เเบบกลุ่ม...";
    presenceData.state = uid1;
  } else if (params.includes("p=robux_idpass")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังซื้อ R$ เเบบหรัส...";
  } else if (params.includes("p=luckybox")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.state = uid1;
    presenceData.details = "กำลังดูที่กล่องสุ่ม...";
  } else if (params.includes("p=coupon")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังรอใส่โค้ด...";
  } else if (params.includes("p=topup_tmn")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังเติมด้วยบัตรเงินสด...";
  } else if (params.includes("p=topup_wallet")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังเติมด้วยวอเลท...";
  } else if (params.includes("p=topup")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.state = uid1;
    presenceData.details = "กำลังเลือกช่องทางเติมเงิน...";
  } else if (params.includes("p=history")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.state = uid1;
    presenceData.details = "กำลังดูประวัติการใช้จ่าย...";
  } else if (params.includes("p=profile")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.state = uid1;
    presenceData.details = "กำลังดูโปรไฟล์...";
  } else if (params.includes("p=login")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังล็อกอิน...";
  } else if (params.includes("p=register")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "กำลังสมัครใช้งาน...";
  } else if (params.includes("queue_wallet")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "ตรวจสอบการโอนเงิน";
    presenceData.smallImageKey = "reading";
  }  else if (params.includes("queue_group")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "ตรวจสอบการเติมเเบบกลุ่ม";
    presenceData.state = uid1;
    presenceData.smallImageKey = "reading";
  } else if (params.includes("queue_idpass")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "ตรวจสอบการเติมเเบบหรัส";
    presenceData.smallImageKey = "reading";
    presenceData.state = uid1;
  } else if (params.includes("man_user")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "จัดการสมาชิก";
    presenceData.smallImageKey = "reading";
    presenceData.state = uid1;
  } else if (params.includes("p=queue")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.smallImageKey = "reading";
    presenceData.details = "กำลังดูคิว...";
  }  else if (params.includes("p=admin")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = uid1;
    presenceData.details = "อยู่ที่หน้าเเอดมิน";
    presenceData.smallImageKey = "reading";
  } 
}

if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});

