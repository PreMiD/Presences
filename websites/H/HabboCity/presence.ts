const presence = new Presence({
  clientId: "473155249763385345"
});

const browsingTime = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "hclogo"
  };
  presenceData.startTimestamp = browsingTime;

  if (
    window.location.pathname.toLowerCase() === "/" ||
    window.location.pathname.toLowerCase() === "/index"
  ) {
    presenceData.details = "Accueil";
    presenceData.state = "Se connecte à HabboCity";
  }

  if (window.location.pathname.toLowerCase() === "/register") {
    presenceData.details = "Accueil - Inscription";
    presenceData.state = "S'inscrit sur HabboCity";
    const registername = (
      window.document.getElementById("registerusername") as HTMLInputElement
    ).value;
    if (registername && registername != "") {
      presenceData.state = "S'inscrit sur HabboCity - " + registername;
    }
  }

  if (window.location.pathname.toLowerCase() === "/conditions") {
    presenceData.details = "Conditions";
    presenceData.state = "Lit les conditions d'utilisations";
  }

  if (window.location.pathname.toLowerCase() === "/pin") {
    presenceData.details = "PIN";
    presenceData.state = "Entre son code PIN";
  }

  if (window.location.pathname.toLowerCase() === "/profil") {
    presenceData.details =
      "Profil - " + window.document.title.replace("HabboCity:", "");
    presenceData.state = "Regarde sa page personnelle";
  }

  if (window.location.pathname.toLowerCase() === "/discord") {
    presenceData.details = "Discord - CityCOM";
    presenceData.state = "Rejoins le serveur discord CityCOM";
  }

  if (window.location.pathname.toLowerCase().startsWith("/profil/")) {
    presenceData.details = "Profil - " + window.document.title;
    presenceData.state = "Regarde le profil de " + window.document.title;
    if (
      window.document.getElementById("profil87") &&
      window.document.getElementById("profil87").style.display === "block"
    ) {
      if (window.document.getElementById("profil121")) {
        if (
          window.document.getElementById("profil121").innerText ===
          "Mes apparts"
        ) {
          presenceData.state =
            "Regarde les appartements de " + window.document.title;
        } else if (
          window.document.getElementById("profil121").innerText ===
          "Mes groupes"
        ) {
          presenceData.state =
            "Regarde les groupes de " + window.document.title;
        }
      }
    }
  }

  if (window.location.pathname.toLowerCase() === "/hotel") {
    presenceData.details = "Hôtel";
    presenceData.state = "Joue sur l'hôtel";
  }

  if (window.location.pathname.toLowerCase() === "/meet") {
    presenceData.details = "Meet";
    presenceData.state = "Regarde les relations les plus populaires de l'hôtel";
    const meet = (
      window.document.getElementById("meetSearch") as HTMLInputElement
    ).value;
    if (meet != "") {
      presenceData.details = "Meet - " + meet;
      presenceData.state = "Regarde les relations de " + meet;
    }
  }

  if (window.location.pathname.toLowerCase() === "/news") {
    presenceData.details = "Nouveautés";
    presenceData.state = "Regarde les dernières nouveautés";
    if (
      window.document.getElementById("search1") &&
      window.document.getElementById("search1").style.display === "block"
    ) {
      const search = (
        window.document.getElementById("search3") as HTMLInputElement
      ).value;
      if (search != "") {
        presenceData.details = "Nouveautés - Recherche";
        presenceData.state = "Recherche l'article : \"" + search + '"';
      }
    }
  }

  if (window.location.pathname.toLowerCase().startsWith("/news/")) {
    presenceData.details = "Nouveautés - Article";
    presenceData.state = "Lit l'article : " + window.document.title;
  }

  if (window.location.pathname.toLowerCase() === "/community/team") {
    presenceData.details = "Communauté - Équipe";
    presenceData.state = "Regarde la page équipe";
  }

  if (window.location.pathname.toLowerCase() === "/community/fansites") {
    presenceData.details = "Communauté - Organisations";
    presenceData.state = "Regarde la page des organisations";
    if (
      window.document.getElementById("f37") &&
      window.document.getElementById("f37").style.display === "block"
    ) {
      presenceData.state = "Propose son organisation";
      const nameorga = (
        window.document.querySelector(".sfdnom") as HTMLInputElement
      ).value;
      if (nameorga != "") {
        presenceData.state = "Propose son organisation - " + nameorga;
      }
    }
  }

  if (window.location.pathname.toLowerCase() === "/community/fansites/new") {
    presenceData.details = "Communauté - Organisations";
    presenceData.state = "Ajoute un article à la page organisations";
    const titlearticle = (
      window.document.getElementById("arttitre") as HTMLInputElement
    ).value;
    if (titlearticle != "") {
      presenceData.state =
        "Ajoute un article à la page organisations - " + titlearticle;
    }
  }

  if (window.location.pathname.toLowerCase() === "/organisationteam") {
    presenceData.details = "Communauté - Collaborateurs";
    presenceData.state = "Regarde la page des collaborateurs";
  }

  if (window.location.pathname.toLowerCase() === "/prestige/joueurs") {
    presenceData.details = "Prestige - Joueurs";
    presenceData.state = "Regarde la page des joueurs prestigieux";
  }

  if (window.location.pathname.toLowerCase() === "/prestige/appartements") {
    presenceData.details = "Prestige - Appartements";
    presenceData.state = "Regarde la page des appartements prestigieux";
  }

  if (window.location.pathname.toLowerCase() === "/prestige/gamer") {
    presenceData.details = "Prestige - Gamers";
    presenceData.state = "Regarde la page des meilleurs aux animations";
  }

  if (window.location.pathname.toLowerCase() === "/prestige/riches") {
    presenceData.details = "Prestige - Riches";
    presenceData.state = "Regarde la page des joueurs les plus riches";
  }

  if (window.location.pathname.toLowerCase() === "/forum") {
    presenceData.details = "Forum - Accueil";
    presenceData.state = "Regarde la liste des sujets";
    if (
      window.document.getElementById("search1") &&
      window.document.getElementById("search1").style.display === "block"
    ) {
      const search = (
        window.document.getElementById("search3") as HTMLInputElement
      ).value;
      if (search != "") {
        presenceData.details = "Forum - Recherche";
        presenceData.state = 'Recherche le sujet : "' + search + '"';
      }
    }
  }

  if (window.location.pathname.toLowerCase().startsWith("/forum/")) {
    if (
      !window.location.pathname.toLowerCase().startsWith("/forum/categorie")
    ) {
      const page = window.location.pathname.toLowerCase().split("/");
      let nbpage = page[3];
      if (nbpage === undefined) {
        nbpage = "1";
      }
      presenceData.details = "Forum - Sujet";
      presenceData.state =
        "Lit le sujet : " +
        window.document.title
          .replace("- HabboCity", "")
          .replace("Page " + nbpage, "") +
        " - Page " +
        nbpage;
    }
  }

  if (window.location.pathname.toLowerCase().startsWith("/forum/categorie")) {
    presenceData.details = "Forum - Catégories";
    if (window.document.title === "Forum de HabboCity") {
      presenceData.state = "Regarde la liste des sujets";
    } else {
      const page = window.location.pathname.toLowerCase().split("/");
      const nbpage = page[4];
      presenceData.state =
        "Regarde la liste des sujets - " +
        window.document.title.replace("HabboCity:", "") +
        " - Page " +
        nbpage;
    }
  }

  if (
    window.location.pathname.toLowerCase().startsWith("/forum/categorie/com/")
  ) {
    const page = window.location.pathname.toLowerCase().split("/");
    const nbpage = page[4];
    presenceData.details = "Forum - Mes sujets commentés";
    presenceData.state = "Regarde ses sujets commentés - Page " + nbpage;
  }

  if (
    window.location.pathname.toLowerCase().startsWith("/forum/categorie/mes/")
  ) {
    const page = window.location.pathname.toLowerCase().split("/");
    const nbpage = page[4];
    presenceData.details = "Forum - Mes sujets";
    presenceData.state = "Regarde ses sujets - Page " + nbpage;
  }

  if (window.location.pathname.toLowerCase() === "/forum/new-sujet") {
    const title = (
      window.document.getElementById("topictitl") as HTMLInputElement
    ).value;
    const category = (
      window.document.getElementById("topiccategory") as HTMLInputElement
    ).value;
    const nbcategory = {
      "1": "Discussion générale",
      "138": "Débats & sondages",
      "4": "Idées & suggestions",
      "8": "RPG & Sites de fans",
      "5": "Économie & Casinos",
      "9": "Jeux & événements",
      "7": "Artistique",
      "137": "Tutoriels",
      "136": "Aide"
    };
    presenceData.details = "Forum - Nouveau sujet";
    if (title != "") {
      presenceData.state =
        "Crée un nouveau sujet dans " + nbcategory[category] + " - " + title;
    } else {
      presenceData.state = "Crée un nouveau sujet dans " + nbcategory[category];
    }
  }

  if (window.location.pathname.toLowerCase() === "/boutique") {
    presenceData.details = "Boutique - Accueil";
    presenceData.state = "Parcoure la boutique";
  }

  if (window.location.pathname.toLowerCase() === "/boutique/citycash") {
    presenceData.details = "Boutique - CityCash";
    presenceData.state = "Achète des CityCash";
  }

  if (window.location.pathname.toLowerCase() === "/boutique/coffres") {
    presenceData.details = "Boutique - Coffres";
    presenceData.state = "Regarde les coffres disponibles";
    if (
      window.document.getElementById("boutiqueload").style.display ===
        "block" &&
      window.document.getElementById("b168")
    ) {
      presenceData.state = "Achète un coffre";
    }
  }

  if (window.location.pathname.toLowerCase() === "/boutique/bonamigo") {
    presenceData.details = "Boutique - Bonamigo";
    presenceData.state = "Joue au Bonamigo";
  }

  if (window.location.pathname.toLowerCase() === "/boutique/badges") {
    presenceData.details = "Boutique - Badges";
    presenceData.state = "Regarde les badges disponibles";
  }

  if (window.location.pathname.toLowerCase() === "/boutique/marche") {
    presenceData.details = "Boutique - Marché";
    presenceData.state = "Regarde le marché";
  }

  if (window.location.pathname.toLowerCase() === "/boutique/economie") {
    presenceData.details = "Boutique - Économie";
    presenceData.state = "Regarde l'économie";
  }

  if (window.location.pathname.toLowerCase() === "/boutique/citybox") {
    presenceData.details = "Boutique - Économie";
    presenceData.state = "Regarde les avantages de la CityBox";
  }

  if (window.location.pathname.toLowerCase() === "/deconnexion") {
    presenceData.details = "Déconnexion";
    presenceData.state = "Se déconnecte de HabboCity";
  }

  if (window.location.pathname.toLowerCase() === "/settings") {
    presenceData.details = "Paramètres";
    presenceData.state = "Paramètre son compte";
    if (
      window.document.getElementById("settings16").style.display === "block" &&
      window.document.getElementById("settings38")
    ) {
      if (
        window.document.getElementById("settings38").innerText ===
        "Mon mot de passe"
      ) {
        presenceData.details = "Paramètres - Mot de passe";
        presenceData.state = "Modifie son mot de passe";
      }
    }
    if (
      window.document.getElementById("settings16").style.display === "block" &&
      window.document.getElementById("settings38")
    ) {
      if (
        window.document.getElementById("settings38").innerText ===
        "Mon adresse email"
      ) {
        presenceData.details = "Paramètres - E-mail";
        presenceData.state = "Modifie son adresse mail";
      }
    }
    if (
      window.document.getElementById("settings16").style.display === "block" &&
      window.document.getElementById("settings20")
    ) {
      if (
        window.document.getElementById("settings20").innerText === "Mes amis"
      ) {
        presenceData.details = "Paramètres - Amis";
        presenceData.state = "Gère sa liste d'amis";
      }
    }
    if (
      window.document.getElementById("settings16").style.display === "block" &&
      window.document.getElementById("settings38")
    ) {
      if (
        window.document.getElementById("settings38").innerText === "Code pin"
      ) {
        presenceData.details = "Paramètres - Code PIN";
        presenceData.state = "Modifie son code PIN";
      }
    }
  }

  if (
    window.document.getElementById("cityclub") &&
    window.document.getElementById("cityclub").style.display === "block"
  ) {
    presenceData.details = "Boutique - CityClub";
    presenceData.state = "Adhère au CityClub";
  }

  if (window.location.pathname.toLowerCase().startsWith("/boutique")) {
    if (
      window.document.getElementById("b101") &&
      (window.document.getElementById("b101") as HTMLInputElement).value != ""
    ) {
      presenceData.details = "Boutique - Mon inventaire";
      presenceData.state =
        "Recherche : " +
        (window.document.getElementById("b101") as HTMLInputElement).value;
    }
    if (
      window.document.getElementById("boutiqueload").style.display ===
        "block" &&
      window.document.getElementById("b280")
    ) {
      presenceData.details = "Boutique - Banque";
      presenceData.state = "Convertit sa monnaie";
    }
    if (
      window.document.getElementById("boutiqueload").style.display ===
        "block" &&
      window.document.getElementById("b104x")
    ) {
      presenceData.details = "Boutique - Mon inventaire";
      presenceData.state = "Regarde ses mobiliers";
    }
    if (
      window.document.getElementById("boutiqueload").style.display ===
        "block" &&
      window.document.getElementById("b104")
    ) {
      presenceData.details = "Boutique - Mon inventaire";
      presenceData.state = "Regarde ses badges";
    }
    if (
      window.document.getElementById("boutiqueload").style.display ===
        "block" &&
      window.document.getElementById("b106")
    ) {
      if (window.document.getElementById("b106").style.display === "block") {
        const badgetitle = document.getElementById("b110nom").innerText;
        const badgecode = (
          document.getElementById("b109") as HTMLImageElement
        ).src.replace("https://swf.habbocity.me/c_images/album1584/", "");
        presenceData.details = "Boutique - Mon inventaire";
        presenceData.state =
          "Vend le badge " + badgetitle + " - " + badgecode.replace(".gif", "");
      }
    }
    if (
      window.document.getElementById("boutiqueload").style.display ===
        "block" &&
      window.document.getElementById("b201")
    ) {
      presenceData.details = "Boutique - Mon inventaire";
      presenceData.state = "Regarde son historique";
    }
    if (
      window.document.getElementById("boutiqueload").style.display ===
        "block" &&
      window.document.getElementById("b208")
    ) {
      presenceData.details = "Boutique - Mon inventaire";
      presenceData.state = "Regarde ses appartements";
    }
    if (
      window.document.getElementById("boutiqueload").style.display ===
        "block" &&
      window.document.getElementById("b210")
    ) {
      if (window.document.getElementById("b210").style.display === "block") {
        presenceData.details = "Boutique - Mon inventaire";
        const apparttitle = document.getElementById("b215").innerText;
        const sendto = (document.getElementById("b219") as HTMLInputElement)
          .value;
        if (sendto !== "") {
          presenceData.state =
            "Transfère l'appartement \"" + apparttitle + '" à ' + sendto;
        } else {
          presenceData.state =
            "Vend l'appartement \"" + apparttitle + '" sur le marché';
        }
      }
    }
  }

  if (
    window.document.getElementById("fil1") &&
    window.document.getElementById("fil1").style.right === "0px"
  ) {
    presenceData.details = "Fil d'actualité";
    if (window.document.getElementById("fil36")) {
      if (
        window.document.getElementById("fil36").parentNode.children[0].id ===
          "fil34" ||
        window.document.getElementById("fil36").parentNode.children[0].id ===
          "fil35"
      ) {
        if (
          window.document.getElementById("fil36").parentNode.children[0].id ===
          "fil34"
        ) {
          presenceData.state = "Regarde le fil d'actualité";
        }
        if (
          window.document.getElementById("fil36").parentNode.children[0].id ===
          "fil35"
        ) {
          presenceData.state = "Regarde ses notifications";
        }
      } else {
        presenceData.state = "Regarde les nouveautés";
      }
    }
    if (window.document.getElementById("fil25")) {
      if (
        (window.document.getElementById("fil25") as HTMLInputElement).value !=
          "" &&
        (window.document.getElementById("fil25") as HTMLInputElement).value !=
          "écrire quelque chose..."
      ) {
        presenceData.state =
          'Écrit un Tweet - "' +
          (window.document.getElementById("fil25") as HTMLInputElement).value +
          '"';
      }
    }
  }

  if (
    window.document.getElementById("rydHSG45s") &&
    window.document.getElementById("rydHSG45s").style.display === "block"
  ) {
    presenceData.details = "City Stories";
    if (window.document.getElementById("str4")) {
      presenceData.state =
        "Regarde la story de " +
        window.document.getElementById("str4").innerText;
    }
  }

  if (
    window.document.getElementById("rydHSG45si") &&
    window.document.getElementById("rydHSG45si").style.display === "block"
  ) {
    presenceData.details = "City Stories - Mes photos";
    presenceData.state = "Regarde ses photos";
    if (window.document.getElementById("str46")) {
      presenceData.state =
        'Édite une photo : "' +
        window.document.getElementById("str46").innerText +
        '"';
    }
  }

  if (
    window.document.getElementById("Parrainage") &&
    window.document.getElementById("Parrainage").style.display === "block"
  ) {
    const link = (
      window.document.getElementById("Parrainage-Link") as HTMLInputElement
    ).value;
    presenceData.details = "Parrainage";
    presenceData.state = "Parraine ses amis - https://" + link;
  }

  if (
    window.document.getElementById("ai1") &&
    window.document.getElementById("ai1").style.display === "block"
  ) {
    const titlehelp = window.document.getElementById("ai5");
    if (titlehelp) {
      if (titlehelp.innerText === "Centre d'aide") {
        presenceData.details = "Centre d'aide";
        presenceData.state = "Parcoure le centre d'aide";
      }
      if (titlehelp.innerText === "Service client") {
        presenceData.details = "Centre d'aide - Support";
        presenceData.state = "Contacte le support";
      }
      if (titlehelp.innerText === "Mon ticket") {
        presenceData.details = "Centre d'aide - Mes tickets";
        presenceData.state = "Regarde ses tickets";
      }
    }
  }

  if (presenceData.details == null) {
    presenceData.details = "Erreur - 404";
    presenceData.state = "Page introuvable";
    presence.setActivity(presenceData);
  } else {
    presence.setActivity(presenceData);
  }
});
