const presence = new Presence({
    clientId: "702978839722197012"
  }),
  strings = presence.getStrings({
    browsing: "presence.activity.browsing"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "instantgaming"
  };
  try {
    const productTitle = document.querySelector(
        "div.product > div.infos > div.shadow.mainshadow > div.title > h1"
      ).textContent,
      productPrice = document.querySelector("div.price").textContent;
    let productPlatform = document.querySelector(
      "div.subinfos > a.platform"
    ).textContent;
    if (productPlatform.startsWith("Other")) productPlatform = "N/A";

    presenceData.details = "Viewing a product:";
    presenceData.state = `[${productPlatform}] ${productTitle} (${productPrice})`;
  } catch {
    if (window.location.pathname.includes("/user/")) {
      const profileName = document.querySelector(
        "div.ig-profile-info-nick > span"
      ).textContent;
      presenceData.details = "Viewing a profile:";
      presenceData.state = profileName;
    } else presenceData.details = (await strings).browsing;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
