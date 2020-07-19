let presence = new Presence({
  clientId: "728904519055966228"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: "reading",
    smallImageText: "Reading",
    startTimestamp: browsingStamp
  }

  function checkSubPage() {
    if (document.location.pathname.endsWith("/news/")) {
      presenceData.details = "Reading the news";
    } else if (document.location.pathname.includes("/photos/")) {
      presenceData.details = "Looking at photos";
    } else if (document.location.pathname.includes("/videos")) {
      presenceData.details = "Searching for videos";
    } else if (document.location.pathname.includes("/video/")) {
      presenceData.details = "Watching a video";
      presenceData.smallImageKey = "play-icon";
    } else if (document.location.pathname.includes("/schedule")) {
      presenceData.details = "Looking at schedules";
    } else if (document.location.pathname.includes("/results")) {
      presenceData.details = "Looking at results";
    } else if (document.location.pathname.includes("/standings/")) {
      presenceData.details = "Looking at Standings";
    } else if (document.location.pathname.includes("/drivers/")) {
      presenceData.details = "Looking at Drivers";
    } else if (document.location.pathname.includes("/teams/")) {
      presenceData.details = "Looking at Teams";
    }
  }

  function articleCheck() {
    if (document.location.pathname.includes("/news/") && !document.location.pathname.endsWith("/news/")) {
      let articleTitle = document.querySelector(".ms-entity-detail-header_title");
      presenceData.details = "Reading an article";
      presenceData.state = articleTitle.textContent;
    }
  }

  if (document.location.hostname == "www.motorsport.com") {
    presenceData.details = "Viewing a Page";
    presenceData.state = "Home Page";

    // categories
    if (document.location.pathname.startsWith("/category/")) {
      presenceData.details = "Viewing a Category";
      if (document.location.pathname.startsWith("/category/motogp/")) {
        presenceData.state = "Moto GP Series";
      } else if (document.location.pathname.startsWith("/category/nascar/")) {
        presenceData.state = "NASCAR Series";
      } else if (document.location.pathname.startsWith("/category/openwheel/")) {
        presenceData.state = "Openwheel Series";
      } else if (document.location.pathname.startsWith("/category/sportcar/")) {
        presenceData.state = "Sportscar Series";
      } else if (document.location.pathname.startsWith("/category/touring/")) {
        presenceData.state = "Touring Series";
      } else if (document.location.pathname.startsWith("/category/rally/")) {
        presenceData.state = "Rally Series";
      } else if (document.location.pathname.startsWith("/category/more/")) {
        presenceData.state = "More Categories";
      }
    }

    // /all/xyz/
    if (document.location.pathname.includes("/all/")) {
      presenceData.state = "All categories";
      checkSubPage();
    }

    // MotoGP series
    if (document.location.pathname.startsWith("/motogp/")) {
      presenceData.state = "Moto GP";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/wsbk/")) {
      presenceData.state = "World Superbike";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/moto2/")) {
      presenceData.state = "Moto 2";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/moto3/")) {
      presenceData.state = "Moto 3";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/motoe/")) {
      presenceData.state = "Moto E";
      checkSubPage();
      articleCheck();
    }

    // NASCAR series
    if (document.location.pathname.startsWith("/nascar-cup/")) {
      presenceData.state = "NASCAR Cup";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/nascar-xs/")) {
      presenceData.state = "NASCAR XFINITY";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/nascar-truck/")) {
      presenceData.state = "NASCAR Truck";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/nascar-cdm/")) {
      presenceData.state = "NASCAR Canada";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/nascar-euro/")) {
      presenceData.state = "NASCAR Euro";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/nascar-mexico/")) {
      presenceData.state = "NASCAR Mexico";
      checkSubPage();
      articleCheck();
    }

    // Openwheel series
    if (document.location.pathname.startsWith("/indycar/")) {
      presenceData.state = "IndyCar";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/indylights/")) {
      presenceData.state = "Indy Lights";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/fia-f2/")) {
      presenceData.state = "FIA Formula 2";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/fia-f3/")) {
      presenceData.state = "FIA Formula 3";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/super-formula/")) {
      presenceData.state = "Super Formula";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/w-series/")) {
      presenceData.state = "W Series";
      checkSubPage();
      articleCheck();
    }

    // Sportscar series
    if (document.location.pathname.startsWith("/imsa/")) {
      presenceData.state = "IMSA";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/elms/")) {
      presenceData.state = "European Le Mans";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/aslms/")) {
      presenceData.state = "Asian Le Mans";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/sro-anerica/")) {
      presenceData.state = "SRO America";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/gtwce-endurance/")) {
      presenceData.state = "GT World Challenge Europe Endurance";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/gtwce-sprint/")) {
      presenceData.state = "GT World Challenge Europe Sprint";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/supergt/")) {
      presenceData.state = "Super GT";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/endurance/")) {
      presenceData.state = "Endurance";
      checkSubPage();
      articleCheck();
    }

    // Touring series
    if (document.location.pathname.startsWith("/wtcr/")) {
      presenceData.state = "WTCR";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/tcr/")) {
      presenceData.state = "tcr";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/dtm/")) {
      presenceData.state = "DTM";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/v8supercars/")) {
      presenceData.state = "V8 Supercars";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/btcc/")) {
      presenceData.state = "BTCC";
      checkSubPage();
      articleCheck();
    }

    // Rally series
    if (document.location.pathname.startsWith("/wrc/")) {
      presenceData.state = "WRC";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/world-rx/")) {
      presenceData.state = 'World Rallycross';
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/dakar/")) {
      presenceData.state = "Dakar";
      checkSubPage();
      articleCheck();
    }

    // more categories
    if (document.location.pathname.startsWith("/general/")) {
      presenceData.state = "General";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/kart/")) {
      presenceData.state = "Karting";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith('/nhra/')) {
      presenceData.state = "NHRA";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/vintage/")) {
      presenceData.state = "Vintage";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/ferrari/")) {
      presenceData.state = "Ferrari";
      checkSubPage();
      articleCheck();
    } else if (document.location.pathname.startsWith("/roadracing/")) {
      presenceData.state = "Road Racing";
      checkSubPage();
      articleCheck();
    }

    if (document.location.pathname.startsWith("/f1/")) {
      presenceData.state = "Formula 1";
      checkSubPage();
      articleCheck();
    }

    if (document.location.pathname.startsWith("/wec/")) {
      presenceData.state = "World Endurance Championship";
      checkSubPage();
      articleCheck();
    }

    if (document.location.pathname.startsWith("/gaming/")) {
      presenceData.state = "Esports";
      checkSubPage();
      articleCheck();
    }

    if (document.location.pathname.startsWith("/formula-e/")) {
      presenceData.state = "Formula E";
      checkSubPage();
      articleCheck();
    }

    if (document.location.pathname.startsWith("/collection/giorgio-piola/")) {
      presenceData.details = "Collection";
      presenceData.state = "Giorgio Piola";
    }

  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }

});