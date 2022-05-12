// Presence ID
const presence = new Presence({
    clientId: "974010745157193779"
    });

// Variables for the API calls.    
    var songTitle = ""
    var songArtist = ""
    var dj = ""
    var djStatus = ""

// Current presenter fetching.
    function fetchDJ(): void {
        fetch('https://panel.soundright.ml/api/v1/slots/live', {
            headers: {
                "authorization": "Basic NWEwZWE2ZjUtNmE1NS00OTExLThkN2MtNTUyODY5Mzc3Y2NlOg=="
            }
        })
            .then((result) => result.json())
            .then((slot) => {
                djStatus = "presenter"
              dj = slot.user.username
            })
            .catch(() => {
                dj = "AutoDJ"
                djStatus = "auto"
            });
    }

    setInterval(fetchDJ, 5000);
    fetchDJ();

// Current song data fetching.
    function fetchSongs(): void {
        fetch('https://panel.soundright.ml/api/v1/song-history/now-playing', {
            headers: {
                "authorization": "Basic NWEwZWE2ZjUtNmE1NS00OTExLThkN2MtNTUyODY5Mzc3Y2NlOg=="
            }
        })
            .then((res) => res.json())
            .then((music) => {
                songTitle = music.song.title
                songArtist = music.song.artist
            });
    }

    setInterval(fetchSongs, 5000);
    fetchSongs();

// Elapsed time for website.
const elapsedTime = Math.floor(Date.now() / 1000);

 // Presence data.    
  presence.on("UpdateData", () => {
  
    const presenceData: PresenceData = {
      
      largeImageKey: "https://i.imgur.com/1Ff2FS8.jpeg",
      
      smallImageKey: djStatus,
      
      smallImageText: `Now Live: ${dj}`,

      details: `🎹 ➤ ${songTitle}`,
      
      state: `💃 ➤ ${songArtist}`,

      startTimestamp: elapsedTime,

      buttons: [
        {
                label: "Listen In",
                url: "https://soundright.ml"
            },
            {
                label: "Discord Server",
                url: "https://discord.soundright.ml"
            }
        ]
    };       
    if (presenceData.details) presence.setActivity(presenceData);
    else presence.setActivity();
  });

// Created by AliUK for SoundRight FM | For information, visit: https://discord.soundright.ml!
