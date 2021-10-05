const presence = new Presence({
    clientId: "699204548664885279"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "chess"
  };

  if (document.location.pathname === "/home") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname.includes("/messages")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing messages";
  } else if (document.location.pathname.includes("/stats")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing statistics";
    presenceData.smallImageKey = "statistics";
    presenceData.smallImageText = "Statistics";
  } else if (document.location.pathname.includes("/games/archive")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing games archive";
    presenceData.smallImageKey = "gamesarchive";
    presenceData.smallImageText = "Games archive";
  } else if (document.location.pathname.includes("/live")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Live Chess";
    presenceData.smallImageKey = "live";
    presenceData.smallImageText = "Live";
  } else if (document.location.pathname.indexOf("/daily/") === 0) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Daily Chess";
    presenceData.smallImageKey = "daily";
    presenceData.smallImageText = "Daily";
  } else if (document.location.pathname === "/daily") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Daily Chess";
    presenceData.smallImageKey = "daily";
    presenceData.smallImageText = "Daily";
  } else if (document.location.pathname.includes("/play/computer")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing against computer";
    presenceData.smallImageKey = "computer";
    presenceData.smallImageText = "Computer";
  } else if (document.location.pathname.includes("/tournaments")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing tournaments";
  } else if (document.location.pathname.includes("/4-player-chess")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing 4 Player Chess";
    presenceData.smallImageKey = "4pc";
    presenceData.smallImageText = "4 Player Chess";
  } else if (document.location.pathname === "/variants") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through Chess Variants";
    presenceData.smallImageKey = "variants";
    presenceData.smallImageText = "Variants";
  } else if (
    document.location.pathname.indexOf("/variants/fog-of-war/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Fog of War";
    presenceData.smallImageKey = "fog";
    presenceData.smallImageText = "Fog of War";
  } else if (
    document.location.pathname.indexOf("/variants/horde/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Horde";
    presenceData.smallImageKey = "horde";
    presenceData.smallImageText = "Horde";
  } else if (
    document.location.pathname.indexOf("/variants/king-of-the-hill/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing King of the Hill";
    presenceData.smallImageKey = "koth";
    presenceData.smallImageText = "King of the Hill";
  } else if (
    document.location.pathname.indexOf("/variants/torpedo/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Torpedo";
    presenceData.smallImageKey = "torpedo";
    presenceData.smallImageText = "Torpedo";
  } else if (
    document.location.pathname.indexOf("/variants/3-check/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing 3 Check";
    presenceData.smallImageKey = "3+check";
    presenceData.smallImageText = "3 Check";
  } else if (
    document.location.pathname.indexOf("/variants/giveaway/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Giveaway";
    presenceData.smallImageKey = "giveaway";
    presenceData.smallImageText = "Giveaway";
  } else if (
    document.location.pathname.indexOf("/variants/sideway-pawns/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Sideway Pawns";
    presenceData.smallImageKey = "sideways";
    presenceData.smallImageText = "Sideways Pawns";
  } else if (
    document.location.pathname.indexOf("/variants/chaturanga/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Chaturanga";
    presenceData.smallImageKey = "chaturanga";
    presenceData.smallImageText = "Chaturanga";
  } else if (
    document.location.pathname.indexOf("/variants/blindfold/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Blindfold";
    presenceData.smallImageKey = "blindfold";
    presenceData.smallImageText = "Blindfold";
  } else if (
    document.location.pathname.indexOf("/variants/no-castling/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing No Castling";
    presenceData.smallImageKey = "nocastle";
    presenceData.smallImageText = "No Castling";
  } else if (
    document.location.pathname.indexOf("/variants/capture-anything/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Capture Anything";
    presenceData.smallImageKey = "anything";
    presenceData.smallImageText = "Capture Anything";
  } else if (
    document.location.pathname.indexOf("/variants/atomic/game/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Atomic";
    presenceData.smallImageKey = "atomic";
    presenceData.smallImageText = "Atomic";
  } else if (document.location.pathname.includes("/automate")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Automate chess";
    presenceData.smallImageKey = "automate";
    presenceData.smallImageText = "Automate";
  } else if (document.location.pathname === "/puzzles/rated") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Solving puzzles";
    presenceData.smallImageKey = "puzzle";
    presenceData.smallImageText = "Puzzles";
  } else if (document.location.pathname === "/puzzles/rush") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Puzzle Rush";
    presenceData.smallImageKey = "puzzlerush";
    presenceData.smallImageText = "Puzzle Rush";
  } else if (document.location.pathname === "/puzzles/battle") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Puzzle Battle";
    presenceData.smallImageKey = "puzzlewar";
    presenceData.smallImageText = "Puzzle Battle";
  } else if (
    document.location.pathname.indexOf("/forum/view/daily-puzzles/") === 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Solving Daily Puzzle";
    presenceData.smallImageKey = "puzzleoftheday";
    presenceData.smallImageText = "Daily Puzzle";
  } else if (document.location.pathname.includes("/solo-chess")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Solo Chess";
    presenceData.smallImageKey = "solochess";
    presenceData.smallImageText = "Solo Chess";
  } else if (document.location.pathname.includes("/drills")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing drills";
    presenceData.smallImageKey = "drills";
    presenceData.smallImageText = "Drills";
  } else if (document.location.pathname.includes("/lessons")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing lessons";
    presenceData.smallImageKey = "lessons";
    presenceData.smallImageText = "Lessons";
  } else if (document.location.pathname.includes("/analysis")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Analyzing a game";
    presenceData.smallImageKey = "analysis";
    presenceData.smallImageText = "Analysis";
  } else if (document.location.pathname.indexOf("/article/view") === 0) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading an article";
    presenceData.smallImageKey = "articles";
    presenceData.smallImageText = "Article";
    presenceData.state = document.title;
  } else if (document.location.pathname === "/articles") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through articles";
    presenceData.smallImageKey = "articles";
    presenceData.smallImageText = "Articles";
  } else if (document.location.pathname === "/videos") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through videos";
  } else if (document.location.pathname.includes("/vision")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Training vision";
    presenceData.smallImageKey = "vision";
    presenceData.smallImageText = "Vision";
  } else if (document.location.pathname.includes("/openings")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing openings";
    presenceData.smallImageKey = "openings";
    presenceData.smallImageText = "Openings";
  } else if (document.location.pathname.includes("/explorer")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Using games explorer";
    presenceData.smallImageKey = "explorer";
    presenceData.smallImageText = "Games explorer";
  } else if (document.location.pathname.includes("/forum")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through forum";
    presenceData.smallImageKey = "forum";
    presenceData.smallImageText = "Forum";
  } else if (document.location.pathname.includes("/clubs")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through clubs";
    presenceData.smallImageKey = "clubs";
    presenceData.smallImageText = "Clubs";
  } else if (document.location.pathname === "/blogs") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through blogs";
    presenceData.smallImageKey = "blog";
    presenceData.smallImageText = "Blog";
  } else if (document.location.pathname.indexOf("/blog/") === 0) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading a blog post";
    presenceData.smallImageKey = "blog";
    presenceData.smallImageText = "Blog post";
    presenceData.state = document.title;
  } else if (document.location.pathname.includes("/members")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through members";
    presenceData.smallImageKey = "members";
    presenceData.smallImageText = "Members";
  } else if (document.location.pathname.includes("/coaches")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through coaches";
    presenceData.smallImageKey = "coaches";
    presenceData.smallImageText = "Coaches";
  } else if (document.location.pathname.includes("/today")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Chess Today";
    presenceData.smallImageKey = "chesstoday";
    presenceData.smallImageText = "Chess Today";
  } else if (document.location.pathname.indexOf("/news/view/") === 0) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading news";
    presenceData.smallImageKey = "news";
    presenceData.smallImageText = "News";
    presenceData.state = document.title;
  } else if (document.location.pathname === "/news") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through news";
    presenceData.smallImageKey = "news";
    presenceData.smallImageText = "News";
  } else if (document.location.pathname.includes("/tv")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing ChessTV";
    presenceData.smallImageKey = "chesstv";
    presenceData.smallImageText = "ChessTV";
  } else if (document.location.pathname === "/games") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through master games";
    presenceData.smallImageKey = "mastergames";
    presenceData.smallImageText = "Master Games";
  } else if (document.location.pathname.indexOf("/games/view/") === 0) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Watching a master game";
    presenceData.smallImageKey = "mastergames";
    presenceData.smallImageText = "Master Games";
    presenceData.state = document.title.substring(
      0,
      document.title.indexOf(")") + 1
    );
  } else if (
    document.location.pathname.includes("/computer-chess-championship")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Watching Computer Chess Championship";
    presenceData.state = document.title.substring(
      0,
      document.title.indexOf("-")
    );
  } else if (document.location.pathname.indexOf("/video/player/") === 0) {
    const video: HTMLVideoElement = document.querySelector("video");

    if (video !== null && !isNaN(video.duration)) {
      [presenceData.startTimestamp, presenceData.endTimestamp] =
        presence.getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        );
      presenceData.largeImageKey = "chess";
      presenceData.details = "Watching video";
      presenceData.state = document.title;
      if (video.paused) {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await strings).pause;
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      } else {
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await strings).play;
      }
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
