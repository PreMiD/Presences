const presence = new Presence({
  clientId: "958766344311025786"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  switch (location.host) {
    case "www.tofugu.com": {
      break;
    }
    case "kana-quiz.tofugu.com": {
      const page = document.querySelector(".App > div").className;
      switch (page) {
        case "start": {
          presenceData.details = "Preparing to practice kana";
          presenceData.state = document.querySelector<HTMLLabelElement>(".check")
            .htmlFor === "practice-hiragana" ?
              "Hiragana" : "Katakana";
          break;
        }
        case "quiz-page": {
          presenceData.details = "Practicing kana";
          presenceData.state = document.querySelector(".focused-card span").textContent;
          break;
        }
        case "results": {
          const [, correct, total, percent] = document.querySelector(".results > h3").textContent.match(/.*?(\d+)\/(\d+).*?([\d\.]+)/);
          presenceData.details = "Viewing kana quiz results";
          presenceData.state = `${correct}/${total} (${percent}%)`;
          break;
        }
      }
      break;
    }
  }

  presence.setActivity(presenceData);
});
