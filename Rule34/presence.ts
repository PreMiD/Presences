var presence = new Presence({
  clientId: "619967690056007699",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  if(document.location.href.includes("rule34.xxx")) {
    var presenceData: presenceData = {
      details: "Test",
      state: "Test X",
      largeImageKey: "lg-r34"
    };
    presence.setActivity(presenceData);
    console.log("Test X2");
  } else if(document.location.href.includes("rule34.paheal.net")) {
    var presenceData: presenceData = {
      details: "Test",
      state: "Test P",
      largeImageKey: "lg-r34"
    };
    presence.setActivity(presenceData);
    console.log("Test P2");
  }
});