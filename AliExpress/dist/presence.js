var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_info(message) {
    console.log("%cPreMiD%cINFO%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;", "color: unset;");
}
function PMD_error(message) {
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
function PMD_success(message) {
    console.log("%cPreMiD%cSUCCESS%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle +
        "border-radius: 0 25px 25px 0; background: #50ff50; color: black;", "color: unset;");
}
var presence = new Presence({
    clientId: "618569989842010122"
});
var item, typing, index, categorytext, search, dropdowninnertext, split, personal2, profile, board2;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "aliexpress"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "ru.aliexpress.com" ||
        document.location.hostname == "pt.aliexpress.com" ||
        document.location.hostname == "es.aliexpress.com" ||
        document.location.hostname == "fr.aliexpress.com" ||
        document.location.hostname == "de.aliexpress.com" ||
        document.location.hostname == "it.aliexpress.com" ||
        document.location.hostname == "nl.aliexpress.com" ||
        document.location.hostname == "tr.aliexpress.com" ||
        document.location.hostname == "ja.aliexpress.com" ||
        document.location.hostname == "ko.aliexpress.com" ||
        document.location.hostname == "th.aliexpress.com" ||
        document.location.hostname == "vi.aliexpress.com" ||
        document.location.hostname == "ar.aliexpress.com" ||
        document.location.hostname == "he.aliexpress.com" ||
        document.location.hostname == "pl.aliexpress.com" ||
        document.location.hostname == "www.aliexpress.com") {
        if (document.location.pathname.includes("/item/")) {
            item = document.querySelector("#root > div > div.product-main > div > div.product-info > div.product-title");
            presenceData.details = "Viewing product:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/store/")) {
            item = document.querySelector("#hd > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > span");
            presenceData.details = "Viewing store:";
            presenceData.state = item.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/category/")) {
            item = document.querySelector("#root > div > div > div.main-content > div.right-menu > div > div.top-container > div.nav-breadcrumb > div > div > span > span > span");
            presenceData.details = "Viewing category:";
            presenceData.state = item.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/wholesale") &&
            document.location.search.includes("SearchText")) {
            item = document.querySelector("#search-key");
            presenceData.details = "Searching for:";
            presenceData.state = item.value;
            presenceData.smallImageKey = "search";
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "message.aliexpress.com" ||
        document.location.hostname == "msg.aliexpress.com") {
        if (document.querySelector("#root > div > div > div > span > div.message-view > div.message-view-title > div.message-view-title__content") !== null) {
            item = document.querySelector("#root > div > div > div > span > div.message-view > div.message-view-title > div.message-view-title__content");
            typing = document.querySelector("#buyer_msg_send_btn");
            if (typing !== null) {
                typing = document.querySelector("#buyer_msg_send_btn").className;
                if (typing.baseVal.includes("icon-plane disable")) {
                    presenceData.details = "Reading dms with:";
                    presenceData.state = item.innerText;
                }
                else {
                    presenceData.details = "Typing in dms to:";
                    presenceData.state = item.innerText;
                }
            }
            else {
                presenceData.details = "Message Center";
                delete presenceData.state;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Message Center";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "sale.aliexpress.com") {
        presenceData.details = "Browsing through the sale";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "shoppingcart.aliexpress.com") {
        presenceData.details = "Viewing their shoppingcart";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "my.aliexpress.com") {
        if (document.location.pathname.includes("/wishlist")) {
            presenceData.details = "Viewing their wishlist";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/mytrace")) {
            presenceData.details = "Viewing their recently";
            presenceData.state = "viewed products";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "home.aliexpress.com" ||
        document.location.hostname == "star.aliexpress.com") {
        presenceData.details = "Viewing their AliExpress";
        presenceData.state = "page / account /profile";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "feedback.aliexpress.com") {
        presenceData.details = "AliExpress Feedback";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "trade.aliexpress.com") {
        if (document.location.pathname.includes("order_list.htm") ||
            document.location.pathname.includes("orderList.htm")) {
            presenceData.details = "Viewing their orders";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/issue/")) {
            presenceData.details = "Viewing their";
            presenceData.state = "Refunds & Disputes";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/ordertrash/")) {
            presenceData.details = "Viewing their";
            presenceData.state = "deleted orders";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "AliExpress Trade Center";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "coupon.aliexpress.com") {
        presenceData.details = "Viewing their coupons";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "ilogisticsaddress.aliexpress.com") {
        presenceData.details = "Viewing their adress";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "helppage.aliexpress.com") {
        presenceData.details = "AliExpress Help Center";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "sell.aliexpress.com" ||
        document.location.hostname == "seller.aliexpress.com") {
        presenceData.details = "AliExpress Sell Center";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFlBQVksR0FBRyxtREFBbUQsQ0FBQztBQUV2RSxTQUFTLFFBQVEsQ0FBQyxPQUFPO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEdBQUcsT0FBTyxFQUM3QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLE9BQU87SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxvQkFBb0IsR0FBRyxPQUFPLEVBQzlCLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxlQUFlLENBQ2hCLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsT0FBTztJQUMxQixPQUFPLENBQUMsR0FBRyxDQUNULHNCQUFzQixHQUFHLE9BQU8sRUFDaEMsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZO1FBQ1Ysa0VBQWtFLEVBQ3BFLGVBQWUsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUNYLE1BQVcsRUFDWCxLQUFVLEVBQ1YsWUFBaUIsRUFDakIsTUFBVyxFQUNYLGlCQUFzQixFQUN0QixLQUFVLEVBQ1YsU0FBYyxFQUNkLE9BQVksRUFDWixNQUFXLENBQUM7QUFFZCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFlBQVk7S0FDNUIsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRTVDLElBQ0UsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQW1CO1FBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFtQjtRQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBbUI7UUFDakQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQW1CO1FBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFtQjtRQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBbUI7UUFDakQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQW1CO1FBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFtQjtRQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBbUI7UUFDakQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQW1CO1FBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFtQjtRQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBbUI7UUFDakQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQW1CO1FBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFtQjtRQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBbUI7UUFDakQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksb0JBQW9CLEVBQ2xEO1FBQ0EsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakQsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLDZFQUE2RSxDQUM5RSxDQUFDO1lBRUYsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztZQUMxQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtnQkFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQy9EO2lCQUFNO2dCQUNMLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNyQztZQUVELE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDekQsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLGdIQUFnSCxDQUNqSCxDQUFDO1lBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztZQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFcEMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM1RCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0IsdUlBQXVJLENBQ3hJLENBQUM7WUFFRixZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1lBQzNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUVwQyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQy9DO1lBQ0EsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFN0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztZQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFaEMsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7WUFFdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN6QjtLQUNGO1NBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSx3QkFBd0I7UUFDdEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksb0JBQW9CLEVBQ2xEO1FBQ0EsSUFDRSxRQUFRLENBQUMsYUFBYSxDQUNwQiw4R0FBOEcsQ0FDL0csS0FBSyxJQUFJLEVBQ1Y7WUFDQSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0IsOEdBQThHLENBQy9HLENBQUM7WUFDRixNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3ZELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDbkIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2pFLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtvQkFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztvQkFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2lCQUNyQztxQkFBTTtvQkFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO29CQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQ3JDO2FBQ0Y7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztnQkFDeEMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO2FBQzNCO1lBRUQsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7WUFDeEMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBRTFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQixFQUFFO1FBQzlELFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7UUFDbkQsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRTFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSw2QkFBNkIsRUFBRTtRQUN0RSxZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO1FBQ3BELE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztRQUUxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQW1CLEVBQUU7UUFDNUQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDcEQsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztZQUNoRCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMxRCxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO1lBQ2hELFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7WUFFdkMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDekI7S0FDRjtTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkscUJBQXFCO1FBQ25ELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQixFQUNuRDtRQUNBLFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7UUFDbEQsWUFBWSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQztRQUUvQyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkseUJBQXlCLEVBQUU7UUFDbEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHNCQUFzQixFQUFFO1FBQy9ELElBQ0UsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQ3JELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFDcEQ7WUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1lBQzlDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztZQUUxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7WUFFMUMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUM5RCxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztZQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1lBRXRDLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1lBQ2pELE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztZQUUxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztLQUNGO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSx1QkFBdUIsRUFBRTtRQUNoRSxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1FBQy9DLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztRQUUxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksa0NBQWtDLEVBQUU7UUFDM0UsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUM5QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHlCQUF5QixFQUFFO1FBQ2xFLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7UUFDaEQsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRTFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxxQkFBcUI7UUFDbkQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksdUJBQXVCLEVBQ3JEO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztRQUNoRCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDekI7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9