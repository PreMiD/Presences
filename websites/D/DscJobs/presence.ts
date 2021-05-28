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
    const [search] = document.location.href.split("term=")[1].split("&"),
      [page] = document.location.href.split("page=")[1].split("&");
    presenceData.details = `🔍 Searching for: ${search || "Nothing"}`;
    presenceData.state = `📖 Page ${page}`;
  } else if (document.location.pathname === "/moderators") {
    const [moderatorPage] = document.location.href.split("page=")[1].split("&"),
      filters = document.location.href.includes("&");
    presenceData.details = "Viewing 🔨 hireable moderators";
    presenceData.state = `${
      filters ? "💿 Filters: True" : `📖 Page ${moderatorPage}`
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
    const usernameVote = document.querySelector("h1")?.textContent;
    presenceData.details = `Voting 🗳️ ${usernameVote || "N/A"} `;
    if (usernameVote) {
      presenceData.buttons = [
        {
          label: `Vote ${usernameVote}`,
          url: document.location.href
        }
      ];
    }
  } else if (document.location.pathname.includes("/cv/")) {
    const cvPage = document
        .querySelector("h2.cursor")
        ?.getAttribute("data-title"),
      likes = document
        .getElementById("likes_amount")
        ?.getAttribute("data-title"),
      views = document
        .getElementById("views_amount")
        ?.getAttribute("data-title");
    presenceData.details = `Viewing 📖 ${cvPage} resume`;
    presenceData.state = `❤️ ${likes} & 👀 ${views}`;
    if (showButtons) {
      if (showCvButton) {
        presenceData.buttons = [
          {
            label: "View Resume",
            url: document.location.href
          }
        ];
      }
    }
  } else if (document.location.pathname.includes("/settings"))
    presenceData.details = "Editing 📜 curriculum vitae/resume";
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
    const [, reviewPage] = document.location.href.split("page=");
    presenceData.details = "Viewing ⭐ Review Panel";
    presenceData.state = `📖 Page ${reviewPage}`;
  } else if (document.location.pathname.includes("/reports")) {
    const [, reportPage] = document.location.href.split("page=");
    presenceData.details = "Viewing 🛑 Report Panel";
    presenceData.state = `📖 Page ${reportPage}`;
  } else if (document.location.pathname.includes("/users")) {
    const [, usersPage] = document.location.href.split("page=");
    presenceData.details = "Viewing 👥 Members Panel";
    presenceData.state = `📖 Page ${usersPage}`;
  } else if (document.location.pathname.includes("/panel"))
    presenceData.details = "Viewing ⚙️ Staff Panel";

  if (!showButtons) delete presenceData.buttons;
  if (showTimestamp) presenceData.startTimestamp = browsingStamp;

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
