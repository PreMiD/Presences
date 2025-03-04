const presence = new Presence({
  clientId: "1336750164815384732",
});
const strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
});
const browsingTimestamp = Math.floor(Date.now() / 1000);

const singlePageTitles: { [key: string]: string } = {
  "about": "À propos",
  "accounts": "Paramètres",
  "blog": "Blog",
  "comment-creer-un-quiz": "Aide",
  "contact": "Contact",
  "edition": "Édition",
  "options": "Paramètres",
  "remarques": "Contact",
  "resultats": "Classements",
  "themes-prives": "Thèmes privés",
  "user": "Paramètres",
  "visite_guidee": "Aide"
};
const themeColors: { [key: string]: string } = {
  "bgcolor1v3": "Culture classique",
  "bgcolor2v3": "Culture moderne",
  "bgcolor3v3": "Culture générale",
  "bgcolor4v3": "Géographie",
  "bgcolor5v3": "Histoire",
  "bgcolor6v3": "Animaux et plantes",
  "bgcolor7v3": "Sciences et techniques",
  "bgcolor8v3": "Sport"
};

function getUsername() {
  if (document.querySelector("#userBtn2")) {
    let username = document.querySelector("#userBtn2")?.innerHTML.trim();
    return `@${username}`;
  } else if (document.querySelector("#userBtn3")) {
    return "Non connecté";
  }
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "https://i.imgur.com/hXqpJFa.png",
    startTimestamp: browsingTimestamp,
  };
  const [showUsername] = await Promise.all([
    presence.getSetting<boolean>('username')
  ])
  let urlData = window.location.pathname.split('/').filter(part => part);
  let urlParams = new URLSearchParams(window.location.search);
  let pageTitle = document.title;

  if (urlData.length === 0) {
    presenceData.details = "Page d'accueil";
    if (showUsername) presenceData.state = getUsername();
  } else if (urlData[0] && singlePageTitles.hasOwnProperty(urlData[0])) {
    presenceData.details = singlePageTitles[urlData[0]];
  } else if (urlData[0] === "duels") {
    if (urlData.length > 1) {
      if (urlData[1] === "a-relever") {
        presenceData.details = "Duels à relever";
        if (showUsername) presenceData.state = getUsername();
      } else if (urlData[1] === "en-attente") {
        presenceData.details = "Duels en attente";
        if (showUsername) presenceData.state = getUsername();
      } else if (urlData[1] === "termines") {
        if (urlParams.has("u")) {
          presenceData.details = `Bilan contre @${urlParams.get("u")}`;
        } else {
          presenceData.details = "Duels terminés";
        }
        if (showUsername) presenceData.state = getUsername();
      } else if (urlData[1] === "nouveaux-messages") {
        presenceData.details = "Boîte de réception";
        if (showUsername) presenceData.state = getUsername();
      } else {
        presenceData.details = "Dans un duel";
        if (document.querySelector("#userBtn2")) {
          var duelTitle = document.querySelector('.duel_title')?.innerHTML.replace("Duel : ", '');
          let qNum, qTotal;
          if (!document.querySelector('.resultContainer')) {
            qNum = document.querySelector('#currentQuestionIndex')?.innerHTML;
            qTotal = 10;
            if (qNum && qTotal)
              presenceData.state = `${duelTitle} | Q. ${qNum}/${qTotal}`;
            else if (duelTitle)
              presenceData.state = `${duelTitle}`;
          } else {
            presenceData.details = "Duel terminé";
            qNum = 0;
            qTotal = 10;
            let name_p1 = document.querySelector('#p1TopRow')?.innerHTML.trim();
            let name_p2 = document.querySelector('#p2TopRow')?.innerHTML.trim();
            let score_p1 = document.querySelector('#p1GR')?.innerHTML.trim();
            let score_p2 = document.querySelector('#p2GR')?.innerHTML.trim();
            let username = document.querySelector("#userBtn2")?.innerHTML.trim();
            if (name_p1 === username) {
              qNum = score_p1;
              presenceData.state = `${duelTitle} | Score : ${qNum}/${qTotal}`;
            } else if (name_p2 === username) {
              qNum = score_p2;
              presenceData.state = `${duelTitle} | Score : ${qNum}/${qTotal}`;
            }
          }
        } else if (document.querySelector("#userBtn3")) {
          presenceData.state = "Non connecté";
        }
      }
    } else {
      presenceData.details = "Duels";
      if (document.querySelector("#userBtn2")) {
        const rankElem = document.querySelector('a[href="/resultats/classement-duels/"');
        if (!rankElem) {
          return presence.setActivity(presenceData);
        }

        const rankInfo = Array.from(rankElem.childNodes)
          .reduce((acc: string, node: Node) => {
            return acc + (node.nodeType === Node.TEXT_NODE ? node.textContent || '' : '');
          }, '')
          .replace(/[()e]/g, '')
          .replace("points", '')
          .split(',')
          .map((x: string) => x.trim());

        if (!rankInfo[0] || !rankInfo[1]) {
          return presence.setActivity(presenceData);
        }
        if (showUsername) presenceData.state = `${getUsername()}  |  ${rankInfo[0]}e  |  ${rankInfo[1]} pts`;
      } else if (document.querySelector("#userBtn3")) {
        presenceData.state = "Non connecté";
      }
    }
  } else if (urlData[0] === "defi-du-jour") {
    presenceData.details = "Défi du jour";
    if (urlData.length > 1) {
      if (urlData[1] == "archives") {
        presenceData.details = "Défi du jour - Archives";
        if (urlData.length >= 5) {
          let archiveDate = new Date(`${urlData[2]}/${urlData[3]}/${urlData[4]}`);
          if (!document.querySelector('.resultContainer')) {
            presenceData.state = `Défi du ${archiveDate.toLocaleDateString('fr-FR')}`;
          } else {
            let scoreElem = document.querySelector('.resultContainer')?.querySelector('.res_main_msg .sub_res:nth-child(1)');
            let timeElem = document.querySelector('.resultContainer')?.querySelector('.res_main_msg .sub_res:nth-child(2)');
            let score, time;
            if (scoreElem) {
              score = Array.from(scoreElem.childNodes).reduce((acc: string, node: Node) => {
                return acc + (node.nodeType === Node.TEXT_NODE ? node.textContent || '' : '');
              }, '').replace(/\s+/g, '');
            }
            if (timeElem) {
              time = Array.from(timeElem.childNodes).reduce((acc: string, node: Node) => {
                return acc + (node.nodeType === Node.TEXT_NODE ? node.textContent || '' : '');
              }, '').replace(/\s+/g, '');
            }
            if (score && time)
              presenceData.state = `Défi du ${archiveDate.toLocaleDateString('fr-FR')}  |  ${score}  |  ${time.replace(' ', '')}`;
          }
        }
      } else if (urlData[1] == "entrainement") {
        presenceData.details = "Entraînement";
        if (document.querySelector("#userBtn2")) {
          if (!document.querySelector('.resultContainer')) {
            let qNum, qTotal;
            var duelColor = document.querySelector('.question_icon')?.classList[1];
            var duelTitle = duelColor ? themeColors[duelColor] : "";
            qNum = document.querySelector('#currentQuestionIndex')?.innerHTML;
            qTotal = 20;
            if (qNum && qTotal)
              presenceData.state = `${duelTitle} | Q. ${qNum}/${qTotal}`;
            else if (duelTitle)
              presenceData.state = `${duelTitle}`;
          } else {
            presenceData.details = "Entraînement terminé";
            var duelColor = document.querySelector('.question_icon')?.classList[1];
            var duelTitle = duelColor ? themeColors[duelColor] : "";
            let scoreElem = document.querySelector('.resultContainer')?.querySelector('.res_main_msg');
            let score = scoreElem ? Array.from(scoreElem.childNodes).reduce((acc: string, node: Node) => acc + (node.nodeType === Node.TEXT_NODE ? node.textContent || '' : ''), '').replace(/\s+/g, '') : "";
            score = score.replace('Résultat', '').replace(':', '').replace(' ', '');
            presenceData.state = `${duelTitle} ${score ? '| Score :' : ''} ${score}`;
          }
        } else if (document.querySelector("#userBtn3")) {
          presenceData.state = "Non connecté";
        }
      }
    } else {
      if (!document.querySelector('.resultContainer')) {
        let qNum = document.querySelector('#currentQuestionIndex')?.innerHTML;
        let qTotal = 20;
        if (qNum && qTotal)
          presenceData.state = `Q. ${qNum}/${qTotal}`;
      } else {
        let scoreElem = document.querySelector('.resultContainer')?.querySelector('.res_main_msg .sub_res:nth-child(1)');
        let timeElem = document.querySelector('.resultContainer')?.querySelector('.res_main_msg .sub_res:nth-child(2)');
        let score, time;
        if (scoreElem) {
          score = Array.from(scoreElem.childNodes)
            .reduce((acc: string, node: Node) => {
              return acc + (node.nodeType === Node.TEXT_NODE ? node.textContent || '' : '');
            }, '')
            .replace(/\s+/g, '');
        }
        if (timeElem) {
          time = Array.from(timeElem.childNodes)
            .reduce((acc: string, node: Node) => {
              return acc + (node.nodeType === Node.TEXT_NODE ? node.textContent || '' : '');
            }, '')
            .replace(/\s+/g, '');
        }
        if (score && time)
          presenceData.state = `Terminé  |  ${score}  |  ${time.replace(' ', '')}`;
      }
    }
  } else if (urlData[0] === "masterQuiz") {
    presenceData.details = "MasterQuiz";
    if (document.querySelector("#userBtn2")) {
      if (!document.querySelector('.resultContainer')) {
        var themeColor = document.querySelector('.question_icon')?.classList[1];
        var themeTitle = themeColor ? themeColors[themeColor] : "";
        let qNum = document.querySelector('#currentQuestionIndex')?.innerHTML;
        if (qNum) presenceData.state = `${themeTitle} | Q. ${qNum}`;
        else if (themeTitle)
          presenceData.state = `${themeTitle}`;
      } else {
        presenceData.details = "MasterQuiz - Terminé";
        var themeColor = document.querySelector('.question_icon')?.classList[1];
        var themeTitle = themeColor ? themeColors[themeColor] : "";
        let scoreElem = document.querySelector('.resultContainer .res_main_msg');
        let score = "";
        if (scoreElem instanceof HTMLElement) {
          score = scoreElem.innerText.trim();
          if (/\d/.test(score)) {
            // keep only digits
            score = score.replace(/\D/g, '');
          } else {
            score = "0";
          }
        }
        presenceData.state = `${themeTitle} ${score ? '| Score :' : ''} ${score}`;
      }
    } else if (document.querySelector("#userBtn3")) {
      presenceData.state = "Non connecté";
    }
  } else if (pageTitle !== "Quizypedia") {
    presenceData.details = pageTitle;
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
