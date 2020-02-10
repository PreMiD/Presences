var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "663151599924936714",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
    else if (path.includes('/support/get/')) {
        presenceData.details = "Destek talebine bakıyor:";
        presenceData.state = document.querySelector('body > div > div > div > div > div > div > div > div > div > h2 ').textContent;
    }
    else if (path === "/support") {
        presenceData.details = "Destek taleplerine bakıyor..";
    }
    else if (path === "/support/newTicket") {
        presenceData.details = "Destek talebi oluşturuyor..";
    }
    else if (path.includes('/products/new-product') && path.startsWith('/project/')) {
        presenceData.details = "Bir ürün oluşturuyor..";
        let form = document.forms[2];
        presenceData.smallImageKey = "project";
        presenceData.smallImageText = form[0].value;
    }
    else if (path.startsWith('/project/') && path.includes('/products/')) {
        presenceData.details = "Bir ürünü düzenliyor:";
        let form = document.forms[2];
        presenceData.smallImageKey = "project";
        presenceData.smallImageText = form[0].value;
        presenceData.state = `${form[1].value}`;
    }
    else if (path.startsWith('/project/new-project')) {
        presenceData.details = "Bir proje oluşturuyor..";
    }
    else if (path.startsWith('/project/')) {
        presenceData.details = "Bir projeyi düzenliyor:";
        presenceData.state = document.querySelector('body > div > div > div > div > div > div > div > h1 ').textContent.split('|')[0];
    }
    else if (path.includes('/verify')) {
        presenceData.details = "E-postasını doğruluyor..";
    }
    else {
        presenceData.details = "Bir sayfayı görüntülüyor..";
    }
    presence.setActivity(presenceData);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNqQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUV0QyxJQUFJLFlBQVksR0FBaUI7UUFDN0IsYUFBYSxFQUFFLFVBQVU7S0FDNUIsQ0FBQztJQUdGLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFFNUQsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO1FBRWQsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztLQUVwRDtTQUNJLElBQUksSUFBSSxLQUFLLFlBQVksRUFBRTtRQUU1QixZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO0tBRXJEO1NBRUksSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1FBRXpCLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7S0FFcEQ7U0FFSSxJQUFJLElBQUksS0FBSyxjQUFjLEVBQUU7UUFFOUIsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztLQUVyRDtTQUVJLElBQUksSUFBSSxLQUFLLFlBQVksRUFBRTtRQUU1QixZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO0tBRXJEO1NBRUksSUFBSSxJQUFJLEtBQUssYUFBYSxFQUFFO1FBRTdCLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7S0FFbkQ7U0FFSSxJQUFJLElBQUks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