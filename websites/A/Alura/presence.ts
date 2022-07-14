const presence = new Presence({
	clientId: "996859957813198990"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let title: HTMLElement

// Get Strings
async function getStrings() {
	return presence.getStrings(
	    {
			user: "general.viewUser",
			readindArticle: "general.readingArticle"
		},
			await presence.getSetting<string>("lang").catch(() => "en")
		);
	}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "default",
		details: "Browsing Alura",
		startTimestamp: browsingTimestamp
	};
	// Update language
	const newLang = await presence.getSetting<string>("lang").catch(() => "en")
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	// Courses 

	if(document.location.pathname.includes("/course") && !document.location.pathname.includes("/courses")){
		presenceData.details = "Viewing a course" // alura.viewCourse
		// Check in what course page you are, and return the same course name
		if(!document.querySelector('div.container.course-header-banner-content > div > div.hreview-aggregate > h1 > strong')){
			title = document.querySelector('section.task-menu-header > div > a > h2')
			presenceData.state = title.textContent
		}
		else{
			title = document.querySelector('div.container.course-header-banner-content > div > div.hreview-aggregate > h1 > strong')
			presenceData.state = title.textContent
		};		
		
		// Check what knowledge branch this course belongs
		if(document.querySelector('a.course-header-banner-breadcrumb__category').getAttribute("aria-label") == 'Front-end'){
			presenceData.largeImageKey= "frontend"
		}
		else if(document.querySelector('a.course-header-banner-breadcrumb__category').getAttribute("aria-label") == 'Programação'){
			presenceData.largeImageKey= "programacao"
		}
		else if(document.querySelector('a.course-header-banner-breadcrumb__category').getAttribute("aria-label") == 'DevOps'){
			presenceData.largeImageKey= "devops"
		}
		else if(document.querySelector('a.course-header-banner-breadcrumb__category').getAttribute("aria-label") == 'UX & Design'){
			presenceData.largeImageKey= "ux"
		}
		else if(document.querySelector('a.course-header-banner-breadcrumb__category').getAttribute("aria-label") == 'Data Science'){
			presenceData.largeImageKey= "datascience"
		}
		else if(document.querySelector('a.course-header-banner-breadcrumb__category').getAttribute("aria-label") == 'Mobile'){
			presenceData.largeImageKey= "mobile"
		}
		else if(document.querySelector('a.course-header-banner-breadcrumb__category').getAttribute("aria-label") == 'Inovação & Gestão'){
			presenceData.largeImageKey= "inovacao"
		}
	}	
	// Dashboard
	else if(document.location.pathname.includes("/dashboard")){
		presenceData.details = "Viewing dashboard" // alura.viewDashboard
	}
	// Training
	else if(document.location.pathname.includes("/formacao")){
		title = document.querySelector('div.formacao-header-headline > h1')
		presenceData.details = "Viewing a training" // alura.viewTraining
		presenceData.state = title.textContent
		
		// Check what knowledge branch this training belongs
		if(document.querySelector('div.formacao__info-categoria > a').textContent == 'Front-end'){
			presenceData.largeImageKey= "frontend"
		}
		else if(document.querySelector('div.formacao__info-categoria > a').textContent == 'Programação'){
			presenceData.largeImageKey= "programacao"
		}
		else if(document.querySelector('div.formacao__info-categoria > a').textContent == 'DevOps'){
			presenceData.largeImageKey= "devops"
		}
		else if(document.querySelector('div.formacao__info-categoria > a').textContent == 'UX & Design'){
			presenceData.largeImageKey= "ux"
		}
		else if(document.querySelector('div.formacao__info-categoria > a').textContent == 'Data Science'){
			presenceData.largeImageKey= "datascience"
		}
		else if(document.querySelector('div.formacao__info-categoria > a').textContent == 'Mobile'){
			presenceData.largeImageKey= "mobile"
		}
		else if(document.querySelector('div.formacao__info-categoria > a').textContent == 'Inovação & Gestão'){
			presenceData.largeImageKey= "inovacao"		
		}
	}
	// My courses 
	else if(document.location.pathname.includes("/courses")){
		presenceData.details = "Viewing my courses" // alura.viewMycourses
	}
	// User page
	else if(document.location.pathname.includes("/user")){
		if(document.querySelector('.profile-header-name') !== null){
		title = document.querySelector('.profile-header-name')
		presenceData.details = strings.user // general.viewUser
		presenceData.state = title.textContent
		}
		else{
			// Study Plans
			if(document.location.pathname.includes("/planos-de-estudo")){
				presenceData.details = "Viewing study plans" // alura.viewStudyPlans
			}
			// Payments
			else if (document.location.pathname.includes("/payments")){
				presenceData.details = "Viewing payments" // alura.viewPayments
			}
			// Ranking
			else if (document.location.pathname.includes("/rank")){
				presenceData.details = "Viewing ranking" // alura.viewRanking
			}
		}
	}
	//Aluraflix
	else if(document.location.pathname.includes("/aluraflix")){
		presenceData.largeImageKey = "aluraflix"
		presenceData.details = "Browsing Aluraflix" // alura.aluraflix
	}
	//Alura programs
		//Carreiras sem Fronteiras
	else if(document.location.pathname.includes("/carreirasemfronteiras")){
		presenceData.largeImageKey = "carreirasemfronteiras" // I accidentally misspelled the name in Developer Portal
		presenceData.details = 'Listening to "Carreiras sem Fronteiras"' // alura.carreirassemfronteiras
		if(document.querySelector('.podcast-header-title') !==null && document.querySelector('.--margin-left-image') == null){
			title = document.querySelector('.podcast-header-title')
			presenceData.state = `"${title.textContent}"`
		}
	}
		//Alura Cases
	else if(document.location.pathname.includes("/cases")){
		presenceData.largeImageKey = "aluracases"
		presenceData.details = "Watching a Case" // alura.cases
		if(document.querySelector('.intro__title') !==null && document.location.pathname.includes("/extra")){
			title = document.querySelector('.intro__title')
			presenceData.state = `"${title.textContent}"`
		}
	}
		//ScubaDev
	else if(document.location.pathname.includes("/scubadev")){
		presenceData.largeImageKey = "scubadev" 
		presenceData.details = 'Listening to "ScubaDev"' // alura.scubadev
		if(document.querySelector('.podcast-header-title') !==null && document.querySelector('.--margin-left-image') == null){
			title = document.querySelector('.podcast-header-title')
			presenceData.state = `"${title.textContent}"`
		}
	}
		//Layers.Tech
	else if(document.location.pathname.includes("/layerstech")){
		presenceData.largeImageKey = "layers" 
		presenceData.details = 'Listening to "Layers.Tech"' // alura.layerstech
		if(document.querySelector('.podcast-header-title') !==null && document.querySelector('.--margin-left-image') == null){
			title = document.querySelector('.podcast-header-title')
			presenceData.state = `"${title.textContent}"`
		}
	}
		//Like a Boss
	else if(document.location.pathname.includes("/likeaboss")){
		presenceData.largeImageKey = "likeaboss" 
		presenceData.details = 'Listening to "Like a Boss"' // alura.likeaboss
		if(document.querySelector('.podcast-header-title') !==null && document.querySelector('.--margin-left-image') == null){
			title = document.querySelector('.podcast-header-title')
			presenceData.state = `"${title.textContent}"`
		}
	}
		// Hipsters.Tech
	else if(document.location.pathname.includes("/hipsterstech")){
		presenceData.largeImageKey = "hipsters" 
		presenceData.details = 'Listening to "Hipsters.tech"' // alura.hipsterstech
		if(document.querySelector('.podcast-header-title') !==null && document.querySelector('.--margin-left-image') == null){
			title = document.querySelector('.podcast-header-title')
			presenceData.state = `"${title.textContent}"`
		}
	}
	// Alura+
	else if(document.location.pathname.includes("/alura-mais")){
		presenceData.largeImageKey = "aluramais"
		presenceData.details = "Browsing Alura+" // alura.aluramais
	}
	// Trainings
	else if(document.location.pathname.includes("/formacoes")){
		presenceData.details = "Browsing trainings" // alura.browseTrainings
	}
	// Immersions
	else if(document.location.pathname.includes("/imersoes")){
		presenceData.details = "Viewing immersions" // alura.viewImmersions
	}
	// Podcasts
	else if(document.location.pathname.includes("/podcasts")){
		presenceData.details = "Browsing podcasts" // alura.browsePodcasts
	}
	// Recommendations
	else if(document.location.pathname.includes("/recommendations")){
		presenceData.details = "Viewing recommendations" // alura.viewRecommendations
	}
	// Forum
	else if(document.location.pathname.includes("/forum") && !document.location.pathname.includes("/topico-")){
		presenceData.details = "Browsing forums" // alura.browseForums
	}
		// Reading topic
	else if(document.location.pathname.includes("/forum") && document.location.pathname.includes("/topico-")){
		title = document.querySelector('.topic-header-container-title')
		presenceData.details = "Reading a topic" // alura.readingTopic
		presenceData.state = `"${title.textContent}"`
	}	
	// Public study plans
	else if(document.location.pathname.includes("/planos-estudos-publicos")){
		presenceData.details = "Browsing public study plans" // alura.browsePublicStudyPlans
	}	
	// Points 
	else if(document.location.pathname.includes("/points")){
		presenceData.details = "Viewing points" // alura.viewingPoints
	}	

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
