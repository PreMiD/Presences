const presence = new Presence({
  clientId: "760981805695762441"
});

// Variables 
presence.on("UpdateData", async () => {
  // Presence Data
  const timestamp = presence.getTimestamps(Date.now(), 0),
    data: PresenceData = {
      largeImageKey: "padlet_image",
      startTimestamp: timestamp[ 0 ]
    };

  // Setup Routes & Query (For Features)
  const routes = document.location.href.replace(document.location.search, '').split("/").splice(3).join('/'),
    topicName = document.querySelector('.surface-title .title-heading')?.textContent.trim(),
    topicDescription = document.querySelector('.surface-title .title-description')?.textContent.trim(),
    appBarTitle = document.querySelector('.app-bar-headline .app-bar-title')?.textContent.trim();

  // padlet.com/features
  if (routes.startsWith('features')) {
    data.details = 'Product Features';
  }
  // padlet.com/premium
  else if (routes.startsWith('premium')) {
    data.details = 'Premium';
  }
  // padlet.com/support
  else if (routes.startsWith('support')) {
    data.details = 'Support';

    if (topicName) {
      data.details = `Support • ${topicName}`;
    }

    if (topicDescription) {
      data.state = topicDescription;
    }
  }
  // padlet.com/gallery
  else if (routes.startsWith('gallery')) {
    data.details = 'Gallery';

    if (topicName) {
      data.details = `Gallery • ${topicName}`;
    }

    if (topicDescription) {
      data.state = topicDescription;
    }
  }
  // padlet.com/contact-us
  else if (routes.startsWith('contact-us')) {
    data.details = 'Contact Us';
  }
  // padlet.com/about
  else if (routes.startsWith('about')) {
    if (topicName) {
      data.details = `About • ${topicName}`;
    }

    if (topicDescription) {
      data.state = topicDescription;
    }
  }
  // padlet.com/dashboard
  else if (routes.startsWith('dashboard')) {
    data.details = `Dashboard`;
    if (appBarTitle) {
      data.state = appBarTitle;
    }
  }
  // padlet.com/create
  else if (routes.startsWith('create')) {
    data.details = `Dashboard`;
    if (appBarTitle) {
      data.state = appBarTitle;
    }
  }
  // padlet.com/:username
  else {
    if (topicName) {
      data.details = topicName;
    }

    if (topicDescription) {
      data.state = topicDescription;
    }
  }

  presence.setActivity(data, true);
});
