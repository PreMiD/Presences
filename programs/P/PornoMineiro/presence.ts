var presence = new Presence({
    clientId: '772971071673860127'
});

presence.on("UpdateData", () => {

  var article: any = document.querySelector(
    '.clmb08 article'
  );

  if(article) {

    let title: any;
    title = (document.querySelector('.ttl-cn.dfl.fa-film h2') as any).innerText;

    let views: any;
    views = (document.querySelector('aside.vdcl.clma12d08 div.ctgtgs p.fa-folder') as any).innerText.split(/ +/g)[1];

    let presenceData: any = {
        details: title ? title.slice(45) + '...' : "Title not found",
        state: views ? typeof(views) === 'string' ? parseInt(views).toLocaleString('en') : views.toLocaleString('en') + ' views' : 'Unknown views'
    }

    presence.setTrayTitle();

    if(title !== null && views !== null) {
      presence.setActivity(presenceData);
    }

  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }

});