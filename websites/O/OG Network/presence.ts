const presence = new Presence({ clientId: "1237999667023708231" });

const assets = {
    logo: "https://www.og-network.net/assets/logo.png",
};

let startTime: number;

presence.on("UpdateData", async () => {
    const url = window.location.href;
    const elapsedTime = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

    let presenceData: PresenceData = {
        largeImageKey: assets.logo,
        startTimestamp: Math.floor(Date.now() / 1000 - elapsedTime), 
    };

    if (url.includes("/forums")) {
        presenceData.details = "Browsing the OG Network Forums";
        if (url.includes("rules.5/")) 
            presenceData.details = "Viewing the Rule Category.";
        if (url.includes("news-and-announcements.2/")) 
            presenceData.details = "Viewing the Servers News.";
    } else if (url.includes("/rules")) {
        presenceData.details = "Viewing the Servers Rules.";
    } else if (url.includes("/apply")) {
        presenceData.details = "Applying for something.";
    } else if (url.includes("/vote")) {
        presenceData.details = "Voting for the server!";
    } else if (url.includes("/cosmetics")) {
        presenceData.details = "Learning about the cosmetics!";
    } else if (url.includes("/account")) {
        presenceData.details = "Editing their account details.";
    } else if (url.includes("/modifications")) {
        presenceData.details = "Viewing the Modifications Rules";
    } else if (url.includes("/threads")) {
        const matches = /threads\/(.*?)(\.\d+)?\/?$/.exec(url);
        if (matches && matches[1]) {
            const threadName = matches[1].replace(/-/g, " ").trim();
            presenceData.details = `Viewing Thread: ${threadName}`;
        } else {
            presenceData.details = "Viewing Thread: Unknown";
        }
    } else if (url.includes("/members")) {
        const matches = /members\/(.*?)\.\d+\/?$/.exec(url);
        if (matches && matches[1]) {
            const memberName = matches[1].replace(/_/g, " ");
            presenceData.details = `Viewing ${memberName}'s profile`;
        } else {
            presenceData.details = "Viewing Member's profile: Unknown";
        }
    } else if (url.includes("og-network.net") || url.includes("shop-og-network.net")) { 
        // Check for OG Network and Shop URLs
        if (url.includes("/category")) {
            const matches = /\/category\/(.*?)(\.\d+)?\/?$/.exec(url);
            if (matches && matches[1]) {
                const categoryName = matches[1].replace(/-/g, " ").trim();
                presenceData.details = `Browsing the ${categoryName} category`;
            } else {
                presenceData.details = "Browsing OG Network Store";
            }
        } else {
            presenceData.details = "Browsing OG Network website";
        }
    } else {
        presenceData.details = "Browsing OG Network website";
    }

    presenceData.buttons = [
        {
            label: "View",
            url: url,
        },
    ];

    presence.setActivity(presenceData);

    if (!startTime) {
        startTime = Date.now();
    }
});
