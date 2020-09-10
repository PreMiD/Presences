const presence = new Presence({clientId: "751384892570468404"}),
browsingStamp = Math.floor(Date.now() / 1000),
path = document.location.pathname;

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "icon"
    };
    if (document.location.hostname == "reaperx.in.th") {
        if (path.includes("/home")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "หน้าหลัก";
            presenceData.smallImageKey = "music";
        } else if (path.includes("/group")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "กําลังซื้อ R$";
            presenceData.state = "เเบบกลุ่ม";
        } else if (path.includes("/idpass")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "กําลังซื้อ R$";
            presenceData.state = "เเบบไอดีพาส";
        } else if (path.includes("/topup")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "กําลังเติมเงินเข้าเว็บ";
        } else if (path.includes("/account")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "กําลังเช็คบัญชี";
        } else if (path.includes("/register")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "กําลังสมัครสมาชิก";
        } else if (path.includes("/login")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "กําลังลงชื่อเข้าใช้";
        } else if (path.includes("/backend")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "เบื้องหลัง/เเอดมิน";
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
