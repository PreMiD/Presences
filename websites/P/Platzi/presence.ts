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
  setPresenceFromEvent = (learningPath: string) => {
    activeCategory = learningPath;
  };

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "lg-dark"
    },
    { pathname } = document.location;

  if (pathname.includes("/home")) {
    const InputValues: string[] = [
      ...document.querySelectorAll(".SearchBar input")
    ]
      .map((input) => input.value)
      .filter(Boolean);

    presenceData.state = "Página de inicio";

    if (InputValues.length > 0) {
      presenceData.state = "Página de inicio";

      if (InputValues[0].replace(/[ ]/gi, "") !== "") {
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
      presenceData.state = "Viendo el Blog";

      if (BlogPage) presenceData.state = `Página ${BlogPage.textContent}`;

      if (Input.value.replace(/[ ]/gi, "") !== "") {
        BlogPage
          ? (presenceData.state = `Buscando: ${Input.value} [Pagina ${BlogPage.textContent}]`)
          : (presenceData.state = `Buscando: ${Input.value}`);
      }
    } else if (BlogPage) presenceData.state = `Página ${BlogPage.textContent}`;
  } else if (pathname.startsWith("/blog/")) {
    presenceData.details = "Viendo el Blog";

    if (pathname.split("/").filter(Boolean).length > 1) {
      presenceData.details = `Blog: ${
        document.querySelector(".Discussion-title h1").textContent
      }`;
      presenceData.state = `de ${
        document.querySelector(".DiscussionInfo-user a").textContent
      } [${document.querySelector(".DiscussionInfo span").textContent} pts] ${
        document.querySelector(".DiscussionInfo-time").textContent
      }`;
      presenceData.buttons = [
        { label: "Ver el Artículo", url: `https://platzi.com${pathname}` }
      ];
    }
  } else if (pathname.startsWith("/foro/")) {
    const ForumPage: HTMLAnchorElement = document.querySelector(
      ".Paginator-number.is-current"
    );

    presenceData.details = "Viendo el Foro";

    if (document.querySelector(".CustomSearchInput-search-input").value) {
      presenceData.state = "Viendo el Foro";

      if (ForumPage) presenceData.state = `Página ${ForumPage.textContent}`;

      if (Input.value.replace(/[ ]/gi, "") !== "") {
        ForumPage
          ? (presenceData.state = `Buscando: ${Input.value} [Pagina ${ForumPage.textContent}]`)
          : (presenceData.state = `Buscando: ${Input.value}`);
      }
    } else if (ForumPage)
      presenceData.state = `Página ${ForumPage.textContent}`;
  } else if (pathname.startsWith("/precios/"))
    presenceData.state = "Viendo los planes de compra";
  else if (pathname.startsWith("/empresas/"))
    presenceData.state = "Viendo el plan para empresas";
  else if (pathname.startsWith("/comprar/")) {
    presenceData.details = "Comprando un plan...";
    presenceData.state = document.querySelector(".Details-name").textContent;
  } else if (pathname.startsWith("/clases/notificaciones/")) {
    presenceData.details = "Viendo sus notificaciones";

    const NotificationPage = document.querySelector(
      ".Paginator-number.is-current"
    );

    if (NotificationPage)
      presenceData.state = `Página ${NotificationPage.textContent}`;
  } else if (pathname.startsWith("/p/")) {
    const UserFlag: HTMLElement = document.querySelector(
        "div.ProfileHeader-username > figure > img"
      ),
      UserLink: HTMLAnchorElement = document.querySelector(".UserUrl-link");
    let FinalString = "";

    FinalString += ` ${
      document.querySelector(".ProfileHeader-name").textContent
    } `;
    if (UserFlag) {
      FinalString += ` ${stripPlatziProfileFlags(
        UserFlag.getAttribute("src")
      )} `;
    }

    FinalString += ` [${
      document.querySelector(".ProfileScore-number.is-green").textContent
    } pts] `;

    if (UserLink) {
      presenceData.buttons = [
        { label: "Link personal", url: `${UserLink.href}` }
      ];
    }

    presenceData.details = "Viendo el perfil de";

    if (
      [...document.querySelectorAll(".SingleTab")].filter(
        (tab) => tab.textContent === "Mi Portafolio"
      ).length > 0
    )
      presenceData.details = "Viendo su perfil";

    presenceData.state = FinalString;
  } else if (pathname === "/agenda/") presenceData.state = "Viendo la Agenda";
  else if (pathname === "/live/") {
    presenceData.state = "Viendo Platzi Live";
    presenceData.startTimestamp = estimatedTime;
    presenceData.buttons = [
      { label: "Ver Live", url: `https://platzi.com${pathname}` }
    ];
  } else if (
    pathname.includes("/clases/") &&
    pathname.split("/").filter(Boolean).length === 2
  ) {
    presenceData.state = `de ${
      document.querySelector(".TeacherList-full-name").textContent
    }`;
    presenceData.details = document.querySelector(
      ".CourseDetail-left-title"
    ).textContent;
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
      video: HTMLVideoElement = document.querySelector(".vjs-tech"),
      [actualEpisode, finalEpisode]: string[] = document
        .querySelector(".Header-class-title span")
        .textContent.split("/");
    let timestamps: number[];

    presenceData.details = `${
      document.querySelector(".Header-class-title h1").textContent
    } [${actualEpisode}/ ${finalEpisode}]`;
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
      document
        .querySelector(".VideoPlayer > div")
        .className.includes("vjs-playing")
    ) {
      timestamps = presence.getTimestampsfromMedia(video);

      [, presenceData.endTimestamp] = timestamps;
    }
  } else if (pathname.includes("/cursos/")) {
    //NEW UI, SAME PRESENCE /CLASES/

    if (pathname.split("/").filter(Boolean).length >= 2) {
      presenceData.state = `de ${
        document.querySelector(".Hero-teacher-name strong").textContent
      }`;
      presenceData.details = document.querySelector(
        ".Hero-content-title"
      ).textContent;
    } else {
      presenceData.state = "Buscando cursos...";
      presenceData.startTimestamp = estimatedTime;
    }
  } else if (pathname.includes("/categorias/")) {
    if (pathname.split("/").filter(Boolean).length >= 2) {
      const learningPaths: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll(".LearningPathItem");
      presenceData.state = document.querySelector(
        ".HeroCoursesItem-title span"
      ).textContent;
      presenceData.details = activeCategory;

      if (activeCategory !== "") presenceData.details = activeCategory;

      if (!categoriesEventListener) {
        learningPaths.forEach((learningPath) => {
          learningPath.addEventListener("mouseover", () =>
            setPresenceFromEvent(learningPath.querySelector("h2").textContent)
          );
        });
        categoriesEventListener = true;
      }
    }
  } else if (pathname.includes("/tutoriales/")) {
    presenceData.details = document.querySelector(
      ".Breadcrumb-desktop span:nth-child(2) a"
    ).textContent;
    presenceData.state = "Viendo un tutorial...";
  } else if (pathname.split("/").filter(Boolean).includes("examen")) {
    if (pathname.includes("tomar_examen")) {
      presenceData.details = document.querySelector(
        ".ExamProgress-top-title"
      ).textContent;
      presenceData.state = `${
        document.querySelector(".QuestionSelector-title").textContent
      } [${document
        .querySelector(".ExamProgress-top-count > span")
        .textContent.replace(/de /gi, "")
        .split(" ")
        .join("-")}]`;
    } else if (pathname.includes("review")) {
      presenceData.details = document.querySelector(
        ".ExamProgress-top-title"
      ).textContent;
      presenceData.state = "Revisando sus respuestas...";
    } else if (pathname.includes("resultados")) {
      const Score: number = parseFloat(
          document.querySelector(".ExamResults-score-grade").textContent
        ),
        [, Questions] = document
          .querySelector(".ExamResults-score-answers")
          .textContent.split("/");

      presenceData.details =
        document.querySelector(".CourseRow-title").textContent;
      presenceData.state = `Examen ${
        Score >= 9 ? "aprovado" : "no aprovado"
      }. [${Score} en ${Questions} preguntas]`;
    } else {
      presenceData.details = document.querySelector(
        ".StartExamOverview-course-title"
      ).textContent;
      presenceData.state = `Empezando el exámen [${
        document.querySelector(
          ".StartExamOverview-list-item:nth-child(2) > strong"
        ).textContent
      }]`;
    }
  } else if (pathname.startsWith("/direct-messages/u/soporte-platzi"))
    presenceData.state = "Hablando con el Soporte Platzi";
  else if (pathname.startsWith("/mensajes-directos/"))
    presenceData.state = "Viendo sus Mensajes";
  else if (pathname.startsWith("/empleos/"))
    presenceData.state = "Viendo la lista de Empleos";
  else if (pathname.startsWith("/mi-suscripcion/beneficiario/"))
    presenceData.state = "Viendo su Beneficiario";
  else if (pathname.startsWith("/mi-suscripcion/facturas/")) {
    presenceData.details = `Viendo sus ${
      document.querySelector(".InvoicesList-title").textContent
    }`;
    presenceData.state = `${
      document.querySelector(".ProfileMenu-name").textContent
    } [${document.querySelector(".ProfileMenu-rank").textContent}]`;
  } else if (pathname.startsWith("/mi-suscripcion/referidos/")) {
    presenceData.state = "Viendo sus referidos";
    presenceData.buttons = [
      { label: "Referido", url: `${document.querySelector("#copyUrl").value}` }
    ];
  } else if (pathname.startsWith("/mi--suscripcion/")) {
    presenceData.details = "Viendo su suscripcion";
    presenceData.state = `${
      document.querySelector(".CurrentPlan-name").textContent
    }`;
  }

  presence.setActivity(presenceData);
});
