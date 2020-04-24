var presence = new Presence({
  clientId: "702978839722197012"
});
var strings = presence.getStrings({
  browsing: "presence.activity.browsing"
});

presence.on("UpdateData", async () => {
  let presenceData = {
    largeImageKey: "instantgaming"
  };
  try {
    var product_title = document.querySelector("div.product > div.infos > div.shadow.mainshadow > div.title > h1").textContent;
    var product_price = document.querySelector("div.price").textContent;
    var product_platform = document.querySelector("div.subinfos > a.platform").textContent;
    if (product_platform.startsWith("Other")) {
      product_platform = "N/A";
    }
    presenceData.details = "Viewing a product:";
    presenceData.state = `[${product_platform}] ${product_title} (${product_price})`;
  } catch {
    if (window.location.pathname.includes("/user/")) {
      var profile_name = document.querySelector("div.ig-profile-info-nick > span").textContent;
      presenceData.details = "Viewing a profile:";
      presenceData.state = profile_name;
    } else {
      presenceData.details = (await strings).browsing;
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});