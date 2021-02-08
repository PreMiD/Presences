interface LangString {
  browsingMainPage: string;
  searchingFor: string;
  viewing: string;
  lookingFor: string;
  class: string;
  method: string;
  typedef: string;
}
const presence = new Presence({
  clientId: "800651916345999360"
}),
  getStrings = async (): Promise<LangString> => {
    return presence.getStrings(
      {
        browsingMainPage: "hypixelapireborn.browsingMainPage",
        searchingFor: "hypixelapireborn.searchingFor",
        viewing: "hypixelapireborn.viewing",
        lookingFor: "hypixelapireborn.lookingFor",
        class: "hypixelapireborn.class",
        method: "hypixelapireborn.method",
        typedef: "hypixelapireborn.typedef"
      },
      await presence.getSetting('lang')
    );
  },
  browsingStamp = Math.floor(Date.now() / 1000);

const strings: Promise<LangString> = getStrings();
presence.on("UpdateData", async () => {
  const route = document.location.hash.split("/"),
    showTimestamps = await presence.getSetting('showTimestamps'),
    data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: showTimestamps ? browsingStamp : null
    };

  if (route.length === 1 || route[1] === "") {
    data.details = (await strings).browsingMainPage;
  } else if (route[1] === "docs") {
    data.smallImageKey = route[2];
    data.smallImageText = `${route[2].replace(/^[a-z]/i, (c) =>
      c.toUpperCase()
    )} - ${Number(route[3][0]) ? `v${route[3]}` : `${route[3]}`}`;
    if (route[4].startsWith("search?q=")) {
      data.details = (await strings).searchingFor;
      data.state = route[4].slice(9);
    } else if (route[4] === "general") {
      data.details = (await strings).viewing;
      data.state = `${route[5].replace(/^[a-z]/i, (c) => c.toUpperCase())}`;
    } else {
      let lookingFor: string;
      switch (route[4].toLowerCase()) {
        case "class": lookingFor = (await strings).class;
          break;
        case "method": lookingFor = (await strings).method;
          break;
        case "typedef": lookingFor = (await strings).typedef;
          break;
      }
      data.details = `${(await strings).lookingFor} ${lookingFor}}`;
      data.state = `${route[5].split("?scrollTo=")[0]}${route[5].split("?scrollTo=")[1]
        ? `#${route[5].split("?scrollTo=")[1][1] === "-"
          ? route[5].split("?scrollTo=")[1].slice(2)
          : route[5].split("?scrollTo=")[1]
        }`
        : ""
        }`;
    }
  }

  presence.setActivity(data);
});
