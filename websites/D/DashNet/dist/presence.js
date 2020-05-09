let presence, newID, latestID;
function presenceSet() {
    if (document.location.pathname.includes("/cookieclicker/")) {
        presence = new Presence({ clientId: "676126246928777250" });
        newID = "676126246928777250";
    }
    else {
        presence = new Presence({ clientId: "676120967159742465" });
        newID = "676120967159742465";
    }
    if (newID != latestID && latestID !== null) {
        presence.clearActivity();
        latestID = newID;
    }
}
const browsingStamp = Math.floor(Date.now() / 1000);
presenceSet();
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "dashnet"
    };
    presenceData.startTimestamp = browsingStamp;
    presenceSet();
    if (document.location.pathname.includes("/cookieclicker/")) {
        const cookies = document
            .querySelector("#cookies")
            .textContent.replace(document.querySelector("#cookies div").textContent, "");
        if (cookies.includes(" cookies")) {
            presenceData.details = cookies;
        }
        else {
            presenceData.details = cookies.replace("cookies", " cookies");
        }
        presenceData.state = document
            .querySelector("#cookies div")
            .textContent.replace("per second :", "Per second:");
        presenceData.smallImageKey = "legacyy";
        presenceData.smallImageText =
            "Legacy level: " + document.querySelector("#ascendNumber").textContent;
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Browsing DashNet's";
        presenceData.state = "video games and other fun things";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/legacy/")) {
        presenceData.details = "Playing Legacy";
    }
    else if (document.location.pathname.includes("/igm/")) {
        presenceData.details = "Making an idle game";
    }
    else if (document.location.pathname.includes("/randomgen/")) {
        presenceData.details = "Using randomgen";
    }
    else if (document.location.pathname.includes("/nested/")) {
        presenceData.details = "Playing Nested";
    }
    else if (document.location.pathname.includes("/murdergames/")) {
        presenceData.details = "Playing Murder Games";
    }
    else if (document.location.pathname.includes("/gamegen/")) {
        presenceData.details = "Using gamegen";
    }
    else if (document.location.pathname.includes("/lsystem/")) {
        presenceData.details = "Playing Tutrle Toy";
    }
    else if (document.location.pathname.includes("/taskmaster/")) {
        presenceData.details = "Using TaskMaster";
    }
    else if (document.location.pathname.includes("/cookies2cash/")) {
        presenceData.details = "Using Cookies2Cash";
    }
    else if (document.location.pathname.includes("/musicgen/")) {
        presenceData.details = "Using musicgen";
    }
    else if (document.location.pathname.includes("/dungeongenerator/")) {
        presenceData.details = "Using dungeongenerator";
    }
    else if (document.location.pathname.includes("/dreamlog/")) {
        presenceData.details = "Playing Dreamlog";
    }
    else if (document.location.pathname.includes("/PretendEverything/")) {
        presenceData.details = "Playing PretendEverything";
    }
    else if (document.location.pathname.includes("/teaparty/")) {
        presenceData.details = "Having a tea party";
    }
    else if (document.location.pathname.includes("/mailtopia/")) {
        presenceData.details = "Playing mailtopia";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLFFBQWtCLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQztBQUN4QyxTQUFTLFdBQVc7SUFDbEIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUMxRCxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQzVELEtBQUssR0FBRyxvQkFBb0IsQ0FBQztLQUM5QjtTQUFNO1FBQ0wsUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUM1RCxLQUFLLEdBQUcsb0JBQW9CLENBQUM7S0FDOUI7SUFFRCxJQUFJLEtBQUssSUFBSSxRQUFRLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtRQUMxQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUNsQjtBQUNILENBQUM7QUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVwRCxXQUFXLEVBQUUsQ0FBQztBQUVkLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFNBQVM7S0FDekIsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLFdBQVcsRUFBRSxDQUFDO0lBRWQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUMxRCxNQUFNLE9BQU8sR0FB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