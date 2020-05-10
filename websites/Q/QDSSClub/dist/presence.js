const presence = new Presence({
    clientId: "674236194053160971"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "qdss"
    };
    if (document.location.pathname == "/") {
        if (document.location.href.startsWith("https://www.qdssclub.com/?page=")) {
            let hpforumpagenumber = document.location.href;
            data.details = "Nella homepage";
            data.state = "Sfoglia il forum. Pag: " + hpforumpagenumber.replace("https://www.qdssclub.com/?page=", "");
            data.startTimestamp = browsingStamp;
        }
        else if (document.location.href.startsWith("https://www.qdssclub.com/?articoli=")) {
            let hparticolipagenumber = document.location.href;
            data.details = "Nella homepage";
            data.state = "Sfoglia gli articoli. Pag: " + hparticolipagenumber.replace("https://www.qdssclub.com/?articoli=", "");
            data.startTimestamp = browsingStamp;
        }
        else {
            data.details = "Nella homepage";
            data.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.startsWith("/faq")) {
        data.details = "Nella scheda FAQ";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/contatti")) {
        data.details = "Vuole contattare";
        data.state = "Quei Due Sul Server";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/utente/profilo")) {
        data.details = "Sta visualizzando";
        data.state = "il suo profilo";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/cookies")) {
        data.details = "Legge le informazioni";
        data.state = "sui Cookies";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/privacy")) {
        data.details = "Legge le informazioni";
        data.state = "sulla Privcay";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/disclaimer")) {
        data.details = "Legge i Termini e le";
        data.state = "Condizioni di utilizzo";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums")) {
        data.details = "Sfoglia il forum";
        data.state = "Pagina: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/Forums/")) {
        data.details = "Sfoglia il forum";
        data.state = "Pagina: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.startsWith("https://www.qdssclub.com/forums?page=")) {
        let fforumpagenumber = document.location.href;
        data.details = "Sfoglia il forum";
        data.state = "Pagina: " + fforumpagenumber.replace("https://www.qdssclub.com/forums?page=", "");
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/Consigli")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Consigli Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/Consigli/")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Consigli Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/Consiglipage=")) {
        let c1cforumpagenumber = document.location.href;
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Consigli Pag: " + c1cforumpagenumber.replace("https://www.qdssclub.com/forums/category/Consiglipage=", "");
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/consigli")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Consigli Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/consigli/")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Consigli Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/consiglipage=")) {
        let c2cforumpagenumber = document.location.href;
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Consigli Pag: " + c2cforumpagenumber.replace("https://www.qdssclub.com/forums/category/consiglipage=", "");
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/Salotto")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Salotto Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/Salotto/")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Salotto Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/Salottopage=")) {
        let s1sforumpagenumber = document.location.href;
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Salotto Pag: " + s1sforumpagenumber.replace("https://www.qdssclub.com/forums/category/Salottopage=", "");
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/salotto")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Salotto Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/salotto/")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Salotto Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/salottopage=")) {
        let s2sforumpagenumber = document.location.href;
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Salotto Pag: " + s2sforumpagenumber.replace("https://www.qdssclub.com/forums/category/salottopage=", "");
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/Conosciamoci")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Conosciamoci Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/Conosciamoci/")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Conosciamoci Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/Conosciamocipage=")) {
        let c1coforumpagenumber = document.location.href;
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Conosciamoci Pag: " + c1coforumpagenumber.replace("https://www.qdssclub.com/forums/category/Conosciamocipage=", "");
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/conosciamoci")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Conosciamoci Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.endsWith("/forums/category/conosciamoci/")) {
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Conosciamoci Pag: 1";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.href.startsWith("https://www.qdssclub.com/forums/category/conosciamocipage=")) {
        let c2coforumpagenumber = document.location.href;
        data.details = "Sfoglia il forum";
        data.state = "Categoria: Conosciamoci Pag: " + c2coforumpagenumber.replace("https://www.qdssclub.com/forums/category/conosciamocipage=", "");
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/forums/discussion/")) {
        let discussionname = document.querySelector(".text-center h1").textContent;
        data.details = "Legge la discussione:";
        data.state = discussionname;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/articolo")) {
        let articoloname = document.querySelector(".text-center h3").textContent;
        data.details = "Legge l'articolo:";
        data.state = articoloname;
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/login")) {
        data.details = "Sta cercando di fare";
        data.state = "l'accesso";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/password")) {
        data.details = "Sta cercando di fare";
        data.state = "l'accesso";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/register")) {
        data.details = "Sta cercando di";
        data.state = "registrarsi";
        data.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.startsWith("/convalida")) {
        data.details = "Sta cercando di";
        data.state = "registrarsi";
        data.startTimestamp = browsingStamp;
    }
    else {
        data.details = "Navigando...";
        data.startTimestamp = browsingStamp;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFpQjtRQUN6QixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsaUNBQWlDLENBQUMsRUFBRTtZQUV4RSxJQUFJLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBRS9DLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7U0FFckM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQ0FBcUMsQ0FBQyxFQUFFO1lBRW5GLElBQUksb0JBQW9CLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFFbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLDZCQUE2QixHQUFHLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNySCxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztTQUVyQzthQUFNO1lBRUwsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztZQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztTQUVyQztLQUVGO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFFeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBRTdELElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFFbkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBRXJDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFFNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBRTVELElBQUksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FFckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUUvRCxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsd0JBQXdCLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FFckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUVyRCxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBRXJDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFFdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHVDQUF1QyxDQUFDLEVBQUU7UUFFckYsSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUU5QyxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyx1Q0FBdUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLEVBQUU7UUFFdkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBRXJDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsRUFBRTtRQUV4RSxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsNEJBQTRCLENBQUM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FFckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx3REFBd0QsQ0FBQyxFQUFFO1FBRXRHLElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLDJCQUEyQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyx3REFBd0QsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwSSxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLEVBQUU7UUFFdkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBRXJDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsRUFBRTtRQUV4RSxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsNEJBQTRCLENBQUM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FFckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx3REFBd0QsQ0FBQyxFQUFFO1FBRXRHLElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLDJCQUEyQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyx3REFBd0QsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwSSxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLEVBQUU7UUFFdEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLDJCQUEyQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBRXJDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsRUFBRTtRQUV2RSxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsMkJBQTJCLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FFckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx1REFBdUQsQ0FBQyxFQUFFO1FBRXJHLElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLDBCQUEwQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyx1REFBdUQsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsSSxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLEVBQUU7UUFFdEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLDJCQUEyQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBRXJDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsRUFBRTtRQUV2RSxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsMkJBQTJCLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FFckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx1REFBdUQsQ0FBQyxFQUFFO1FBRXJHLElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLDBCQUEwQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyx1REFBdUQsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsSSxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDLEVBQUU7UUFFM0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLGdDQUFnQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBRXJDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0NBQWdDLENBQUMsRUFBRTtRQUU1RSxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0NBQWdDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FFckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyw0REFBNEQsQ0FBQyxFQUFFO1FBRTFHLElBQUksbUJBQW1CLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLCtCQUErQixHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyw0REFBNEQsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3SSxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDLEVBQUU7UUFFM0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLGdDQUFnQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBRXJDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0NBQWdDLENBQUMsRUFBRTtRQUU1RSxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0NBQWdDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FFckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyw0REFBNEQsQ0FBQyxFQUFFO1FBRTFHLElBQUksbUJBQW1CLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLCtCQUErQixHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyw0REFBNEQsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3SSxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7UUFFdkUsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUUzRSxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBRXJDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFFN0QsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUV6RSxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBRXJDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFFMUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBRTdELElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FFckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUU3RCxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBRXJDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFFOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUVyQztTQUFNO1FBRUwsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FFckM7QUFFSCxDQUFDLENBQUMsQ0FBQyJ9