const presence = new Presence({
    clientId: "895022531868774451"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "typinglogo",
    startTimestamp: browsingStamp
  },
    timestamps = presence.getTimestamps(presence.timestampFromFormat("00:00"), presence.timestampFromFormat("1:00")),
    [start, end] = timestamps;
  if (document.location.pathname === "/") presenceData.details = "In home page";
  else if (document.location.pathname.match(/\/typing-test\/.+\/top50/gm)) presenceData.details = "Viewing top 50";
  else if (document.location.pathname.includes("/typing-test/")) {
    const timer = document.querySelector("#timer").textContent;
    if (timer === "1:00") presenceData.details = "Waiting to start a Typing Test";
    else if (timer === "0:00") {
      const wpM = document.querySelector("#wpm").textContent.split("(");
      presenceData.details = "Finishing a typing test:";
      presenceData.state = `In ${
        document.querySelector("#switch-typing-test-language").textContent
      } | ${wpM[0]} `;
    } else {
     
      presenceData.startTimestamp = start;
      presenceData.endTimestamp = end;
      presenceData.details = "Doing a typing test:";
      presenceData.state = `In ${
        document.querySelector("#switch-typing-test-language").textContent
      }`;
    }
  } else if (document.location.pathname.includes("/advanced-typing-test/")) {
    const timer = document.querySelector("#timer").textContent;
    if (timer === "1:00") presenceData.details = "Waiting to start a Advance Typing Test";
    else if (timer === "0:00") {
      const wpM = document.querySelector("#wpm").textContent.split("(");
      presenceData.details = "Finishing a Advance typing test:";
      presenceData.state = `In ${
        document.querySelector("#switch-typing-test-language").textContent
      } | ${wpM[0]} `;
    } else {
      presenceData.startTimestamp = start;
      presenceData.endTimestamp = end;
      presenceData.details = "Doing a Advance typing test:";
      presenceData.state = `In ${
        document.querySelector("#switch-typing-test-language").textContent
      }`;
    }
  } else if (document.location.pathname.includes("/competition/")) {
    const timer = document.querySelector("#timer").textContent;
    if (timer === "1:00") presenceData.details = "Waiting to start a Competition";
    else if (timer === "0:00") {
      const wpM = document.querySelector("#wpm").textContent.split("(");
      presenceData.details = "Finishing a Competition:";
      presenceData.state = `${wpM[0]} WPM `;
    } else {
      presenceData.startTimestamp = start;
      presenceData.endTimestamp = end;
      presenceData.details = "Doing a Competition:";
    }
  } else if (document.location.pathname.includes("/text/")) {
    const timer = document.querySelector("#time").textContent;
    if (timer === "00:00") presenceData.details = "Waiting to start a Text Practice";
    else {
      const finalTime = document.querySelector(".col-md-6 > p > strong");

      if (finalTime) {
        presenceData.details = "Finishing a Text Practice";
        presenceData.state = `Final time: ${finalTime.textContent}m`;
      } else presenceData.details = "Doing a Text Practice";
    }
  } else if (
    document.location.pathname.includes("/widget/") ||
    document.location.pathname.includes("/widgets/")
  ) {
    const timer = document.querySelector("#timer").textContent;

    if (
      timer === "1:00" ||
      timer === "0:30" ||
      timer === "2:00" ||
      timer === "5:00" ||
      timer === "10:00"
    )
      presenceData.details = "Waiting to start a Custom Typing Test";
    else if (timer === "0:00") {
      const wpM = document.querySelector("#wpm").textContent.split("(");
      presenceData.details = "Finishing a Custom Typing Test:";
      presenceData.state = `${wpM[0]}`;
    } else presenceData.details = "Doing a Custom Typing Test";
  } else if (document.location.pathname.includes("/user/")) presenceData.details = "Viewing a user profile";
  else if (document.location.pathname.includes("/email_settings")) presenceData.details = "Viewing Email Settings";
  else if (document.location.pathname.includes("/active-user-alltime")) presenceData.details = "Viewing most active user alltime";
  else if (document.location.pathname.includes("/text-practice/new")) presenceData.details = "Viewing Text Practice";
  else if (document.location.pathname.includes("/multiplayer")) presenceData.details = "Doing a Multiplayer Typing Test";
  else if (document.location.pathname.includes("/faq")) presenceData.details = "Viewing FAQ";
  else if (document.location.pathname.includes("/forum/")) presenceData.details = "Viewing Forum";
  else if (document.location.pathname.includes("/supporter")) presenceData.details = "Viewing the supporter users";
  else if (document.location.pathname.includes("/login")) presenceData.details = "Logging in";
  else if (document.location.pathname.includes("/create-account")) presenceData.details = "Creating an account";
  else if (document.location.pathname.includes("/impressum")) presenceData.details = "Viewing Privacy Policy";
  else if (document.location.pathname.includes("/gdpr")) presenceData.details = "Viewing General Data Protection Regulation";
  else if (document.location.pathname.includes("/cookie-policy")) presenceData.details = "Viewing Cookie Policy";
  else if (document.location.pathname.includes("/settings")) presenceData.details = "Viewing Settings";
  else if (document.location.pathname.includes("/achievements")) presenceData.details = "Viewing Achievements";
  else if (document.location.pathname.includes("/translations")) presenceData.details = "Viewing Translation";
  else if (document.location.pathname.includes("/competitions")) presenceData.details = "Viewing the Competitions list";
  else if (document.location.pathname.includes("/anticheat")) presenceData.details = "Viewing the AntiCheat";
  else if (document.location.pathname.includes("/top1000/")) {
    const lang = document.location.pathname.split("/");
    presenceData.details = "Doing Top 1000 Typing test:";
    presenceData.state = `In ${lang[lang.length - 3]}`;
  } else if (document.location.pathname.includes("/top1000")) presenceData.details = "Viewing Top 1000 Typing mode";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
