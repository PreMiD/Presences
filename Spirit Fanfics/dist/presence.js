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
    browsing: "presence.activity.browsing",
    searching: "presence.activity.searching",
    reading: "presence.activity.reading"
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
        else if (pathname.startsWith(`/historia/apagar`)) {
            presenceData.details = `Apagando uma história`;
            presenceData.state = document.querySelector('.tituloPrincipal').textContent.replace('Apagar História ', '');
        }
        else {
            const title = document.querySelector('.tituloPrincipal').textContent.replace('História ', '').split(' - ');
            if (pathname.match(/\/historia\/(\w+-)+\d+\/\w+/)) {
                presenceData.details = title[0];
                presenceData.state = `${title[1]} - ${nav}`;
                presenceData.smallImageKey = `reading`;
                presenceData.smallImageText = (yield strings).reading;
            }
            else {
                presenceData.details = `Vendo uma história`;
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
    else if (pathname.startsWith(`/busca`)) {
        presenceData.details = `${(yield strings).searching}...`;
        presenceData.smallImageKey = `search`;
        presenceData.smallImageText = (yield strings).searching;
    }
    else {
        presenceData.state = nav;
    }
    presence.setActivity(presenceData, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUNILE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUNwQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixRQUFRLEVBQUUsNEJBQTRCO0lBQ3RDLFNBQVMsRUFBRSw2QkFBNkI7SUFDeEMsT0FBTyxFQUFFLDJCQUEyQjtDQUN2QyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsTUFBTSxZQUFZLEdBQWlCO1FBQy9CLGFBQWEsRUFBRSxXQUFXO1FBQzFCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDN0MsT0FBTyxFQUFFLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRO0tBQ3BDLEVBQ0QsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztJQUNoRSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDbEMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7WUFDNUMsSUFBSSxRQUFRLEtBQUsscUJBQXFCLEVBQUU7Z0JBQ3BDLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7YUFDbkQ7aUJBQU0sSUFBSSxHQUFHLEtBQUsscUJBQXFCLEVBQUU7Z0JBQ3RDLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7Z0JBQy9DLFlBQVksQ0FBQyxLQUFLLEdB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