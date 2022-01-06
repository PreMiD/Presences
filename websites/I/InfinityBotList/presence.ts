const presence = new Presence({
    clientId: "815553000470478850"
}), timestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const showTimestamp = await presence.getSetting<boolean>("timestamp"),
    showButtons = await presence.getSetting<boolean>("buttons"),
    presenceData: PresenceData = {
        largeImageKey: "logo",
    },

        { pathname, href } = document.location,
        [query] = href.split("q=")[1].split("&"),
        [search] = href.split("page=")[1].split("&");
        

        if (pathname === "/") {
            presenceData.details = "👀 Viewing homepage";

        } else if (pathname.includes("/search")) {
            presenceData.details = `👀 Searching for a bot`;
            presenceData.state = `🔍 Query: ${query}`
            presenceData.smallImageKey = "search";

        } else if (pathname.endsWith("/vote")) {
            const botName = document.querySelector("body > center:nth-child(6) > h1").textContent.split("#")[0];
            presenceData.details = "🎉 Voting for a bot";
            presenceData.state = `🤖 Bot: ${botName}`;
            presenceData.smallImageKey = "vote";

        } else if (pathname.includes("/list")) {
            presenceData.details = "💻 Browsing all bots";
            presenceData.state = `📖 Page: ${search}`
            presenceData.smallImageKey = "robot";

        } else if (pathname.includes("/bots/")) {
            const botName = document.querySelector("body > center:nth-child(6) > div:nth-child(2) > h1").textContent.split("#")[0];
            presenceData.details = "👀 Viewing a bot page";
            presenceData.state = `🤖 Bot: ${botName}`;
            presenceData.smallImageKey = "robot";
            presenceData.smallImageText = "Checking out a Bot!"

        } else if (pathname.includes("/users/")) {
            const userName = document.querySelector("body > center:nth-child(5) > h2").textContent.split("#")[0];
            presenceData.details = "👀 Viewing a user profile";
            presenceData.state = `👤 User: ${userName}`
            presenceData.smallImageKey = "profile";
        
        } else if (pathname.includes("/profile")) {
            presenceData.details = "👀 Viewing my profile";
            presenceData.state = "👨‍💻 Editing: Probably Nothing"
            presenceData.smallImageKey = "profile";

        } else if (pathname.includes("/partners")) {
            presenceData.details = "💻 Browsing the Partners Page";
            presenceData.state = "Just Showing some love!";
            presenceData.smallImageKey = "partners";
            presenceData.buttons = [
                {
                    label: "View Partners",
                    url: href
                }
            ]

        } else if (pathname === "/queue") {
            presenceData.details = "👀 Viewing the bot queue";
            presenceData.state = "Just looking around";
            presenceData.smallImageKey = "queue";
            presenceData.buttons = [
                {
                    label: "View the Queue",
                    url: href
                }
            ]

        } else if (pathname.includes("/about")) {
            presenceData.details = "👀 Viewing about us";
            presenceData.state = "📖 Reading some Boring Stuff";
            presenceData.smallImageKey = "read";

        } else if (pathname.endsWith("/panel")) {
            presenceData.details = "👀 Viewing the Staff Panel";
            presenceData.state = "Just Browsing some Stuff";
            presenceData.smallImageKey = "panel";

        } else if (pathname.endsWith("/panel/queue")) {
            presenceData.details = "👀 Viewing the Staff Panel";
            presenceData.state = "➕ Action: Approving Bots";
            presenceData.smallImageKey = "panel";

        } else if (pathname.includes("/panel/certification")) {
            presenceData.details = "👀 Viewing the Staff Panel"
            presenceData.state = "➰ Action: Certifying Bots"
            presenceData.smallImageKey = "panel";

        } else if (pathname.includes("/premium")) {
            presenceData.details = "👀 Viewing the Premium Page";
            presenceData.state = "💻 Browsing: Plans & Pricing";
            presenceData.smallImageKey = "premium";
            presenceData.buttons = [
                {
                    label: "View Premium Plans",
                    url: document.location.href
                }
            ]

        } else if (pathname === "/bots/certification") {
            presenceData.details = "👀 Viewing bot certification";
            presenceData.state = "🔱 Action: Browsing or Applying";
            presenceData.smallImageKey = "cert";
        
        } else if (pathname === "/bots/add") {
            presenceData.details = "👀 Viewing the Add Bot Page"
            presenceData.smallImageKey = "robot"

        }

    if (!showButtons) delete presenceData.buttons;
    if (showTimestamp) presenceData.startTimestamp = timestamp;

    if (presenceData.details) presence.setActivity(presenceData);
    else presence.setActivity();
});
