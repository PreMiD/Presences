var presence = new Presence({
  clientId: "612071822321647648",
  mediaKeys: false
}),
 presenceData: presenceData = {
  largeImageKey: "logo"
};

let lang = new Map();
lang.set('de', 'German').
set('ep', 'Spanish').
set('fr', 'French').
set('ja', 'Japanese').
set('it', 'Italian').
set('ko', 'Korean').
set('zs', 'Chinese').
set('ru', 'Russian').
set('pt', 'Portuguese').
set('tr', 'Turkish').
set('dn', 'Dutch').
set('sv', 'Swedish').
set('el', 'Greek').
set('hi', 'Hindi').
set('hv', 'high valyrian').
set('ga', 'Irish').
set('pl', 'Polish').
set('he', 'Hebrew').
set('nb', 'Norwegian').
set('vi', 'Vietnamese').
set('ar', 'Arabic').
set('hw', 'Hawaiian').
set('da', 'Danish').
set('kl', 'Klingon').
set('ro', 'Romanian').
set('cs', 'Czech').
set('sw', 'Swahili').
set('cy', 'Walsh').
set('id', 'Indonesian').
set('hu', 'Hungarian').
set('uk', 'Ukrainian').
set('eo', 'Esperanto').
set('nv', 'Navajo');

presence.on("UpdateData", async () => {
    var path = document.location.pathname

    if(path.length > 1 && path.split("/")[2] !== null && path.split("/")[2].length == 2) {
      var language:string
      for (let value of lang.keys()) {
        if(path.split("/")[2] == value) {
          language = lang.get(value)
          break
        }
      }
      
      presenceData.details = "Taking a " + language + " lesson"
      presenceData.state = path.split("/")[3].replace("-", " ")
      presenceData.largeImageKey = "logo"

      presence.setActivity(presenceData);
  
} else {

  var pageData: presenceData = {
    details: "Browsing..",
    largeImageKey: "logo"
  };
  presence.setActivity(pageData);
  }
});
