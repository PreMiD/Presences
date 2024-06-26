const enum LargImages {
    Logo = "https://cdn.rcd.gg/PreMiD/websites/N/Netflix/assets/1.png",
    Noback = "https://cdn.rcd.gg/PreMiD/websites/N/Netflix/assets/2.png",
    Animated = "https://cdn.rcd.gg/PreMiD/websites/N/Netflix/assets/0.gif",
}

import {
    clearMetadata,
    fetchMetadata,
    metadata,
} from "./functions/fetchMetadata";
import { getBuildIdentifier } from "./functions/getBuildIdentifier";
import { ShowVideo } from "./types";

const presence = new Presence({
    clientId: "926541425682829352",
});

const getStrings = async () => {
    const lang = await presence.getSetting<string>("lang").catch(() => "en");
    return presence.getStrings(
        {
            play: "general.playing",
            pause: "general.paused",
            browse: "general.browsing",
            watchingMovie: "general.watchingMovie",
            watchingSeries: "general.watchingSeries",
            viewSeries: "general.buttonViewSeries",
            viewMovies: "general.buttonViewMovie",
            watchEpisode: "general.buttonViewEpisode",
            watchMovie: "general.buttonWatchMovie",
            seriesDisplayFull: "netflix.seriesDisplay.full",
            seriesDisplayShort: "netflix.seriesDisplay.short",
            movieDisplay: "netflix.movieDisplay",
        },
        lang
    );
};

let oldLang: string = null,
    strings: Awaited<ReturnType<typeof getStrings>>;

presence.on("UpdateData", async () => {
    try {
        const [
            lang,
            usePresenceName,
            showTimestamp,
            showBrowsingStatus,
            showSeries,
            showMovies,
            logoType,
            privacyMode,
        ] = await Promise.all([
            presence.getSetting<string>("lang").catch(() => "en"),
            presence.getSetting<boolean>("usePresenceName"),
            presence.getSetting<boolean>("timestamp"),
            presence.getSetting<boolean>("showBrowsingStatus"),
            presence.getSetting<boolean>("showSeries"),
            presence.getSetting<boolean>("showMovies"),
            presence.getSetting<number>("logoType"),
            presence.getSetting<boolean>("privacy"),
        ]);

        if (oldLang !== lang) {
            oldLang = lang;
            strings = await getStrings();
        }

        await getBuildIdentifier(presence);

        const path = document.location.href;
        const browsingMediaId = path.match(/\/title\/(\d+)/) || path.match(/jbv=(\d+)/);

        if (browsingMediaId) {
            if (privacyMode) return presence.clearActivity();

            await fetchMetadata(browsingMediaId[1]);

            return await presence.setActivity({
                details: metadata.data.video.title,
                state: metadata.data.video.synopsis.slice(0, 128),
                largeImageKey: metadata.data.video.boxart.at(0).url,
                smallImageKey: Assets.Reading,
                smallImageText: strings.browse,
                buttons: [
                    {
                        label:
                            metadata.data.video.type === "show"
                                ? strings.viewSeries
                                : strings.viewMovies,
                        url: document.location.href,
                    },
                ],
            });
        }

        const watchingMediaId = path.match(/\/watch\/(\d+)/);
        if (watchingMediaId) {
            await fetchMetadata(watchingMediaId[1]);
            const video = document.querySelector("video");

            if (!video) return;

            const { paused } = video;
            const [startTimestamp, endTimestamp] = presence.getTimestampsfromMedia(video);

            if (metadata.data.video.type === "show" && showSeries) {
                if (privacyMode) {
                    return await presence.setActivity({
                        type: ActivityType.Watching,
                        details: strings.watchingSeries,
                        largeImageKey: LargImages.Logo,
                    });
                }

                const videoData = metadata.data.video as ShowVideo;
                const season = metadata.data.video.seasons.find(s =>
                    s.episodes.map(e => e.episodeId).includes(videoData.currentEpisode)
                );
                const episode = season.episodes.find(
                    e => e.episodeId === videoData.currentEpisode
                );

                return await presence.setActivity({
                    type: ActivityType.Watching,
                    details: metadata.data.video.title,
                    state: strings.seriesDisplayShort
                        .replace("{0}", season.seq.toString())
                        .replace("{1}", episode.seq.toString())
                        .replace("{2}", episode.title),
                    largeImageKey: metadata.data.video.boxart.at(0).url,
                    smallImageKey: paused ? Assets.Pause : Assets.Play,
                    smallImageText: paused ? strings.pause : strings.play,
                    ...(showTimestamp && {
                        startTimestamp: paused ? null : startTimestamp,
                        endTimestamp: paused ? null : endTimestamp,
                    }),
                    ...(usePresenceName && {
                        name: metadata.data.video.title,
                        details: episode.title,
                        state: strings.seriesDisplayFull
                            .replace("{0}", season.seq.toString())
                            .replace("{1}", episode.seq.toString()),
                    }),
                    buttons: [
                        {
                            label: strings.watchEpisode,
                            url: document.location.href.split("?")[0],
                        },
                        {
                            label: strings.viewSeries,
                            url: `https://www.netflix.com/title/${metadata.data.video.id}`,
                        },
                    ],
                });
            }

            if (metadata.data.video.type === "movie" && showMovies) {
                if (privacyMode) {
                    return await presence.setActivity({
                        type: ActivityType.Watching,
                        details: strings.watchingMovie,
                        largeImageKey: LargImages.Logo,
                    });
                }

                return await presence.setActivity({
                    type: ActivityType.Watching,
                    details: metadata.data.video.title,
                    state: strings.movieDisplay
                        .replace("{0}", metadata.data.video.year.toString())
                        .replace(
                            "{1}",
                            Math.floor(metadata.data.video.runtime / 60).toString()
                        ),
                    largeImageKey: metadata.data.video.boxart.at(0).url,
                    smallImageKey: paused ? Assets.Pause : Assets.Play,
                    smallImageText: paused ? strings.pause : strings.play,
                    ...(showTimestamp && {
                        startTimestamp: paused ? null : startTimestamp,
                        endTimestamp: paused ? null : endTimestamp,
                    }),
                    ...(usePresenceName && {
                        name: metadata.data.video.title,
                    }),
                    buttons: [
                        {
                            label: strings.watchMovie,
                            url: document.location.href.split("?")[0],
                        },
                    ],
                });
            }

            return presence.clearActivity();
        }

        clearMetadata();

        if (showBrowsingStatus && !privacyMode) {
            return await presence.setActivity({
                details: strings.browse,
                largeImageKey:
                    [LargImages.Animated, LargImages.Logo, LargImages.Noback][logoType] ||
                    LargImages.Logo,
                smallImageKey: Assets.Reading,
                smallImageText: strings.browse,
            });
        }
        return presence.clearActivity();
    } catch (error) {
        console.error('Error during UpdateData:', error);
        presence.clearActivity();
    }
});
