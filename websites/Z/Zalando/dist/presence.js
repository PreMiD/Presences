var presence = new Presence({
    clientId: "644645903973482536"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
var user;
var title;
var language;
function PMD_error(message) {
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
function getTranslation(stringName) {
    switch (stringName) {
        case "HomePage":
            switch (language) {
                case "nl":
                    return "Bekijkt de startpagina";
                    break;
                default:
                    return "Viewing home page";
                    break;
            }
            break;
        case "ProductView":
            switch (language) {
                case "nl":
                    return "Bekijkt product:";
                    break;
                default:
                    return "Viewing product:";
                    break;
            }
            break;
        case "BrandView":
            switch (language) {
                case "nl":
                    return "Bekijkt merk:";
                    break;
                default:
                    return "Viewing brand:";
                    break;
            }
            break;
        case "CategoryView":
            switch (language) {
                case "nl":
                    return "Bekijkt categorie:";
                    break;
                default:
                    return "Viewing category:";
                    break;
            }
            break;
        case "Cart":
            switch (language) {
                case "nl":
                    return "Bekijkt zijn winkelwagen";
                    break;
                default:
                    return "Viewing their cart";
                    break;
            }
            break;
        case "Wishlist":
            switch (language) {
                case "nl":
                    return "Bekijkt zijn verlanglijstje";
                    break;
                default:
                    return "Viewing their wishlist";
                    break;
            }
            break;
        case "AccountSettings":
            switch (language) {
                case "nl":
                    return "Bekijkt zijn account";
                    break;
                default:
                    return "Viewing their account";
                    break;
            }
            break;
        case "FAQ":
            switch (language) {
                case "nl":
                    return "Bekijkt de veel gestelde vragen";
                    break;
                default:
                    return "Viewing the FAQ";
                    break;
            }
            break;
        default:
            PMD_error("Unknown StringName please contact the Developer of this presence!\nYou can contact him/her in the PreMiD Discord (discord.gg/premid)");
            return "Unknown stringName";
            break;
    }
}
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "zalando"
    };
    language = window.navigator.language;
    if (document.location.pathname == "/" ||
        document.location.pathname.includes("home/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = getTranslation("HomePage");
    }
    else if (document.location.pathname.includes(".html")) {
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector(".h-container.h-product-title.topSection.h-align-left > div:nth-child(2) > h1");
        title = document.querySelector(".h-container.h-product-title.topSection.h-align-left > div:nth-child(1) > a > h2");
        presenceData.details = getTranslation("ProductView");
        presenceData.state = user.textContent + " > " + title.textContent;
    }
    else if (document.querySelector("#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > div > div > h1 > span > a") !== null) {
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector("#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > div > div > h1 > span > a");
        presenceData.details = getTranslation("BrandView");
        presenceData.state = user.textContent;
    }
    else if (document.querySelector("#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > nav > ul") !== null) {
        presenceData.startTimestamp = browsingStamp;
        user = document.querySelector("#z-nvg-cognac-root > div > z-grid > z-grid-item:nth-child(2) > div > div > nav > ul");
        presenceData.details = getTranslation("CategoryView");
        presenceData.state = user.textContent;
    }
    else if (document.location.pathname.includes("/cart/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = getTranslation("Cart");
    }
    else if (document.location.pathname.includes("/wishlist/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = getTranslation("Wishlist");
    }
    else if (document.location.pathname.includes("/myaccount/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = getTranslation("AccountSettings");
    }
    else if (document.location.pathname.includes("/faq/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = getTranslation("FAQ");
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksWUFBWSxHQUFHLG1EQUFtRCxDQUFDO0FBRXZFLElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLFFBQWEsQ0FBQztBQU1sQixTQUFTLFNBQVMsQ0FBQyxPQUFlO0lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsb0JBQW9CLEdBQUcsT0FBTyxFQUM5QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQU1ELFNBQVMsY0FBYyxDQUFDLFVBQWtCO0lBQ3hDLFFBQVEsVUFBVSxFQUFFO1FBQ2xCLEtBQUssVUFBVTtZQUNiLFFBQVEsUUFBUSxFQUFFO2dCQUNoQixLQUFLLElBQUk7b0JBQ1AsT0FBTyx3QkFBd0IsQ0FBQztvQkFDaEMsTUFBTTtnQkFDUjtvQkFDRSxPQUFPLG1CQUFtQixDQUFDO29CQUMzQixNQUFNO2FBQ1Q7WUFDRCxNQUFNO1FBQ1IsS0FBSyxhQUFhO1lBQ2hCLFFBQVEsUUFBUSxFQUFFO2dCQUNoQixLQUFLLElBQUk7b0JBQ1AsT0FBTyxrQkFBa0IsQ0FBQztvQkFDMUIsTUFBTTtnQkFDUjtvQkFDRSxPQUFPLGtCQUFrQixDQUFDO29CQUMxQixNQUFNO2FBQ1Q7WUFDRCxNQUFNO1FBQ1IsS0FBSyxXQUFXO1lBQ2QsUUFBUSxRQUFRLEVBQUU7Z0JBQ2hCLEtBQUssSUFBSTtvQkFDUCxPQUFPLGVBQWUsQ0FBQztvQkFDdkIsTUFBTTtnQkFDUjtvQkFDRSxPQUFPLGdCQUFnQixDQUFDO29CQUN4QixNQUFNO2FBQ1Q7WUFDRCxNQUFNO1FBQ1IsS0FBSyxjQUFjO1lBQ2pCLFFBQVEsUUFBUSxFQUFFO2dCQUNoQixLQUFLLElBQUk7b0JBQ1AsT0FBTyxvQkFBb0IsQ0FBQztvQkFDNUIsTUFBTTtnQkFDUjtvQkFDRSxPQUFPLG1CQUFtQixDQUFDO29CQUMzQixNQUFNO2FBQ1Q7WUFDRCxNQUFNO1FBQ1IsS0FBSyxNQUFNO1lBQ1QsUUFBUSxRQUFRLEVBQUU7Z0JBQ2hCLEtBQUssSUFBSTtvQkFDUCxPQUFPLDBCQUEwQixDQUFDO29CQUNsQyxNQUFNO2dCQUNSO29CQUNFLE9BQU8sb0JBQW9CLENBQUM7b0JBQzVCLE1BQU07YUFDVDtZQUNELE1BQU07UUFDUixLQUFLLFVBQVU7WUFDYixRQUFRLFFBQVEsRUFBRTtnQkFDaEIsS0FBSyxJQUFJO29CQUNQLE9BQU8sNkJBQTZCLENBQUM7b0JBQ3JDLE1BQU07Z0JBQ1I7b0JBQ0UsT0FBTyx3QkFBd0IsQ0FBQztvQkFDaEMsTUFBTTthQUNUO1lBQ0QsTUFBTTtRQUNSLEtBQUssaUJBQWlCO1lBQ3BCLFFBQVEsUUFBUSxFQUFFO2dCQUNoQixLQUFLLElBQUk7b0JBQ1AsT0FBTyxzQkFBc0IsQ0FBQztvQkFDOUIsTUFBTTtnQkFDUjtvQkFDRSxPQUFPLHVCQUF1QixDQUFDO29CQUMvQixNQUFNO2FBQ1Q7WUFDRCxNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsUUFBUSxRQUFRLEVBQUU7Z0JBQ2hCLEtBQUssSUFBSTtvQkFDUCxPQUFPLGlDQUFpQyxDQUFDO29CQUN6QyxNQUFNO2dCQUNSO29CQUNFLE9BQU8saUJBQWlCLENBQUM7b0JBQ3pCLE1BQU07YUFDVDtZQUNELE1BQU07UUFDUjtZQUNFLFNBQVMsQ0FDUCxzSUFBc0ksQ0FDdkksQ0FBQztZQUNGLE9BQU8sb0JBQW9CLENBQUM7WUFDNUIsTUFBTTtLQUNUO0FBQ0gsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsU0FBUztLQUN6QixDQUFDO0lBRUYsUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBS3JDLElBQ0UsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRztRQUNqQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQzVDO1FBQ0EsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN2RCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0IsOEVBQThFLENBQy9FLENBQUM7UUFDRixLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIsa0ZBQWtGLENBQ25GLENBQUM7UUFDRixZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRCxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7S0FDbkU7U0FBTSxJQUNMLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLHNHQUFzRyxDQUN2RyxLQUFLLElBQUksRUFDVjtRQUNBLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQixzR0FBc0csQ0FDdkcsQ0FBQztRQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztLQUN2QztTQUFNLElBQ0wsUUFBUSxDQUFDLGFBQWEsQ0FDcEIscUZBQXFGLENBQ3RGLEtBQUssSUFBSSxFQUNWO1FBQ0EsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLHFGQUFxRixDQUN0RixDQUFDO1FBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEQsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDL0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUM1RCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNuRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQzdELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDMUQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN2RCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM5QztJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4QjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=