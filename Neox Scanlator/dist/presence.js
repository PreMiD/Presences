var presence = new Presence({
    clientId: "704585837949747330"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    const path = document.location.pathname;
    let PesquisaTexto, UsuarioTexto, OrdenarTexto, OrdenarTextoObra, GeneroTexto, StatusContaTexto, BlogText, opcaoLeitor, tipoObra, generoObra, spanObra, nomeObra, nomeObraLeitor, capituloLeitor, seasonLeitor, paginaLeitor, postagemData;
    if (path.startsWith("/newsite/") || path.startsWith("/newsite")) {
        if (path == "/newsite/" || path == "/newsite") {
            if (document.title.includes("Resultados da pesquisa por")) {
                PesquisaTexto = document.querySelector("body > div.wrap > div.body-wrap > div > div.c-search-header__wrapper > div > div > form > label > input");
                presenceData.details = "Pesquisando por:";
                presenceData.state = PesquisaTexto.value;
            }
            else {
                UsuarioTexto = document.querySelector("body > div.wrap > div > header > div.c-sub-header-nav.with-border.hide-sticky-menu > div > div > div.c-modal_item > div > span");
                if (UsuarioTexto != null) {
                    presenceData.details =
                        "Usuário: " +
                            UsuarioTexto.innerText.slice(UsuarioTexto.innerText.search(",") + 1);
                }
                presenceData.state = "Página inicial";
            }
        }
        else if (path.includes("/projects/")) {
            presenceData.details = "Vendo a lista de projetos";
            OrdenarTexto = document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active");
            if (OrdenarTexto != null) {
                presenceData.state = "Ordenar por: " + OrdenarTexto.innerText;
            }
        }
        else if (path.includes("/manga-genre/")) {
            OrdenarTextoObra = document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active");
            GeneroTexto = document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.entry-header > div > div > h1");
            presenceData.details = "Gênero: " + GeneroTexto.innerText;
            if (document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active")) {
                presenceData.state = "Ordenar por: " + OrdenarTextoObra.innerText;
            }
        }
        else if (path.includes("/user-settings/")) {
            StatusContaTexto = document.querySelector("#post-11 > div.entry-content > div > div > div.col-md-3.col-sm-3 > div > ul > li.active");
            presenceData.details = "Minha Conta";
            presenceData.state = StatusContaTexto.innerText;
        }
        else if (path.includes("/blog")) {
            BlogText = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div.c-blog__heading.style-2.font-heading.no-icon > h1");
            presenceData.details = document.title.slice(0, document.title.search("-") - 15);
            presenceData.state =
                BlogText.innerText.slice(0, 1) +
                    BlogText.innerText.slice(1).toLowerCase();
        }
        else if (path.includes("/manga/")) {
            if (path.split("/").length - 1 == 4) {
                tipoObra = document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.tab-summary > div.summary_content_wrap > div > div.post-content > div:nth-child(9) > div.summary-content");
                generoObra = document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.c-breadcrumb-wrapper > div > ol > li:nth-child(3) > a");
                presenceData.state = tipoObra.innerText + " | " + generoObra.innerText;
                nomeObra = document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1");
                spanObra = document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1 > span");
                if (spanObra != null) {
                    presenceData.details = nomeObra.innerText.replace(spanObra.innerText, "");
                }
                else {
                    presenceData.details = nomeObra.innerText;
                }
            }
            else if (path.includes("capitulo") &&
                document.title.includes("Capítulo")) {
                seasonLeitor = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.select-view > div.c-selectpicker.selectpicker_volume > label > select");
                paginaLeitor = document.getElementById("single-pager");
                capituloLeitor = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li.active");
                nomeObraLeitor = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li:nth-child(3) > a");
                opcaoLeitor = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.select-view > div.c-selectpicker.selectpicker_load > label > select > option[selected='selected']");
                if (opcaoLeitor.innerText == "Paginação") {
                    if (seasonLeitor != null) {
                        presenceData.details =
                            nomeObraLeitor.innerText +
                                " | " +
                                seasonLeitor[seasonLeitor.selectedIndex].innerText;
                        presenceData.state =
                            capituloLeitor.innerText +
                                " | " +
                                (paginaLeitor.selectedIndex + 1) +
                                "/" +
                                paginaLeitor[0].innerText.slice(paginaLeitor[0].innerText.search("/") + 1, paginaLeitor[0].innerText.search("/") + 6);
                    }
                    else {
                        presenceData.details = nomeObraLeitor.innerText;
                        presenceData.state =
                            capituloLeitor.innerText +
                                " | " +
                                (paginaLeitor.selectedIndex + 1) +
                                "/" +
                                paginaLeitor[0].innerText.slice(paginaLeitor[0].innerText.search("/") + 1, paginaLeitor[0].innerText.search("/") + 6);
                    }
                }
                else if (opcaoLeitor.innerText == "Longstripe") {
                    if (seasonLeitor != null) {
                        presenceData.details =
                            nomeObraLeitor.innerText +
                                " | " +
                                seasonLeitor[seasonLeitor.selectedIndex].innerText;
                        presenceData.state = capituloLeitor.innerText + " | Longstripe";
                    }
                    else {
                        presenceData.details = nomeObraLeitor.innerText;
                        presenceData.state = capituloLeitor.innerText + " | Longstripe";
                    }
                }
            }
        }
        else if (document.querySelector("div.entry-header > div > div.entry-meta > div.post-on") !== null) {
            postagemData = document.querySelector("div.entry-header > div > div.entry-meta > div.post-on");
            if (postagemData.innerText.includes("postado em")) {
                presenceData.details = "Postagem";
                presenceData.state = document.title.slice(0, document.title.search("-") - 15);
            }
        }
        else if (path.split("/").length - 1 == 3) {
            presenceData.details = document.title.slice(0, document.title.search("-") - 15);
        }
    }
    else {
        presence.setTrayTitle();
        presence.setActivity();
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0tBQzlDLENBQUM7SUFDRixNQUFNLElBQUksR0FBUSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUM3QyxJQUFJLGFBQWtCLEVBQ3BCLFlBQWlCLEVBQ2pCLFlBQWlCLEVBQ2pCLGdCQUFxQixFQUNyQixXQUFnQixFQUNoQixnQkFBcUIsRUFDckIsUUFBYSxFQUNiLFdBQWdCLEVBQ2hCLFFBQWEsRUFDYixVQUFlLEVBQ2YsUUFBYSxFQUNiLFFBQWEsRUFDYixjQUFtQixFQUNuQixjQUFtQixFQUNuQixZQUFpQixFQUNqQixZQUFpQixFQUNqQixZQUFpQixDQUFDO0lBQ3BCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQy9ELElBQUksSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO1lBQzdDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsRUFBRTtnQkFDekQsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLHlHQUF5RyxDQUMxRyxDQUFDO2dCQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7Z0JBQzFDLFlB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