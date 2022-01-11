const presence = new Presence({
    clientId: "846309777508007946"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  [page] = document.location.href.split("page=")[1].split("&"),
  [staffPage] = document.location.href.split("page=")[1],
  filters = document.location.href.includes("&"),
  [search] = document.location.href.split("term=")[1].split("&");

presence.on("UpdateData", async () => {
  const [showTimestamp, showButtons, showCvButton] = await Promise.all([
      presence.getSetting<boolean>("timestamp"),
      presence.getSetting<boolean>("buttons"),
      presence.getSetting<boolean>("cvButton")
    ]),
    presenceData: PresenceData = {
      largeImageKey: "dscjobs_logo"
    };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing home page";
  else if (document.location.pathname.includes("/search")) {
    presenceData.details = `Searching for: ${search || "Nothing"}`;
    presenceData.state = `Results Page: ${page}`;
  } else if (document.location.pathname === "/moderators") {
    presenceData.details = "Viewing hireable moderators";
    presenceData.state = filters ? "Filters: True" : `Page: ${page}`;
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname === "/developers") {
    presenceData.details = "Viewing hireable developers";
    presenceData.state = filters ? "Filters: True" : `Page: ${page}`;
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/premium")) {
    presenceData.details = "Viewing premium plan";
    presenceData.buttons = [
      {
        label: "View Premium Plan",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname === "/partners") {
    presenceData.details = "Viewing partners";
    presenceData.buttons = [
      {
        label: "View Partners",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname === "/profile")
    presenceData.details = "Viewing profile";
  else if (document.location.pathname.includes("/u/")) {
    presenceData.details = `Viewing ${
      document.querySelector("h1")?.textContent.split("#")[0]
    } profile`;
  } else if (document.location.pathname.includes("/vote")) {
    const usernameVote = document.querySelector("h1")?.textContent;
    presenceData.details = `Voting ${usernameVote || "N/A"} `;
    if (usernameVote) {
      presenceData.buttons = [
        {
          label: `Vote ${usernameVote}`,
          url: document.location.href
        }
      ];
    }
  } else if (document.location.pathname.includes("/cv/")) {
    presenceData.details = `Viewing ${document
      .querySelector("h2.cursor")
      ?.getAttribute("data-title")} resume`;
    presenceData.state = `Likes: ${document
      .getElementById("likes_amount")
      ?.getAttribute("data-title")} & Views: ${document
      .getElementById("views_amount")
      ?.getAttribute("data-title")}`;
    if (showButtons && showCvButton) {
      presenceData.buttons = [
        {
          label: "View Resume",
          url: document.location.href
        }
      ];
    }
  } else if (document.location.pathname.includes("/settings"))
    presenceData.details = "Editing curriculum vitae/resume";
  else if (document.location.pathname.includes("/privacy")) {
    presenceData.details = "Viewing Privacy Policy";
    presenceData.buttons = [
      {
        label: "View Privacy Policy",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname.includes("/terms")) {
    presenceData.details = "Viewing Terms of Service";
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      }
    ];
    // staff panel
  } else if (document.location.pathname.includes("/reviews")) {
    presenceData.details = "Viewing Review Panel";
    presenceData.state = `Page: ${staffPage}`;
  } else if (document.location.pathname.includes("/reports")) {
    presenceData.details = "Viewing Report Panel";
    presenceData.state = `Page: ${staffPage}`;
  } else if (document.location.pathname.includes("/users")) {
    presenceData.details = "Viewing Members Panel";
    presenceData.state = `Page: ${staffPage}`;
  } else if (document.location.pathname.includes("/panel"))
    presenceData.details = "Viewing Staff Panel";

  if (!showButtons) delete presenceData.buttons;
  if (showTimestamp) presenceData.startTimestamp = browsingStamp;

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
