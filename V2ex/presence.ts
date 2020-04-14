const presence = new Presence({
  clientId: "699318388270301284"
});

let title: any;
const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "v2ex-logo",
    startTimestamp: browsingStamp
  };

  const path = document.location.pathname;

  if (path === "/") {
    presenceData.state = "Homepage";
    presenceData.details = "Browsing Thread";
  } else if (path.includes("/t/")) {
    title = document.querySelector("#Main > div.box > div.header > h1");
    presenceData.state = title.innerText.trim();
    presenceData.details = "Reading page";
  } else if (path.includes("/member/")) {
    title = document.querySelector("#Main > div.box h1");
    presenceData.state = title.innerText.trim();
    presenceData.details = "Viewing Profile";
  } else if (path.includes("/go/")) {
    title = document.querySelector("head > title");
    presenceData.state = title.innerText
      .replace("V2EX", "")
      .replace("›", "")
      .trim();
    presenceData.details = "Browsing node";
  } else if (path === "/new") {
    presenceData.state = "Compose";
    presenceData.details = "New post";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
