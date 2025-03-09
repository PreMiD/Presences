import { ActivityType, Assets, getTimestamps} from 'premid';

const presence = new Presence({
  clientId: '1348239315767132160',
});

const browsingTimestamp = Math.floor(Date.now() / 1000);

let strings: Awaited<ReturnType<typeof getStrings>>;
let oldLang: string | null = null;

async function getStrings() {
  return presence.getStrings(
    {
      pause: 'Tạm Dừng',
      play: 'Đang Phát',
    },
    await presence.getSetting<string>('lang').catch(() => 'en'),
  );
}

enum ActivityAssets {
  Logo = 'https://i.imgur.com/GXPcBZj.png',
}

async function updatePresence() {
  const playback = !!document.querySelector('#title') ||
    (document.querySelectorAll('video').length &&
      document.querySelectorAll('video')[0]?.className !== 'previewVideo');
  const { pathname } = document.location;
  const [newLang] = await Promise.all([
    presence.getSetting<string>('lang').catch(() => 'en'),
    presence.getSetting<boolean>('buttons'),
  ]);
  const splitPath = pathname.split('/');
  const presenceData: PresenceData = {
    type: ActivityType.Watching,
    largeImageKey: ActivityAssets.Logo,
    startTimestamp: browsingTimestamp,
  };

  if (oldLang !== newLang || !strings) {
    oldLang = newLang;
    strings = await getStrings();
  }

  if (!playback) {
    switch (splitPath[1]) {
      case 'danh-sach':{
        presenceData.details = 'Đang xem danh sách phim';
        break;
      }
      case 'lich-chieu-phim': {
        presenceData.details = 'Đang xem lịch chiếu phim';
        break;
      }
      case 'bang-xep-hang': {
        presenceData.details = 'Đang xem bảng xếp hạng';
        break;
      }
      default: {
        presenceData.details = 'Đang ở trang chủ';
        break;
      }
    }
  } else {
    if (splitPath[1] === 'phim') {
      const titleElement = document.querySelector(
        'h1.line-clamp-2.text-weight-medium',
      ) as HTMLHeadingElement;
      const currentURL = window.location.pathname;
      const episodeElements = document.querySelectorAll('.q-btn-item');

      const episodes = Array.from(episodeElements)
        .map((ep) => {
          const href = ep.getAttribute('href');
          const numMatch = (ep as HTMLElement).innerText
            .trim()
            .match(/\d+/);
          return href && numMatch ? { num: parseInt(numMatch[0]), url: href } : null;
        })
        .filter((ep) => ep)
        .sort((a, b) => (a?.num ?? 0) - (b?.num ?? 0));

      let animeEpisode: number | null = null;
      const currentEpisode = episodes.find(
        (ep) => ep && currentURL.includes(ep.url),
      );

      if (currentEpisode) {
        animeEpisode = currentEpisode.num;
      }

      const video = document.querySelector('video');

      if (video) {
        presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
        presenceData.smallImageText = video.paused ? strings.pause : strings.play;

        if (!isNaN(video.currentTime) && !isNaN(video.duration) && video.duration > 0) {
          const [startTimestamp, endTimestamp] = getTimestamps(
            video.currentTime,
            video.duration,
          );

          presenceData.startTimestamp = startTimestamp;

          if (!video.paused) {
            presenceData.endTimestamp = endTimestamp;
          } else {
            delete presenceData.endTimestamp; // Xóa timestamp khi pause
          }
        }
      }

      const animeTitle = titleElement?.innerText || '...';
      presenceData.details = animeTitle;
      presenceData.state = `Tập: ${animeEpisode ?? 1}`;
      presenceData.largeImageKey = video?.poster || ActivityAssets.Logo;

    }
  }
  presence.setActivity(presenceData);
}

// Lắng nghe sự kiện từ video để cập nhật nhanh hơn
function listenVideoEvents() {
  const video = document.querySelector('video');

  if (video) {
    video.addEventListener('timeupdate', updatePresence);
    video.addEventListener('pause', updatePresence);
    video.addEventListener('play', updatePresence);
  }
}

// Chạy cập nhật mỗi giây để đảm bảo không bị delay
setInterval(updatePresence, 1000);

// Lắng nghe sự kiện cập nhật dữ liệu
presence.on('UpdateData', updatePresence);

// Gọi khi trang web load xong
window.addEventListener('load', () => {
  updatePresence();
  listenVideoEvents();
});