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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUNsQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixRQUFRLEVBQUUsNEJBQTRCO0lBQ3RDLFNBQVMsRUFBRSw2QkFBNkI7SUFDeEMsT0FBTyxFQUFFLDJCQUEyQjtDQUNyQyxDQUFDLENBQUM7QUFFTCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFdBQVc7UUFDMUIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVE7S0FDbEMsRUFDRCxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ2xFLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNwQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUM5QyxJQUFJLFFBQVEsS0FBSyxxQkFBcUIsRUFBRTtnQkFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQzthQUNqRDtpQkFBTSxJQUFJLEdBQUcsS0FBSyxxQkFBcUIsRUFBRTtnQkFDeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztnQkFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRO3FCQUMxQixhQUFhLENBQUMsa0JBQWtCLENBQUM7cUJBQ2pDLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztxQkFDcEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BCO1NBQ0Y7YUFBTSxJQUNMLFFBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUM7WUFDMUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUN2QztZQUNBLElBQUksR0FBRyxLQUFLLG9CQUFvQixJQUFJLEdBQUcsS0FBSyxRQUFRLEVBQUU7Z0JBQ3BELFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7YUFDcEQ7aUJBQU0sSUFBSSxHQUFHLEtBQUssb0JBQW9CLEVBQUU7Z0JBQ3ZDLFlBQVksQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUM7Z0JBQ3JELFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUTtxQkFDMUIsYUFBYSxDQUFDLGtCQUFrQixDQUFDO3FCQUNqQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7cUJBQ3BDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0JBQ3ZDLFlBQVksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO2FBQzVDO1NBQ0Y7YUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1lBQy9DLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUTtpQkFDMUIsYUFBYSxDQUFDLGtCQUFrQixDQUFDO2lCQUNqQyxXQUFXLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2hEO2FBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDbEQsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztZQUMvQyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVE7aUJBQzFCLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDakMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNoRDthQUFNO1lBQ0wsTUFBTSxLQUFLLEdBQUcsUUFBUTtpQkFDbkIsYUFBYSxDQUFDLGtCQUFrQixDQUFDO2lCQUNqQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7aUJBQ3BDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsRUFBRTtnQkFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7Z0JBQzVDLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO2dCQUN2QyxZQUFZLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7YUFDdkQ7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztnQkFDNUMsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0I7U0FDRjtLQUNGO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3pDLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7S0FDMUI7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDN0I7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7UUFDckMsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztLQUN2RDtTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMxQyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1FBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7S0FDekQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDN0MsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQzVEO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3ZDLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7UUFDNUMsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQ2hFO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7S0FDNUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDekMsWUFBWSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7S0FDckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxTQUFTLEtBQUssQ0FBQztRQUN6RCxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7S0FDekQ7U0FBTTtRQUNMLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0tBQzFCO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDLENBQUMifQ==