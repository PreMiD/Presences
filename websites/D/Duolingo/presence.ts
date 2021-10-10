const presence = new Presence({
    clientId: "612071822321647648"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  },
  pageData: PresenceData = {
    largeImageKey: "logo"
  },
  lang = new Map();
lang.set("de", "German");
lang.set("es", "Spanish");
lang.set("fr", "French");
lang.set("ja", "Japanese");
lang.set("it", "Italian");
lang.set("ko", "Korean");
lang.set("zs", "Chinese");
lang.set("ru", "Russian");
lang.set("pt", "Portuguese");
lang.set("tr", "Turkish");
lang.set("dn", "Dutch");
lang.set("sv", "Swedish");
lang.set("el", "Greek");
lang.set("hi", "Hindi");
lang.set("hv", "high valyrian");
lang.set("ga", "Irish");
lang.set("pl", "Polish");
lang.set("he", "Hebrew");
lang.set("nb", "Norwegian");
lang.set("vi", "Vietnamese");
lang.set("ar", "Arabic");
lang.set("hw", "Hawaiian");
lang.set("da", "Danish");
lang.set("kl", "Klingon");
lang.set("ro", "Romanian");
lang.set("cs", "Czech");
lang.set("sw", "Swahili");
lang.set("cy", "Walsh");
lang.set("id", "Indonesian");
lang.set("hu", "Hungarian");
lang.set("uk", "Ukrainian");
lang.set("eo", "Esperanto");
lang.set("nv", "Navajo");
lang.set("en", "English");

presence.on("UpdateData", async () => {
  const path1 = document.location.pathname;

  if (!path1.split("/")[2]) {
    if (document.location.pathname.startsWith("/learn")) {
      pageData.details = "Choosing level to learn..";
      presence.setActivity(pageData);
    } else if (document.location.pathname.startsWith("/shop")) {
      pageData.details = "Browsing shop..";
      presence.setActivity(pageData);
    } else if (document.location.pathname.includes("/dictionary")) {
      pageData.details = "Using dictionary..";
      pageData.state = `Language: ${document.location.pathname.split("/")[2]}`;
      presence.setActivity(pageData);
    } else if (document.location.pathname.includes("/profile")) {
      pageData.details = "Browsing profile..";
      pageData.state = `Browsing: ${document.location.pathname.split("/")[2]}`;
      presence.setActivity(pageData);
    } else if (document.location.pathname.includes("/words")) {
      presenceData.details = "Checking words...";
      presenceData.largeImageKey = "logo";
      presence.setActivity(presenceData);
    } else if (
      document.location.pathname === "/" ||
      !document.location.pathname
    )
      presence.setActivity(pageData);
  } else {
    if (
      path1.length > 1 &&
      path1.split("/")[2] !== null &&
      path1.split("/")[2].length === 2
    ) {
      let language: string;
      for (const value of lang.keys()) {
        if (path1.split("/")[2] === value) {
          language = lang.get(value);
          break;
        }
      }
      presenceData.details = "Taking a lesson";
      presenceData.state = `Language: ${language}`;
      presenceData.largeImageKey = "logo";
      presence.setActivity(presenceData);
    }
  }
});
