const presence = new Presence({
    clientId: "666246771785334784"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var params = new URL(document.location.href).toString();
var uid = document.querySelector("#navbar_global > ul.navbar-nav.align-items-lg-center.ml-lg-auto > li.nav-item.d-none.d-lg-block.ml-lg-4.dropdown > div > a:nth-child(3)");
var uid1 = uid.textContent;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "icon"
    };
    if (document.location.hostname == "snowboltz.net") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "กำลังดูที่หน้าหลัก...";
            presenceData.state = uid1;
        }
        else if (params.includes("p=home")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "กำลังดูที่หน้าหลัก...";
            presenceData.state = uid1;
        }
        else if (params.includes("index.php?p=home")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "กำลังดูที่หน้าหลัก...";
            presenceData.state = uid1;
        }
        else if (params.includes("p=robux_group")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "กำลังซื้อ R$ เเบบกลุ่ม...";
            presenceData.state = uid1;
        }
        else if (params.includes("p=robux_idpass")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = uid1;
            presenceData.details = "กำลังซื้อ R$ เเบบหรัส...";
        }
        else if (params.includes("p=luckybox")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "reading";
            presenceData.state = uid1;
            presenceData.details = "กำลังดูที่กล่องสุ่ม...";
        }
        else if (params.includes("p=coupon")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = uid1;
            presenceData.details = "กำลังรอใส่โค้ด...";
        }
        else if (params.includes("p=topup_tmn")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = uid1;
            presenceData.details = "กำลังเติมด้วยบัตรเงินสด...";
        }
        else if (params.includes("p=topup_wallet")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = uid1;
            presenceData.details = "กำลังเติมด้วยวอเลท...";
        }
        else if (params.includes("p=topup")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "reading";
            presenceData.state = uid1;
            presenceData.details = "กำลังเลือกช่องทางเติมเงิน...";
        }
        else if (params.includes("p=history")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "reading";
            presenceData.state = uid1;
            presenceData.details = "กำลังดูประวัติการใช้จ่าย...";
        }
        else if (params.includes("p=profile")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "reading";
            presenceData.state = uid1;
            presenceData.details = "กำลังดูโปรไฟล์...";
        }
        else if (params.includes("p=login")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = uid1;
            presenceData.details = "กำลังล็อกอิน...";
        }
        else if (params.includes("p=register")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = uid1;
            presenceData.details = "กำลังสมัครใช้งาน...";
        }
        else if (params.includes("queue_wallet")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = uid1;
            presenceData.details = "ตรวจสอบการโอนเงิน";
            presenceData.smallImageKey = "reading";
        }
        else if (params.includes("queue_group")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "ตรวจสอบการเติมเเบบกลุ่ม";
            presenceData.state = uid1;
            presenceData.smallImageKey = "reading";
        }
        else if (params.includes("queue_idpass")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = uid1;
            presenceData.details = "ตรวจสอบการเติมเเบบหรัส";
            presenceData.smallImageKey = "reading";
            presenceData.state = uid1;
        }
        else if (params.includes("man_user")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = uid1;
            presenceData.details = "จัดการสมาชิก";
            presenceData.smallImageKey = "reading";
            presenceData.state = uid1;
        }
        else if (params.includes("p=queue")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = uid1;
            presenceData.smallImageKey = "reading";
            presenceData.details = "กำลังดูคิว...";
        }
        else if (params.includes("p=admin")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.state = uid1;
            presenceData.details = "อยู่ที่หน้าเเอดมิน";
            presenceData.smallImageKey = "reading";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEQsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDOUIseUlBQXlJLENBQzFJLENBQUM7QUFDRixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFBO0FBRTFCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3JDLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBR0YsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFlLEVBQUU7UUFDakQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7WUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztZQUMvQyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUMzQjthQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1lBQy9DLFlBQVksQ0FBQyxL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