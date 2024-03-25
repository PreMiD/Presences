const presence = new Presence({
    clientId: "1221866611611402363",
});
const browsingTimestamp = Math.floor(Date.now() / 1000);

const enum AssetsRadios {
    Logo = "https://static.radios.com.br/img/logo-radiosnet-512-solid.png",
}

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: AssetsRadios.Logo,
        startTimestamp: browsingTimestamp,
    };

    if (document.location.pathname === "/")
        presenceData.details = "Página Inicial";
    else if (document.location.pathname.includes("/favoritos")) {
        presenceData.details = "Favoritos";
        presenceData.smallImageKey = Assets.Reading;
    } else if (document.location.pathname.includes("/lista/pais/brasil/33")) {
        presenceData.details = "Rádios do Brasil";
        presenceData.smallImageKey = Assets.Search;
    } else if (document.location.pathname.includes("/lista/pais")) {
        const hasCountry =
            document.querySelector(".page-header")?.innerHTML;
        if (hasCountry === "Lista de países") {
            presenceData.details = "Rádios Internacionais";
            presenceData.smallImageKey = Assets.Search;
        } else {
            const countryName = document
                .querySelector(".page-header")?.innerHTML.split("<small>")[1].split("</small>")[0];
            presenceData.details = `Navegando pelas rádios de "${countryName}"`;
            presenceData.smallImageKey = Assets.Search;
        }
    } else if (document.location.pathname.includes("/radio/cidade")) {
        const cityName = document
            .querySelector(".page-header")?.innerHTML.split("<small>")[1].split("</small>")[0];
        presenceData.details = `Navegando pelas rádios de "${cityName}"`;
        presenceData.smallImageKey = Assets.Search;
    } else if (document.location.pathname.includes("/lista/segmento")) {
        presenceData.details = "Gêneros";
        presenceData.smallImageKey = Assets.Search;
    } else if (document.location.pathname.includes("/radio/segmento")) {
        const genre = document
            .querySelector(".page-header")?.innerHTML.split("<small>")[1].split("</small>")[0];

        presenceData.details = `Navegando pelo gênero "${genre}"`;
        presenceData.smallImageKey = Assets.Search;
    } else if (document.location.pathname.includes("/futebol")) {
        presenceData.details = "Futebol ao Vivo";
        presenceData.smallImageKey = Assets.Search;
    } else if (document.location.pathname.includes("/estatistica")) {
        presenceData.details = "Estatística";
        presenceData.smallImageKey = Assets.Reading;
    } else if (document.location.pathname.includes("/adicionar")) {
        presenceData.details = "Adicionar Rádio";
        presenceData.smallImageKey = Assets.Writing;
    } else if (document.location.pathname.includes("/atualizar")) {
        presenceData.details = "Atualizar Rádio";
        presenceData.smallImageKey = Assets.Writing;
    } else if (document.location.pathname.includes("/excluir")) {
        presenceData.details = "Excluir Rádio";
        presenceData.smallImageKey = Assets.Stop;
    } else if (document.location.pathname.includes("/anunciar")) {
        presenceData.details = "Anunciar Rádio";
        presenceData.smallImageKey = Assets.Live;
    } else if (document.location.pathname.includes("/divulgue")) {
        presenceData.details = "Divulgação";
        presenceData.smallImageKey = Assets.Call;
    } else if (document.location.pathname.includes("/contato")) {
        presenceData.details = "Contato";
        presenceData.smallImageKey = Assets.Call;
    } else if (document.location.pathname.includes("/privacidade")) {
        presenceData.details = "Políticas de Privacidade";
        presenceData.smallImageKey = Assets.Reading;
    } else if (document.location.pathname.includes("/tos")) {
        presenceData.details = "Termos de Serviço";
        presenceData.smallImageKey = Assets.Reading;
    } else if (document.location.pathname.includes("/lista")) {
        const place = document
            .querySelector(".page-header")?.innerHTML.split("<small>")[1].split("</small>")[0];

        presenceData.details = `Navegando pelas rádios de "${place}"`;
        presenceData.smallImageKey = Assets.Search;
    } else if (document.location.pathname.includes("/busca")) {
        presenceData.details = `Buscando por "${
            document.location.search.split("=")[1].split("&")[0]
        }"`;

        presenceData.smallImageKey = Assets.Search;
    } else if (
        document.location.pathname.includes("/aovivo/") ||
        document.location.href.includes("http://play.radios.com.br/")
    ) {
        const station = document
            .querySelector(".info")?.innerHTML.split("<h1>")[1].split("</h1>")[0];

        const state = document
            .querySelector(".info")?.innerHTML.split("<h1>")[1].split("</h1>")[1].split("<h2>")[1].split("</h2>")[0];

        try {
            const slogan = document
                .querySelector(".info")?.innerHTML.split("<h1>")[1].split("</h1>")[1].split("<h2>")[1].split("</h2>")[1].split('"slogan">')[1].split("</p>")[0];
            presenceData.smallImageText = slogan;
        } catch (error) {
            const slogan = "Desde 1997 trazendo o melhor compilado de emissoras de rádio!";
            presenceData.smallImageText = slogan;
        }

        const image = (
            document.querySelector(".img-rounded") as HTMLImageElement
        )?.src;

        presenceData.details = station;
        presenceData.state = state;

        presenceData.largeImageKey = image;

        presenceData.smallImageKey = Assets.PremiereLive;
    }

    presence.setActivity(presenceData);
});