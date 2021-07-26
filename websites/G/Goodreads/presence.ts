const presence = new Presence({clientId: "867525909204566056"});

let book: string,
 author: string;
 
presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey: "goodreads",
    details: "Browsing Goodreads",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

  if (document.location.pathname === "/home" ||
      document.location.pathname === "/" ) 
    presenceData.details = "Browsing homepage";
   else if (document.location.pathname === "/book") 
    presenceData.details = "Browsing books";
   else if (document.location.pathname.includes("/book/show/")) {
    // beta layout conditional
    presenceData.details = "Browsing a book:";
    if (document.getElementById("bookTitle") === null) {
      book = document.querySelector("h1").innerText;
      author = document.querySelector("span.ContributorLink__name").textContent;
      presenceData.state = `${book} | by: ${author}`;
    } else{
      book = document.getElementById("bookTitle").innerText;
      author = document.querySelector(".authorName").textContent;
      presenceData.state = `${book} | by: ${author}`;
    }
  } else if (document.location.pathname.includes("/series")) {
    let bookseries: string = document.querySelector("h1").innerText;
    if ( bookseries === "Series") 
      presenceData.details = "Viewing all book series on Goodreads";
     else {
      presenceData.details = "Viewing a book series:";
      presenceData.state = bookseries;
    }
  } else if (document.location.pathname.includes("/user/show/")) {
    presenceData.details = "Browsing a profile:";
    let user: string = document.getElementById("profileNameTopHeading").innerText;
    if(document.querySelector("h1 a") === null) {
      //others profiles
      presenceData.state = user;
    } else {
      // own profile
      const trash: string = document.querySelector("h1 a").innerHTML;
      presenceData.state = user.replace(trash, ""); 
    }
  } else if (document.location.pathname.includes("/author/show/")) {
    presenceData.details = "Viewing an author:";
    author = document.querySelector(".authorName span").innerHTML; 
    presenceData.state = author;
  } else if (document.location.pathname.includes("/group/show/")) {
    presenceData.details = "Viewing a group:";
    presenceData.state = document.querySelector("h1").innerText;
  } else if (document.location.pathname.includes("/topic")) 
    presenceData.details = "Browsing discussions";
   else if (document.location.pathname.includes("/review/edit/")) {
    book = document.querySelector("a.bookTitle").innerHTML;
    presenceData.details = "Writing a book review...";
    presenceData.smallImageKey = "writing";
    presenceData.smallImageText = book;
  } else if(document.location.pathname.includes("/review/list/")) 
    presenceData.details = "Browsing bookshelves";
   else if (document.location.pathname.includes("/review/show")) {
    presenceData.details = "Reading a review...";
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = "On Goodreads";
  } else if(document.location.pathname.includes("/recommendations")) 
    presenceData.details = "Browsing recommendations";
   else if(document.location.pathname.includes("/challenges") ||
  document.location.pathname.includes("/user_challenges")) 
    presenceData.details = "Viewing reading challenge";
   else if(document.location.pathname.includes("/quotes")) 
    presenceData.details = "Browsing quotes";
   else if(document.location.pathname.includes("/search")) {
    presenceData.details = "Searching for a book...";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "On Goodreads";
  }
  presence.setActivity(presenceData);
});
