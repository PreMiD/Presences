const presence = new Presence({
    clientId: "473155249763385345"
});
const browsingTime = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "hclogo"
    };
    presenceData.startTimestamp = browsingTime;
    if (window.location.pathname.toLowerCase() === "/" ||
        window.location.pathname.toLowerCase() === "/index") {
        presenceData.details = "Accueil";
        presenceData.state = "Se connecte à HabboCity";
    }
    if (window.location.pathname.toLowerCase() === "/register") {
        presenceData.details = "Accueil - Inscription";
        presenceData.state = "S'inscrit sur HabboCity";
        const registername = window.document.getElementById("registerusername").value;
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
        if (window.document.getElementById("profil87") &&
            window.document.getElementById("profil87").style.display === "block") {
            if (window.document.getElementById("profil121")) {
                if (window.document.getElementById("profil121").innerText ===
                    "Mes apparts") {
                    presenceData.state =
                        "Regarde les appartements de " + window.document.title;
                }
                else if (window.document.getElementById("profil121").innerText ===
                    "Mes groupes") {
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
    if (window.location.pathname.toLowerCase() === "/news") {
        presenceData.details = "Nouveautés";
        presenceData.state = "Regarde les dernières nouveautés";
        if (window.document.getElementById("search1") &&
            window.document.getElementById("search1").style.display === "block") {
            const search = window.document.getElementById("search3").value;
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
        if (window.document.getElementById("f37") &&
            window.document.getElementById("f37").style.display === "block") {
            presenceData.state = "Propose son organisation";
            const nameorga = window.document.querySelector(".sfdnom").value;
            if (nameorga != "") {
                presenceData.state = "Propose son organisation - " + nameorga;
            }
        }
    }
    if (window.location.pathname.toLowerCase() === "/community/fansites/new") {
        presenceData.details = "Communauté - Organisations";
        presenceData.state = "Ajoute un article à la page organisations";
        const titlearticle = window.document.getElementById("arttitre").value;
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
        if (window.document.getElementById("search1") &&
            window.document.getElementById("search1").style.display === "block") {
            const search = window.document.getElementById("search3").value;
            if (search != "") {
                presenceData.details = "Forum - Recherche";
                presenceData.state = 'Recherche le sujet : "' + search + '"';
            }
        }
    }
    if (window.location.pathname.toLowerCase().startsWith("/forum/")) {
        if (!window.location.pathname.toLowerCase().startsWith("/forum/categorie")) {
            const page = window.location.pathname.toLowerCase().split("/");
            const nbpage = page[3];
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
        }
        else {
            const page = window.location.pathname.toLowerCase().split("/");
            const nbpage = page[4];
            presenceData.state =
                "Regarde la liste des sujets - " +
                    window.document.title.replace("HabboCity:", "") +
                    " - Page " +
                    nbpage;
        }
    }
    if (window.location.pathname.toLowerCase().startsWith("/forum/categorie/com/")) {
        const page = window.location.pathname.toLowerCase().split("/");
        const nbpage = page[4];
        presenceData.details = "Forum - Mes sujets commentés";
        presenceData.state = "Regarde ses sujets commentés - Page " + nbpage;
    }
    if (window.location.pathname.toLowerCase().startsWith("/forum/categorie/mes/")) {
        const page = window.location.pathname.toLowerCase().split("/");
        const nbpage = page[4];
        presenceData.details = "Forum - Mes sujets";
        presenceData.state = "Regarde ses sujets - Page " + nbpage;
    }
    if (window.location.pathname.toLowerCase() === "/forum/new-sujet") {
        const title = window.document.getElementById("topictitl").value;
        const category = window.document.getElementById("topiccategory").value;
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
        if (title !== "") {
            presenceData.state =
                "Crée un nouveau sujet dans " + nbcategory[category] + " - " + title;
        }
        else {
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
        if (window.document.getElementById("boutiqueload").style.display ===
            "block" &&
            window.document.getElementById("b168")) {
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
        if (window.document.getElementById("settings16").style.display === "block" &&
            window.document.getElementById("settings38")) {
            if (window.document.getElementById("settings38").innerText ===
                "Mon mot de passe") {
                presenceData.details = "Paramètres - Mot de passe";
                presenceData.state = "Modifie son mot de passe";
            }
        }
        if (window.document.getElementById("settings16").style.display === "block" &&
            window.document.getElementById("settings38")) {
            if (window.document.getElementById("settings38").innerText ===
                "Mon adresse email") {
                presenceData.details = "Paramètres - E-mail";
                presenceData.state = "Modifie son adresse mail";
            }
        }
        if (window.document.getElementById("settings16").style.display === "block" &&
            window.document.getElementById("settings20")) {
            if (window.document.getElementById("settings20").innerText === "Mes amis") {
                presenceData.details = "Paramètres - Amis";
                presenceData.state = "Gère sa liste d'amis";
            }
        }
        if (window.document.getElementById("settings16").style.display === "block" &&
            window.document.getElementById("settings38")) {
            if (window.document.getElementById("settings38").innerText === "Code pin") {
                presenceData.details = "Paramètres - Code PIN";
                presenceData.state = "Modifie son code PIN";
            }
        }
    }
    if (window.document.getElementById("cityclub") &&
        window.document.getElementById("cityclub").style.display === "block") {
        presenceData.details = "Boutique - CityClub";
        presenceData.state = "Adhère au CityClub";
    }
    if (window.location.pathname.toLowerCase().startsWith("/boutique")) {
        if (window.document.getElementById("b101") &&
            window.document.getElementById("b101").value != "") {
            presenceData.details = "Boutique - Mon inventaire";
            presenceData.state =
                "Recherche : " +
                    window.document.getElementById("b101").value;
        }
        if (window.document.getElementById("boutiqueload").style.display ===
            "block" &&
            window.document.getElementById("b280")) {
            presenceData.details = "Boutique - Banque";
            presenceData.state = "Convertit sa monnaie";
        }
        if (window.document.getElementById("boutiqueload").style.display ===
            "block" &&
            window.document.getElementById("b104x")) {
            presenceData.details = "Boutique - Mon inventaire";
            presenceData.state = "Regarde ses mobiliers";
        }
        if (window.document.getElementById("boutiqueload").style.display ===
            "block" &&
            window.document.getElementById("b104")) {
            presenceData.details = "Boutique - Mon inventaire";
            presenceData.state = "Regarde ses badges";
        }
        if (window.document.getElementById("boutiqueload").style.display ===
            "block" &&
            window.document.getElementById("b106")) {
            if (window.document.getElementById("b106").style.display === "block") {
                const badgetitle = document.getElementById("b110nom").innerText;
                const badgecode = document.getElementById("b109").src.replace("https://swf.habbocity.me/c_images/album1584/", "");
                presenceData.details = "Boutique - Mon inventaire";
                presenceData.state =
                    "Vend le badge " + badgetitle + " - " + badgecode.replace(".gif", "");
            }
        }
        if (window.document.getElementById("boutiqueload").style.display ===
            "block" &&
            window.document.getElementById("b201")) {
            presenceData.details = "Boutique - Mon inventaire";
            presenceData.state = "Regarde son historique";
        }
        if (window.document.getElementById("boutiqueload").style.display ===
            "block" &&
            window.document.getElementById("b208")) {
            presenceData.details = "Boutique - Mon inventaire";
            presenceData.state = "Regarde ses appartements";
        }
        if (window.document.getElementById("boutiqueload").style.display ===
            "block" &&
            window.document.getElementById("b210")) {
            if (window.document.getElementById("b210").style.display === "block") {
                presenceData.details = "Boutique - Mon inventaire";
                const apparttitle = document.getElementById("b215").innerText;
                const sendto = document.getElementById("b219")
                    .value;
                if (sendto !== "") {
                    presenceData.state =
                        "Transfère l'appartement \"" + apparttitle + '" à ' + sendto;
                }
                else {
                    presenceData.state =
                        "Vend l'appartement \"" + apparttitle + '" sur le marché';
                }
            }
        }
    }
    if (window.document.getElementById("fil1") &&
        window.document.getElementById("fil1").style.right === "0px") {
        presenceData.details = "Fil d'actualité";
        if (window.document.getElementById("fil36")) {
            if (window.document.getElementById("fil36").parentNode.children[0].id ===
                "fil34" ||
                window.document.getElementById("fil36").parentNode.children[0].id ===
                    "fil35") {
                if (window.document.getElementById("fil36").parentNode.children[0].id ===
                    "fil34") {
                    presenceData.state = "Regarde le fil d'actualité";
                }
                if (window.document.getElementById("fil36").parentNode.children[0].id ===
                    "fil35") {
                    presenceData.state = "Regarde ses notifications";
                }
            }
            else {
                presenceData.state = "Regarde les nouveautés";
            }
        }
        if (window.document.getElementById("fil25")) {
            if (window.document.getElementById("fil25").value !=
                "" &&
                window.document.getElementById("fil25").value !=
                    "écrire quelque chose...") {
                presenceData.state =
                    'Écrit un Tweet - "' +
                        window.document.getElementById("fil25").value +
                        '"';
            }
        }
    }
    if (window.document.getElementById("rydHSG45s") &&
        window.document.getElementById("rydHSG45s").style.display === "block") {
        presenceData.details = "City Stories";
        if (window.document.getElementById("str4")) {
            presenceData.state =
                "Regarde la story de " +
                    window.document.getElementById("str4").innerText;
        }
    }
    if (window.document.getElementById("rydHSG45si") &&
        window.document.getElementById("rydHSG45si").style.display === "block") {
        presenceData.details = "City Stories - Mes photos";
        presenceData.state = "Regarde ses photos";
        if (window.document.getElementById("str46")) {
            presenceData.state =
                'Édite une photo : "' +
                    window.document.getElementById("str46").innerText +
                    '"';
        }
    }
    if (window.document.getElementById("Parrainage") &&
        window.document.getElementById("Parrainage").style.display === "block") {
        const link = window.document.getElementById("Parrainage-Link").value;
        presenceData.details = "Parrainage";
        presenceData.state = "Parraine ses amis - https://" + link;
    }
    if (window.document.getElementById("ai1") &&
        window.document.getElementById("ai1").style.display === "block") {
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
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRW5ELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFFBQVE7S0FDeEIsQ0FBQztJQUNGLFlBQVksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO0lBRTNDLElBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssR0FBRztRQUM5QyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLEVBQ25EO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDakMsWUFBWSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQztLQUNoRDtJQUVELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssV0FBVyxFQUFFO1FBQzFELFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7UUFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQztRQUMvQyxNQUFNLFlBQVksR0FBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FDbEQsa0JBQWtCLENBQ0UsQ0FBQyxLQUFLLENBQUM7UUFDN0IsSUFBSSxZQUFZLElBQUksWUFBWSxJQUFJLEVBQUUsRUFBRTtZQUN0QyxZQUFZLENBQUMsS0FBSyxHQUFHLDRCQUE0QixHQUFHLFlBQVksQ0FB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