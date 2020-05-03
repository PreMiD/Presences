var presence = new Presence({
    clientId: "705033229719175179"
});
function languageCode(language) {
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
const browsingStamp = Math.floor(Date.now() / 1000);
let type, from, to, typet;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "gt"
    };
    if (document.location.hash.includes("sl=")) {
        type = document.location.hash.split("&")[1];
        from = document.location.hash.split("&")[2].replace("sl=", "");
        to = document.location.hash.split("&")[3].replace("tl=", "");
        if (type.replace("op=", "") === "translate") {
            typet = "Text";
        }
        if (type.replace("op=", "") === "docs") {
            typet = "Documents";
        }
    }
    else {
        typet = "Text";
        from = "Detecting";
        to = "Choosing...";
    }
    const showTime = await presence.getSetting("stamp");
    presenceData.startTimestamp = showTime ? browsingStamp : null;
    if (presenceData.startTimestamp == null)
        delete presenceData.startTimestamp;
    const showType = await presence.getSetting("type");
    if (showType) {
        presenceData.details = `Translating: ${typet}`;
        presenceData.state = `From: ${languageCode(from)} - To: ${languageCode(to)}`;
    }
    else {
        presenceData.details = `Translating from: ${languageCode(from)}`;
        presenceData.state = `To: ${languageCode(to)}`;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsWUFBWSxDQUFDLFFBQWdCO0lBQ3BDLFFBQVEsUUFBUSxFQUFFO1FBQ2hCLEtBQUssSUFBSTtZQUNQLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLEtBQUssSUFBSTtZQUNQLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLEtBQUssSUFBSTtZQUNQLE9BQU8sVUFBVSxDQUFDO1FBQ3BCLEtBQUssSUFBSTtZQUNQLE9BQU8sU0FBUyxDQUFDO1FBQ25CLEtBQUssSUFBSTtZQUNQLE9BQU8sVUFBVSxDQUFDO1FBQ3BCLEtBQUssSUFBSTtZQUNQLE9BQU8sYUFBYSxDQUFDO1FBQ3ZCLEtBQUssSUFBSTtZQUNQLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLEtBQUssSUFBSTtZQUNQLE9BQU8sYUFBYSxDQUFDO1FBQ3ZCLEtBQUssSUFBSTtZQUNQLE9BQU8sU0FBUyxDQUFDO1FBQ25CLEtBQUssSUFBSTtZQUNQLE9BQU8sU0FBUyxDQUFDO1FBQ25CLEtBQUssSUFBSTtZQUNQLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLEtBQUssSUFBSTtZQUNQLE9BQU8sU0FBUyxDQUFDO1FBQ25CLEtBQUssS0FBSztZQUNSLE9BQU8sU0FBUyxDQUFDO1FBQ25CLEtBQUssSUFBSTtZQUNQLE9BQU8sVUFBVSxDQUFDO1FBQ3BCLEtBQUssSUFBSTtZQUNQLE9BQU8sU0FBUyxDQUFDO1FBQ25CLEtBQUssSUFBSTtZQUNQLE9BQU8sVUFBVSxDQUFDO1FBQ3BCLEtBQUssSUFBSTtZQUNQLE9BQU8sU0FBUyxDQUFDO1FBQ25CLEtBQUssSUFBSTtZQUNQLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLEtBQUssSUFBSTtZQUNQLE9BQU8sUUFB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TyxXQUFXLENBQUM7UUFDckIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxjQUFjLENBQUM7UUFDeEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxRQUFRLENBQUM7UUFDbEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxTQUFTLENBQUM7UUFDbkIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxRQUFRLENBQUM7UUFDbEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxZQUFZLENBQUM7UUFDdEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxTQUFTLENBQUM7UUFDbkIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxVQUFVLENBQUM7UUFDcEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxTQUFTLENBQUM7UUFDbkIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxRQUFRLENBQUM7UUFDbEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxjQUFjLENBQUM7UUFDeEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxTQUFTLENBQUM7UUFDbkIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxTQUFTLENBQUM7UUFDbkIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxRQUFRLENBQUM7UUFDbEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxTQUFTLENBQUM7UUFDbkIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxRQUFRLENBQUM7UUFDbEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxXQUFXLENBQUM7UUFDckIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxRQUFRLENBQUM7UUFDbEIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxTQUFTLENBQUM7UUFDbkIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxXQUFXLENBQUM7UUFDckIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxTQUFTLENBQUM7UUFDbkIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxTQUFTLENBQUM7UUFDbkIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxPQUFPLENBQUM7UUFDakIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxPQUFPLENBQUM7UUFDakIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxPQUFPLENBQUM7UUFDakIsS0FBSyxJQUFJO1lBQ1AsT0FB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