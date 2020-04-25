var presence = new Presence({
    clientId: "703478712858968094"
});

presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "logo"
    };
    if(document.location.pathname == '/' && document.title.startsWith('HypeScience')) {
        data.details = 'Página inicial';  
    } 
    else if (document.location.pathname.startsWith('/categoria/')) {
        data.details = 'Categoria';
        data.state = document.querySelector('header.content-header.max h1.title.title--big.title--border span.title__text').textContent;
    } 
    else if (document.title.includes('Busca por')) {
        data.details = 'Pesquisando por:';
        data.state = document.querySelector('header.content-header.max h1.title.title--big.title--border span.title__text').textContent.slice(6);
    }
    else if (document.location.pathname == '/contato/') {
        data.details = 'Contato';
    }
    else if (document.location.pathname == '/cc/') {
        data.details = 'Licença de reprodução';
    }
    else if (document.location.pathname == '/politica-de-privacidade/') {
        data.details = 'Política de privacidade'
    }
    else if (document.location.pathname == '/login/') {
        data.details = 'Login';
    }
    else if ( document.querySelector('div.breadcrumbs.content-header__categories') != null || undefined && document.location.pathname.match('/', /^\D/, '/')) {
        data.details = 'Matéria';
        data.state = document.querySelector('header.content-header.max h1.title.title--content span').textContent;
    }
    
    presence.setActivity(data);
});