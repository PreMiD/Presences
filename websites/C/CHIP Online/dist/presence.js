const presence = new Presence({
    clientId: "651438286962688044"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo-chip"
    };
    if (window.location.pathname.startsWith("/haber/")) {
        presenceData.details = "Bir haberi okuyor:";
        presenceData.state = document.querySelector("#colana > article > h1").textContent;
    }
    else if (window.location.pathname.endsWith("video/")) {
        presenceData.details = "Bütün videolara göz atıyor.";
        presenceData.state = "CHIP Online";
    }
    else if (window.location.pathname.endsWith("haber/")) {
        presenceData.state = "Bütün haberlere göz atıyor.";
        presenceData.details = "CHIP Online";
    }
    else if (window.location.pathname.endsWith("inceleme/")) {
        presenceData.state = "Bütün incelemelere göz atıyor.";
        presenceData.details = "CHIP Online";
    }
    else if (window.location.pathname.startsWith("/inceleme/")) {
        presenceData.state = document.querySelector("#anacontainer > h1").textContent;
        presenceData.details = "Bir incelemeyi okuyor:";
    }
    else if (window.location.pathname.startsWith("/blog/")) {
        presenceData.state = document.querySelector("#article-body > h1").textContent;
        presenceData.details = "Bir blog okuyor:";
    }
    else if (window.location.pathname.endsWith("forum/")) {
        presenceData.details = "Tüm forumlara göz atıyor.";
    }
    else if (window.location.pathname.endsWith("canli/")) {
        presenceData.state = "CHIP Online";
        presenceData.details = "Tüm Tech-Talk arşivine göz atıyor.";
    }
    else if (window.location.pathname.startsWith("/forum/")) {
        presenceData.state = "Adlı konuyu/gönderiyi okuyor.";
        presenceData.details = document.querySelector("#forumwrap > h1").textContent;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFdBQVc7S0FDM0IsQ0FBQztJQUVGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7UUFDNUMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN6Qyx3QkFBd0IsQ0FDekIsQ0FBQyxXQUFXLENBQUM7S0FDZjtTQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3RELFlBQVksQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUM7UUFDckQsWUFBWSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7S0FDcEM7U0FBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN0RCxZQUFZLENBQUMsS0FBSyxHQUFHLDZCQUE2QixDQUFDO1FBQ25ELFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO0tBQ3RDO1NBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDekQsWUFBWSxDQUFDLEtBQUssR0FBRyxnQ0FBZ0MsQ0FBQztRQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztLQUN0QztTQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzVELFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDekMsb0JBQW9CLENBQ3JCLENBQUMsV0FBVyxDQUFDO1FBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztLQUNqRDtTQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3hELFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDekMsb0JBQW9CLENBQ3JCLENBQUMsV0FBVyxDQUFDO1FBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztLQUMzQztTQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3RELFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7S0FDcEQ7U0FBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN0RCxZQUFZLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLG9DQUFvQyxDQUFDO0tBQzdEO1NBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDekQsWUFBWSxDQUFDLEtBQUssR0FBRywrQkFBK0IsQ0FBQztRQUNyRCxZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNDLGlCQUFpQixDQUNsQixDQUFDLFdBQVcsQ0FBQztLQUNmO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==