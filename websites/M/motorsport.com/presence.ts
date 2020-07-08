let presence = new Presence({
    clientId: "728904519055966228"
  });

const browsingStamp = Math.floor(Date.now() / 1000);


presence.on("UpdateData", () => {
const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: "reading",
    smallImageText: "Reading articles",
    startTimestamp: browsingStamp
}

if (document.location.hostname == "www.motorsport.com") {
    presenceData.details = "Viewing a Page";
    presenceData.state = "Home Page";

    // categories
    if (document.location.pathname.startsWith("/category/")) {
      presenceData.details = "Viewing a Category";
      if (document.location.pathname.startsWith("/category/motogp/")) { presenceData.state = "Moto GP Series"; }
      else if (document.location.pathname.startsWith("/category/nascar/")) { presenceData.state = "NASCAR Series"; }
      else if (document.location.pathname.startsWith("/category/openwheel/")) { presenceData.state = "Openwheel Series"; }
      else if (document.location.pathname.startsWith("/category/sportcar/")) { presenceData.state = "Sportscar Series"; }
    }



    if (document.location.pathname.startsWith("/f1/")) {
        presenceData.state = "Formula 1";
    }


    // MotoGP series
    if (document.location.pathname.startsWith("/motogp/")) {
      presenceData.state = "Moto GP";
    } else if (document.location.pathname.startsWith("/wsbk/")) {
      presenceData.state = "World Superbike";
    } else if (document.location.pathname.startsWith("/moto2/")) {
      presenceData.state = "Moto 2";
    } else if (document.location.pathname.startsWith("/moto3/")) {
      presenceData.state = "Moto 3";
    } else if (document.location.pathname.startsWith("/motoe/")) {
      presenceData.state = "Moto E";
    }

    // NASCAR series
    if (document.location.pathname.startsWith("/nascar-cup/")) {
      presenceData.state = "NASCAR Cup";
    } else if (document.location.pathname.startsWith("/nascar-xs/")) {
      presenceData.state = "NASCAR XFINITY";
    } else if (document.location.pathname.startsWith("/nascar-truck/")) {
      presenceData.state = "NASCAR Truck";
    } else if (document.location.pathname.startsWith("/nascar-cdm/")) {
      presenceData.state = "NASCAR Canada";
    } else if (document.location.pathname.startsWith("/nascar-euro/")) {
      presenceData.state = "NASCAR Euro";
    } else if (document.location.pathname.startsWith("/nascar-mexico/")) {
      presenceData.state = "NASCAR Mexico";
    }

    // Openwheel series
    if (document.location.pathname.startsWith("/indycar/")) {
      presenceData.state = "IndyCar";
    } else if (document.location.pathname.startsWith("/indylights/")) {
      presenceData.state = "Indy Lights";
    } else if (document.location.pathname.startsWith("/fia-f2/")) {
      presenceData.state = "FIA Formula 2";
    } else if (document.location.pathname.startsWith("/fia-f3/")) {
      presenceData.state = "FIA Formula 3";
    } else if (document.location.pathname.startsWith("/super-formula/")) {
      presenceData.state = "Super Formula";
    } else if (document.location.pathname.startsWith("/w-series/")) {
      presenceData.state = "W Series  ";
    }

    // Sportscar series
    if (document.location.pathname.startsWith("/imsa/")) {
      presenceData.state = "IMSA";
    } else if (document.location.pathname.startsWith("/elms/")) {
      presenceData.state = "Indy Lights";
    } else if (document.location.pathname.startsWith("/aslms/")) {
      presenceData.state = "FIA Formula 2";
    } else if (document.location.pathname.startsWith("/sro-anerica/")) {
      presenceData.state = "FIA Formula 3";
    } else if (document.location.pathname.startsWith("/gtwce-endurance/")) {
      presenceData.state = "Super Formula";
    } else if (document.location.pathname.startsWith("/gtwce-sprint/")) {
      presenceData.state = "W Series";
    }


    if (document.location.pathname.startsWith("/wec/")) {
        presenceData.state = "World Endurance Championship";
    }


    if (document.location.pathname.startsWith("/gaming/")) {
        presenceData.state = "Esports";
    }


    if (document.location.pathname.startsWith("/formula-e/")) {
      presenceData.state = "Formula E";
    }

}

if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
} else {
    presence.setActivity(presenceData);
}
});
