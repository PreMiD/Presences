const presence = new Presence({
		clientId: "1193287365620400128",
	}),
	capitalize = (text: string): string => {
		return text
			.replace(/[[{(_)}\]]/g, " ")
			.split(" ")
			.map(str => {
				return str.charAt(0).toUpperCase() + str.slice(1);
			})
			.join(" ");
	};

	presence.on("UpdateData", async () => {
		const { pathname, href } = document.location;

		const presenceData: PresenceData = {
			details: "",
			state: "",
			largeImageKey: "https://i.imgur.com/9szXrvz.png"
		};

	
		let oldUrl: string;
	
		if (oldUrl !== href) {
			oldUrl = href;
		}

	
		if (pathname === "/") {
			presenceData.details = "Accueil";
			presenceData.state = "Regarde les derniers posts...";
		} else if (pathname === "/notifications") {
			presenceData.details = "Notifications";
			presenceData.state = "Regarde ses notifications...";

		} else if (pathname === "/messages") {
			presenceData.details = "Messagerie";
			presenceData.state = "Regarde ses messages...";

		} else if (pathname.includes("/users/")) {
			const userArobase = document.querySelector("span").textContent;
			presenceData.details = "Profil de : " + userArobase;
			const userName = document.querySelector("h1").textContent;
			presenceData.state = `Regarde le profil de l'utilisateur ${userName}...`;
			presenceData.buttons = [{label: "Voir le profil", url: href}];

			var images = document.querySelectorAll("img");
			let imgUrl = "";
			
			for (let i = 0; i < images.length; i++) {
				// verifie si dans le bloc "Les Goats"
				const isInsideExcludedDiv = images[i].closest('.bg-neutral-800');
			
				// Vérifiez si la source (src) commence par "data:image/webp;base64", si alt est égal à "Avatar" et n'est pas à l'intérieur de l'élément exclu
				if (!isInsideExcludedDiv && images[i].src.startsWith("data:image/") && images[i].alt === "Avatar") {
					imgUrl = images[i].src;
					presenceData.smallImageKey = imgUrl;
					break;  
				}
			}
			
			// si rien trouvé
			if (imgUrl == "") {
				presenceData.largeImageKey = "https://www.cacax.fun/_next/image?url=%2Fimages%2Fplaceholder.png&w=1920&q=75";
			} else {
				presenceData.largeImageKey = imgUrl;
			}
			presenceData.smallImageKey = "https://i.imgur.com/9szXrvz.png";

		} else if (pathname === "/about") {
			presenceData.details = "À propos";
			presenceData.state = "Regarde la page à propos...";

		} else if (pathname === "/privacy") {
			presenceData.details = "Politique de confidentialité";
			presenceData.state = "Regarde la politique de confidentialité (il veur voir si on respecte le RGPD)...";

		} else if (pathname.includes("/posts/")) {
			presenceData.details = "Posts";
			const userName = document.querySelector("span").textContent;
			presenceData.state = `Regarde le post de ${userName}...`;
			presenceData.buttons = [{label: "Voir le post", url: href}];

			var images = document.querySelectorAll("img");
			let imgUrl = "";
			
			for (let i = 0; i < images.length; i++) {
				// verifie si dans le bloc "Les Goats"
				const isInsideExcludedDiv = images[i].closest('.bg-neutral-800');
				if (!isInsideExcludedDiv && images[i].src.startsWith("data:image/") && images[i].alt === "Avatar") {
					imgUrl = images[i].src;
					presenceData.smallImageKey = imgUrl;
					break;
				}
			}

			//si rien trouvé
			if (imgUrl == "") {
				presenceData.smallImageKey = "https://www.cacax.fun/_next/image?url=%2Fimages%2Fplaceholder.png&w=1920&q=75";
			} else {
				presenceData.smallImageKey = imgUrl;
			}
			presenceData.largeImageKey = "https://i.imgur.com/9szXrvz.png";
		}
		else {
			presenceData.details = "Navigue";
			presenceData.state = capitalize(pathname.split("/")[1]);
		}
	

	
		presence.setActivity(presenceData);
	});
	
