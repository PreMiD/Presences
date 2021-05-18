const presence = new Presence({
    clientId: "842884401314791455"
}),
      browsingStamp = Math.floor(Date.now() / 1000),
      path = document.location.pathname;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };
  if (path.includes("/accueil")){
    presenceData.details = "Visite une page :";
    presenceData.state = "Page d'accueil";
  }
  else if (path.includes("/ordinateurs")){
    presenceData.details = "Visite une page :";
    presenceData.state = "Accéssoires - Ordinateurs";
  }
  else if (path.includes("/micro")){
    presenceData.details = "Visite une page :";
    presenceData.state = "Accéssoires - Composants";
  }
  else if (path.includes("/peripheriques")){
    presenceData.details = "Visite une page :";
    presenceData.state = "Accéssoires - Périphériques";
  }
  else if (path.includes("/gaming")){
    presenceData.details = "Visite une page :";
    presenceData.state = "Accéssoires - Gaming";
  }
  else if (path.includes("/reseau")){
    presenceData.details = "Visite une page :";
    presenceData.state = "Accéssoires - Réseau";
  }
  else if (path.includes("/bon-plan")){
    presenceData.details = "Visite une page :";
    presenceData.state = "Page des bons plans";
  }
  else if (path.includes("/assistance")){
    presenceData.details = "Visite une page :";
    presenceData.state = "Page d'assistance";
  }
  else if (path.includes("/Login")){
    presenceData.details = "Visite une page :";
    presenceData.state = "Page de login";
  }
  else if (path.includes("/Cart")){
    presenceData.details = "Regarde son panier :";
    presenceData.state = "0 article";
  }
  else if (path.includes("/cart") && document.body.contains(document.querySelector("#cart-block > div.row > div.col-12.col-lg-9.cart-list > div.cart-list__body"))){
    const articles = document.querySelectorAll("#cart-block > div.row > div.col-12.col-lg-9.cart-list > div.cart-list__body > div.cart-table").length - 1;
    presenceData.details = "Regarde son panier :";
    presenceData.state = articles + " article(s)";
  }
  else if (path.includes("/livraison")){
    presenceData.details = "Visite une page :";
    presenceData.state = "Moyen de livraison";
  }
  else if (path.includes("/paiement")){
    presenceData.details = "Visite une page :";
    presenceData.state = "Moyen de paiement";
  }
  else if (path.includes("/pages")){
    if (path.includes("/produits")){
      const category = document.querySelector("#content > nav.ariane.top > ul > li.current > h1").textContent;
      presenceData.details = "Regarde les produits de :";
      presenceData.state = category;
    }
    else if(path.includes("/detail")){
      const product = document.querySelector("#apercu > div.libelle > h1").textContent;
      presenceData.details = "Regarde le produit :";
      presenceData.state = product;
    }
    else if(path.includes("/recherche.php")){
      const search = document.querySelector("#content > section > div.main > b").textContent;
      presenceData.details = "Recherche :";
      presenceData.state = search;
      presenceData.smallImageKey = "search";
    }
    else {
      presenceData.details = "Page introuvable";
      presence.info("Page Introuvale PreMiD | Veuillez contacter le développeur Kozou#0001");
    }  
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
