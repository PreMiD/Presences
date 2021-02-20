const presence: Presence = new Presence({
  clientId: '812689086435164251'
});

const startTime: number = new Date().getTime();
let presenceData: PresenceData = {
  startTimestamp: startTime,
  largeImageKey: 'logo'
};

presence.on('UpdateData', async (): Promise<void> => {
  if (window.location.pathname === '/') {
    const settings: {
      [ key: string ]: string
    } = {
      details: await presence.getSetting('changedetails'),
      state: await presence.getSetting('changestate')
    };
    const _log = console.log;
    console.log = () => {};
    console.log(settings);
    console.log = _log;
    const _format = async (a: string): Promise<string> => {
      let g: any;
      type f = { [ key: string ]: string };
      type d = string | false;
      const _helper = (b: string): d => {
        if (typeof b !== 'string') return false;
        const c = document.querySelector(`span[title="${b}"]`);
        if (!c || typeof c != 'object' || !c?.children?.length) return false;
        return (c?.children?.[1] as HTMLElement)?.innerText || false;
      };
      const _helper2 = (b: string): f => {
        const c: HTMLCollection = document.querySelector(b)?.children?.[1]?.children;
        const e: f = {};
        g = c?.[0] as HTMLElement;
        if (g && g?.innerText) e.value = g.innerText;
        g = c?.[1] as HTMLElement;
        if (g) e.increase = g?.innerText.replace(/(↑|↓)/g, '');
        return e;
      };
      const getSpeed = (): f => {
        const wpm: d = _helper('Average typing speed.');
        const best: d = _helper('Best typing speed.');
        g = _helper2('span.Practice-speed');
        let current, increase;
        if (g && typeof g === 'object') {
          current = g.value;
          increase = g.increase;
        };
        const e: f = {};
        if (wpm) e.wpm = wpm;
        if (best) e.best = best;
        if (current) e.current = current;
        if (increase) e.increase = increase;
        return e;
      };
      const confidence: d = _helper('Confidence level.');
      const learningRate: d = _helper('Learning rate.');
      let learningKeys: (string)[] = [];
      const learningKeysElements: NodeList = document.querySelectorAll('.LessonKey.LessonKey--included');
      if (learningKeysElements && typeof learningKeysElements === 'object')
      learningKeysElements.forEach((learningKey): void => {
        let g = (learningKey as HTMLElement).innerText;
        if (!g || typeof g !== 'string') return;
        learningKeys.push(g);
      });
      const learningKeyData: HTMLCollection = (
        document.querySelector('[title="The current key details."]') as HTMLElement
      )?.children?.[1]?.children;
      const learningKey: string = (learningKeyData[0] as HTMLElement)?.innerText || 'Unknown';
      const speedData: f = getSpeed();
      const __pageData = await presence.getPageletiable('__pageData');
      g = _helper2('span.Practice-errors');
      let errors, errorIncrease;
      if (g && typeof g === 'object') {
        errors = g.value;
        errorIncrease = g.increase;
      };
      g = _helper2('span.Practice-score');
      let score, scoreIncrease;
      if (g && typeof g === 'object') {
        score = g.value;
        scoreIncrease = g.increase;
      };
      // yes...much performance
      return a
      .replace(/^{/g, 'ඞsusඞ') // Escaping {
      .replace(/{speed}/gi, speedData.current)
      .replace(/{speed.best}/gi, speedData.best)
      .replace(/{speed.increase}/gi, speedData.increase)
      .replace(/{speed.wpm}/gi, speedData.wpm)
      .replace(/{errors}/gi, errors)
      .replace(/{errors.increase}/gi, errorIncrease)
      .replace(/{score}/gi, score)
      .replace(/{score.increase}/gi, scoreIncrease)
      .replace(/{confidence}/gi, confidence || 'Unknown')
      .replace(/{learningrate}/gi, learningRate || 'Unknown')
      .replace(/{currentkey}/gi, learningKey)
      .replace(/{currentkeys}/gi, [...new Set(learningKeys)].join(''))
      .replace(/{theme}/gi, __pageData.prefs.themeName)
      .replace(/{textsize}/gi, __pageData.prefs.textSize)
      .replace(/{username}/gi, (__pageData?.publicUser?.id && __pageData?.publicUser?.name) || 'Unknown')
      .replace(/ඞsusඞ/g, '{') // Escaping {
    };
    presenceData = {
      ...presenceData,
      details: await _format(' ' + settings.details || `Current Key: {currentkey}`),
      state: await _format(' ' + settings.state || `WPM: {speed.wpm} | Score: {score}`)
    };
  } else if (window.location.pathname?.toLowerCase() === '/multiplayer') {
    let g: any = document.querySelector('.Player--me')?.children?.[2]?.children?.[0]?.children?.[1];
    const idle: PresenceData = {
      ...presenceData,
      details: 'Multiplayer Race',
      state: 'Idle'
    };
    if (document.querySelector('.Article > h1')) {
      presenceData = idle;
      return;
    };
    if (!g) {
      presenceData = idle
      return;
    };
    g = (g as HTMLElement)?.innerText;
    const position = g || undefined;
    const states: {
      [ key: string ]: string
    } = {
      'Zzz... Wait for the next race': 'Idle',
      'GO!': 'Race has started!'
    };
    g = (document.querySelector('div.Track-ticker') as HTMLElement)?.innerText;
    if (!g) {
      presenceData = idle
      return;
    };
    const state = states[g] || g || 'Idle';
    presenceData = {
      ...presenceData,
      details: (`Multiplayer Race${position === '-' ? '' : ` (${position} Place)`}`),
      state
    };
  } else {
    const pages: {
      [ key: string ]: string
    } = {
      profile: 'Profile',
      help: 'About keybr.com',
      'high-scores': 'High Scores',
      layouts: 'Layouts',
      'text-tools': 'Text Tools',
      'terms-of-service': 'Terms of Service',
      'privacy-policy': 'Privacy Policy',
    };
    presenceData = {
      ...presenceData,
      details: 'Viewing page:',
      state: pages[window.location.pathname?.slice(1)?.toLowerCase()] || 'Unknown Page'
    };
  };
  presence.setActivity(<PresenceData>presenceData, true);
  presence.setTrayTitle();
});
