const presence = new Presence({
    clientId: "846309777508007946"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const showTimestamp: boolean = await presence.getSetting("timestamp"),
    showButtons: boolean = await presence.getSetting("buttons"),
    showCvButton: boolean = await presence.getSetting("cvButton"),
    presenceData: PresenceData = {
      largeImageKey: "dscjobs_logo"
    };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing home page";
  else if (document.location.pathname.includes("/search")) {
    const search = document.location.href.split("term=")[1].split("&")[0],
      page = document.location.href.split("page=")[1].split("&")[0];
    presenceData.details = `🔍 Searching for: ${search || "Nothing"}`;
    presenceData.state = `📖 Page ${page}`;
  } else if (document.location.pathname === "/moderators") {
    const moderator_page = document.location.href
        .split("page=")[1]
        .split("&")[0],
      filters = document.location.href.includes("&");
    presenceData.details = `Viewing 🔨 hireable moderators`;
    presenceData.state = `${
      filters ? "💿 Filters: True" : `📖 Page ${moderator_page}`
    }`;
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/premium")) {
    presenceData.details = "Viewing 💎 premium plan";
    presenceData.buttons = [
      {
        label: "View Premium Plan",
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
  } else if (document.location.pathname.includes("/profile"))
    presenceData.details = "Viewing 👤 profile";
  else if (document.location.pathname.includes("/u/")) {
    const username = document.querySelector("h1")?.textContent.split("#")[0];
    presenceData.details = `Viewing 💳 ${username} profile`;
  } else if (document.location.pathname.includes("/vote")) {
    const username_vote = document.querySelector("h1")?.textContent;
    presenceData.details = `Voting 🗳️ ${username_vote || "N/A"} `;
    if (username_vote)
      presenceData.buttons = [
        {
          label: `Vote ${username_vote}`,
          url: document.location.href
        }
      ];
  } else if (document.location.pathname.includes("/cv/")) {
    const cv_page = document
        .querySelector("h2.cursor")
        ?.getAttribute("data-title"),
      likes = document
        .getElementById("likes_amount")
        ?.getAttribute("data-title"),
      views = document
        .getElementById("views_amount")
        ?.getAttribute("data-title");
    presenceData.details = `Viewing 📖 ${cv_page} resume`;
    presenceData.state = `❤️ ${likes} & 👀 ${views}`;
    if (showButtons) {
      if (showCvButton)
        presenceData.buttons = [
          {
            label: `View Resume`,
            url: document.location.href
          }
        ];
    }
  } else if (document.location.pathname.includes("/settings"))
    presenceData.details = `Editing 📜 curriculum vitae/resume`;
  else if (document.location.pathname.includes("/legal")) {
    presenceData.details = "Viewing 👩‍⚖️ Legal Page";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
    // staff panel
  } else if (document.location.pathname.includes("/reviews")) {
    const review_page = document.location.href.split("page=")[1];
    presenceData.details = "Viewing ⭐ Review Panel";
    presenceData.state = `📖 Page ${review_page}`;
  } else if (document.location.pathname.includes("/reports")) {
    const report_page = document.location.href.split("page=")[1];
    presenceData.details = "Viewing 🛑 Report Panel";
    presenceData.state = `📖 Page ${report_page}`;
  } else if (document.location.pathname.includes("/users")) {
    const users_page = document.location.href.split("page=")[1];
    presenceData.details = "Viewing 👥 Members Panel";
    presenceData.state = `📖 Page ${users_page}`;
  } else if (document.location.pathname.includes("/panel")) {
    presenceData.details = "Viewing ⚙️ Staff Panel";
  }

  if (!showButtons) delete presenceData.buttons;
  if (showTimestamp) presenceData.startTimestamp = browsingStamp;

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
