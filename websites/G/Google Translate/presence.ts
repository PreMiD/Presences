const presence = new Presence({
  clientId: "705033229719175179"
});

function languageCode(language: string): string {
  switch (language) {
    case "ar":
      return "Arabic";
    case "af":
      return "Afrikaans";
    case "sq":
      return "Albanian";
    case "am":
      return "Amharic";
    case "hy":
      return "Armenian";
    case "az":
      return "Azerbaijani";
    case "eu":
      return "Basque";
    case "be":
      return "Belarussian";
    case "bn":
      return "Bengali";
    case "bs":
      return "Bosnian";
    case "bg":
      return "Bulgarian";
    case "cl":
      return "Catalan";
    case "ceb":
      return "Cebuano";
    case "ny":
      return "Chichewa";
    case "zh":
      return "Chinese";
    case "co":
      return "Corsican";
    case "hr":
      return "Croatin";
    case "cs":
      return "Czech";
    case "da":
      return "Danish";
    case "nl":
      return "Dutch";
    case "en":
      return "English";
    case "eo":
      return "Esperanto";
    case "et":
      return "Estonian";
    case "tl":
      return "Filipino";
    case "fi":
      return "Finnish";
    case "fr":
      return "French";
    case "fy":
      return "Frisian";
    case "gl":
      return "Galician";
    case "ka":
      return "Georgian";
    case "de":
      return "German";
    case "el":
      return "Greek";
    case "gu":
      return "Gujarati";
    case "ht":
      return "Haitian Creole";
    case "ha":
      return "Hausa";
    case "haw":
      return "Hawaiian";
    case "iw":
      return "Hebrew";
    case "hi":
      return "Hindi";
    case "hmn":
      return "Hmong";
    case "hu":
      return "Hungarian";
    case "is":
      return "Icelandic";
    case "ig":
      return "Igbo";
    case "id":
      return "Indonesian";
    case "ga":
      return "Irish";
    case "it":
      return "Italian";
    case "jp":
      return "Japanese";
    case "jw":
      return "Javanese";
    case "kn":
      return "Kannada";
    case "kk":
      return "Kazakh";
    case "km":
      return "Khmer";
    case "rw":
      return "Kinyarwanda";
    case "ko":
      return "Korean";
    case "ku":
      return "Kurdish (Kurmanji)";
    case "ky":
      return "Kyrgyz";
    case "lo":
      return "Lao";
    case "la":
      return "Latin";
    case "lv":
      return "Latvian";
    case "lt":
      return "Lithuanian";
    case "lb":
      return "Luxembourgish";
    case "mk":
      return "Macedonian";
    case "mg":
      return "Malagasy";
    case "ms":
      return "Malay";
    case "ml":
      return "Malayalam";
    case "mt":
      return "Maltese";
    case "mi":
      return "Maori";
    case "mr":
      return "Marathi";
    case "mn":
      return "Mongolian";
    case "my":
      return "Myanmar (Burmese)";
    case "ne":
      return "Nepali";
    case "no":
      return "Norwegian";
    case "or":
      return "Odia (Oriya)";
    case "ps":
      return "Pashto";
    case "fa":
      return "Persian";
    case "pl":
      return "Polish";
    case "pt":
      return "Portuguese";
    case "pa":
      return "Punjabi";
    case "ro":
      return "Romanian";
    case "ru":
      return "Russian";
    case "sm":
      return "Samoan";
    case "gd":
      return "Scots Gaelic";
    case "sr":
      return "Serbian";
    case "st":
      return "Sesotho";
    case "sd":
      return "Sindhi";
    case "si":
      return "Sinhala";
    case "sk":
      return "Slovak";
    case "sl":
      return "Slovenian";
    case "so":
      return "Somali";
    case "es":
      return "Spanish";
    case "su":
      return "Sundanese";
    case "sw":
      return "Swahili";
    case "sv":
      return "Swedish";
    case "tg":
      return "Tajik";
    case "ta":
      return "Tamil";
    case "tt":
      return "Tatar";
    case "te":
      return "Telugu";
    case "th":
      return "Thai";
    case "tr":
      return "Turkish";
    case "tk":
      return "Turkmen";
    case "uk":
      return "Ukrainian";
    case "ur":
      return "Urdu";
    case "ug":
      return "Uyghur";
    case "uz":
      return "Uzbek";
    case "vi":
      return "Vietnamese";
    case "cy":
      return "Welsh";
    case "xh":
      return "Xhosa";
    case "yi":
      return "Yiddish";
    case "yo":
      return "Yoruba";
    case "zu":
      return "Zulu";
    case "Choosing...":
      return "Choosing...";
    default:
      return "Detecting";
  }
}

const browsingStamp: number = Math.floor(Date.now() / 1000);
let type: string, from: string, to: string, typet: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "gt"
  };

  if (document.location.search.includes("sl=")) {
    type = document.location.search.split("&")[3];
    from = document.location.search.split("&")[0].replace("?sl=", "");
    to = document.location.search.split("&")[1].replace("tl=", "");
    if (type.replace("op=", "") === "translate") {
      typet = "Text";
    }
    if (type.replace("op=", "") === "docs") {
      typet = "Documents";
    }
  } else {
    typet = "Text";
    from = "Detecting";
    to = "Choosing...";
  }

  const showTime: boolean = await presence.getSetting("stamp");

  presenceData.startTimestamp = showTime ? browsingStamp : null;
  if (presenceData.startTimestamp == null) delete presenceData.startTimestamp;

  const showType: boolean = await presence.getSetting("type");

  if (showType) {
    presenceData.details = `Translating: ${typet}`;
    presenceData.state = `From: ${languageCode(from)} - To: ${languageCode(
      to
    )}`;
  } else {
    presenceData.details = `Translating from: ${languageCode(from)}`;
    presenceData.state = `To: ${languageCode(to)}`;
  }

  presence.setActivity(presenceData);
});
