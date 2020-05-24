const presence = new Presence({
  clientId: "709308577701036074"
});

const browsingStamp = Math.floor(Date.now() / 1000);
const title = document.querySelector("body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-heading > h3");
const ep = document.querySelector("body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-body > center:nth-child(2) > h3");
const subauthor = document.querySelector("body > div:nth-child(3) > div > div.col-lg-9 > div > div.panel-body > p:nth-child(15)");
const title1 = title?.textContent ?? "ไม่ทราบชื่อ";
const subauthor1 = subauthor?.textContent ?? "ไม่ทราบชื่อผู้เเปล";
const ep1 = ep?.textContent ?? "ไม่ทราบชื่อตอน";
const path = document.location;

presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
  largeImageKey: "icon"
};


if (path.hostname == "anime-sugoi.com" || path.hostname.includes ("www.")) {
  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = title1;
  } else if (path.pathname.includes ("catalog")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "หมวดหมู่ " + title1;
  } else if (path.pathname.includes ("play")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "กำลังดู " + title1;
    presenceData.state = subauthor1;
  } else if (path.href) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "กำลังเลือกตอน " + ep1;
    presenceData.state = subauthor1;
  }
}

if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
  console.log(presenceData);
}
});


