const presence = new Presence({
  clientId: "709308577701036074"
});

// Const thing
const browsingStamp = Math.floor(Date.now() / 1000);
const title = document.querySelector("body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-heading > h3");
const ep = document.querySelector("body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-body > center:nth-child(2) > h3");
const title1 = title?.textContent ?? "ไม่ทราบชื่อ";
const ep1 = ep?.textContent ?? "ไม่ทราบชื่อตอน";
const path = document.location;

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
  largeImageKey: "icon"
};

// Presence
if (path.hostname == "anime-sugoi.com" || path.hostname.includes ("www.")) {
  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "อนิเมะอัพเดตล่าสุด";
  } else if (path.pathname.includes ("index.html")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "อนิเมะอัพเดตล่าสุด";
  } else if (path.pathname.includes ("catalog")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "หมวดหมู่ ";
    presenceData.state = title1;
  } else if (path.pathname.includes ("tag")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "หมวดหมู่ ";
    presenceData.state = title1;
  } else if (path.search.includes ("search")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "ค้นหา ";
    presenceData.state = title1;
  } else if (path.pathname.includes ("play")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "กำลังรับชม ";
    presenceData.state = title1;
  } else if (path.href) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "เลือกตอน ";
    presenceData.state = ep1;
  }
}

if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
  //console.log(presenceData);
}
});


