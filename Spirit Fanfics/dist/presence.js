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
        if (pathname === '/historia/gerenciar') {
            presenceData.details = "Vendo Minhas Histórias";
        }
        else {
            const title = document.querySelector('.tituloPrincipal').textContent.replace('História ', '').split(' - ');
            if (pathname.match(/\/historia\/(\w+-)+\d+\/\w+/)) {
                presenceData.details = `Lendo ${title[0]}`;
                presenceData.state = `${title[1]} - ${nav}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUNILE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUNwQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixRQUFRLEVBQUUsNEJBQTRCO0NBQ3pDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNqQyxNQUFNLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFdBQVc7UUFDMUIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVE7S0FDcEMsRUFDRCxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ2hFLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNsQyxJQUFJLFFBQVEsS0FBSyxxQkFBcUIsRUFBRTtZQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO1NBQ25EO2FBQU07WUFDSCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFO2dCQUMvQyxZQUFZLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQzNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDL0M7aUJBQU07Z0JBQ0gsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztnQkFDNUMsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakM7U0FDSjtLQUNKO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3ZDLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7S0FDNUI7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDckMsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDL0I7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7UUFDckMsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztLQUN6RDtTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1FBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7S0FDM0Q7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDM0MsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQzlEO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7UUFDNUMsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQ2xFO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7S0FDOUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7S0FDdkM7U0FBTTtRQUNILFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0tBQzVCO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFBLENBQUMsQ0FBQSJ9