var presence = new Presence({
  clientId: "685611188306051093",
  mediaKeys: false
})

var browsingStamp = Math.floor(Date.now()/1000);
var searchItems = {
  "query": "q",
  "type": "type",
  "edition": "offering",
  "arch": "architecture",
  "os": "operating_system"
}
var language: any
var match: any

presence.on("UpdateData", async () => {

  let presenceData: presenceData = {
    details: "TODO",
    largeImageKey: "logo"
  };

  language = window.navigator.language; //Make this change-able with presence settings
  //en = English
  //Language list can be found here: https://api.premid.app/v2/langFile/list
  if (document.location.hostname == "hub.docker.com") {
    presenceData.startTimestamp = browsingStamp;

    if(document.URL.match(/hub.docker.com\/(repositories)?$/)) {
      presenceData.details = "Bowsing own repositories"

    } else if(document.URL.match(/hub.docker.com\/settings/)) {
      presenceData.details = `On settings page`

    } else if(document.URL.match(/search\?.*/)) {
      var type: any = document.URL.match(`${searchItems['type']}=([^&]+)`)
      type = type && decodeURIComponent(type[1]) || `image`

      var edition: any = document.URL.match(`${searchItems['edition']}=([^&]+)`)
      edition = edition && decodeURIComponent(edition[1]) || ``

      var query: any = document.URL.match(`${searchItems['query']}=([^&]+)`)
      query = query && decodeURIComponent(query[1]) || null

      var os: any = document.URL.match(`${searchItems['os']}=([^&]+)`)
      os = os && decodeURIComponent(os[1]) || null

      var arch: any = document.URL.match(`${searchItems['arch']}=([^&]+)`)
      arch = arch && decodeURIComponent(arch[1]) || null

      presenceData.details = `Searching for${(query ? `: ${query}` : ` ${edition} ${type}s`)}`

      if(os || arch) presenceData.state = `${os ? `${capitalize(os)} ` : ``}${arch ? arch.toUpperCase() : ""}`

    } else if(document.URL.match(/\/orgs$/)) {
      presenceData.details = `Browsing organizations`
    } else if(match = document.URL.match(/\/orgs\/([^\/]+)(?:\/([^\/]+))?/)) {
      var name: string = match[1]
      var tab: string = match[2]
      tab = tab || `members`
      presenceData.details = `On org ${tab ? `${tab} ` : ``}page`
      presenceData.state = `${name}`

    } else if(match = document.URL.match(/\/_\/([^?]+)(?:\?tab=(.+))?/)) {
      var name: string = match[1]
      var tab: string = match[2]

      presenceData.details = `On image ${tab ? `${tab} ` : ``}page`
      presenceData.state = `${name}`

    } else if(match = document.URL.match(/\/r\/([^\/]+)\/([^\/]+)(?:(?:\/([^?]+))(?:\?page=(.+))?)?/)) {
      var owner: string = match[1], name: string = match[2], tab: string = match[3], page: string = match[4]

      presenceData.details = `On image ${tab ? tab : ``} page${page ? ` ${page}` : ``}`
      presenceData.state = `${owner}/${name}`

    } else if(match = document.URL.match(/\/layers\/([^\/]+)\/([^\/]+)\/([^\/]+)/)) {
      var owner: string = match[1], name: string = match[2], tag: string = match[3], arch: any = null
      arch = document.querySelector('.Select-value').textContent

      presenceData.details = `On image history`
      presenceData.state = `${owner}/${name}:${tag} ${arch}`

    } else if(match = document.URL.match(/\/u\/([^\/]+)(?:\/([^\/]+))?/)) {
      var user: string = match[1]
      var tab: string = match[2] || `repositories`
      presenceData.details = `On profile ${tab} page`
      presenceData.state = user

    } else if(document.URL.match(/repository\/create/)) {
      presenceData.details = `Creating repository`

    } else if(match = document.URL.match(/repository(?:\/([^\/?]+))+(?:\?page=(\d+))?/)) {
      presenceData.details = `On personal repository`
      var tab: string = match[1]
      var page: string = match[3] || null
      var selector: any = document.querySelector('#contextNav > div > div.styles__breadcrumbs___18Yr8 > div:nth-child(2) > a')
      var breadcrum: string = selector && selector.textContent || null
      if(breadcrum && breadcrum.match(tab)) {
        tab = `general`
      } else if(document.URL.match(/\/builds\//)) {
        tab = `builds`
      }
      presenceData.state = `${capitalize(tab)}${page ? ` ${page}` : ``}`

    } else if(match = document.URL.match(/support\/(?:(doc)?(contact)?)/)) {
      presenceData.details = `Reading FAQ`
      if(match[1]) {
        presenceData.state = document.querySelector('#gatsby-focus-wrapper > div > main > div > div.MuiCardHeader-root > div > span').textContent
      } else if(match[2]) {
        presenceData.details = `Contact page`
      }
    } else if(document.URL.match(/hub.docker.com\/billing/)) {
      presenceData.details = `Checking billing info`
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity()
  } else {
    presence.setActivity(presenceData);
  }

});

/**
 * Send PreMiD error message in console of browser
 * @param message the message that you want to be sent in console
 */
function PMD_error(message: String) {
  var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;"
  console.log(
    "%cPreMiD%cERROR%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;",
    "color: unset;"
  )
}

/**
 * Lambda function to ucFirst
 * @param s string to capitalize
 */
const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}