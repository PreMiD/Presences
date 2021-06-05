const presence: Presence = new Presence({
    clientId: "800166344023867443"
  }),
  largeImageKey = "logo";

let elapsed = 0,
  eventType = -1;

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * -1 = unset
 * 0 = browsing
 * 1 = browsing dashboard
 * 2 = doing lessons/reviews
 */

presence.on("UpdateData", () => {
  const { hostname, pathname } = window.location,
    data: PresenceData = {};

  let details: string,
    state: string,
    smallImageKey: string,
    smallImageText: string;

  switch (hostname) {
    case "wanikani.com":
    case "www.wanikani.com": {
      switch (pathname) {
        case "/":
        case "/dashboard":
        case "/login": {
          const buttons = document.querySelectorAll(
              ".lessons-and-reviews__button"
            ),
            level: HTMLAnchorElement = document.querySelector(
              ".user-summary__attribute > a"
            );
          if (buttons.length === 2) {
            const lessons: number = +buttons[0].querySelector("span").innerText,
              reviews: number = +buttons[1].querySelector("span").innerText;
            details = "Viewing Dashboard";
            state = `${lessons} lessons | ${reviews} reviews`;
            smallImageText = level.innerHTML;
            if (lessons > reviews) {
              if (lessons < 25) {
                smallImageKey = "lessons-1";
              } else if (lessons < 50) {
                smallImageKey = "lessons-25";
              } else if (lessons < 100) {
                smallImageKey = "lessons-50";
              } else if (lessons < 250) {
                smallImageKey = "lessons-100";
              } else if (lessons < 500) {
                smallImageKey = "lessons-250";
              } else {
                smallImageKey = "lessons-500";
              }
            } else {
              if (reviews < 1) {
                smallImageKey = "reviews-0";
              } else if (reviews < 50) {
                smallImageKey = "reviews-1";
              } else if (reviews < 100) {
                smallImageKey = "reviews-50";
              } else if (reviews < 250) {
                smallImageKey = "reviews-100";
              } else if (reviews < 500) {
                smallImageKey = "reviews-250";
              } else if (reviews < 1000) {
                smallImageKey = "reviews-500";
              } else {
                smallImageKey = "reviews-1000";
              }
            }
            if (eventType !== 1) {
              elapsed = Math.round(Date.now() / 1000);
              eventType = 1;
            }
          } else {
            details = "Browsing...";
            state = "Viewing Home Page";
            if (eventType !== 0) {
              elapsed = Math.round(Date.now() / 1000);
              eventType = 0;
            }
          }
          break;
        }
        case "/review":
        case "/lesson": {
          details = "Browsing...";
          state =
            pathname === "/lesson"
              ? "Viewing Lesson Summary"
              : "Viewing Reviews Summary";
          if (eventType !== 0) {
            elapsed = Math.round(Date.now() / 1000);
            eventType = 0;
          }
          break;
        }
        case "/review/session": {
          const available: number = +(
              document.querySelector("#available-count") as HTMLElement
            ).innerText,
            completed: number = +(
              document.querySelector("#completed-count") as HTMLElement
            ).innerText,
            correctRate: number = +(
              document.querySelector("#correct-rate") as HTMLElement
            ).innerText,
            characterElement: HTMLDivElement =
              document.querySelector("#character"),
            characterText: string = characterElement.innerText,
            characterType: string = characterElement.className,
            questionType: string =
              document.querySelector("#question-type").className;
          details = "Doing Reviews";
          state = `${characterText} | ${capitalize(characterType)} ${capitalize(
            questionType
          )}`;
          smallImageText = `${completed} complete, ${available} remaining. (${correctRate}%)`;
          smallImageKey = characterType;
          if (eventType !== 2) {
            elapsed = Math.round(Date.now() / 1000);
            eventType = 2;
          }
          break;
        }
        case "/lesson/session": {
          try {
            const characterText: string =
                document.querySelector("#character").textContent,
              characterMeaning: string =
                document.querySelector("#meaning").textContent,
              completed: number =
                +document.querySelector("#completed-count").textContent,
              totalStats: NodeList =
                document.querySelectorAll("#stats li > span"),
              characterType: string =
                document.querySelector("#main-info").className;
            details = "Learning Lessons";
            state = `${characterText} - ${characterMeaning}`;
            smallImageKey = characterType;
            smallImageText = `${totalStats[0].textContent} radicals | ${totalStats[1].textContent} kanji | ${totalStats[2].textContent} vocab | ${completed} complete`;
            if (eventType !== 2) {
              elapsed = Math.round(Date.now() / 1000);
              eventType = 2;
            }
          } catch (err) {
            // Likely practicing
            const characterText: string =
                document.querySelector("#character").textContent,
              characterType: string =
                document.querySelector("#main-info").className,
              questionType: string =
                document.querySelector("#question-type").className,
              completed: number =
                +document.querySelector("#completed-count").textContent,
              totalStats: NodeList =
                document.querySelectorAll("#stats li > span");
            details = "Practicing Lessons";
            state = `${characterText} | ${capitalize(
              characterType
            )} ${capitalize(questionType)}`;
            smallImageKey = characterType;
            smallImageText = `${totalStats[0].textContent} radicals | ${totalStats[1].textContent} kanji | ${totalStats[2].textContent} vocab | ${completed} complete`;
          }
          break;
        }
        case (pathname.match(/^\/(radicals|kanji|vocabulary)\/.+$/) || {})
          .input: {
          const type: string = pathname.split("/")[1],
            text: string = (
              document.querySelector(
                `.${type.replace(/s$/, "")}-icon`
              ) as HTMLElement
            ).innerText,
            textName: string = document.querySelector(
              `.${type.replace(/s$/, "")}-icon`
            ).parentNode.childNodes[4].textContent;
          let textDescription: string = (
            document.querySelector(".mnemonic-content") as HTMLElement
          ).innerText;
          if (textDescription.length >= 50) {
            textDescription = textDescription.substr(0, 50) + "...";
          }
          details = "Browsing " + capitalize(type);
          state = `${text} | ${textName}`;
          smallImageText = textDescription;
          smallImageKey = type.replace(/s$/, "");
          break;
        }
        case (pathname.match(/^\/users\/.+$/) || {}).input: {
          details = "Viewing User Profile";
          state = document.querySelector(".username").textContent;
          smallImageKey = "avatar";
          if (eventType !== 0) {
            elapsed = Math.round(Date.now() / 1000);
            eventType = 0;
          }
          break;
        }
        default: {
          details = "Browsing...";
          state = "Viewing " + document.title.split(" / ").slice(1).join(" / ");
          if (eventType !== 0) {
            elapsed = Math.round(Date.now() / 1000);
            eventType = 0;
          }
        }
      }
      break;
    }
    case "knowledge.wanikani.com": {
      details = "Browsing WaniKani Knowledge...";
      state = document.title.split(" | ")[0];
      if (eventType !== 0) {
        elapsed = Math.round(Date.now() / 1000);
        eventType = 0;
      }
      break;
    }
    case "community.wanikani.com": {
      if (eventType !== 0) {
        elapsed = Math.round(Date.now() / 1000);
        eventType = 0;
      }
      if (/^\/u\/.+$/.test(pathname)) {
        details = "Viewing User Profile";
        smallImageKey = "avatar";
        state = document.querySelector(".username").textContent;
        break;
      }
      details = "Browsing WaniKani Community...";
      state = document.title.split(" - ")[0];
      break;
    }
  }

  if (typeof details !== "undefined") {
    data.details = details;
  }
  if (typeof state !== "undefined") {
    data.state = state;
  }
  if (typeof smallImageKey !== "undefined") {
    data.smallImageKey = smallImageKey;
  }
  if (typeof smallImageText !== "undefined") {
    data.smallImageText = smallImageText;
  }
  if (typeof largeImageKey !== "undefined") {
    data.largeImageKey = largeImageKey;
  }
  if (eventType !== -1) {
    data.startTimestamp = elapsed;
  }

  presence.setActivity(data);
});
