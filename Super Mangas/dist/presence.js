let presence = new Presence({
    clientId: "650916071360167957"
});
let startedBrowsingTimestamp = Math.floor(Date.now() / 1000), mangaName, mangaChapter, path, host, presenceData = {
    largeImageKey: "smlg",
    startTimestamp: startedBrowsingTimestamp
};
presence.on("UpdateData", async () => {
    presenceData: presenceData = {
        largeImageKey: "smlg"
    };
    if (host == "www.supermangas.site" && path == "/") {
        presenceData.details = "Página Inicial";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/perfil")) {
        presenceData.details =
            "Perfil: " +
                document.querySelector("#corpo > header > div.perfil_header_photos > div.perfil_box_photo > h1").innerText;
        if (document.querySelector("#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull") === null) {
            presenceData.state = "Perfil sem descrição.";
            presence.setActivity(presenceData);
            delete presenceData.startTimestamp;
        }
        else {
            presenceData.state = document.querySelector("#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull").innerText;
            presence.setActivity(presenceData);
            delete presenceData.startTimestamp;
        }
        delete presenceData.startTimestamp;
        presence.setActivity(presenceData);
    }
    if (document.title.includes("Top Conteúdo")) {
        presenceData.details = "Procurando Mangá";
        presenceData.state = document.querySelector("#corpo > div.conteudoBox > h1").innerText;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Procurando";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if ((host == "www.supermangas.site" && path.startsWith("/manga/")) ||
        (path.startsWith("/manhwa/") && path.replace("/manga/", "")) ||
        (path.startsWith("/manhua/") && path.replace("/manga/", ""))) {
        if (document.title.includes("Capítulo", "")) {
            mangaPage = document.querySelector("#corpo > div.conteudoBox.box_suport > div.capBox > div.capPageContent > div.capMenu.capMenuFixedTop > select.capListPage > option.capituloPage.active");
            mangaName = document.querySelector("#corpo > div:nth-child(3) > div.videoSidebar > div.capaCategory > div > h3 > a");
            mangaChapter = document.querySelector("#corpo > div.conteudoBox.box_suport > div.capBox.focus > div.capPageContent > div.capMenu.capMenuFixedTop.fixed > select.capList > option:nth-child(1)");
            presenceData.details = "Lendo: " + mangaName.innerText;
            presenceData.startTimestamp = startedBrowsingTimestamp;
            presenceData.state =
                mangaChapter.innerText +
                    " - " +
                    mangaPage.textContent.replace("Pagina", "Página");
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Visualizando Mangá";
            presenceData.state =
                document.querySelector("#corpo > div:nth-child(1) > div:nth-child(2) > div.boxBarraInfo > h1").innerText +
                    " - " +
                    document.querySelector("#corpo > div:nth-child(1) > div:nth-child(2) > div.boxAnime > ul > div > li:nth-child(1) > span").innerText +
                    " Capítulos";
            presenceData.smallImageText = "Visualizando";
            presenceData.smallImageKey = "visualizando";
            presenceData.startTimestamp = startedBrowsingTimestamp;
            presence.setActivity(presenceData);
        }
    }
    else if (host == "www.supermangas.site" && path.startsWith("/arte")) {
        presenceData.details = "Mangás do Desenhista";
        presenceData.state = document
            .querySelector("#corpo > div.conteudoBox > div.boxBarraInfo")
            .innerText.replace("Conteúdos do Desenhista", "");
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/contato")) {
        presenceData.details = "Fale Conosco";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/suporte")) {
        presenceData.details = "Página de Suporte";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/tutorial")) {
        presenceData.details = "Página de Tutorial do Site";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/hunter")) {
        presenceData.details = "Página do Hunter";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/sugestao")) {
        presenceData.details = "Página de Sugestões e Criticas";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/sugestao")) {
        presenceData.details = "Página de Sugestões e Criticas";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/indicacao")) {
        presenceData.details = "Página de Indicações de Manga";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" &&
        path.startsWith("/termos-de-uso.php")) {
        presenceData.details = "TOS - Termos de Uso";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/lista")) {
        presenceData.details = "Procurando Mangá";
        presenceData.state = "Lista de Mangás";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Procurando";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/lancamento")) {
        presenceData.details = "Procurando Mangá";
        if (document.URL.includes("seg")) {
            presenceData.state = "Lançamentos - Segunda";
        }
        else if (document.URL.includes("ter")) {
            presenceData.state = "Lançamentos - Terça";
        }
        else if (document.URL.includes("qua")) {
            presenceData.state = "Lançamentos - Quarta";
        }
        else if (document.URL.includes("qui")) {
            presenceData.state = "Lançamentos - Quinta";
        }
        else if (document.URL.includes("sex")) {
            presenceData.state = "Lançamentos - Sexta";
        }
        else if (document.URL.includes("sab")) {
            presenceData.state = "Lançamentos - Sábado";
        }
        else if (document.URL.includes("dom")) {
            presenceData.state = "Lançamentos - Domingo";
        }
        else if (document.URL.includes("todos")) {
            presenceData.state = "Lançamentos";
        }
        else {
            presenceData.state = "Lançamentos";
        }
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Procurando";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
    else if (document.URL.includes("/top-user")) {
        let rank = document.querySelector("#corpo > div:nth-child(4) > div.postHomeVideoBox > div.menu_box_action > p:nth-child(2) > a:nth-child(1)");
        if (rank) {
            if (document.URL.includes("moedas")) {
                presenceData.details = "Top User Rank de Moedas";
            }
            else if (document.URL.includes("acessos")) {
                presenceData.details = "Top User Rank de Acessos";
            }
            else if (document.URL.includes("hunter")) {
                presenceData.details = "Top User Rank do Hunter";
            }
            else if (document.URL.includes("image")) {
                presenceData.details = "Top User Rank de Imagens Enviadas";
            }
            presenceData.details = "Top User Rank de Moedas";
            presenceData.state = "Seu rank é " + rank.innerText;
            presence.setActivity(presenceData);
        }
        else {
            if (document.URL.includes("moedas")) {
                presenceData.details = "Top User Rank de Moedas";
            }
            else if (document.URL.includes("acessos")) {
                presenceData.details = "Top User Rank de Acessos";
            }
            else if (document.URL.includes("hunter")) {
                presenceData.details = "Top User Rank do Hunter";
            }
            else if (document.URL.includes("image")) {
                presenceData.details = "Top User Rank de Imagens Enviadas";
            }
            presenceData.details = "Top User Rank de Moedas";
            presenceData.state = "Seu rank é 0°";
            presence.setActivity(presenceData);
        }
        presence.setActivity(presenceData);
    }
    else if (host == "www.supermangas.site" && path.startsWith("/genero")) {
        presenceData.details = "Procurando Mangá";
        if (document.title.includes("Genero ")) {
            presenceData.state =
                "Gênero: " +
                    document.title.replace("Genero ", "").replace("- Super Mangas", "");
        }
        else {
            presenceData.state = "Gênero";
        }
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Procurando";
        presenceData.startTimestamp = startedBrowsingTimestamp;
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksd0JBQXdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQzNELFNBQWlCLEVBQ2pCLFlBQW9CLEVBQ3BCLElBQWdDLEVBQ2hDLElBQWdDLEVBQ2hDLFlBQVksR0FBaUI7SUFDNUIsYUFBYSxFQUFFLE1BQU07SUFDckIsY0FBYyxFQUFFLHdCQUF3QjtDQUN4QyxDQUFDO0FBQ0gsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsWUFBWSxFQUFFLFlBQVksR0FBRztRQUM1QixhQUFhLEVBQUUsTUFBTTtLQUNyQixDQUFDO0lBRUYsSUFBSSxJQUFJLElBQUksc0JBQXNCLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtRQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1FBQ3hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsd0JBQXdCLENBQUM7UUFDdkQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNuQztTQUFNLElBQUksSUFBSSxJQUFJLHNCQUFzQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDeEUsWUFBWSxDQUFDLE9BQU87WUFDbkIsVUFBVTtnQkFDVixRQUFRLENBQUMsYUFBYSxDQUNyQix3RUFBd0UsQ0FDeEUsQ0FBQyxTQUFTLENBQUM7UUFDYixJQUNDLFFBQVEsQ0FBQyxhQUFhLENBQ3JCLHlEQUF5RCxDQUN6RCxLQUFLLElBQUksRUFDVDtZQUNELFlBQVksQ0FBQyxLQUFLLEdBQUcsdUJBQXVC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