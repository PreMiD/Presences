import {ActivityType, Assets } from "premid";

const presence = new Presence({
  clientId: "1348031159640129617" 
});

function formatTitleFromURL(url: string): string {

  const segments = url.toLowerCase()
    .replace(/^https?:\/\/[^/]+/, '') // Remove domain
    .replace(/\/(watch|movie|series|episode|music-video|shortfilm|original|buy-ticket)/g, '/')
    .split('/')
    .filter(p => p && p !== 'watch' && p !== 'episode');

  // Extract main content identifier
  const contentSegments = segments.filter(s => 
    !['movie', 'series', 'music-video', 'shortfilm', 'original', 'buy-ticket'].includes(s)
  );

  // Process and capitalize title
  return contentSegments.join('-')
    .split('-')
    .map(word => 
      word === 'ep' ? '' : // Remove episode indicator
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .filter(word => word) // Remove empty strings
    .join(' ');
}

presence.on("UpdateData", async () => {
  const { pathname, href } = document.location;
  const presenceData: PresenceData = {
    largeImageKey: "https://i.ibb.co/s9vYjfwR/image.png", 
    type: ActivityType.Watching
  };

  // Extract and format title from URL
  const rawTitle = formatTitleFromURL(href);
  const episodeMatch = pathname.match(/ep-(\d+)/i);
  const episodeNumber = episodeMatch?.[1]?.padStart(2, '0');
  const isWatchPage = pathname.includes('/watch/');

  if (pathname === '/') {
    presenceData.details = "Browsing Home";
  } else if(pathname.includes('/original')){
    presenceData.details = "Browsing Chorki Originals";
  } else if (pathname.includes('/watch/movie/')) {
    presenceData.details = "Watching Movie";
    presenceData.state = rawTitle;
  } else if(pathname === '/movie') {
    presenceData.details = "Looking for Movies";
  } else if (pathname.includes('/movie/')) {
    presenceData.details = `Viewing Movie`
    presenceData.state = rawTitle;
  } else if (pathname.includes('/watch/series/')) {
    presenceData.details = "Watching Series";
    presenceData.state = episodeNumber 
      ? `${rawTitle.replace(/ Episode \d+$/, '')}: Episode ${episodeNumber}`
      : rawTitle;
  } else if (pathname === '/series') {
    presenceData.details = "Exploring Series";
  } else if (pathname.includes('/series/')) {
    presenceData.details = "Viewing Series";
    presenceData.state = rawTitle;
  } else if (pathname.includes('/music-video/')) {
    presenceData.details = "Watching Music Video";
    presenceData.state = rawTitle;
  } else if (pathname.includes('/original')) {
    presenceData.details = "Browsing Chorki Originals";
  } else if(pathname === '/shortfilm') {
    presenceData.details = "Browsing Short Films";
  } else if (pathname.includes('/shortfilm/')) {
    presenceData.details = "Viewing Short-Film";
    presenceData.state = rawTitle;
  } else if (pathname.includes('/buy-ticket')) {
    presenceData.details = "Looking for Tickets";
  } else if(pathname.includes('/bytes/')){
    presenceData.details = "Browsing Bytes";
  }else {
    presenceData.details = "Browsing Chorki";
  }

  // Add video status if available
  const video = isWatchPage ? document.querySelector("video") : null;

  if (video) {
    presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
    presenceData.smallImageText = video.paused ? "Paused" : "Watching";
    
    if (!video.paused && !isNaN(video.duration)) {
      [presenceData.startTimestamp, presenceData.endTimestamp] = 
        presence.getTimestamps(video.currentTime, video.duration);
    }
  } else {
    // Clear media controls for non-watch pages
    delete presenceData.smallImageKey;
    delete presenceData.smallImageText;
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }

  presence.setActivity(presenceData);
});