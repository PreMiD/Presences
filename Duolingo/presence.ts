var presence = new Presence({
  clientId: "612071822321647648",
  mediaKeys: false
}),
 presenceData: presenceData = {
  largeImageKey: "logo"
};

let lang = new Map();
lang.set('de', 'German');
lang.set('es', 'Spanish');
lang.set('fr', 'French');
lang.set('ja', 'Japanese');
lang.set('it', 'Italian');
lang.set('ko', 'Korean');
lang.set('zs', 'Chinese');
lang.set('ru', 'Russian');
lang.set('pt', 'Portuguese');
lang.set('tr', 'Turkish');
lang.set('dn', 'Dutch');
lang.set('sv', 'Swedish');
lang.set('el', 'Greek');
lang.set('hi', 'Hindi');
lang.set('hv', 'high valyrian');
lang.set('ga', 'Irish');
lang.set('pl', 'Polish');
lang.set('he', 'Hebrew');
lang.set('nb', 'Norwegian');
lang.set('vi', 'Vietnamese');
lang.set('ar', 'Arabic');
lang.set('hw', 'Hawaiian');
lang.set('da', 'Danish');
lang.set('kl', 'Klingon');
lang.set('ro', 'Romanian');
lang.set('cs', 'Czech');
lang.set('sw', 'Swahili');
lang.set('cy', 'Walsh');
lang.set('id', 'Indonesian');
lang.set('hu', 'Hungarian');
lang.set('uk', 'Ukrainian');
lang.set('eo', 'Esperanto');
lang.set('nv', 'Navajo');

presence.on("UpdateData", async () => {
    var path = document.location.pathname;

    if(path.length > 1 && path.split("/")[2] !== null && path.split("/")[2].length == 2) {
      var language:string;
      for (let value of lang.keys()) {
        if(path.split("/")[2] == value) {
          language = lang.get(value);
          break
        }
      }
      
      presenceData.details = "Taking a " + language + " lesson";
      presenceData.state = path.split("/")[1].replace("-", " ");
      presenceData.largeImageKey = "logo";

      presence.setActivity(presenceData);
  
} else {

  var pageData: presenceData = {
    details: "Browsing..",
    largeImageKey: "logo"
  };
  presence.setActivity(pageData);
  }
});
