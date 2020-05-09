const iframe = new iFrame();
iframe.on("UpdateData", () => {
    if (document.location.hostname == "www.4chan.org" ||
        document.location.hostname == "boards.4chan.org" ||
        document.location.hostname == "www.4channel.org" ||
        (document.location.hostname == "boards.4channel.org" &&
            !document.location.pathname.startsWith("/frames_navigation"))) {
        var pathname = document.location.pathname;
        var query1 = document.querySelector("div.boardBanner>div.boardTitle");
        var query2 = document.querySelector("div.boxbar>h2");
        var query3 = document.querySelector("div.pagelist>div.pages");
        var query4 = document.querySelector("div.pagelist>div.pages>strong");
        var query5 = document.querySelector("table#postForm");
        var query6 = document.querySelector("#togglePostFormLink");
        var query7 = document.querySelector("div#quickReply");
        iframe.send({
            pathnameA: pathname,
            queryA: query1 ? query1.textContent : false,
            queryB: query2 ? query2.textContent : false,
            queryC: query3 ? query3.lastElementChild.textContent : false,
            queryD: query4 ? query4.textContent : false,
            queryE: query5 ? true : false,
            queryF: query6 ? query6.hasAttribute("style") : false,
            queryG: query7 ? true : false
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDNUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzNCLElBQ0UsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZTtRQUM3QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxrQkFBa0I7UUFDaEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksa0JBQWtCO1FBQ2hELENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkscUJBQXFCO1lBQ2xELENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFDL0Q7UUFDQSxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUMxQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDOUQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ3JFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0RCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDM0QsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDVixTQUFTLEVBQUUsUUFBUTtZQUNuQixNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQzNDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDM0MsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSztZQUM1RCxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQzNDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztZQUM3QixNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQ3JELE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztTQUM5QixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQyxDQUFDIn0=