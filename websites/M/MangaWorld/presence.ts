const presence = new Presence({
  clientId: "860298084512038964"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "mangaworld_logo_dark"
  };

  /* Query dell'URI - URI query */
  let paramsString = decodeURIComponent(document.location.search).replace("?", "").replace(/-/g, " ");
  let searchParams = new URLSearchParams(paramsString);

  /* Homepage */
  if (document.location.pathname == "/") {
    data.smallImageKey = "home";
    data.smallImageText = "Homepage";
    data.details = "Nella homepage";
    data.startTimestamp = browsingStamp;
  }

  /* Preferiti - Bookmarks*/
  else if (document.location.href.includes("/bookmarks/")) {
    data.smallImageKey = "bookmark";
    data.smallImageText = "Preferiti";
    data.details = "Sfogliando i preferiti";
    data.startTimestamp = browsingStamp;

    if (document.location.href.endsWith("RE-READING")) {
      var filter = "In rilettura";
    } else if (document.location.href.endsWith("COMPLETED")) {
      var filter = "Completati";
    } else if (document.location.href.endsWith("ON_HOLD")) {
      var filter = "In pausa";
    } else if (document.location.href.endsWith("PLAN_TO_READ")) {
      var filter = "Da leggere";
    } else if (document.location.href.endsWith("DROPPED")) {
      var filter = "Droppati";
    } else if (document.location.href.endsWith("READING")) {
      var filter = "In lettura";
    } else {
      var filter = "";
    }

    data.state = filter;
  }

  /* ----- ARCHIVIO - ARCHIVE ----- */
  /* Ricerca per nome - Search by name */
  else if (document.location.href.includes("keyword=")) {
    let keyword = searchParams.get("keyword");
    data.smallImageKey = "search";
    data.smallImageText = "Ricerca";
    data.details = "Cercando:";
    data.state = "\"" + keyword + "\"";
    data.startTimestamp = browsingStamp;
  }
  /* Ricerca per autore - Search by author */
  else if (document.location.href.includes("author=")) {
    let author = searchParams.get("author");
    data.smallImageKey = "pen";
    data.smallImageText = "Ricerca per autore";
    data.details = "Sfogliando i contenuti dell'autore:";
    data.state = author;
    data.startTimestamp = browsingStamp;
  } 
  /* Ricerca per artista - Search by artist */
  else if (document.location.href.includes("artist=")) {
    let artist = searchParams.get("artist");
    data.smallImageKey = "brush";
    data.smallImageText = "Ricerca per artista";
    data.details = "Sfogliando i contenuti dell'artista:";
    data.state = artist;
    data.startTimestamp = browsingStamp;
  } 
  /* Ricerca per genere - Search by genre */
  else if (document.location.href.includes("genre=")) {
    let rawgenre = searchParams.get("genre");

    const genrestr = rawgenre;
    const words = genrestr.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    var genre = words.join(" ");

    data.smallImageKey = "tags";
    data.smallImageText = "Ricerca per genere";
    data.details = "Sfogliando i contenuti del genere:";
    data.state = genre;
    data.startTimestamp = browsingStamp;
  }
  /* Ricerca per anno - Search by year of release */
  else if (document.location.href.includes("year=")) {
    let year = searchParams.get("year");
    data.smallImageKey = "calendar2";
    data.smallImageText = "Ricerca per anno";
    data.details = "Sfogliando i contenuti dell'anno:";
    data.state = year;
    data.startTimestamp = browsingStamp;
  }
  /* Ricerca per stato - Search by status */
  else if (document.location.href.includes("status=")) {
    let statusQuery = searchParams.get("status");
    data.smallImageKey = "slash";
    data.smallImageText = "Ricerca per stato";
    data.details = "Sfogliando i contenuti:";
    data.startTimestamp = browsingStamp;

    if (statusQuery == "dropped") {
      var status = "Droppati";
    } else if (statusQuery == "ongoing") {
      var status = "In corso";
    } else if (statusQuery == "completed") {
      var status = "Finiti";
    } else if (statusQuery == "paused") {
      var status = "In pausa";
    } else if (statusQuery == "canceled") {
      var status = "Cancellati";
    }

    data.state = status;
  }
  /* Ricerca per tipo - Search by type/format */
  else if (document.location.href.includes("type=")) {
    let rawtype = searchParams.get("type");
    
    const typestr = rawtype;
    var type = typestr[0].toUpperCase() + typestr.substring(1);

    data.smallImageKey = "file3";
    data.smallImageText = "Ricerca per formato";
    data.details = "Sfogliando i contenuti in formato:";
    data.state = type;
    data.startTimestamp = browsingStamp;
  }
  /* Ricerca per ordinamento - Order by */
  else if (document.location.href.includes("sort=")) {
    let sortQuery = searchParams.get("sort");
    data.smallImageKey = "sort";
    data.smallImageText = "Ricerca per ordinamento";
    data.details = "Sfogliando i contenuti:";
    data.startTimestamp = browsingStamp;

    if (sortQuery == "a z") {
      var query = "Ordinati dalla A alla Z";
    } else if (sortQuery == "z a") {
      var query = "Ordinati dalla Z alla A";
    } else if (sortQuery == "most_read") {
      var query = "Più popolari";
    } else if (sortQuery == "less_read") {
      var query = "Meno popolari";
    } else if (sortQuery == "newest") {
      var query = "Più recenti";
    } else if (sortQuery == "oldest") {
      var query = "Meno recenti";
    }

    data.state = query;
  }
  /* Pagina principale - Main page */
  else if (document.location.href.includes("archive")) {
    data.smallImageKey = "archive";
    data.smallImageText = "Archivio";
    data.details = "Nell'archivio";
    data.state = "Sfogliando...";
    data.startTimestamp = browsingStamp;
  }

  /* ----- LETTURA - READING ----- */
  else if (document.location.href.includes("manga")) {
    /* Nell'e-reader - In the e-reader */
    if (document.location.href.includes("/read/")) {
      let mangaName = document.title
        .replace(" Scan ITA - MangaWorld", "")
        .replace(" Oneshot", "")
        .split("Capitolo")[0];
      
      let chapter0n = document.title
        .replace(" Scan ITA - MangaWorld", "")
        .split("Capitolo")[1];
      
      let chapterInt = parseInt(chapter0n, 10);
      if (chapterInt < 10) {
        var chapter = chapter0n.replace("0", "");
      }
      else {
        var chapter = chapter0n;
      }
      
      let page = document.location.pathname
        .split("/")[6];
      
      var chapterString = "Capitolo";
      if (chapter0n === undefined) {
        var chapterString = "Oneshot";
        var chapter = "";
      }

      data.smallImageKey = "book3";
      data.smallImageText = mangaName;
      data.details = "Leggendo: " + mangaName;
      data.state = chapterString + chapter + " | Pagina " + page;
      data.startTimestamp = browsingStamp;
      data.buttons = [
        {
          label: "Leggilo anche tu!",
          url: document.location.href.replace(/.$/,"1")
        }
      ]
    } 
    /* In qualsiasi altra pagina - In any other page */
    else {
      let pageName = document.title.replace(" Scan ITA - MangaWorld", "").replace("MangaWorld - ", "");
      data.smallImageKey = "eye";
      data.smallImageText = pageName;
      data.details = "Visitando la pagina di:";
      data.state = "\"" + pageName + "\"";
      data.startTimestamp = browsingStamp;
    }
  }
  if (data.details !== null) {
    presence.setActivity(data);
  }
});