const presence = new Presence({
    clientId: "715998093216317582"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
        largeImageKey: "pylon_logo",
        startTimestamp: browsingStamp
    };

    if (document.location.hostname == "pylon.bot") {
        presenceData.smallImageKey = "look";
        if (document.location.pathname.endsWith("/changelog")) {
            presenceData.details = "Viewing the changelog...";
        } else if (document.location.pathname.endsWith("editor")) {
            const title = document.querySelector("#root > div.PageStudioGuildEdit_studioContainer__2vaAW > div > div.PylonEditor_editorContainerOuter__3o4x4 > div.PylonEditor_editorContainerGridVertical__10qLF > div > div:nth-child(1) > div > div.SideBar_header__2dvwm > h3").textContent;
            presenceData.details = title;
            presenceData.smallImageKey = "editing";
            presenceData.smallImageText = "Editing...";
        } else if (document.location.pathname.includes("/studio/guilds/")) {
            const title = document.querySelector("#root > div:nth-child(4) > div.📦h_130px.📦box-szg_border-box > div.📦flt_left.📦w_340px.📦box-szg_border-box > div > div.📦flt_left.📦pl_0px.📦w_100prcnt.📦box-szg_border-box > div.📦flt_left.📦w_60prcnt.📦box-szg_border-box > div.PageStudioGuild_guildName__tgbvT").textContent;
            presenceData.smallImageKey = "look";
            presenceData.smallImageText = "Viewing...";
            presenceData.details = title;
        } else if (document.location.pathname.startsWith("/studio")) {
            presenceData.smallImageKey = "search";
            presenceData.details = "Studio";
        } else if (document.location.pathname.includes("/docs/")) {
            presenceData.smallImageKey = "search";
            presenceData.details = "Viewing documents...";
        }
    };

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    };
});
