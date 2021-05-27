const presence = new Presence({
    clientId: "843791837273391104"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const showTimestamp: boolean = await presence.getSetting("timestamp"),
    showButtons: boolean = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "discords_logo"
    };

  if (document.location.pathname === "/") {
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname === "/servers/search") {
    const page = document.querySelector("li.page-item.active")?.textContent,
      search = document
        .querySelector("h1.text-center")
        ?.textContent.replace("Discord Servers", " ");
    presenceData.details = `🔍 Searching for: ${search || "Nothing"}`;
    presenceData.state = `📖 Page ${page}`;
    presenceData.buttons = [
      {
        label: "View Results",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/servers/tag/")) {
    const page = document.querySelector("li.page-item.active")?.textContent,
      tag = document
        .querySelector("h1.text-center")
        ?.textContent.replace("Discord Servers", " ");
    presenceData.details = `Viewing 📛 ${tag || "Nothing"} tag`;
    presenceData.state = `📖 Page ${page}`;
    presenceData.buttons = [
      {
        label: "View Tag",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/servers/tags/")) {
    const page = document.querySelector("li.page-item.active")?.textContent,
      tag = document
        .querySelector("h1.text-center")
        ?.textContent.replace("Discord Servers", " ");
    presenceData.details = `Viewing 🔑 ${tag || "Nothing"} keyword`;
    presenceData.state = `📖 Page ${page}`;
    presenceData.buttons = [
      {
        label: "View Keyword",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname === "/servers/top-100") {
    const page = document.querySelector("li.page-item.active")?.textContent;
    presenceData.details = "Viewing 🏅 top-100 servers";
    presenceData.state = `📖 Page ${page}`;
    presenceData.buttons = [
      {
        label: "View Top-100",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/join")) {
    const server_name_join = document.querySelector("h2.mt-4")?.textContent;
    presenceData.details = `Looking at 🚦 ${
      server_name_join || "N/A"
    }'s join page`;
    if (server_name_join) {
      presenceData.buttons = [
        {
          label: `Join ${server_name_join}`,
          url: document.location.href
        }
      ];
    }
  } else if (document.location.pathname.includes("/upvote")) {
    const server_name_upvote = document.querySelector(
      "h1.JoinUpvote_clickable-server-name__3l6Es"
    )?.textContent;
    presenceData.details = `Upvoting 🗳️ ${server_name_upvote || "N/A"} `;
    if (server_name_upvote) {
      presenceData.buttons = [
        {
          label: `Upvote ${server_name_upvote}`,
          url: document.location.href
        }
      ];
    }
  } else if (document.location.pathname.includes("/servers/")) {
    const membersonline = document
        .querySelectorAll("span.mr-2")[0]
        ?.textContent.replace(
          `${document.querySelectorAll("span.mr-2")[0]?.textContent}`,
          `${"👥" + document.querySelectorAll("span.mr-2")[0]?.textContent}`
        ),
      members = document
        .querySelectorAll("span.mr-2")[1]
        ?.textContent.replace(
          `${document.querySelectorAll("span.mr-2")[1]?.textContent}`,
          `${"🎁" + document.querySelectorAll("span.mr-2")[1]?.textContent}`
        ),
      boosts = document
        .querySelectorAll("span.mr-2")[2]
        ?.textContent.replace(
          `${document.querySelectorAll("span.mr-2")[2]?.textContent}`,
          `${"💎" + document.querySelectorAll("span.mr-2")[2]?.textContent}`
        ),
      server = document
        .querySelector("h1.servernameh1")
        ?.textContent.replace("PREMIUM", " ");
    presenceData.details = `Viewing 🎨 ${server}`;
    presenceData.state = `${membersonline || "0 members online"}, ${
      members || "0 members"
    }, ${boosts || "0 boosts"}`;
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/about")) {
    presenceData.details = "Viewing 🎫 about page";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/payment")) {
    presenceData.details = "Purchasing 💳 premium";
    presenceData.buttons = [
      {
        label: "Purchase Premium",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname === "/premium/") {
    presenceData.details = "Viewing 💎 premium plans";
    presenceData.buttons = [
      {
        label: "View Premium",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/partners")) {
    presenceData.details = "Viewing 🤝 partners";
    presenceData.buttons = [
      {
        label: "View Partners",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname === "/u/dashboard") {
    presenceData.details = "Viewing 👤 dashboard";
  } else if (document.location.pathname === "/emoji-list") {
    presenceData.details = "Viewing 😃 Emoji list";
    presenceData.buttons = [
      {
        label: "View Emojis",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname === "/emoji-list/search") {
    const page = document.querySelector("li.page-item.active")?.textContent,
      emoji_search = document
        .querySelector("h2.EmoList_heading1__3KEr_")
        ?.textContent.replace("Emoji List", " ");
    presenceData.details = `🔍 Searching for emoji: ${emoji_search || "N/A"}`;
    presenceData.state = `📖 Page ${page}`;
    presenceData.buttons = [
      {
        label: "View Results",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/emoji-list/tag/")) {
    const page = document.querySelector("li.page-item.active")?.textContent,
      emoji_tag = document
        .querySelector("h2.EmoList_heading1__3KEr_")
        ?.textContent.replace("Emoji List", " ");
    presenceData.details = `Looking at 📛 ${emoji_tag || "N/A"} emoji tag`;
    presenceData.state = `📖 Page ${page}`;
    presenceData.buttons = [
      {
        label: "View Emoji Tag",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/termsofservice")) {
    presenceData.details = "Viewing 👩‍⚖️ Terms of Service";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  }
  if (!showButtons) delete presenceData.buttons;
  if (showTimestamp) presenceData.startTimestamp = browsingStamp;

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
