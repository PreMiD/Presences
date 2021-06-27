const presence = new Presence({
  clientId: "856069178179584012"
  }),
  timestamp = Math.floor(Date.now() / 1000)

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "nextjs-icon"
  },
    Path = document.location.pathname
  presenceData.startTimestamp = timestamp
  
  if (Path === "/") presenceData.details = "Viewing Homepage"
  if (Path.startsWith("/blog")) presenceData.details = "Viewing Blog"
  if (Path.startsWith("/live")) presenceData.details = "Viewing Live"
  if (Path.startsWith("/showcase")) presenceData.details = "Viewing Showcase"
  if (Path.startsWith("/commerce")) presenceData.details = "Viewing Commerce"
  if (Path.startsWith("/telemetry")) presenceData.details = "Viewing Telemetry Page"
  if (Path.startsWith("/analytics")) presenceData.details = "Viewing Analytics Page"
  if (Path.startsWith("/case-studies")) presenceData.details = "Viewing Case Studies"
  if (document.title.startsWith("404")) presenceData.details = "Viewing 404 Page"


  if (Path.startsWith("/docs")) {
    const header = document.querySelector("#__next > div > div > div.jsx-4169323174 > div.jsx-1998690184 > div > div > div.jsx-29590182.docs-content > h1").textContent
    presenceData.details = "Viewing Docs:"
    presenceData.state = header
  }

  if (Path.startsWith("/learn")) {
    const header = document.querySelector("#__next > div > div > div.jsx-4169323174 > div > div > div.jsx-1537350221.lesson > div.jsx-95732519.lesson-area > h2").textContent
    presenceData.details = "Viewing Learning Page:"
    presenceData.state = header
  }

  if (Path.startsWith("/blog/")) {
    const header = document.querySelector("#__next > div > div > div:nth-child(3) > h1").textContent
    presenceData.details = "Viewing Blog Post:"
    presenceData.state = header
  }

  if (Path.startsWith("/showcase/")) {
    const header = document.querySelector("#__next > div > div > div.jsx-1916842508.lightbox > div > div > h3").textContent
    presenceData.details = "Viewing Showcase:"
    presenceData.state = header
  }

  if (Path.startsWith("/case-studies/")) {
    const header = document.querySelector("#__next > div > div > div.jsx-3361678971.container > section.jsx-3371267439 > div.jsx-3371267439.container > div.jsx-3371267439.title > h1").textContent
    presenceData.details = "Viewing Case Study:"
    presenceData.state = header
  }

  if (Path.startsWith("/conf")) {
    const online = document.querySelector("#__next > div > div > div.jsx-3166062383.layout_background__3fqkS > div > main > div.jsx-3166062383.layout_full__2m8WP > div:nth-child(2) > footer > div > div.footer_footer-stats__TiS9w.footer_footer-stats-desktop__4svMm > div:nth-child(1) > b").textContent
    const hereInRoom = document.querySelector("#__next > div > div > div.jsx-3166062383.layout_background__3fqkS > div > main > div.jsx-3166062383.layout_full__2m8WP > div:nth-child(2) > footer > div > div.footer_footer-stats__TiS9w.footer_footer-stats-desktop__4svMm > div:nth-child(2) > b").textContent

    presenceData.details = "Viewing Conference:"
    presenceData.state = `${online} online & ${hereInRoom} here in room`
    presenceData.buttons = [{ label: "Join Room", url: document.location.href }]
  }

  presence.setActivity(presenceData)
})