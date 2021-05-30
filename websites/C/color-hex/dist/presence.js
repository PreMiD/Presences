var presence = new Presence({
    clientId: "848520351352619018"
});
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        const homepagePresence = {
            details: "Viewing the homepage",
            largeImageKey: "logo"
        };
        presence.setActivity(homepagePresence);
    }
    else if (document.location.pathname.startsWith("/color/")) {
        const presenceData = {
            details: "Viewing a color",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/blog/")) {
        const presenceData = {
            details: "Viewing the blog",
            state: document.title,
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/color-palettes/top-contributors")) {
        const presenceData = {
            details: "Viewing top contributors",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/color-palettes/")) {
        const presenceData = {
            details: "Viewing color palettes",
            state: document.title,
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/color-palette/")) {
        const presenceData = {
            details: "Viewing a color palette",
            state: document.title,
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/member/")) {
        const presenceData = {
            details: "Viewing a member's profile",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/popular-colors")) {
        const presenceData = {
            details: "Viewing popular colors",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/color-names")) {
        const presenceData = {
            details: "Viewing list of color names",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/216-web-safe-colors/")) {
        const presenceData = {
            details: "Viewing list of web safe colors",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/random")) {
        const presenceData = {
            details: "Generating random colors",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/color-wheel")) {
        const presenceData = {
            details: "Using color wheel",
            state: document.getElementById("color1").value + ", " + document.getElementById("color2").value + ", " + document.getElementById("color3").value,
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/login")) {
        const presenceData = {
            details: "Logging in",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/register")) {
        const presenceData = {
            details: "Registering",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/activate")) {
        const presenceData = {
            details: "Activating account",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/profile")) {
        const presenceData = {
            details: "Viewing own profile",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/my-color-palettes")) {
        const presenceData = {
            details: "Viewing own color palettes",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/my-fav-colors")) {
        const presenceData = {
            details: "Viewing favorite colors",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/my-fav-palettes")) {
        const presenceData = {
            details: "Viewing favorite palettes",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (location.search.startsWith("?id") &&
        document.location.pathname.startsWith("/user/add-palette")) {
        const presenceData = {
            details: "Editing color palette",
            state: document.getElementById("adi").value,
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/add-palette")) {
        const presenceData = {
            details: "Creating color palette",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/change-password")) {
        const presenceData = {
            details: "Changing password",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/user/user-picture")) {
        const presenceData = {
            details: "Editing own profile picture",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/help")) {
        const presenceData = {
            details: "Searching for help",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/credits")) {
        const presenceData = {
            details: "Viewing credits",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/privacy")) {
        const presenceData = {
            details: "Viewing Privacy Policy",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/contact")) {
        const presenceData = {
            details: "Viewing contact page",
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
    else {
        const presenceData = {
            details: "Viewing color-hex",
            state: document.location.pathname.split("/")[1],
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
});
