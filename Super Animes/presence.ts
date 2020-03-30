var presence = new Presence({
		clientId: "551461273360007217",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	})

var lastPlaybackState = null
var playback
var browsingStamp = Math.floor(Date.now() / 1000)

if (lastPlaybackState != playback) {
	lastPlaybackState = playback
	browsingStamp = Math.floor(Date.now() / 1000)
}

var iFrameVideo, currentTime, duration, paused, tt, edd
presence.on("iFrameData", (iframe) => {
	//setInterval(function () {
	playback = iframe.iframe_video !== null ? true : false
	//}, 1000);
	console.log(iframe.iframe_video)
	if (playback) {
		iFrameVideo = iframe.iframe_video.iFrameVideo
		currentTime = iframe.iframe_video.currTime
		duration = iframe.iframe_video.dur
		paused = iframe.iframe_video.paused
		tt = Math.floor(iframe.iframe_video.currTime)
		edd = Math.floor(iframe.iframe_video.dur)
	}
})

presence.on("UpdateData", async () => {
		let data: presenceData = {
			largeImageKey: "sanime",
		}

		if (
			document.location.hostname == "www.superanimes.org" &&
			document.location.pathname.includes("/termos-de-uso")
		) {
			data.details = "Termos de uso"
			presence.setActivity(data)
		}
		var nome =
			document.querySelector("#geral #corpo .conteudoBox .boxBarraInfo") ||
			document.querySelector("#geral #corpo .conteudoBoxHome .boxBarraInfo")
		if (
			nome.innerText.includes("Episódio") ||
			nome.innerText.includes("ova") ||
			nome.innerText.includes("filme") ||
			nome.innerText.includes("Teste o vídeo por favor!")
		) {
			if (iFrameVideo !== null && !isNaN(duration)) {
				var videoTitle, episod, episode, epName
				videoTitle = document.querySelector(
					"#geral #corpo .conteudoBox .videoSidebar .capaCategory .box"
				)
				episod = document.querySelector(
					"#geral #corpo .conteudoBox .videoSidebar .boxMenuEps .menuEpsList.menuEpsListAtual h5"
				)

				var data = {
						largeImageKey: "sanime",
						smallImageKey: paused ? "pause" : "play",
						smallImageText: paused ? "Pausado" : "Assistindo",
						startTimestamp: getTimestamps(tt),
						endTimestamp: getTimestamps(edd),
					}
				presence.setTrayTitle(paused ? "" : videoTitle.innerText)
				data.details = videoTitle.innerText
				data.state = episod.innerText
				if (paused) {
					delete data.startTimestamp
					delete data.endTimestamp
				}
			}
			data.details = document.querySelector(
				"#geral #corpo .conteudoBox .videoSidebar .capaCategory .box"
			).innerText
			data.smallImageKey = paused ? "pause" : "play"
			data.smallImageText = paused ? "Pausado" : "Assistindo"
			if (nome.innerText.includes("filme")) {
				data.state = document.querySelector(
					"#geral #corpo .conteudoBox.js_videoBox .boxSubTitulo h2"
				).innerText
			} else {
				data.state = document.querySelector(
					"#corpo > div > div:nth-child(6) > div.videoSidebar > div.boxMenuEps > div:nth-child(1) > div.epsBoxSobre > a"
				).innerText
			}
			presence.setActivity(data)
		} else {
			if (document.location.pathname == "/") {
				data.smallImageKey = "homepage"
				data.smallImageText = "Inicio"
				data.state = "Página Inicial"
				presence.setActivity(data)
			} else if (document.location.pathname == "/lancamento") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Lançamentos"
				presence.setActivity(data)
			} else if (document.location.pathname == "/ultimos-adicionados") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Últimos Videos Postados"
				presence.setActivity(data)
			} else if (document.location.pathname == "/lista") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Lista de Conteúdo"
				presence.setActivity(data)
			} else if (document.location.pathname === "/regras") {
				data.details = "Regras do Site!"
				presence.setActivity(data)
			} else if (document.location.pathname === "/contato") {
				data.details = "Entre em contato com o"
				data.state = "Super Animes"
				presence.setActivity(data)
			} else if (document.location.pathname === "/indicacao") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Indicação"
				presence.setActivity(data)
			} else if (document.location.pathname === "/genero") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Lista de Gêneros"
				presence.setActivity(data)
			} else if (document.location.pathname === "/genero") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Lista de Gêneros"
				presence.setActivity(data)
			} else if (document.location.pathname === "/anime") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Lista de Animes"
				presence.setActivity(data)
			} else if (document.location.pathname === "/cartoon") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Lista de Cartoons"
				presence.setActivity(data)
			} else if (document.location.pathname === "/tokusatsu") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Lista de Tokusatsu"
				presence.setActivity(data)
			} else if (document.location.pathname === "/live-action") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Lista de Live Actions"
				presence.setActivity(data)
			} else if (document.location.pathname === "/china") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Lista de Conteúdo Chinês"
				presence.setActivity(data)
			} else if (document.location.pathname === "/ova") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Lista de Ovas"
				presence.setActivity(data)
			} else if (document.location.pathname === "/hunter") {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Hunter"
				data.state = "Hunter"
				presence.setActivity(data)
			} else if (document.location.pathname === "/help") {
				data.details = "Ajudando o Site"
				presence.setActivity(data)
			}
			// ------------- Começo Div Visualisando Anime/Cartoon/Tokusatsu/Live Action/China/Ova ------------- //
			let anNome = document.querySelector(
				"#geral #corpo .conteudoBox .boxBarraInfo h1"
			)
			if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/anime/")
			) {
				//let epi = document.querySelectorAll('#geral #corpo .conteudoBox .boxAnime .boxAnimeSobre > https://schema.org/TVSeason > .numberofEpisodes')
				data.details = "Visualizando Anime"
				data.state = anNome.innerText // + ' (' + epi.innerText + ')';
				data.smallImageText = "Visualizando"
				data.smallImageKey = "visualizando"
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/cartoon/")
			) {
				data.details = "Visualizando Cartoon"
				data.state = anNome.innerText // + ' (' + epi.innerText + ')';
				data.smallImageText = "Visualizando"
				data.smallImageKey = "visualizando"
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/tokusatsu/")
			) {
				data.details = "Visualizando Tokusatsu"
				data.state = anNome.innerText // + ' (' + epi.innerText + ')';
				data.smallImageText = "Visualizando"
				data.smallImageKey = "visualizando"
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/live-action/")
			) {
				data.details = "Visualizando Live Action"
				data.state = anNome.innerText // + ' (' + epi.innerText + ')';
				data.smallImageText = "Visualizando"
				data.smallImageKey = "visualizando"
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/china/")
			) {
				data.details = "Visualizando Anime Chinês"
				data.state = anNome.innerText // + ' (' + epi.innerText + ')';
				data.smallImageText = "Visualizando"
				data.smallImageKey = "visualizando"
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/ova/")
			) {
				data.details = "Visualizando Ova"
				data.state = anNome.innerText // + ' (' + epi.innerText + ')';
				data.smallImageText = "Visualizando"
				data.smallImageKey = "visualizando"
				presence.setActivity(data)
			}
			// ------------- Final Div Visualisando Anime/Cartoon/Tokusatsu/Live Action/China/Ova ------------- //
			// ------------- Começo Div Top Conteúdo ------------- //
			let cont =
				document.querySelector("#geral #corpo .conteudoBox .boxBarraInfo") ||
				document.querySelector("#geral #corpo .conteudoBoxHome .boxBarraInfo")
			if (cont.innerText.includes("Top 100 Conteúdo do Dia")) {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Top 100 Conteúdo do Dia"
				presence.setActivity(data)
			} else if (cont.innerText.includes("Top 100 Conteúdo da Semana")) {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Top 100 Conteúdo da Semana"
				presence.setActivity(data)
			} else if (cont.innerText.includes("Top 100 Conteúdo do Mês")) {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Top 100 Conteúdo do Mês"
				presence.setActivity(data)
			} else if (cont.innerText.includes("Top 100 Conteúdo do Ano")) {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Top 100 Conteúdo do Ano"
				presence.setActivity(data)
			} else if (cont.innerText.includes("Top 100 Mais Acessados")) {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Top 100 Mais Acessados"
				presence.setActivity(data)
			} else if (cont.innerText.includes("Top 100 Conteúdo Curtidos")) {
				data.smallImageKey = "search"
				data.smallImageText = "Procurando"
				data.details = "Procurando Animes..."
				data.state = "Top 100 Conteúdo Curtidos"
				presence.setActivity(data)
			}
			// ------------- Final Div Top Conteúdo ------------- //
			// ------------- Começo Div Top Usuários------------- //
			let rank = document.querySelector(
				"#geral #corpo .conteudoBox .postHomeVideoBox .menu_box_action p a"
			)
			if (nome.innerText.includes("Acessos")) {
				data.details = "Top User Rank de Acessos"
				if (rank) {
					data.state = "Seu rank é " + rank.innerText
					presence.setActivity(data)
				} else {
					delete data.state
					presence.setActivity(data)
				}
				presence.setActivity(data)
			} else if (nome.innerText.includes("Moedas")) {
				data.details = "Top User Rank de Moedas"
				if (rank) {
					data.state = "Seu rank é " + rank.innerText
					presence.setActivity(data)
				} else {
					delete data.state
					presence.setActivity(data)
				}
				presence.setActivity(data)
			} else if (nome.innerText.includes("Caça Hunter")) {
				data.details = "Top User Rank do Hunter"
				if (rank) {
					data.state = "Seu rank é " + rank.innerText
					presence.setActivity(data)
				} else {
					delete data.state
					presence.setActivity(data)
				}
				presence.setActivity(data)
			} else if (nome.innerText.includes("Top User Rank de Embeds")) {
				data.details = "Top User Rank de Embeds"
				if (rank) {
					data.state = "Seu rank é " + rank.innerText
					presence.setActivity(data)
				} else {
					delete data.state
					presence.setActivity(data)
				}
				presence.setActivity(data)
			}
			// ------------- Final Div Top ------------- //
			// ------------- Começo Div Perfil ------------- //
			let perfiName = document.querySelector(
					"#geral #corpo .header_main .perfil_header_photos .perfil_box_photo h1"
				),
				cnt =
					document.querySelector("#geral #corpo .conteudoBox .boxBarraInfo") ||
					document.querySelector(
						"#geral #corpo .conteudoBoxHome .boxBarraInfo"
					),
				ctn_Fav = cnt.innerText.replace("Lista de Favorito ", ""),
				ctn_Ass = cnt.innerText.replace("Lista de Assistido ", ""),
				ctn_AssDp = cnt.innerText.replace("Lista de Assistir Depois ", ""),
				ctn_Arqv = cnt.innerText.replace(
					"Lista de Arquivado / Abandonado ",
					""
				),
				ctn_Seg = cnt.innerText.replace("Lista de Seguindo ", ""),
				ctn_ass = cnt.innerText.replace("Lista de Seguindo ", ""),
				ctn_Paus = cnt.innerText.replace("Lista de Em Pausa ", ""),
				ctn_Hunt = cnt.innerText.replace("Lista de Presas Hunter ", ""),
				aaa_ =
					document.querySelector("#geral #corpo .conteudoBox .boxBarraInfo") ||
					document.querySelector(
						"#geral #corpo .conteudoBoxHome .boxBarraInfo"
					),
				bbb_ = document.querySelector(
					"#menu-link-perfil-sobre > ul:nth-child(2) > li:nth-child(3)"
				),
				ccc_ = document.querySelector("#corpo > div.conteudoBoxHome > h2"),
				ddd_2 = document.querySelector(
					"#corpo > div.conteudoBoxHome > div.friend_list > div > div.rows_list.embed-1062831115 > div.box.sendPlayer > b"
				)
			if (aaa_.innerText.includes("Sobre")) {
				data.details = "Perfil: " + perfiName.innerText
				data.smallImageKey = "perfil"
				data.smallImageText = bbb_.innerText

				if (
					document.querySelector(
						"#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull"
					) === null
				) {
					data.state = "Perfil sem descrição."
					presence.setActivity(data)
					delete data.startTimestamp
				} else {
					data.state = document.querySelector(
						"#menu-link-perfil-sobre > ul:nth-child(2) > li.sizeFull"
					).innerText
					presence.setActivity(data)
					delete data.startTimestamp
				}
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/favorito")
			) {
				data.details = "Lista de Favoritos" + " " + ctn_Fav
				data.smallImageKey = "perfil"
				data.smallImageText = "Perfil"
				data.state = perfiName.innerText
				presence.setActivity(data)
			} else if (document.URL.includes("mod=embed")) {
				data.details = "Moderador: " + perfiName.innerText
				data.state = "Filtrando Embeds"
				//data.startTimestamp = browsingStamp;
				presence.setActivity(data)
			} /*else if(ccc_.innerText.includes('Moderadores no site ')){
                data.details = 'Moderador: ' + perfiName.innerText;
                data.state = 'Log de Embed dos Mods';
                //data.startTimestamp = browsingStamp;
                presence.setActivity(data);  
        }*/ else if (
				document.URL.includes("mod=log-embed&id=")
			) {
				data.details = "Moderador: " + ddd_2.innerText
				data.state = "Log de Embed dos Mods"
				//data.startTimestamp = browsingStamp;
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/assistido")
			) {
				data.details = "Lista de Assistidos" + " " + ctn_Ass
				data.state = perfiName.innerText
				data.smallImageKey = "perfil"
				data.smallImageText = "Perfil"
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/assistir-depois")
			) {
				data.details = "Lista de Assistir Depois" + " " + ctn_AssDp
				data.state = perfiName.innerText
				data.smallImageKey = "perfil"
				data.smallImageText = "Perfil"
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/arquivado")
			) {
				data.details = "Lista de Arquivados" + " " + ctn_Arqv
				data.state = perfiName.innerText
				data.smallImageKey = "perfil"
				data.smallImageText = "Perfil"
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/seguindo")
			) {
				data.details = "Lista de Seguidos" + " " + ctn_Seg
				data.state = perfiName.innerText
				data.smallImageKey = "perfil"
				data.smallImageText = "Perfil"
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/assistindo")
			) {
				data.details = "Lista de Assistindo" + " " + ctn_ass
				data.state = perfiName.innerText
				data.smallImageKey = "perfil"
				data.smallImageText = "Perfil"
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/pausa")
			) {
				data.details = "Lista de Em Pausa" + " " + ctn_Paus
				data.state = perfiName.innerText
				data.smallImageKey = "perfil"
				data.smallImageText = "Perfil"
				presence.setActivity(data)
			} else if (aaa_.innerText.includes("Lista de Presas Hunter")) {
				data.details = "Hunter Capturados" + " " + ctn_Hunt
				data.state = perfiName.innerText
				data.smallImageKey = "perfil"
				data.smallImageText = "Perfil"
				presence.setActivity(data)
			} else if (
				document.location.hostname == "www.superanimes.org" &&
				document.location.pathname.includes("/amigos")
			) {
				data.details = ctn_Hunt
				data.state = perfiName.innerText
				data.smallImageKey = "perfil"
				data.smallImageText = "Perfil"
				presence.setActivity(data)
			}
			// ------------- Final Div Perfil ------------- //
		}
	})
)
async function getTimestamps(videoTime, videoDuration) {
	var startTime = Date.now()
	var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration
	return [Math.floor(startTime / 1000), endTime]
}
