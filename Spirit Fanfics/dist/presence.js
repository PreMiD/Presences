const presence = new Presence({
    clientId: "628786533587091490"
});
const { pathname } = window.location, strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    searching: "presence.activity.searching",
    reading: "presence.activity.reading"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "spirit_lg",
        startTimestamp: Math.floor(Date.now() / 1000),
        details: (await strings).browsing
    }, nav = document.querySelector("#secaoNav").lastChild.textContent;
    if (pathname.startsWith("/historia")) {
        if (pathname.startsWith(`/historia/gerenciar`)) {
            if (pathname === `/historia/gerenciar`) {
                presenceData.details = "Vendo Minhas Histórias";
            }
            else if (nav === `Gerenciar Capítulos`) {
                presenceData.details = `Gerenciando capítulos`;
                presenceData.state = document
                    .querySelector(".tituloPrincipal")
                    .textContent.replace("História ", "")
                    .split(" - ")[0];
            }
        }
        else if (pathname.startsWith(`/historia/adicionar`) ||
            pathname.startsWith(`/historia/termos`)) {
            if (nav === `Adicionar História` || nav === `Termos`) {
                presenceData.details = `Criando uma nova história`;
            }
            else if (nav === `Adicionar Capítulo`) {
                presenceData.details = `Escrevendo um novo capítulo`;
                presenceData.state = document
                    .querySelector(".tituloPrincipal")
                    .textContent.replace("História ", "")
                    .split(" - ")[0];
                presenceData.smallImageKey = `writing`;
                presenceData.smallImageText = `Escrevendo`;
            }
        }
        else if (pathname.startsWith(`/historia/editar`)) {
            presenceData.details = `Editando uma história`;
            presenceData.state = document
                .querySelector(".tituloPrincipal")
                .textContent.replace("Editar História ", "");
        }
        else if (pathname.startsWith(`/historia/apagar`)) {
            presenceData.details = `Apagando uma história`;
            presenceData.state = document
                .querySelector(".tituloPrincipal")
                .textContent.replace("Apagar História ", "");
        }
        else {
            const title = document
                .querySelector(".tituloPrincipal")
                .textContent.replace("História ", "")
                .split(" - ");
            if (pathname.match(/\/historia\/(\w+-)+\d+\/\w+/)) {
                presenceData.details = title[0];
                presenceData.state = `${title[1]} - ${nav}`;
                presenceData.smallImageKey = `reading`;
                presenceData.smallImageText = (await strings).reading;
            }
            else {
                presenceData.details = `Vendo uma história`;
                presenceData.state = title[0];
            }
        }
    }
    else if (pathname.startsWith("/perfil")) {
        presenceData.details = "Vendo um perfil";
        presenceData.state = nav;
    }
    else if (pathname.startsWith("/home")) {
        presenceData.state = "Home";
    }
    else if (pathname.startsWith("/aulas")) {
        presenceData.details = "Vendo aulas";
        presenceData.state = nav != "Aulas" ? nav : undefined;
    }
    else if (pathname.startsWith("/generos")) {
        presenceData.details = "Navegando por gênero";
        presenceData.state = nav != "Gêneros" ? nav : undefined;
    }
    else if (pathname.startsWith("/categorias")) {
        presenceData.details = "Navegando por categorias";
        presenceData.state = nav != "Categorias" ? nav : undefined;
    }
    else if (pathname.startsWith("/tags")) {
        presenceData.details = "Navegando por tags";
        presenceData.state = nav != "Tags populares" ? nav : undefined;
    }
    else if (pathname.startsWith("/historico")) {
        presenceData.details = `Vendo o histórico`;
    }
    else if (pathname.startsWith("/grupos")) {
        presenceData.state = `Vendo grupos`;
    }
    else if (pathname.startsWith(`/busca`)) {
        presenceData.details = `${(await strings).searching}...`;
        presenceData.smallImageKey = `search`;
        presenceData.smallImageText = (await strings).searching;
    }
    else {
        presenceData.state = nav;
    }
    presence.setActivity(presenceData, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUNILE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUNuQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixRQUFRLEVBQUUsNEJBQTRCO0lBQ3RDLFNBQVMsRUFBRSw2QkFBNkI7SUFDeEMsT0FBTyxFQUFFLDJCQUEyQjtDQUNwQyxDQUFDLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFdBQVc7UUFDMUIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVE7S0FDakMsRUFDRCxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ2pFLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNyQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUMvQyxJQUFJLFFBQVEsS0FBSyxxQkFBcUIsRUFBRTtnQkFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQzthQUNoRDtpQkFBTSxJQUFJLEdBQUcsS0FBSyxxQkFBcUIsRUFBRTtnQkFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztnQkFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxR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