var presence = new Presence ({
    clientId: "704585837949747330"
});

presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    const path = document.location.pathname;
    if (path.startsWith('/newsite/') || path.startsWith('/newsite')) {
        if(path == '/newsite/' || path == '/newsite') {
            if (document.title.includes('Resultados da pesquisa por')) {
                presenceData.details = 'Pesquisando por:';
                presenceData.state = document.querySelector("body > div.wrap > div.body-wrap > div > div.c-search-header__wrapper > div > div > form > label > input").value;
            } else {
                if (document.querySelector("body > div.wrap > div > header > div.c-sub-header-nav.with-border.hide-sticky-menu > div > div > div.c-modal_item > div > span") != null) {
                    presenceData.details = 'Usuário: ' + document.querySelector("body > div.wrap > div > header > div.c-sub-header-nav.with-border.hide-sticky-menu > div > div > div.c-modal_item > div > span").innerText.slice(document.querySelector("body > div.wrap > div > header > div.c-sub-header-nav.with-border.hide-sticky-menu > div > div > div.c-modal_item > div > span").innerText.search(',') + 1);
                }
                presenceData.state = 'Página inicial';
            };
        } else if (path.includes('/projects/')) {
            presenceData.details = 'Vendo a lista de projetos';
            if(document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active")) {
                presenceData.state = 'Ordenar por: ' + document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active").innerText;
            };
        } else if (path.includes('/manga-genre/')) {
            presenceData.details = 'Gênero: ' + document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.entry-header > div > div > h1").innerText;
            if (document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active")) {
                presenceData.state = 'Ordenar por: ' + document.querySelector("body > div.wrap > div > div.site-content > div.c-page-content.style-1 > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div > div.c-page__content > div.tab-wrap > div > div.c-nav-tabs > ul > li.active").innerText;
            };
        } else if (path.includes('/user-settings/')) {
            presenceData.details = 'Minha Conta';
            presenceData.state = document.querySelector("#post-11 > div.entry-content > div > div > div.col-md-3.col-sm-3 > div > ul > li.active").innerText;
        }  else if (path.includes('/blog')) {
            presenceData.details = document.title.slice(0, document.title.search('-') - 15); 
            presenceData.state = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div.c-blog__heading.style-2.font-heading.no-icon > h1").innerText.slice(0,1) + document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div.main-col.col-md-8.col-sm-8 > div.main-col-inner > div.c-blog__heading.style-2.font-heading.no-icon > h1").innerText.slice(1).toLowerCase();
        } else if (path.includes('/manga/')) {
            if ((path.split('/').length - 1) == 4) {
                presenceData.details = document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.tab-summary > div.summary_content_wrap > div > div.post-content > div:nth-child(9) > div.summary-content").innerText + ' | ' + document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.c-breadcrumb-wrapper > div > ol > li:nth-child(3) > a").innerText;    
                if (document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1 > span") != null) {
                    presenceData.state = document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1").innerText.replace(document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1 > span").innerText, '');
                } else {
                    presenceData.state = document.querySelector("body > div.wrap > div > div.site-content > div > div.profile-manga > div > div > div > div.post-title > h1").innerText;
                };
            } else if (path.includes('capitulo') && document.title.includes('Capítulo')) {
                if(document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.select-view > div.c-selectpicker.selectpicker_load > label > select > option[selected='selected']").innerText == "Paginação") {
                    presenceData.details = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li:nth-child(3) > a").innerText;
                    presenceData.state =  document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li.active").innerText + ' | ' + (document.getElementById("single-pager").selectedIndex + 1) + '/' + (document.getElementById("single-pager")[0].innerText.slice(document.getElementById("single-pager")[0].innerText.search('/') + 1,  document.getElementById("single-pager")[0].innerText.search('/') + 6 ));
                } else {
                    presenceData.details = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li:nth-child(3) > a").innerText;
                    presenceData.state = document.querySelector("body > div.wrap > div > div.site-content > div > div > div > div > div > div > div.c-blog-post > div.entry-header.header > div > div.entry-header_wrap > div > div.c-breadcrumb > ol > li.active").innerText + ' | Longstripe';
                };
            };
        } else if (document.querySelector("div.entry-header > div > div.entry-meta > div.post-on") !== null) {
            if (document.querySelector("div.entry-header > div > div.entry-meta > div.post-on").innerText.includes('postado em')) {
                presenceData.details = 'Postagem';
                presenceData.state = document.title.slice(0, document.title.search('-') - 15); 
            };    
        } else if ((path.split('/').length - 1) == 3) {
            presenceData.details = document.title.slice(0, document.title.search('-') - 15);
        };
    } else {
        presence.setTrayTitle();
        presence.setActivity();
    };
    presence.setActivity(presenceData);
});

