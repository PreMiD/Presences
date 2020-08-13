const presence = new Presence({
  clientId: "612437291574755349"
});

const capitalize = (text: string): string => {
  var texts = text.replace(/[[{(_)}\]]/g, " ").split(" ");
  return texts
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");
};

function stripText(element: HTMLElement, id = "None", log = true): string {
  if (element && element.firstChild) {
    return element.firstChild.textContent;
  } else {
    if (log)
      console.log(
        "%cTwitter%cERROR%c An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: " +
          id,
        "font-weight: 800; padding: 2px 5px; color: white; border-radius: 25px 0 0 25px; background: #596cae;",
        "font-weight: 800; padding: 2px 5px; color: white; border-radius: 0 25px 25px 0; background: #ff5050;",
        "color: unset;"
      );
    return null;
  }
}

console.log(
  "When using the Twitter presence for PreMiD, make sure you have the latest UI update. Twitter classic and any legacy versions before it will not work with this presence."
);

var oldUrl, elapsed;

presence.on("UpdateData", async () => {
  var title,
    info,
    image = "twitter";

  const path = window.location.pathname;

  if (oldUrl !== window.location.href) {
    oldUrl = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  title = "Browsing...";
  info = capitalize(path.split("/")[1]);

  if (path.match("/i/")) {
    info = capitalize(path.split("/")[2]);
  }

  if (path.match("/tos")) {
    title = "Browsing...";
    info = "Terms of Service";
  }

  if (path.match("/privacy")) {
    title = "Browsing...";
    info = "Privacy Policy";
  }

  if (path.match("/settings/")) {
    info = `${capitalize(path.split("/")[1])} for ${path
      .split("/")[2]
      .replace(/[[{(_)}\]]/g, " ")}`;
  }

  if (path.match("/search")) {
    title = "Browsing Search...";
    var selectedList: NodeListOf<HTMLElement> = document.querySelectorAll(
      ".r-bzsno3 > div > span"
    );
    if (selectedList === null) return;
    info = stripText(selectedList[1], "Selected");
  }

  var objHeader: HTMLElement = document.querySelector(
    "span.css-901oao.css-16my406.css-bfa6kz.r-jwli3a.r-1qd0xha.r-1vr29t4.r-ad9z0x.r-bcqeeo.r-3s2u2q.r-qvutc0 > span > span"
  );

  if (objHeader) {
    title = "Browsing Profile...";
    info = `${stripText(objHeader, "Object Header")} // ${capitalize(
      path.split("/")[1]
    )}`;

    if (path.match("/with_replies")) {
      title = "Browsing Profile Tweet/Replies...";
    }

    if (path.match("/media")) {
      title = "Browsing Profile Media...";
    }

    if (path.match("/likes")) {
      title = "Browsing Profile Likes...";
    }
  }

  if (objHeader === null && path.match("/status/")) {
    title = "Browsing Tweet...";
    info = stripText(
      document.querySelector(
        "div.css-901oao.css-bfa6kz.r-jwli3a.r-1qd0xha.r-a023e6.r-vw2c0b.r-ad9z0x.r-bcqeeo.r-3s2u2q.r-qvutc0 > span > span"
      ),
      "Tweet"
    );
  }

  if (path.match("/messages") && objHeader) {
    title = "Browsing Message...";
    info = stripText(objHeader, "Object Header");
  }

  var etcHeader: HTMLElement = document.querySelector(
    "div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > div > h2 > span"
  );

  if (path.match("/moments") && etcHeader) {
    title = "Browsing Moments...";
    info = capitalize(path.split("/")[1]);
  }

  if (path.match("/lists") && etcHeader) {
    title = "Browsing Lists...";
    info = capitalize(path.split("/")[1]);
  }

  if (window.location.href.match("tweetdeck.twitter.com/")) {
    var container =
      document.querySelector("#container > div") ||
      document.createElement("HTMLDivElement");

    title = `Tweetdeck (${container.childElementCount} Columns)`;
    info = undefined;
    image = "tweetdeck";

    var header = document.querySelector(".mdl-header-title");
    var profile = document.querySelector(".js-action-url > .fullname");

    if (header) {
      info = "Viewing " + capitalize(header.textContent);
    }

    if (profile) {
      info = "Viewing Profile // " + profile.textContent;
    }
  }

  var data: PresenceData = {
    details: title,
    state: info,
    largeImageKey: image,
    startTimestamp: elapsed
  };

  presence.setActivity(data, true);
});
