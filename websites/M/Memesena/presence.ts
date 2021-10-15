const presence = new Presence({
  clientId: "771693710227931156"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/") {
    const presenceData: PresenceData = {
      details: "browsing the Homepage",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith("/meme-templates") ||
    document.location.pathname.startsWith("/category/images/meme-templates")
  ) {
    const presenceData: PresenceData = {
      details: "browsing Meme Templates",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/desi-meme-templates")) {
    const presenceData: PresenceData = {
      details: "browsing Desi Meme Templates",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/english-meme-templates")) {
    const presenceData: PresenceData = {
      details: "browsing English Meme Templates",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/category/articles")) {
    const presenceData: PresenceData = {
      details: "browsing Articles",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/meme-reacts")) {
    const presenceData: PresenceData = {
      details: "browsing Meme Reactions",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/extras")) {
    const presenceData: PresenceData = {
      details: "browsing Extras",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/ascii-arts")) {
    const presenceData: PresenceData = {
      details: "viewing ASCII Arts",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/copy-pastas")) {
    const presenceData: PresenceData = {
      details: "viewing Copy Pastas",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/emoji-pastas")) {
    const presenceData: PresenceData = {
      details: "viewing Emoji Pastas",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/fun-bots")) {
    const presenceData: PresenceData = {
      details: "browsing Fun Bots",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith("/sarcastic-text-generator")
  ) {
    const presenceData: PresenceData = {
      details: "generating Sarcastic Text",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/emoji-pasta-generator")) {
    const presenceData: PresenceData = {
      details: "generating Emoji Pasta",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/fancy-font-generator")) {
    const presenceData: PresenceData = {
      details: "generating text in Fancy Fonts",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/about")) {
    const presenceData: PresenceData = {
      details: "viewing About Page",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/contact")) {
    const presenceData: PresenceData = {
      details: "viewing Contact Page",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/privacy-policy")) {
    const presenceData: PresenceData = {
      details: "viewing Privacy policy",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else {
    const presenceData: PresenceData = {
      details: "viewing an article",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  }
});
