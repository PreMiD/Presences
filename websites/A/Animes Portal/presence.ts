const presence = new Presence({
  clientId: '924791712944099389'
});

const filterCodes: any = {
  366: 'bgsub'
}

presence.on('UpdateData', async () => {

  const presenceData: PresenceData = {
    largeImageKey: 'logo',
  };

  if (document.location.pathname === '/') {
    assign(presenceData, {
      details: 'Home',
      state: 'Viewing the home page'
    });
  } else if (document.location.pathname.startsWith('/animes')) {
    let url = new URL(document.location.href);
    let filter: any = url.searchParams.get('filters');
    let paths = document.location.pathname.split('/');
    if (!paths[0]) paths.shift();
    let filters: Array<string> = [];

    if (filter) {
      filter.split(',').map((x: string) => parseInt(x)).forEach((f: number) => {
        if (filterCodes[f]) filters.push(filterCodes[f])
      })
    }

    if (paths[1] === 'search' && paths[2]) {
      assign(presenceData, {
        details: `Searching for ${paths[2].replaceAll('-', ' ')} ${filters.includes('bgsub') ? `with BG sub` : ''}`
      });
    } else if (paths[1]) {
      assign(presenceData, {
        details: `Viewing animes that starts with the keyboard ${paths[1].toUpperCase()}`
      });
    } else
      assign(presenceData, {
        details: `Viewing animes ${filters.includes('bgsub') ? `with BG sub` : ''}`
      });
  } else if (document.location.pathname.startsWith('/anime/')) {
    let paths = document.location.pathname.split('/');
    if (!paths[0]) paths.shift();
    let uid = paths[1];
    let eid = paths[2];

    if (uid && !eid) {
      let name = document.querySelector('body > main.animated > div.wrapper > article.rowView > header.rowView-head > h1.heading').innerHTML;
      assign(presenceData, {
        details: `Viewing ${name}`
      });
    } else if (uid && eid) {
      let ep = document.querySelector('body > main.animated > div.wrapper > section.holder > h1.heading > b#num').innerHTML;
      let name = document.querySelector('body > main.animated > div.wrapper > section.holder > h2.heading > a').innerHTML;
      let part = between(ep, '(', ')');
      let rep = ep;

      if (ep.includes('(') && ep.includes('(')) {
        rep = ep.replace(` (${part})`, '');
        part = part.replace(/\D/g, "");
      } else part = undefined;

      let playing = document.querySelector('body > main.animated > div.wrapper > section.holder > div.player > div.holder > div.vplayer')?.classList.contains('playing');

      if (!playing)
        assign(presenceData, {
          details: `Watching ${name}`,
          state: `Episode ${rep} ${part ? `(part ${part})` : ''}`
        });
      else return;

    }
  }

  if (presenceData !== undefined) {
    presence.setActivity(presenceData);
  } else
    presence.setActivity();

});

presence.on('iFrameData', async (data: any) => {

  if (!data.currentTime || !data.currentTime) return;
  const presenceData: PresenceData = {
    largeImageKey: 'logo',
  };

  let ep = document.querySelector('body > main.animated > div.wrapper > section.holder > h1.heading > b#num').innerHTML;
  let name = document.querySelector('body > main.animated > div.wrapper > section.holder > h2.heading > a').innerHTML;
  let part = between(ep, '(', ')');
  let rep = ep;

  if (ep.includes('(') && ep.includes('(')) {
    rep = ep.replace(` (${part})`, '');
    part = part.replace(/\D/g, "");
  } else part = undefined;

  [presenceData.startTimestamp, presenceData.endTimestamp] =
    presence.getTimestamps(
      Math.floor(data.currentTime),
      Math.floor(data.duration)
    );

  assign(presenceData, {
    details: `Watching ${name}`,
    state: `Episode ${rep} ${part ? `(part ${part})` : ''}`
  });

  if (presenceData !== undefined) {
    presence.setActivity(presenceData);
  } else
    presence.setActivity();

})

function assign(data: PresenceData, newdata: PresenceData) {
  return Object.assign(data, newdata);
}

function between(st: string, b1: string, b2: string) {
  return st.split(b1).pop().split(b2)[0];
}
