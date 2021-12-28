const presence = new Presence({
  clientId: "924791712944099389"
});

const filterCodes: Record<number, string> = {
  366: "bgsub"
};

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const pathname: string = document.location.pathname;
  const paths = pathname.split("/");
  if (!paths[0]) paths.shift();

  if (pathname === "/") {
    assign(presenceData, {
      details: "Home",
      state: "Viewing the home page"
    });
  } else if (pathname.startsWith("/messages")) {
    if (!paths[1]) {
      assign(presenceData, {
        details: "Viewing messages"
      });
    } else if (paths[1].startsWith("pm-")) {
      let body = document.querySelector(
        "body > main.animated > div.wrapper > div.dialogPadding"
      );
      let username = body.querySelector("span.username").textContent;
      let avatar = parseAvatarFromAttr(
        body.querySelector("a.avatar").attributes.getNamedItem("style")
          .textContent
      );

      assign(presenceData, {
        details: `Messaging ${username}`,
        smallImageKey: avatar,
        smallImageText: `Messaging ${username}`
      });
    }
  } else if (pathname === "/chat") {
    assign(presenceData, {
      details: "Chatting in the chat"
    });
  } else if (pathname.startsWith("/otakus")) {
    if (!paths[1] || paths[1].startsWith("page-")) {
      assign(presenceData, {
        details: "Viewing otakus",
        state: paths[1] ? "Page " + paths[1].replace("page-", "") : ""
      });
    } else if (paths[1]) {
      const body = document.querySelector(
        "body > main.animated > section.wrapper > div.header"
      );
      const username = body.querySelector(
        "div.content > div.holder > span.heading"
      ).textContent;

      let avatar = parseAvatarFromAttr(
        body.querySelector("a.avatar").attributes.getNamedItem("style")
          .textContent
      );

      assign(presenceData, {
        details: `Viewing otaku ${username}`,
        largeImageKey: avatar,
        smallImageKey: "logo",
        smallImageText: username
      });
    }
  } else if (pathname.startsWith("/animes")) {
    const filter: string = new URL(document.location.href).searchParams.get(
      "filters"
    );
    const filters: string[] = [];

    if (filter) {
      filter
        .split(",")
        .map((x: string) => parseInt(x, 10))
        .forEach((f: number) => {
          if (filterCodes[f]) filters.push(filterCodes[f]);
        });
    }

    if (paths[1] === "search" && paths[2]) {
      assign(presenceData, {
        details: `Searching for ${paths[2].replaceAll("-", " ")} ${
          filters.includes("bgsub") ? `with BG sub` : ""
        }`
      });
    } else if (paths[1]) {
      assign(presenceData, {
        details: `Viewing animes that starts with the keyboard ${paths[1].toUpperCase()}`
      });
    } else
      assign(presenceData, {
        details: `Viewing animes ${
          filters.includes("bgsub") ? `with BG sub` : ""
        }`
      });
  } else if (pathname.startsWith("/anime/")) {
    const uid = paths[1];
    const eid = paths[2];

    if (uid && !eid) {
      const name = document.querySelector(
        "body > main.animated > div.wrapper > article.rowView > header.rowView-head > h1.heading"
      ).innerHTML;
      assign(presenceData, {
        details: `Viewing ${name}`
      });
    } else if (uid && eid) {
      const { name, episode, part } = getInfo();

      const playing = document
        .querySelector(
          "body > main.animated > div.wrapper > section.holder > div.player > div.holder > div.vplayer"
        )
        ?.classList.contains("playing");

      if (!playing)
        assign(presenceData, {
          details: `Watching ${name}`,
          state: `Episode ${episode} ${part ? `(part ${part})` : ""}`
        });
      else return;
    }
  }

  if (presenceData.details) {
    presence.setActivity(presenceData);
  } else presence.setActivity();
});

declare interface iframeData {
  currentTime: number;
  duration: number;
  paused: boolean;
}

presence.on("iFrameData", async (data: iframeData) => {
  if (!data.currentTime || !data.duration) return;
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const { name, episode, part } = getInfo();

  if (!data.paused)
    [presenceData.startTimestamp, presenceData.endTimestamp] =
      presence.getTimestamps(
        Math.floor(data.currentTime),
        Math.floor(data.duration)
      );
  else
    assign(presenceData, {
      smallImageKey: "start",
      smallImageText: "Paused"
    });

  assign(presenceData, {
    details: `Watching ${name}`,
    state: `Episode ${episode} ${part ? `(part ${part})` : ""}`
  });

  if (presenceData.details) {
    presence.setActivity(presenceData);
  } else presence.setActivity();
});

function getInfo(): {
  name: string;
  episode: number;
  part: number;
} {
  const ep = document.querySelector(
    "body > main.animated > div.wrapper > section.holder > h1.heading > b#num"
  ).innerHTML;
  const name = document.querySelector(
    "body > main.animated > div.wrapper > section.holder > h2.heading > a"
  ).innerHTML;
  let part = between(ep, "(", ")");
  let rep = ep;

  if (ep.includes("(") && ep.includes(")")) {
    rep = ep.replace(` (${part})`, "");
    part = part.replace(/\D/g, "");
  } else part = null;

  return {
    name: name,
    episode: parseInt(rep, 10),
    part: parseInt(part, 10)
  };
}

function parseAvatarFromAttr(attr: string) {
  console.log(attr);

  let avatar;
  if (attr.includes("background-image: url('"))
    avatar = between(attr, "background-image: url('", "')");
  else if (attr.includes("background-image: url("))
    avatar = between(attr, "background-image: url(", ")");

  if (
    avatar === "https://static.animes-portal.info/assets/images/avatar.svg" ||
    !avatar
  )
    avatar = "defaultav";

  return avatar;
}

function assign(data: PresenceData, newdata: PresenceData) {
  return Object.assign(data, newdata);
}

function between(st: string, b1: string, b2: string) {
  return st.split(b1).pop().split(b2)[0];
}
