const presence = new Presence({
  clientId: "666246771785334784"
});

const browsingStamp = Math.floor(Date.now() / 1000);
const path = document.location.search;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  if (document.location.hostname.includes("shop.") || document.location.hostname.includes("docs.") || document.location.hostname == "snowboltz.net") {
    if (path.includes("home")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังดูที่หน้าหลัก..";
    } else if (path.includes("robux_group")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังซื้อสินค้า";
      presenceData.state = "เเบบกลุ่ม";
    } else if (path.includes("robux_idpass")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังซื้อสินค้า";
      presenceData.state = "เเบบหรัส";
    } else if (path.includes("luckybox")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังสุ่มวงล้อ..";
    } else if (path.includes("coupon")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังรอใส่คูปอง..";
    } else if (path.includes("topup")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังเติมเงิน";
      if (path.includes("topup_tmn")) {
        presenceData.details = "กำลังเติมเงิน";
        presenceData.state = "ผ่านบัตรเงินสด";
        presenceData.startTimestamp = browsingStamp;
      } else if (path.includes("topu_wallet")) {
        presenceData.details = "กำลังเติมเงิน";
        presenceData.state = "ผ่านวอเลท";
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
          const id1 = document.querySelector(
            "body > main > div > section > div.container.shape-container.py-md-md > div > div.col-12.col-md-9.pl-md-0 > div > div.card-body > p:nth-child(3) > b"
          );
          const id =
            id1?.textContent.replace("สมาชิกหมายเลข", "ของหมายเลข ") ??
            "ไม่ทราบสมาชิก";
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
          const id1 = document.querySelector(
            "body > main > div > section > div.container.shape-container.py-md-md > div > div.col-12.col-md-9.pl-md-0 > div > div.card-body > p:nth-child(7) > b"
          );
          const id =
            id1?.textContent.replace("สมาชิกหมายเลข", "ของหมายเลข ") ??
            "ไม่ทราบสมาชิก";
          presenceData.details = "ตรวจสอบการเติมเเบบหรัส";
          presenceData.state = id;
          presenceData.startTimestamp = browsingStamp;
          presenceData.smallImageKey = "reading";
        }
      } else if (path.includes("queue_wallet")) {
        presenceData.details = "ตรวจสอบการโอนเงิน";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
        if (path.includes("id")) {
          const id1 = document.querySelector(
            "body > main > div > section > div.container.shape-container.py-md-md > div > div.col-12.col-md-9.pl-md-0 > div > div.card-body > p:nth-child(3) > b"
          );
          const id =
            id1?.textContent.replace("สมาชิกหมายเลข", "ของหมายเลข ") ??
            "ไม่ทราบสมาชิก";
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
          const maid1 = document.querySelector(
            "body > main > div > section > div.container.shape-container.py-md-md > div > div.col-12.col-md-9.pl-md-0 > div > div.card-body > div > h4"
          );
          const maid =
            maid1?.textContent.replace("สมาชิกหมายเลข", "ของหมายเลข ") ??
            "ไม่ทราบสมาชิก";
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
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "reading";
    } else if (path.includes("history")) {
      presenceData.details = "ตรวจสอบการใช้จ่าย";
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "reading";
    } else if (path.includes("profile")) {
      presenceData.details = "หน้าโปรไฟล์";
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "reading";
    } else if (path.includes("login")) {
      presenceData.details = "กำลังล็อกอิน..";
      presenceData.startTimestamp = browsingStamp;
    } else if (path.includes("register")) {
      presenceData.details = "กำลังสมัครใช้งาน..";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.hostname.includes("docs.")){
      presenceData.details = "ฐานความรู้";
      const head = document?.querySelector("#__GITBOOK__ROOT__CLIENT__ > div.reset-3c756112--body-68cac36c > div.reset-3c756112--bodyContent-2f98451b > div > div.reset-3c756112--wholeContentBody-554be184 > div.reset-3c756112--wholeContentPage-6c3f1fc5 > div > div.reset-3c756112--pageContainer-3ec6d8d0 > div.reset-3c756112 > div.reset-3c756112--pageHeader-15724735 > div > div > div.reset-3c756112--horizontalFlex-5a0077e0 > div.reset-3c756112--pageHeaderIntro-0c1463da > h1 > span").textContent.replace("SnowBoltz - Knowledgebase", "หน้าหลัก") ?? "ไม่ทราบหน้า";
      presenceData.state = head + " - SnowBoltz Knowledgebase";
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = "reading";
      presenceData.smallImageText = "กำลังอ่าน";
    } else {
      presenceData.details = "SnowBoltz - snowboltz.net";
      presenceData.state = "ร้านเติมโรบัคราคาถูกเรทสูง";
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
