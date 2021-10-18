const presence = new Presence({
    clientId: "888429594120716328"
  }),
  startedTime = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const showUsername: boolean = await presence.getSetting("username"),
    showMenuState: boolean = await presence.getSetting("menuDetail"),
    showPlayerCount: boolean = await presence.getSetting("playerCount"),
    logo: number = await presence.getSetting("logo"),
    logoArr = [
      "wov",
      "wov_no_bg",
      "wov_tile",
      "wov_web",
      "wov_blue",
      "wov_red",
      "wov_orange",
      "wov_yellow",
      "wov_green",
      "wov_purple",
      "wov_pink",
      "wov_white"
    ],
    data: PresenceData = {
      largeImageKey: logoArr[logo] || "wov",
      startTimestamp: startedTime
    };

  if (document.location.href.includes("blog.wolvesville.com")) {
    //Wolvesville Blog
    data.smallImageKey = "wov_blog";
    data.smallImageText = "Development Blog";
    if (
      document.location.pathname === "/" ||
      document.location.pathname.startsWith("/page")
    ) {
      data.details = "Development Blog";
      data.state = "Browsing posts...";
    } else {
      const post = !!document.querySelector(".post-title");

      if (post) {
        data.details = "Reading a blog post:";
        data.state = document.querySelector(".post-title").textContent;
        data.buttons = [
          {
            label: "Read Post",
            url: document.URL
          }
        ];
      }
    }
  } else if (document.location.href.includes("legal.wolvesville.com")) {
    //Legal
    data.details = "Legal";
    if (document.location.pathname.includes("tos"))
      data.state = "Reading the Terms of Service";
    else if (document.location.pathname.includes("privacy-policy"))
      data.state = "Reading the Privacy Policy";
    else if (document.location.pathname.includes("imprint"))
      data.state = "Reading the imprint";
  } else if (document.location.href.includes("heroes.wolvesville.com")) {
    //Wolvesvile Heroes
    data.details = "Wolvesville Heroes";
    data.state = "At the home page";
    data.smallImageKey = "wov_heroes";
    data.smallImageText = "Wolvesville Heroes";

    if (document.location.pathname.includes("overview"))
      data.state = "Viewing Overview";
    else if (document.location.pathname.includes("applications"))
      data.state = "Viewing Applications";
    else if (document.location.pathname.includes("updates"))
      data.state = "Viewing Updates";
    else if (
      document.location.href.includes("list?role") ||
      document.location.href.includes("list.html?role")
    ) {
      const role = document.querySelector("#staff_member_name").textContent;
      data.state = `Viewing the ${role} role`;
    } else if (
      document.location.href.includes("list?member") ||
      document.location.href.includes("list.html?member")
    ) {
      const member = document.querySelector("#staff_member_name").textContent;
      data.state = `Viewing ${member}`;
    }
  } else if (document.location.href.includes("voting.wolvesville.com")) {
    //Voting Gallery
    data.details = "Voting Gallery";

    const submissionView = !!document.querySelector(".css-757v71");

    if (submissionView) {
      const author = document.querySelector(".css-757v71").textContent;
      data.state = `Viewing submission by ${author}`;
    } else data.state = "Browsing...";
  } else if (document.location.href.includes("app.wolvesville.com")) {
    //App info page
    data.details = "Viewing the app";
  } else if (document.location.href.includes("wolvesville.com")) {
    //Game

    //Loading Screen
    document.querySelector(
      "div.css-1dbjc4n.r-1p0dtai.r-18u37iz.r-1777fci.r-1d2f490.r-98ikmy.r-u8s1d.r-zchlnj > div.css-1dbjc4n.r-1ffj0ar.r-z2wwpe.r-18u37iz.r-1w6e6rj.r-1777fci.r-1l7z4oj.r-gu0qjt.r-85oauj.r-95jzfe > div.css-1dbjc4n.r-1awozwy.r-1777fci > div.css-1dbjc4n.r-17bb2tj.r-1muvv40.r-127358a.r-1ldzwu0.r-z80fyv.r-19wmn03"
    )
      ? (data.details = "Loading Wolvesville...")
      : false;

    //Login
    document.querySelector(
      "div.css-1dbjc4n.r-z2wwpe.r-13awgt0.r-1dhrvg0.r-169s5xo.r-hvns9x.r-1pcd2l5"
    )
      ? (data.details = "At the login page")
      : false;

    //Menu
    const menu = !!document.querySelector(
      "div.css-1dbjc4n.r-1awozwy.r-1p0dtai.r-18u37iz.r-u8s1d.r-e1k2in.r-ipm5af"
    );

    if (menu) {
      data.details = "At the main menu";

      if (showUsername) {
        const username = document.querySelectorAll(
          "div.css-901oao.r-jwli3a.r-ubezar.r-5oul0u"
        );
        data.state = username[0]?.textContent;
      }

      if (showMenuState) {
        //Inventory
        document.querySelector(
          "div.css-1dbjc4n.r-kdyh1x.r-eqz5dr.r-1pi2tsx.r-a2tzq0.r-1ybube5"
        )
          ? (data.state = "Inventory")
          : false;

        //Shop
        document.querySelector(
          "div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1w6e6rj.r-1777fci.r-1guathk"
        )
          ? (data.state = "Shop")
          : false;

        //Settings
        document.querySelector(
          "div.css-1dbjc4n.r-150rngu.r-1niwhzg.r-13awgt0.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1lxl8vk.r-11yh6sk.r-1rnoaur.r-1sncvnh.r-13qz1uu"
        )
          ? (data.state = "Settings")
          : false;

        //Clan
        const clan = !!document.querySelector(
          "div.css-1dbjc4n.r-13awgt0.r-zd98yo.r-1v1z2uz.r-13qz1uu"
        );

        if (clan) {
          document.querySelector(
            "div.css-1dbjc4n.r-1xfd6ze.r-13awgt0.r-1pi2tsx.r-1udh08x"
          )
            ? (data.state = "Browsing clans...")
            : (data.state = "Viewing their clan");
        }
      }
    }

    //Custom Games
    document.querySelector(
      "div.css-1dbjc4n.r-18u37iz.r-1777fci.r-p1pxzi.r-1u936jj.r-1a6n0ax"
    )
      ? (data.details = "Browsing custom games...")
      : false;

    //Lobby
    const lobby = document.querySelector(
      "div.css-1dbjc4n.r-13awgt0.r-gy4na3.r-wk8lta > div.css-1dbjc4n.r-1awozwy.r-led734.r-vu3uv8.r-18u37iz.r-ur6pnr.r-13qz1uu.r-136ojw6"
    )
      ? true
      : !!document.querySelector(
          "div.css-1dbjc4n.r-13awgt0.r-wk8lta > div.css-1dbjc4n.r-1awozwy.r-led734.r-vu3uv8.r-18u37iz.r-ur6pnr.r-13qz1uu.r-136ojw6"
        );

    if (lobby) {
      document.querySelector("div.css-1dbjc4n.r-1awozwy.r-173mn98.r-18u37iz")
        ? (data.details = "In a friends lobby")
        : (data.details = "In a custom lobby");

      if (showPlayerCount) {
        const playerCountLobby = document.querySelectorAll(
          "div.css-1dbjc4n.r-1awozwy.r-1777fci.r-1rngwi6"
        )?.length;

        if (playerCountLobby === 1)
          data.state = `${playerCountLobby} player connected`;
        else data.state = `${playerCountLobby} players connected`;
      }
    }

    //In game
    const game = !!document.querySelector(
      "div.css-1dbjc4n.r-1xfd6ze.r-d045u9.r-13awgt0.r-edyy15"
    );

    if (game) {
      //Pre-game Lobby
      let preGameLobby = !!document.querySelector(
          "div.css-1dbjc4n.r-1j16mh1.r-1d6rzhh.r-1loqt21.r-sga3zk.r-1sbahrg.r-1otgn73.r-lrvibr.r-7a29px > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-901oao"
        ),
        lobbyChar;

      if (!preGameLobby) {
        preGameLobby = !!document.querySelector(
          "div.css-1dbjc4n.r-1j16mh1.r-1d6rzhh.r-sga3zk.r-12c3ph5.r-1sbahrg.r-lrvibr.r-7a29px > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-901oao.r-1281ybr"
        );

        if (preGameLobby) {
          lobbyChar = document.querySelector(
            "div.css-1dbjc4n.r-1j16mh1.r-1d6rzhh.r-sga3zk.r-12c3ph5.r-1sbahrg.r-lrvibr.r-7a29px > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-901oao.r-1281ybr"
          ).textContent;
        }
      } else {
        lobbyChar = document.querySelector(
          "div.css-1dbjc4n.r-1j16mh1.r-1d6rzhh.r-1loqt21.r-sga3zk.r-1sbahrg.r-1otgn73.r-lrvibr.r-7a29px > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-901oao"
        ).textContent;
      }

      if (preGameLobby && lobbyChar === "") {
        data.details = "In pre-game lobby";

        if (showPlayerCount) {
          let playerCountPreGame = document.querySelectorAll(
            "div.css-1dbjc4n.r-kdyh1x.r-1loqt21.r-13awgt0.r-1064s9p.r-1udh08x.r-1otgn73.r-lrvibr[tabindex='0']"
          )?.length;
          playerCountPreGame = 16 - playerCountPreGame;

          if (playerCountPreGame === 1)
            data.state = `${playerCountPreGame} player connected`;
          else data.state = `${playerCountPreGame} players connected`;
        }
      } else {
        //Playing
        data.details = "In a game";
        //Spectator
        document.querySelector(
          "div.css-1dbjc4n.r-1niwhzg.r-vvn4in.r-u6sd8q.r-ehq7j7.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-13qz1uu.r-1wyyakw[style*='/static/media/spectator_popcorn.73b6599e.png']"
        )
          ? (data.details = "Spectating a game")
          : false;

        //Game Over
        document.querySelector(
          "div.css-1dbjc4n.r-1p0dtai.r-1loqt21.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-1otgn73.r-lrvibr.r-1pwx3x0 > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-1dbjc4n.r-6dt33c.r-13qz1uu"
        )
          ? (data.details = "Game over")
          : false;

        //Player count
        if (showPlayerCount) {
          const playerCount = document.querySelectorAll(
            "div.css-1dbjc4n.r-obd0qt.r-1p6tffz.r-17s6mgv.r-l4djrs.r-5kp9u6.r-12vffkv.r-u8s1d.r-1xce0ei.r-1s3egr7"
          )?.length;

          let deadCount = (
            document
              .querySelector(
                "div.css-1dbjc4n.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-5oul0u.r-11yh6sk.r-1rnoaur.r-1sncvnh.r-13qz1uu"
              )
              ?.innerHTML.match(/text-decoration-line: line-through/g) || []
          ).length;

          deadCount = deadCount / 2;

          const aliveCount = playerCount - deadCount;

          if (aliveCount === 1)
            data.state = `${aliveCount}/${playerCount} player alive`;
          else data.state = `${aliveCount}/${playerCount} players alive`;
        }
      }
    }
  }
  presence.setActivity(data);
});
