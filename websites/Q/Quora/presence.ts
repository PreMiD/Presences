const quora = new Presence({
    clientId: "798449961691250709"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let question, taxonomy, account: string;

quora.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname.match(/[A-Za-z]+.quora.com/)) {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing homepage";
    } else if (document.location.pathname == "/notifications") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing notifications";
    } else if (document.location.pathname == "/following") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing feed";
    } else if (document.location.pathname == "/answer") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing questions to be answered";
    } else if (document.location.pathname == "/answer/requests") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing answer requests";
    } else if (document.location.pathname == "/answer/answer_later") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing answer drafts";
    } else if (document.location.pathname.includes("/q/")) {
      presenceData.startTimestamp = browsingStamp;
      taxonomy = document.querySelector(
        ".qu-fontSize--xlarge > span:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)"
      ).textContent;
      presenceData.details = "Viewing space:";
      presenceData.state = taxonomy;
    } else if (document.location.pathname.includes("/topic/")) {
      presenceData.startTimestamp = browsingStamp;
      taxonomy = document.querySelector(
        ".qu-fontSize--xlarge > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)"
      ).textContent;
      presenceData.details = "Viewing topic:";
      presenceData.state = taxonomy;
    } else if (document.location.pathname.includes("/profile/")) {
      presenceData.startTimestamp = browsingStamp;
      account = document.querySelector(
        ".qu-ml--medium > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)"
      ).textContent;
      presenceData.details = "Viewing profile:";
      presenceData.state = account;
    } else if (
      document.location.pathname.match(/^\/[A-Za-z0-9\%\-]+\/answer\//)
    ) {
      presenceData.startTimestamp = browsingStamp;
      question = document.querySelector(
        ".puppeteer_test_question_title > span:nth-child(1) > span:nth-child(1)"
      ).textContent;
      account = document.querySelector(
        ".spacing_log_answer_header > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > span:nth-child(1)"
      ).textContent;
      presenceData.details = "Viewing " + account + "'s answer for:";
      presenceData.state = question;
    } else if (document.location.pathname.match(/^\/[A-Za-z0-9\%\-]+/)) {
      presenceData.startTimestamp = browsingStamp;
      question = document.querySelector(
        "div.qu-bold:nth-child(2) > span:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)"
      ).textContent;
      presenceData.details = "Viewing question:";
      presenceData.state = question;
    }

    if (presenceData.details == null) {
      quora.setTrayTitle();
      quora.setActivity();
    } else {
      quora.setActivity(presenceData);
    }
  }
});
