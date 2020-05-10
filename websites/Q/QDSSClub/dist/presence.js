const presence = new Presence({
    clientId: "674236194053160971"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
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
        }
        else if (href.startsWith("https://www.qdssclub.com/?articoli=")) {
            presenceData.details = "Nella homepage";
            presenceData.state =
                "Sfoglia gli articoli. Pag: " +
                    href.replace("https://www.qdssclub.com/?articoli=", "");
        }
        else {
            presenceData.details = "Nella homepage";
        }
    }
    else if (document.location.pathname.startsWith("/faq")) {
        presenceData.details = "Nella scheda FAQ";
    }
    else if (document.location.pathname.startsWith("/contatti")) {
        presenceData.details = "Vuole contattare";
        presenceData.state = "Quei Due Sul Server";
    }
    else if (document.location.pathname.startsWith("/utente/profilo")) {
        presenceData.details = "Sta visualizzando";
        presenceData.state = "il suo profilo";
    }
    else if (document.location.pathname.startsWith("/cookies")) {
        presenceData.details = "Legge le informazioni";
        presenceData.state = "sui Cookies";
    }
    else if (document.location.pathname.startsWith("/privacy")) {
        presenceData.details = "Legge le informazioni";
        presenceData.state = "sulla Privcay";
    }
    else if (document.location.pathname.startsWith("/disclaimer")) {
        presenceData.details = "Legge i Termini e le";
        presenceData.state = "Condizioni di utilizzo";
    }
    else if (href.endsWith("/forums")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Pagina: 1";
    }
    else if (href.endsWith("/Forums/")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Pagina: 1";
    }
    else if (href.startsWith("https://www.qdssclub.com/forums?page=")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state =
            "Pagina: " + href.replace("https://www.qdssclub.com/forums?page=", "");
    }
    else if (href.endsWith("/forums/category/Consigli")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Consigli Pag: 1";
    }
    else if (href.endsWith("/forums/category/Consigli/")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Consigli Pag: 1";
    }
    else if (href.startsWith("https://www.qdssclub.com/forums/category/Consiglipage=")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state =
            "Categoria: Consigli Pag: " +
                href.replace("https://www.qdssclub.com/forums/category/Consiglipage=", "");
    }
    else if (href.endsWith("/forums/category/consigli")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Consigli Pag: 1";
    }
    else if (href.endsWith("/forums/category/consigli/")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Consigli Pag: 1";
    }
    else if (href.startsWith("https://www.qdssclub.com/forums/category/consiglipage=")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state =
            "Categoria: Consigli Pag: " +
                href.replace("https://www.qdssclub.com/forums/category/consiglipage=", "");
    }
    else if (href.endsWith("/forums/category/Salotto")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Salotto Pag: 1";
    }
    else if (href.endsWith("/forums/category/Salotto/")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Salotto Pag: 1";
    }
    else if (href.startsWith("https://www.qdssclub.com/forums/category/Salottopage=")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state =
            "Categoria: Salotto Pag: " +
                href.replace("https://www.qdssclub.com/forums/category/Salottopage=", "");
    }
    else if (href.endsWith("/forums/category/salotto")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Salotto Pag: 1";
    }
    else if (href.endsWith("/forums/category/salotto/")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Salotto Pag: 1";
    }
    else if (href.startsWith("https://www.qdssclub.com/forums/category/salottopage=")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state =
            "Categoria: Salotto Pag: " +
                href.replace("https://www.qdssclub.com/forums/category/salottopage=", "");
    }
    else if (href.endsWith("/forums/category/Conosciamoci")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Conosciamoci Pag: 1";
    }
    else if (href.endsWith("/forums/category/Conosciamoci/")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Conosciamoci Pag: 1";
    }
    else if (href.startsWith("https://www.qdssclub.com/forums/category/Conosciamocipage=")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state =
            "Categoria: Conosciamoci Pag: " +
                href.replace("https://www.qdssclub.com/forums/category/Conosciamocipage=", "");
    }
    else if (href.endsWith("/forums/category/conosciamoci")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Conosciamoci Pag: 1";
    }
    else if (href.endsWith("/forums/category/conosciamoci/")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state = "Categoria: Conosciamoci Pag: 1";
    }
    else if (href.startsWith("https://www.qdssclub.com/forums/category/conosciamocipage=")) {
        presenceData.details = "Sfoglia il forum";
        presenceData.state =
            "Categoria: Conosciamoci Pag: " +
                href.replace("https://www.qdssclub.com/forums/category/conosciamocipage=", "");
    }
    else if (document.location.pathname.startsWith("/forums/discussion/")) {
        const discussionname = document.querySelector(".text-center h1")
            .textContent;
        presenceData.details = "Legge la discussione:";
        presenceData.state = discussionname;
    }
    else if (document.location.pathname.startsWith("/articolo")) {
        const articoloname = document.querySelector(".text-center h3").textContent;
        presenceData.details = "Legge l'articolo:";
        presenceData.state = articoloname;
    }
    else if (document.location.pathname.startsWith("/login")) {
        presenceData.details = "Sta cercando di fare";
        presenceData.state = "l'accesso";
    }
    else if (document.location.pathname.startsWith("/password")) {
        presenceData.details = "Sta cercando di fare";
        presenceData.state = "l'accesso";
    }
    else if (document.location.pathname.startsWith("/register")) {
        presenceData.details = "Sta cercando di";
        presenceData.state = "registrarsi";
    }
    else if (document.location.pathname.startsWith("/convalida")) {
        presenceData.details = "Sta cercando di";
        presenceData.state = "registrarsi";
    }
    else {
        presenceData.details = "Navigando...";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDcEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGlDQUFpQyxDQUFDLEVBQUU7WUFDdEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztZQUN4QyxZQUFZLENBQUMsS0FBSztnQkFDaEIseUJBQXlCO29CQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO2FBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLHFDQUFxQyxDQUFDLEVBQUU7WUFDakUsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztZQUN4QyxZQUFZLENBQUMsS0FBSztnQkFDaEIsNkJBQTZCO29CQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFD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