var presence = new Presence({
    clientId: '772971071673860127'
});
presence.on("UpdateData", () => {
    var article = document.querySelector('.clmb08 article');
    if (article) {
        let title;
        title = document.querySelector('.ttl-cn.dfl.fa-film h2').innerText;
        let views;
        views = document.querySelector('aside.vdcl.clma12d08 div.ctgtgs p.fa-folder').innerText.split(/ +/g)[1];
        let presenceData = {
            details: title ? title.slice(45) + '...' : "Title not found",
            state: views ? typeof (views) === 'string' ? parseInt(views).toLocaleString('en') : views.toLocaleString('en') + ' views' : 'Unknown views'
        };
        presence.setTrayTitle();
        if (title !== null && views !== null) {
            presence.setActivity(presenceData);
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
