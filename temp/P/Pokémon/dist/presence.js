const presence = new Presence({
    clientId: "684885381728043048"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function settingSetter() {
    if (document.location.pathname.includes("/pokedex")) {
        presence.showSetting("pdexID");
    }
    else {
        presence.hideSetting("pdexID");
    }
}
function getTimestamps(videoTime, videoDuration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "pokemonlogo"
    };
    settingSetter();
    presenceData.startTimestamp = browsingStamp;
    if (document.location.host == "www.pokemon.com") {
        if (document.location.pathname.includes("/pokemon-news/") ||
            document.location.pathname.includes("/actus-pokemon/") ||
            document.location.pathname.includes("/novita-pokemon/") ||
            document.location.pathname.includes("/pokemon-nieuws/") ||
            document.location.pathname.includes("/pokemon-nyheter/") ||
            document.location.pathname.includes("/noticias-pokemon/")) {
            const title = document.querySelector(".full-article > h1");
            if (title !== null) {
                presenceData.details = "Reading article:";
                presenceData.state = title.textContent;
                presenceData.smallImageKey = "reading";
            }
            else {
                presenceData.details = "Pokémon News";
                presenceData.state = "Browsing...";
            }
        }
        else if (document.location.pathname.includes("/play-pokemon/")) {
            presenceData.largeImageKey = "pokemonplay";
            const title = document.querySelector(".full-article > h1");
            if (title !== null) {
                presenceData.details = "Reading article:";
                presenceData.state = title.textContent;
                presenceData.smallImageKey = "reading";
            }
            else {
                presenceData.details = "Play! Pokémon";
                presenceData.state = "Browsing...";
            }
        }
        else if (document.location.pathname.includes("/pokedex/")) {
            presenceData.smallImageKey = "pokeball";
            presenceData.smallImageText = "Pokédex";
            const search = document.querySelector("#searchInput");
            if (document.querySelector(".pokedex-pokemon-pagination-title > div") !==
                null) {
                const pdexID = await presence.getSetting("pdexID");
                let name = document.querySelector(".pokedex-pokemon-pagination-title > div").textContent;
                let number = document.querySelector(".pokedex-pokemon-pagination-title > div > span").textContent;
                name = name.replace(number, "").trim();
                number = number.replace(/\D+/g, "");
                presenceData.details = "Viewing Pokémon:";
                if (pdexID) {
                    presenceData.state = name + " (#" + number + ")";
                }
                else {
                    presenceData.state = name;
                }
            }
            else if (search !== null && search.value !== "") {
                if (search.value.length > 2) {
                    presenceData.details = "Pokédex - Searching for:";
                    presenceData.state = search.value;
                }
                else {
                    presenceData.details = "Pokédex";
                    presenceData.state = "Searching something up...";
                }
                presenceData.largeImageKey = "pokeball";
                presenceData.smallImageKey = "search";
            }
            else {
                presenceData.details = "Pokédex";
                presenceData.state = "Browsing...";
            }
        }
        else if (document.location.pathname.includes("/app")) {
            const title = document.querySelector(".full-article > h1");
            if (title !== null) {
                presenceData.details = "Viewing app:";
                presenceData.state = title.textContent;
                presenceData.smallImageKey = "reading";
            }
            else {
                presenceData.details = "Viewing Pokémon Apps";
            }
        }
        else if (document.location.pathname.includes("/pokemon-video-games") ||
            document.location.pathname.includes("/pokemon-videospiele") ||
            document.location.pathname.includes("/jeux-video-pokemon") ||
            document.location.pathname.includes("/videogiochi") ||
            document.location.pathname.includes("/videojuegos-pokemon")) {
            const title = document.querySelector(".full-article > h1");
            presenceData.smallImageKey = "reading";
            if (title !== null) {
                presenceData.details = "Reading about game:";
                presenceData.state = title.textContent;
            }
            else if (document.location.pathname.includes("/all-pokemon-games") ||
                document.location.pathname.includes("/alle-pokemon-spiele") ||
                document.location.pathname.includes("/todos-los-juegos-pokemon")) {
                presenceData.details = "Viewing all";
                presenceData.state = "Pokémon games";
            }
            else {
                presenceData.details = "Browsing through";
                presenceData.state = "Pokémon's games";
            }
        }
        else if (document.querySelector("body > nav > div.content-wrapper > ul > li.home > a") !== null &&
            document.querySelector("body > nav > div.content-wrapper > ul > li.home > a").href == document.URL) {
            presenceData.details = "Viewing the homepage...";
        }
        else if (document.location.pathname.includes("/pokemon-tcg") ||
            document.location.pathname.includes("/pokemon-sammelkartenspiel") ||
            document.location.pathname.includes("/jcc-pokemon") ||
            document.location.pathname.includes("/pokemon-estampas-ilustradas") ||
            document.location.pathname.includes("/gcc")) {
            presenceData.largeImageKey = "tcg";
            presenceData.smallImageKey = "reading";
            if (document.location.pathname.includes("/pokemon-cards") ||
                document.location.pathname.includes("/pokemon-karten") ||
                document.location.pathname.includes("/cartas-pokemon") ||
                document.location.pathname.includes("/cartes-pokemon") ||
                document.location.pathname.includes("/archivio-carte")) {
                presenceData.details = "Viewing card:";
                presenceData.state = document.querySelector(".card-description > div > h1").textContent;
            }
            else if (document.location.pathname.includes("/product-gallery") ||
                document.location.pathname.includes("/Produktgalerie")) {
                const title = document.querySelector(".full-article > h1");
                if (title !== null) {
                    presenceData.details = "Viewing product:";
                    presenceData.state = title.textContent;
                }
                else {
                    presenceData.details = "Viewing Pokémon Card Game";
                    presenceData.state = "product galery";
                }
            }
            else if (document.location.pathname.includes("/leaderboards")) {
                presenceData.details = "Viewing Trading Card Game";
                presenceData.state = "Online leadersboards";
            }
            else {
                presenceData.details = "Reading about Pokémon's";
                presenceData.state = "Trading Card Game";
            }
        }
        else if (document.location.pathname.includes("/pokemon-episodes") ||
            document.location.pathname.includes("/pokemon-folgen") ||
            document.location.pathname.includes("/episodios-pokemon") ||
            document.location.pathname.includes("/pokemon-afsnit") ||
            document.location.pathname.includes("/pokemon-jaksot") ||
            document.location.pathname.includes("/episodes-pokemon") ||
            document.location.pathname.includes("/episodi-tv") ||
            document.location.pathname.includes("/pokemon-afleveringen") ||
            document.location.pathname.includes("/pokemon-episoder") ||
            document.location.pathname.includes("/pokemon-avsnitt")) {
            presenceData.largeImageKey = "pokemontv";
            presenceData.details = "Viewing PokémonTV";
        }
        else if (document.location.pathname.includes("/country-region") ||
            document.location.pathname.includes("/land-region") ||
            document.location.pathname.includes("/pais-region") ||
            document.location.pathname.includes("/pais-regiao") ||
            document.location.pathname.includes("/maa-alue") ||
            document.location.pathname.includes("/pays-region") ||
            document.location.pathname.includes("/seleziona-paese-regione") ||
            document.location.pathname.includes("/land-regio")) {
            presenceData.details = "Changing region";
        }
    }
    else if (document.location.host == "tcg.pokemon.com") {
        presenceData.largeImageKey = "tcg";
        if (document.location.pathname.includes("/how-to-play/")) {
            presenceData.details = "Learning how to play";
        }
        else if (document.location.pathname.includes("/expansions/")) {
            presenceData.details = "Viewing expansion:";
            presenceData.state = document.title.split("|")[1].trim();
        }
        else if (document.location.pathname.includes("/galleries/")) {
            presenceData.details = "Viewing cards of expansion:";
            presenceData.state = document.title.split("|")[1].trim();
        }
        else if (document.location.pathname.includes("/parents-guide/")) {
            presenceData.details = "Viewing parents guide";
        }
        else if (document.location.pathname.includes("/where-to-buy/")) {
            presenceData.details = "Viewing where to buy";
        }
    }
    else if (document.location.host == "forums.pokemontcg.com") {
        presenceData.largeImageKey = "tcg";
        if (document.location.pathname.includes("/topic")) {
            presenceData.details = "Reading thread:";
            presenceData.state = document
                .querySelector(".ipsType_pageTitle")
                .textContent.trim();
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/forum")) {
            presenceData.details = "Viewing category:";
            presenceData.state = document
                .querySelector(".ipsType_pageTitle")
                .textContent.trim();
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/leaderboard")) {
            presenceData.details = "Viewing the leaderboards";
        }
        else if (document.location.pathname.includes("/pastleaders")) {
            presenceData.details = "Viewing the pastleaders";
        }
        else if (document.location.pathname.includes("/topmembers")) {
            presenceData.details = "Viewing the topmembers";
        }
        else if (document.location.pathname.includes("/discover")) {
            presenceData.details = "Viewing the recent activity";
        }
        else if (document.location.pathname.includes("/search")) {
            presenceData.details = "Searching for:";
            const input = document.querySelector("#elMainSearchInput");
            presenceData.state = input.value;
            presenceData.smallImageKey = "search";
        }
        else {
            presenceData.details = "Browsing the forums";
        }
    }
    else if (document.location.host == "www.pokemoncenter.com") {
        presenceData.largeImageKey = "store";
        if (document.querySelector(".main_header") !== null) {
            presenceData.details = "Viewing product:";
            presenceData.state = document.querySelector(".main_header").textContent;
        }
        else if (document.querySelector(".row > div > div > h1") !== null) {
            presenceData.details = "Viewing category:";
            presenceData.state = document
                .querySelector(".row > div > div > h1")
                .textContent.trim();
        }
        else if (document.location.pathname.includes("/AjaxOrderItemDisplayView")) {
            presenceData.details = "Viewing their cart";
        }
        else {
            presenceData.details = "Browsing through the store";
        }
    }
    else if (document.location.host == "www.pokemoncenter-online.com") {
        presenceData.largeImageKey = "storejp";
        if (document.location.pathname.includes("/cafe")) {
            presenceData.largeImageKey = "cafe";
            if (document.location.pathname.includes("/pikachu_sweets")) {
                presenceData.largeImageKey = "sweets";
                presenceData.details = "Viewing the";
                presenceData.state = "Pikachu Sweets Cafe";
            }
            else if (document.location.pathname.includes("/menu")) {
                presenceData.details = "Viewing the menu";
            }
            else if (document.location.pathname.includes("/goods")) {
                presenceData.details = "Viewing the goods";
            }
            else if (document.location.pathname.includes("/news")) {
                if (document.querySelector("#mainContent > section > div > div > div.boxStyle03 > div > h3") !== null) {
                    presenceData.details = "Reading article:";
                    presenceData.state = document.querySelector("#mainContent > section > div > div > div.boxStyle03 > div > h3").textContent;
                    presenceData.smallImageKey = "reading";
                }
                else {
                    presenceData.details = "Viewing the articles";
                }
            }
            else if (document.URL.includes("access")) {
                presenceData.details = "Viewing the access points";
            }
            else if (document.location.pathname.includes("/faq")) {
                presenceData.details = "Viewing the FAQs";
            }
            else if (document.location.pathname.includes("/reservation")) {
                presenceData.details = "Making a reservation";
            }
        }
        else if (document.querySelector("#contents > section > div.item_detail > article > h1") !== null) {
            presenceData.details = "Viewing product:";
            presenceData.state = document.querySelector("#contents > section > div.item_detail > article > h1").textContent;
        }
        else if (document.querySelector("#contents > div.topic_path > ul > li:nth-child(2) > span") !== null) {
            presenceData.details = "Viewing category:";
            presenceData.state = document.querySelector("#contents > div.topic_path > ul > li:nth-child(2) > span").textContent;
        }
        else if (document.URL.includes("shopping_cart")) {
            presenceData.details = "Viewing their cart";
        }
        else {
            presenceData.details = "Browsing through the store";
        }
    }
    else if (document.location.host.match("([a-z0-9]+)[.]pokemon-cafe[.]([a-z0-9]+)([.]([a-z0-9]+))?")) {
        presenceData.largeImageKey = "cafe";
        presenceData.details = "Making a reservation";
    }
    else if (document.location.host == "watch.pokemon.com") {
        presenceData.largeImageKey = "pokemontv";
        if (document.location.pathname.includes("/player")) {
            const video = document.querySelector("video");
            const timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            presenceData.smallImageKey = video.paused ? "pause" : "play";
            presenceData.smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            const season = document
                .querySelector(".header-bar-small > span:nth-child(2)")
                .textContent.trim();
            const episode = document
                .querySelector(".header-bar-small > span:nth-child(4)")
                .textContent.split(" - ")[0]
                .trim();
            const title = document
                .querySelector(".header-bar-small > span:nth-child(4)")
                .textContent.split(" - ")[1]
                .trim();
            presenceData.details = season + " - " + episode;
            presenceData.state = title;
            if (video.paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
        }
        else if (document.location.pathname.includes("/season")) {
            presenceData.details = "Viewing season:";
            presenceData.state = document.querySelector("#lbl_season_title").textContent;
        }
        else {
            presenceData.details = "Browsing PokémonTV";
        }
    }
    else if (document.location.host == "pokemonkorea.co.kr") {
        if (document.location.pathname.includes("/news/")) {
            presenceData.smallImageKey = "reading";
            presenceData.details = "Reading article:";
            const title = document.querySelector(".section-title");
            const tag = document.querySelector(".section-title > span");
            const publish = document.querySelector(".section-title > small");
            if (tag !== null) {
                presenceData.state = title.textContent
                    .replace(tag.textContent, "")
                    .replace(publish.textContent, "");
            }
            else {
                presenceData.state = title.textContent.replace(publish.textContent, "");
            }
        }
        else if (document.location.pathname.includes("/news")) {
            presenceData.details = "Viewing the recent";
            presenceData.state = "News and Announcements";
        }
        else if (document.location.pathname.includes("/game/")) {
            const title = document.querySelector(".medium-title");
            if (title !== null) {
                presenceData.details = "Viewing game:";
                presenceData.state = title.textContent;
            }
            else if (document.location.pathname.includes("/category/")) {
                presenceData.details = "Viewing category:";
                presenceData.state = document.querySelector(".section-title").textContent;
            }
        }
        else if (document.location.pathname.includes("/game")) {
            presenceData.details = "Viewing Pokémon's games";
        }
        else if (document.location.pathname.includes("/pokedex")) {
            presenceData.smallImageKey = "pokeball";
            presenceData.smallImageText = "Pokédex";
            const search = document.querySelector("#word.form-control");
            if (document.querySelector("body > div.single_header_wrap > div > h1") !==
                null) {
                const pdexID = await presence.getSetting("pdexID");
                let name = document
                    .querySelector("body > div.single_header_wrap > div > h1")
                    .textContent.trim();
                let number = document.querySelector("body > div.single_header_wrap > div > h1 > span").textContent;
                name = name.replace(number, "");
                number = number.replace("No. ", "");
                presenceData.details = "Viewing Pokémon:";
                if (pdexID) {
                    presenceData.state = name + " (#" + number + ")";
                }
                else {
                    presenceData.state = name;
                }
            }
            else if (search !== null && search.value !== "") {
                if (search.value.length > 2) {
                    presenceData.details = "Pokédex - Searching for:";
                    presenceData.state = search.value;
                }
                else {
                    presenceData.details = "Pokédex";
                    presenceData.state = "Searching something up...";
                }
                presenceData.largeImageKey = "pokeball";
                presenceData.smallImageKey = "search";
            }
            else {
                presenceData.details = "Pokédex";
                presenceData.state = "Browsing...";
            }
        }
        else if (document.location.pathname.includes("/animation")) {
            const title = document.querySelector(".medium-title");
            if (title !== null) {
                presenceData.details = "Reading about animation:";
                presenceData.state = title.textContent;
                presenceData.smallImageKey = "reading";
            }
            else {
                presenceData.details = "Viewing Pokémon's animations";
            }
        }
        else if (document.location.pathname.includes("/product")) {
            presenceData.largeImageKey = "storekr";
            const title = document.querySelector(".medium-title");
            if (title !== null) {
                presenceData.details = "Viewing product:";
                presenceData.state = title.textContent;
            }
            else {
                presenceData.details = "Browsing through";
                presenceData.state = "Pokémon's products";
            }
        }
    }
    else if (document.location.host == "pokemoncard.co.kr") {
        presenceData.largeImageKey = "tcg";
        if (document.location.pathname.includes("/main")) {
            presenceData.details = "Browsing...";
        }
        else if (document.location.pathname.includes("/news/")) {
            presenceData.smallImageKey = "reading";
            presenceData.details = "Reading article:";
            const title = document.querySelector(".section-title");
            const tag = document.querySelector(".section-title > span");
            const publish = document.querySelector(".section-title > small");
            if (tag !== null) {
                presenceData.state = title.textContent
                    .replace(tag.textContent, "")
                    .replace(publish.textContent, "");
            }
            else {
                presenceData.state = title.textContent.replace(publish.textContent, "");
            }
        }
        else if (document.location.pathname.includes("/news")) {
            presenceData.details = "Viewing the recent";
            presenceData.state = "News and Announcements";
        }
        else if (document.location.pathname.includes("/card")) {
            if (document.location.pathname.includes("/category")) {
                if (document.location.pathname.includes("/event")) {
                    presenceData.details = "Viewing upcoming events";
                }
                else {
                    presenceData.details = "Viewing category:";
                    presenceData.state = document
                        .querySelector("#partners > div > div > ul > li.active")
                        .textContent.trim();
                }
            }
            else if (document.location.pathname.includes("/play")) {
                presenceData.details = "Learning how to play";
            }
            else if (document.querySelector("#header-top-menu > li.active > a").href.includes("/event")) {
                presenceData.details = "Viewing event:";
                presenceData.state = document.querySelector(".medium-title").textContent;
            }
            else if (document.location.pathname.includes("/cards")) {
                const input = document.querySelector("#search_text");
                if (document.location.pathname.includes("/detail")) {
                    presenceData.details = "Viewing card:";
                    presenceData.state = document.querySelector(".card-hp.title").textContent;
                }
                else if (input.value !== "") {
                    if (input.value.length > 2) {
                        presenceData.details = "Searching for:";
                        presenceData.state = input.value;
                    }
                    else {
                        presenceData.details = "Searching up something...";
                    }
                    presenceData.smallImageKey = "search";
                }
                else {
                    presenceData.details = "Browsing through the cards";
                }
            }
            else if (document.querySelector(".medium-title") !== null) {
                presenceData.details = "Viewing card:";
                presenceData.state = document.querySelector(".medium-title").textContent;
            }
            else {
                presenceData.details = "Browsing through the cards";
            }
        }
        else if (document.location.pathname.includes("/players")) {
            presenceData.details = "Viewing players";
        }
    }
    else if (document.location.host == "www.pokemonstore.co.kr") {
        presenceData.largeImageKey = "storekr";
        if (document.location.pathname.includes("/goods_view")) {
            presenceData.details = "Viewing product:";
            presenceData.state = document
                .querySelector(".goods-header > div.top > div")
                .textContent.trim();
        }
        else if (document.location.pathname.includes("/goods_list")) {
            presenceData.details = "Viewing category:";
            presenceData.state = document.querySelector("#content > div > div > div.cg-main > h2").textContent;
        }
        else if (document.location.pathname.includes("/main")) {
            presenceData.details = "Browsing...";
        }
        else if (document.location.pathname.includes("/board/list")) {
            presenceData.details = "Viewing product reviews";
        }
        else if (document.location.pathname.includes("/board/view")) {
            presenceData.details = "Viewing review of product:";
            presenceData.state = document.querySelector(".itemorder-name").textContent;
        }
        else if (document.location.pathname.includes("/mypage/order_list")) {
            presenceData.details = "Viewing their orders";
        }
        else if (document.location.pathname.includes("/mypage/wish_list")) {
            presenceData.details = "Viewing their wish list";
        }
        else if (document.location.pathname.includes("/mypage/index")) {
            presenceData.details = "Viewing their page";
        }
        else if (document.location.pathname.includes("/order/cart")) {
            presenceData.details = "Viewing their cart";
        }
    }
    else if (document.location.host == "www.pokemon.co.jp") {
        if (document.location.pathname.includes("/app")) {
            presenceData.details = "Viewing Pokémon Apps";
        }
        else if (document.location.pathname.includes("/game")) {
            presenceData.details = "Viewing Pokémon Games";
        }
        else if (document.location.pathname.includes("/ex/")) {
            presenceData.details = "Viewing game:";
            presenceData.state = document.title;
        }
        else if (document.location.pathname.includes("/card")) {
            presenceData.details = "Viewing Pokémon Cards";
        }
        else if (document.location.pathname.includes("/event")) {
            presenceData.details = "Viewing Pokémon Events";
        }
        else if (document.location.pathname.includes("/anime")) {
            presenceData.largeImageKey = "pokemontv";
            const title = document.querySelector(".m-ttl-top") ||
                document.querySelector(".m-ttl-dot");
            if (title !== null) {
                presenceData.details = "Viewing show:";
                presenceData.state = title.textContent;
            }
            else {
                presenceData.details = "Viewing Pokémon TV/Movies";
            }
        }
        else if (document.location.pathname.includes("/gp")) {
            const title = document.querySelector(".m-ttl-top");
            if (title !== null && title.textContent.includes("ポケモンセンタ")) {
                presenceData.details = "Viewing Pokémon Center:";
                presenceData.state = title.textContent
                    .replace("ポケモンセンター", "")
                    .trim();
            }
            else if (title !== null &&
                title.textContent.includes("ポケモンストア")) {
                presenceData.details = "Viewing Pokémon Store:";
                presenceData.state = title.textContent
                    .replace("ポケモンストア", "")
                    .trim();
            }
            else {
                presenceData.details = "Viewing Pokémon Centers";
            }
        }
        else if (document.location.pathname.includes("/sp")) {
            const title = document.querySelector(".m-ttl-top");
            if (title !== null) {
                presenceData.details = "Viewing Upcoming Pokémon Center:";
                presenceData.state = title.textContent
                    .split("、")[0]
                    .replace("ポケモンセンター", "")
                    .trim();
            }
            else {
                presenceData.details = "Viewing Upcoming Pokémon Centers";
            }
        }
        else if (document.location.pathname.includes("/goods")) {
            presenceData.smallImageKey = "storejp";
            const title = document.querySelector(".m-ttl-hd");
            if (title !== null) {
                presenceData.details = "Viewing Pokémon Goods";
                presenceData.state = "in category: " + title.textContent;
            }
            else {
                presenceData.details = "Viewing Pokémon Goods";
            }
        }
    }
    else if (document.location.host == "www.pokemon-movie.jp") {
        presenceData.largeImageKey = "pokemontv";
        if (document.location.pathname.includes("/news/")) {
            if (document.URL.includes("?p=")) {
                presenceData.smallImageKey = "reading";
                presenceData.details = "Reading article:";
                presenceData.state = document.querySelector("#pagemain_newbig > div > div.entry_header > h2 > a").textContent;
            }
            else {
                presenceData.details = "Viewing the recent articles";
            }
        }
        else if (document.location.pathname == "/") {
            presenceData.details = "Pokémon Movie";
            presenceData.state = "Browsing...";
        }
        else if (document.location.pathname.includes("/chara/")) {
            presenceData.details = "Pokémon Movie";
            presenceData.state = "Viewing the characters";
        }
        else if (document.location.pathname.includes("/story/")) {
            presenceData.smallImageKey = "reading";
            presenceData.details = "Pokémon Movies";
            presenceData.state = "Reading the story";
        }
        else if (document.location.pathname.includes("/tickets/")) {
            presenceData.details = "Pokémon Movies";
            presenceData.state = "Getting tickets";
        }
        else if (document.location.pathname.includes("/playground/")) {
            presenceData.details = "Pokémon Movies";
            presenceData.state = "Viewing the playground";
        }
        else if (document.location.pathname.includes("/history/")) {
            if (document.querySelector("#main > h1 > img") !== null) {
                presenceData.details = "Viewing history of:";
                presenceData.state = document.querySelector("#main > h1 > img").alt;
            }
            else {
                presenceData.details = "Pokémon Movies";
                presenceData.state = "Viewing the history";
            }
        }
        else if (document.location.pathname.includes("/melmaga/form")) {
            presenceData.details = "Pokémon Movies";
            presenceData.state = "Signing up for the magazine";
        }
    }
    else if (document.location.host == "www.pokemon-card.com") {
        presenceData.largeImageKey = "tcg";
        if (document.location.pathname.includes("/about")) {
            presenceData.details = "Viewing the tutorial";
        }
        else if (document.location.pathname.includes("/rules")) {
            if (document.location.pathname.includes("/regulation")) {
                presenceData.details = "Viewing the regulation";
            }
            else {
                presenceData.details = "Viewing the Q&A";
            }
        }
        else if (document.location.pathname.includes("/products")) {
            if (document.location.pathname.includes("/products/s")) {
                presenceData.details = "Viewing product:";
                presenceData.state = document.querySelector(".MainArea > div > nav > ul > li.current").textContent;
            }
            else {
                presenceData.details = "Viewing products";
            }
        }
        else if (document.location.pathname.includes("/ex")) {
            presenceData.details = "Viewing extension pack:";
            presenceData.state = document.title.split("」 ｜ ")[0].split("「")[1];
        }
        else if (document.location.pathname.includes("/event")) {
            if (document.querySelector(".detailCalenderEventArea > section:nth-child(1) > ul > li:nth-child(1) > div > div.List_body") !== null) {
                let title = document.querySelector(".detailCalenderEventArea > section:nth-child(1) > ul > li:nth-child(1) > div > div.List_body").textContent;
                const tags = document.querySelector(".detailCalenderEventArea > section:nth-child(1) > ul > li:nth-child(1) > div > div.List_body > ul");
                const warning = document.querySelector(".detailCalenderEventArea > section:nth-child(1) > ul > li:nth-child(1) > div > div.List_body > div");
                if (tags !== null) {
                    title = title.replace(tags.textContent, "");
                }
                if (warning !== null) {
                    title = title.replace(warning.textContent, "");
                }
                presenceData.details = "Viewing event:";
                presenceData.state = title;
            }
            else {
                presenceData.details = "Browsing through the";
                presenceData.state = "upcoming events";
            }
        }
        else if (document.location.pathname.includes("/card-search/")) {
            if (document.location.pathname.includes("/card/")) {
                presenceData.details = "Viewing card:";
                presenceData.state = document.querySelector("body > div > div.PopupMain > section.Section > h1").textContent;
            }
            else {
                presenceData.details = "Searching through";
                presenceData.state = "the cards...";
                presenceData.smallImageKey = "search";
            }
        }
        else if (document.location.pathname.includes("/info/")) {
            presenceData.details = "Reading article:";
            presenceData.state = document.querySelector("body > div.WrapperArea > div.MainArea > div > section > h1").textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/deck/")) {
            presenceData.details = "Browsing decks...";
        }
    }
    else if (document.location.host == "map.pokemon-card.com") {
        presenceData.largeImageKey = "tcg";
        presenceData.details = "Viewing the map";
    }
    else if (document.location.host == "www.portal-pokemon.com") {
        presenceData.details = "Changing region";
    }
    else if (document.location.host.match("(([a-z0-9]+)[.])?portal-pokemon[.]com")) {
        if (document.location.pathname.includes("/anime")) {
            presenceData.largeImageKey = "pokemontv";
            if (document.location.pathname.includes("/series")) {
                presenceData.details = "Viewing serie:";
                presenceData.state = document.querySelector(".article-detail__title").textContent;
            }
            else {
                presenceData.details = "Viewing ongoing series";
            }
        }
        else if (document.location.pathname.includes("/topics")) {
            if (document.location.pathname.includes("/movie")) {
                presenceData.smallImageKey = "reading";
                presenceData.details = "Reading about movie:";
                presenceData.state = document.querySelector(".article-detail__title").textContent;
            }
            else if (document.location.pathname.includes("/apps")) {
                presenceData.smallImageKey = "reading";
                presenceData.details = "Reading about app:";
                presenceData.state = document.querySelector(".article-detail__title").textContent;
            }
            else if (document.location.pathname.includes("/game")) {
                presenceData.smallImageKey = "reading";
                presenceData.details = "Reading about game:";
                presenceData.state = document.querySelector(".article-detail__title").textContent;
            }
            else if (document.location.pathname.includes("/event")) {
                presenceData.smallImageKey = "reading";
                presenceData.details = "Reading about event:";
                presenceData.state = document.querySelector(".article-detail__title").textContent;
            }
        }
        else if (document.location.pathname.includes("/movie")) {
            presenceData.details = "Viewing Pokémon's movies";
        }
        else if (document.location.pathname.includes("/goods")) {
            if (document.querySelector(".article-detail__title") !== null) {
                presenceData.details = "Viewing product:";
                presenceData.state = document.querySelector(".article-detail__title").textContent;
            }
            else if (document.querySelector(".category-list__element--current") !== null &&
                document.querySelector(".category-list__element--current")
                    .textContent !==
                    document.querySelector(".category-list__element").textContent) {
                presenceData.details = "Goods - Viewing category:";
                presenceData.state = document.querySelector(".category-list__element--current").textContent;
            }
            else {
                presenceData.details = "Browsing through";
                presenceData.state = "Pokémon's goods";
            }
        }
        else if (document.location.pathname.includes("/apps")) {
            presenceData.details = "Viewing Pokémon Apps";
        }
        else if (document.location.pathname.includes("/game")) {
            presenceData.details = "Viewing Pokémon Games";
        }
        else if (document.location.pathname.includes("/event")) {
            presenceData.details = "Viewing Pokémon Events";
        }
        else if (document.location.pathname.includes("/pokedex")) {
            presenceData.smallImageKey = "pokeball";
            presenceData.smallImageText = "Pokédex";
            const search = document.querySelector("#search_input");
            if (document.querySelector(".pokemon-detail__profile") !== null) {
                const pdexID = await presence.getSetting("pdexID");
                const name = document.querySelector(".pokemon-slider__main-name")
                    .textContent;
                const number = document.querySelector(".pokemon-slider__main-no")
                    .textContent;
                presenceData.details = "Viewing Pokémon:";
                if (pdexID) {
                    presenceData.state = name + " (#" + number + ")";
                }
                else {
                    presenceData.state = name;
                }
            }
            else if (search !== null && search.value !== "") {
                if (search.value.length > 2) {
                    presenceData.details = "Pokédex - Searching for:";
                    presenceData.state = search.value;
                }
                else {
                    presenceData.details = "Pokédex";
                    presenceData.state = "Searching something up...";
                }
                presenceData.largeImageKey = "pokeball";
                presenceData.smallImageKey = "search";
            }
            else {
                presenceData.details = "Pokédex";
                presenceData.state = "Browsing...";
            }
        }
        else if (document.location.pathname.includes("/card")) {
            presenceData.largeImageKey = "tcg";
            if (document.querySelector(".article-detail__title") !== null) {
                presenceData.details = "Viewing extension pack:";
                presenceData.state = document.querySelector(".article-detail__title").textContent;
            }
            else if (document.location.pathname.includes("/map")) {
                presenceData.details = "Viewing the map";
            }
            else {
                presenceData.details = "Reading about the";
                presenceData.state = "Trading Card Game";
                presenceData.smallImageKey = "reading;";
            }
        }
        else if (document.location.pathname.includes("/pokemoncenter")) {
            presenceData.details = "Reading about the";
            presenceData.state = "Pokémon Center";
            presenceData.smallImageKey = "reading";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsU0FBUyxhQUFhO0lBQ3BCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ25ELFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDaEM7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBT0QsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM3QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3pFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFcEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxhQUFhO0tBQzdCLENBQUM7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