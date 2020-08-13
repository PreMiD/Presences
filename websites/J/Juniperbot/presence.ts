var presence = new Presence({
  clientId: "739908991274057870"
});

var browsingStamp = Math.floor(Date.now() / 1000);
var title: any;
var search: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  const juniper: boolean = await presence.getSetting("juniper");
  const docs: boolean = await presence.getSetting("docs");
  const fback: boolean = await presence.getSetting("fback");

  if (document.location.hostname == "juniper.bot") {
    if(juniper){
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/ranking")) {
      presenceData.details = "Смотрит таблицу лидеров сервера:";
      presenceData.state = document.querySelector(".guild--info h1.font-weight-thin.display-2").innerHTML;
      presenceData.smallImageKey = "list";
    } else if (document.location.pathname.includes("/dashboard/")) {
      presenceData.details = "В панели управления";
      presenceData.state = `Сервер: ${document.querySelector(".guild--info h1.font-weight-thin.display-2").innerHTML}`;
    } else if (document.location.pathname.includes("/donate")) {
      presenceData.details = "Читает информацию об пожертвовании";
      presenceData.smallImageKey = "donate";
    } else if (document.location.pathname == "/") {
      presenceData.details = "Главная страница";
    } else if (document.location.pathname == "/servers"){
      presenceData.details = "Выбирает сервер";        
      presenceData.smallImageKey = "list";
    } else if (document.location.pathname == "/commands"){
      presenceData.details = "Смотрит список команд"; 
      presenceData.smallImageKey = "list";
    } else if (document.location.pathname == "/status"){
      presenceData.details = "Смотрит статистику бота";
      presenceData.smallImageKey = "stats";
    } else if (document.location.pathname == "/user/card"){
      presenceData.details = "Меняет карточку рейтинга";
    }
    }
    }
    else if(docs){
    if (document.location.hostname == "docs.juniper.bot") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = document.title;
    presenceData.state = "docs.juniper.bot";
    presenceData.smallImageKey = "list"; 
    }
    }
    else if(fback){
    if (document.location.hostname == "feedback.juniper.bot"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.state = "feedback.juniper.bot";  
    if (document.location.pathname == "/") {
    presenceData.details = "Главная страница";
    } else if (document.location.pathname.includes("/posts")) {
      presenceData.details = `Читает: ${document.querySelector(".post-header h1").innerHTML}`;
    }
}}
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
