const presence = new Presence({
  clientId: "616940877042155531"
});

let user: string | HTMLElement | Element | Array<string>,
  group: string | HTMLElement | Element | Array<string>,
  typing: boolean | Element,
  typingicon: string,
  card: HTMLElement,
  connected: HTMLElement,
  apptitle: string | HTMLElement | Element,
  lastData: string,
  thisData: string,
  lastStamp: number;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "discordwhite"
  };
  connected = document.querySelector(
    "#app-mount > div > div > div > div > div > div > div > div > section > div > div > div > div > a > div"
  );
  if (connected == null) {
    connected = document.querySelector(
      "#app-mount > div > div > div > div > div > div > div > div > div > div > div > div > div > a > div"
    );
  }
  apptitle = document.querySelector(
    ".appDetails-28RJ80.medium-zmzTW-.size16-1__VVI.height20-13xN5Z.primary-jw0I4K.weightMedium-3xlxJi"
  );
  typingicon = "﻿";

  function getTimeStamp(): number {
    let browsingStamp: number;
    thisData = presenceData.details;
    if (lastData == thisData) {
      browsingStamp = lastStamp;
    } else {
      lastStamp = Math.floor(Date.now() / 1000);
      browsingStamp = Math.floor(Date.now() / 1000);
    }
    return browsingStamp;
  }

  if (
    document.location.hostname == "discordapp.com" ||
    document.location.hostname == "discord.com"
  ) {
    if (connected !== null && connected.textContent !== "") {
      presenceData.startTimestamp = getTimeStamp();
      presenceData.smallImageKey = "call";
      if (connected.textContent.includes("@")) {
        presenceData.details = "Voice connected with";
        presenceData.state = connected.textContent;
      } else {
        presenceData.details = "Voice connected to";
        presenceData.state =
          connected.textContent.replace(
            " / " + connected.textContent.split(" / ").pop(),
            ""
          ) +
          " (Server: " +
          connected.textContent.split(" / ").pop() +
          ")";
      }
    } else if (
      document.querySelector(
        "#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div:nth-child(2) > div:nth-child(3) > div > div.sidebarRegion-VFTUkN > div > div > nav > div > div:nth-child(1)"
      ) !== null
    ) {
      presenceData.details = "Changing their settings";
      presenceData.smallImageKey = "writing";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/channels/@me/")) {
      typing =
        document.querySelector(
          "#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > div.content-yTz4x3 > div > form > div > div > div > div.textArea-12jD-V.slateContainer-3Qkn2x > div.markup-2BOw-j.slateTextArea-1Mkdgw"
        ).textContent !== typingicon;
      user = document.querySelector(
        "#app-mount > div > div > div > div > div > div > div > div > div > div > h3"
      );
      group = document.querySelector(
        "#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > div.title-3qD0b-.container-1r6BKw.themed-ANHk51 > div.children-19S4PO > div.container-3FPLD3 > div > div > div"
      );
      if (user !== null) {
        if (typing) {
          presenceData.details = "Typing in DMs to:";
          presenceData.state = user.textContent;
          presenceData.smallImageKey = "writing";
          presenceData.startTimestamp = getTimeStamp();
        } else {
          presenceData.details = "Reading DMs from:";
          presenceData.state = user.textContent;
          presenceData.smallImageKey = "reading";
          presenceData.startTimestamp = getTimeStamp();
        }
      } else if (group !== null) {
        if (typing) {
          presenceData.details = "Typing in group DM: ";
          presenceData.state = group.textContent;
          presenceData.smallImageKey = "writing";
          presenceData.startTimestamp = getTimeStamp();
        } else {
          presenceData.details = "Reading groups DMs of:";
          presenceData.state = group.textContent;
          presenceData.smallImageKey = "reading";
          presenceData.startTimestamp = getTimeStamp();
        }
      }
    } else if (document.location.pathname.includes("/channels/@me")) {
      presenceData.details = "Browsing through friends";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/store")) {
      presenceData.details = "Browsing through the store";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/channels/")) {
      group = document.querySelector(
        "#app-mount > div > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > nav > div > header > h1"
      );
      typing = document.querySelector(
        "#app-mount > div > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div > main > form > div > div > div > div > div:nth-child(3) > div"
      );
      if (typing == null) {
        typing = document.querySelector(
          "#app-mount > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div > main > form > div > div > div > div > div:nth-child(3) > div"
        );
      }
      if (typing.className.toLowerCase().includes("placeholder")) {
        typing = false;
      } else {
        typing = typing.textContent !== typingicon;
      }
      card = document.querySelector(
        "#app-mount > div > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > section > div > h3"
      );
      if (typing) {
        presenceData.details = "Typing in channel: ";
        presenceData.state =
          "#" + card.textContent + " (Server: " + group.textContent + ")";
        presenceData.smallImageKey = "writing";
        presenceData.startTimestamp = getTimeStamp();
      } else {
        presenceData.details = "Reading messages in channel:";
        presenceData.state =
          "#" + card.textContent + " (Server: " + group.textContent + ")";
        presenceData.smallImageKey = "reading";
        presenceData.startTimestamp = getTimeStamp();
      }
    } else if (
      document.location.pathname.includes("/developers/applications/")
    ) {
      presenceData.details = "Developer Portal";
      presenceData.state = "Editing app: " + apptitle.textContent;
      presenceData.smallImageKey = "writing";
      presenceData.startTimestamp = getTimeStamp();
    } else if (
      document.location.pathname.includes("/developers/applications")
    ) {
      presenceData.details = "Developer Portal";
      presenceData.state = "Browsing through apps";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/developers/teams")) {
      group = document.querySelector(
        "div.label-1RJQNH.small.weightMedium-3xlxJi"
      );
      if (group !== null) {
        presenceData.details = "Developer Portal";
        presenceData.state = "Editing team: " + group.textContent;
        presenceData.smallImageKey = "writing";
        presenceData.startTimestamp = getTimeStamp();
      } else {
        presenceData.details = "Developer Portal";
        presenceData.state = "Browsing through teams";
        presenceData.startTimestamp = getTimeStamp();
      }
    } else if (document.location.pathname.includes("/developers/docs/")) {
      presenceData.details = "Developer Portal";
      presenceData.state = "Reading documentation";
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/activity")) {
      presenceData.details = "Browsing through activity";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/library")) {
      presenceData.details = "Browsing through their library";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/nitro")) {
      presenceData.details = "Browsing through";
      presenceData.state = "Discord Nitro";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/jobs")) {
      presenceData.details = "Browsing through";
      presenceData.state = "Discords Jobs page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/sell-your-game")) {
      presenceData.details = "Browsing through";
      presenceData.state = "sell-your-game page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/rich-presence")) {
      presenceData.details = "Browsing through";
      presenceData.state = "rich-presence page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/verification")) {
      presenceData.details = "Browsing through";
      presenceData.state = "verification page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/open-source")) {
      presenceData.details = "Browsing through";
      presenceData.state = "open-source page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/partners")) {
      presenceData.details = "Browsing through";
      presenceData.state = "partners page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/hypesquad")) {
      presenceData.details = "Browsing through";
      presenceData.state = "hypesquad page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/guidelines")) {
      presenceData.details = "Browsing through";
      presenceData.state = "Discords guidelines";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/security")) {
      presenceData.details = "Browsing through";
      presenceData.state = "security page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/download")) {
      presenceData.details = "Browsing through";
      presenceData.state = "download page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/branding")) {
      presenceData.details = "Browsing through";
      presenceData.state = "branding page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/terms")) {
      presenceData.details = "Browsing through";
      presenceData.state = "Terms Of Service page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/company")) {
      presenceData.details = "Browsing through";
      presenceData.state = "about page";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/invite")) {
      presenceData.details = "Viewing invite:";
      presenceData.startTimestamp = getTimeStamp();
      apptitle = document.URL.split("/")[4];
      if (apptitle.includes("?")) {
        presenceData.state = apptitle.split("?")[0];
      } else {
        presenceData.state = document.URL.split("/")[4];
      }
      presenceData.state = "COMING SOON."; // Change this when presence settings is a thing.
    }
  } else if (
    document.location.hostname == "status.discordapp.com" ||
    document.location.hostname == "status.discord.com"
  ) {
    presenceData.details = "Discord Status";
    presenceData.state = "Viewing Discords status";
    presenceData.smallImageKey = "reading";
    presenceData.startTimestamp = getTimeStamp();
  } else if (
    document.location.hostname == "support.discordapp.com" ||
    document.location.hostname == "support.discord.com"
  ) {
    if (document.location.pathname.includes("/topics/")) {
      group = document.querySelector(
        "body > main > div.container > header > h1"
      );
      presenceData.details = "Discord Support";
      presenceData.state = "Browsing Topic: " + group.textContent;
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/topics")) {
      presenceData.details = "Discord Support";
      presenceData.state = "Browsing through topics";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/search")) {
      group = document.querySelector(
        "body > main > div.container > header > p"
      );
      user = group.textContent.split(" ", 5);
      presenceData.details = "Discord Support";
      presenceData.state = "Searching for: " + user[3];
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/articles")) {
      group = document.querySelector(
        "#article-container > article > header > h1"
      );
      presenceData.details = "Discord Support";
      presenceData.state = "Reading article: " + group.textContent;
      presenceData.smallImageKey = "reading";
      presenceData.startTimestamp = getTimeStamp();
    }
  } else if (
    document.location.hostname == "blog.discordapp.com" ||
    document.location.hostname == "blog.discord.com"
  ) {
    if (document.location.pathname.includes("/@")) {
      group = document.location.pathname.split("@", 2);
      presenceData.details = "Discord Blog";
      presenceData.state = "Viewing profile: " + group[1];
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/tagged")) {
      group = document.location.pathname.split("/", 8);
      presenceData.details = "Discord Blog";
      presenceData.state = "Browsing tag: " + group[2];
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/archive")) {
      group = document.location.pathname.split("/", 8);
      presenceData.details = "Discord Blog";
      presenceData.state = "Browsing the archive";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.includes("/")) {
      group = document.querySelector(
        "#root > div > article > div > section > div > div > div > h1"
      );
      if (group !== null) {
        presenceData.details = "Discord Blog";
        presenceData.state = "Reading: " + group.textContent;
        presenceData.smallImageKey = "reading";
        presenceData.startTimestamp = getTimeStamp();
      } else {
        presenceData.details = "Discord Blog";
        presenceData.startTimestamp = getTimeStamp();
      }
    }
  } else if (
    document.location.hostname == "merch.discordapp.com" ||
    document.location.hostname == "merch.discord.com"
  ) {
    presenceData.details = "Discord Merch";
    presenceData.state = "Looking at merch";
    presenceData.startTimestamp = getTimeStamp();
  } else if (document.location.hostname == "discord.gg") {
    presenceData.details = "Viewing an invite";
    presenceData.startTimestamp = getTimeStamp();
  } else if (document.location.hostname == "discordmerch.com") {
    if (document.location.pathname == "/") {
      presenceData.details = "Browsing the homepage of the merch store";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.split("/")[1] == "collections") {
      if (document.location.pathname.split("/")[2] == "all") {
        if (document.location.pathname.split("/")[3] == "products") {
          presenceData.details = "Viewing a merch product";
          presenceData.state = document.getElementsByClassName(
            "product-single__title"
          )[0].textContent;
          presenceData.startTimestamp = getTimeStamp();
        } else {
          presenceData.details = "Browsing all merch products";
          presenceData.startTimestamp = getTimeStamp();
        }
      } else if (document.location.pathname.split("/")[2] == "cool-kids") {
        if (document.location.pathname.split("/")[3] == "products") {
          presenceData.details = "Viewing a merch product";
          presenceData.state = document.getElementsByClassName(
            "product-single__title"
          )[0].textContent;
          presenceData.startTimestamp = getTimeStamp();
        } else {
          presenceData.details = "Viewing the Dark Theme merch collection";
          presenceData.startTimestamp = getTimeStamp();
        }
      } else if (
        document.location.pathname.split("/")[2] == "snowsgiving-2020"
      ) {
        if (document.location.pathname.split("/")[3] == "products") {
          presenceData.details = "Viewing a merch product";
          presenceData.state = document.getElementsByClassName(
            "product-single__title"
          )[0].textContent;
          presenceData.startTimestamp = getTimeStamp();
        } else {
          presenceData.details = "Viewing the snowsgiving merch collection";
          presenceData.startTimestamp = getTimeStamp();
        }
      } else {
        presenceData.details = "Browsing the merch catalog";
        presenceData.startTimestamp = getTimeStamp();
      }
    } else if (document.location.pathname.split("/")[1] == "products") {
      if (document.location.pathname.split("/")[2]) {
        presenceData.details = "Viewing a merch product";
        presenceData.state = document.getElementsByClassName(
          "product-single__title"
        )[0].textContent;
        presenceData.startTimestamp = getTimeStamp();
      } else {
        presenceData.details = "Browsing the merch catalog";
        presenceData.startTimestamp = getTimeStamp();
      }
    } else if (document.location.pathname.split("/")[1] == "cart") {
      presenceData.details = "Viewing their cart in the merch store";
      presenceData.startTimestamp = getTimeStamp();
    } else if (document.location.pathname.split("/")[1] == "pages") {
      if (document.location.pathname.split("/")[2] == "contact") {
        presenceData.details = "Viewing the contact us page in the merch store";
        presenceData.startTimestamp = getTimeStamp();
      } else if (document.location.pathname.split("/")[2] == "faq") {
        presenceData.details = "Reading the FAQ in the merch store";
        presenceData.startTimestamp = getTimeStamp();
      }
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
    lastData = presenceData.details;
  } else {
    presence.setActivity(presenceData);
    lastData = null;
  }
});
