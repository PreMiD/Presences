const presence = new Presence({
  clientId: "842620457655730207"
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused",
  browsing: "presence.playback.browsing"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {largeImageKey: "logo"}
  const video: HTMLVideoElement = document.querySelector('body > div > div > div > div > div > video')

  const path = document.location.pathname
  
  var pegarNome = () => {
    if(path.startsWith('/filmes/') && !path.endsWith('documentarios')){
      const genero = document.querySelector('body > div > div > div > section > div > section > h1').textContent
      const generoRegEx = /\s[A-Za-záàâãéèêíïóôõöúçÁÀÂÃÉÈÍÏÓÔÕÖÚÇ-]{3,}/
      var regEx = new RegExp(generoRegEx)
      const generoNome = genero.match(regEx).shift()
      return generoNome
    }else if(path.includes('/filmes')){
      return undefined
    }
  }

  switch (true) {
    case path.endsWith("/mylist"):                 //LISTA
      presenceData.details = "Visualizando lista..."
    break

    case path.includes("/franquias"):             //FRANQUIAS
      presenceData.details = "Visualizando franquias..."
    break

    case path.includes("/franquia/"):
      const franquia = document.querySelector('body > div > div > div > section > div > h1').textContent
      presenceData.details = franquia
      presenceData.state = "Visualizando a franquia..."
    break

    case path.includes("/cinelists"):           //CINELISTS
      presenceData.details = "Visualizando cinelists..."
    break

    case path.includes("/cinelist/") || path.includes("/dc"):
      const cinelist = document.querySelector('body > div > div > div > section > div > h1').textContent
      presenceData.details = cinelist
      presenceData.state = "Visualizando cinelist..."
    break

    case path.endsWith("documentarios"):            //DOCUMENTÁRIOS
      presenceData.details = "Vendo documentários..."
    break

    case path.startsWith('/filmes/') && !path.endsWith('documentarios'):         //FILMES
      presenceData.details = "Vendo filmes por gênero:" + pegarNome()
    break

    case path.includes('/filmes'):
      presenceData.details = "Vendo filmes por gênero..."
    break

    case path.startsWith('/filme/'):
      const movie = document.querySelector('body > div > div > div > div > section > div > div > h1').textContent
      presenceData.details = movie
      presenceData.state = "Visualizando filme..."
      if(!!video){
          const filme = document.querySelector('body > div > div > div > div > section > div > div > h1').textContent
          let timestamps = presence.getTimestampsfromMedia(video);
          presenceData.details = filme
          presenceData.state = "Assistindo filme..."
          presenceData.smallImageKey = video.paused ? "pause" : "play"
          presenceData.smallImageText = video.paused ? (await strings).pause : (await strings).play
        if (!video.paused) {
            presenceData.startTimestamp = timestamps[0],
            presenceData.endTimestamp = timestamps[1]
        }
      }
    break

    case path.includes("/account"):             //CONTA
      presenceData.details = "Visualizando informações da conta..."
    break

    case path.includes("/programacao"):        //PROGRAMAÇÃO
      presenceData.details = "Visualizando programação..."
    break
  }

  if (!presenceData.details) presence.setActivity()
  else presence.setActivity(presenceData)
});

