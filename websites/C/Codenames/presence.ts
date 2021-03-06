type availableColors = "red" | "blue" | "beige";

const presence = new Presence({
    clientId: "817859401477259315"
  }),
  slideshow = presence.createSlideshow(),
  icons = {
    red: [
      "red1",
      "red2",
      "red3",
      "red4",
      "red5",
      "red6",
      "red7",
      "red8",
      "red9"
    ],
    blue: [
      "blue1",
      "blue2",
      "blue3",
      "blue4",
      "blue5",
      "blue6",
      "blue7",
      "blue8",
      "blue9"
    ],
    beige: ["beige1", "beige2", "beige3", "beige4", "beige5", "beige6"]
  };

let browsingStamp = Math.floor(Date.now() / 1000),
  lastTeamLog: availableColors = "beige",
  currentlySetColor: availableColors = "beige";

presence.on("UpdateData", async () => {
  let presenceData: PresenceData = {
    largeImageKey: "codenames"
  };

  const buttons = await presence.getSetting("buttons");

  //* If in a game or not
  if (document.querySelector("#gamescene")) {
    if (buttons) {
      presenceData.buttons = [
        {
          label: "Join room",
          url: document.URL
        }
      ];
    }
    if (document.querySelector(".justify-start.items-center")) {
      presenceData.details = "Waiting for game";
      presenceData.state = "to start...";
      if (lastTeamLog !== "beige") {
        browsingStamp = Math.floor(Date.now() / 1000);
        lastTeamLog = "beige";
      }
      presenceData.startTimestamp = browsingStamp;
      if (slideshow.getSlides().length) {
        presence.info(`Removing all cards from SlideShow.`);
        slideshow.deleteAllSlides();
      }
    } else {
      const logDataLength = document.querySelector(".scrollTarget").children
        .length;
      if (logDataLength) {
        const team = document
          .querySelector(".scrollTarget")
          .children[logDataLength - 1].className.split("team-")[1]
          .split(" ")[0] as availableColors;
        if (team !== lastTeamLog) {
          browsingStamp = Math.floor(Date.now() / 1000);
          slideshow.deleteAllSlides();
          presence.info(`Removing all cards from SlideShow.`);
          lastTeamLog = team;
        }
      }
      presenceData.startTimestamp = browsingStamp;
      const allCards = Array.from(
          document.querySelectorAll("section")
        ).filter((s) => s.className?.includes("items-center")),
        availableCards = Array.from(document.querySelectorAll("section"))
          .filter((s) => s.className?.includes("items-center"))
          .filter((i) => {
            const style = i.parentElement.parentElement.style.transform;
            if (
              Array.from(document.querySelectorAll(".coverToken")).find(
                (t) =>
                  (t as HTMLElement).style.transform.split("scale")[0] ===
                  style.split("scale")[0]
              )
            )
              return false;
            else return true;
          }),
        foundCards = allCards.filter((x) => !availableCards.includes(x)),
        currentClueData = Array.from(
          document.querySelectorAll("div")
        ).filter((d) => d.className?.includes("items-center text")), //Empty array if no clue, else [0] then its split into 2 divs 1 with clue other with amount
        color = Array.from(document.querySelectorAll("button"))
          .find((b) => b.className?.includes("text-base color-"))
          .attributes.getNamedItem("color").value as availableColors;

      if (color !== currentlySetColor) {
        slideshow.deleteAllSlides();
        presence.info(`Removing all cards from SlideShow.`);
        currentlySetColor = color;
      }

      let randomInt = 0;
      availableCards.forEach((card, index) => {
        const name = card.textContent;
        if (!slideshow.hasSlide(name)) {
          presence.info(`Adding ${name} card to SlideShow.`);
          if (randomInt > icons[color].length) randomInt = 0;
          slideshow.addSlide(
            name,
            {
              smallImageKey: icons[color][randomInt],
              smallImageText: `Available cards: ${name} (${index + 1}/${
                availableCards.length
              })`
            },
            5000
          );
          randomInt++;
        }
      });
      foundCards.forEach((card) => {
        const name = card.textContent;
        if (slideshow.hasSlide(name)) {
          presence.info(`Removing ${name} card from SlideShow.`);
          slideshow.deleteSlide(name);
        }
      });

      presenceData = { ...presenceData, ...slideshow.currentSlide };

      if (color === "beige") {
        //* Spectating
        if (currentClueData.length) {
          presenceData.details = "Spectating... Current clue:";
          presenceData.state = `${currentClueData[0].firstElementChild.textContent} (Matches ${currentClueData[0].children[1].textContent} cards)`;
        } else {
          presenceData.details = "Spectating...";
        }
      } else if (document.querySelector("input")) {
        //* is spymaster and has to put in a clue rn
        presenceData.details = "Giving a clue";
        presenceData.state = "to their operatives...";
      } else if (document.querySelector(".cursor-pointer")) {
        //* their turn to guess the clue
        presenceData.details = "Guessing clue:";
        presenceData.state = `${currentClueData[0].firstElementChild.textContent} (Matches ${currentClueData[0].children[1].textContent} cards)`;
      } else if (currentClueData.length) {
        //* waiting for clue to be guessed
        presenceData.details = "Waiting for operatives to guess clue:";
        presenceData.state = `${currentClueData[0].firstElementChild.textContent} (Matches ${currentClueData[0].children[1].textContent} cards)`;
      } else {
        //* waiting for clue to be given
        presenceData.details = "Waiting for spymaster(s)";
        presenceData.state = "to give clue...";
      }
    }
  } else {
    presenceData.startTimestamp = browsingStamp;
    if (slideshow.getSlides().length) {
      presence.info(`Removing all cards from SlideShow.`);
      slideshow.deleteAllSlides();
    }

    if (document.location.pathname.includes("/room/create")) {
      presenceData.details = "Creating a room...";
      if (buttons) {
        presenceData.buttons = [
          {
            label: "Join room",
            url: document.URL
          }
        ];
      }
    } else if (document.location.pathname.includes("/room/")) {
      presenceData.details = "Joining a room...";
      if (buttons) {
        presenceData.buttons = [
          {
            label: "Join room",
            url: document.URL
          }
        ];
      }
    } else {
      presenceData.details = "Browsing...";
    }
  }
  presence.setActivity(presenceData);
});
