const presence = new Presence({
    clientId: "666246771785334784"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  path = document.location.search;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  if (
    document.location.hostname.includes("shop.") ||
    document.location.hostname === "snowboltz.net"
  ) {
    if (path.includes("home")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังดูที่หน้าหลัก..";
    } else if (path.includes("admin")) {
      presenceData.details = "อยู่ที่หน้าเเอดมิน";
      presenceData.state = "หน้าหลัก";
      presenceData.startTimestamp = browsingStamp;
      if (path.includes("queue_group")) {
        presenceData.details = "การเติมเเบบโอน";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
        if (path.includes("id")) {
          const id1 = document.querySelector(
              "body > main > div > section > div.container.shape-container.py-md-md > div > div.col-12.col-md-9.pl-md-0 > div > div.card-body > p:nth-child(6) > b"
            ),
            id =
              id1?.textContent.replace("สมาชิกหมายเลข", "ของหมายเลข ") ??
              "ไม่ทราบสมาชิก";
          presenceData.details = "การเติมเเบบโอน";
          presenceData.state = id;
          presenceData.startTimestamp = browsingStamp;
          presenceData.smallImageKey = "reading";
        }
      } else if (path.includes("queue_idpass")) {
        presenceData.details = "การเติมเเบบหรัส";
        presenceData.state = "หน้าหลัก";
        presenceData.startTimestamp = browsingStamp;
        if (path.includes("&id=")) {
          const id1 = document.querySelector(
              "body > main > div > section > div.container.shape-container.py-md-md > div > div.col-12.col-md-9.pl-md-0 > div > div.card-body > p:nth-child(7) > b"
            ),
            id =
              id1?.textContent.replace("สมาชิกหมายเลข", "ของหมายเลข ") ??
              "ไม่ทราบสมาชิก";
          presenceData.details = "การเติมเเบบหรัส";
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
            ),
            id =
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
            ),
            maid =
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
    } else if (path.includes("robux_group")) {
      const stock1 = document.querySelector(
          "body > main > div > section > div.container.shape-container.d-flex.align-items-center.py-lg > div > div > div:nth-child(1) > div > div > div > b:nth-child(1) > span"
        ),
        stock = stock1?.textContent ?? "0 R$";
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กำลังซื้อสินค้า";
      presenceData.state = `เเบบกลุ่ม - ${stock} R$`;
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
      presenceData.state = "กำลังเลือกช่องทาง";
      if (path.includes("topup_tmn")) {
        presenceData.details = "กำลังเติมเงิน";
        presenceData.state = "ผ่านบัตรเงินสด";
        presenceData.startTimestamp = browsingStamp;
      } else if (path.includes("topup_wallet")) {
        presenceData.details = "กำลังเติมเงิน";
        presenceData.state = "ผ่านวอเลท";
        presenceData.startTimestamp = browsingStamp;
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
    } else {
      presenceData.details = "SnowBoltz - ร้านเติมโรบัค";
      presenceData.state = "ซื้อโรบัคราคาถูกเรทสูงง่ายๆ";
      presenceData.startTimestamp = browsingStamp;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
