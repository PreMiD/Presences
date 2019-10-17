var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "628786533587091490"
});
const { pathname } = window.location, strings = presence.getStrings({
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const presenceData = {
        largeImageKey: "spirit_lg",
        startTimestamp: Math.floor(Date.now() / 1000),
        details: (yield strings).browsing
    }, nav = document.querySelector('#secaoNav').lastChild.textContent;
    if (pathname.startsWith('/historia')) {
        if (pathname.startsWith(`/historia/gerenciar`)) {
            if (pathname === `/historia/gerenciar`) {
                presenceData.details = "Vendo Minhas Histórias";
            }
            else if (nav === `Gerenciar Capítulos`) {
                presenceData.details = `Gerenciando capítulos`;
                presenceData.state = document.querySelector('.tituloPrincipal').textContent.replace('História ', '').split(' - ')[0];
            }
        }
        else if (pathname.startsWith(`/historia/adicionar`) || pathname.startsWith(`/historia/termos`)) {
            if (nav === `Adicionar História` || nav === `Termos`) {
                presenceData.details = `Criando uma nova história`;
            }
            else if (nav === `Adicionar Capítulo`) {
                presenceData.details = `Escrevendo um novo capítulo`;
                presenceData.state = document.querySelector('.tituloPrincipal').textContent.replace('História ', '').split(' - ')[0];
                presenceData.smallImageKey = `writing`;
                presenceData.smallImageText = `Escrevendo`;
            }
        }
        else if (pathname.startsWith(`/historia/editar`)) {
            presenceData.details = `Editando uma história`;
            presenceData.state = document.querySelector('.tituloPrincipal').textContent.replace('Editar História ', '');
        }
        else {
            const title = document.querySelector('.tituloPrincipal').textContent.replace('História ', '').split(' - ');
            if (pathname.match(/\/historia\/(\w+-)+\d+\/\w+/)) {
                presenceData.details = title[0];
                presenceData.state = `${title[1]} - ${nav}`;
                presenceData.smallImageKey = `reading`;
                presenceData.smallImageText = `Lendo`;
            }
            else {
                presenceData.details = "Vendo uma história";
                presenceData.state = title[0];
            }
        }
    }
    else if (pathname.startsWith('/perfil')) {
        presenceData.details = "Vendo um perfil";
        presenceData.state = nav;
    }
    else if (pathname.startsWith('/home')) {
        presenceData.state = 'Home';
    }
    else if (pathname.startsWith('/aulas')) {
        presenceData.details = 'Vendo aulas';
        presenceData.state = nav != 'Aulas' ? nav : undefined;
    }
    else if (pathname.startsWith('/generos')) {
        presenceData.details = 'Navegando por gênero';
        presenceData.state = nav != 'Gêneros' ? nav : undefined;
    }
    else if (pathname.startsWith('/categorias')) {
        presenceData.details = 'Navegando por categorias';
        presenceData.state = nav != 'Categorias' ? nav : undefined;
    }
    else if (pathname.startsWith('/tags')) {
        presenceData.details = 'Navegando por tags';
        presenceData.state = nav != 'Tags populares' ? nav : undefined;
    }
    else if (pathname.startsWith('/historico')) {
        presenceData.details = `Vendo o histórico`;
    }
    else if (pathname.startsWith('/grupos')) {
        presenceData.state = `Vendo grupos`;
    }
    else {
        presenceData.state = nav;
    }
    presence.setActivity(presenceData, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUNILE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUNwQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixRQUFRLEVBQUUsNEJBQTRCO0NBQ3pDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNqQyxNQUFNLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFdBQVc7UUFDMUIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVE7S0FDcEMsRUFDRCxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ2hFLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNsQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUM1QyxJQUFJLFFBQVEsS0FBSyxxQkFBcUIsRUFBRTtnQkFDcEMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQzthQUNuRDtpQkFBTSxJQUFJLEdBQUcsS0FBSyxxQkFBcUIsRUFBRTtnQkFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztnQkFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hIO1NBQ0o7YUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDOUYsSUFBSSxHQUFHLEtBQUssb0JBQW9CLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDbEQsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQzthQUN0RDtpQkFBTSxJQUFJLEdBQUcsS0FBSyxvQkFBb0IsRUFBRTtnQkFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQztnQkFDckQsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNySCxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztnQkFDdkMsWUFBWSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7YUFDOUM7U0FDSjthQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ2hELFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7WUFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUUvRzthQUFNO1lBQ0gsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsRUFBRTtnQkFDL0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7Z0JBQzVDLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO2dCQUN2QyxZQUFZLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQzthQUN6QztpQkFBTTtnQkFDSCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO2dCQUM1QyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztTQUNKO0tBQ0o7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUN6QyxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztLQUM1QjtTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNyQyxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztLQUMvQjtTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUNyQyxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQ3pEO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3hDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7UUFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztLQUMzRDtTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO1FBQ2xELFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7S0FDOUQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztRQUM1QyxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7S0FDbEU7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDMUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztLQUM5QztTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztLQUN2QztTQUFNO1FBQ0gsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7S0FDNUI7SUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUEsQ0FBQyxDQUFBIn0=