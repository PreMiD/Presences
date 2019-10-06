const presence: Presence = new Presence({
    clientId: "630236276829716483",
    mediaKeys: true
})

const strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing",
})

let series: string
let title: string

presence.on("UpdateData", async () => {
    let data: presenceData = {
        largeImageKey: "disneyplus-logo",
    }

    if (document.location.pathname.includes("/video")) {
        const video: HTMLVideoElement = document.querySelector(".btm-media-clients video")

        if (video && !isNaN(video.duration)) {
            const timestamps: number[] = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration))

            const yearField: HTMLDivElement = document.querySelector(".btm-media-overlays-container .year-field")
            series = yearField ? yearField.textContent : null

            const titleField: HTMLDivElement = document.querySelector(".btm-media-overlays-container .title-field")
            title = titleField ? titleField.textContent : null

            // movie: titleField = movie title, yearField = empty
            // series: titleField = episode, yearField = series title
            data.details = series ? series : title
            data.state = series ? title : "Movie"

            data.smallImageKey = video.paused ? "pause" : "play"
            data.smallImageText = video.paused ? (await strings).pause : (await strings).play
            data.startTimestamp = timestamps[0]
            data.endTimestamp = timestamps[1]
    
            if (video.paused) {
                delete data.startTimestamp
                delete data.endTimestamp
            }

            if (title)
                presence.setActivity(data, !video.paused)
        }
    } else {
        data.details = (await strings).browsing
        presence.setActivity(data)
    }
})


function getTimestamps(videoTime: number, videoDuration: number) {
    const startTime: number = Date.now()
    const endTime: number = Math.floor(startTime / 1000) - videoTime + videoDuration
    return [Math.floor(startTime / 1000), endTime]
}