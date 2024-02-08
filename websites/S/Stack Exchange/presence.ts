const presence = new Presence({
		clientId: "919817726195814431",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	assets = {
		ai: "https://cdn.discordapp.com/app-assets/919817726195814431/920218219581689898.png?size=512",
		askubuntu:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218219615227905.png?size=512",
		alcohol:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218219816583168.png?size=512",
		apple:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218219925622804.png?size=512",
		astronomy:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218219950792704.png?size=512",
		avp: "https://cdn.discordapp.com/app-assets/919817726195814431/920218220001128458.png?size=512",
		anime:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220005306408.png?size=512",
		biology:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220017893396.png?size=512",
		br: "https://cdn.discordapp.com/app-assets/919817726195814431/920218220043042817.png?size=512",
		boardgames:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220185657384.png?size=512",
		blender:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220206620682.png?size=512",
		buddhism:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220215042088.png?size=512",
		chess:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220307292210.png?size=512",
		chinese:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220449918986.png?size=512",
		civicrm:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220521193482.png?size=512",
		chemistry:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220554764298.png?size=512",
		christianity:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220609290240.png?size=512",
		craftcms:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220701569045.png?size=512",
		codegolf:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220705751040.png?size=512",
		coffee:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220760289301.png?size=512",
		communitybuilding:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220772876359.png?size=512",
		computergraphics:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220772884511.png?size=512",
		codereview:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220827381791.png?size=512",
		cooking:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218220944834580.png?size=512",
		cs: "https://cdn.discordapp.com/app-assets/919817726195814431/920218221020323851.png?size=512",
		crafts:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218221024522271.png?size=512",
		cstheory:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218221095821363.png?size=512",
		dba: "https://cdn.discordapp.com/app-assets/919817726195814431/920218221154549760.png?size=512",
		cseducators:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218221175504896.png?size=512",
		conlang:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218221188091944.png?size=512",
		datascience:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218221192286218.png?size=512",
		diy: "https://cdn.discordapp.com/app-assets/919817726195814431/920218221225865248.png?size=512",
		dsp: "https://cdn.discordapp.com/app-assets/919817726195814431/920218221234257971.png?size=512",
		devops:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218221259399178.png?size=512",
		economics:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218221292949565.png?size=512",
		drones:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218221351669760.png?size=512",
		drupal:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218221632712704.png?size=512",
		earthscience:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218221649481728.png?size=512",
		russian:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218223528538123.png?size=512",
		ru: "https://cdn.discordapp.com/app-assets/919817726195814431/920218223796948993.png?size=512",
		rus: "https://cdn.discordapp.com/app-assets/919817726195814431/920218223864082433.png?size=512",
		scicomp:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218223973113886.png?size=512",
		salesforce:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224006660116.png?size=512",
		sitecore:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224031825921.png?size=512",
		sports:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224048631829.png?size=512",
		space:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224107327541.png?size=512",
		scifi:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224111525908.png?size=512",
		serverfault:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224153481216.png?size=512",
		superuser:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224233185321.png?size=512",
		sharepoint:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224237350922.png?size=512",
		tor: "https://cdn.discordapp.com/app-assets/919817726195814431/920218224254156811.png?size=512",
		vi: "https://cdn.discordapp.com/app-assets/919817726195814431/920218224266711061.png?size=512",
		softwareengineering:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224275116062.png?size=512",
		stackoverflow:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224287678495.png?size=512",
		skeptics:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224300261426.png?size=512",
		ukrainian:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224312844291.png?size=512",
		stellar:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224329654273.png?size=512",
		softwarerecs:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224342233138.png?size=512",
		security:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224363192370.png?size=512",
		sound:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224375791646.png?size=512",
		sqa: "https://cdn.discordapp.com/app-assets/919817726195814431/920218224384155658.png?size=512",
		spanish:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224434483210.png?size=512",
		stackapps:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224434487307.png?size=512",
		tex: "https://cdn.discordapp.com/app-assets/919817726195814431/920218224501592074.png?size=512",
		stats:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224505810964.png?size=512",
		tridion:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224589684746.png?size=512",
		ux: "https://cdn.discordapp.com/app-assets/919817726195814431/920218224606466088.png?size=512",
		sustainability:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224606478366.png?size=512",
		travel:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224623222804.png?size=512",
		webapps:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224660996097.png?size=512",
		tezos:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224669376542.png?size=512",
		vegetarianism:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224669388800.png?size=512",
		unix: "https://cdn.discordapp.com/app-assets/919817726195814431/920218224749068298.png?size=512",
		windowsphone:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224799399936.png?size=512",
		woodworking:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224811966464.png?size=512",
		webmasters:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224845529098.png?size=512",
		wordpress:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224887488542.png?size=512",
		writing:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224904245278.png?size=512",
		workplace:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218224937795614.png?size=512",
		worldbuilding:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218225072046100.png?size=512",
		judaism:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218249491267655.png?size=512",
		elementaryos:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218250728583239.png?size=512",
		electronics:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218250762149950.png?size=512",
		engineering:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251034787841.png?size=512",
		gamedev:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251177385995.png?size=512",
		emacs:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251202531328.png?size=512",
		fitness:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251215126589.png?size=512",
		ell: "https://cdn.discordapp.com/app-assets/919817726195814431/920218251219320862.png?size=512",
		english:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251223515156.png?size=512",
		ethereum:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251424837682.png?size=512",
		gardening:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251429040128.png?size=512",
		genealogy:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251433226310.png?size=512",
		italian:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251454185473.png?size=512",
		expressionengine:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251458404363.png?size=512",
		gaming:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251475169340.png?size=512",
		german:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251475177482.png?size=512",
		languagelearning:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251546476545.png?size=512",
		graphicdesign:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251554873344.png?size=512",
		ham: "https://cdn.discordapp.com/app-assets/919817726195814431/920218251559067668.png?size=512",
		eosio:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251571654676.png?size=512",
		law: "https://cdn.discordapp.com/app-assets/919817726195814431/920218251580043346.png?size=512",
		hermeneutics:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251605192774.png?size=512",
		iota: "https://cdn.discordapp.com/app-assets/919817726195814431/920218251617783830.png?size=512",
		hinduism:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251617796126.png?size=512",
		hsm: "https://cdn.discordapp.com/app-assets/919817726195814431/920218251634569256.png?size=512",
		hardwarerecs:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251647156264.png?size=512",
		interpersonal:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251668099102.png?size=512",
		islam:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251684888596.png?size=512",
		iot: "https://cdn.discordapp.com/app-assets/919817726195814431/920218251684896818.png?size=512",
		homebrew:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251689095219.png?size=512",
		ja: "https://cdn.discordapp.com/app-assets/919817726195814431/920218251710042142.png?size=512",
		gis: "https://cdn.discordapp.com/app-assets/919817726195814431/920218251751981076.png?size=512",
		history:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251772956692.png?size=512",
		joomla:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251831693362.png?size=512",
		japanese:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251852648458.png?size=512",
		lifehacks:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251903008788.png?size=512",
		latin:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251907182673.png?size=512",
		linguistics:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218251915583498.png?size=512",
		math: "https://cdn.discordapp.com/app-assets/919817726195814431/920218252016238612.png?size=512",
		matheducators:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218252095938590.png?size=512",
		magento:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920218252121112606.png?size=512",
		stackexchange:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920219713928310824.png?size=512",
		"3dprinting":
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233775860953149.png?size=512",
		academia:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776079061033.png?size=512",
		aviation:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776217464882.png?size=512",
		arduino:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776230039552.png?size=512",
		bitcoin:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776326524968.png?size=512",
		bicycles:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776360075265.png?size=512",
		bricks:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776397819946.png?size=512",
		android:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776422989915.png?size=512",
		medicalsciences:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776439758869.png?size=512",
		bioinformatics:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776443965451.png?size=512",
		cardano:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776578179083.png?size=512",
		literature:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776599150612.png?size=512",
		korean:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776624316416.png?size=512",
		expatriates:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776653672499.png?size=512",
		crypto:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776653680681.png?size=512",
		musicfans:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776683049013.png?size=512",
		french:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776691421195.png?size=512",
		meta: "https://cdn.discordapp.com/app-assets/919817726195814431/920233776712417312.png?size=512",
		martialarts:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776724987944.png?size=512",
		monero:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776766939156.png?size=512",
		esperanto:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776792104960.png?size=512",
		mechanics:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776796282920.png?size=512",
		parenting:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776796295169.png?size=512",
		es: "https://cdn.discordapp.com/app-assets/919817726195814431/920233776800481300.png?size=512",
		ebooks:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776800493619.png?size=512",
		opensource:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776804683777.png?size=512",
		mythology:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776838238208.png?size=512",
		opendata:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776859213844.png?size=512",
		or: "https://cdn.discordapp.com/app-assets/919817726195814431/920233776880168970.png?size=512",
		outdoors:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776896966696.png?size=512",
		freelancing:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233776989241374.png?size=512",
		mattermodeling:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233777157001257.png?size=512",
		music:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920233777211531264.png?size=512",
		mathoverflow:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920235543302901801.png?size=512",
		mathematica:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920235543361642496.png?size=512",
		money:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920235705005928448.png?size=512",
		movies:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920235705073012757.png?size=512",
		networkengineering:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920235813625790484.png?size=512",
		philosophy:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236034632060939.png?size=512",
		pm: "https://cdn.discordapp.com/app-assets/919817726195814431/920236034665615381.png?size=512",
		politics:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236034690785291.png?size=512",
		poker:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236034703360021.png?size=512",
		photo:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236034715975730.png?size=512",
		pets: "https://cdn.discordapp.com/app-assets/919817726195814431/920236034741137418.png?size=512",
		portuguese:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236034854363146.png?size=512",
		patents:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236034866966528.png?size=512",
		psychology:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236034887917578.png?size=512",
		physics:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236034925658122.png?size=512",
		retrocomputing:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236034938269716.png?size=512",
		rpg: "https://cdn.discordapp.com/app-assets/919817726195814431/920236034967621682.png?size=512",
		robotics:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236034971824138.png?size=512",
		puzzling:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236034980200458.png?size=512",
		reverseengineering:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236035005382657.png?size=512",
		quant:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236035026345994.png?size=512",
		raspberrypi:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236035366064148.png?size=512",
		quantumcomputing:
			"https://cdn.discordapp.com/app-assets/919817726195814431/920236035437371403.png?size=512",
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/S/Stack%20Exchange/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname, href } = window.location,
		showButtons = await presence.getSetting<boolean>("buttons");

	switch (hostname) {
		case "stackexchange.com": {
			presenceData.details = "Browsing";
			break;
		}
		case "serverfault.com": {
			presenceData.largeImageKey = assets.serverfault;
			presenceData.details = "Server Fault";
			break;
		}
		case "meta.serverfault.com": {
			presenceData.largeImageKey = assets.serverfault;
			presenceData.details = "Server Fault Meta";
			break;
		}
		case "superuser.com": {
			presenceData.largeImageKey = assets.superuser;
			presenceData.details = "Super User";
			break;
		}
		case "meta.superuser.com": {
			presenceData.largeImageKey = assets.superuser;
			presenceData.details = "Super User Meta";
			break;
		}
		default: {
			const imageKey = hostname.replace(".stackexchange.com", "");
			if (imageKey === "meta") presenceData.smallImageKey = assets[imageKey];
			else {
				presenceData.smallImageKey =
					assets[imageKey.replace(".meta", "") as keyof typeof assets];
			}

			presenceData.smallImageText = document
				.querySelector("meta[property='og:site_name']")
				.getAttribute("content")
				.replace("Stack Exchange", "");
			if (pathname.includes("/questions")) {
				presenceData.details = "Reading a question";
				presenceData.buttons = [
					{
						label: "View Question",
						url: href,
					},
				];
			}
		}
	}

	if (pathname === "/") {
		if (
			[
				"serverfault.com",
				"meta.serverfault.com",
				"superuser.com",
				"meta.superuser.com",
			].includes(hostname)
		)
			presenceData.state = "Main Page";
		else presenceData.details = "Main Page";
	} else if (pathname.includes("/questions")) {
		presenceData.state = document.querySelector(
			".question-hyperlink"
		).textContent;
	} else if (
		[
			"serverfault.com",
			"meta.serverfault.com",
			"superuser.com",
			"meta.superuser.com",
		].includes(hostname)
	)
		presenceData.state = "Browsing";
	else presenceData.details = "Browsing";

	if (!showButtons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
