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
    if (document.location.hostname.match(/[A-Za-z]{4,}.quora.com/)) {
      presenceData.startTimestamp = browsingStamp;
      taxonomy = document.querySelector(
        "#mainContent > div.q-flex.qu-alignItems--center.qu-flexWrap--wrap > div > span > span > a > span > span > span"
      ).textContent;
      presenceData.details = "Viewing space:";
      presenceData.state = taxonomy;
    } else if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing homepage";
    } else if (document.location.pathname === "/notifications") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing notifications";
    } else if (document.location.pathname === "/following") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing feed";
    } else if (document.location.pathname === "/answer") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing questions to be answered";
    } else if (document.location.pathname === "/answer/requests") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing answer requests";
    } else if (document.location.pathname === "/answer/answer_later") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing answer drafts";
    } else if (document.location.pathname.includes("/topic/")) {
      presenceData.startTimestamp = browsingStamp;
      taxonomy = document.querySelector(
        "#mainContent > div:nth-child(1) > div > div > div.q-flex.qu-flexDirection--column.qu-justifyContent--space-around.qu-ml--medium > div.CssComponent-sc-1oskqb9-0.EditWrapper___StyledCssComponent-sc-6vsimt-0.feqBgP > div > div.q-box.qu-display--inline-block > div > span > span > span > span"
      ).textContent;
      presenceData.details = "Viewing topic:";
      presenceData.state = taxonomy;
    } else if (document.location.pathname.includes("/profile/")) {
      presenceData.startTimestamp = browsingStamp;
      account = document.querySelector(
        "#mainContent > div.q-flex.qu-flexDirection--column > div > div.q-flex.qu-flexDirection--column > div.q-flex.qu-alignItems--flex-start.qu-justifyContent--space-between > div.CssComponent-sc-1oskqb9-0.EditWrapper___StyledCssComponent-sc-6vsimt-0.feqBgP > div > div.q-box.qu-display--inline-block > div > div > div > div > span"
      ).textContent;
      presenceData.details = "Viewing profile:";
      presenceData.state = account;
    } else if (
      document.location.pathname.match(/^\/[A-Za-z0-9%-]+\/answer\//)
    ) {
      presenceData.startTimestamp = browsingStamp;
      question = document.querySelector(
        "#mainContent > div > div.q-box.qu-borderAll.qu-borderRadius--small.qu-borderColor--raised.qu-boxShadow--small.qu-bg--raised > div.q-box.qu-pt--medium.qu-px--medium.qu-pb--tiny > div.q-box.qu-mb--medium.qu-mt--small > div > span > span > a > div > div > div > div > span > span"
      ).textContent;
      account = document.querySelector(
        "#mainContent > div > div.q-box.qu-borderAll.qu-borderRadius--small.qu-borderColor--raised.qu-boxShadow--small.qu-bg--raised > div.q-box.qu-pt--medium.qu-px--medium.qu-pb--tiny > div.q-box.qu-mb--small > div > div > div.q-box.qu-alignSelf--center.qu-flex--auto > div.q-text.qu-dynamicFontSize--regular.qu-truncateLines--3.qu-passColorToLinks > span > span.CssComponent-sc-1oskqb9-0.AbstractSeparatedItems___StyledCssComponent-sc-46kfvf-0.bxBZxD > span.q-text.qu-bold > div > div > div > div > div > a > div > span"
      ).textContent;
      presenceData.details = `Viewing ${account}'s answer for:`;
      presenceData.state = question;
    } else if (document.location.pathname.match(/^\/[A-Za-z0-9%-]+/)) {
      presenceData.startTimestamp = browsingStamp;
      question = document.querySelector(
        "#mainContent > div.q-box.qu-borderBottom > div > div.q-text.qu-dynamicFontSize--xlarge.qu-bold.qu-color--gray_dark_dim.qu-passColorToLinks.qu-lineHeight--regular > span > span > div > div > div > span > span"
      ).textContent;
      presenceData.details = "Viewing question:";
      presenceData.state = question;
    }

    if (!presenceData.details) {
      quora.setTrayTitle();
      quora.setActivity();
    } else quora.setActivity(presenceData);
  }
});
