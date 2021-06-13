interface LangStrings {
  browse: string;
  writing: string;
  reading: string;
  channelReading: string;
  channelTyping: string;
  dmReading: string;
  dmTyping: string;
  dmGroupReading: string;
  dmGroupTyping: string;
  friends: string;
  nitro: string;
  voiceConnectedWith: string;
  voiceConnectedTo: string;
  inCall: string;
  calling: string;
  settings: string;
  serverSettings: string;
  invite: string;
  inviteServer: string;
  buttonInvite: string;
  browseThrough: string;
  download: string;
  why: string;
  safety: string;
  jobs: string;
  company: string;
  branding: string;
  inspiration: string;
  college: string;
  newsroom: string;
  partner: string;
  verification: string;
  streamkit: string;
  opensource: string;
  security: string;
  moderation: string;
  rpc: string;
  policies: string;
  portal: string;
  appsBrowse: string;
  appsEdit: string;
  teamsBrowse: string;
  teamsEdit: string;
  serversBrowse: string;
  serversEdit: string;
  docs: string;
  status: string;
  viewing: string;
  uptime: string;
  incident: string;
  incidentView: string;
  helpCenter: string;
  viewCategory: string;
  searchFor: string;
  searching: string;
  readingArticle: string;
  blog: string;
  merch: string;
  product: string;
  collection: string;
  viewPage: string;
  shopCart: string;
}

const presence = new Presence({
    clientId: "616940877042155531"
  }),
  getStrings = async (): Promise<LangStrings> => {
    return presence.getStrings(
      {
        browse: "general.browsing",
        writing: "general.writing",
        reading: "general.reading",
        channelReading: "discord.channelReading",
        channelTyping: "discord.channelTyping",
        dmReading: "discord.dmReading",
        dmTyping: "discord.dmTyping",
        dmGroupReading: "discord.dmGroupReading",
        dmGroupTyping: "discord.dmGroupTyping",
        friends: "discord.friends",
        nitro: "discord.nitro",
        voiceConnectedWith: "discord.voiceConnectedWith",
        voiceConnectedTo: "discord.voiceConnectedTo",
        inCall: "general.inCall",
        calling: "general.calling",
        settings: "discord.settings",
        serverSettings: "discord.serverSettings",
        invite: "discord.invite",
        inviteServer: "discord.inviteServer",
        buttonInvite: "discord.buttonInvite",
        browseThrough: "discord.browseThrough",
        download: "discord.download",
        why: "discord.why",
        safety: "discord.safety",
        jobs: "discord.jobs",
        company: "discord.company",
        branding: "discord.branding",
        inspiration: "discord.inspiration",
        college: "discord.college",
        newsroom: "discord.newsroom",
        partner: "discord.partner",
        verification: "discord.verification",
        streamkit: "discord.streamkit",
        opensource: "discord.opensource",
        security: "discord.security",
        moderation: "discord.moderation",
        rpc: "discord.rpc",
        policies: "discord.policies",
        portal: "discord.devs.portal",
        appsBrowse: "discord.devs.appsBrowse",
        appsEdit: "discord.devs.appsEdit",
        teamsBrowse: "discord.devs.teamsBrowse",
        teamsEdit: "discord.devs.teamsEdit",
        serversBrowse: "discord.devs.serversBrowse",
        serversEdit: "discord.devs.serversEdit",
        docs: "discord.devs.docs",
        status: "discord.status",
        viewing: "general.viewing",
        uptime: "general.uptimeHistory",
        incident: "general.incidentHistory",
        incidentView: "general.incidentView",
        helpCenter: "discord.support",
        viewCategory: "general.viewCategory",
        searchFor: "general.searchFor",
        searching: "general.search",
        readingArticle: "general.readingArticle",
        blog: "discord.blog",
        merch: "discord.merch",
        product: "general.viewProduct",
        collection: "discord.merch.collection",
        viewPage: "general.viewPage",
        shopCart: "general.shopCart"
      },
      await presence.getSetting("lang").catch(() => "en")
    );
  };

let browsingStamp = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href,
  strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const showBrowsing: boolean = await presence.getSetting("browse"),
    showTimestamp: boolean = await presence.getSetting("timestamp"),
    showButtons: boolean = await presence.getSetting("buttons"),
    showInvites: boolean = await presence.getSetting("invite"),
    privacy: boolean = await presence.getSetting("privacy"),
    showCalls: boolean = await presence.getSetting("call"),
    newLang: string = await presence.getSetting("lang").catch(() => "en"),
    logo: number = await presence.getSetting("logo"),
    logoArr = ["discordwhite", "discord", "discordblack"];

  let presenceData: PresenceData = {
    largeImageKey: logoArr[logo] || "discordwhite"
  };

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    browsingStamp = Math.floor(Date.now() / 1000);
  }

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (document.location.hostname === "discord.com") {
    const path = location.href
        .replace(/\/?$/, "/")
        .replace("https://" + document.location.hostname, "")
        .replace("?", "/")
        .replace("=", "/"),
      voiceConnected = Array.from(document.querySelectorAll("div")).find((c) =>
        c.className?.includes("rtcConnectionStatus")
      )
        ? true
        : false,
      settingsOpened = Array.from(
        document.querySelectorAll("div[aria-controls]")
      ).find((c) =>
        Object.values(c.attributes).find((a) => a.value === "My Account-tab")
      )
        ? true
        : false,
      serverSettingsOpened = Array.from(
        document.querySelectorAll("div[aria-controls]")
      ).find((c) =>
        Object.values(c.attributes).find((a) => a.value === "OVERVIEW-tab")
      )
        ? true
        : false,
      dmsTyping =
        Array.from(document.querySelectorAll("div[contenteditable=true]")).find(
          (c) =>
            Object.values(c.attributes).find((a) =>
              a.value?.includes(document.querySelector("h3")?.textContent)
            )
        )?.parentElement.children.length === 1
          ? true
          : false,
      groupDm = document.querySelector("input[name=channel_name]")
        ? true
        : false,
      dmsUserGroupName = groupDm
        ? (
            document.querySelector(
              "input[name=channel_name]"
            ) as HTMLInputElement
          )?.value || "Undefined"
        : `@${document.querySelector("h3")?.textContent || "Undefined"}`,
      serverTyping =
        Array.from(document.querySelectorAll("div[contenteditable=true]")).find(
          (c) =>
            c.attributes[0].value?.includes(
              Array.from(document.querySelectorAll("h3")).find((c) =>
                c.className?.includes("title")
              )?.textContent
            )
        )?.parentElement.children.length === 1
          ? true
          : false,
      serverChannel = `#${
        Array.from(document.querySelectorAll("h3")).find((c) =>
          c.className?.includes("title")
        )?.textContent || "Undefined"
      }`,
      serverServerName =
        Array.from(document.querySelectorAll("h1")).find((c) =>
          c.className?.includes("name")
        )?.textContent || "Undefined",
      statics: {
        [name: string]: PresenceData;
      } = {
        "/": {
          details: (await strings).browse
        },
        "/channels/(\\d*)/(\\d*)/": {
          details: serverTyping
            ? (await strings).channelTyping
                .split("{0}")[0]
                .replace("{1}", serverChannel)
                .replace("{2}", serverServerName)
            : (await strings).channelReading
                .split("{0}")[0]
                .replace("{1}", serverChannel)
                .replace("{2}", serverServerName),
          state: serverTyping
            ? (await strings).channelTyping
                .split("{0}")[1]
                ?.replace("{1}", serverChannel)
                .replace("{2}", serverServerName)
            : (await strings).channelReading
                .split("{0}")[1]
                ?.replace("{1}", serverChannel)
                .replace("{2}", serverServerName),
          smallImageKey: serverTyping ? "writing" : "reading",
          smallImageText: serverTyping
            ? (await strings).writing
            : (await strings).reading
        },
        "/channels/@me/": {
          details: (await strings).friends
        },
        "/channels/@me/(\\d*)/": {
          details: dmsTyping
            ? groupDm
              ? (await strings).dmGroupTyping
                  .split("{0}")[0]
                  .replace("{1}", dmsUserGroupName)
              : (await strings).dmTyping
                  .split("{0}")[0]
                  .replace("{1}", dmsUserGroupName)
            : groupDm
            ? (await strings).dmGroupReading
                .split("{0}")[0]
                .replace("{1}", dmsUserGroupName)
            : (await strings).dmReading
                .split("{0}")[0]
                .replace("{1}", dmsUserGroupName),
          state: dmsTyping
            ? groupDm
              ? (await strings).dmGroupTyping
                  .split("{0}")[1]
                  ?.replace("{1}", dmsUserGroupName)
              : (await strings).dmTyping
                  .split("{0}")[1]
                  ?.replace("{1}", dmsUserGroupName)
            : groupDm
            ? (await strings).dmGroupReading
                .split("{0}")[1]
                ?.replace("{1}", dmsUserGroupName)
            : (await strings).dmReading
                .split("{0}")[1]
                ?.replace("{1}", dmsUserGroupName),
          smallImageKey: dmsTyping ? "writing" : "reading",
          smallImageText: dmsTyping
            ? (await strings).writing
            : (await strings).reading
        },
        "/invite/(\\w*\\d*)/": {
          details: showInvites
            ? (await strings).invite
                .split("{0}")[0]
                .replace("{1}", document.URL.split("/")[4])
                .replace("{2}", document.title)
            : (await strings).inviteServer
                .split("{0}")[0]
                .replace("{1}", document.title),
          state: showInvites
            ? (await strings).invite
                .split("{0}")[1]
                ?.replace("{1}", document.URL.split("/")[4])
                .replace("{2}", document.title)
            : (await strings).inviteServer
                .split("{0}")[1]
                ?.replace("{1}", document.title),
          smallImageKey: "reading",
          buttons: showInvites
            ? [
                {
                  label: (await strings).buttonInvite,
                  url: document.URL
                }
              ]
            : []
        },
        "/store/": {
          details: (await strings).nitro
        },
        "/nitro/": {
          details: (await strings).nitro
        },
        "/download/": {
          details: (await strings).browseThrough,
          state: (await strings).download
        },
        "/why-discord-is-different/": {
          details: (await strings).browseThrough,
          state: (await strings).why
        },
        "/safety/": {
          details: (await strings).browseThrough,
          state: (await strings).safety
        },
        "/jobs/": {
          details: (await strings).browseThrough,
          state: (await strings).jobs
        },
        "/company/": {
          details: (await strings).browseThrough,
          state: (await strings).company
        },
        "/branding/": {
          details: (await strings).browseThrough,
          state: (await strings).branding
        },
        "/inspiration/": {
          details: (await strings).browseThrough,
          state: (await strings).inspiration
        },
        "/college/": {
          details: (await strings).browseThrough,
          state: (await strings).college
        },
        "/newsroom/": {
          details: (await strings).browseThrough,
          state: (await strings).newsroom
        },
        "/partners/": {
          details: (await strings).browseThrough,
          state: (await strings).partner
        },
        "/verification/": {
          details: (await strings).browseThrough,
          state: (await strings).verification
        },
        "/streamkit/": {
          details: (await strings).browseThrough,
          state: (await strings).streamkit
        },
        "/open-source/": {
          details: (await strings).browseThrough,
          state: (await strings).opensource
        },
        "/security/": {
          details: (await strings).browseThrough,
          state: (await strings).security
        },
        "/moderation/": {
          details: (await strings).browseThrough,
          state: (await strings).moderation
        },
        "/rich-presence/": {
          details: (await strings).browseThrough,
          state: (await strings).rpc
        },
        "/terms/": {
          details: (await strings).browseThrough,
          state: (await strings).policies
        },
        "/privacy/": {
          details: (await strings).browseThrough,
          state: (await strings).policies
        },
        "/guidelines/": {
          details: (await strings).browseThrough,
          state: (await strings).policies
        },
        "/acknowledgements/": {
          details: (await strings).browseThrough,
          state: (await strings).policies
        },
        "/licenses/": {
          details: (await strings).browseThrough,
          state: (await strings).policies
        },
        "/developers/applications/": {
          details: (await strings).portal,
          state: (await strings).appsBrowse
        },
        "/developers/applications/(\\d*)/": {
          details: (await strings).portal,
          state: (await strings).appsEdit.replace(
            "{0}",
            Array.from(document.querySelectorAll("div")).find((c) =>
              c.className?.includes("appDetails")
            )?.textContent
          ),
          smallImageKey: "writing"
        },
        "/developers/teams/": {
          details: (await strings).portal,
          state: (await strings).teamsBrowse
        },
        "/developers/teams/(\\d*)/": {
          details: (await strings).portal,
          state: (await strings).teamsEdit.replace(
            "{0}",
            document.querySelector("div.Select-value")?.textContent
          ),
          smallImageKey: "writing"
        },
        "/developers/servers/": {
          details: (await strings).portal,
          state: (await strings).serversBrowse
        },
        "/developers/servers/(\\d*)/": {
          details: (await strings).portal,
          state: (await strings).serversEdit.replace(
            "{0}",
            Array.from(document.querySelectorAll("div")).find((c) =>
              c.className.includes("itemName")
            )?.textContent
          ),
          smallImageKey: "reading"
        },
        "/developers/docs/": {
          details: (await strings).portal,
          state: (await strings).docs,
          smallImageKey: "reading",
          smallImageText: (await strings).reading
        }
      };

    if (showCalls && voiceConnected) {
      if (privacy) {
        presenceData.details = (await strings).inCall;
        presenceData.smallImageKey = "call";
        presenceData.smallImageText = (await strings).calling;
      } else {
        const connectedTo = Array.from(
            Array.from(document.querySelectorAll("div"))
              .find((c) => c.className?.includes("rtcConnectionStatus"))
              ?.parentElement.querySelector("a")?.children || []
          ).find((c) => c.className?.includes("channel")),
          connectedToDm = (
            connectedTo?.parentElement as HTMLLinkElement
          )?.href.includes("/@me/")
            ? true
            : false;

        if (!connectedTo) {
          return presence.error(
            "An error occurred while stripping data off the page. Please contact Bas950 on the PreMiD Discord support server (https://discord.premid.app/), and send him a screenshot of this error. ID: connectedTo === undefined/null"
          );
        }

        presenceData.details = connectedToDm
          ? (await strings).voiceConnectedWith
              .split("{0}")[0]
              .replace("{1}", connectedTo.textContent)
          : (await strings).voiceConnectedTo
              .split("{0}")[0]
              .replace(
                "{1}",
                connectedTo.textContent.replace(
                  ` / ${connectedTo.textContent.split(" / ").pop()}`,
                  ""
                )
              )
              .replace("{2}", connectedTo.textContent.split(" / ").pop());
        presenceData.state = connectedToDm
          ? (await strings).voiceConnectedWith
              .split("{0}")[1]
              ?.replace("{1}", connectedTo.textContent)
          : (await strings).voiceConnectedTo
              .split("{0}")[1]
              ?.replace(
                "{1}",
                connectedTo.textContent.replace(
                  ` / ${connectedTo.textContent.split(" / ").pop()}`,
                  ""
                )
              )
              .replace("{2}", connectedTo.textContent.split(" / ").pop());
        presenceData.smallImageKey = "call";
        presenceData.smallImageText = (await strings).calling;
      }
      //* Normal browsing status
    } else if (showBrowsing) {
      if (privacy) {
        presenceData.details = (await strings).browse;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).browse;
      } else {
        if (settingsOpened) {
          presenceData.details = (await strings).settings;
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
        } else if (serverSettingsOpened) {
          const server =
            Array.from(document.querySelectorAll("h1")).find((c) =>
              c.className?.includes("name")
            )?.textContent || "Undefined";
          presenceData.details = (await strings).serverSettings
            .split("{0}")[0]
            .replace("{1}", server);
          presenceData.state = (await strings).serverSettings
            .split("{0}")[1]
            ?.replace("{1}", server);
          presenceData.smallImageKey = "reading";
          presenceData.smallImageText = (await strings).browse;
        } else {
          for (const [k, v] of Object.entries(statics)) {
            if (path.match(k)) {
              presenceData = { ...presenceData, ...v };
              if (!presenceData.smallImageKey) {
                presenceData.smallImageKey = "reading";
                presenceData.smallImageText = (await strings).browse;
              }
            }
          }
        }
      }
    }
  } else if (document.location.hostname === "discordstatus.com") {
    const path = location.href
        .replace(/\/?$/, "/")
        .replace("https://" + document.location.hostname, "")
        .replace("?", "/")
        .replace("=", "/"),
      statics: {
        [name: string]: PresenceData;
      } = {
        "/": {
          details: (await strings).status,
          state: (await strings).browse
        },
        "/uptime/": {
          details: (await strings).status,
          state: (await strings).viewing + " " + (await strings).uptime
        },
        "/history/": {
          details: (await strings).status,
          state: (await strings).viewing + " " + (await strings).incident
        },
        "/incidents/": {
          details: (await strings).status,
          state: (await strings).incidentView
        }
      };
    if (showBrowsing) {
      if (privacy) {
        presenceData.details = (await strings).status;
        presenceData.state = (await strings).browse;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).browse;
      } else {
        for (const [k, v] of Object.entries(statics)) {
          if (path.match(k)) {
            presenceData = { ...presenceData, ...v };
            if (!presenceData.smallImageKey) {
              presenceData.smallImageKey = "reading";
              presenceData.smallImageText = (await strings).browse;
            }
          }
        }
      }
    }
  } else if (document.location.hostname === "support.discord.com") {
    const path = location.href
        .replace(/\/?$/, "/")
        .replace("https://" + document.location.hostname, "")
        .replace("?", "/")
        .replace("=", "/"),
      statics: {
        [name: string]: PresenceData;
      } = {
        "/": {
          details: (await strings).helpCenter,
          state: (await strings).browse
        },
        "/categories/": {
          details: (await strings).helpCenter,
          state:
            (await strings).viewCategory +
            " " +
            document.querySelector("h1")?.textContent
        },
        "/search/": {
          details: (await strings).helpCenter,
          state:
            (await strings).searchFor +
            " " +
            (document.querySelector("#query") as HTMLInputElement)?.value,
          smallImageKey: "search",
          smallImageText: (await strings).searching
        },
        "/articles/": {
          details: (await strings).helpCenter,
          state:
            (await strings).readingArticle +
            " " +
            document.querySelector("h1")?.textContent.trim(),
          smallImageKey: "reading",
          smallImageText: (await strings).reading
        }
      };
    if (showBrowsing) {
      if (privacy) {
        presenceData.details = (await strings).helpCenter;
        presenceData.state = (await strings).browse;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).browse;
      } else {
        for (const [k, v] of Object.entries(statics)) {
          if (path.match(k)) {
            presenceData = { ...presenceData, ...v };
            if (!presenceData.smallImageKey) {
              presenceData.smallImageKey = "reading";
              presenceData.smallImageText = (await strings).browse;
            }
          }
        }
      }
    }
  } else if (document.location.hostname === "blog.discord.com") {
    const path = location.href
        .replace(/\/?$/, "/")
        .replace("https://" + document.location.hostname, "")
        .replace("?", "/")
        .replace("=", "/"),
      statics: {
        [name: string]: PresenceData;
      } = {
        "/": {
          details: (await strings).blog,
          state:
            document.querySelector("h1")?.textContent !== "Discord Blog"
              ? (await strings).readingArticle +
                " " +
                document.querySelector("h1").textContent
              : (await strings).browse
        },
        "/product-posts/": {
          details: (await strings).blog,
          state: (await strings).viewCategory + " Product posts"
        },
        "/company-posts/": {
          details: (await strings).blog,
          state: (await strings).viewCategory + " Company posts"
        },
        "/education-posts/": {
          details: (await strings).blog,
          state: (await strings).viewCategory + " Education posts"
        },
        "/community-posts/": {
          details: (await strings).blog,
          state: (await strings).viewCategory + " Community posts"
        },
        "/engineering-posts/": {
          details: (await strings).blog,
          state: (await strings).viewCategory + " Engineering posts"
        }
      };
    if (showBrowsing) {
      if (privacy) {
        presenceData.details = (await strings).blog;
        presenceData.state = (await strings).browse;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).browse;
      } else {
        for (const [k, v] of Object.entries(statics)) {
          if (path.match(k)) {
            presenceData = { ...presenceData, ...v };
            if (!presenceData.smallImageKey) {
              presenceData.smallImageKey = "reading";
              presenceData.smallImageText = (await strings).browse;
            }
          }
        }
      }
    }
  } else if (document.location.hostname === "discordmerch.com") {
    const path = location.href
        .replace(/\/?$/, "/")
        .replace("https://" + document.location.hostname, "")
        .replace("?", "/")
        .replace("=", "/"),
      statics: {
        [name: string]: PresenceData;
      } = {
        "/": {
          details: (await strings).merch,
          state: (await strings).browse
        },
        "/products/": {
          details: (await strings).merch,
          state:
            (await strings).product +
            " " +
            document.querySelector("h1")?.textContent
        },
        "/collections/": {
          details: (await strings).merch,
          state:
            (await strings).collection +
            " " +
            document.querySelector("h1")?.textContent
        },
        "/pages/": {
          details: (await strings).merch,
          state:
            (await strings).viewPage +
            " " +
            document.querySelector("h1")?.textContent
        },
        "/cart/": {
          details: (await strings).merch,
          state: (await strings).viewing + " " + (await strings).shopCart
        },
        "/search/": {
          details: (await strings).merch,
          state:
            (await strings).searchFor +
            " " +
            (document.querySelector("input") as HTMLInputElement)?.value,
          smallImageKey: "search",
          smallImageText: (await strings).searching
        }
      };
    if (showBrowsing) {
      if (privacy) {
        presenceData.details = (await strings).status;
        presenceData.state = (await strings).browse;
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = (await strings).browse;
      } else {
        for (const [k, v] of Object.entries(statics)) {
          if (path.match(k)) {
            presenceData = { ...presenceData, ...v };
            if (!presenceData.smallImageKey) {
              presenceData.smallImageKey = "reading";
              presenceData.smallImageText = (await strings).browse;
            }
          }
        }
      }
    }
  }

  if (!presenceData.buttons?.length) delete presenceData.buttons;
  if (!showButtons) delete presenceData.buttons;
  if (showTimestamp) presenceData.startTimestamp = browsingStamp;

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
