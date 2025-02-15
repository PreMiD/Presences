const presence = new Presence({
  clientId: '1338891034310213683',
})
const enum Assets {
  Logo = 'https://81dojo.com/images/81DojoLogo_Big.png',
}

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: Assets.Logo,
  }
  switch (document.location.hostname) {
    case '81dojo.com':
      if (document.location.pathname === '/')
        presenceData.details = 'Viewing home page'
      // todo: statuses for more pages
      else if (document.location.pathname.includes('/client/')) {
        if (Number.parseFloat(document.getElementById('layerLogin').style.zIndex) === 2)
          presenceData.details = 'Logging in to client'
        else {
          const server = document.getElementById('header-serverName').textContent.slice(0, -3)
          const username = document.getElementById('header-playerName').textContent.slice(0, -3)
          if (document.getElementById('layerLobby').style.display === 'block') {
            presenceData.details = `In ${server} lobby`
          }
          else {
            const playerElements = document.querySelectorAll(
              "[id='player-info-name']"
            )
            let playerElementIndex = 0
            const players = []
            const ratings = []
            for (let i = 0; i < playerElements.length; i++) {
              players.push(playerElements[i].innerHTML)
              ratings.push(
                playerElements[i].parentElement.children
                  .item(4)
                  .innerHTML.slice(3, 7)
              )
            }
            if (players.includes(username)) {
              for (let i = 0; i < playerElements.length; i++) {
                if (playerElements[i].innerHTML === username)
                  playerElementIndex = i
              }
              const opponentName = players[1 - players.indexOf(username)]
              const opponentRate = playerElements[1 - playerElementIndex].parentNode.children.item(4).innerHTML.slice(3, 7)
              if (playerElements[0].classList.contains('name-winner')){
                presenceData.details = 'In post-game analysis'
              }
              else {
                presenceData.details = 'In a game'
              }
              presenceData.state =
                `vs. ${opponentName} (${opponentRate})`
            }
            else {
              presenceData.details = 'Spectating'
              presenceData.state = `${players[0]} (${ratings[0]}) vs. ${players[1]} (${ratings[1]})`
            }
          }
        }
      }
      else if (document.location.pathname.includes('/documents'))
        presenceData.details = `Reading the docs: ${document.getElementById('firstHeading').textContent}`
      else if (
        document.location.pathname.includes('/ja')
        || document.location.pathname.includes('/en')
        || document.location.pathname.includes('/cn')
      ) {
        if (document.location.pathname.includes('/ja'))
          presenceData.details = 'On Japanese homepage'
        else if (document.location.pathname.includes('/en'))
          presenceData.details = 'On English homepage'
        else if (document.location.pathname.includes('/cn'))
          presenceData.details = 'On Chinese homepage'
      }
      break
    case 'system.81dojo.com':
      if (document.location.pathname === '/'){
        presenceData.details = 'Viewing WebSystem'
      }
      else if (document.location.pathname.includes('/ranking')) {
        presenceData.details = 'WebSystem: Viewing rankings'
      }
      else if (document.location.pathname.includes('/tournaments')) {
        if (Number.isInteger(Number.parseInt(document.location.pathname.substr(-1)))) {
          presenceData.details = `WebSystem: Viewing tournament:  + ${document.getElementById('main').children[2].innerHTML}`
        }
        else {
          presenceData.details = 'WebSystem: Browsing tournaments'
        }
      }
      else if (document.location.pathname.includes('/titles')) {
        if (Number.isInteger(Number.parseInt(document.location.pathname.substr(-1)))) {
          presenceData.details = `WebSystem: Viewing title: ${document.getElementById('main').children[1].children[0].innerHTML}`
        }
        else {
          presenceData.details = 'WebSystem: Browsing titles'
        }
      }
      else if (document.location.pathname.includes('/circles')) {
        if (Number.isInteger(Number.parseInt(document.location.pathname.substr(-1)))) {
          presenceData.details = `WebSystem: Viewing club: ${document.getElementById('main').children[2].children[0].innerHTML}`
        }
        else {
          presenceData.details = 'WebSystem: Browsing clubs'
        }
      }
      else if (document.location.pathname.includes('/players/search'))
        presenceData.details = 'WebSystem: Searching for a player'
      else if (document.location.pathname.includes('/kifus/search')) {
        presenceData.details = 'WebSystem: Searching for a kifu'
      }
      else if (document.location.pathname.includes('/players/show')) {
        presenceData.details = `WebSystem: Viewing player: ${document.getElementById('main').children[0].children[0].innerHTML}`
      }
      else if (document.location.pathname.includes('/players/edit')) {
        presenceData.details = 'WebSystem: Editing player info'
      }
      else if (document.location.pathname.includes('/players/upload_avatar')){
        presenceData.details = 'WebSystem: Choosing avatar'
      }
      else if (document.location.pathname.includes('/players/favorites')){
        presenceData.details = 'WebSystem: Viewing favorited players'
      }
      else if (document.location.pathname.includes('/inquiries')) {
        presenceData.details = 'WebSystem: Viewing inquiries'
      }
      else if (document.location.pathname.includes('/inbox')) {
        presenceData.details = 'WebSystem: Reading DMs'
      }
      else if (document.location.pathname.includes('/mileage_transfers')) {
        presenceData.details = 'WebSystem: Transferring DMiles'
      }
      else if (document.location.pathname.includes('/certificate')) {
        presenceData.details = 'WebSystem: Applying for certificate'
      }
      break
    case 'wsl.81dojo.com':
      if (document.location.pathname === '/index.php') {
        switch (new URL(document.URL).searchParams.get('mid')) {
          case '0':
            presenceData.details = 'WSL: Viewing homepage'
            break
          case '1':
            presenceData.details = `WSL: Viewing tables for ${document.getElementsByTagName('td')[0].children[0].innerHTML}`
            break
          case '2':
            presenceData.details = `WSL: Viewing team: ${document.getElementById('content').children.item(2).innerHTML}`
            break
          case '4':
            presenceData.details = 'WSL: Reading the rules'
        }
      }
  }
  presence.setActivity(presenceData)
})
