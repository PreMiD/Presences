const presence = new Presence({
  clientId: "924791712944099389"
});

const filterCodes: Record<number, string> = {
  366: "BG sub"
};

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const pathname: string = document.location.pathname;
  const paths = pathname.split("/");
  if (!paths[0]) paths.shift();

  if (pathname === "/") {
    presenceData.details = "Home";
    presenceData.state = "Viewing the home page";
  } else if (pathname.startsWith("/messages")) {
    if (!paths[1]) {
      presenceData.details = "Viewing messages";
    } else if (paths[1].startsWith("pm-")) {
      const body = document.querySelector(
        "body > main.animated > div.wrapper > div.dialogPadding"
      );
      const username = body.querySelector("span.username").textContent;
      const avatar = parseAvatarFromAttr(
        body.querySelector("a.avatar").attributes.getNamedItem("style")
          .textContent
      );

      presenceData.details = `Messaging ${username}`;
      presenceData.smallImageKey = avatar;
      presenceData.smallImageText = `Messaging ${username}`;
    }
  } else if (pathname === "/chat") {
    presenceData.details = "Chatting in the chat";
  } else if (pathname.startsWith("/otakus")) {
    if (!paths[1] || paths[1].startsWith("page-")) {
      presenceData.details = "Viewing otakus";
      if (paths[1])
        presenceData.state = `Page ${paths[1].replace("page-", "")}`;
    } else if (paths[1]) {
      const body = document.querySelector(
        "body > main.animated > section.wrapper > div.header"
      );
      const username = body.querySelector(
        "div.content > div.holder > span.heading"
      ).textContent;

      const avatar = parseAvatarFromAttr(
        body.querySelector("a.avatar").attributes.getNamedItem("style")
          .textContent
      );

      presenceData.details = `Viewing otaku ${username}`;
      presenceData.largeImageKey = avatar;
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = username;
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
      presenceData.details = `Searching for ${paths[2].replaceAll("-", " ")} ${
        filters.length ? "With " + filters.join(", ") : ""
      }`;
    } else if (paths[1]) {
      presenceData.details = `Viewing animes that starts with the keyboard ${paths[1].toUpperCase()}`;
    } else
      presenceData.details = `Viewing animes ${
        filters.length ? "With " + filters.join(", ") : ""
      }`;
  } else if (pathname.startsWith("/anime/")) {
    const uid = paths[1];
    const eid = paths[2];

    if (uid && !eid) {
      const name = document.querySelector(
        "body > main.animated > div.wrapper > article.rowView > header.rowView-head > h1.heading"
      ).innerHTML;
      const image = document
        .querySelector(
          "body > main.animated > div.wrapper > article.rowView > aside.aside > div.cover-holder > img.abs"
        )
        ?.getAttribute("src");

      if (image) {
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = "logo";
      }

      presenceData.details = `Viewing ${name}`;
      presenceData.largeImageKey = image ?? "logo";
      presenceData.buttons = [
        {
          label: `View ${name}`,
          url: document.location.href
        }
      ];
    } else if (uid && eid) {
      const { name, episode, part } = getInfo();

      const playing = document
        .querySelector(
          "body > main.animated > div.wrapper > section.holder > div.player > div.holder > div.vplayer"
        )
        ?.classList.contains("playing");

      if (!playing) {
        presenceData.details = `Watching ${name}`;
        presenceData.state = `Episode ${episode}`;
        presenceData.buttons = [
          {
            label: `Watch ${name}`,
            url: document.location.href
          }
        ];

        if (part) presenceData.state = presenceData.state += ` (part ${part})`;
      } else return;
    }
  } else if (pathname.startsWith("/movies")) {
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
      presenceData.details = `Searching for ${paths[2].replaceAll("-", " ")} ${
        filters.length ? "With " + filters.join(", ") : ""
      }`;
    } else if (paths[1]) {
      presenceData.details = `Viewing movies that starts with the keyboard ${paths[1].toUpperCase()}`;
    } else
      presenceData.details = `Viewing movies ${
        filters.length ? "With " + filters.join(", ") : ""
      }`;
  } else if (pathname.startsWith("/movie/")) {
    const name = document.querySelector(
      "body > main.animated > div.wrapper > article.rowView > header.rowView-head > h1.heading"
    ).textContent;
    const image = document
      .querySelector(
        "body > main.animated > div.wrapper > article.rowView > aside.aside > div.cover-holder > img.abs"
      )
      ?.getAttribute("src");

    if (image) {
      presenceData.smallImageKey = "logo";
      presenceData.smallImageText = name;
    }

    presenceData.details = `Viewing movie ${name}`;
    presenceData.largeImageKey = image ?? "logo";
  } else if (pathname.startsWith("/manga")) {
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
      presenceData.details = `Searching for ${paths[2].replaceAll("-", " ")} ${
        filters.length ? "With " + filters.join(", ") : ""
      }`;
    } else if (paths[1] && paths[2]?.startsWith("vol-")) {
      const tom = paths[2].replace("vol-", "");

      if (paths[3].startsWith("chapter-")) {
        const list = document.querySelectorAll(
          "body > main.animated > ul#path > li > a > span"
        );
        const name = list[1].textContent;
        const page = document.querySelector(
          "body > main.animated > div.wrapper > div.heading > b#num"
        ).textContent;

        presenceData.details = `Reading manga ${name}`;
        presenceData.state = `Tom: ${tom}, Chapter: ${between(
          list[3].textContent,
          "Глава ",
          " -"
        )}, Page: ${page}`;
        presenceData.buttons = [
          {
            label: "Read manga",
            url: document.location.href
          }
        ];
      } else {
        const name = document.querySelector(
          "body > main.animated > div.wrapper > article.rowView > header.rowView-head > h2 > a.sub"
        ).textContent;

        if (name) presenceData.details = `Reading manga ${name}`;

        presenceData.state = `Tom ${tom}`;
        presenceData.buttons = [
          {
            label: "Read manga",
            url: document.location.href
          }
        ];
      }
    } else if (hasNumber(paths[1])) {
      const name = document.querySelector(
        "body > main.animated > div.wrapper > article.rowView > header.rowView-head > h1.heading"
      ).textContent;
      const image = document
        .querySelector(
          "body > main.animated > div.wrapper > article.rowView > aside.aside > div.cover-holder > img.abs"
        )
        ?.getAttribute("src");

      if (name) presenceData.details = `Viewing manga ${name}`;

      presenceData.largeImageKey = image ?? "logo";

      if (image) {
        presenceData.smallImageKey = "logo";
        presenceData.smallImageText = name;
      }

      presenceData.buttons = [
        {
          label: "View manga",
          url: document.location.href
        }
      ];
    } else if (paths[1]) {
      presenceData.details = `Viewing manga that starts with the keyboard ${paths[1].toUpperCase()}`;
    } else if (!paths[1])
      presenceData.details = `Viewing manga ${
        filters.length ? "With " + filters.join(", ") : ""
      }`;
  }

  if (presenceData.details) {
    presence.setActivity(presenceData);
  } else presence.setActivity();
});

interface iframeData {
  currentTime: number;
  duration: number;
  paused: boolean;
}

presence.on("iFrameData", async (data: iframeData) => {
  if (!data.currentTime || !data.duration) return;
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const epInfo = getInfo();

  if (!data.paused)
    [presenceData.startTimestamp, presenceData.endTimestamp] =
      presence.getTimestamps(
        Math.floor(data.currentTime),
        Math.floor(data.duration)
      );
  else {
    presenceData.smallImageKey = "start";
    presenceData.smallImageText = "Paused";
  }

  presenceData.details = `Watching ${epInfo.name}`;
  presenceData.state = `Episode ${epInfo.episode}`;
  presenceData.buttons = [
    {
      label: `Watch ${name}`,
      url: document.location.href
    }
  ];

  if (epInfo.part)
    presenceData.state = presenceData.state += ` (part ${epInfo.part})`;

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
    name,
    episode: parseInt(rep, 10),
    part: parseInt(part, 10)
  };
}

function parseAvatarFromAttr(attr: string) {
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

function hasNumber(str: string) {
  return /\d/.test(str);
}

function between(st: string, b1: string, b2: string) {
  return st.split(b1).pop().split(b2)[0];
}
