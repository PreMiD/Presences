// Note: Domain not restricted because cytube allows custom urls and a boatload of supported services

var iframe = new iFrame();

let sendback;

iframe.on("UpdateData", () => {
	const link = document.location;

	if (document.getElementsByTagName("video").length != 0) {
		let video: HTMLVideoElement = document.getElementsByTagName("video")[0];
		sendback = {
			audio: false,
			current_time: video.currentTime,
			duration: video.duration,
			paused: video.paused,
			site: link.href
		};
	}
	send();
});
function send() {
	iframe.send(sendback);
}

/*if (document.getElementsByTagName('video')[0]) {
} else if (document.getElementsByTagName('audio')[0]) {
    let audio: HTMLAudioElement = document.getElementsByTagName('audio')[0];
    audio.ondurationchange = () => {
        iframe.send({
            audio: true,
            current_time: audio.currentTime,
            duration: audio.duration,
            paused: audio.paused,
            site: link
        })
    }

    audio.ontimeupdate = () => {
        iframe.send({
            audio: true,
            current_time: audio.currentTime,
            duration: audio.duration,
            paused: audio.paused,
            site: link
        })
    }
}*/
