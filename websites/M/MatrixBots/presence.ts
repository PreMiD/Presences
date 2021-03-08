interface LangStrings {
    watching: string,
  }

const matrixPresence = new Presence({
    clientId: "748098665033498735"
  }),
  getStrings = async (): Promise<LangStrings> => {
    return matrixPresence.getStrings(
      {
        watching: "general.watching"
      },
      await matrixPresence.getSetting("lang")
    );
  },
  matrixBrowsing = Math.floor(Date.now() / 1000);
let matrixSearch: HTMLInputElement, matrixTitle: Element,
    strings: Promise<LangStrings> = getStrings(),
    oldLang: string = null;

matrixPresence.on("UpdateData", async() => {
    const matrixPData: PresenceData = {
        largeImageKey: "logo",
    },
    matrixPage = window.location.pathname,
    matrixHost = document.location.hostname;

    matrixPData.startTimestamp = matrixBrowsing;

    const newLang = await matrixPresence.getSetting("lang")

    if (!oldLang) {
        oldLang = newLang;
      } else if (oldLang !== newLang) {
        oldLang = newLang;
        strings = getStrings();
      }

    if (matrixHost == "www.matrixbots.xyz") {
        if (matrixPage == "/") {
            matrixPData.buttons = [
                {
                    label: "Visit",
                    url: "https://www.matrixbots.xyz/"
                }, {
                    label: "Discord",
                    url: "https://discord.gg/BKP2aSKYJR"
                }
            ]
            matrixPData.details = "Browsing"
            matrixPData.smallImageKey = "browsing"
            matrixPData.smallImageText = "Browsing Bots"
        }
        if (matrixPage.includes("/bots")) {
            const bot: any = document.evaluate("/html/body/div[4]/h2/text()", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
            matrixPData.buttons = [
                {
                    label: "View Bot",
                    url: document.URL
                }, 
                {
                    label: "Discord",
                    url: "https://discord.gg/BKP2aSKYJR"
                }
            ]
            matrixPData.details = "Watching Bot:";
            matrixPData.state = bot;
            matrixPData.smallImageText = "Browsing Bot"
            matrixPData.smallImageKey = "browsing"
        }
        if (matrixPage == "/me") {
            const username: any = document.getElementsByTagName("h1")[0].innerHTML;
            // const userImage: any = document.getElementsByClassName("icon")[0].getAttribute("src")
            matrixPData.details = "Watching Profile:";
            matrixPData.state = username;
            // matrixPData.smallImageKey = `${userImage}`;
        }
        if (matrixPage == "/add") {
            matrixPData.details = "Adding Bot";
            matrixPData.smallImageKey = "writing";
            matrixPData.smallImageText = "Writing Text";
        }
    }
    if (matrixPData.details === "undefined") {
        matrixPresence.setTrayTitle();
        matrixPresence.setActivity();
      } else {
        matrixPresence.setActivity(matrixPData);
      }
})