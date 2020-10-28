var presence = new Presence({
    clientId: "770999998082842634" //The client ID of the Application created at https://discordapp.com/developers/applications
});

const currentURL = new URL(document.location.href),
  currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/");
const browsingStamp = Math.floor(Date.now() / 1000);
let tresc = '';

presence.on("UpdateData", async () => {

    const currentURLString = currentURL.toString();
    const currentPATHString = currentPath.toString();

    if(currentURLString.startsWith('https://portal.librus.pl/rodzina')) {
        if(currentPATHString.endsWith('synergia,loguj')) tresc = 'Loguje się do e-dziennika'; else 
        if(currentURLString == 'https://portal.librus.pl/rodzina') tresc = 'Przegląda stronę główną'; else { 
            if (document.readyState === 'complete') {
                const h1title = document.getElementsByClassName('content__title')[0].textContent;
                tresc = 'Czyta artykuł: '+h1title;
            }
        }
    } else if(currentURLString.startsWith('https://synergia.librus.pl')) {
        if(currentPATHString.endsWith('uczen,index')) tresc = 'Jest na stronie głownej'; else 
        if(currentPATHString.endsWith('przegladaj_oceny,uczen')) tresc = 'Sprawdza oceny'; else 
        if(currentPATHString.endsWith('przegladaj_nb,uczen')) tresc = 'Sprawdza frekwencje'; else
        if(currentPATHString.endsWith('wiadomosci')) tresc = 'Przegląda wiadomości'; else
        if(currentPATHString.endsWith('ogloszenia')) tresc = 'Przegląda ogłoszenia'; else
        if(currentPATHString.endsWith('terminarz')) tresc = 'Przegląda terminarz'; else
        if(currentPATHString.endsWith('moje_zadania')) tresc = 'Przegląda zadania domowe'; else
        if(currentPATHString.endsWith('przegladaj_plan_lekcji')) tresc = 'Sprawdza plan lekcji'; else
        if(currentPATHString.endsWith('dyzury')) tresc = 'Sprawdza dyżury'; else
        if(currentPATHString.endsWith('zrealizowane_lekcje')) tresc = 'Przegląda zrealizowane lekcje'; else
        if(currentPATHString.endsWith('pliki_szkoly')) tresc = 'Przegląda pliki szkoły'; else
        if(currentPATHString.endsWith('uwagi')) tresc = 'Przegląda uwagi'; else
        if(currentPATHString.endsWith('uczen_wyniki_egzaminow')) tresc = 'Sprawdza wyniki egzaminów'; else
        if(currentPATHString.endsWith('szczegolne_osiagniecia_ucznia')) tresc = 'Sprawdza szczególne osiągnięcia'; else
        if(currentPATHString.endsWith('informacja')) tresc = 'Sprawdza informacje o sobie'; else
        if(currentPATHString.endsWith('ankiety_admin_ankiety')) tresc = 'Wypełnia ankiety'; else
        if(currentPATHString.endsWith('ustawienia,konto')) tresc = 'Zmienia ustawienia konta'; else
        if(currentPATHString.endsWith('ustawienia,ogolne')) tresc = 'Zmienia ustawienia motywu'; else
        if(currentPATHString.endsWith('aplikacje')) tresc = 'Sprawdza autoryzowane aplikacje'; else
        if(currentPATHString.endsWith('help,D251')) tresc = 'Sprawdza instrukcje'; else tresc = "Sprawdza e-dziennik";
    } else {
        tresc = "Przegląda nieobsługiwaną stronę";
    }

    const presenceData: PresenceData = {
        details: tresc,
        largeImageKey: "RQJE11m",
        startTimestamp: browsingStamp
      };

    if (presenceData.details == null) {
        presence.setTrayTitle(); 
        presence.setActivity();
    } else {
        presence.setActivity(presenceData); 
    }
});
