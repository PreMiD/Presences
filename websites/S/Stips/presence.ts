const presence = new Presence({
  clientId: "745570917823807519"
});

function translate(is_male: boolean): object {
  const refferGender = (arr: Array<string>): string =>
      is_male ? arr[0] : arr[1],
    reporting: string = refferGender(["מדווח", "מדווחת"]),
    removingQuestion: string = refferGender(["מוחק שאלה", "מוחקת שאלה"]),
    removingPenfriends: string = refferGender([
      "מוחק מסר בחברים לעט",
      "מוחקת מסר בחברים לעט"
    ]),
    removingAnswer: string = refferGender(["מוחק תשובה", "מוחקת תשובה"]),
    editingQuestion: string = refferGender(["עורך שאלה", "עורכת שאלה"]),
    editingAnswer: string = refferGender(["עורך תשובה", "עורכת תשובה"]);

  return {
    default: refferGender(["גולש בסטיפס", "גולשת בסטיפס"]),
    "/": {
      main: "בעמוד הראשי"
    },
    ask: {
      main: refferGender(["קורא שאלה", "קוראת שאלה"]),
      scroll: refferGender(["קורא תשובות", "קוראת תשובות"]),
      write: refferGender(["כותב תשובה", "כותבת תשובה"]),
      report: reporting,
      removeAsk: removingQuestion,
      removeAns: removingAnswer,
      editAsk: editingQuestion,
      editAns: editingAnswer
    },
    explore: {
      "/": {
        main: "צופה בשאלות חדשות",
        report: reporting,
        remove: removingQuestion,
        edit: editingQuestion
      },
      hot: {
        main: "צופה בשאלות החמות",
        report: reporting,
        remove: removingQuestion,
        edit: editingQuestion
      },
      me: {
        main: refferGender(["צופה בשאלות ששאל", "צופה בשאלות ששאלה"]),
        report: reporting,
        remove: removingQuestion,
        edit: editingQuestion
      },
      unknown: "צופה בשאלות"
    },
    channel: {
      main: "צופה בשאלות בחדר %channel%",
      report: reporting,
      remove: removingQuestion,
      edit: editingQuestion
    },
    "pen-friends": {
      main: "בחברים לעט",
      remove: removingPenfriends,
      write: refferGender(["כותב מסר בחברים לעט", "כותבת מסר בחברים לעט"])
    },
    reports: {
      main: "ברשימת הדיווחים",
      removeAsk: removingQuestion,
      removeAns: removingAnswer,
      editAsk: editingQuestion,
      editAns: editingAnswer
    },
    settings: {
      main: "בהגדרות"
    },
    topic: {
      main: "צופה בשאלות בנושא %topic%",
      report: reporting,
      remove: removingQuestion,
      edit: editingQuestion
    },
    profile: {
      main: "בפרופיל של %nickname%",
      scroll: "בקיר התודות של %nickname%",
      remove: refferGender(["מוחק מסר בקיר התודות", "מוחקת מסר בקיר התודות"])
    },
    notifications: {
      main: "צופה בהתראות"
    },
    messages: {
      "/": {
        main: "במסרים",
        additionalPage: refferGender(["מסתכל באנשי הקשר", "מסתכלת באנשי הקשר"])
      },
      any: {
        // /messages/<user_id> //
        main: "בשיחה עם %nickname%"
      }
    },
    post: {
      ask: {
        main: refferGender(["כותב שאלה", "כותבת שאלה"])
      }
    }
  };
}

function elemExists(query: string): boolean {
  return document.querySelector(query) ? true : false;
}

let elapsed: number,
  oldUrl: string,
  lastAction: string,
  action: string,
  is_male = true;
const has_dark: boolean = elemExists("#darkmode");

// get gender
fetch("https://stips.co.il/api?name=user.get_app_user").then((resp) =>
  resp.json().then((json) => {
    if (json.data.appUser.gender === "male") is_male = true;
    else is_male = false;
  })
);

// main loop
presence.on("UpdateData", () => {
  const Path = window.location.pathname;
  let PathMain: string = Path.split("/")[1],
    PathSecond: string = Path.split("/")[2],
    details = undefined,
    isReport = false,
    isDelete = false,
    isAns = true,
    isEdit = false,
    isWrite = false,
    askObj,
    xplrObj,
    cnlObj,
    msgObj,
    pflObj,
    repObj,
    tpcObj,
    pstObj,
    penfObj;

  if (PathMain === "") PathMain = "/";
  if (!PathSecond) PathSecond = "/";

  // detect url changes
  if (window.location.href !== oldUrl || lastAction !== action) {
    oldUrl = window.location.href;
    lastAction = action;
    elapsed = Math.floor(Date.now() / 1000);
  }

  switch (PathMain) {
    case "/":
      details = translate(is_male)["/"].main;
      action = `${Path} & ${details}`;
      break;
    case "ask":
      // get elements info
      isReport = elemExists("app-report-send");
      isDelete = elemExists("app-item-editor-delete");
      isEdit = elemExists(".edit-view");
      isWrite = elemExists(".active app-add-item-form");
      if (isDelete) isAns = elemExists("app-item app-item-editor-delete");
      if (isEdit) isAns = elemExists(".list-single-item .edit-view");

      // set state text
      askObj = translate(is_male).ask;
      if (isReport) details = askObj.report;
      if (isDelete) details = isAns ? askObj.removeAns : askObj.removeAsk;
      if (isEdit) details = isAns ? askObj.editAns : askObj.editAsk;
      if (isWrite) details = askObj.write;

      if (!details) {
        details = askObj.main;
      }

      action = `${Path} & ${details}`;
      break;
    case "explore":
      isReport = elemExists("app-report-send");
      isDelete = elemExists("app-item-editor-delete");
      isEdit = elemExists(".edit-view");

      xplrObj = translate(is_male).explore;

      // if any of the bools apply, we don't care about the second path
      if (isReport) details = xplrObj["/"].report;
      if (isDelete) details = xplrObj["/"].remove;
      if (isEdit) details = xplrObj["/"].edit;

      if (!details) {
        if (xplrObj.hasOwnProperty(PathSecond)) {
          // seems like xplrObj[PathSecond] won't work
          // let's do it manually then >'-'<
          switch (PathSecond) {
            case "/":
              details = xplrObj["/"].main;
              break;
            case "hot":
              details = xplrObj.hot.main;
              break;
            case "me":
              details = xplrObj.me.main;
              break;
            default:
              details = xplrObj.unknown;
          }
        }
      }

      action = `${Path} & ${details}`;
      break;
    case "channel":
      isReport = elemExists("app-report-send");
      isDelete = elemExists("app-item-editor-delete");
      isEdit = elemExists(".edit-view");

      cnlObj = translate(is_male).channel;

      if (isReport) details = cnlObj.report;
      if (isDelete) details = cnlObj.remove;
      if (isEdit) details = cnlObj.edit;

      if (!details) {
        details = cnlObj.main
          .replace("%channel%", decodeURI(location.pathname.split("/")[2])) // %D7%90%D7%91%D7%92 => אבג
          .replace("-", " "); // סדרות-וסרטים => סדרות וסרטים
      }

      action = `${Path} & ${details}`;
      break;
    case "pen-friends":
      isDelete = elemExists("app-item-editor-delete");
      isWrite = elemExists(".active app-add-item-form");

      penfObj = translate(is_male)["pen-friends"];
      if (isDelete) details = penfObj.remove;
      if (isWrite) details = penfObj.write;
      if (!details) details = penfObj.main;

      action = `${Path} & ${details}`;
      break;
    case "reports":
      // get elements info
      isDelete = elemExists("app-item-editor-delete");
      isEdit = elemExists(".edit-view");

      if (isDelete) {
        isAns =
          document
            .querySelector("app-item-editor-delete .text-title")
            .textContent.indexOf("תשובה") !== -1;
      }
      if (isEdit) isAns = elemExists(".edit-view + mat-card.item-type-ans");

      // set state text
      repObj = translate(is_male).reports;
      if (isDelete) details = isAns ? repObj.removeAns : repObj.removeAsk;
      if (isEdit) details = isAns ? repObj.editAns : repObj.editAsk;

      if (!details) {
        details = repObj.main;
      }

      action = `${Path} & ${details}`;
      break;
    case "settings":
      details = translate(is_male).settings.main;
      action = Path;
      break;
    case "topic":
      isReport = elemExists("app-report-send");
      isDelete = elemExists("app-item-editor-delete");
      isEdit = elemExists(".edit-view");

      tpcObj = translate(is_male).topic;

      if (isReport) details = tpcObj.report;
      if (isDelete) details = tpcObj.remove;
      if (isEdit) details = tpcObj.edit;

      if (!details) {
        details = tpcObj.main.replace(
          "%topic%",
          decodeURI(location.pathname.split("/")[2])
        );
      }

      action = `${Path} & ${details}`;
      break;
    case "profile":
      isDelete = elemExists("app-item-editor-delete");

      pflObj = translate(is_male).profile;

      if (isDelete) details = pflObj.remove;

      if (!details) {
        details = pflObj.main.replace(
          "%nickname%",
          document.querySelector("app-user-profile .nickname")?.textContent ||
            "טוען..."
        );
      }

      action = `${Path} & ${details}`;
      break;
    case "notifications":
      details = translate(is_male).notifications.main;
      action = Path;
      break;
    case "messages":
      msgObj = translate(is_male).messages;

      if (PathSecond === "/") {
        details = elemExists("app-contacts")
          ? msgObj["/"].additionalPage
          : msgObj["/"].main;
      } else {
        details = elemExists(".user-nickname")
          ? msgObj.any.main.replace(
              "%nickname%",
              document.querySelector(".user-nickname").textContent
            )
          : msgObj["/"].main; // invalid <user-id> in path
      }

      action = `${Path} & ${details}`;
      break;
    case "post":
      pstObj = translate(is_male).post;
      if (PathSecond === "ask") {
        details = pstObj.ask.main;
      }
      action = `${Path} & ${details}`;
      break;
  }

  const smallImageText =
      location.host +
      decodeURI(
        location.pathname.split("/").length === 4
          ? location.pathname.replace(
              "/" + location.pathname.split("/").pop(),
              ""
            )
          : location.pathname === "/"
          ? ""
          : location.pathname
      ),
    data: PresenceData = {
      details: details || translate(is_male).default,
      state: undefined,
      largeImageKey: "stips",
      smallImageKey: has_dark ? "stipspin_dark" : "stipspin_light",
      startTimestamp: elapsed,
      smallImageText: smallImageText
    };

  presence.setActivity(data);
});
