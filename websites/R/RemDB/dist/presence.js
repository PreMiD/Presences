const presence = new Presence({
    clientId: "698955239344308224"
});
function stripHtml(html) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}
function prepareArray(item) {
    let stripped = item.replace(/\n/g, ",");
    stripped = stripped.split(",");
    const filtered = stripped.filter(function (el) {
        return el != "";
    });
    return filtered;
}
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "remdb"
    };
    if (window.location.pathname.startsWith("/terms/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Terms";
    }
    else if (window.location.pathname.startsWith("/player/")) {
        const player_item = document.getElementsByClassName("span7")[1].innerHTML;
        const player_infos_tmp = stripHtml(player_item);
        const player_infos = prepareArray(player_infos_tmp);
        const player_level = player_infos[1];
        const player_name = player_infos[2];
        presenceData.details = "Viewing a player:";
        presenceData.state = player_name + " - " + player_level;
    }
    else if (window.location.pathname.startsWith("/clan/")) {
        const clan_item = document.getElementsByClassName("span7")[1].innerHTML;
        const clan_infos_tmp = stripHtml(clan_item);
        const clan_infos = prepareArray(clan_infos_tmp);
        const clan_member = clan_infos[0];
        const clan_name = clan_infos[2];
        presenceData.details = "Viewing a clan:";
        presenceData.state = clan_name + "| " + clan_member;
    }
    else if (window.location.pathname.startsWith("/about/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "About";
    }
    else if (window.location.pathname.startsWith("/info/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Info";
    }
    else if (window.location.pathname.startsWith("/support/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Support";
    }
    else if (window.location.pathname.startsWith("/ranking/player/")) {
        presenceData.details = "Viewing Ranking:";
        presenceData.state = "Player";
    }
    else if (window.location.pathname.startsWith("/ranking/clan/")) {
        presenceData.details = "Viewing Ranking:";
        presenceData.state = "Clan";
    }
    else if (window.location.pathname.startsWith("/search/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Search";
    }
    else if (window.location.pathname.startsWith("/friends/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Friends";
    }
    else if (window.location.pathname.startsWith("/mails/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Mailbox";
    }
    else if (window.location.pathname.startsWith("/ranking/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Ranking";
    }
    else if (window.location.pathname.startsWith("/staff/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Staff";
    }
    else if (window.location.pathname.startsWith("/server/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Server";
    }
    else if (window.location.pathname.startsWith("/favorites/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Favorites";
    }
    else if (window.location.pathname.startsWith("/settings/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Settings";
    }
    else if (window.location.pathname.startsWith("/support/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Support";
    }
    else if (window.location.pathname.startsWith("/chat/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Chat";
    }
    else if (window.location.pathname.startsWith("/trending/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Trending";
    }
    else if (window.location.pathname.startsWith("/register/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Account register";
    }
    else if (window.location.pathname.startsWith("/recover/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Password recovery";
    }
    else if (window.location.pathname.startsWith("/news/")) {
        presenceData.details = "Reading news:";
        presenceData.state = document.querySelector("div.row-fluid > div.span8.s4db-well > div.s4db-inner.s4db-grey-border > div").textContent;
    }
    else if (window.location.pathname.startsWith("/pic/")) {
        presenceData.details = "Reading news-feed:";
        presenceData.state =
            "'" +
                document.querySelector("h4.s4db-newsfeed-post-header").textContent +
                "' by " +
                document.querySelector("div.s4db-newsfeed-post-author > a.ajax")
                    .textContent;
    }
    else if (window.location.pathname.startsWith("/vid/")) {
        presenceData.details = "Reading news-feed:";
        presenceData.state =
            "'" +
                document.querySelector("h4.s4db-newsfeed-post-header").textContent +
                "' by " +
                document.querySelector("div.s4db-newsfeed-post-author > a.ajax")
                    .textContent;
    }
    else if (window.location.pathname.startsWith("/txt/")) {
        presenceData.details = "Reading news-feed:";
        presenceData.state =
            "'" +
                document.querySelector("h4.s4db-newsfeed-post-header").textContent +
                "' by " +
                document.querySelector("div.s4db-newsfeed-post-author > a.ajax")
                    .textContent;
    }
    else if (window.location.pathname.endsWith("/shoutbox/")) {
        presenceData.details = "Shoutbox";
        presenceData.state = "Chatting..";
    }
    else if (window.location.pathname.startsWith("/shoutbox/ranking/")) {
        presenceData.details = "Viewing Ranking";
        presenceData.state = "Shoutbox";
    }
    else {
        presenceData.details = "Viewing a page:";
        presenceData.state =
            "Front page (Online: " +
                document.querySelector("div > span#s4db-server-info-players")
                    .textContent +
                ")";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsU0FBUyxDQUFDLElBQVM7SUFDMUIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNyQixPQUFPLEdBQUcsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLElBQVM7SUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFeEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFL0IsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7UUFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE9BQU87S0FDdkIsQ0FBQztJQUVGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7S0FDOUI7U0FBTSxJQUFJLE1BQU0s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