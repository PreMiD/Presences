var presence = new Presence({
    clientId: "670047125656043536",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    let data = {
        largeImageKey: "aranzulla"
    };
		 if (document.location.pathname == ("/")) {
    if (document.location.href.match("/?s=")) {
    var search1 = document.querySelector("head > title").textContent;
    data.details = "In ricerca",
    data.state = "Ha cercato:" + search1.replace(": Risultati della ricerca | Salvatore Aranzulla", ""),
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else
    data.details = "Nella Homepage",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/informazioni-generali-su-salvatore-aranzulla")) {
    data.details = "Guarda le Info su",
    data.state = "Salvatore Aranzulla",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/libri-di-salvatore-aranzulla")) {
    data.details = "Guarda i libri scritti da",
    data.state = "Salvatore Aranzulla",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/contatti")) {
    data.details = "Vuole contattare",
    data.state = "Salvatore Aranzulla",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/pubblicita")) {
    data.details = "Vuole contattare",
    data.state = "Salvatore Aranzulla",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/lavoro-aranzulla")) {
    data.details = "Cerca lavoro presso",
    data.state = "Aranzulla.it",
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/computer")) {
    var computer = document.querySelector("head > title").textContent;
    data.details = "Nelle guide sul Computer:",
    data.state = computer.replace(" | Salvatore Aranzulla",""),
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/telefonia")) {
    var telefonia = document.querySelector("head > title").textContent;
    data.details = "Nelle guide sulla Telefonia:",
    data.state = telefonia.replace(" | Salvatore Aranzulla",""),
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/internet")) {
    var internet = document.querySelector("head > title").textContent;
    data.details = "Nelle guide sull' Internet:",
    data.state = internet.replace(" | Salvatore Aranzulla",""),
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/page")) {
    var search2 = document.querySelector("head > title").textContent;
    data.details = "In ricerca",
    data.state = "Ha cercato:" + search2.replace(" Risultati della ricerca (", "").split("pagina")[0],
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    } else
    var guidename = document.querySelector("head > title").textContent;
    data.details = "Guarda la guida:",
	data.state = guidename.replace(" | Salvatore Aranzulla",""),
    data.startTimestamp = browsingStamp;
    presence.setActivity(data);
    }
);
