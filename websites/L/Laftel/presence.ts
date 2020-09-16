var presence = new Presence({
  clientId: "755666356141293568"
})

var prev = ''

function getQuery() {
  var search = location.search.substring(1);
  var query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  return query
}

presence.on("UpdateData", async () => {
  console.log(presence.getActivity())
  var presenceData: PresenceData = {}

  if (window.location.pathname === '/') {
    presenceData.details = '메인'
  } else if (window.location.pathname.startsWith('/search')) {
    var query = getQuery()
    presenceData.details = '검색'
    presenceData.state = query.keyword
  }

  if (presenceData.details == null) {
    presence.setTrayTitle()
    presence.setActivity()
  } else {
    presence.setActivity(presenceData)
  }
});
