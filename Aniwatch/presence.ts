var presence = new Presence({
    clientId: `676041156437737472`
  }),
  strings = presence.getStrings({
    play: `presence.playback.playing`,
    pause: `presence.playback.paused`
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var browsingStamp = Math.floor(Date.now() / 1000);
var title: any; //title of the webpage
var titleName: any; //title of the webpage without site name
var path: any; //site path
var siteArray: any; //array of site path split by '/'
var fullPath: any; //entire path of the whole website
var animeArray: any; //array of anime name + episode number
var anime: any; //name of anime
var episode: any; //episode number
var code: any; //room code for Watch2Gether
var season: any; //array of season where anime air
var types: any; //array of types of tabs when available
var type: any; //the current tab selected
var parameters: any; //array of parameters for current page
var page: any; //page number when available
var username: any; //username for viewing profiles

var video: HTMLVideoElement; //the video player
var currentTime: any; //how far along the video is
var paused: any; //is the video paused?
var duration: any; //how long the video is
var timestamps: any;

presence.on(`UpdateData`, async () => {
  const presenceData: presenceData = {
    largeImageKey: `aw`
  };

  title = document.title; //title of the page; a lot of work's already done, just need to grab it from the title
  titleName = title.slice(0, -11); //cut off ' - aniwatch' from title so we only have necessary information
  path = document.location.pathname; //the path of the website aka /something/blah/blah. I'm shortening it to path because I have to write it a lot
  siteArray = path.split(`/`); //make an array out of the path so /web/page/link -> [web, page, link]
  fullPath = document.URL.slice(19); //useful since .pathname doesn't include parameters

  if (document.location.hostname == `aniwatch.me`) {
    //make sure we're on aniwatch
    if (path == `/` || path == `/home`) {
      //if we're on the home page
      presenceData.startTimestamp = browsingStamp; //start counting how long the site's been open
      presenceData.details = `Viewing home page`;
    } else if (path.startsWith(`/anime`)) {
      //if we're on an anime page

      if (siteArray.length >= 4) {
        //if array is 4 or greater then user is currently watching an episode
        animeArray = titleName.split(` - Episode `); //seperate episode number and anime name in array
        anime = animeArray[0]; //fist element in array is the anime name
        episode = animeArray[1]; //second element is episode count
        presenceData.startTimestamp = browsingStamp;

        video = document.querySelector(
          `body div div div.main-section section div md-content md-tabs md-tabs-content-wrapper md-tab-content div div div div div div video`
        ); //video player

        currentTime = video.currentTime;
        duration = video.duration;
        paused = video.paused;
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
        if (!isNaN(duration)) {
          //I'm borrowing this code from the AnimeLab presence by Bas950 because I'm too dumb to figure out how it works. I hope that's okay
          presenceData.smallImageKey = paused ? `pause` : `play`;
          presenceData.smallImageText = paused
            ? (await strings).pause
            : (await strings).play;
          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];

          presenceData.details = `Watching: [${anime}]`;
          presenceData.state = `Episode ${episode}`;

          if (paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }
        } else if (isNaN(duration)) {
          presenceData.startTimestamp = browsingStamp;
        } //end of Bas950's code
      } else {
        //not watching an episode, but just browsing anime
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = `Browsing: [${titleName}]`;
      }
    } else if (path.startsWith(`/watchlist`)) {
      //if we're on the watchlist
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Viewing watchlist`;
    } else if (path.startsWith(`/random`)) {
      //if we're on the random page
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Selecting random anime`;
    } else if (path.startsWith(`/search`)) {
      //if we're on the search page
      presenceData.startTimestamp = browsingStamp;
      presenceData.smallImageKey = `search`;
      presenceData.smallImageText = `Searching...`;
      if (titleName == `Search`) {
        //if we're on the search homepage
        presenceData.details = `Searching for anime`;
      } else {
        //if we're searching for something specific
        presenceData.details = `${titleName}`;
      }
    } else if (path.startsWith(`/watch2gether`)) {
      //if we're on 'watch2gether'
      presenceData.startTimestamp = browsingStamp;
      if (titleName == `Watch2Gether`) {
        //if we're on the watch2gether homepage
        presenceData.details = `Creating Watch2Gether`;
        presenceData.state = `room...`;
      } else {
        //if we're in a specific watch2gether room
        anime = document.querySelector(
          `body div div div.main-section section div md-content div div div div h2 span a`
        ).innerHTML; //the anime name since it doesn't appear in the title of the page when in watch2gether
        episode = document.querySelector(
          `body div div div section div md-content div div div div h2 span.fs-18`
        ).innerHTML; //the anime episode for same reason as above
        code = titleName.slice(21); //cut the title to get the room code
        presenceData.details = `In Watch2Gether room: ${code}`;
        if (!anime) {
          //if there was no 'wname' aka. no anime selected
          presenceData.state = `Selecting anime...`;
        } else {
          //if there was 'wname'
          video = document.querySelector(
            `body div div div section div md-content div div div div div video`
          ); //video player

          currentTime = video.currentTime;
          duration = video.duration;
          paused = video.paused;
          timestamps = getTimestamps(
            Math.floor(currentTime),
            Math.floor(duration)
          );
          if (!isNaN(duration)) {
            //I'm borrowing this code from the AnimeLab presence by Bas950 because I'm too dumb to figure out how it works. I hope that's okay
            presenceData.smallImageKey = paused ? `pause` : `play`;
            presenceData.smallImageText = paused
              ? (await strings).pause
              : (await strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];

            if (paused) {
              delete presenceData.startTimestamp;
              delete presenceData.endTimestamp;
            }
          } else if (isNaN(duration)) {
            presenceData.startTimestamp = browsingStamp;
          } //end of Bas950's code
          presenceData.state = `Watching: [${anime}] | ${episode}`;
        }
      }
    } else if (path.startsWith(`/stats`)) {
      //if we're on the stats page
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Looking at the statistics`;
    } else if (path.startsWith(`/faq`)) {
      //if we're on the faq page
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Reading the FAQ`;
    } else if (path.startsWith(`/seasonal`)) {
      //if we're on the seasonal page
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Browsing seasonal anime`;
      if (siteArray.length >= 3) {
        //if array is equal to or greater than 3 then the user has customized the year/season
        season = [`Winter`, `Spring`, `Summer`, `Fall`]; //list of possible seasons
        presenceData.state = `${season[siteArray[2]]} ${siteArray[3]}`; //siteArray[2] = season, siteArray[3] = year
      }
    } else if (path.startsWith(`/airing`)) {
      //if we're on the airing page
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Browsing currently airing anime`;
    } else if (path.startsWith(`/top`)) {
      //if we're on the top page
      types = [
        `popular anime`,
        `popular seasonals`,
        `popular upcomings`,
        `hot anime`,
        `best rated anime`
      ]; //types of anime you can browse
      parameters = fullPath.slice(5).split(`&`); //get an array of parameters. I'm using slice to remove '/top?' from the url
      type = parameters[0].slice(2); //grabbing type from parameters
      page = parameters[1].slice(2); //grabbing page from parameters (im using slice to remove t= and p=)
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Browsing ${types[type]}`;
      presenceData.state = `Page ${page}`;
    } else if (path.startsWith(`/requests`)) {
      //if we're on the requests page
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Browsing anime requests`;
    } else if (path.startsWith(`/profile`)) {
      //if we're on the profile page
      username = titleName.slice(0, -8); //getting username from title
      types = [
        `Overview`,
        `Biography`,
        `Chronicle`,
        `Animelist`,
        `Media`,
        `Friends`,
        `Settings`
      ]; //list of tabs
      type = fullPath.slice(13); //tab we are currently on
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Looking at ${username} profile`;
      if (types[type] == undefined) {
        //if there aren't any parameters in the url, then we are on the default profile tab
        presenceData.state = `Overview`;
      } else {
        //if we're not on the default tab
        presenceData.state = `${types[type]}`; //what tab are we on
      }
    } else if (
      path.startsWith(`/notification`) ||
      path == `/notification/view`
    ) {
      //if we're on the notification page
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Viewing notifications`;
      if (path == `/notification/settings`) {
        //if we're in the notification settings
        presenceData.state = `Notification settings`;
      }
    } else if (path.startsWith(`/donate`)) {
      //if we're on the donate page
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Viewing donation page`;
    } else if (path.startsWith(`/logout`)) {
      //if we're on the logout page (this one's kinda useless since you're on the page for less than a second)
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Logging out...`;
    } else if (path.startsWith(`/login`)) {
      //if we're on the login page
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `On the login page`;
    } else if (path.startsWith(`/policy`)) {
      //if we're on the privacy policy page
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = `Reading the privacy policy`;
      presenceData.smallImageKey = `reading`;
      presenceData.smallImageText = `Reading...`;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
