const presence = new Presence({
  clientId: "655247212728811530"
});

let currentURL = new URL(document.location.href),
  currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/");
const browsingStamp = Math.floor(Date.now() / 1000);
let presenceData: PresenceData = {
  details: "Viewing an unsupported page",
  largeImageKey: "lg",
  startTimestamp: browsingStamp
};
const updateCallback = {
    _function: null as () => void,
    get function(): () => void {
      return this._function;
    },
    set function(parameter) {
      this._function = parameter;
    },
    get present(): boolean {
      return this._function !== null;
    }
  },
  /**
   * Initialize/reset presenceData.
   */
  resetData = (
    defaultData: PresenceData = {
      details: "Viewing an unsupported page",
      largeImageKey: "lg",
      startTimestamp: browsingStamp
    }
  ): void => {
    currentURL = new URL(document.location.href);
    currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/");
    presenceData = { ...defaultData };
  };

((): void => {
  let raceStamp: number = null;

  if (currentURL.hostname === "play.typeracer.com") {
    /*

		Part 1
		play.typeracer.com (game page)
		
		*/

    updateCallback.function = (): void => {
      if (document.querySelector(".gameView")) {
        presenceData.details = "Playing a race";
        const gameStatusLabel =
          document.querySelector(".gameStatusLabel").textContent;

        if (gameStatusLabel === "Waiting for more people...") {
          presenceData.state = "Waiting for more people...";
          if (raceStamp === null) raceStamp = Math.floor(Date.now() / 1000);
          presenceData.startTimestamp = raceStamp;
        } else if (gameStatusLabel === "The race is about to start!") {
          presenceData.state = "Counting down...";
          presenceData.endTimestamp =
            Math.floor(Date.now() / 1000) +
            Number(
              document
                .querySelector(".countdownPopup .time")
                .textContent.slice(1)
            );
          raceStamp = null;
        } else if (
          gameStatusLabel === "The race is on! Type the text below:" ||
          gameStatusLabel === "Go!"
        ) {
          const textBox = document.querySelector(
              "table.gameView > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div"
            ),
            lettersTotal = textBox.textContent.length;
          let lettersTyped = 0;
          for (const i in textBox.children) {
            if (
              typeof textBox.children[i] !== "number" &&
              typeof textBox.children[i] !== "function"
            ) {
              if (
                getComputedStyle(textBox.children[i]).color ===
                "rgb(153, 204, 0)"
              ) {
                lettersTyped += textBox.children[i].textContent.length;
              }
            }
          }
          const percentage =
              Math.round((lettersTyped / lettersTotal) * 10000) / 100,
            wpm = document
              .querySelector(".rankPanelWpm-self")
              .textContent.toUpperCase();
          presenceData.state = `${percentage}%, ${wpm}`;
          if (raceStamp === null) raceStamp = Math.floor(Date.now() / 1000);
          presenceData.startTimestamp = raceStamp;
        } else if (
          gameStatusLabel === "The race has ended." ||
          gameStatusLabel.startsWith("You finished")
        ) {
          presenceData.details = "Just finished with a race";
          const wpm = document
              .querySelector(".rankPanelWpm-self")
              .textContent.toUpperCase(),
            accuracy = document.querySelector(
              ".tblOwnStats > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(2)"
            ).textContent,
            time = document.querySelector(
              ".tblOwnStats > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)"
            ).textContent;
          presenceData.state = `${wpm}, ${accuracy} acc., ${time}`;
          presenceData.startTimestamp = browsingStamp;
        }
      } else {
        presenceData.details = "Viewing the home page";
      }
    };
  } else if (currentURL.hostname === "data.typeracer.com") {
    /*
		
		Part 2
		data.typeracer.com (pit stop and misc. pages)
		
		*/

    if (currentPath[0] === "pit") {
      if (currentPath[1] === "profile") {
        presenceData.details = "Viewing a racer profile";
        presenceData.state =
          document.querySelector("#profileUsername").textContent || null;
      } else if (currentPath[1] === "text_info") {
        presenceData.details = "Viewing a text";
        presenceData.state = currentURL.searchParams.get("id");
      } else if (currentPath[1] === "result") {
        presenceData.details = "Viewing a race result";
        presenceData.state = `Race ${
          currentURL.searchParams.get("id").split("|")[2]
        } of ${currentURL.searchParams.get("id").split("|")[1].slice(3)}`;
      } else if (currentPath[1] === "race_history") {
        presenceData.details = "Viewing someone's race history";
        presenceData.state = currentURL.searchParams.get("user") || null;
      } else if (currentPath[1] === "home") {
        presenceData.details = "Viewing the pit stop";
      } else if (currentPath[1] === "competitions") {
        presenceData.details = "Viewing the competition result";
        const option = document
            .querySelector("option[selected]")
            .textContent.trim(),
          strong = document
            .querySelector("div.themeContent > div:nth-child(5) > strong")
            .textContent.trim()
            .slice(0, -1)
            .split(" ");
        if (option === "day") presenceData.state = strong.join(" ");
        else if (option === "week")
          presenceData.state = `${strong[1]} ${strong[2]}, ${strong[4]}`;
        else if (option === "month")
          presenceData.state = `${strong[3]} ${strong[4]}`;
        else if (option === "year") presenceData.state = strong[2];
      } else if (currentPath[1] === "login") {
        presenceData.details = "Logging in";
      } else {
        const pageNames: { [index: string]: string } = {
          upgrade_account: "Upgrade your account",
          tos: "Terms of Service",
          privacy_poicy: "Privacy Policy"
        };
        presenceData.details = "Viewing a page";
        presenceData.state = pageNames[currentPath[1]];
      }
    } else if (currentPath[0] === "misc") {
      if (currentPath[1] === "about") {
        presenceData.details = "Viewing a page";
        presenceData.state = "About";
      }
    } else if (currentPath[0] === "admin") {
      presenceData.details = "Viewing school admin pages";
    }
  }
})();

if (updateCallback.present) {
  const defaultData = { ...presenceData };
  presence.on("UpdateData", async () => {
    resetData(defaultData);
    updateCallback.function();
    presence.setActivity(presenceData);
  });
} else {
  presence.on("UpdateData", async () => {
    presence.setActivity(presenceData);
  });
}
