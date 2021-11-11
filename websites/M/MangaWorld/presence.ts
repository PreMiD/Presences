const presence = new Presence({
    clientId: "860298084512038964"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "mangaworld_logo_dark"
    },
    /* Query dell'URI - URI query */

    searchParams = new URLSearchParams(
      decodeURIComponent(document.location.search)
        .replace("?", "")
        .replace(/-/g, " ")
    );

  /* Homepage */
  if (document.location.pathname === "/") {
    data.smallImageKey = "home";
    data.smallImageText = "Homepage";
    presenceData.details = "Nella homepage";
  } else if (document.location.href.includes("/bookmarks/")) {
    /* Preferiti - Bookmarks*/
    data.smallImageKey = "bookmark";
    data.smallImageText = "Preferiti";
    presenceData.details = "Sfogliando i preferiti";
    let filter;

    if (document.location.href.endsWith("RE-READING")) filter = "In rilettura";
    else if (document.location.href.endsWith("COMPLETED"))
      filter = "Completati";
    else if (document.location.href.endsWith("ON_HOLD")) filter = "In pausa";
    else if (document.location.href.endsWith("PLAN_TO_READ"))
      filter = "Da leggere";
    else if (document.location.href.endsWith("DROPPED")) filter = "Droppati";
    else if (document.location.href.endsWith("READING")) filter = "In lettura";

    data.state = filter;
  } else if (document.location.href.includes("keyword=")) {
    /* ----- ARCHIVIO - ARCHIVE ----- */
    /* Ricerca per nome - Search by name */

    data.smallImageKey = "search";
    data.smallImageText = "Ricerca";
    presenceData.details = "Cercando:";
    data.state = `"${searchParams.get("keyword")}"`;
  } else if (document.location.href.includes("author=")) {
    /* Ricerca per autore - Search by author */

    data.smallImageKey = "pen";
    data.smallImageText = "Ricerca per autore";
    presenceData.details = "Sfogliando i contenuti dell'autore:";
    data.state = searchParams.get("author");
  } else if (document.location.href.includes("artist=")) {
    /* Ricerca per artista - Search by artist */

    data.smallImageKey = "brush";
    data.smallImageText = "Ricerca per artista";
    presenceData.details = "Sfogliando i contenuti dell'artista:";
    data.state = searchParams.get("artist");
  } else if (document.location.href.includes("genre=")) {
    /* Ricerca per genere - Search by genre */
    const words = searchParams.get("genre").split(" ");
    for (let i = 0; i < words.length; i++)
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);

    data.smallImageKey = "tags";
    data.smallImageText = "Ricerca per genere";
    presenceData.details = "Sfogliando i contenuti del genere:";
    data.state = words.join(" ");
  } else if (document.location.href.includes("year=")) {
    /* Ricerca per anno - Search by year of release */

    data.smallImageKey = "calendar2";
    data.smallImageText = "Ricerca per anno";
    presenceData.details = "Sfogliando i contenuti dell'anno:";
    data.state = searchParams.get("year");
  } else if (document.location.href.includes("status=")) {
    /* Ricerca per stato - Search by status */
    const statusQuery = searchParams.get("status");
    data.smallImageKey = "slash";
    data.smallImageText = "Ricerca per stato";
    presenceData.details = "Sfogliando i contenuti:";
    let status;

    if (statusQuery === "dropped") status = "Droppati";
    else if (statusQuery === "ongoing") status = "In corso d'opera";
    else if (statusQuery === "completed") status = "Finiti";
    else if (statusQuery === "paused") status = "In pausa";
    else if (statusQuery === "canceled") status = "Cancellati";

    data.state = status;
  } else if (document.location.href.includes("type=")) {
    /* Ricerca per tipo - Search by type/format */
    const rawtype = searchParams.get("type");
    data.smallImageKey = "file3";
    data.smallImageText = "Ricerca per formato";
    presenceData.details = "Sfogliando i contenuti in formato:";
    data.state = rawtype[0].toUpperCase() + rawtype.substring(1);
  } else if (document.location.href.includes("sort=")) {
    /* Ricerca per ordinamento - Order by */
    const sortQuery = searchParams.get("sort");
    data.smallImageKey = "sort";
    data.smallImageText = "Ricerca per ordinamento";
    presenceData.details = "Sfogliando i contenuti:";
    let query;

    if (sortQuery === "a z") query = "Ordinati dalla A alla Z";
    else if (sortQuery === "z a") query = "Ordinati dalla Z alla A";
    else if (sortQuery === "most_read") query = "Più letti";
    else if (sortQuery === "less_read") query = "Meno letti";
    else if (sortQuery === "newest") query = "Più recenti";
    else if (sortQuery === "oldest") query = "Meno recenti";

    data.state = query;
  } else if (document.location.href.includes("archive")) {
    /* Pagina principale - Main page */
    data.smallImageKey = "archive";
    data.smallImageText = "Archivio";
    presenceData.details = "Nell'archivio";
    data.state = "Sfogliando...";
  } else if (document.location.href.includes("/manga/")) {
    /* ----- LETTURA - READING ----- */
    /* Nell'e-reader - In the e-reader */
    if (document.location.href.includes("/read/")) {
      const [mangaName] = document.title
          .replace(" Scan ITA - MangaWorld", "")
          .replace(" Oneshot", "")
          .split("Capitolo"),
        [, chapter0n] = document.title
          .replace(" Scan ITA - MangaWorld", "")
          .split("Capitolo"),
        [, , , , , , page] = document.location.pathname.split("/");
      let chapter = chapter0n;

      if (parseInt(chapter0n, 10) < 10) chapter = chapter0n.replace("0", "");

      let chapterString = "Capitolo";
      if (!chapter0n) (chapterString = "Oneshot"), (chapter = "");

      data.smallImageKey = "book3";
      data.smallImageText = mangaName;
      presenceData.details = `Leggendo: ${mangaName}`;
      data.state = `${chapterString + chapter} | Pagina ${page}`;
      data.buttons = [
        {
          label: "Leggilo anche tu!",
          url: document.location.href.replace(/.$/, "1")
        },
        {
          label: "Vai alla pagina dell'opera!",
          url: document.location.href.replace(/read\/.*/g, "")
        }
      ];
    } else {
      /* Nella pagina principale del manga - In the manga's main page */
      const pageName = document.title.replace(" Scan ITA - MangaWorld", "");
      data.smallImageKey = "eye";
      data.smallImageText = pageName;
      presenceData.details = "Visualizzando la pagina di:";
      data.state = pageName;
      data.buttons = [
        {
          label: "Vai alla pagina dell'opera!",
          url: document.location.href
        }
      ];
    }
  } else {
    /* In qualunque altra pagina - In any other page */
    const pageName = document.title.replace("MangaWorld - ", "");
    data.smallImageKey = "eye";
    data.smallImageText = `"${pageName}"`;
    presenceData.details = "Visualizzando la pagina:";
    data.state = `"${pageName}"`;
  }
  if (presenceData.details) {
    data.startTimestamp = browsingTimestamp;
    presence.setActivity(data);
  }
});
