const presence = new Presence({
  clientId: "778362242710110208"
});

presence.on("UpdateData", async () => {
  const path: string = document.location.pathname,
    ayrac: string[] = path.split("/"),
    presenceData: PresenceData = {
      largeImageKey: "suratkargo"
    };
  // Hizmetlerimiz
  if (path.startsWith("/Hizmetlerimiz")) {
    presenceData.details = "Ürün ve Hizmetler:";
    if (ayrac[2] === "SuratGlobal") {
      presenceData.state = "Sürat Global";
      presenceData.startTimestamp = Date.now();
    } else if (ayrac[2] === "SuratGonderAl") {
      presenceData.state = "Sürat Gönder-Al";
      presenceData.startTimestamp = Date.now();
    } else if (ayrac[2] === "SuratTahsilatli") {
      presenceData.state = "Sürat Tahsilatlı";
      presenceData.startTimestamp = Date.now();
    } else if (ayrac[2] === "SuratKrediliKargo") {
      presenceData.state = "Sürat Kredili Kargo";
      presenceData.startTimestamp = Date.now();
    } else if (ayrac[2] === "SuratBilgilendirme") {
      presenceData.state = "Sürat Bilgilendirme";
      presenceData.startTimestamp = Date.now();
    } else if (ayrac[2] === "SuratAmbalaj") {
      presenceData.state = "Sürat Ambalaj";
      presenceData.startTimestamp = Date.now();
    }
    // Bilgi Hizmetleri
  } else if (path.startsWith("/BilgiHizmetleri")) {
    presenceData.details = "Bilgi Hizmetleri:";
    if (ayrac[2] === "EFaturaSorgulama") {
      presenceData.state = "E-Fatura Sorgulama";
      presenceData.startTimestamp = Date.now();
    } else if (ayrac[2] === "BilgiGuvenligi") {
      presenceData.state = "Bilgi Güvenliği";
      presenceData.startTimestamp = Date.now();
    } else if (ayrac[2] === "BilgiToplumuHizmetleri") {
      presenceData.state = "Fiyatlandirma";
      presenceData.startTimestamp = Date.now();
    }
    // Kampanyalar
  } else if (path.startsWith("/Kampanyalar")) {
    presenceData.details = "Kampanyalar";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/BizeUlasin")) {
    presenceData.details = "Bize Ulaşın:";
    [, , presenceData.state] = ayrac;
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/Basvurular")) {
    presenceData.details = "Başvuru yapıyor:";
    [, , presenceData.state] = ayrac;
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/BasinKiti")) {
    presenceData.details = "Basın Kiti";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/Haberler")) {
    presenceData.details = "Haber";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/Hakkimizda")) {
    presenceData.details = "Hakkımızda";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/Felsefemiz")) {
    presenceData.details = "Misyonumuz & Vizyonumuz ";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/InsanKaynaklariPolitikamiz")) {
    presenceData.details = "İnsan Kaynakları Politikamız";
    presenceData.startTimestamp = Date.now();
  } else if (path.startsWith("/SosyalSorumlulukCalismalarimiz")) {
    presenceData.details = "Sosyal Sorumluluk Çalışmalarımız";
    presenceData.startTimestamp = Date.now();
  } else if (path === "/") {
    presenceData.details = "Ana Sayfa";
    presenceData.startTimestamp = Date.now();
  }
  presence.setActivity(presenceData);
});
