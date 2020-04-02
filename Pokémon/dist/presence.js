let presence = new Presence({
    clientId: "684885381728043048"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
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
            let title = document.querySelector(".full-article > h1");
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
            let title = document.querySelector(".full-article > h1");
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
            let search = document.querySelector("#searchInput");
            if (document.querySelector(".pokedex-pokemon-pagination-title > div") !==
                null) {
                let pdexID = await presence.getSetting("pdexID");
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
            let title = document.querySelector(".full-article > h1");
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
            let title = document.querySelector(".full-article > h1");
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
            (document.querySelector("body > nav > div.content-wrapper > ul > li.home > a")).href == document.URL) {
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
                let title = document.querySelector(".full-article > h1");
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
            let input = (document.querySelector("#elMainSearchInput"));
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
            let video = document.querySelector("video");
            let timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            presenceData.smallImageKey = video.paused ? "pause" : "play";
            presenceData.smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            let season = document
                .querySelector(".header-bar-small > span:nth-child(2)")
                .textContent.trim();
            let episode = document
                .querySelector(".header-bar-small > span:nth-child(4)")
                .textContent.split(" - ")[0]
                .trim();
            let title = document
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
            let title = document.querySelector(".section-title");
            let tag = document.querySelector(".section-title > span");
            let publish = document.querySelector(".section-title > small");
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
            let title = document.querySelector(".medium-title");
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
            let search = (document.querySelector("#word.form-control"));
            if (document.querySelector("body > div.single_header_wrap > div > h1") !==
                null) {
                let pdexID = await presence.getSetting("pdexID");
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
            let title = document.querySelector(".medium-title");
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
            let title = document.querySelector(".medium-title");
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
            let title = document.querySelector(".section-title");
            let tag = document.querySelector(".section-title > span");
            let publish = document.querySelector(".section-title > small");
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
            else if ((document.querySelector("#header-top-menu > li.active > a")).href.includes("/event")) {
                presenceData.details = "Viewing event:";
                presenceData.state = document.querySelector(".medium-title").textContent;
            }
            else if (document.location.pathname.includes("/cards")) {
                let input = document.querySelector("#search_text");
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
            let title = document.querySelector(".m-ttl-top") ||
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
            let title = document.querySelector(".m-ttl-top");
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
            let title = document.querySelector(".m-ttl-top");
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
            let title = document.querySelector(".m-ttl-hd");
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
                presenceData.state = (document.querySelector("#main > h1 > img")).alt;
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
                let tags = document.querySelector(".detailCalenderEventArea > section:nth-child(1) > ul > li:nth-child(1) > div > div.List_body > ul");
                let warning = document.querySelector(".detailCalenderEventArea > section:nth-child(1) > ul > li:nth-child(1) > div > div.List_body > div");
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
            let search = document.querySelector("#search_input");
            if (document.querySelector(".pokemon-detail__profile") !== null) {
                let pdexID = await presence.getSetting("pdexID");
                let name = document.querySelector(".pokemon-slider__main-name")
                    .textContent;
                let number = document.querySelector(".pokemon-slider__main-no")
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
function settingSetter() {
    if (document.location.pathname.includes("/pokedex")) {
        presence.showSetting("pdexID");
    }
    else {
        presence.hideSetting("pdexID");
    }
}
function getTimestamps(videoTime, videoDuration) {
    let startTime = Date.now();
    let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxhQUFhO0tBQzVCLENBQUM7SUFFRixhQUFhLEVBQUUsQ0FBQztJQUVoQixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUU1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLGlCQUFpQixFQUFFO1FBQ2hELElBQ0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQ3JELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztZQUN0RCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUM7WUFDdkQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1lBQ3ZELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztZQUN4RCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENB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