const presence = new Presence({ clientId: "751384892570468404" }),
  browsingStamp = Math.floor(Date.now() / 1000),
  path = document.location.pathname,
  path2 = document.location.search;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };
  if (document.location.hostname == "reaperx.in.th") {
    if (path.includes("/home") || path2.startsWith("?page=home")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "หน้าหลัก";
      presenceData.smallImageKey = "music";
    } else if (path.includes("/group") || path2.startsWith("?page=group")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กําลังซื้อ R$";
      presenceData.state = "เเบบกลุ่ม";
    } else if (path.includes("/idpass") || path2.startsWith("?page=idpass")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กําลังซื้อ R$";
      presenceData.state = "เเบบไอดีพาส";
    } else if (path.includes("/topup") || path2.startsWith("?page=topup")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กําลังเติมเงินเข้าเว็บ";
    } else if (path.includes("/account") || path2.startsWith("?page=account")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กําลังเช็คบัญชี";
    } else if (
      path.includes("/register") ||
      path2.startsWith("?page=register")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กําลังสมัครสมาชิก";
    } else if (path.includes("/login") || path2.startsWith("?page=login")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "กําลังลงชื่อเข้าใช้";
    } else if (
      path.includes("?page=backend") ||
      path2.startsWith("?page=backend")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "เมนูเเอดมิน";
    } else {
      presenceData.details = "ReaperX - บริการเติม R$";
      presenceData.state = "ร้านเติมโรบัคราคาถูก";
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
