const presence = new Presence({
    clientId: "834628404233240628"
  }),
  estimatedTime = Math.floor(Date.now() / 1000);

let categoriesEventListener = false,
  activeCategory = "";

const stripPlatziProfileFlags = (url: string) => {
    return url
      .replace("https://static.platzi.com/media/flags/", "")
      .replace(".png", "");
  },
  setPresenceFromEvent = (learning_path: string) => {
    activeCategory = learning_path;
  };

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "lg-dark"
    },
    pathname = document.location.pathname;

  if (pathname.includes("/home")) {
    const SearchInputs: NodeListOf<HTMLInputElement> =
        document.querySelectorAll(".SearchBar input"),
      InputValues: string[] = [...SearchInputs]
        .map((input) => input.value)
        .filter(Boolean);

    presenceData.state = "Página de inicio";

    if (InputValues.length > 0) {
      const rp: string = InputValues[0].replace(/[ ]/gi, "");

      presenceData.state = "Página de inicio";

      if (rp !== "") {
        presenceData.details = "Página de inicio";
        presenceData.state = `Buscando: ${InputValues[0]}`;
      }
    }
  } else if (pathname.includes("/blog/buscar")) {
    const Input: HTMLInputElement = document.querySelector(".Search-input"),
      BlogPage: HTMLElement = document.querySelector(
        "a.Pagination-number.is-current"
      );

    presenceData.details = "Viendo el Blog";

    if (Input.value) {
      const rp: string = Input.value.replace(/[ ]/gi, "");

      presenceData.state = "Viendo el Blog";

      if (BlogPage) presenceData.state = `Página ${BlogPage.textContent}`;

      if (rp !== "") {
        BlogPage
          ? (presenceData.state = `Buscando: ${Input.value} [Pagina ${BlogPage.textContent}]`)
          : (presenceData.state = `Buscando: ${Input.value}`);
      }
    } else if (BlogPage) presenceData.state = `Página ${BlogPage.textContent}`;
  } else if (pathname.startsWith("/blog/")) {
    presenceData.details = "Viendo el Blog";

    const splittedPathname: string[] = pathname.split("/").filter(Boolean);

    if (splittedPathname.length > 1) {
      const ArticleTitle: HTMLHeadingElement = document.querySelector(
          ".Discussion-title h1"
        ),
        ArticleOwner: HTMLAnchorElement = document.querySelector(
          ".DiscussionInfo-user a"
        ),
        ArticleOwnerPoints: HTMLSpanElement = document.querySelector(
          ".DiscussionInfo span"
        ),
        ArticleDate: HTMLParagraphElement = document.querySelector(
          ".DiscussionInfo-time"
        );

      presenceData.details = `Blog: ${ArticleTitle.textContent}`;
      presenceData.state = `de ${ArticleOwner.textContent} [${ArticleOwnerPoints.textContent} pts] ${ArticleDate.textContent}`;
      presenceData.buttons = [
        { label: "Ver el Artículo", url: `https://platzi.com${pathname}` }
      ];
    }
  } else if (pathname.startsWith("/foro/")) {
    const Input: HTMLInputElement = document.querySelector(
        ".CustomSearchInput-search-input"
      ),
      ForumPage: HTMLAnchorElement = document.querySelector(
        ".Paginator-number.is-current"
      );

    presenceData.details = "Viendo el Foro";

    if (Input.value) {
      const rp: string = Input.value.replace(/[ ]/gi, "");

      presenceData.state = "Viendo el Foro";

      if (ForumPage) presenceData.state = `Página ${ForumPage.textContent}`;

      if (rp !== "") {
        ForumPage
          ? (presenceData.state = `Buscando: ${Input.value} [Pagina ${ForumPage.textContent}]`)
          : (presenceData.state = `Buscando: ${Input.value}`);
      }
    } else if (ForumPage)
      presenceData.state = `Página ${ForumPage.textContent}`;
  } else if (pathname.startsWith("/precios/")) {
    presenceData.state = `Viendo los planes de compra`;
  } else if (pathname.startsWith("/empresas/")) {
    presenceData.state = `Viendo el plan para empresas`;
  } else if (pathname.startsWith("/comprar/")) {
    const planName = document.querySelector(".Details-name");

    presenceData.details = "Comprando un plan...";
    presenceData.state = planName.textContent;
  } else if (pathname.startsWith("/clases/notificaciones/")) {
    presenceData.details = `Viendo sus notificaciones`;

    const NotificationPage = document.querySelector(
      ".Paginator-number.is-current"
    );

    if (NotificationPage)
      presenceData.state = `Página ${NotificationPage.textContent}`;
  } else if (pathname.startsWith("/p/")) {
    const UserFullName: HTMLElement = document.querySelector(
        ".ProfileHeader-name"
      ),
      UserPoints: HTMLElement = document.querySelector(
        ".ProfileScore-number.is-green"
      ),
      UserFlag: HTMLElement = document.querySelector(
        "div.ProfileHeader-username > figure > img"
      ),
      UserLink: HTMLAnchorElement = document.querySelector(".UserUrl-link"),
      isUserProfile = [...document.querySelectorAll(".SingleTab")].filter(
        (tab) => tab.textContent === "Mi Portafolio"
      );

    let FinalString = "";

    FinalString += ` ${UserFullName.textContent} `;
    if (UserFlag)
      FinalString += ` ${stripPlatziProfileFlags(
        UserFlag.getAttribute("src")
      )} `;

    FinalString += ` [${UserPoints.textContent} pts] `;

    if (UserLink) {
      presenceData.buttons = [
        { label: "Link personal", url: `${UserLink.href}` }
      ];
    }

    presenceData.details = "Viendo el perfil de";

    if (isUserProfile.length > 0) presenceData.details = "Viendo su perfil";

    presenceData.state = FinalString;
  } else if (pathname == "/agenda/") {
    presenceData.state = "Viendo la Agenda";
  } else if (pathname == "/live/") {
    presenceData.state = "Viendo Platzi Live";
    presenceData.startTimestamp = estimatedTime;
    presenceData.buttons = [
      { label: "Ver Live", url: `https://platzi.com${pathname}` }
    ];
  } else if (
    pathname.includes("/clases/") &&
    pathname.split("/").filter(Boolean).length === 2
  ) {
    const course: HTMLHeadingElement = document.querySelector(
        ".CourseDetail-left-title"
      ),
      teacher: HTMLSpanElement = document.querySelector(
        ".TeacherList-full-name"
      );

    presenceData.state = `de ${teacher.textContent}`;
    presenceData.details = course.textContent;
    presenceData.buttons = [
      {
        label: "Ver curso",
        url: `https://platzi.com${pathname}`
      }
    ];
  } else if (
    pathname.includes("/clases/") &&
    pathname.split("/").filter(Boolean).length > 2 &&
    !pathname.includes("examen")
  ) {
    const course: HTMLAnchorElement = document.querySelector(
        ".Header-course-info-content a"
      ),
      episodeNameHTML: string = document.querySelector(
        ".Header-class-title h2"
      ).outerHTML,
      video: HTMLVideoElement = document.querySelector(".vjs-tech"),
      checkPause: HTMLElement = document.querySelector(".VideoPlayer > div");
    let timestamps: number[];

    const episodeNameHTMLSplitted: string[] = episodeNameHTML.split(">"),
      episodeName: string = episodeNameHTMLSplitted[1].replace("<span", ""),
      actualEpisode: string = episodeNameHTMLSplitted[2].replace(/[<!-]/gi, ""),
      finalEpisode: string = episodeNameHTMLSplitted[4].replace(
        /[/<span]/gi,
        ""
      );

    presenceData.details = `${episodeName} [${actualEpisode}/ ${finalEpisode}]`;
    presenceData.state = `${course.children[0].textContent}`;
    presenceData.buttons = [
      {
        label: "Ver Curso",
        url: `https://platzi.com${course.getAttribute("href")}`
      },
      { label: "Ver Clase", url: `https://platzi.com${pathname}` }
    ];

    if (
      video !== null &&
      !isNaN(video.duration) &&
      checkPause.className.includes("vjs-playing")
    ) {
      timestamps = presence.getTimestampsfromMedia(video);

      presenceData.endTimestamp = timestamps[1];
    }
  } else if (pathname.includes("/cursos/")) {
    //NEW UI, SAME PRESENCE /CLASES/
    const pathNameSplitted: string[] = pathname.split("/").filter(Boolean);
    if (pathNameSplitted.length >= 2) {
      const course: HTMLHeadingElement = document.querySelector(
          ".Hero-content-title"
        ),
        teacher: HTMLElement = document.querySelector(
          ".Hero-teacher-name strong"
        );

      presenceData.state = `de ${teacher.textContent}`;
      presenceData.details = course.textContent;
    } else {
      presenceData.state = "Buscando cursos...";
      presenceData.startTimestamp = estimatedTime;
    }
  } else if (pathname.includes("/categorias/")) {
    const pathNameSplitted: string[] = pathname.split("/").filter(Boolean);
    if (pathNameSplitted.length >= 2) {
      const categoryTitle: HTMLSpanElement = document.querySelector(
          ".HeroCoursesItem-title span"
        ),
        learningPaths: NodeListOf<HTMLAnchorElement> =
          document.querySelectorAll(".LearningPathItem");
      presenceData.state = categoryTitle.textContent;
      presenceData.details = activeCategory;

      if (activeCategory !== "") presenceData.details = activeCategory;

      if (!categoriesEventListener) {
        learningPaths.forEach((learning_path) => {
          learning_path.addEventListener("mouseover", () =>
            setPresenceFromEvent(learning_path.querySelector("h2").textContent)
          );
        });
        categoriesEventListener = true;
      }
    }
  } else if (pathname.includes("/tutoriales/")) {
    const CourseName: HTMLAnchorElement = document.querySelector(
      ".Breadcrumb-desktop span:nth-child(2) a"
    );

    presenceData.details = CourseName.textContent;
    presenceData.state = "Viendo un tutorial...";
  } else if (pathname.split("/").filter(Boolean).includes("examen")) {
    if (pathname.includes("tomar_examen")) {
      const CourseName: HTMLHeadingElement = document.querySelector(
          ".ExamProgress-top-title"
        ),
        QuestionNumbers: string[] = document
          .querySelector(".ExamProgress-top-count > span")
          .textContent.replace(/de /gi, "")
          .split(" "),
        Question: HTMLHeadingElement = document.querySelector(
          ".QuestionSelector-title"
        );

      presenceData.details = CourseName.textContent;
      presenceData.state = `${Question.textContent} [${QuestionNumbers.join(
        "-"
      )}]`;
    } else {
      if (pathname.includes("review")) {
        const CourseName: HTMLHeadingElement = document.querySelector(
          ".ExamProgress-top-title"
        );
        presenceData.details = CourseName.textContent;
        presenceData.state = `Revisando sus respuestas...`;
      } else if (pathname.includes("resultados")) {
        const CourseName: HTMLParagraphElement =
            document.querySelector(".CourseRow-title"),
          Score: number = parseFloat(
            document.querySelector(".ExamResults-score-grade").textContent
          ),
          Questions: string = document
            .querySelector(".ExamResults-score-answers")
            .textContent.split("/")[1];

        presenceData.details = CourseName.textContent;
        presenceData.state = `Examen ${
          Score >= 9 ? "aprovado" : "no aprovado"
        }. [${Score} en ${Questions} preguntas]`;
      } else {
        const CourseName: HTMLHeadingElement = document.querySelector(
            ".StartExamOverview-course-title"
          ),
          ExamQuestions: HTMLLIElement = document.querySelector(
            ".StartExamOverview-list-item:nth-child(2) > strong"
          );

        presenceData.details = CourseName.textContent;
        presenceData.state = `Empezando el exámen [${ExamQuestions.textContent}]`;
      }
    }
  } else if (pathname.startsWith("/direct-messages/u/soporte-platzi")) {
    presenceData.state = "Hablando con el Soporte Platzi";
  } else if (pathname.startsWith("/mensajes-directos/")) {
    presenceData.state = "Viendo sus Mensajes";
  } else if (pathname.startsWith("/empleos/")) {
    presenceData.state = "Viendo la lista de Empleos";
  } else if (pathname.startsWith("/mi-suscripcion/beneficiario/")) {
    presenceData.state = "Viendo su Beneficiario";
  } else if (pathname.startsWith("/mi-suscripcion/facturas/")) {
    const FullName: HTMLDivElement =
        document.querySelector(".ProfileMenu-name"),
      Pts: HTMLDivElement = document.querySelector(".ProfileMenu-rank"),
      NOfPayments: HTMLHeadingElement = document.querySelector(
        ".InvoicesList-title"
      );
    presenceData.details = `Viendo sus ${NOfPayments.textContent}`;
    presenceData.state = `${FullName.textContent} [${Pts.textContent}]`;
  } else if (pathname.startsWith("/mi-suscripcion/referidos/")) {
    const Input: HTMLInputElement = document.querySelector("#copyUrl");

    presenceData.state = "Viendo sus referidos";
    presenceData.buttons = [{ label: "Referido", url: `${Input.value}` }];
  } else if (pathname.startsWith("/mi--suscripcion/")) {
    const SubscriptionName: HTMLDivElement =
      document.querySelector(".CurrentPlan-name");
    presenceData.details = "Viendo su suscripcion";
    presenceData.state = `${SubscriptionName.textContent}`;
  }

  presence.setActivity(presenceData);
});
