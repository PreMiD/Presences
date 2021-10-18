const presence = new Presence({ clientId: "751384892570468404" }),
  browsingStamp = Math.floor(Date.now() / 1000),
  path = document.location.pathname,
  path2 = document.location.search;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };
  if (document.location.hostname === "reaperx.net") {
    if (path.includes("/home") || path2.startsWith("?page=home")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = "หน้าหลัก";
      presenceData.details = "กําลังอยู่หน้า:";
    } else if (path.includes("/group") || path2.startsWith("?page=group")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = "กําลังซื้อ R$ เเบบกลุ่ม";
      presenceData.details = "กําลังอยู่หน้า:";
    } else if (path.includes("/idpass") || path2.startsWith("?page=idpass")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = "กําลังซื้อ R$ เเบบไอดีพาส";
      presenceData.details = "กําลังอยู่หน้า:";
    } else if (path.includes("/topup") || path2.startsWith("?page=topup")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = "กําลังเติมเงินเข้าเว็บ";
      presenceData.details = "กําลังอยู่หน้า:";
    } else if (path.includes("/account") || path2.startsWith("?page=account")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = "กําลังเช็คบัญชี";
      presenceData.details = "กําลังอยู่หน้า:";
    } else if (
      path.includes("/register") ||
      path2.startsWith("?page=register")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = "กําลังสมัครสมาชิก";
      presenceData.details = "กําลังอยู่หน้า:";
    } else if (path.includes("/login") || path2.startsWith("?page=login")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = "กําลังลงชื่อเข้าใช้";
      presenceData.details = "กําลังอยู่หน้า:";
    } else if (
      path.includes("?page=backend") ||
      path2.startsWith("?page=backend")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = "เมนูเเอดมิน";
      presenceData.details = "กําลังอยู่หน้า:";
    } else {
      presenceData.state = "ReaperX - บริการเติม R$";
      presenceData.details = "ร้านเติมโรบัคราคาถูก";
      presenceData.startTimestamp = browsingStamp;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  }
});
