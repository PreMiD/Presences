const presence = new Presence({
		clientId: "876055665091678228",
	}),
	time = Math.floor(Date.now() / 1000),
	pathStartsWith = (path: string): boolean => {
		return document.location.pathname.startsWith(path);
	},
	isInCourse = (): boolean => {
		return !!document.location.pathname.match(
			/\/courses\/[\w-_]{1,}\/[\w-_]{1,}/g
		);
	};
function setCourseInfo() {
	// Sets course info from page
	if (pathStartsWith("/courses")) {
		if (isInCourse()) {
			courseName = document.querySelectorAll("h4")[0].textContent;
			[courseCompletion] = document
				.querySelectorAll(".whitespace-pre-wrap")[0]
				.querySelectorAll("span")[0]
				.textContent.split("%");
			const [lessonEl] = document
					.querySelectorAll(".bePFDW")[0]
					.querySelectorAll("span"),
				lesson = lessonEl.textContent,
				chapter = lessonEl
					.closest(".CollectionSidebarCategory-sc-15b6owa-0")
					.querySelectorAll("h5")[0].textContent;
			chapterName = chapter + lesson && chapter ? " - " : `${lesson}`;
		} else courseName = document.querySelectorAll("h1")[0].textContent;
	}
}

let courseName: string, chapterName: string, courseCompletion: string;

setInterval(setCourseInfo, 2000);

/* eslint-disable camelcase */
const assets = {
	number_7:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002338832425.png?size=512",
	number_3:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002632433664.png?size=512",
	number_1:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002674368562.png?size=512",
	number_0:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002691158116.png?size=512",
	number_6:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002716307456.png?size=512",
	number_2:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002728878161.png?size=512",
	number_4:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002754043914.png?size=512",
	number_5:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002804396092.png?size=512",
	number_8:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002854715432.png?size=512",
	number_18:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002871492609.png?size=512",
	number_10:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002875691028.png?size=512",
	number_11:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002884096030.png?size=512",
	number_14:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002917634101.png?size=512",
	number_16:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002921820210.png?size=512",
	number_13:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170002938597377.png?size=512",
	number_12:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003014103060.png?size=512",
	number_24:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003035066399.png?size=512",
	number_21:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003060256788.png?size=512",
	number_17:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003093815326.png?size=512",
	number_15:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003139948564.png?size=512",
	number_25:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003190276126.png?size=512",
	number_9:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003215429682.png?size=512",
	number_22:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003228016751.png?size=512",
	number_27:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003278356500.png?size=512",
	number_19:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003307712592.png?size=512",
	number_33:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003399970856.png?size=512",
	number_41:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003454500885.png?size=512",
	number_34:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003479687178.png?size=512",
	number_31:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003500638218.png?size=512",
	number_42:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003706171392.png?size=512",
	number_45:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003764871268.png?size=512",
	number_44:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003764899890.png?size=512",
	number_37:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003769098300.png?size=512",
	number_40:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003827798026.png?size=512",
	number_43:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003848757258.png?size=512",
	number_47:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003894894602.png?size=512",
	number_51:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003907489873.png?size=512",
	number_32:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003911684106.png?size=512",
	number_49:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170003970420766.png?size=512",
	number_54:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170004037521508.png?size=512",
	number_56:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170004050083891.png?size=512",
	number_59:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170004180111472.png?size=512",
	number_61:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170004234633237.png?size=512",
	number_60:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170004301754420.png?size=512",
	number_55:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170004385632276.png?size=512",
	number_57:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170004410798190.png?size=512",
	number_52:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170004414992394.png?size=512",
	number_64:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170004553433129.png?size=512",
	number_66:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170004612124712.png?size=512",
	number_67:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170004771512320.png?size=512",
	number_100:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170007220990072.png?size=512",
	number_23:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170199911518229.png?size=512",
	number_35:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200066711613.png?size=512",
	number_26:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200179933184.png?size=512",
	number_20:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200213508156.png?size=512",
	number_28:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200280608808.png?size=512",
	number_46:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200398045184.png?size=512",
	number_73:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200649715793.png?size=512",
	number_62:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200653889556.png?size=512",
	number_75:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200670674987.png?size=512",
	number_38:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200834277406.png?size=512",
	number_74:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200851030067.png?size=512",
	number_48:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200888791050.png?size=512",
	number_72:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200901386300.png?size=512",
	number_36:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200918155285.png?size=512",
	number_77:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200926539807.png?size=512",
	number_29:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200960090142.png?size=512",
	number_39:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170200968470569.png?size=512",
	number_78:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201018798100.png?size=512",
	number_79:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201056542811.png?size=512",
	number_71:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201119485992.png?size=512",
	number_81:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201186578452.png?size=512",
	number_30:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201199157249.png?size=512",
	number_76:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201257881650.png?size=512",
	number_87:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201295642624.png?size=512",
	number_70:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201413091419.png?size=512",
	number_91:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201517948939.png?size=512",
	number_84:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201538916372.png?size=512",
	number_94:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201727643688.png?size=512",
	number_88:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201740238929.png?size=512",
	number_58:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201769594882.png?size=512",
	number_63:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201861857281.png?size=512",
	number_82:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201882841119.png?size=512",
	number_69:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201903804477.png?size=512",
	number_50:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201962532954.png?size=512",
	number_97:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170201979318332.png?size=512",
	number_99:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202021236806.png?size=512",
	number_80:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202096730142.png?size=512",
	number_86:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202121904128.png?size=512",
	number_53:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202121908235.png?size=512",
	number_85:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202168033340.png?size=512",
	number_92:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202193211423.png?size=512",
	number_95:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202230968360.png?size=512",
	number_98:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202235162624.png?size=512",
	number_93:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202365190185.png?size=512",
	number_90:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202415501342.png?size=512",
	number_65:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202423885824.png?size=512",
	number_68:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202461646858.png?size=512",
	number_96:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202549723167.png?size=512",
	number_83:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202549739630.png?size=512",
	number_89:
		"https://cdn.discordapp.com/app-assets/876055665091678228/876170202570686496.png?size=512",
};
/* eslint-enable camelcase */

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/E/Educative/assets/logo.png",
		startTimestamp: time,
	};

	if (pathStartsWith("/courses")) {
		presenceData.details = courseName;
		if (isInCourse()) {
			presenceData.details = courseName || "Learning";
			presenceData.state = chapterName;
			presenceData.smallImageKey =
				assets[`number_${courseCompletion}` as keyof typeof assets];
			presenceData.smallImageText = `${courseCompletion}% Complete`;
		} else presenceData.state = "Viewing course";
	} else if (pathStartsWith("/explore"))
		presenceData.details = "Exploring courses";
	else if (pathStartsWith("/mycourses")) presenceData.details = "My courses";
	else if (pathStartsWith("/learn")) presenceData.details = "Browsing homepage";
	else if (pathStartsWith("/paths")) presenceData.details = "Exploring paths";
	else if (pathStartsWith("/certificates"))
		presenceData.details = "Browsing certificates";
	else presenceData.details = "Idle";

	if (!presenceData.details) {
		presenceData.details = presenceData.state;
		delete presenceData.state;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
