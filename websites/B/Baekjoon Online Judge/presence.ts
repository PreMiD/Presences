import { Assets } from 'premid'

const presence = new Presence({
  clientId: '1070240473945489418',
})
const path = location.pathname
const browsingTimestamp = Math.floor(Date.now() / 1000)

const tierImage: Record<number, string> = {
  0: 'https://drive.google.com/uc?id=19R9Jb3DwZu74rwe7CZJLK09VQJsNsE1i',
  1: 'https://drive.google.com/uc?id=1fQIBGRjgsvLKIn9zm688qi78-bjUSemy',
  2: 'https://drive.google.com/uc?id=1YWQ1oraHwIhW_v4ysGuoSaiSkGUrigYl',
  3: 'https://drive.google.com/uc?id=1JotKsaaej8afpaVO6od8ZmKosN0OGitB',
  4: 'https://drive.google.com/uc?id=1aZB52e51-Y6swkwG1JAhePLhcaFuMULW',
  5: 'https://drive.google.com/uc?id=1raJa0QoXwoIujRbw4N4GyAabHDJHfo-i',
  6: 'https://drive.google.com/uc?id=1qzQze622CWAZR9rKNYj4JJd8S7v4wO3_',
  7: 'https://drive.google.com/uc?id=1tqidI0vaJNN-kzzbCdhN8C9wcEBu8pjJ',
  8: 'https://drive.google.com/uc?id=1Z-aCS8hjd--gyNaJPBCG4BEPVXjk2mU3',
  9: 'https://drive.google.com/uc?id=1VdeNcbbtPTLF3Vptgnt5p1BAyzv3q0q7',
  10: 'https://drive.google.com/uc?id=13uHy00XBoO4YSsoc86bzCggtbnbgMtPr',
  11: 'https://drive.google.com/uc?id=1jHDRp5c0yP7LP3cSSojZOjLRn8TNgEFh',
  12: 'https://drive.google.com/uc?id=1lPKtPILQQXkZnAMq8bIVo4L5ywH6zN7A',
  13: 'https://drive.google.com/uc?id=1mGurDmLTqCpszWSUKHW5uGa4nNswL9id',
  14: 'https://drive.google.com/uc?id=17x9bGA-L9f-tfuOKczF5HZWwJ7ITXQSX',
  15: 'https://drive.google.com/uc?id=1ANOQwNc0-vXWkWAJUPeprWkNuk8428MZ',
  16: 'https://drive.google.com/uc?id=1LYiOfmh5nZrpJ7_YqE8_pD-hzYmAt_R3',
  17: 'https://drive.google.com/uc?id=1G-LKE9svVCkjX4Xv3Oe9PAadWI8up9hH',
  18: 'https://drive.google.com/uc?id=1sYsX6QR5tCvN5sVKB1lXWeuBrtW3aDHk',
  19: 'https://drive.google.com/uc?id=1JF9YC6CZX5g_5fSrVKq0y737vgOBhezO',
  20: 'https://drive.google.com/uc?id=1XFltKkHSroNKD0R22G1Ix1t2LL1HHnv0',
  21: 'https://drive.google.com/uc?id=1ggLXwx7ngKAhYUYiajDUtmX0LgmICAqu',
  22: 'https://drive.google.com/uc?id=1qCR3t-SWckM4DTEj8WmSmtamibxI3tgH',
  23: 'https://drive.google.com/uc?id=1U2o5cBW89VY2_yWpaWNn98h3bVHi4KCS',
  24: 'https://drive.google.com/uc?id=1f_xrWfG-Lph0WOvtpnmzrI3DOYS_5E_T',
  25: 'https://drive.google.com/uc?id=1E1Be1qqFi_6w8-7aGiZ0JQ6Dyktaxn8S',
  26: 'https://drive.google.com/uc?id=1Ri7EQQKuiq6mOhIgt3K6AV1tgQJEp5v6',
  27: 'https://drive.google.com/uc?id=1ZpIsjBeahqd_irivZGYQDmt6zs35li4m',
  28: 'https://drive.google.com/uc?id=1sV_m0fNOyokHKku1XCNl6K-mNWCGrfPT',
  29: 'https://drive.google.com/uc?id=1dhgZDJTuY_meoBblWnhcOGBfTNWoZU0z',
  30: 'https://drive.google.com/uc?id=1K_p1RbQVjEjBIE5MG9S_P2jX0QuFt2VO',
  31: 'https://drive.google.com/uc?id=1lBsfcOoySY5WgRwtREhjyD7DzLLI7Fqv',
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

        const isTier = document.querySelector(
          'body > div.wrapper > div.container.content > div.row > div:nth-child(3) > ul > li.active > a > img',
        ) as HTMLImageElement
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
