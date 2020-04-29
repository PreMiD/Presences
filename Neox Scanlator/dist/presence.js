var presence = new Presence({
    clientId: "704585837949747330"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    const path = document.location.pathname;
    let PesquisaTexto;
    let UsuarioTexto;
    let OrdenarTexto;
    let OrdenarTextoObra;
    let GeneroTexto;
    let StatusContaTexto;
    let BlogText;
    let opcaoLeitor;
    let tipoObra;
    let generoObra;
    let spanObra;
    let nomeObra;
    let nomeObraLeitor;
    let capituloLeitor;
    let seasonLeitor;
    let paginaLeitor;
    let postagemData;
    if (path.startsWith('/newsite/') || path.startsWith('/newsite')) {
        if (path == '/newsite/' || path == '/newsite') {
            if (document.title.includes('Resultados da pesquisa por')) {
                PesquisaTexto = document.querySelector("body > div.wrap > div.body-wrap > div > div.c-search-header__wrapper > div > div > form > label > input");
                presenceData.details = 'Pesquisando por:';
                presenceData.state = PesquisaTexto.value;
            }
            else {
                UsuarioTexto = document.querySelector("body > div.wrap > div > header > div.c-sub-header-nav.with-border.hide-sticky-menu > div > div > div.c-modal_item > div > span");
                if (UsuarioTexto != null) {
                    presenceData.details = 'Usuário: ' + UsuarioTexto.innerText.slice(UsuarioTexto.innerText.search(',') + 1);
                }
                presenceData.state = 'Página inicial';
            }
        }
        else if (path.includes('/projects/')) {
            presenceData.details = 'Vendo a lista de projetos';
            OrdenarTexto = document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active");
            if (OrdenarTexto != null) {
                presenceData.state = 'Ordenar por: ' + OrdenarTexto.innerText;
            }
        }
        else if (path.includes('/manga-genre/')) {
            OrdenarTextoObra = document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active");
            GeneroTexto = document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.entry-header > div > div > h1");
            presenceData.details = 'Gênero: ' + GeneroTexto.innerText;
            if (document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active")) {
                presenceData.state = 'Ordenar por: ' + OrdenarTextoObra.innerText;
            }
        }
        else if (path.includes('/user-settings/')) {
            StatusContaTexto = document.querySelector("#post-11 > div.entry-content > div > div > div.col-md-3.col-sm-3 > div > ul > li.active");
            presenceData.details = 'Minha Conta';
            presenceData.state = StatusContaTexto.innerText;
        }
        else if (path.includes('/blog')) {
            BlogText = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div.c-blog__heading.style-2.font-heading.no-icon > h1");
            presenceData.details = document.title.slice(0, document.title.search('-') - 15);
            presenceData.state = BlogText.innerText.slice(0, 1) + BlogText.innerText.slice(1).toLowerCase();
        }
        else if (path.includes('/manga/')) {
            if ((path.split('/').length - 1) == 4) {
                tipoObra = document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.tab-summary > div.summary_content_wrap > div > div.post-content > div:nth-child(9) > div.summary-content");
                generoObra = document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.c-breadcrumb-wrapper > div > ol > li:nth-child(3) > a");
                presenceData.state = tipoObra.innerText + ' | ' + generoObra.innerText;
                nomeObra = document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1");
                spanObra = document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1 > span");
                if (spanObra != null) {
                    presenceData.details = nomeObra.innerText.replace(spanObra.innerText, '');
                }
                else {
                    presenceData.details = nomeObra.innerText;
                }
            }
            else if (path.includes('capitulo') && document.title.includes('Capítulo')) {
                seasonLeitor = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.select-view > div.c-selectpicker.selectpicker_volume > label > select");
                paginaLeitor = document.getElementById("single-pager");
                capituloLeitor = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li.active");
                nomeObraLeitor = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li:nth-child(3) > a");
                opcaoLeitor = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.select-view > div.c-selectpicker.selectpicker_load > label > select > option[selected='selected']");
                if (opcaoLeitor.innerText == "Paginação") {
                    if (seasonLeitor != null) {
                        presenceData.details = nomeObraLeitor.innerText + ' | ' + seasonLeitor[seasonLeitor.selectedIndex].innerText;
                        presenceData.state = capituloLeitor.innerText + ' | ' + (paginaLeitor.selectedIndex + 1) + '/' + (paginaLeitor[0].innerText.slice(paginaLeitor[0].innerText.search('/') + 1, paginaLeitor[0].innerText.search('/') + 6));
                    }
                    else {
                        presenceData.details = nomeObraLeitor.innerText;
                        presenceData.state = capituloLeitor.innerText + ' | ' + (paginaLeitor.selectedIndex + 1) + '/' + (paginaLeitor[0].innerText.slice(paginaLeitor[0].innerText.search('/') + 1, paginaLeitor[0].innerText.search('/') + 6));
                    }
                }
                else if (opcaoLeitor.innerText == "Longstripe") {
                    if (seasonLeitor != null) {
                        presenceData.details = nomeObraLeitor.innerText + ' | ' + seasonLeitor[seasonLeitor.selectedIndex].innerText;
                        presenceData.state = capituloLeitor.innerText + ' | Longstripe';
                    }
                    else {
                        presenceData.details = nomeObraLeitor.innerText;
                        presenceData.state = capituloLeitor.innerText + ' | Longstripe';
                    }
                }
            }
        }
        else if (document.querySelector("div.entry-header > div > div.entry-meta > div.post-on") !== null) {
            postagemData = document.querySelector("div.entry-header > div > div.entry-meta > div.post-on");
            if (postagemData.innerText.includes('postado em')) {
                presenceData.details = 'Postagem';
                presenceData.state = document.title.slice(0, document.title.search('-') - 15);
            }
        }
        else if ((path.split('/').length - 1) == 3) {
            presenceData.details = document.title.slice(0, document.title.search('-') - 15);
        }
    }
    else {
        presence.setTrayTitle();
        presence.setActivity();
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUNILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ2pDLE1BQU0sWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0tBQ2hELENBQUM7SUFDRixNQUFNLElBQUksR0FBUSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUM3QyxJQUFJLGFBQWtCLENBQUM7SUFDdkIsSUFBSSxZQUFpQixDQUFDO0lBQ3RCLElBQUksWUFBaUIsQ0FBQztJQUN0QixJQUFJLGdCQUFxQixDQUFDO0lBQzFCLElBQUksV0FBZ0IsQ0FBQztJQUNyQixJQUFJLGdCQUFxQixDQUFDO0lBQzFCLElBQUksUUFBYSxDQUFDO0lBQ2xCLElBQUksV0FBZ0IsQ0FBQztJQUNyQixJQUFJLFFBQWEsQ0FBQztJQUNsQixJQUFJLFVBQWUsQ0FBQztJQUNwQixJQUFJLFFBQWEsQ0FBQztJQUNsQixJQUFJLFFBQWEsQ0FBQztJQUNsQixJQUFJLGNBQW1CLENBQUM7SUFDeEIsSUFBSSxjQUFtQixDQUFDO0lBQ3hCLElBQUksWUFBaUIsQ0FBQztJQUN0QixJQUFJLFlBQWlCLENBQUM7SUFDdEIsSUFBSSxZQUFpQixDQUFDO0lBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzdELElBQUcsSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksVUFBVSxF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
