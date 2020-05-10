const presence = new Presence({
    clientId: "662634921914925056"
});
let login;
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.pathname == "/") {
        login =
            document.querySelector(".GuildedText-container.GuildedText-container-type-heading1") !== null;
        if (login) {
            presenceData.details = `Logging in to`;
            presenceData.state = `Guilded.gg`;
        }
        else {
            presenceData.details = `Viewing Page:`;
            presenceData.state = `Guilded Main Page`;
        }
    }
    if (document.location.pathname.includes("/chat/")) {
        presenceData.details = `Chating With`;
        presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.StatusContext-container.AppV2-container > div > div.LayerContext-container > div.LayerContext-layer-item-wrapper > div > div > div.LayerContext-layer-item-wrapper > div > div.ScreenHeader-container.ScreenHeader-container-desktop.ChannelHeader-container > div.SkeletonPlaceholder-container.ScreenHeader-name").textContent;
    }
    else if (document.location.pathname.includes("/teams")) {
        presenceData.details = `Viewing Page:`;
        presenceData.state = `Guilded Teams`;
    }
    else if (document.location.pathname.includes("/matchmaking")) {
        login =
            document.querySelector(".MultiStageFlow-progress-bar.MultiStageProgressBar-container") !== null;
        if (login) {
            presenceData.details = `Making A Scrim For`;
            presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.StatusContext-container.AppV2-container > div > div.LayerContext-container > div > div > div.MatchmakingPageV2-scrim-content > div > div > div > div.ScrimFinderTeamLabel-container.ScrimFinderTeamLabel-container-sm.FindScrimFlow-team-label > div > h1").textContent;
        }
        else {
            presenceData.details = `Viewing Page:`;
            presenceData.state = `Guilded Scrims`;
        }
    }
    else if (document.location.pathname.includes("/find/team")) {
        presenceData.details = `Finding Team`;
        presenceData.state =
            "Looking At " +
                document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.StatusContext-container.AppV2-container > div > div.LayerContext-container > div > div > div.IconNavMenu-container.PlayerLfgPortal-menu > div.TeamFinder-container > div > div.VoteSwiperList-container.VoteSwiperList-container-type-lfg.VoteSwiperList-container-desktop > div.VoteSwiperItem-container.VoteSwiperList-item-wrapper.VoteSwiperList-item-0.ClickAndDragControl-container.ClickAndDragControl-container-grab > div > div > div.TeamCardV2-container.TeamCardV2-container-layout-horizontal.TeamCardV2-container-no-interact.TeamCardV2-container-with-games.TeamListingCard-alias-card > div.TeamCardV2-content > div.TeamCardV2-header.TeamCardHeader-container.TeamCardHeader-container-layout-horizontal > div.TeamCardHeader-team-name-wrapper > h2").textContent;
    }
    else if (document.location.pathname.includes("/find/team/status")) {
        presenceData.details = `Viewing Page:`;
        presenceData.state = `Teams Status`;
    }
    else if (document.location.pathname.includes("/explore/players/")) {
        presenceData.details = `Viewing Page:`;
        presenceData.state = `Guilded Find Players`;
    }
    else if (document.location.pathname.includes("/groups/")) {
        const edit = document.querySelector(".StatusContext-container.OptionsMenu-option-content") !== null;
        const add = document.querySelector(".InputControllerWrapper-container.InputControllerWrapper-container-grid.InputControllerWrapper-container-2-columns.RadiosField-panel-inputs.RadiosField-layout-horizontal") !== null;
        const status = document.querySelector(".StatusContext-container.ModalV2-modal-content.ModalV2-modal-content-scrollable") !== null;
        if (add) {
            presenceData.details = `Creating Channel In`;
            presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.StatusContext-container.AppV2-container > div > div.WebAppSidebar-container.WebAppV2-sidebar > div > div > div.TeamNavHeaderV3-container.TeamPageNavV3-header > div.TeamNavHeaderV3-content > div > div.SkeletonPlaceholder-container.TeamNavHeaderV3-team-name > h2").textContent;
        }
        else if (edit) {
            presenceData.details = `Editing`;
            presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.OverlayStackProvider-container > div.PortalTarget-container.OverlayStackProvider-portal-target > span > div.StatusContext-container.Overlay-status-context > div > div.StatusContext-container.ModalV2-modal-content.ModalV2-modal-content-scrollable > div > div > div > div.OptionsMenu-options-control > div.DesktopOptionsControl-container.OptionsMenu-desktop-options-control > div > div > div.DesktopOptionsControlOptionHeader-container > div").textContent;
        }
        else if (status) {
            presenceData.details = `Editing Status To`;
            presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.OverlayStackProvider-container > div.PortalTarget-container.OverlayStackProvider-portal-target > span > div.StatusContext-container.Overlay-status-context > div > div.StatusContext-container.ModalV2-modal-content.ModalV2-modal-content-scrollable > div > div > div.Editor-container.Editor-container-type-reaction.UserStatusOverlay-editor > div > div.needsclick.SlateEditor-editor.SlateEditor-editor-has-max-height > div > span > span > span").textContent;
        }
        else {
            presenceData.details = `Viewing Group:`;
            presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.StatusContext-container.AppV2-container > div > div.WebAppSidebar-container.WebAppV2-sidebar > div > div > div.TeamNavHeaderV3-container.TeamPageNavV3-header > div.TeamNavHeaderV3-content > div > div.SkeletonPlaceholder-container.TeamNavHeaderV3-team-name > h2").textContent;
        }
    }
    else if (document.location.pathname.includes("/profile/")) {
        const priceEls = document.getElementsByClassName("GH1-container UserProfileName-name");
        for (var i = 0; i < priceEls.length; i++) {
            const profilename = priceEls[i].textContent;
            presenceData.details = `Viewing a profile:`;
            presenceData.state = profilename;
        }
    }
    else if (document.location.pathname.includes("/games")) {
        presenceData.details = `Viewing Page:`;
        presenceData.state = `Game Directory`;
    }
    else if (document.location.pathname.includes("/overview")) {
        presenceData.details = `Overviewing`;
        presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.StatusContext-container.AppV2-container > div > div.LayerContext-container > div.LayerContext-layer-item-wrapper > div > div > div.LayerContext-container > div > div > div.TeamPageContent-content > div.TeamPlaqueV2-container.TeamPlaqueV2-container-desktop.TeamPageContent-team-plaque > div.SkeletonPlaceholder-container.TeamPlaqueV2-name-placeholder > h1").textContent;
    }
    else if (document.location.pathname.includes("/members")) {
        presenceData.details = `Viewing Members In`;
        presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.StatusContext-container.AppV2-container > div > div.WebAppSidebar-container.WebAppV2-sidebar > div > div > div.TeamNavHeaderV3-container.TeamPageNavV3-header > div.TeamNavHeaderV3-content > div > div.SkeletonPlaceholder-container.TeamNavHeaderV3-team-name > h2").textContent;
    }
    else if (document.location.pathname.includes("/recruitment")) {
        presenceData.details = `Viewing Team Aplications In`;
        presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.StatusContext-container.AppV2-container > div > div.WebAppSidebar-container.WebAppV2-sidebar > div > div > div.TeamNavHeaderV3-container.TeamPageNavV3-header > div.TeamNavHeaderV3-content > div > div.SkeletonPlaceholder-container.TeamNavHeaderV3-team-name > h2").textContent;
    }
    else if (document.location.pathname.includes("/audit")) {
        presenceData.details = `Viewing Audit Logs In`;
        presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.StatusContext-container.AppV2-container > div > div.WebAppSidebar-container.WebAppV2-sidebar > div > div > div.TeamNavHeaderV3-container.TeamPageNavV3-header > div.TeamNavHeaderV3-content > div > div.SkeletonPlaceholder-container.TeamNavHeaderV3-team-name > h2").textContent;
    }
    else if (document.location.pathname.includes("/matches")) {
        presenceData.details = `Viewing Matches In`;
        presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.StatusContext-container.AppV2-container > div > div.WebAppSidebar-container.WebAppV2-sidebar > div > div > div.TeamNavHeaderV3-container.TeamPageNavV3-header > div.TeamNavHeaderV3-content > div > div.SkeletonPlaceholder-container.TeamNavHeaderV3-team-name > h2").textContent;
    }
    else if (document.location.pathname.includes("/insights")) {
        presenceData.details = `Viewing Team Stats In`;
        presenceData.state = document.querySelector("#app > div > div.ReorderPortalContext-container > div.GameContext-container.GameContext-container-no-game.AppV2-game-context > div.StatusContext-container.AppV2-container > div > div.WebAppSidebar-container.WebAppV2-sidebar > div > div > div.TeamNavHeaderV3-container.TeamPageNavV3-header > div.TeamNavHeaderV3-content > div > div.SkeletonPlaceholder-container.TeamNavHeaderV3-team-name > h2").textContent;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksS0FBSyxDQUFDO0FBRVYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzdCLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsS0FBSztZQUNILFFBQVEsQ0FBQyxhQUFhLENBQ3BCLDREQUE0RCxDQUM3RCxLQUFLLElBQUksQ0FBQztRQUNiLElBQUksS0FBSyxFQUFFO1lBQ1QsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7WUFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7U0FDbkM7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLENBQUM7U0FDMUM7S0FDRjtJQUNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2pELFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDekMsdWJBQXViLENBQ3hiLENBQUMsV0FBVyxDQUFDO0tBQ2Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxH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