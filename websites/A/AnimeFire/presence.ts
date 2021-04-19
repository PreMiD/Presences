const presence = new Presence({
  clientId: "761282760962605056"
});

let video: HTMLVideoElement, currentTime: number, duration: number, paused: boolean, played: number|any, timestamps: Array<number>;

function getTimestamps(videoTime: number, videoDuration: number): Array<number> {
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {

	const presenceData: PresenceData = {
		largeImageKey: "icon"
	};

	const path = document.location.pathname,
		browsingStamp = Math.floor(Date.now() / 1000);

	if(path === "/"){
		presenceData.details = "Página inícial";
		presenceData.smallImageKey = "home";
		presenceData.smallImageText = "Home"
		presenceData.startTimestamp = browsingStamp;
	} else if(path.startsWith("/pesquisar/")){
		presenceData.details = "Pesquisando por: ";
		presenceData.state = document.querySelector('.section2').textContent.split("Você pesquisou por: ")[1];
		presenceData.smallImageKey = "search";
		let docLength = document.querySelectorAll('.divCardUltimosEps').length;
		if((docLength ? docLength : 0) >= 2){
			presenceData.smallImageText = "Encontrei " + document.querySelectorAll('.divCardUltimosEps').length + " resultados";
		}else if((docLength ? docLength : 0) === 1){
			presenceData.smallImageText = "Encontrei " + document.querySelectorAll('.divCardUltimosEps').length + " resultado";
		}else{
			presenceData.smallImageText = "Encontrei nenhum resultado";
		}
		presenceData.startTimestamp = browsingStamp;
	} else if(path === "/em-lancamento"){
		presenceData.details = "Em lançamento";
		if(document.querySelector('.pagination > .firLasLi > .page-link')){
			let split = document.querySelector('.pagination > .firLasLi > .page-link').getAttribute("href").split("https://animefire.net/em-lancamento/");
			presenceData.state = "Total de páginas: " + split[1];
		}
		presenceData.startTimestamp = browsingStamp;
		presenceData.smallImageKey = "search";
	} else if(path.startsWith("/em-lancamento/")){
		presenceData.details = "Em lançamento";
		presenceData.state = "Página: " + path.split("/").pop().toUpperCase();
		presenceData.startTimestamp = browsingStamp;
		presenceData.smallImageKey = "search";
	} else if(path === "/top-animes"){
		presenceData.details = "Top Animes";
		let split = document.querySelector('.pagination > .firLasLi > .page-link').getAttribute("href").split("https://animefire.net/top-animes/");
		if(document.querySelector('.pagination > .firLasLi > .page-link')){
			presenceData.state = "Total de páginas: " + split[1];
		}
		presenceData.startTimestamp = browsingStamp;
		presenceData.smallImageKey = "search";
	} else if(path.startsWith("/top-animes/")){
		presenceData.details = "Top Animes";
		presenceData.state = "Página: " + path.split("/").pop().toUpperCase();
		presenceData.startTimestamp = browsingStamp;
		presenceData.smallImageKey = "search";
	} else if(path === "/lista-de-animes-legendados"){
		presenceData.details = "Animes Legendados";
		if(document.querySelector('.pagination > .firLasLi > .page-link')){
			let split = document.querySelector('.pagination > .firLasLi > .page-link').getAttribute("href").split("https://animefire.net/lista-de-animes-legendados/");
			presenceData.state = "Total de páginas: " + split[1];
		}
		presenceData.smallImageKey = "search";
		presenceData.startTimestamp = browsingStamp;
	} else if(path.startsWith("/lista-de-animes-legendados/")){
		presenceData.details = "Animes Legendados";
		presenceData.state = "Página: " + path.split("/").pop().toUpperCase();
		presenceData.startTimestamp = browsingStamp;
		presenceData.smallImageKey = "search";
	} else if(path === "/lista-de-animes-dublados"){
		presenceData.details = "Animes Dublados";
		if(document.querySelector('.pagination > .firLasLi > .page-link')){
			let split = document.querySelector('.pagination > .firLasLi > .page-link').getAttribute("href").split("https://animefire.net/lista-de-animes-dublados/");
			presenceData.state = "Total de páginas: " + split[1];
		}
		presenceData.smallImageKey = "search";
		presenceData.startTimestamp = browsingStamp;
	} else if(path.startsWith("/lista-de-animes-dublados/")){
		presenceData.details = "Animes Legendados";
		presenceData.state = "Página: " + path.split("/").pop().toUpperCase();
		presenceData.startTimestamp = browsingStamp;
		presenceData.smallImageKey = "search";
	} else if(path === "/lista-de-filmes-legendados"){
		presenceData.details = "Filmes Legendados";
		if(document.querySelector('.pagination > .firLasLi > .page-link')){
			let split = document.querySelector('.pagination > .firLasLi > .page-link').getAttribute("href").split("https://animefire.net/lista-de-filmes-legendados/");
			presenceData.state = "Total de páginas: " + split[1];
		}
		presenceData.smallImageKey = "search";
		presenceData.startTimestamp = browsingStamp;
	} else if(path.startsWith("/lista-de-filmes-legendados/")){
		presenceData.details = "Filmes Dublados";
		presenceData.state = "Página: " + path.split("/").pop().toUpperCase();
		presenceData.startTimestamp = browsingStamp;
		presenceData.smallImageKey = "search";
	} else if(path === "/lista-de-filmes-dublados"){
		presenceData.details = "Filmes Dublados";
		if(document.querySelector('.pagination > .firLasLi > .page-link')){
			let split = document.querySelector('.pagination > .firLasLi > .page-link').getAttribute("href").split("https://animefire.net/lista-de-filmes-dublados/");
			presenceData.state = "Total de páginas: " + split[1];
		}
		presenceData.smallImageKey = "search";
		presenceData.startTimestamp = browsingStamp;
	} else if(path.startsWith("/lista-de-filmes-dublados/")){
		presenceData.details = "Filmes Dublados";
		presenceData.state = "Página: " + path.split("/").pop().toUpperCase();
		presenceData.startTimestamp = browsingStamp;
		presenceData.smallImageKey = "search";
	} else if(path.startsWith("/genero/")){
		presenceData.details = "Gênero: " + document.querySelector('.section2').textContent;
		if(document.querySelector('.pagination > .firLasLi > .page-link')){
			let split = document.querySelector('.pagination > .firLasLi > .page-link').getAttribute("href").split("/").pop();
			presenceData.state = "Total de páginas: " + split;
		}
		presenceData.smallImageKey = "search";
		presenceData.startTimestamp = browsingStamp;
	} else if(path.startsWith("/temporada/")){
		presenceData.details = document.querySelector('.section2').textContent;
		if(document.querySelector('.pagination > .firLasLi > .page-link')){
			let split = document.querySelector('.pagination > .firLasLi > .page-link').getAttribute("href").split("/").pop();
			presenceData.state = "Total de páginas: " + split;
		}
		presenceData.smallImageKey = "search";
		presenceData.startTimestamp = browsingStamp;
	} else if(path === "/notificacoes"){
		presenceData.details = "Visualizando: ";
		presenceData.state = "Notificações";
		presenceData.startTimestamp = browsingStamp;
	} else if(path === "/regras"){
		presenceData.details = "Visualizando: ";
		presenceData.state = "Regras";
		presenceData.startTimestamp = browsingStamp;
	} else if(path.startsWith("/users/")){
		presenceData.details = "Visualizando perfil de: ";
		presenceData.state = document.getElementById('checkUserName').textContent;
		presenceData.startTimestamp = browsingStamp;
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = "ID: "+ path.split("/").pop();
	} else if(path === "/verify/index"){
		presenceData.details = "Fazendo login";
	} else if(path.startsWith("/feed")){
		presenceData.details = "Visualizando: ";
		presenceData.state = "Feed";
	} else if(path.startsWith("/historico")){
		presenceData.details = "Visualizando: ";
		presenceData.state = "Histórico";
	} else if(path.startsWith("/episodios-para-assistir-mais-tarde")){
		presenceData.details = "Visualizando: ";
		presenceData.state = "Episódios para depois";
	} else if(path.startsWith("/animes-para-assistir-mais-tarde")){
		presenceData.details = "Visualizando: ";
		presenceData.state = "Episódios para depois";
	} else if(path.startsWith("/assistido")){
		presenceData.details = "Visualizando: ";
		presenceData.state = "Assistidos";
	} else if(path.startsWith("/episodios-favoritos")){
		presenceData.details = "Visualizando: ";
		presenceData.state = "Favoritos";
	} else if(path.startsWith("/animes-favoritos")){
		presenceData.details = "Visualizando: ";
		presenceData.state = "Favoritos";
	} else if(path.startsWith("/seguindo")){
		presenceData.details = "Visualizando: ";
		presenceData.state = "Seguindo";
	} else if(path.startsWith("/animes")){
		if(document.querySelector('h1.quicksand400')){
			presenceData.details = document.querySelector('h1.quicksand400').textContent;
			if(document.querySelector('.div_video_list a:last-child').textContent.split(" ").pop() === "Filme"){
				presenceData.state = "Filme";
			}else{
				presenceData.state = "Total de episódios: " + document.querySelector('.div_video_list a:last-child').textContent.split(" ").pop();
			}
			presenceData.startTimestamp = browsingStamp;
		} else {
			let find = document.querySelector('h1.sectionVideoEpTitle');
			presenceData.details = find.textContent.split(" - ")[0];

			video = document.querySelector('video#my-video_html5_api');
			currentTime = video.currentTime;
			duration = video.duration;
			paused = video.paused;
			played = video.duration != 0;
			timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));

			if(played){
				!paused ? ((timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration)),
				(presenceData.startTimestamp = timestamps[0]),
				(presenceData.endTimestamp = timestamps[1]),
				(presenceData.smallImageKey = "play"),
				(presenceData.smallImageText = "Assistindo - " + find.textContent.split(" - ")[1]))) :
				((presenceData.smallImageKey = "pause"),
				(presenceData.smallImageText = "Pausado - " + find.textContent.split(" - ")[1]));
			}
			if(paused){
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	}else{
		presenceData.details = "Página inícial";
		presenceData.smallImageKey = "home";
		presenceData.smallImageText = "Home"
		presenceData.startTimestamp = browsingStamp;
	}

	presence.setActivity(presenceData);

});