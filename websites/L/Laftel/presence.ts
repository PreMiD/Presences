var presence = new Presence({
  clientId: "755666356141293568"
})

var prev = ''

type Detail = {
  name?: string
}

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var last: Detail = {}

type Episode = {
  title?: string
  subject?: string
}

var lastEpisode: Episode = {}

function getQuery() {
  var search = location.search.substring(1);
  var query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  return query
}

presence.on("UpdateData", async () => {
  var presenceData: PresenceData = {}

  if (window.location.pathname === '/') {
    presenceData.details = '메인'
  } else if (window.location.pathname.startsWith('/search')) {
    var query = getQuery()
    presenceData.details = '검색'
    presenceData.state = query.keyword
  } else if (window.location.pathname.match(/^\/item\/\d/)) {
    if (prev === window.location.pathname && last.name) {
      presenceData.details = last.name
    } else {
      prev = window.location.pathname
      last = await (await fetch(`https://laftel.net/api/v1.0/items/${window.location.pathname.split('/')[2]}/detail/`, {
        headers: {
          laftel: 'TeJava'
        }
      })).json()
      presenceData.details = last.name
    }
  } else if (location.pathname.match(/\/player\/\d*\/\d/)) {
    var video : HTMLVideoElement = document.querySelector('video')
    if (video !== null && !isNaN(video.duration)) {
      if (prev !== window.location.pathname) {
        prev = window.location.pathname
        lastEpisode = await (await fetch(`https://laftel.net/api/episodes/v1/${window.location.pathname.split('/')[3]}`, {
          headers: {
            laftel: 'TeJava'
          }
        })).json()
      }

      presenceData.details = `${lastEpisode.title} - ${lastEpisode.subject}`

      if (!!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)) {
        var timestamps = getTimestamps(
          Math.floor(video.currentTime),
          Math.floor(video.duration)
        )
  
        presenceData.startTimestamp = timestamps[0]
        presenceData.endTimestamp = timestamps[1]
      } else {
        presenceData.startTimestamp = null
        presenceData.endTimestamp = null
        presenceData.state = '일시 정지됨'
      }
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle()
    presence.setActivity()
  } else {
    presence.setActivity(presenceData)
  }
});
