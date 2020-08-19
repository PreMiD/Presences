var presence = new Presence({
    clientId: "745570917823807519"
});
function translate(is_male) {
    // TODO: make refferGender automatic
    var refferGender = function (arr) { return (is_male ? arr[0] : arr[1]); };
    var reporting = refferGender(["מדווח", "מדווחת"]);
    var removingQuestion = refferGender(["מוחק שאלה", "מוחקת שאלה"]);
    var removingPenfriends = refferGender([
        "מוחק מסר בחברים לעט",
        "מוחקת מסר בחברים לעט"
    ]);
    var removingAnswer = refferGender(["מוחק תשובה", "מוחקת תשובה"]);
    var editingQuestion = refferGender(["עורך שאלה", "עורכת שאלה"]);
    var editingAnswer = refferGender(["עורך תשובה", "עורכת תשובה"]);
    return {
        "default": refferGender(["גולש בסטיפס", "גולשת בסטיפס"]),
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
            "hot": {
                main: "צופה בשאלות החמות",
                report: reporting,
                remove: removingQuestion,
                edit: editingQuestion
            },
            "me": {
                main: refferGender(["צופה בשאלות ששאל", "צופה בשאלות ששאלה"]),
                report: reporting,
                remove: removingQuestion,
                edit: editingQuestion
            },
            "unknown": "צופה בשאלות"
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
            "any": {
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
function elemExists(query) {
    return document.querySelector(query) ? true : false;
}
var elapsed, oldUrl, lastAction, action;
var is_male = true;
var has_dark = elemExists('#darkmode');
// get gender
fetch("https://stips.co.il/api?name=user.get_app_user").then(function (resp) {
    return resp.json().then(function (json) {
        if (json.data.appUser.gender === "male")
            is_male = true;
        else
            is_male = false;
    });
});
// main loop
presence.on("UpdateData", function () {
    var _a;
    var details = undefined, state = undefined;
    var Path = window.location.pathname;
    var PathMain = Path.split('/')[1];
    var PathSecond = Path.split('/')[2];
    var isReport = false, isDelete = false, isAns = true, isEdit = false, isWrite = false;
    if (PathMain === "")
        PathMain = "/";
    if (!PathSecond)
        PathSecond = "/";
    // detect url changes
    if (window.location.href !== oldUrl || lastAction !== action) {
        oldUrl = window.location.href;
        lastAction = action;
        elapsed = Math.floor(Date.now() / 1000);
    }
    switch (PathMain) {
        case "/":
            details = translate(is_male)["/"].main;
            action = Path + " & " + details;
            break;
        case "ask":
            // get elements info
            isReport = elemExists("app-report-send");
            isDelete = elemExists("app-item-editor-delete");
            isEdit = elemExists(".edit-view");
            isWrite = elemExists(".active app-add-item-form");
            if (isDelete)
                isAns = elemExists("app-item app-item-editor-delete");
            if (isEdit)
                isAns = elemExists(".list-single-item .edit-view");
            // set state text
            var askObj = translate(is_male).ask;
            if (isReport)
                details = askObj.report;
            if (isDelete)
                details = isAns ? askObj.removeAns : askObj.removeAsk;
            if (isEdit)
                details = isAns ? askObj.editAns : askObj.editAsk;
            if (isWrite)
                details = askObj.write;
            if (!details) {
                details = askObj.main;
            }
            action = Path + " & " + details;
            break;
        case "explore":
            isReport = elemExists("app-report-send");
            isDelete = elemExists("app-item-editor-delete");
            isEdit = elemExists(".edit-view");
            var xplrObj = translate(is_male).explore;
            // if any of the bools apply, we don't care about the second path
            if (isReport)
                details = xplrObj["/"].report;
            if (isDelete)
                details = xplrObj["/"].remove;
            if (isEdit)
                details = xplrObj["/"].edit;
            if (!details) {
                if (xplrObj.hasOwnProperty(PathSecond)) {
                    // seems like xplrObj[PathSecond] won't work
                    // let's do it manually then >'-'<
                    switch (PathSecond) {
                        case '/':
                            details = xplrObj['/'].main;
                            break;
                        case 'hot':
                            details = xplrObj.hot.main;
                            break;
                        case 'me':
                            details = xplrObj.me.main;
                            break;
                        default: details = xplrObj.unknown;
                    }
                }
                ;
            }
            action = Path + " & " + details;
            break;
        case "channel":
            isReport = elemExists("app-report-send");
            isDelete = elemExists("app-item-editor-delete");
            isEdit = elemExists(".edit-view");
            var cnlObj = translate(is_male).channel;
            if (isReport)
                details = cnlObj.report;
            if (isDelete)
                details = cnlObj.remove;
            if (isEdit)
                details = cnlObj.edit;
            if (!details) {
                details = cnlObj.main
                    .replace('%channel%', decodeURI(location.pathname.split('/')[2])) // %D7%90%D7%91%D7%92 => אבג
                    .replace('-', ' '); // סדרות-וסרטים => סדרות וסרטים
            }
            action = Path + " & " + details;
            break;
        case "pen-friends":
            isDelete = elemExists("app-item-editor-delete");
            isWrite = elemExists(".active app-add-item-form");
            var penfObj = translate(is_male)["pen-friends"];
            if (isDelete)
                details = penfObj.remove;
            if (isWrite)
                details = penfObj.write;
            if (!details)
                details = penfObj.main;
            action = Path + " & " + details;
            break;
        case "reports":
            // get elements info
            isDelete = elemExists("app-item-editor-delete");
            isEdit = elemExists(".edit-view");
            if (isDelete) {
                var _ans = 'תשובה'; // looks weird on the editor if hebrew on the same line
                isAns = document.querySelector("app-item-editor-delete .text-title").textContent.indexOf(_ans) !== -1;
            }
            if (isEdit)
                isAns = elemExists(".edit-view + mat-card.item-type-ans");
            // set state text
            var repObj = translate(is_male).reports;
            if (isDelete)
                details = isAns ? repObj.removeAns : repObj.removeAsk;
            if (isEdit)
                details = isAns ? repObj.editAns : repObj.editAsk;
            if (!details) {
                details = repObj.main;
            }
            action = Path + " & " + details;
            break;
        case "settings":
            details = translate(is_male).settings.main;
            action = Path;
            break;
        case "topic":
            isReport = elemExists("app-report-send");
            isDelete = elemExists("app-item-editor-delete");
            isEdit = elemExists(".edit-view");
            var tpcObj = translate(is_male).topic;
            if (isReport)
                details = tpcObj.report;
            if (isDelete)
                details = tpcObj.remove;
            if (isEdit)
                details = tpcObj.edit;
            if (!details) {
                details = tpcObj.main.replace('%topic%', decodeURI(location.pathname.split('/')[2]));
            }
            action = Path + " & " + details;
            break;
        case "profile":
            isDelete = elemExists("app-item-editor-delete");
            var pflObj = translate(is_male).profile;
            if (isDelete)
                details = pflObj.remove;
            if (!details) {
                details = pflObj.main.replace('%nickname%', ((_a = document.querySelector('app-user-profile .nickname')) === null || _a === void 0 ? void 0 : _a.textContent) || 'טוען...');
            }
            action = Path + " & " + details;
            break;
        case "notifications":
            details = translate(is_male).notifications.main;
            action = Path;
            break;
        case "messages":
            var msgObj = translate(is_male).messages;
            if (PathSecond === '/') {
                details = elemExists('app-contacts') ? msgObj["/"].additionalPage : msgObj["/"].main;
            }
            else {
                details = elemExists('.user-nickname') ?
                    msgObj.any.main.replace('%nickname%', document.querySelector('.user-nickname').textContent) :
                    msgObj["/"].main; // invalid <user-id> in path
            }
            action = Path + " & " + details;
            break;
        case "post":
            var pstObj = translate(is_male).post;
            if (PathSecond === 'ask') {
                details = pstObj.ask.main;
            }
            action = Path + " & " + details;
            break;
    }
    // uh.. well.. it works.. (╯°□°）╯︵ ┻━┻
    var smallImageText = location.host + decodeURI(location.pathname.split('/').length === 4 ? location.pathname.replace('/' + location.pathname.split('/').pop(), '') : (location.pathname === '/' ? "" : location.pathname));
    var data = {
        details: details || translate(is_male)["default"],
        state: state,
        largeImageKey: "stips",
        smallImageKey: has_dark ? "stipspin_dark" : "stipspin_light",
        startTimestamp: elapsed,
        smallImageText: smallImageText
    };
    presence.setActivity(data);
});
