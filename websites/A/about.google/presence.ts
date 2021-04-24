const presence = new Presence({
  clientId: '821847786369581066'
}),
pageMap: { [ key: string ]: { action?: string, text?: string } } = {
  '': {
    action: 'Reading a page:',
    text: 'Homepage'
  },
  'google-in-uk': {
    action: 'Reading about:',
    text: 'Google in the UK'
  },
  products: {
    action: 'Browsing:', 
    text: 'Google\'s products'
  },
  'extended-workforce': {
    action: 'Reading about:',
    text: 'Google\'s extended workforce'
  },
  'community-guidelines': {
    action: 'Reading a page:',
    text: 'Google\'s community guidelines'
  },
  'how-our-business-works': {
    action: 'Reading about:',
    text: 'How Google works'
  },
  'human-rights': {
    action: 'Reading a page:',
    text: 'Human Rights'
  },
  commitments: {
    text: 'Commitments'
  },
  'commitments/racialequity': {
    text: 'Racial equality'
  },
  stories: {
    text: 'Stories'
  }
};

presence.on('UpdateData', () => {
  const presenceData: PresenceData = {
    largeImageKey: 'logo',
    details: 'Reading a page:',
    state: 'Unknown page'
  };
  let pagename = location.pathname;
  pagename = pagename.startsWith('/') ? pagename.slice(1) : pagename;
  pagename = pagename.endsWith('/') ? pagename.slice(0, -1) : pagename;
  let pageData = pageMap[pagename];
  if (pageData && typeof pageData === 'object') {
    presenceData.details = pageData.action ?? '';
    presenceData.state = pageData.text ?? '';
  } else if (pagename.startsWith('brand-resource-center')) {
    presenceData.details = 'Brand resource center';
    const metaTitle: HTMLMetaElement = document.querySelector('meta[property="og:title"]'),
    h1 = document.querySelector('h1');
    presenceData.state = metaTitle ? metaTitle.content : h1 ? h1.innerText : document.querySelector('title')?.innerText || '';
  } else if (pagename === 'locations') {
    if (location.search && location.search !== '') {
      presenceData.details = 'Google\'s office locations';
      presenceData.state = `in ${location.search.split('region=')[1].replace(/-/g, ' ').replace(/./, (a) => a.toUpperCase())}`;
    }
    location.search.split('region=')[1]
  } else {
    const metaTitle: HTMLMetaElement = document.querySelector('meta[property="og:title"]'),
    h1 = document.querySelector('h1');
    presenceData.state = metaTitle ? metaTitle.content : h1 ? h1.innerText : document.querySelector('title')?.innerText || '';
    if (pagename.startsWith('stories')) {
      presenceData.details = 'Reading a story:';
    }
  }
  presence.setActivity(presenceData, true);
  presence.setTrayTitle();
});