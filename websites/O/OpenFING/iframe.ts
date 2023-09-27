const iframe = new iFrame();
iframe.on("UpdateData", async () => {
	if(document.querySelector("video") != null){
  	let time = Math.floor(document.querySelector("video").currentTime);
  	iframe.send(time);
	}
});