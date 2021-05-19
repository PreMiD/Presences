const presence = new Presence({
  clientId: "843791837273391104"
}), browsingStamp = Math.floor(Date.now() / 1000); 

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "discords_logo",
    startTimestamp: browsingStamp
  }; 

    if (document.location.pathname === "/") {
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname === "/servers/search") {
      const page = document.querySelector("li.page-item.active")?.textContent,
      search = document.querySelector("h1.text-center")?.textContent.replace("Discord Servers", " ");
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
      tag = document.querySelector("h1.text-center")?.textContent.replace("Discord Servers", " ");
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
      tag = document.querySelector("h1.text-center")?.textContent.replace("Discord Servers", " ");
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
    } else if (document.location.pathname.includes("/servers/")) {
      const join = document.querySelectorAll("a.btn")[1]?.getAttribute("href"),
      upvote = document.querySelectorAll("a.btn")[2]?.getAttribute("href"),
      membersonline = document.querySelectorAll("span.mr-2")[0]?.textContent.replace(`${document.querySelectorAll("span.mr-2")[0]?.textContent}`, `${"👥" + document.querySelectorAll("span.mr-2")[0]?.textContent}`),
      members = document.querySelectorAll("span.mr-2")[1]?.textContent.replace(`${document.querySelectorAll("span.mr-2")[1]?.textContent}`, `${"🎁" + document.querySelectorAll("span.mr-2")[1]?.textContent}`),
      boosts = document.querySelectorAll("span.mr-2")[2]?.textContent.replace(`${document.querySelectorAll("span.mr-2")[2]?.textContent}`, `${"💎" + document.querySelectorAll("span.mr-2")[2]?.textContent}`),
      server = document.querySelector("h1.servernameh1")?.textContent.replace("PREMIUM", " ");
      presenceData.details = `Viewing 🎨 ${server}`;
      presenceData.state = `${membersonline || "No members online"}, ${members || "No members"}, ${boosts || "No boosts"}`;
      presenceData.buttons = [
        {
          label: "Join",
          url: `https://discords.com${join}`
        },
        {
          label: "Upvote",
          url: `https://discords.com${upvote}`
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
      emoji_search = document.querySelector("h2.EmoList_heading1__3KEr_")?.textContent.replace("Emoji List", " ");
      presenceData.details = `🔍 Searching for emoji: ${emoji_search || "Nothing"}`;
      presenceData.state = `📖 Page ${page}`;
      presenceData.buttons = [
        {
          label: "View Results",
          url: document.location.href
        }
      ];
    } else if (document.location.pathname.includes("/emoji-list/tag/")) {
      const page = document.querySelector("li.page-item.active")?.textContent,
      emoji_tag = document.querySelector("h2.EmoList_heading1__3KEr_")?.textContent.replace("Emoji List", " ");
      presenceData.details = `Viewing 📛 ${emoji_tag || "Nothing"} emoji tag`;
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
          label: "View TOS",
          url: document.location.href
        }
      ];
    }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});