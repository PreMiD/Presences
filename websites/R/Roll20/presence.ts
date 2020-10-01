var websiteLoadTimestamp = Math.floor(Date.now() / 1000);

var presence = new Presence({
  clientId: "761236386724446238"
}),

strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

presence.on("UpdateData", async () => {
  var presenceData: PresenceData = {
      largeImageKey: "roll20_logo",
      startTimestamp: websiteLoadTimestamp,
  };

  if(document.location.pathname.endsWith('roll20.net') || document.location.pathname.includes('/welcome')) {
    presenceData.details = "Viewing home page";
  }
  else if(document.location.pathname.includes('/editor')) {
    presenceData.details = "Playing campaign";
    if(document.title) {
      presenceData.state = document.title.replace(' | Roll20', '');
    }
  }
  else if(document.location.pathname.includes('/campaigns/details')) {
    presenceData.details = "Viewing game details";
    presenceData.state = document.getElementsByClassName('campaignname')[0].textContent;
  }
  else if(document.location.pathname.includes('/lfg')) {
    presenceData.details = "Finding games to join";
  }
  else if(document.location.pathname.includes('/campaigns/new')) {
    presenceData.details = "Creating new game";
  }
  else if(document.location.pathname.includes('/campaigns/search')) {
    presenceData.details = "Browsing their games";
  }
  else if(document.location.pathname.includes('/playerdirectory')) {
    presenceData.details = "Browsing player directory";
  }
  else if(document.location.hostname.includes('marketplace.roll20.net')) {
    presenceData.details = "Browsing Marketplace";
  }
  else if(document.location.pathname.includes('/vault/characters')) {
    presenceData.details = "Browsing characters vault";
  }
  else if(document.location.pathname.includes('/account')) {
    presenceData.details = "Editing their profile";
  }
  else if(document.location.pathname.includes('/user')) {
    presenceData.details = "Viewing player profile";
    if(document.getElementsByTagName('h1').length > 0) {
      if(document.getElementsByTagName('h1')[0].classList.contains('editable'))
      {
        presenceData.details = "Viewing own profile";
      } else {
        presenceData.state = document.getElementsByTagName('h1')[0].textContent;
      }
    }
  }
  else if(document.location.pathname.includes('/wishlist')) {
    presenceData.details = "Viewing wishlist";
  }
  else if(document.location.pathname.includes('/private_message')) {
    presenceData.details = "Reading private messages";
  }
  else if(document.location.pathname.includes('/audio_library')) {
    presenceData.details = "Browsing audio library";
  }
  else if(document.location.pathname.includes('/compendium')) {
    presenceData.details = "Reading Compendium";
  }
  else if(document.location.hostname.includes('wiki.roll20.net')) {
    presenceData.details = "Reading Wiki"
    // don't include state for wiki creation discussion etc.
    if(document.getElementById('page-title') != undefined && !document.location.pathname.includes('index.php')) {
      presenceData.state = document.getElementById('page-title').textContent;
    }
  }
  else if(document.location.pathname.includes('/forum')) {
    if(document.location.pathname.includes('/post')) {
      presenceData.details = "Reading Forum Post";
      if(document.getElementsByClassName('posttitle').length > 0) {
        presenceData.state = document.getElementsByClassName('posttitle')[0].textContent;
      }
    }
    else if(document.location.pathname.includes('/category')) {
      presenceData.details = "Browsing Forum Category";
      if(document.getElementsByTagName('h1').length > 0) {
        presenceData.state = document.getElementsByTagName('h1')[0].textContent;
      }
    }
    else {
      presenceData.details = "Browsing Forum";
    }
  }
  else if(document.location.hostname.includes('blog.roll20.net')) {
    if(document.location.pathname.includes('/post')) {
      presenceData.details = "Reading Blog Post";
      if(document.getElementsByTagName('h1').length > 0) {
        presenceData.state = document.getElementsByTagName('h1')[0].textContent;
      }
    }
    else {
      presenceData.details = "Reading Blog";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }

});