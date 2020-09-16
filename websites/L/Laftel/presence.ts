var presence = new Presence({
  clientId: "755666356141293568"
})

var prev = ''

presence.on("UpdateData", async () => {
  console.log(presence.getActivity())
  var search = location.search.substring(1);
  var query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  var presenceData: PresenceData = {}

  if (window.location.pathname === '/') {
    presenceData.details = '메인'
  } else if (window.location.pathname.startsWith('/search')) {
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
