const presence = new Presence({
  clientId: '835634699384258571'
});

presence.on('UpdateData', () => {
  const presenceData: PresenceData = {
    largeImageKey: 'logo',
    details: 'Reading a page:',
    state: document.querySelector('title').innerText.split(/ ?[-:] ?/g)[0].replace(/.+\| ?/, '').trim() || 'Unknown page'
  };
  let pagename = location.pathname;
  pagename = pagename.startsWith('/') ? pagename.slice(1) : pagename;
  pagename = pagename.endsWith('/') ? pagename.slice(0, -1) : pagename;
  const domain = location.host;
  if (domain === 'www.reverso.net') {
    if (pagename === 'text_translation.aspx') {
      presenceData.details = `${(<HTMLElement>document.querySelector('#Form1 > section > div.translate-holder > div.reverse-holder.clearfix > div.reverse-block > div:nth-child(1) > div > span')).innerText} → ${(<HTMLElement>document.querySelector('#Form1 > section > div.translate-holder > div.reverse-holder.clearfix > div.reverse-block > div:nth-child(3) > div > span')).innerText}`
      presenceData.state = 'Translating';
    }
    if (pagename === 'spell-checker/english-spelling-grammar') {
      presenceData.details = 'Using spellchecker';
      const spellcheckerTextarea = <HTMLTextAreaElement>document.getElementById('startText');
      const spellcheckerChecked = <HTMLDivElement>document.getElementById('inside');
      const correctEl = <HTMLLabelElement>document.getElementById('textCorect');
      presenceData.state = (spellcheckerTextarea ? spellcheckerTextarea.value ? `Checking "${spellcheckerTextarea.value}"` : '' : spellcheckerChecked ? `Spelt "${spellcheckerChecked.innerText}" ${correctEl && correctEl.style.display !== 'none' ? 'correctly' : 'incorrectly'}` : '') || '';
    }
    if (pagename === 'translationresults.aspx') {
      presenceData.details = `${(<HTMLElement>document.querySelector('#Form1 > div.main-left-wrapper > div.search-main-wrap.search-main-res > div.select-holder.clearfix > div:nth-child(3) > div.select-holder__side.select-holder__side--left > div.select-col > div > div > span')).innerText} → ${(<HTMLElement>document.querySelector('#Form1 > div.main-left-wrapper > div.search-main-wrap.search-main-res > div.select-holder.clearfix > div:nth-child(3) > div.select-holder__side.select-holder__side--right > div > div > div > span')).innerText}`
      const translationText: string = (<HTMLTextAreaElement>document.getElementById('txtSource')).value;
      presenceData.state = translationText ? `Translating "${translationText}"` : 'Using translator';
    }
  }
  if (domain === 'dl.reverso.net') {
    presenceData.details = 'Download Reverso';
    presenceData.state = '';
  }
  if (domain === 'www.corporate-translation.reverso.com') {
    presenceData.details = 'Reverso Corporate';
    if (pagename === '') presenceData.state = 'Homepage';
  }
  if ([].includes(domain)) {
    if (pagename === '') presenceData.state = 'Homepage';
  }
  if (domain === 'synonyms.reverso.net') {
    presenceData.details = 'Synonyms';
    if (pagename === 'synonym') presenceData.state = 'Homepage';
    if (pagename.startsWith('synonym/')) {
      presenceData.details = `Synonyms (${(<HTMLSpanElement>document.querySelector('#trg-selector > span.option.front > span.lang-trg'))?.innerText || 'English'})`;
      presenceData.state = `Searching "${(<HTMLInputElement>document.getElementById('searchbox'))?.value}"`;
    }
  }
  if (["tasrif.reverso.net", "konjugator.reverso.net", "conjugator.reverso.net", "conjugador.reverso.net", "conjugueur.reverso.net", "pealim.reverso.net", "coniugazione.reverso.net", "doushi.reverso.net", "conjugacao.reverso.net", "glagol.reverso.net", "tasrif.reverso.net", "konjugator.reverso.net", "conjugator.reverso.net", "conjugador.reverso.net", "conjugueur.reverso.net", "pealim.reverso.net", "coniugazione.reverso.net", "doushi.reverso.net", "conjugacao.reverso.net", "glagol.reverso.net"].includes(domain)) {
    presenceData.details = 'Conjugator';
    presenceData.state = document.querySelector('.content-head') ? (<HTMLElement>document.querySelector('.content-head')).innerText : document.querySelector('title').innerText.split('|')[0];
    if (['conjugation-english.html', '活用-英語.html', 'coniugazione-inglese.html', 'conjugacao-ingles.html'].includes(pagename)) presenceData.state = 'Homepage';
    if (pagename.match(/conjugation-.+-verb-.+\.html/g)) {
      presenceData.details = `Conjugator (${(<HTMLLabelElement>document.querySelector('#content-menu > div.tableForm.clearfix > div > div.select-wrap > a > label'))?.innerText || 'English'})`;
      presenceData.state = `Searching "${(<HTMLInputElement>document.getElementById('txtVerb')).value}"`;
    }
    if (pagename === 'info-british-american-conjugation.html') {
      presenceData.details = 'Reading a page:';
      presenceData.state = 'British vs American English (verbs)';
    }
    if (pagename.match(/index-.+-\d+-\d+.html/g)) {
      const pageTitleEl = <HTMLElement>document.querySelector('#form1 > div.content-conj.content-conj-inner > div > div.wrapperW > div.headerDescription.conj.clearfix > h1');
      presenceData.details = pageTitleEl.innerText.split('from')[0] || 'Most common verbs';
      presenceData.state = 'from ' + pageTitleEl.innerText.split('from')[1] || '';
    }
  }
  presence.setActivity(presenceData, true);
  presence.setTrayTitle();
});