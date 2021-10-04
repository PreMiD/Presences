const presence = new Presence({
  clientId: "663151599924936714"
});

presence.on("UpdateData", async () => {
  const path = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: "paybutik"
    };

  presenceData.startTimestamp = Math.floor(Date.now() / 1000);

  if (path === "/") presenceData.details = "Ana sayfada geziniyor..";
  else if (path === "/dashboard")
    presenceData.details = "Hesabını kontrol ediyor.";
  else if (path === "/orders") presenceData.details = "Siparişlerine bakıyor..";
  else if (path === "/collections")
    presenceData.details = "Tahsilatlarına bakıyor..";
  else if (path === "/user/edit")
    presenceData.details = "Bilgilerini düzenliyor..";
  else if (path === "/auth/login")
    presenceData.details = "Panele giriş yapıyor..";
  else if (path === "/auth/register") presenceData.details = "Kayıt oluyor..";
  else if (path === "/wallet")
    presenceData.details = "Cündanını görüntülüyor..";
  else if (path === "/docs") presenceData.details = "Dökümanlara bakıyor..";
  else if (path.includes("/support/get/")) {
    presenceData.details = "Destek talebine bakıyor:";
    presenceData.state = document.querySelector(
      "body > div > div > div > div > div > div > div > div > div > h2 "
    ).textContent;
  } else if (path === "/support")
    presenceData.details = "Destek taleplerine bakıyor..";
  else if (path === "/support/newTicket")
    presenceData.details = "Destek talebi oluşturuyor..";
  else if (
    path.includes("/products/new-product") &&
    path.startsWith("/project/")
  ) {
    presenceData.details = "Bir ürün oluşturuyor..";
    const [, , form] = document.forms;

    presenceData.smallImageKey = "project";
    presenceData.smallImageText = (form[0] as HTMLInputElement).value;
  } else if (path.startsWith("/project/") && path.includes("/products/")) {
    presenceData.details = "Bir ürünü düzenliyor:";
    const [, , form] = document.forms;

    presenceData.smallImageKey = "project";
    presenceData.smallImageText = (form[0] as HTMLInputElement).value;
    presenceData.state = `${(form[1] as HTMLInputElement).value}`;
  } else if (path.startsWith("/project/new-project"))
    presenceData.details = "Bir proje oluşturuyor..";
  else if (path.startsWith("/project/")) {
    presenceData.details = "Bir projeyi düzenliyor:";
    [presenceData.state] = document
      .querySelector("body > div > div > div > div > div > div > div > h1 ")
      .textContent.split("|");
  } else if (path.includes("/verify"))
    presenceData.details = "E-postasını doğruluyor..";
  else presenceData.details = "Bir sayfayı görüntülüyor..";

  presence.setActivity(presenceData);
});
