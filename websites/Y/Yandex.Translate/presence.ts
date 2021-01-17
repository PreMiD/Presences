const presence = new Presence({
    clientId: "799583813582848041"
}), browsingStamp: number = Math.floor(Date.now() / 1000);

<<<<<<< HEAD
let from: string, to: string, typet: string;
=======
function languageCode(language: string): string {
    switch (language) {
        case "af":
            return "Afrikaans";
        case "sq":
            return "Albanian";
        case "am":
            return "Amharic";
        case "ar":
            return "Arabic";
        case "hy":
            return "Armenian";
        case "az":
            return "Azerbaijani";
        case "ba":
            return "Bashkir";
        case "eu":
            return "Basque";
        case "be":
            return "Belarusian";
        case "bn":
            return "Bengali";
        case "bs":
            return "Bosnian";
        case "bg": 
            return "Bulgarian";
        case "my":
            return "Burmerse";
        case "ca":
            return "Catalan";
        case "ceb":
            return "Cebuano";
        case "zh":
            return "Chinese";
        case "cv":
            return "Chuvash";
        case "hr":
            return "Croatian";
        case "cs":
            return "Czech";
        case "da":
            return "Danish";
        case "nl":
            return "Dutch";
        case "sjn":
            return "Elvish (Sindarin)";
        case "emj":
            return "Emoji";
        case "en":
            return "English";
        case "eo":
            return "Esperanto";
        case "et":
            return "Estonian";
        case "fi":
            return "Finnish";
        case "fr":
            return "French";
        case "gl":
            return "Galican";
        case "ka":
            return "Georgian";
        case "de":
            return "German";
        case "el":
            return "Greek";
        case "gu":
            return "Gujarati";
        case "ht":
            return "Haitian";
        case "he":
            return "Hebrew";
        case "mrj":
            return "Hill Mari";
        case "hi":
            return "Hindi";
        case "hu":
            return "Hungarian";
        case "is":
            return "Icelandic";
        case "id":
            return "Indonesian";
        case "ga":
            return "Irish";
        case "it":
            return "Italian";
        case "ja":
            return "Japanese";
        case "jv":
            return "Javanese";
        case "kn":
            return "Kannada";
        case "kk":
            return "Kazakh";
        case "kazlat":
            return "Kazakh (Latin)";
        case "km":
            return "Khmer";
        case "ko":
            return "Korean";
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
        case "mhr":
            return "Mari";
        case "mn":
            return "Mongolian";
        case "ne":
            return "Nepali";
        case "no":
            return "Norwegian";
        case "pap":
            return "Papiamento";
        case "fa":
            return "Persian";
        case "pl":
            return "Polish";
        case "pt":
            return "Portuguese"
        case "pa":
            return "Punjabi";
        case "ro":
            return "Romanian";
        case "ru":
            return "Russian";
        case "gd":
            return "Scottish Gaelic";
        case "sr":
            return "Serbian";
        case "si":
            return "Sinhalese";
        case "sk":
            return "Slovak";
        case "sl":
            return "Slovenian";
        case "es":
            return "Spanish";
        case "su":
            return "Sundanese";   
        case "sw":
            return "Swahili";
        case "sv":
            return "Swedish";
        case "tl":
            return "Tagalog";
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
        case "udm":
            return "Udmurt";
        case "uk":
            return "Ukrainian";
        case "ur":
            return "Urdu";
        case "uz":
            return "Uzbek";
        case "uzbcyr":
            return "Uzbek (Cyrillic)"
        case "vi":
            return "Vietnamese";
        case "cy":
            return "Welsh";
        case "xh":
            return "Xhosa";
        case "sah":
            return "Yakut";
        case "yi":
            return "Yiddish";
        case "Choosing...":
            return "Choosing...";
        default:
            return "Detecting";
    }
}

const browsingStamp: number = Math.floor(Date.now() / 1000);
let type: string, from: string, to: string, typet: string;
>>>>>>> parent of 5a77812... Removed redundant function

presence.on("UpdateData", async () => {

    const presenceData: PresenceData = {
        largeImageKey: "yt"
      };
    
      if (document.location.pathname == "/") {
        typet = "Text";
        from = document.querySelector("#srcLangButton").innerHTML;
        to = document.querySelector("#dstLangButton").innerHTML;
      } else if (document.location.pathname == "/translate" || document.location.pathname == "/doc" ) {
        typet = document.location.pathname == "/translate" ? "Website" : "Document";
        from = document.querySelector("#srcLangButton > #sourceLangText").innerHTML;
        to = document.querySelector("#dstLangButton > #targetLangText").innerHTML;
      } else if (document.location.pathname == "/ocr") {
<<<<<<< HEAD
        typet = "Image";
        from = document.querySelector("#sourceLangButton").innerHTML;
        to = document.querySelector("#targetLangButton").innerHTML;
=======
        typet = "Image"
        from = document.querySelector("#srcLangButton").innerHTML;
        to = document.querySelector("#dstLangButton").innerHTML;
>>>>>>> parent of 2058579... Fixed bug with showing translating image
      } else {
        typet = "Text";
        from = "Choosing...";
        to = "Choosing...";
      }
    
      const showTime: boolean = await presence.getSetting("stamp"), showType: boolean = await presence.getSetting("type");
    
      presenceData.startTimestamp = showTime ? browsingStamp : null;
      if (presenceData.startTimestamp == null) delete presenceData.startTimestamp;
    
      if (showType) {
        presenceData.details = `Translating: ${typet}`;
        presenceData.state = `From: ${from} - To: ${to}`;
      } else {
        presenceData.details = `Translating from: ${from}`;
        presenceData.state = `To: ${to}`;
      }
    
      presence.setActivity(presenceData);
});