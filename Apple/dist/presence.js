var presence = new Presence({
    clientId: "706517097219620874"
});
var time = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    var path = document.location.pathname.toLowerCase();
    if (path === "/") {
        presenceData.details = "Initial page";
        presenceData.state = "Browsering";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/mac")) {
        presenceData.details = "Checking product";
        presenceData.state = "Mac";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/apple-card/")) {
        presenceData.details = "Checking product";
        presenceData.state = "Apple card";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/ios/")) {
        let text = "textContent" in document.body ? "textContent" : "innerText";
        document.title = document.getElementsByTagName("h1")[0][text];
        presenceData.details = "Reading about iOS";
        presenceData.state = document.title;
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path === "/apple-pencil") {
        presenceData.details = "Checking product";
        presenceData.state = "Apple Pencil";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/ipad")) {
        let text = "textContent" in document.body ? "textContent" : "innerText";
        document.title = document.getElementsByTagName("h1")[0][text];
        if (document.title.startsWith("Buy")) {
            let name = document.title.replace("Buy ", "");
            presenceData.details = "Buying product";
            presenceData.state = name;
            presenceData.startTimestamp = time;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Checking Product";
            presenceData.state = document.title;
            presenceData.startTimestamp = time;
            presence.setActivity(presenceData);
        }
    }
    else if (path.startsWith("/iphone")) {
        let text = "textContent" in document.body ? "textContent" : "innerText";
        document.title = document.getElementsByTagName("h1")[0][text];
        presenceData.details = "Checking product";
        presenceData.state = document.title;
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
        if (path.endsWith("specs/")) {
            presenceData.details = "Reading specs";
            presenceData.state = "iPhone";
            presenceData.startTimestamp = time;
            presence.setActivity(presenceData);
        }
    }
    else if (path.startsWith("/watch") || path.startsWith("/apple-watch")) {
        presenceData.details = "Checking product";
        presenceData.state = "Apple Watch";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/tv") || path.startsWith("/apple-tv")) {
        presenceData.details = "Checking service";
        presenceData.state = "Apple TV";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/music") || path.startsWith("/apple-music")) {
        presenceData.details = "Checking service";
        presenceData.state = "Apple music";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (document.title.startsWith("shop/product")) {
        presenceData.details = "Buying product";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/shop/buy")) {
        let text = "textContent" in document.body ? "textContent" : "innerText";
        document.title = document.getElementsByTagName("h1")[0][text];
        if (document.title.startsWith("Buy")) {
            let name = document.title.replace("Buy ", "");
            presenceData.details = "Buying product";
            presenceData.state = name;
            presenceData.startTimestamp = time;
            presence.setActivity(presenceData);
        }
        else if (document.title.startsWith("Customize")) {
            let name = document.title.replace("Customize your ", "");
            presenceData.details = "Buying product";
            presenceData.state = name;
            presenceData.startTimestamp = time;
            presence.setActivity(presenceData);
        }
        else if (document.title.startsWith("There's an")) {
            presenceData.details = "Buying product";
            presenceData.state = "Apple Watch";
            presenceData.startTimestamp = time;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Buying product";
            presenceData.startTimestamp = time;
            presence.setActivity(presenceData);
        }
    }
    else if (path.endsWith("upgrade/") || path.endsWith("/compare/")) {
        presenceData.details = "Comparing devices";
        presenceData.state = "Technical specifications";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/airpods")) {
        let text = "textContent" in document.body ? "textContent" : "innerText";
        document.title = document.getElementsByTagName("h1")[0][text];
        presenceData.details = "Checking product";
        presenceData.state = document.title;
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path === "/shop/favorites") {
        presenceData.details = "Shop";
        presenceData.state = "Favorites";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path === "/shop/bag") {
        presenceData.details = "Viewing bag";
        presenceData.state = "Saved items";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/shop")) {
        presenceData.details = "Viewing shop";
        presenceData.state = "Products";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else if (path.startsWith("/today")) {
        presenceData.details = "Checking news";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
    else {
        presenceData.details = "Browsering website";
        presenceData.startTimestamp = time;
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNMLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3pDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ2pDLE1BQU0sWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsTUFBTTtLQUN4QixDQUFDO0lBQ0YsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEQsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDdEMsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDbEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDbkMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN0QztTQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM5QixZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzNCLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdEM7U0FDSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUMx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
