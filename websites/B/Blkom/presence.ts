const presence = new Presence({
  clientId: "769568486263095327"
}),

strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
});

let video = {
duration: 0,
currentTime: 0,
paused: true
};

function getTimestamps(
videoTime: number,
videoDuration: number
): Array<number> {
const startTime = Date.now(),
  endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
return [Math.floor(startTime / 1000), endTime];
}

presence.on(
"iFrameData",
(data: { duration: number; currentTime: number; paused: boolean }) => {
  video = data;
}
);

presence.on("UpdateData", async () => {
const data: PresenceData = {
  largeImageKey: "logo"
};

if (location.pathname.startsWith('/watch')) {
  const timestamps = getTimestamps(
    Math.floor(video.currentTime),
    Math.floor(video.duration)
  );

  data.details = document.querySelector(".anime-name").textContent.trim();

  data.state = document.querySelector(".episode-number").textContent

  data.smallImageKey = video.paused ? "pause" : "play";
  data.smallImageText = video.paused
    ? (await strings).pause
    : (await strings).play;
  data.startTimestamp = timestamps[0];
  data.endTimestamp = timestamps[1];

  if (video.paused) {
    delete data.startTimestamp;
    delete data.endTimestamp;
  }

  presence.setActivity(data, !video.paused);
} else if (location.pathname.startsWith('/search')) {
  data.details = `Searching: ${document.querySelector('.heading').textContent.slice(18,-2)}`
  if (document.querySelectorAll('.content').length && document.querySelectorAll('.page-item').length - 3)
  data.state = `Results: ${document.querySelectorAll('.content').length * (document.querySelectorAll('.page-item').length - 3)} and More..`;
  else if (document.querySelectorAll('.content').length)
  data.state = `Results: ${document.querySelectorAll('.content').length}`;
  else data.state = `Results: Nothing`;
} else if (location.pathname.includes('/download')) {
  data.details = document.querySelector('.heading > a').textContent
  data.state = "Downloading Anime";
} else if (location.pathname.startsWith('/anime/')) {
  data.details = document.querySelector('.name').textContent.trim().slice(0,-5)
  data.state = "Viewing an Anime";
} else if (location.pathname.startsWith('/anime-list')) {
  data.details = "Browsing for Anime";
} else if (location.pathname.startsWith('/series-list')) {
  data.details = "Browsing for Series";
} else if (location.pathname.startsWith('/movie-list')) {
  data.details = "Browsing for Movie";
} else if (location.pathname.startsWith('/ova-list')) {
  data.details = "Browsing for Ova";
} else if (location.pathname.startsWith('/ona-list')) {
  data.details = "Browsing for Ona";
} else if (location.pathname.startsWith('/special-list')) {
  data.details = "Browsing for Special";
} else if (location.pathname.startsWith('/premium')) {
  data.details = "Discovering Premium";
} else if (location.pathname === "/blog") {
  data.details = "Discovering Blog";
} else if (location.pathname.startsWith("/post")) {
  data.details = document.querySelector('.post-title').textContent.trim()
  data.state = `Viewing ${document.querySelector('.publisher').textContent.trim()}'s Post`;
} else if (location.pathname.startsWith("/timeline")) {
  data.details = "Discovering Timeline";
} else if (location.pathname.startsWith("/user") && location.pathname.includes('/ratings')) {
  data.details = `Ratings List`
  data.state = `Viewing ${document.querySelector('.profile-usertitle-name').textContent.trim()}'s Profile`;
} else if (location.pathname.startsWith("/user") && location.pathname.includes('/watching')) {
  data.details = `Watching List`
  data.state = `Viewing ${document.querySelector('.profile-usertitle-name').textContent.trim()}'s Profile`;
} else if (location.pathname.startsWith("/user") && location.pathname.includes('/completed')) {
  data.details = `Completed List`
  data.state = `Viewing ${document.querySelector('.profile-usertitle-name').textContent.trim()}'s Profile`;
} else if (location.pathname.startsWith("/user") && location.pathname.includes('/on-hold')) {
  data.details = `On-Hold List`
  data.state = `Viewing ${document.querySelector('.profile-usertitle-name').textContent.trim()}'s Profile`;
} else if (location.pathname.startsWith("/user") && location.pathname.includes('/dropped')) {
  data.details = `Dropped List`
  data.state = `Viewing ${document.querySelector('.profile-usertitle-name').textContent.trim()}'s Profile`;
} else if (location.pathname.startsWith("/user") && location.pathname.includes('/plan-to-watch')) {
  data.details = `Planned List`
  data.state = `Viewing ${document.querySelector('.profile-usertitle-name').textContent.trim()}'s Profile`;
} else if (location.pathname.startsWith("/user")) {
  data.details = `Main Page`
  data.state = `Viewing ${document.querySelector('.profile-usertitle-name').textContent.trim()}'s Profile`;
} else if (location.pathname === "/") {
  data.details = "On Homepage";
  data.smallImageKey = "home";
  data.smallImageText = "On Homepage";
}
presence.setActivity(data);
});
