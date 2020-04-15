var presence = new Presence({
    clientId: "698955239344308224",
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "remdb",
    };

    if (window.location.pathname.startsWith("/terms/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Terms";
    } else if (window.location.pathname.startsWith("/player/")) {
        var item = document.getElementsByClassName("span7")[1].innerHTML;
        var infos_tmp = stripHtml(item);
        var infos = prepareArray(infos_tmp);
        var clan = infos[0];
        var level = infos[1];
        var username = infos[2];
        var staffstatus = infos[3];
        presenceData.details = "Viewing a player:";
        presenceData.state = username + " - " + level;
    } else if (window.location.pathname.startsWith("/clan/")) {
        var item = document.getElementsByClassName("span7")[1].innerHTML;
        var infos_tmp = stripHtml(item);
        var infos = prepareArray(infos_tmp);
        var clanmember = infos[0];
        var averagelevel = infos[1];
        var clanname = infos[2];
        presenceData.details = "Viewing a clan:";
        presenceData.state = clanname + "| " + clanmember;
    } else if (window.location.pathname.startsWith("/about/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "About";
    } else if (window.location.pathname.startsWith("/info/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Info";
    } else if (window.location.pathname.startsWith("/support/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Support";
    } else if (window.location.pathname.startsWith("/ranking/player/")) {
        presenceData.details = "Viewing Ranking:";
        presenceData.state = "Player";
    } else if (window.location.pathname.startsWith("/ranking/clan/")) {
        presenceData.details = "Viewing Ranking:";
        presenceData.state = "Clan";
    } else if (window.location.pathname.startsWith("/search/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Search";
    } else if (window.location.pathname.startsWith("/friends/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Friends";
    } else if (window.location.pathname.startsWith("/mails/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Mailbox";
    } else if (window.location.pathname.startsWith("/ranking/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Ranking";
    } else if (window.location.pathname.startsWith("/staff/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Staff";
    } else if (window.location.pathname.startsWith("/server/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Server";
    } else if (window.location.pathname.startsWith("/favorites/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Favorites";
    } else if (window.location.pathname.startsWith("/settings/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Settings";
    } else if (window.location.pathname.startsWith("/support/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Support";
    } else if (window.location.pathname.startsWith("/chat/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Chat";
    } else if (window.location.pathname.startsWith("/trending/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Trending";
    } else if (window.location.pathname.startsWith("/news/")) {
        presenceData.details = "Reading news:";
        presenceData.state =
            document.querySelector(
                "div.row-fluid > div.span8.s4db-well > div.s4db-inner.s4db-grey-border > div"
            ).textContent;
    } else if (window.location.pathname.startsWith("/pic/")) {
        presenceData.details = "Reading news-feed:";
        presenceData.state = "'" +
            document.querySelector(
                "h4.s4db-newsfeed-post-header"
            ).textContent + "' by " + document.querySelector(
                "div.s4db-newsfeed-post-author > a.ajax"
            ).textContent;
    } else if (window.location.pathname.startsWith("/vid/")) {
        presenceData.details = "Reading news-feed:";
        presenceData.state = "'" +
            document.querySelector(
                "h4.s4db-newsfeed-post-header"
            ).textContent + "' by " + document.querySelector(
                "div.s4db-newsfeed-post-author > a.ajax"
            ).textContent;
    } else if (window.location.pathname.startsWith("/txt/")) {
        presenceData.details = "Reading news-feed:";
        presenceData.state = "'" +
            document.querySelector(
                "h4.s4db-newsfeed-post-header"
            ).textContent + "' by " + document.querySelector(
                "div.s4db-newsfeed-post-author > a.ajax"
            ).textContent;
    } else if (window.location.pathname.endsWith("/shoutbox/")) {
        presenceData.details = "Shoutbox";
        presenceData.state = "Chatting..";
    } else if (window.location.pathname.startsWith("/shoutbox/ranking/")) {
        presenceData.details = "Viewing Ranking";
        presenceData.state = "Shoutbox";
    } else {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Front page";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});

function stripHtml(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

function prepareArray(item) {
    var stripped = item.replace(/\n/g, ",");

    stripped = stripped.split(",");

    var filtered = stripped.filter(function(el) {
        return el != "";
    });

    return filtered;
}