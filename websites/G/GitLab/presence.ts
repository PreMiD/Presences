const presence = new Presence({
  clientId: "709526684428271687"
});
const browsingStamp = Math.floor(Date.now() / 1000);
let owner, title, presenceprivate;
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    lock = await presence.getSetting("lock");
  presenceprivate = document.querySelector(
    "div.d-inline-flex.align-items-baseline > h1 > span"
  );
  if (window.location.hostname === "gitlab.com") {
    if (
      document.location.pathname === "/" ||
      document.location.pathname.includes("/dashboard/projects")
    ) {
      if (document.location.pathname === "/dashboard/projects/starred")
        presenceData.details = "Viewing Starred";
      else presenceData.details = "Viewing Dashboard";
    } else if (document.location.pathname === "/projects/new/")
      presenceData.details = "Creating a project";
    else if (document.location.pathname === "/groups/new")
      presenceData.details = "Creating a group";
    else if (document.location.pathname.includes("/explore")) {
      if (document.location.pathname === "/explore/snippets")
        presenceData.details = "Exploring Snippets";
      else presenceData.details = "Exploring projects";
    } else if (document.location.pathname === "/dashboard/groups")
      presenceData.details = "Viewing Groups";
    else if (document.location.pathname === "/dashboard/activity")
      presenceData.details = "Viewing Activity";
    else if (document.location.pathname === "/dashboard/milestones")
      presenceData.details = "Viewing Milestones";
    else if (document.location.pathname === "/dashboard/snippets")
      presenceData.details = "Viewing Snippets";
    else if (document.location.pathname === "/-/operations/environments")
      presenceData.details = "Viewing Environments";
    else if (document.location.pathname === "/-/operations")
      presenceData.details = "Viewing Operations";
    else if (document.location.pathname === "/-/security")
      presenceData.details = "Viewing Security";
    else if (document.location.pathname === "/dashboard/issues")
      presenceData.details = "Viewing Issuses";
    else if (document.location.pathname === "/dashboard/merge_requests")
      presenceData.details = "Viewing Merge Requests";
    else if (document.location.pathname === "/dashboard/todos")
      presenceData.details = "Viewing TODOS";
    else if (document.location.pathname === "/help")
      presenceData.details = "Viewing Help";
    else if (document.location.pathname === "/users/sign_in")
      presenceData.details = "Signning in or Registering";
    else if (document.location.pathname === "/search") {
      title = document.querySelector(
        "#dashboard_search"
      ) as HTMLTextAreaElement;
      presenceData.details = "Searching";
      presenceData.state = title.value;
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Searching";
    } else {
      title = document.querySelector(
        "body > div.layout-page.page-with-contextual-sidebar > div.content-wrapper > div.alert-wrapper > nav > div > div > ul > li:nth-child(2) > a > span"
      ) as HTMLTextAreaElement;
      owner = document.querySelector(
        "body > div.layout-page.page-with-contextual-sidebar > div.content-wrapper > div.alert-wrapper > nav > div > div > ul > li:nth-child(1) > a"
      ) as HTMLTextAreaElement;
      if (
        (presenceprivate as HTMLTextAreaElement).title.startsWith(
          "Private -"
        ) &&
        lock
      ) {
        presenceData.details = "Viewing a Private Presence";
        presenceData.state = "or Private Group";
      } else {
        if (title && owner) {
          presenceData.details = title.innerText;
          presenceData.state = owner.innerText;
        } else if (title === null && owner) {
          presenceData.details = owner.innerText;
          presenceData.state = "My Respository";
        } else if (title === null && owner === null) {
          owner = document.querySelector(
            "#content-body > div.user-profile > div.cover-block.user-cover-block > div.profile-header > div.user-info > p > span:nth-child(1)"
          ) as HTMLTextAreaElement;
          presenceData.details = "Viewing:";
          presenceData.state = owner.innerText;
        } else presenceData.details = "Viewing Unknown";
      }
    }
  } else if (window.location.hostname === "about.gitlab.com") {
    if (document.location.pathname === "/")
      presenceData.details = "Viewing Home Page";
    else if (document.location.pathname === "/stages-devops-lifecycle/")
      presenceData.details = "Viewing DevOps Lifecycle";
    else if (document.location.pathname === "/services/")
      presenceData.details = "Viewing Profesional Services";
    title = document.querySelector(
      "body > div.wrapper.gitlab-ee-page > div.image-title > div > div > h1"
    );
    if (title) presenceData.details = `Viewing ${title.textContent}`;
    else if (title === null) {
      title = document.querySelector("body > div.blank-header > div > h1");
      if (title) presenceData.details = `Viewing ${title.textContent}`;
      else if (title === null) {
        title = document.querySelector("body > div.wrapper > div > h1");
        if (title) presenceData.details = `Viewing ${title.textContent}`;
        else if (title === null) {
          title = document.querySelector(
            "body > div.wrapper.blog-landing > div.blog-landing-content > div.blog-hero > div > a > h2"
          );
          if (title) presenceData.details = `Viewing ${title.textContent}`;
          else if (title === null) {
            title = document.querySelector(
              "body > div.blog.article > div.cover > div > div > h1"
            );
            if (title) presenceData.details = `Viewing ${title.textContent}`;
            else {
              title = document.querySelector(
                "body > div.reseller-hero.text-center > div > h1"
              );
              if (title) presenceData.details = `Viewing ${title.textContent}`;
            }
          }
        }
      } else presenceData.details = "Viewing Solutions";
    } else if (document.location.pathname === "/services/implementation/") {
      title = document.querySelector("body > div.wrapper > div > h1");
      presenceData.details = `Viewing ${title.textContent}`;
    } else presenceData.details = "Viewing Unknown";
  } else presenceData.details = "Viewing Unknown";
  if (presenceData.details === null) {
    //This will fire if you do not set presence details
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    //This will fire if you set presence details
    presence.setActivity(presenceData);
  }
});
