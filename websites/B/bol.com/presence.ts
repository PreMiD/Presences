const presence = new Presence({
  clientId: "813110347165728849"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "bol",
    buttons: [{ label: "Pagina bekijken", url: document.location.href }]
  };

  presenceData.details = "Bladert op bol.com";
  presenceData.state = `Pagina '${
    document.title.replace("| ", "|").replace(" |", "|").split("|")[1]
  }'`;
  if (
    document.location.pathname === "/" ||
    document.location.pathname === "/nl/"
  )
    presenceData.state = "Startpagina";

  if (document.querySelector("span[class*=h-boxed][data-test*=title]")) {
    presenceData.details = `Bekijkt '${
      document.querySelector("span[class*=h-boxed][data-test*=title]").innerHTML
    }'`;
    presenceData.state = `In ${
      document
        .querySelector("ul[class*=breadcrumbs][data-test*=breadcrumb]")
        .lastElementChild.querySelector(
          "span[class*=breadcrumbs][data-test*=breadcrumb-name]"
        ).innerHTML
    }`;
    presenceData.buttons = [
      { label: "Product bekijken", url: document.location.href }
    ];
  } else if (
    document.querySelector("h1[class*=bol_header][data-test*=page-title]")
  ) {
    presenceData.details = `Bekijkt ${
      document.querySelector("h1[class*=bol_header][data-test*=page-title]")
        .innerHTML
    }`;
    delete presenceData.state;
    presenceData.buttons = [
      { label: "Categorie bekijken", url: document.location.href }
    ];
  }

  if (document.location.pathname.toLowerCase().includes("basket"))
    presenceData.details = "Bekijkt winkelwagentje";
  else if (document.location.pathname.toLowerCase().includes("lijstje"))
    presenceData.details = "Bekijkt verlanglijstje";
  else if (document.location.pathname.toLowerCase().includes("order"))
    presenceData.details = "Bestelt iets";
  else if (document.location.pathname.toLowerCase().includes("bestellingen"))
    presenceData.details = "Bekijkt bestellingen";
  else if (document.location.pathname.toLowerCase().includes("account"))
    presenceData.details = "Beheert account";

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
