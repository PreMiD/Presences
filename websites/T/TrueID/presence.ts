const presence = new Presence({
    clientId: "912784051801301053"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const time = await presence.getSetting("timestamps"),
    privacy = await presence.getSetting("privacy"),
    buttons = await presence.getSetting("buttons"),
    path = document.location,
    lang = path.pathname.substring(1, 6),
    presenceData: PresenceData = {
      largeImageKey: "index",
      startTimestamp: browsingStamp
    };

  if (path.hostname === "home.trueid.net")
    presenceData.details = lang === "th-th" ? "หน้าแรก" : "Home page";
  else if (path.hostname === "movie.trueid.net") {
    let ep,
      result,
      result_ = [],
      title =
        document.querySelector(
          "#__next > div > div.wrapper.-spacing > div > div.banner > div.box_desc > header > h1"
        )?.textContent ?? null;
    title === null
      ? (title =
          document.querySelector(
            "#__next > div > div.wrapper.-spacing > div.player-wrap.contentbox > div.player-meta > div > header > div > h1"
          )?.textContent ?? `${lang === "th-th" ? "ไม่พบ" : "not found"}`)
      : null;
    const selector =
      document.querySelector(
        "#section-category > div > div.col-12.col-sm-12.col-md-3.col-lg-2 > div > ul > li.active"
      )?.textContent ?? `${lang === "th-th" ? "ไม่พบ" : "not found"}`;
    switch (true) {
      case path.pathname.includes("animation-genre"):
        presenceData.details = `${lang === "th-th" ? "อนิเมชัน" : "Animation"}`;
        presenceData.state = `${
          lang === "th-th" ? "หมวดหมู่" : "Category"
        } ${selector}`;
        break;
      case path.pathname.includes("movies-genre"):
        presenceData.details = `${lang === "th-th" ? "หนัง" : "Movies"}`;
        presenceData.state = `${
          lang === "th-th" ? "หมวดหมู่" : "Category"
        } ${selector}`;
        break;
      case path.pathname.includes("series-genre"):
        presenceData.details = `${lang === "th-th" ? "ซีรีส์" : "Series"}`;
        presenceData.state = `${
          lang === "th-th" ? "หมวดหมู่" : "Category"
        } ${selector}`;
        break;
      case path.pathname.includes("tvshow-genre"):
        presenceData.details = `${
          lang === "th-th" ? "รวมฮิตวาไรตี้" : "Variety Hits"
        }`;
        presenceData.state = `${
          lang === "th-th" ? "หมวดหมู่" : "Category"
        } ${selector}`;
        break;
      case path.pathname.includes("documentary-genre"):
        presenceData.details = `${
          lang === "th-th" ? "ความรู้ และ สารคดี" : "Knowledge & Documentary"
        }`;
        presenceData.state = `${
          lang === "th-th" ? "หมวดหมู่" : "Category"
        } ${selector}`;
        break;
      case path.pathname.includes("series"):
        (ep = title.match(/\d+/g)), (result = title.replace(`EP.${ep} | `, ""));
        result_ = result.split("| ");
        presenceData.details = `${lang === "th-th" ? "ซีรีส์" : "Series"} ${
          ep
            ? `${
                privacy
                  ? ""
                  : lang === "th-th"
                  ? `ตอนที่ ${ep[0]}`
                  : `Ep ${ep[0]}`
              }`
            : ""
        }`;
        presenceData.state = `${result_[1] ? result_[1] : result}`;
        if (buttons) {
          presenceData.buttons = [
            {
              label: `${lang === "th-th" ? "ดูซีรีส์" : "Watch Series"}`,
              url: document.location.href.replace(/#\d+/, "")
            }
          ];
        }
        break;
      case path.pathname.includes("movie"):
        presenceData.details = `${lang === "th-th" ? "หนัง" : "Movie"}`;
        presenceData.state = `${title}`;
        if (buttons) {
          presenceData.buttons = [
            {
              label: `${lang === "th-th" ? "ดูหนัง" : "Watch Movies"}`,
              url: document.location.href.replace(/#\d+/, "")
            }
          ];
        }
        break;
      default:
        presenceData.details = "Movie";
        presenceData.state = lang === "th-th" ? "หน้าแรก" : "Home page";
        break;
    }
  } else if (path.hostname === "tv.trueid.net") {
    const title =
        document.querySelector(
          "#__next > div > div.wrapper.-spacing > div.player-block.d-flex > div > div.desc-nowrap.d-flex > div.desc-block.title-middle > div > h1"
        )?.textContent ?? null,
      result =
        title === null
          ? title.replace("ดูช่อง ", "").replace("ออนไลน์", "").split("–")
          : null;
    switch (true) {
      case path.pathname.includes("live"):
        presenceData.details = `${
          lang === "th-th" ? "ดูทีวีออนไลน์" : "TV Online"
        }`;
        presenceData.state = `${lang === "th-th" ? "ช่อง" : "Channel"} ${
          result[0]
        }`;
        presenceData.smallImageKey = "live";
        if (buttons) {
          presenceData.buttons = [
            {
              label: `${
                lang === "th-th" ? "ดูทีวีออนไลน์" : "Watch tv online"
              }`,
              url: document.location.href.replace(/#\d+/, "")
            }
          ];
        }
        break;
      case path.pathname.includes("tvguide"):
        presenceData.details = "Tv Guide";
        presenceData.state =
          lang === "th-th"
            ? "ผังรายการทีวีช่องทีวีทั้งหมด"
            : "Program schedule of all channels";
        presenceData.smallImageKey = "question";
        break;
      default:
        presenceData.details = "Tv";
        presenceData.state = lang === "th-th" ? "หน้าแรก" : "Home page";
        break;
    }
  } else {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  if (!time) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  if (privacy) {
    delete presenceData.state;
    delete presenceData.buttons;
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
