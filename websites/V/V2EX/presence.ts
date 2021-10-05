const presence = new Presence({
  clientId: "699318388270301284"
});

let title: HTMLVideoElement;
const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "v2ex-logo",
      startTimestamp: browsingStamp
    },
    path = document.location.pathname;

  if (path === "/") {
    presenceData.state = "Home";
    presenceData.details = "Browsing Thread";
    presenceData.smallImageKey = "curious";
  } else if (path.includes("/t/")) {
    title = document.querySelector("#Main > div.box > div.header > h1");
    presenceData.state = title.innerText.trim();
    presenceData.smallImageKey = "famous";

    if (
      document
        .querySelector("#reply-box")
        .classList.contains("reply-box-sticky")
    )
      presenceData.details = "Replying post";
    else presenceData.details = "Reading post";
  } else if (path.includes("/member/")) {
    title = document.querySelector("#Main > div.box h1");
    presenceData.state = title.innerText.trim();
    presenceData.details = "Viewing Profile";
    presenceData.smallImageKey = "happy";
  } else if (path.includes("/go/")) {
    title = document.querySelector("head > title");
    presenceData.state = title.innerText
      .replace("V2EX", "")
      .replace("›", "")
      .trim();
    presenceData.details = "Browsing node";
    presenceData.smallImageKey = "tongue";
  } else if (path === "/new") {
    presenceData.state = "Compose";
    presenceData.details = "New post";
    presenceData.smallImageKey = "famous_2";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
