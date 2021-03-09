const presence = new Presence({
  clientId: "765261270814949417"
});

let oldLang: string = null

function getMeta(metaName: string): string {
  metaName = "PreMiD_"+metaName;
  const metas = document.getElementsByTagName('meta');
  for (let i = 0; i < metas.length; i++) { if (metas[i].getAttribute('name') === metaName) { return metas[i].getAttribute('content'); } }
  return '';
}

function hasMeta(metaName: string): boolean {
  metaName = "PreMiD_"+metaName;
  const metas = document.getElementsByTagName('meta');
  for (let i = 0; i < metas.length; i++) { if (metas[i].getAttribute('name') === metaName) { return true; } }
  return false;
}

async function translateStrings(strings: any) {
  return await presence.getStrings(strings, oldLang)
}

presence.on("UpdateData", async () => {
  const incognito: boolean = await presence.getSetting("incognito"),
    showTimestamp: boolean = await presence.getSetting("showTimestamp"),
    showButtons: boolean = await presence.getSetting("buttons"),
    debugMode: boolean = await presence.getSetting('debug'),
    newLang: string = await presence.getSetting("lang");
  if (!oldLang) { oldLang = newLang; } else if (oldLang !== newLang) { oldLang = newLang; }

  const presenceData: PresenceData = {
    largeImageKey: "img_logo"
  };

  if (showTimestamp == true) {
    const browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.startTimestamp = browsingStamp;
  } else {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }

  let presenceButtons: { label: string; url: string }[] = [];
  if (incognito == false) {
    if (['voidbots.net', 'beta.voidbots.net'].includes(window.location.hostname)) {
      let strings = await translateStrings({
        details: getMeta('details'),
        state: getMeta('state'),
        smallImageText: getMeta('smallImageText')//,
        // button1label: getMeta('button_1_label'),
        // button2label: getMeta('button_2_label')
      })
      if (hasMeta('details')) presenceData.details = strings.details || getMeta('details');
      if (hasMeta('state')) presenceData.state = strings.state || getMeta('state');
      if (hasMeta('smallImageKey')) presenceData.smallImageKey = getMeta('smallImageKey');
      if (hasMeta('smallImageText')) presenceData.smallImageText = strings.smallImageText || getMeta('smallImageText');
      // if (hasMeta('button_1_label') && hasMeta('button_1_url')) presenceButtons.push({label: strings.button1label || getMeta('button_1_label'), url: getMeta('button_1_url') })
      // if (hasMeta('button_2_label') && hasMeta('button_2_url')) presenceButtons.push({label: strings.button2label || getMeta('button_2_label'), url: getMeta('button_1_url') })
    } else if (window.location.hostname == 'docs.voidbots.net') {
      presenceData.details = "Viewing the docs";
      presenceData.state = document.querySelector("title").textContent || "Home";
    }
  } else {
    presenceData.details = 'Visiting';
    presenceButtons = [ { label: 'Website', url: 'https://voidbots.net/'}, { label: 'Discord', url: 'https://voidbots.net/join'} ]
  }

  if (showButtons == true) presenceData.buttons = presenceButtons;

  if (debugMode) {
    console.log('------------------')
    console.log(`Details (${hasMeta('details')}): ${getMeta('details')}`)
    console.log(`State (${hasMeta('state')}): ${getMeta('state')}`)
    console.log(`smallImageKey (${hasMeta('smallImageKey')}): ${getMeta('smallImageKey')}`)
    console.log(`smallImageText (${hasMeta('smallImageText')}): ${getMeta('smallImageText')}`)
    console.log(`button_1_label (${hasMeta('button_1_label')}): ${getMeta('button_1_label')}`)
    console.log(`button_2_label (${hasMeta('button_2_label')}): ${getMeta('button_2_label')}`)
    console.log(`Buttons Array:`, presenceButtons)
    console.log('Presence Data: ', presenceData)
    console.log(`Set Presence? ${presenceData.details == null ? 'false' : 'true'}`)
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});