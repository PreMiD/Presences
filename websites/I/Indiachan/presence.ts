const presence: Presence = new Presence({
  clientId: "876813345699811328"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    p = document.location.pathname;
  if (p === "/") {
    presenceData.details = "Home";
    presenceData.smallImageText = "Idling";
    presenceData.smallImageKey = "dindu";
    presence.setActivity(presenceData);
    return;
  }
  if (p.startsWith("/a")) {
    presenceData.details = "ありがとうございます";
    presenceData.smallImageKey = "a";
  } else if (p.startsWith("/g")) {
    presenceData.details = "Install Gentoo";
    presenceData.smallImageKey = "g";
  } else if (p.startsWith("/b")) {
    presenceData.details = "बोलो जुबाँ केसरी";
    presenceData.smallImageKey = "b";
  } else if (p.startsWith("/pol")) {
    presenceData.details = "Politically Incorrect";
    presenceData.smallImageKey = "pol";
  } else if (p.startsWith("/ent")) {
    presenceData.details = "Entertainment";
    presenceData.smallImageKey = "ent";
  } else if (p.startsWith("/man")) {
    presenceData.details = "manuṣyatā";
    presenceData.smallImageKey = "man";
  } else if (p.startsWith("/meta")) {
    presenceData.details = "Discussions";
    presenceData.smallImageKey = "dindu";
  } else if (p.startsWith("/yoga")) {
    presenceData.details = "Fitness";
    presenceData.smallImageKey = "yoga";
  } else if (p.startsWith("/dhan")) {
    presenceData.details = "Dhandho";
    presenceData.smallImageKey = "dhan";
  }

  const parts = p.split("/");
  presenceData.smallImageText = `Browsing /${parts[1].split(".")[0]}/ - ${
    parts[2] === "" ? "1" : parts[2].split(".")[0]
  }`;

  if (p.endsWith("catalog.html"))
    presenceData.smallImageText = "Browsing catalog";
  else if (
    (<HTMLInputElement>document.querySelector('textarea[name="message"]'))
      .value !== ""
  )
    presenceData.smallImageText = "Writing a post";
  else if (p.includes("res")) {
    presenceData.smallImageText = `Reading thread #${
      p.split("/")[3].split(".")[0]
    }`;
  } else if (p.endsWith("Rules.html") || p.endsWith("rules.html")) {
    presenceData.smallImageText = "Reading rules";
    presenceData.smallImageKey = "logo";
  } else if (p.includes("media"))
    presenceData.smallImageText = "Looking at some media";

  presence.setActivity(presenceData);
});
