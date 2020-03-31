var presence = new Presence({
    clientId: "663151599924936714"
});
presence.on("UpdateData", async () => {
    let path = document.location.pathname;
    let presenceData = {
        largeImageKey: "paybutik"
    };
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    if (path === "/") {
        presenceData.details = "Ana sayfada geziniyor..";
    }
    else if (path === "/dashboard") {
        presenceData.details = "Hesabını kontrol ediyor.";
    }
    else if (path === "/orders") {
        presenceData.details = "Siparişlerine bakıyor..";
    }
    else if (path === "/collections") {
        presenceData.details = "Tahsilatlarına bakıyor..";
    }
    else if (path === "/user/edit") {
        presenceData.details = "Bilgilerini düzenliyor..";
    }
    else if (path === "/auth/login") {
        presenceData.details = "Panele giriş yapıyor..";
    }
    else if (path === "/auth/register") {
        presenceData.details = "Kayıt oluyor..";
    }
    else if (path === "/wallet") {
        presenceData.details = "Cündanını görüntülüyor..";
    }
    else if (path === "/docs") {
        presenceData.details = "Dökümanlara bakıyor..";
    }
    else if (path.includes("/support/get/")) {
        presenceData.details = "Destek talebine bakıyor:";
        presenceData.state = document.querySelector("body > div > div > div > div > div > div > div > div > div > h2 ").textContent;
    }
    else if (path === "/support") {
        presenceData.details = "Destek taleplerine bakıyor..";
    }
    else if (path === "/support/newTicket") {
        presenceData.details = "Destek talebi oluşturuyor..";
    }
    else if (path.includes("/products/new-product") &&
        path.startsWith("/project/")) {
        presenceData.details = "Bir ürün oluşturuyor..";
        let form = document.forms[2];
        presenceData.smallImageKey = "project";
        presenceData.smallImageText = form[0].value;
    }
    else if (path.startsWith("/project/") && path.includes("/products/")) {
        presenceData.details = "Bir ürünü düzenliyor:";
        let form = document.forms[2];
        presenceData.smallImageKey = "project";
        presenceData.smallImageText = form[0].value;
        presenceData.state = `${form[1].value}`;
    }
    else if (path.startsWith("/project/new-project")) {
        presenceData.details = "Bir proje oluşturuyor..";
    }
    else if (path.startsWith("/project/")) {
        presenceData.details = "Bir projeyi düzenliyor:";
        presenceData.state = document
            .querySelector("body > div > div > div > div > div > div > div > h1 ")
            .textContent.split("|")[0];
    }
    else if (path.includes("/verify")) {
        presenceData.details = "E-postasını doğruluyor..";
    }
    else {
        presenceData.details = "Bir sayfayı görüntülüyor..";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRXRDLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsVUFBVTtLQUMxQixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUU1RCxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7UUFDaEIsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztLQUNsRDtTQUFNLElBQUksSUFBSSxLQUFLLFlBQVksRUFBRTtRQUNoQyxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO0tBQ25EO1NBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQzdCLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7S0FDbEQ7U0FBTSxJQUFJLElBQUksS0FBSyxjQUFjLEVBQUU7UUFDbEMsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztLQUNuRDtTQUFNLElBQUksSUFBSSxLQUFLLFlBQVksRUFBRTtRQUNoQyxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO0tBQ25EO1NBQU0sSUFBSSxJQUFJLEtBQUssYUFBYSxFQUFFO1FBQ2pDLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7S0FDakQ7U0FBTSxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtRQUNwQyxZ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