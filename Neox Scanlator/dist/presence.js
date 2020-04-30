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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUNILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ2pDLE1BQU0sWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0tBQ2hELENBQUM7SUFDRixNQUFNLElBQUksR0FBUSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUM3QyxJQUFJLGFBQWtCLEVBQUUsWUFBaUIsRUFBRSxZQUFpQixFQUFFLGdCQUFxQixFQUFFLFdBQWdCLEVBQUUsZ0JBQXFCLEVBQUUsUUFBYSxFQUFFLFdBQWdCLEVBQUUsUUFBYSxFQUFFLFVBQWUsRUFBRSxRQUFhLEVBQUUsUUFBYSxFQUFFLGNBQW1CLEVBQUUsY0FBbUIsRUFBRSxZQUFpQixFQUFFLFlBQWlCLEVBQUUsWUFBaUIsQ0FBQztJQUMvVCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM3RCxJQUFHLElBQUksSUFBSSxXQUFXLElBQUksSUFBSSxJQUFJLFVBQVUsRUFBRTtZQUMxQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLEVBQUU7Z0JBQ3ZELGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHlHQUF5RyxDQUFDLENBQUM7Z0JBQ2xKLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7Z0JBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQzthQUM1QztpQkFBTTtnQkFDSCxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnSUFBZ0ksQ0FBQyxDQUFDO2dCQUN4SyxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7b0JBQ3RCLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUM3RztnQkFDRCxZQUFZLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO2FBQ3pDO1NBQ0o7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDcEMsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztZQUNuRCxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrT0FBa08sQ0FBQyxDQUFDO1lBQzFRLElBQUcsWUFBWSxJQUFJLElBQUksRUFBRTtnQkFDckIsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQzthQUNqRTtTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ3ZDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa09BQWtPLENBQUMsQ0FBQztZQUM5USxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx5TEFBeUwsQ0FBQyxDQUFDO1lBQ2hPLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDMUQsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGtPQUFrTyxDQUFDLEVBQUU7Z0JBQzVQLFlBQVksQ0FBQyxLQUFLLEdBQUcsZUFBZSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQzthQUNyRTtTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDekMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx5RkFBeUYsQ0FBQyxDQUFDO1lBQ3JJLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1lBQ3JDLFlBQVksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1NBQ25EO2FBQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hDLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdMQUFnTCxDQUFDLENBQUM7WUFDcE4sWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDaEYsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEc7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbkMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscU1BQXFNLENBQUMsQ0FBQztnQkFDek8sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0pBQWtKLENBQUMsQ0FBQztnQkFDeEwsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUN2RSxRQUFRLEdBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyw0R0FBNEcsQ0FBQyxDQUFDO2dCQUMvSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtSEFBbUgsQ0FBQyxDQUFDO2dCQUN2SixJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDN0U7cUJBQU07b0JBQ0gsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO2lCQUM3QzthQUNKO2lCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDekUsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNE1BQTRNLENBQUMsQ0FBQztnQkFDcFAsWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3ZELGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtNQUFrTSxDQUFDLENBQUM7Z0JBQzVPLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDRNQUE0TSxDQUFDLENBQUM7Z0JBQ3RQLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdPQUF3TyxDQUFDLENBQUM7Z0JBQy9RLElBQUcsV0FBVyxDQUFDLFNBQVMsSUFBSSxXQUFXLEVBQUU7b0JBQ3JDLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTt3QkFDdEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDN0csWUFBWSxDQUFDLEtBQUssR0FBSSxjQUFjLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUM7cUJBQy9OO3lCQUFNO3dCQUNILFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQzt3QkFDaEQsWUFBWSxDQUFDLEtBQUssR0FBSSxjQUFjLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUM7cUJBQy9OO2lCQUNKO3FCQUFNLElBQUksV0FBVyxDQUFDLFNBQVMsSUFBSSxZQUFZLEVBQUU7b0JBQzlDLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTt3QkFDdEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDN0csWUFBWSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztxQkFDbkU7eUJBQU07d0JBQ0gsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO3dCQUNoRCxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO3FCQUNuRTtpQkFDSjthQUNKO1NBQ0o7YUFBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsdURBQXVELENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDakcsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUMvRixJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUMvQyxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztnQkFDbEMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDakY7U0FDSjthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDbkY7S0FDSjtTQUFNO1FBQ0gsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUMxQjtJQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDLENBQUMifQ==
