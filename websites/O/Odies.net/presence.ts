const presence = new Presence({
  clientId: "816672623240675329"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "odies"
    },
    browsingStamp = Math.floor(Date.now() / 1000);
  presenceData.startTimestamp = browsingStamp;
  if (window.location.hostname.toLowerCase() == "odies.net") {
    if (
      document
        .querySelector("head > title")
        .innerHTML.split("|")[0]
        .trim()
        .startsWith("Hata")
    ) {
      presenceData.details =
        "Bir hata sayfasına bakıyor (" +
        document.querySelector(
          "body > div.container-fluid.error-content > div > h1"
        ).innerHTML +
        ") ";
    } else if (window.location.pathname.toLowerCase() == "/") {
      presenceData.details = "Bir sayfaya göz atıyor:";
      presenceData.state = "Ana sayfa";
    } else if (window.location.pathname.toLowerCase() == "/request/new") {
      presenceData.details = "Bir sayfaya göz atıyor:";
      presenceData.state = "Istek Kod";
    } else if (window.location.pathname.toLowerCase() == "/code/new/user") {
      presenceData.details = "Bir sayfaya göz atıyor:";
      presenceData.state = "Kod paylaş";
    } else if (window.location.pathname.toLowerCase() == "/sss") {
      presenceData.details = "Bir sayfaya göz atıyor:";
      presenceData.state = "Sıkça sorulan soruları (SSS)";
    } else if (
      window.location.pathname.toLowerCase().startsWith("/codes/category/")
    ) {
      presenceData.details = "Bir kategoriye bakıyor:";
      presenceData.state = document
        .querySelector("#cancel-row > div > div > div > h5")
        .innerHTML.split(" ")[4]
        .replace("discord.js", "DiscordJS")
        .replace("eris", "Eris")
        .replace("altyapı", "Altyapı")
        .replace("python", "Python")
        .replace("user", "Sizden gelenler")
        .replace("html", "Html")
        .replace("ozel5", "5. Seviye")
        .replace("ozel15", "15. Seviye")
        .replace("ozel30", "30. Seviye")
        .replace("ozel50", "50. Seviye");
    } else if (window.location.pathname.toLowerCase() == "/profile") {
      presenceData.details = `"${
        document.querySelector("div.main-content p").innerHTML.split("#")[0]
      }" adlı kullanıcının profiline bakıyor`;
    } else if (window.location.pathname.startsWith("/view/")) {
      presenceData.details = "Bir kod sayfasına bakıyor:";
      presenceData.state =
        document
          .querySelector("#cancel-row > div > div > h1")
          .innerHTML.trim() +
        " (" +
        document
          .querySelector("#cancel-row > div > div > a:nth-child(6)")
          .innerHTML.split(" ")[5] +
        ") ";
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
  
});
