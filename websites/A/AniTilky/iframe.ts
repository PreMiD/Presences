declare class iFrame {
	on(event: string, callback: (data?: unknown) => void): void;
	send(data: Record<string, unknown>): void;
}

const iframe = new iFrame();

iframe.on("UpdateData", async () => {
	const video = document.querySelector<HTMLVideoElement>("video");

	if (video) {
		iframe.send({
			paused: video.paused,
			duration: video.duration,
			currentTime: video.currentTime
		});
	}
}); 