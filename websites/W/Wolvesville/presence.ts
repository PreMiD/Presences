const presence = new Presence({
    clientId: "888429594120716328"
  }),
  startedTime = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const privacyMode = await presence.getSetting<boolean>("privacy"),
    privacyChat = await presence.getSetting<boolean>("privacyChat"),
    showTimestamp = await presence.getSetting<boolean>("showTimestamp"),
    logo = await presence.getSetting<number>("logo"),
    // eslint-disable-next-line no-one-time-vars/no-one-time-vars
    logoArr = ["wov", "wov_no_bg", "wov_text"],
    presenceData: PresenceData = {
      largeImageKey: logoArr[logo] || "wov"
    };

  if (showTimestamp) presenceData.startTimestamp = startedTime;

  //Wolvesville Blog
  if (document.location.href.includes("blog.wolvesville.com")) {
    presenceData.smallImageKey = "wov_blog";
    presenceData.smallImageText = "Development Blog";
    if (
      document.location.pathname === "/" ||
      document.location.pathname.startsWith("/page")
    ) {
      presenceData.details = "Development Blog";
      presenceData.state = "Browsing posts...";
    } else if (document.querySelector(".post-title")) {
      if (!privacyMode) {
        presenceData.details = "Reading a blog post:";
        presenceData.state = document.querySelector(".post-title")?.textContent;
        presenceData.buttons = [
          {
            label: "Read Post",
            url: document.URL
          }
        ];
      } else presenceData.state = "Reading a post";
    }

    //Legal
  } else if (document.location.href.includes("legal.wolvesville.com")) {
    presenceData.details = "Legal";
    if (document.location.pathname.includes("tos"))
      presenceData.state = "Reading the Terms of Service";
    else if (document.location.pathname.includes("privacy-policy"))
      presenceData.state = "Reading the Privacy Policy";
    else if (document.location.pathname.includes("imprint"))
      presenceData.state = "Reading the imprint";

    //Wolvesvile Heroes
  } else if (document.location.href.includes("heroes.wolvesville.com")) {
    presenceData.details = "Wolvesville Heroes";
    presenceData.state = "Home page";
    presenceData.smallImageKey = "wov_heroes";
    presenceData.smallImageText = "Wolvesville Heroes";

    if (document.location.pathname.includes("overview"))
      presenceData.state = "Overview";
    else if (document.location.pathname.includes("applications"))
      presenceData.state = "Applications";
    else if (document.location.pathname.includes("updates"))
      presenceData.state = "Updates";
    else if (
      document.location.href.includes("list?role") ||
      document.location.href.includes("list.html?role")
    ) {
      if (!privacyMode) {
        presenceData.state = `Viewing the ${
          document.querySelector("#staff_member_name")?.textContent
        } role`;
      } else presenceData.state = "Viewing a role";
    } else if (
      document.location.href.includes("list?member") ||
      document.location.href.includes("list.html?member")
    ) {
      if (!privacyMode) {
        presenceData.state = `Viewing ${
          document.querySelector("#staff_member_name")?.textContent
        }`;
      } else presenceData.state = "Viewing a member";
    }

    //Voting Gallery
  } else if (document.location.href.includes("voting.wolvesville.com")) {
    presenceData.details = "Voting Gallery";

    const submissionView = document.querySelector(".css-757v71");

    if (submissionView) {
      if (!privacyMode)
        presenceData.state = `Viewing submission by ${submissionView.textContent}`;
      else presenceData.state = "Viewing a submission";
    } else presenceData.state = "Browsing...";

    //App info page
  } else if (document.location.href.includes("app.wolvesville.com"))
    presenceData.details = "App page";
  //Vouchers
  else if (document.location.href.includes("vouchers.wolvesville.com")) {
    presenceData.details = "Redeeming a code";
    presenceData.smallImageKey = "vouchers";
    presenceData.smallImageText = "Redeem";

    //Game
  } else if (document.location.href.includes("wolvesville.com")) {
    //Loading Screen
    document.querySelector(
      "div.css-1dbjc4n.r-1p0dtai.r-18u37iz.r-1777fci.r-1d2f490.r-98ikmy.r-u8s1d.r-zchlnj > div.css-1dbjc4n.r-1ffj0ar.r-z2wwpe.r-18u37iz.r-1w6e6rj.r-1777fci.r-1l7z4oj.r-gu0qjt.r-85oauj.r-95jzfe > div.css-1dbjc4n.r-1awozwy.r-1777fci > div.css-1dbjc4n.r-17bb2tj.r-1muvv40.r-127358a.r-1ldzwu0.r-z80fyv.r-19wmn03"
    )
      ? (presenceData.details = "Loading Wolvesville...")
      : false;

    //Login
    document.querySelector(
      "div.css-1dbjc4n.r-z2wwpe.r-13awgt0.r-1dhrvg0.r-169s5xo.r-hvns9x.r-1pcd2l5"
    )
      ? (presenceData.details = "At the login page")
      : false;

    //Menu
    if (
      document.querySelector(
        "div.css-1dbjc4n.r-1awozwy.r-1p0dtai.r-18u37iz.r-u8s1d.r-e1k2in.r-ipm5af"
      )
    ) {
      presenceData.details = "At the main menu";

      if (!privacyMode) {
        //Username
        presenceData.state = document.querySelectorAll(
          "div.css-901oao.r-jwli3a.r-ubezar.r-5oul0u"
        )[0]?.textContent;

        //Inventory
        document.querySelector(
          "div.css-1dbjc4n.r-kdyh1x.r-eqz5dr.r-1pi2tsx.r-a2tzq0.r-1ybube5"
        )
          ? (presenceData.state = "Inventory")
          : false;

        //Shop
        document.querySelector(
          "div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1w6e6rj.r-1777fci.r-1guathk"
        )
          ? (presenceData.state = "Shop")
          : false;

        //Clan
        if (
          document.querySelector(
            "div.css-1dbjc4n.r-13awgt0.r-zd98yo.r-1v1z2uz.r-13qz1uu"
          )
        ) {
          document.querySelector(
            "div.css-1dbjc4n.r-1xfd6ze.r-13awgt0.r-1pi2tsx.r-1udh08x"
          )
            ? (presenceData.state = "Browsing clans...")
            : (presenceData.state = "Viewing their clan");
        }

        //Wheel
        document.querySelector(
          "div.css-1dbjc4n.r-1kihuf0.r-1mlwlqe.r-1d2f490.r-1udh08x.r-zchlnj > div.css-1dbjc4n.r-1niwhzg.r-vvn4in.r-u6sd8q.r-ehq7j7.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-13qz1uu.r-1wyyakw"
        )
          ? (presenceData.state = "Spinning the wheel")
          : false;

        //Settings
        document.querySelector(
          "div.css-1dbjc4n.r-150rngu.r-1niwhzg.r-13awgt0.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1lxl8vk.r-11yh6sk.r-1rnoaur.r-1sncvnh.r-13qz1uu"
        )
          ? (presenceData.state = "Settings")
          : false;

        //Mentor chat
        document.querySelector("iframe[title='Mentor Chat']")
          ? (presenceData.state = "Mentor chat")
          : false;

        //Chat
        if (
          document.querySelector(
            "div.css-1dbjc4n.r-1p0dtai.r-qdtdgp.r-u8s1d.r-1ro7rbe.r-ipm5af > div.css-1dbjc4n.r-1p0dtai.r-1d2f490.r-u8s1d.r-ipm5af > div.css-1dbjc4n.r-1pi2tsx.r-13qz1uu > div.css-1dbjc4n.r-led734.r-1p0dtai.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af"
          )
        ) {
          if (!privacyChat) {
            presenceData.state = `Chatting with ${
              document.querySelector(
                "div.css-1dbjc4n.r-19u6a5r > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-f1odvy > div.css-901oao.r-jwli3a.r-1x35g6.r-vw2c0b"
              )?.textContent
            }`;
          } else presenceData.state = "Chatting with a friend";
        }

        //Clan chat
        document.querySelector(
          "div.css-1dbjc4n.r-1p0dtai.r-qdtdgp.r-u8s1d.r-1ro7rbe.r-ipm5af > div.css-1dbjc4n.r-1p0dtai.r-1d2f490.r-u8s1d.r-ipm5af > div.css-1dbjc4n.r-13awgt0 > div.css-1dbjc4n.r-13awgt0.r-wk8lta > div.css-1dbjc4n.r-led734.r-1p0dtai.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af"
        )
          ? (presenceData.state = "Clan chat")
          : false;
      }
    }

    //Custom Games
    document.querySelector(
      "div.css-1dbjc4n.r-18u37iz.r-1777fci.r-p1pxzi.r-1u936jj.r-1a6n0ax"
    )
      ? (presenceData.details = "Browsing custom games...")
      : false;

    //Lobby
    if (
      document.querySelector(
        "div.css-1dbjc4n.r-13awgt0.r-gy4na3.r-wk8lta > div.css-1dbjc4n.r-1awozwy.r-led734.r-vu3uv8.r-18u37iz.r-ur6pnr.r-13qz1uu.r-136ojw6"
      ) ??
      document.querySelector(
        "div.css-1dbjc4n.r-13awgt0.r-wk8lta > div.css-1dbjc4n.r-1awozwy.r-led734.r-vu3uv8.r-18u37iz.r-ur6pnr.r-13qz1uu.r-136ojw6"
      )
    ) {
      document.querySelector("div.css-1dbjc4n.r-1awozwy.r-173mn98.r-18u37iz")
        ? (presenceData.details = "In a friends lobby")
        : (presenceData.details = "In a custom lobby");

      if (!privacyMode) {
        if (
          !document.querySelector(
            "div.css-1dbjc4n.r-1awozwy.r-1p0dtai.r-1777fci.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-1pozq62 > div.css-1dbjc4n.r-1awozwy.r-1777fci > div.css-1dbjc4n.r-17bb2tj.r-1muvv40.r-127358a.r-1ldzwu0.r-1r8g8re.r-1acpoxo"
          )
        ) {
          const playerCountLobby = document.querySelectorAll(
            "div.css-1dbjc4n.r-1awozwy.r-1777fci.r-1rngwi6"
          )?.length;

          if (playerCountLobby === 1)
            presenceData.state = `${playerCountLobby} player connected`;
          else presenceData.state = `${playerCountLobby} players connected`;
        } else presenceData.state = "Loading...";
      }
    }

    //In game
    if (
      document.querySelector(
        "div.css-1dbjc4n.r-1xfd6ze.r-d045u9.r-13awgt0.r-edyy15"
      )
    ) {
      if (
        !document.querySelector(
          "div.css-1dbjc4n.r-1awozwy.r-1777fci > div.css-1dbjc4n.r-17bb2tj.r-1muvv40.r-127358a.r-1ldzwu0.r-1r8g8re.r-1acpoxo"
        )
      ) {
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
            )?.textContent;
          }
        } else {
          lobbyChar = document.querySelector(
            "div.css-1dbjc4n.r-1j16mh1.r-1d6rzhh.r-1loqt21.r-sga3zk.r-1sbahrg.r-1otgn73.r-lrvibr.r-7a29px > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-901oao"
          )?.textContent;
        }

        if (preGameLobby && lobbyChar === "") {
          presenceData.details = "In pre-game lobby";

          if (!privacyMode) {
            let playerCountPreGame = document.querySelectorAll(
              "div.css-1dbjc4n.r-kdyh1x.r-1loqt21.r-13awgt0.r-1064s9p.r-1udh08x.r-1otgn73.r-lrvibr[tabindex='0']"
            )?.length;
            playerCountPreGame = 16 - playerCountPreGame;

            if (playerCountPreGame === 1)
              presenceData.state = `${playerCountPreGame} player connected`;
            else presenceData.state = `${playerCountPreGame} players connected`;
          }
        } else {
          //Playing
          presenceData.details = "In a game";
          //Spectator
          document.querySelector(
            "div.css-1dbjc4n.r-1niwhzg.r-vvn4in.r-u6sd8q.r-ehq7j7.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-13qz1uu.r-1wyyakw[style*='/static/media/spectator_popcorn.73b6599e.png']"
          )
            ? ((presenceData.details = "Spectating a game"),
              (presenceData.smallImageKey = "popcorn"),
              (presenceData.smallImageText = "Spectating"))
            : false;

          //Game Over
          document.querySelector(
            "div.css-1dbjc4n.r-1p0dtai.r-1loqt21.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-1otgn73.r-lrvibr.r-1pwx3x0 > div.css-1dbjc4n.r-1awozwy.r-1pi2tsx.r-1777fci.r-13qz1uu > div.css-1dbjc4n.r-6dt33c.r-13qz1uu"
          )
            ? (presenceData.details = "Game over")
            : false;

          //Player count
          if (!privacyMode) {
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
              presenceData.state = `${aliveCount}/${playerCount} player alive`;
            else
              presenceData.state = `${aliveCount}/${playerCount} players alive`;
          }
        }
      } else {
        presenceData.details = "In pre-game lobby";
        if (!privacyMode) presenceData.state = "Loading...";
      }
    }
  }
  presence.setActivity(presenceData);
});
