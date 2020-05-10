const presence = new Presence({
  clientId: "674236194053160971"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "qdss"
  };

  if (document.location.pathname == "/") {
    if (document.location.href.startsWith("https://www.qdssclub.com/?page=")) {

      let hpforumpagenumber = document.location.href;

      data.details = "Nella homepage";
      data.state = "Sfoglia il forum. Pag: " + hpforumpagenumber.replace("https://www.qdssclub.com/?page=", "");
      data.startTimestamp = browsingStamp;

    } else if (document.location.href.startsWith("https://www.qdssclub.com/?articoli=")) {

      let hparticolipagenumber = document.location.href;

      data.details = "Nella homepage";
      data.state = "Sfoglia gli articoli. Pag: " + hparticolipagenumber.replace("https://www.qdssclub.com/?articoli=", "");
      data.startTimestamp = browsingStamp;

    } else {

      data.details = "Nella homepage";
      data.startTimestamp = browsingStamp;

    }

  } else if (document.location.pathname.startsWith("/faq")) {

    data.details = "Nella scheda FAQ";
    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.startsWith("/contatti")) {

    data.details = "Vuole contattare";
    data.state = "Quei Due Sul Server";
    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.startsWith("/utente/profilo")) {

    data.details = "Sta visualizzando";
    data.state = "il suo profilo";
    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.startsWith("/cookies")) {

    data.details = "Legge le informazioni";
    data.state = "sui Cookies";
    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.startsWith("/privacy")) {

    data.details = "Legge le informazioni";
    data.state = "sulla Privcay";
    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.startsWith("/disclaimer")) {

    data.details = "Legge i Termini e le";
    data.state = "Condizioni di utilizzo";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums")) {

    data.details = "Sfoglia il forum";
    data.state = "Pagina: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/Forums/")) {

    data.details = "Sfoglia il forum";
    data.state = "Pagina: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.startsWith("https://www.qdssclub.com/forums?page=")) {

    let fforumpagenumber = document.location.href;

    data.details = "Sfoglia il forum";
    data.state = "Pagina: " + fforumpagenumber.replace("https://www.qdssclub.com/forums?page=", "");
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/Consigli")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Consigli Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/Consigli/")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Consigli Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/Consiglipage=")) {

    let c1cforumpagenumber = document.location.href;

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Consigli Pag: " + c1cforumpagenumber.replace("https://www.qdssclub.com/forums/category/Consiglipage=", "");
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/consigli")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Consigli Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/consigli/")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Consigli Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/consiglipage=")) {

    let c2cforumpagenumber = document.location.href;

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Consigli Pag: " + c2cforumpagenumber.replace("https://www.qdssclub.com/forums/category/consiglipage=", "");
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/Salotto")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Salotto Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/Salotto/")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Salotto Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/Salottopage=")) {

    let s1sforumpagenumber = document.location.href;

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Salotto Pag: " + s1sforumpagenumber.replace("https://www.qdssclub.com/forums/category/Salottopage=", "");
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/salotto")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Salotto Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/salotto/")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Salotto Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/salottopage=")) {

    let s2sforumpagenumber = document.location.href;

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Salotto Pag: " + s2sforumpagenumber.replace("https://www.qdssclub.com/forums/category/salottopage=", "");
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/Conosciamoci")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Conosciamoci Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/Conosciamoci/")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Conosciamoci Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/Conosciamocipage=")) {

    let c1coforumpagenumber = document.location.href;

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Conosciamoci Pag: " + c1coforumpagenumber.replace("https://www.qdssclub.com/forums/category/Conosciamocipage=", "");
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/conosciamoci")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Conosciamoci Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.endsWith("/forums/category/conosciamoci/")) {

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Conosciamoci Pag: 1";
    data.startTimestamp = browsingStamp;

  } else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/conosciamocipage=")) {

    let c2coforumpagenumber = document.location.href;

    data.details = "Sfoglia il forum";
    data.state = "Categoria: Conosciamoci Pag: " + c2coforumpagenumber.replace("https://www.qdssclub.com/forums/category/conosciamocipage=", "");
    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.startsWith("/forums/discussion/")) {

    let discussionname = document.querySelector(".text-center h1").textContent;

    data.details = "Legge la discussione:";
    data.state = discussionname;
    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.startsWith("/articolo")) {

    let articoloname = document.querySelector(".text-center h3").textContent;

    data.details = "Legge l'articolo:";
    data.state = articoloname;
    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.startsWith("/login")) {

    data.details = "Sta cercando di fare";
    data.state = "l'accesso";
    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.startsWith("/password")) {

    data.details = "Sta cercando di fare";
    data.state = "l'accesso";
    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.startsWith("/register")) {

    data.details = "Sta cercando di";
    data.state = "registrarsi";
    data.startTimestamp = browsingStamp;

  } else if (document.location.pathname.startsWith("/convalida")) {

    data.details = "Sta cercando di";
    data.state = "registrarsi";
    data.startTimestamp = browsingStamp;

  } else {

    data.details = "Navigando...";
    data.startTimestamp = browsingStamp;

  }

});
