const presence = new Presence({
  clientId: '752138871709499462'
}),
  browsingStamp = Math.floor(Date.now() / 1000);
function cal(str: string) {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
}
presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: 'poq1',
    startTimestamp: browsingStamp
  };

  if (document.location.hostname === 'www.poq.gg') {
    presenceData.details = `Home`;
    presenceData.buttons = [
      {
        label: `POQ.gg`,
        url: `https://poq.gg/`
      }
    ];
    if (document.querySelector('div.css-sqne7k')) {
      presenceData.details = `Staring at a 404 error`;
    }
    if (document.querySelector("div.css-surn0g")) {
      presenceData.details = `Signing into POQ`;
    }
    if (document.location.pathname.startsWith('/profile')) {
      presenceData.details = `Viewing their own profile`;
      const ign = document.querySelector('h3').textContent;
      presenceData.state = ign;
    }
    if (document.location.pathname.startsWith('/games')) {
      presenceData.details = 'Browsing through';
      presenceData.state = `Games`;
    }
    if (document.location.pathname.startsWith('/fortnite')) {
      presenceData.details = 'Looking at';
      presenceData.state = 'Fortnite Tournaments';
    }
    if (document.location.pathname.startsWith('/rocket-league')) {
      presenceData.details = 'Looking at';
      presenceData.state = 'Rocket League Tournaments';
    }
    if (document.location.pathname.startsWith('/marbles-on-stream')) {
      presenceData.details = 'Looking at';
      presenceData.state = 'Marbles on Stream Tournaments';
    }
    if (document.location.pathname.startsWith('/call-of-duty-warzone')) {
      presenceData.details = 'Looking at';
      presenceData.state = `Call of Duty: Warzone Tournaments`;
    }
    if (document.location.pathname.startsWith('/discord')) {
      presenceData.details = `Linking their POQ account`;
      presenceData.state = `to Discord!`;
      presenceData.smallImageKey = `discord`;
      presenceData.smallImageText = `poq.gg/discord`;
    }
    if (document.location.pathname.startsWith('/dashboard')) {
      presenceData.details = `Viewing/editing their`;
      presenceData.state = `player dashboard`;
    }
    if (document.location.pathname.startsWith('/bonus')) {
      presenceData.details = `Claiming their hourly`;
      presenceData.state = `bonus!`;
    }
    if (document.location.pathname.startsWith('/transactions')) {
      presenceData.details = `Viewing their`;
      presenceData.state = `Quarters Transactions History`;
    }
    if (document.location.pathname.startsWith('/events/new')) {
      presenceData.details = `Creating a tournament`;
    }
    else if (document.location.pathname.startsWith('/events/')) {
      presenceData.details = `${document.getElementsByClassName('css-p1puod').item(0).innerHTML}`;
      const part = document.querySelector('div.css-azex1v'),
      af = document.querySelector('div.css-1rtjxms');
      if (part !== null && af == null) {
        const part1 = part.childNodes[0].textContent;
        presenceData.state = `Host: ${part1}`;
        presenceData.smallImageKey = `${part1.toLowerCase()}`;
        presenceData.smallImageText = `Partnered Creator: ${part1}`;
      }
      if (af !== null && part == null) {
        const af1 = af.childNodes[0].textContent;
        presenceData.state = `Host: ${af1}`;
      }
      presenceData.buttons = [
        {
          label: `View Tournament`,
          url: `${document.URL}`
        }
      ];
    }
    else if (document.location.href.indexOf('?' + `game` + '=') !== -1) {
      presenceData.details = 'Looking at';
      let gm = document.location.pathname.replace(/^.*[\\/]/, '');
      gm = gm.replace(/-/g, ' ');
      gm = cal(gm);
      presenceData.state = `${gm} Tournaments`;
    }
    if (document.querySelector("div.css-37pl01")) {
      presenceData.details = `Buying Quarters`;
      presenceData.state = ``;
    }
  }
  const showPrize: boolean = await presence.getSetting('prize');

  if (document.location.hostname === 'prizes.poq.gg') {
    presenceData.details = 'Browsing through the';
    presenceData.state = 'Prize Store';
    presenceData.smallImageKey = `prize`;
    presenceData.smallImageText = `prizes.poq.gg`;
    if (document.title.includes('Page not found')) {
      presenceData.details = `Staring at a 404 error`;
      presenceData.state = ``;
    }
    if (document.location.pathname.startsWith('/product/')) {
      if (showPrize) {
        presenceData.details = `Browsing a product:`;
        const pl = document.title.split('–');
        presenceData.state = `${pl[0]}`;
        presenceData.buttons = [
          {
            label: `View Product`,
            url: document.URL
          }
        ];
      }
    }
    if (document.location.pathname.startsWith("/product-category/")) {
      const h1 = document.querySelector("h1");
      if (h1) {
        presenceData.details = `Browsing category:`;
        presenceData.state = `${h1.textContent}`;
      }
    }
    if (document.location.href.indexOf('?' + `s` + '=') !== -1) {
      presenceData.details = `Searching for a product:`;
      const match = document.getElementById("search") as HTMLInputElement;
      presenceData.state = `${match.value}`;
    }
    const showPass: boolean = await presence.getSetting('pass');
    if (showPass) {
      if (document.location.pathname.startsWith("/my-account/")) {
        presenceData.details = `My Account:`;
        presenceData.state = `${document.querySelector("h1").textContent}`;
      }
    }
    if (document.location.pathname.startsWith('/terms-of-service/') || document.location.pathname.startsWith('/terms-of-service')) {
      presenceData.details = `Viewing ToS`;
      presenceData.state = ``;
    }
  }
  if (document.location.hostname === 'creators.poq.gg') {
    presenceData.details = 'Browsing the';
    presenceData.state = 'POQ Creator Program';
    presenceData.smallImageKey = `verified`;
    presenceData.smallImageText = `creators.poq.gg`;
    if (document.location.pathname.startsWith('/qbot')) {
      presenceData.details = `Looking at qBot`;
      presenceData.state = ``;
    }
  }
  if (document.location.hostname === 'account.poq.gg') {
    presenceData.details = 'Registering an account';
    presenceData.state = `on POQ.gg`;
    presenceData.smallImageKey = `user`;
    presenceData.smallImageText = `account.poq.gg`;
    if (document.location.pathname.startsWith('/login')) {
      presenceData.details = `Logging into POQ.gg`;
      presenceData.state = ``;
    }
    if (document.location.pathname.startsWith('/oauth/')) {
      presenceData.details = `Signing into the`;
      presenceData.state = `Prize Store`;
    }
    if (document.location.pathname.startsWith('/invest')) {
      presenceData.details = 'Reading about POQ';
      presenceData.state = ``;
    }
    if (document.location.pathname.startsWith('/developers')) {
      presenceData.details = 'Reading about the';
      presenceData.state = `Developer API`;
    }
    if (document.location.pathname.startsWith('/home')) {
      presenceData.details = `Watching the home page`;
      presenceData.state = ``;
    }
    if (document.location.pathname.startsWith('/change-password')) {
      const showPass: boolean = await presence.getSetting('pass');
      if (showPass) {
        presenceData.details = `Changing their password`;
        presenceData.state = ``;
      }
      else {
        presenceData.details = `Exploring account settings`;
        presenceData.state = ``;
      }
    }
    if (document.location.pathname.startsWith('/accounts')) {
      presenceData.details = `Looking at their acccount`;
      presenceData.state = ``;
      if (document.querySelector("iframe")) {
        presenceData.details = `Buying Quarters`;
        presenceData.state = `Terminal3`;
      }
    }
    if (document.location.pathname.startsWith('/apps/')) {
      presenceData.details = `Viewing one of their`;
      presenceData.state = `Developer apps`;
    }
    if (document.location.pathname.startsWith('/join')) {
      presenceData.details = `Setting up their account`;
      presenceData.state = `for the first time`;
    }
    if (document.location.pathname.startsWith('/rewards')) {
      presenceData.details = `Looking at the rewards`;
      presenceData.state = `they can earn.`;
    }
  }
  presence.setActivity(presenceData);
});
