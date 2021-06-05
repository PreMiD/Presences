const presence = new Presence({
  clientId: "674236194053160971"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "qdss"
  };

  const href = document.location.href;
  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname == "/") {
    if (href.startsWith("https://www.qdssclub.com/?page=")) {
      presenceData.details = "Nella homepage";
      presenceData.state =
        "Sfoglia il forum. Pag: " +
        href.replace("https://www.qdssclub.com/?page=", "");
    } else if (href.startsWith("https://www.qdssclub.com/?articoli=")) {
      presenceData.details = "Nella homepage";
      presenceData.state =
        "Sfoglia gli articoli. Pag: " +
        href.replace("https://www.qdssclub.com/?articoli=", "");
    } else {
      presenceData.details = "Nella homepage";
    }
  } else if (document.location.pathname.startsWith("/faq")) {
    presenceData.details = "Nella scheda FAQ";
  } else if (document.location.pathname.startsWith("/contatti")) {
    presenceData.details = "Vuole contattare";
    presenceData.state = "Quei Due Sul Server";
  } else if (document.location.pathname.startsWith("/utente/profilo")) {
    presenceData.details = "Sta visualizzando";
    presenceData.state = "il suo profilo";
  } else if (document.location.pathname.startsWith("/cookies")) {
    presenceData.details = "Legge le informazioni";
    presenceData.state = "sui Cookies";
  } else if (document.location.pathname.startsWith("/privacy")) {
    presenceData.details = "Legge le informazioni";
    presenceData.state = "sulla Privcay";
  } else if (document.location.pathname.startsWith("/disclaimer")) {
    presenceData.details = "Legge i Termini e le";
    presenceData.state = "Condizioni di utilizzo";
  } else if (href.endsWith("/forums")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Pagina: 1";
  } else if (href.endsWith("/Forums/")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Pagina: 1";
  } else if (href.startsWith("https://www.qdssclub.com/forums?page=")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state =
      "Pagina: " + href.replace("https://www.qdssclub.com/forums?page=", "");
  } else if (href.endsWith("/forums/category/Consigli")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Consigli Pag: 1";
  } else if (href.endsWith("/forums/category/Consigli/")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Consigli Pag: 1";
  } else if (
    href.startsWith("https://www.qdssclub.com/forums/category/Consiglipage=")
  ) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state =
      "Categoria: Consigli Pag: " +
      href.replace(
        "https://www.qdssclub.com/forums/category/Consiglipage=",
        ""
      );
  } else if (href.endsWith("/forums/category/consigli")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Consigli Pag: 1";
  } else if (href.endsWith("/forums/category/consigli/")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Consigli Pag: 1";
  } else if (
    href.startsWith("https://www.qdssclub.com/forums/category/consiglipage=")
  ) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state =
      "Categoria: Consigli Pag: " +
      href.replace(
        "https://www.qdssclub.com/forums/category/consiglipage=",
        ""
      );
  } else if (href.endsWith("/forums/category/Salotto")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Salotto Pag: 1";
  } else if (href.endsWith("/forums/category/Salotto/")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Salotto Pag: 1";
  } else if (
    href.startsWith("https://www.qdssclub.com/forums/category/Salottopage=")
  ) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state =
      "Categoria: Salotto Pag: " +
      href.replace("https://www.qdssclub.com/forums/category/Salottopage=", "");
  } else if (href.endsWith("/forums/category/salotto")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Salotto Pag: 1";
  } else if (href.endsWith("/forums/category/salotto/")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Salotto Pag: 1";
  } else if (
    href.startsWith("https://www.qdssclub.com/forums/category/salottopage=")
  ) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state =
      "Categoria: Salotto Pag: " +
      href.replace("https://www.qdssclub.com/forums/category/salottopage=", "");
  } else if (href.endsWith("/forums/category/Conosciamoci")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Conosciamoci Pag: 1";
  } else if (href.endsWith("/forums/category/Conosciamoci/")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Conosciamoci Pag: 1";
  } else if (
    href.startsWith(
      "https://www.qdssclub.com/forums/category/Conosciamocipage="
    )
  ) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state =
      "Categoria: Conosciamoci Pag: " +
      href.replace(
        "https://www.qdssclub.com/forums/category/Conosciamocipage=",
        ""
      );
  } else if (href.endsWith("/forums/category/conosciamoci")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Conosciamoci Pag: 1";
  } else if (href.endsWith("/forums/category/conosciamoci/")) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state = "Categoria: Conosciamoci Pag: 1";
  } else if (
    href.startsWith(
      "https://www.qdssclub.com/forums/category/conosciamocipage="
    )
  ) {
    presenceData.details = "Sfoglia il forum";
    presenceData.state =
      "Categoria: Conosciamoci Pag: " +
      href.replace(
        "https://www.qdssclub.com/forums/category/conosciamocipage=",
        ""
      );
  } else if (document.location.pathname.startsWith("/forums/discussion/")) {
    const discussionname =
      document.querySelector(".text-center h1").textContent;
    presenceData.details = "Legge la discussione:";
    presenceData.state = discussionname;
  } else if (document.location.pathname.startsWith("/articolo")) {
    const articoloname = document.querySelector(".text-center h3").textContent;
    presenceData.details = "Legge l'articolo:";
    presenceData.state = articoloname;
  } else if (document.location.pathname.startsWith("/login")) {
    presenceData.details = "Sta cercando di fare";
    presenceData.state = "l'accesso";
  } else if (document.location.pathname.startsWith("/password")) {
    presenceData.details = "Sta cercando di fare";
    presenceData.state = "l'accesso";
  } else if (document.location.pathname.startsWith("/register")) {
    presenceData.details = "Sta cercando di";
    presenceData.state = "registrarsi";
  } else if (document.location.pathname.startsWith("/convalida")) {
    presenceData.details = "Sta cercando di";
    presenceData.state = "registrarsi";
  } else {
    presenceData.details = "Navigando...";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
