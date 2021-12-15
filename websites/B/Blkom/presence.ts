const presence = new Presence({
  clientId: "769568486263095327"
});

let video = {
  duration: 0,
  currentTime: 0,
  paused: true
};

presence.on(
  "iFrameData",
  (data: { duration: number; currentTime: number; paused: boolean }) => {
    video = data;
  }
);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

  if (location.pathname.startsWith("/watch")) {
    const [startTimestamp, endTimestamp] = presence.getTimestamps(
      Math.floor(video.currentTime),
      Math.floor(video.duration)
    );

    data.details = document.querySelector(".anime-name").textContent.trim();

    data.state = `Episode: ${
      document.querySelector(".episode-number").lastChild.textContent
    }`;

    data.smallImageKey = video.paused ? "pause" : "play";
    data.smallImageText = video.paused ? "Paused" : "Played";
    data.startTimestamp = startTimestamp;
    data.endTimestamp = endTimestamp;
    if (video.paused) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data, !video.paused);
  } else if (location.pathname.startsWith("/search")) {
    data.smallImageKey = "searching";
    data.smallImageText = "Searching";
    data.details = `Searching: ${document
      .querySelector(".heading")
      .textContent.slice(18, -2)}`;
    if (
      document.querySelectorAll(".content").length &&
      document.querySelectorAll(".page-item").length
    ) {
      data.state = `Results: ${
        document.querySelectorAll(".content").length *
        (document.querySelectorAll(".page-item").length - 3)
      } and More..`;
    } else if (document.querySelectorAll(".content").length)
      data.state = `Results: ${document.querySelectorAll(".content").length}`;
    else data.state = "Results: Nothing";
    presence.setActivity(data);
  } else if (location.pathname.includes("/download")) {
    data.smallImageKey = "download";
    data.smallImageText = "Downloading";
    data.details = document.querySelector(".heading > a").textContent;
    data.state = "Downloading Anime";
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/anime/")) {
    data.smallImageKey = "location";
    data.smallImageText = "Viewing";
    data.details = document
      .querySelector(".name")
      .textContent.trim()
      .slice(0, -5);
    data.state = "Viewing an Anime";
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/anime-list")) {
    data.smallImageKey = "discovery";
    data.smallImageText = "Browsing";
    data.details = "Browsing for Anime";
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/series-list")) {
    data.smallImageKey = "discovery";
    data.smallImageText = "Browsing";
    data.details = "Browsing for Series";
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/movie-list")) {
    data.smallImageKey = "discovery";
    data.smallImageText = "Browsing";
    data.details = "Browsing for Movie";
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/ova-list")) {
    data.smallImageKey = "discovery";
    data.smallImageText = "Browsing";
    data.details = "Browsing for Ova";
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/ona-list")) {
    data.smallImageKey = "discovery";
    data.smallImageText = "Browsing";
    data.details = "Browsing for Ona";
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/special-list")) {
    data.smallImageKey = "discovery";
    data.smallImageText = "Browsing";
    data.details = "Browsing for Special";
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/premium")) {
    data.smallImageKey = "discovery";
    data.smallImageText = "Discovering";
    data.details = "Discovering Premium";
    presence.setActivity(data);
  } else if (location.pathname === "/blog") {
    data.smallImageKey = "discovery";
    data.smallImageText = "Discovering";
    data.details = "Discovering Blog";
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/post")) {
    data.smallImageKey = "blog";
    data.smallImageText = "Reading";
    data.details = document.querySelector(".post-title").textContent.trim();
    data.state = `Viewing ${document
      .querySelector(".publisher")
      .textContent.trim()}'s Post`;
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/timeline")) {
    data.smallImageKey = "discovery";
    data.smallImageText = "Discovering";
    data.details = "Discovering Timeline";
    presence.setActivity(data);
  } else if (
    location.pathname.startsWith("/user") &&
    location.pathname.includes("/ratings")
  ) {
    data.smallImageKey = "profile";
    data.smallImageText = "Viewing";
    data.details = "Ratings List";
    data.state = `Viewing ${document
      .querySelector(".profile-usertitle-name")
      .textContent.trim()}'s Profile`;
    presence.setActivity(data);
  } else if (
    location.pathname.startsWith("/user") &&
    location.pathname.includes("/watching")
  ) {
    data.smallImageKey = "profile";
    data.smallImageText = "Viewing";
    data.details = "Watching List";
    data.state = `Viewing ${document
      .querySelector(".profile-usertitle-name")
      .textContent.trim()}'s Profile`;
    presence.setActivity(data);
  } else if (
    location.pathname.startsWith("/user") &&
    location.pathname.includes("/completed")
  ) {
    data.smallImageKey = "profile";
    data.smallImageText = "Viewing";
    data.details = "Completed List";
    data.state = `Viewing ${document
      .querySelector(".profile-usertitle-name")
      .textContent.trim()}'s Profile`;
    presence.setActivity(data);
  } else if (
    location.pathname.startsWith("/user") &&
    location.pathname.includes("/on-hold")
  ) {
    data.smallImageKey = "profile";
    data.smallImageText = "Viewing";
    data.details = "On-Hold List";
    data.state = `Viewing ${document
      .querySelector(".profile-usertitle-name")
      .textContent.trim()}'s Profile`;
    presence.setActivity(data);
  } else if (
    location.pathname.startsWith("/user") &&
    location.pathname.includes("/dropped")
  ) {
    data.smallImageKey = "profile";
    data.smallImageText = "Viewing";
    data.details = "Dropped List";
    data.state = `Viewing ${document
      .querySelector(".profile-usertitle-name")
      .textContent.trim()}'s Profile`;
    presence.setActivity(data);
  } else if (
    location.pathname.startsWith("/user") &&
    location.pathname.includes("/plan-to-watch")
  ) {
    data.smallImageKey = "profile";
    data.smallImageText = "Viewing";
    data.details = "Planned List";
    data.state = `Viewing ${document
      .querySelector(".profile-usertitle-name")
      .textContent.trim()}'s Profile`;
    presence.setActivity(data);
  } else if (location.pathname.startsWith("/user")) {
    data.smallImageKey = "profile";
    data.smallImageText = "Viewing";
    data.details = "Main Page";
    data.state = `Viewing ${document
      .querySelector(".profile-usertitle-name")
      .textContent.trim()}'s Profile`;
    presence.setActivity(data);
  } else if (location.pathname === "/") {
    data.details = "On Homepage";
    presence.setActivity(data);
  }
});
