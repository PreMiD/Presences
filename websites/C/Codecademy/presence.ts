var presence = new Presence({
  clientId: "736516965748834336"
})

var start = new Date().getTime();
var video: { title: string, src: string } = { title: null, src: null }
async function fetchTitle(ytEmbedURL: string): Promise<string> {
  return new Promise(resolve => {
    const regex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
    const matches = ytEmbedURL.match(regex)

    const http = new XMLHttpRequest()

    http.open("GET", `https://www.youtube.com/get_video_info?video_id=${matches[1]}`)
    http.send()

    http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(new URLSearchParams(http.responseText).get("player_response")).videoDetails.title)
      }
    }
  })
}

presence.on("UpdateData", async () => {
  var presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const pathArray: Array<string> = window.location.pathname.slice(1).split("/");

  switch (pathArray[0]) {
    case "learn":
      switch (pathArray.length) {
        case 1:
          presenceData.details = "At the dashboard";
          break;
        case 2:
          presenceData.details = "Looking at a course";
          presenceData.state = `"${document.querySelector(".header__3igq9n5NOQDb0BZuWlYoJL h1").textContent}"`;
          presenceData.smallImageKey = document.querySelector(".header__3igq9n5NOQDb0BZuWlYoJL h1").textContent.split(" ").slice(1).join(" ").toLowerCase().replace(" ","_").replace("+","plus").replace("#","sharp")
          presenceData.smallImageText = document.querySelector(".header__3igq9n5NOQDb0BZuWlYoJL h1").textContent.split(" ").slice(1).join(" ")
          break;
        case 3:
          presenceData.details = "Looking at a path";
          presenceData.state = `"${document.querySelector(".heading__2X5Zo7G1JUo6H9EbL5j-mP") ? document.querySelector(".heading__2X5Zo7G1JUo6H9EbL5j-mP").textContent : document.querySelector(".title__1PSKSbrA1yvrVuIID5Q55I").textContent.slice(document.querySelector(".goalHeader__TL76KAVVWuNlGIJiHpkyD").textContent.length)}"`;
          break;
      }
      break;
    case "courses":
    case "paths":
      const heading = document.querySelector(".headerTitle__1-qJDRbp_-WCVeSVokJFqA").textContent;
      if (pathArray[0] === "courses") {
        if (heading.startsWith("Learn ")) {
          presenceData.smallImageKey = heading.split(" ").slice(1).join(" ").toLowerCase().replace(" ","_").replace("+","plus").replace("#","sharp")
          presenceData.smallImageText = heading.split(" ").slice(1).join(" ")
        }
      }
      presenceData.startTimestamp = start;
      presenceData.details = heading.startsWith("Learn ") ? `Learning ${heading.split(" ").slice(1).join(" ")}` : heading;
      const bodyHeading = document.querySelector(".bodyHeading__3ycV35eqrePgy3HT_yK-i4")
      const articleTitle = document.querySelector(".articleTitle__1QAq5lbh9QdTOHlJiW8tde")
      const widget2 = (<HTMLIFrameElement>document.getElementById("widget2")) // youtube embed player
      if (widget2 && video.src === widget2.src) {
        presenceData.details = "Watching a video"
        presenceData.state = video.title
      }
      else if (widget2 && video.src !== widget2.src) {
        video.title = await fetchTitle(widget2.src)
        video.src = widget2.src
        presenceData.details = "Watching a video"
        presenceData.state = video.title;
      } else {
        if (bodyHeading) presenceData.state = bodyHeading.textContent
        if (articleTitle) {
          presenceData.details = "Reading an article"
          presenceData.state = articleTitle.textContent
        }
      }
      presenceData.state = `"${presenceData.state}"`
      break;
    case "login":
      presenceData.details = "Logging in";
      break;
    case "register":
      presenceData.details = "Registering";
      break;
    case "catalog":
      if (pathArray[1] === "language") {
        presenceData.details = `Looking at ${document.querySelector("#catalog-heading").textContent}`
        presenceData.state = "in the catalog"
        presenceData.smallImageKey = document.querySelector("#catalog-heading").textContent.toLowerCase().replace(" ","_").replace("+","plus").replace("#","sharp")
	presenceData.smallImageText = document.querySelector("#catalog-heading").textContent
      } else if (pathArray[1] === "subject"){
		presenceData.details = "Looking at a subject"
		presenceData.state = `"${document.querySelector("#catalog-heading").textContent}"`
	  } else {
        presenceData.details = "Browsing the catalog"
        presenceData.state = "of available languages"
      }
      break;
    case "subscriptions":
      presenceData.details = "Considering the PRO"
      presenceData.state = "subscription"
      break;
    case "explore":
      presenceData.details = "Exploring..."
      break;
    case "":
	  if (window.location.hostname === "news.codecademy.com") {
		presenceData.details = "Browsing articles"
	  } else {
		presenceData.details = "At the homepage";
	  }
      break;
	case "pricing":
      presenceData.details = "Checking out the"
      presenceData.state = "paid plans"
      break;
	case "business":
	  presenceData.details = "Checking out the"
	  presenceData.state = "bussiness plans"
	  break;
	case "articles":
	  if (pathArray[1]){
		presenceData.details = "Reading an article"
		presenceData.state = `"${document.querySelector(".articleHeader__3_GpcCcJGMQQ3O0_uAxz5u").textContent}"`
	  } else {
		presenceData.details = "Browsing articles"
	  }
	  break;
    default:
      if (window.location.hostname === "news.codecademy.com") {
        presenceData.details = "Reading an article"
        presenceData.state = `"${document.querySelector(".post-full-title").textContent}"`
      } else presenceData.details = "Idle";
      break;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }

});
