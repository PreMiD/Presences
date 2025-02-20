import { Assets } from 'premid'

const presence = new Presence({
  clientId: '1070240473945489418',
})
const path = location.pathname
const browsingTimestamp = Math.floor(Date.now() / 1000)

const tierImage: Record<number, string> = {
  0: 'https://i.imgur.com/SzVwUjO.png',
  1: 'https://i.imgur.com/nERRbbu.png',
  2: 'https://i.imgur.com/PNuzLVw.png',
  3: 'https://i.imgur.com/tD8KSiM.png',
  4: 'https://i.imgur.com/Lo9QflI.png',
  5: 'https://i.imgur.com/fLD2Joe.png',
  6: 'https://i.imgur.com/XR2UQxh.png',
  7: 'https://i.imgur.com/N5Thmv8.png',
  8: 'https://i.imgur.com/7Sywnbb.png',
  9: 'https://i.imgur.com/UEeSBvO.png',
  10: 'https://i.imgur.com/iEITzPo.png',
  11: 'https://i.imgur.com/Za70mKj.png',
  12: 'https://i.imgur.com/n6H3ZUi.png',
  13: 'https://i.imgur.com/C0BjyeL.png',
  14: 'https://i.imgur.com/E5FqPeg.png',
  15: 'https://i.imgur.com/LXtsQZq.png',
  16: 'https://i.imgur.com/zizNXK1.png',
  17: 'https://i.imgur.com/rj7R8pS.png',
  18: 'https://i.imgur.com/O9h6YMv.png',
  19: 'https://i.imgur.com/wuikuyW.png',
  20: 'https://i.imgur.com/aqGZa6z.png',
  21: 'https://i.imgur.com/A3PKrqs.png',
  22: 'https://i.imgur.com/SyQISef.png',
  23: 'https://i.imgur.com/VonDo8J.png',
  24: 'https://i.imgur.com/oHF3MfP.png',
  25: 'https://i.imgur.com/9SfSsAs.png',
  26: 'https://i.imgur.com/5OF66pZ.png',
  27: 'https://i.imgur.com/FlNSYJB.png',
  28: 'https://i.imgur.com/iuhuqS3.png',
  29: 'https://i.imgur.com/1wTiJeW.png',
  30: 'https://i.imgur.com/aypOXl6.png',
  31: 'https://i.imgur.com/aTmDBip.png',
}

function getTierName(tierNumber: number): string {
  return `${
    ['루비', '다이아몬드', '플래티넘', '골드', '실버', '브론즈'][
      6 - Math.ceil(tierNumber / 5)
    ]
  } ${5 - ((tierNumber - 1) % 5)}`
}

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: 'https://drive.google.com/uc?id=1gGW1VHbVoPvgoOWPTWRs7goQqVk4RAJN',
    startTimestamp: browsingTimestamp,
  }

  switch (path.split('/')[1]) {
    case 'problemset': {
      if (path.includes('?sort=ranking_asc')) {
        presenceData.details = '페이지 보는 중'
        presenceData.state = '문제 순위'
      }
      else if (path.includes('?sort=no_asc&etc=bm')) {
        presenceData.details = '페이지 보는 중'
        presenceData.state = '북마크'
      }
      else {
        presenceData.details = '페이지 보는 중'
        presenceData.state = '전체 문제'
      }
      break
    }

    case 'category': {
      presenceData.details = '페이지 보는 중'
      presenceData.state = '문제 출처'
      break
    }

    case 'step': {
      presenceData.details = '페이지 보는 중'
      presenceData.state = '단계별로 풀어보기'
      break
    }

    case 'workbook': {
      if (path.includes('view')) {
        presenceData.details = '문제집 보는 중'
        presenceData.state = `${
          document.querySelector(
            'body > div.wrapper > div.container.content > div.row > div:nth-child(2) > div > h1 > span:nth-child(1)',
          )!.textContent
        } - ${
          document.querySelector(
            'body > div.wrapper > div.container.content > div.row > div:nth-child(2) > div > blockquote > a',
          )!.textContent
        }`
      }
      else {
        presenceData.details = '페이지 보는 중'
        presenceData.state = '문제집'
      }
      break
    }

    case 'contest': {
      if (path.includes('view')) {
        presenceData.details = '대회 보는 중'
        presenceData.state = document.querySelector(
          'body > div.wrapper > div.container.content > div > div.col-md-12 > div > h1',
        )!.textContent
      }
      else if (path.includes('board')) {
        presenceData.details = '스코어보드 보는 중'
        presenceData.state = document.querySelector(
          '#page-wrapper > div.row.border-bottom.white-bg > nav > div.navbar-header > a',
        )!.textContent
      }
      else {
        presenceData.details = '페이지 보는 중'
        presenceData.state = '대회'
      }
      break
    }

    case 'status': {
      presenceData.details = '페이지 보는 중'
      presenceData.state = '채점 현황'
      break
    }

    case 'problem': {
      if (path.includes('tags')) {
        presenceData.details = '페이지 보는 중'
        presenceData.state = '알고리즘 분류'
      }
      else if (path.includes('added')) {
        presenceData.details = '페이지 보는 중'
        presenceData.state = '추가된 문제'
      }
      else if (path.includes('status')) {
        presenceData.details = '페이지 보는 중'
        presenceData.state = '맞힌 사람'
      }
      else {
        presenceData.details = '문제 푸는 중'
        presenceData.state = `${
          document.querySelector(
            'body > div.wrapper > div.container.content > div.row > div:nth-child(3) > ul > li.active',
          )!.textContent
        } - ${document.querySelector('#problem_title')!.textContent}`

        const isTier = document.querySelector<HTMLImageElement>(
          'body > div.wrapper > div.container.content > div.row > div:nth-child(3) > ul > li.active > a > img',
        )
        if (isTier) {
          const tier = Number(isTier.src.split('/').pop()!.replace('.svg', ''))
          presenceData.smallImageKey = tierImage[tier]
          presenceData.smallImageText
            = tier !== 0 ? getTierName(tier) : 'Unrated'
        }
        else {
          presenceData.smallImageKey = Assets.Reading
          presenceData.smallImageText = '(티어 숨김)'
        }
      }
      break
    }

    case 'submit': {
      presenceData.details = '코드 제출 중'
      break
    }

    case 'user': {
      presenceData.details = '유저 보는 중'
      presenceData.state = document.querySelector(
        'body > div.wrapper > div.container.content > div.row > div:nth-child(1) > div > h1',
      )!.textContent
      break
    }

    case 'setting': {
      presenceData.details = '페이지 보는 중'
      presenceData.state = '설정'
      break
    }

    default: {
      presenceData.details = '페이지 보는 중'
      break
    }
  }

  presence.setActivity(presenceData)
})
