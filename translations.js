/* =============================================================
   TRANSLATIONS.JS — SALA DE AULA INVERTIDA
   Interface em Português, Inglês e Espanhol.
   ============================================================= */

const I18N = (() => {
  const CHAVE_IDIOMA = "sala-aula-idioma";
  const IDIOMAS_VALIDOS = new Set(["pt", "en", "es"]);

  const dicionario = {
    pt: {
      "meta.description": "Projeto educacional autoral de Renato Melo para implementação da metodologia ativa Sala de Aula Invertida com inteligência artificial e recursos digitais.",
      "app.title": "Sala de Aula Invertida",
      "app.subtitle": "Encontre vídeos, músicas e materiais para estudar.",
      "skip.content": "Ir para os conteúdos",

      "preferences.label": "Preferências de aparência e idioma",
      "theme.label": "Tema",
      "theme.aria": "Selecionar visual da plataforma",
      "theme.auto": "Automático",
      "theme.cientifico": "Azul Científico",
      "theme.clinico": "Verde Clínico",
      "theme.forense": "Azul Forense",
      "theme.fogo": "Fogo Molecular",
      "theme.eclipseBlue": "Eclipse Azul",
      "theme.eclipseOrange": "Eclipse Laranja",
      "theme.biohack": "Biohack Neon",
      "theme.minimal": "Cinza Minimal",

      "language.label": "Idioma",
      "language.pt": "Português",
      "language.en": "Inglês",
      "language.es": "Espanhol",
      "language.selectPt": "Selecionar português",
      "language.selectEn": "Selecionar inglês",
      "language.selectEs": "Selecionar espanhol",

      "filters.button": "Filtros",
      "filters.active": "Filtros ativos",
      "filters.panel": "Filtros de conteúdo",
      "filters.title": "Filtrar conteúdos",
      "filters.close": "Fechar filtros",
      "filters.material": "Material",
      "filters.subject": "Disciplina",
      "filters.grade": "Série",
      "filters.term": "Bimestre",
      "filters.lesson": "Aula",
      "filters.assignment": "Tarefa",
      "filters.exam": "Prova",
      "filters.allMasc": "Todos",
      "filters.allFem": "Todas",
      "filters.searchPlaceholder": "Pesquisar uma aula ou assunto…",
      "filters.searchAria": "Pesquisar conteúdos",
      "filters.clear": "Limpar",
      "filters.results": "Ver resultados",

      "summary.aria": "Resumo dos materiais de estudo",
      "summary.lessons": "Total de Aulas",
      "summary.hours": "Total de Horas",
      "summary.contents": "Total de Conteúdos",
      "summary.available": "Total Disponível",
      "summary.preparing": "Em preparação",
      "summary.planned": "Planejados",

      "content.listAria": "Materiais de estudo disponíveis",
      "content.material": "Material",
      "content.term": "Bimestre",
      "content.lesson": "Aula",
      "content.noSubject": "Sem disciplina",
      "content.noGrade": "Sem série",
      "content.noTerm": "Sem bimestre",
      "content.defaultGroup": "Materiais de estudo",
      "content.untitled": "Conteúdo sem título",
      "content.emptyTitle": "Nenhum conteúdo disponível encontrado.",
      "content.emptyMessage": "Ajuste os filtros ou limpe a pesquisa para ver outros materiais.",

      "resources.video": "Vídeo",
      "resources.music": "Música",
      "resources.pdf": "PDF",
      "resources.videoAria": "Assistir ao vídeo: {title}",
      "resources.musicAria": "Ouvir a música: {title}",
      "resources.pdfAria": "Abrir o PDF: {title}",

      "time.minutes": "{value} min",
      "time.hours": "{value} h",
      "time.hoursMinutes": "{hours} h {minutes} min",
      "author.headerSignature": "Projeto autoral de Renato Melo",
      "about.kicker": "Projeto educacional autoral",
      "about.title": "Metodologias ativas, inteligência artificial e criação educacional.",
      "about.lead": "A Sala de Aula Invertida foi idealizada e desenvolvida por Renato Melo para transformar vídeos, áudios, correções comentadas e materiais digitais em experiências de aprendizagem que ampliam a autonomia do estudante e qualificam o tempo presencial.",
      "about.pillarFlippedTitle": "Sala de Aula Invertida",
      "about.pillarFlippedText": "O estudante tem contato prévio com o conteúdo e chega à aula presencial mais preparado para discutir, investigar, resolver problemas e produzir.",
      "about.pillarAiTitle": "IA aplicada à aprendizagem",
      "about.pillarAiText": "A inteligência artificial é utilizada como recurso de criação, acessibilidade, personalização e transformação de conteúdos em diferentes linguagens.",
      "about.pillarCreatorTitle": "Criação e desenvolvimento autoral",
      "about.pillarCreatorText": "O projeto vai além do uso de ferramentas prontas: envolve a concepção e o desenvolvimento de recursos didáticos digitais, simuladores, aplicações e experiências educacionais apoiadas por tecnologia.",
      "author.label": "Autor e desenvolvedor",
      "author.positioning": "Educador, especialista em metodologias ativas e tecnologias educacionais, criador e desenvolvedor de soluções digitais para aprendizagem.",
      "author.creatorStatement": "Sua atuação integra educação, ciência, inteligência artificial e desenvolvimento tecnológico — não apenas como usuário de ferramentas, mas como idealizador e criador de recursos educacionais conectados à prática de sala de aula.",
      "author.lattes": "Currículo Lattes",
      "author.portfolio": "Portfólio de projetos",
      "author.credentialsTitle": "Credenciais",
      "author.credentialEducation": "Educador desde 1997, com atuação em Ciências, Biologia, coordenação pedagógica e tecnologia educacional.",
      "author.credentialDegree": "Licenciado em Ciências Biológicas e mestre em Biotecnologia.",
      "author.credentialActive": "Pós-graduado em Metodologias Ativas e Tecnologias Educacionais.",
      "author.credentialNeuro": "Pós-graduado em Neuropsicopedagogia, com foco nos processos de aprendizagem e no desenvolvimento cognitivo.",
      "author.credentialPeople": "MBA em Gestão de Pessoas e Liderança.",
      "author.credentialProcesses": "Pós-graduado em Gestão de Processos pela Fundação Getulio Vargas — FGV.",
      "author.credentialCreation": "Experiência na criação de simuladores pedagógicos, materiais digitais, aplicações educacionais e projetos que integram ciência, ensino e inteligência artificial.",
      "about.manifesto": "Tecnologia e inteligência artificial a serviço de uma aprendizagem mais ativa, acessível, significativa e centrada no estudante.",
      "footer.authorship": "Projeto autoral desenvolvido por Renato Melo.",
      "footer.copyright": "© Sala de Aula Invertida 2026. Todos os direitos reservados."
    },

    en: {
      "meta.description": "An original educational project by Renato Melo for implementing the flipped classroom active methodology with artificial intelligence and digital resources.",
      "app.title": "Flipped Classroom",
      "app.subtitle": "Find videos, songs and study materials.",
      "skip.content": "Skip to content",

      "preferences.label": "Appearance and language preferences",
      "theme.label": "Theme",
      "theme.aria": "Select the platform theme",
      "theme.auto": "Automatic",
      "theme.cientifico": "Scientific Blue",
      "theme.clinico": "Clinical Green",
      "theme.forense": "Forensic Blue",
      "theme.fogo": "Molecular Fire",
      "theme.eclipseBlue": "Blue Eclipse",
      "theme.eclipseOrange": "Orange Eclipse",
      "theme.biohack": "Biohack Neon",
      "theme.minimal": "Minimal Gray",

      "language.label": "Language",
      "language.pt": "Portuguese",
      "language.en": "English",
      "language.es": "Spanish",
      "language.selectPt": "Select Portuguese",
      "language.selectEn": "Select English",
      "language.selectEs": "Select Spanish",

      "filters.button": "Filters",
      "filters.active": "Active filters",
      "filters.panel": "Content filters",
      "filters.title": "Filter content",
      "filters.close": "Close filters",
      "filters.material": "Material",
      "filters.subject": "Subject",
      "filters.grade": "Grade",
      "filters.term": "Term",
      "filters.lesson": "Lesson",
      "filters.assignment": "Assignment",
      "filters.exam": "Exam",
      "filters.allMasc": "All",
      "filters.allFem": "All",
      "filters.searchPlaceholder": "Search for a lesson or topic…",
      "filters.searchAria": "Search content",
      "filters.clear": "Clear",
      "filters.results": "View results",

      "summary.aria": "Study materials summary",
      "summary.lessons": "Total Lessons",
      "summary.hours": "Total Hours",
      "summary.contents": "Total Content",
      "summary.available": "Available",
      "summary.preparing": "In preparation",
      "summary.planned": "Planned",

      "content.listAria": "Available study materials",
      "content.material": "Material",
      "content.term": "Term",
      "content.lesson": "Lesson",
      "content.noSubject": "No subject",
      "content.noGrade": "No grade",
      "content.noTerm": "No term",
      "content.defaultGroup": "Study materials",
      "content.untitled": "Untitled content",
      "content.emptyTitle": "No available content found.",
      "content.emptyMessage": "Adjust the filters or clear the search to see other materials.",

      "resources.video": "Video",
      "resources.music": "Song",
      "resources.pdf": "PDF",
      "resources.videoAria": "Watch the video: {title}",
      "resources.musicAria": "Listen to the song: {title}",
      "resources.pdfAria": "Open the PDF: {title}",

      "time.minutes": "{value} min",
      "time.hours": "{value} hr",
      "time.hoursMinutes": "{hours} hr {minutes} min",
      "author.headerSignature": "An original project by Renato Melo",
      "about.kicker": "Original educational project",
      "about.title": "Active methodologies, artificial intelligence and educational creation.",
      "about.lead": "Flipped Classroom was conceived and developed by Renato Melo to transform videos, audio, guided corrections and digital materials into learning experiences that expand student autonomy and improve the use of face-to-face class time.",
      "about.pillarFlippedTitle": "Flipped Classroom",
      "about.pillarFlippedText": "Students access the content beforehand and arrive in class better prepared to discuss, investigate, solve problems and create.",
      "about.pillarAiTitle": "AI applied to learning",
      "about.pillarAiText": "Artificial intelligence is used for creation, accessibility, personalization and transforming content into different formats and languages.",
      "about.pillarCreatorTitle": "Original creation and development",
      "about.pillarCreatorText": "The project goes beyond using ready-made tools: it involves conceiving and developing digital teaching resources, simulators, applications and technology-supported learning experiences.",
      "author.label": "Author and developer",
      "author.positioning": "Educator, specialist in active methodologies and educational technologies, creator and developer of digital learning solutions.",
      "author.creatorStatement": "His work integrates education, science, artificial intelligence and technological development — not only as a user of tools, but as the designer and creator of educational resources connected to real classroom practice.",
      "author.lattes": "Lattes CV",
      "author.portfolio": "Project portfolio",
      "author.credentialsTitle": "Credentials",
      "author.credentialEducation": "Educator since 1997, with experience in Science, Biology, pedagogical coordination and educational technology.",
      "author.credentialDegree": "Licensed in Biological Sciences and holds a master's degree in Biotechnology.",
      "author.credentialActive": "Postgraduate qualification in Active Methodologies and Educational Technologies.",
      "author.credentialNeuro": "Postgraduate qualification in Neuropsychopedagogy, focused on learning processes and cognitive development.",
      "author.credentialPeople": "MBA in People Management and Leadership.",
      "author.credentialProcesses": "Postgraduate qualification in Process Management from Fundação Getulio Vargas — FGV.",
      "author.credentialCreation": "Experience creating educational simulators, digital materials, learning applications and projects that integrate science, teaching and artificial intelligence.",
      "about.manifesto": "Technology and artificial intelligence serving more active, accessible, meaningful and student-centered learning.",
      "footer.authorship": "An original project developed by Renato Melo.",
      "footer.copyright": "© Flipped Classroom 2026. All rights reserved."
    },

    es: {
      "meta.description": "Proyecto educativo de autor de Renato Melo para implementar la metodología activa de aula invertida con inteligencia artificial y recursos digitales.",
      "app.title": "Aula Invertida",
      "app.subtitle": "Encuentra videos, canciones y materiales de estudio.",
      "skip.content": "Ir a los contenidos",

      "preferences.label": "Preferencias de apariencia e idioma",
      "theme.label": "Tema",
      "theme.aria": "Seleccionar el tema de la plataforma",
      "theme.auto": "Automático",
      "theme.cientifico": "Azul Científico",
      "theme.clinico": "Verde Clínico",
      "theme.forense": "Azul Forense",
      "theme.fogo": "Fuego Molecular",
      "theme.eclipseBlue": "Eclipse Azul",
      "theme.eclipseOrange": "Eclipse Naranja",
      "theme.biohack": "Biohack Neón",
      "theme.minimal": "Gris Minimalista",

      "language.label": "Idioma",
      "language.pt": "Portugués",
      "language.en": "Inglés",
      "language.es": "Español",
      "language.selectPt": "Seleccionar portugués",
      "language.selectEn": "Seleccionar inglés",
      "language.selectEs": "Seleccionar español",

      "filters.button": "Filtros",
      "filters.active": "Filtros activos",
      "filters.panel": "Filtros de contenido",
      "filters.title": "Filtrar contenidos",
      "filters.close": "Cerrar filtros",
      "filters.material": "Material",
      "filters.subject": "Asignatura",
      "filters.grade": "Curso",
      "filters.term": "Bimestre",
      "filters.lesson": "Clase",
      "filters.assignment": "Tarea",
      "filters.exam": "Prueba",
      "filters.allMasc": "Todos",
      "filters.allFem": "Todas",
      "filters.searchPlaceholder": "Buscar una clase o tema…",
      "filters.searchAria": "Buscar contenidos",
      "filters.clear": "Limpiar",
      "filters.results": "Ver resultados",

      "summary.aria": "Resumen de los materiales de estudio",
      "summary.lessons": "Total de Clases",
      "summary.hours": "Total de Horas",
      "summary.contents": "Total de Contenidos",
      "summary.available": "Total Disponible",
      "summary.preparing": "En preparación",
      "summary.planned": "Planificados",

      "content.listAria": "Materiales de estudio disponibles",
      "content.material": "Material",
      "content.term": "Bimestre",
      "content.lesson": "Clase",
      "content.noSubject": "Sin asignatura",
      "content.noGrade": "Sin curso",
      "content.noTerm": "Sin bimestre",
      "content.defaultGroup": "Materiales de estudio",
      "content.untitled": "Contenido sin título",
      "content.emptyTitle": "No se encontró contenido disponible.",
      "content.emptyMessage": "Ajusta los filtros o limpia la búsqueda para ver otros materiales.",

      "resources.video": "Video",
      "resources.music": "Canción",
      "resources.pdf": "PDF",
      "resources.videoAria": "Ver el video: {title}",
      "resources.musicAria": "Escuchar la canción: {title}",
      "resources.pdfAria": "Abrir el PDF: {title}",

      "time.minutes": "{value} min",
      "time.hours": "{value} h",
      "time.hoursMinutes": "{hours} h {minutes} min",
      "author.headerSignature": "Proyecto de autor de Renato Melo",
      "about.kicker": "Proyecto educativo de autor",
      "about.title": "Metodologías activas, inteligencia artificial y creación educativa.",
      "about.lead": "Aula Invertida fue ideada y desarrollada por Renato Melo para transformar videos, audios, correcciones comentadas y materiales digitales en experiencias de aprendizaje que amplían la autonomía del estudiante y mejoran el aprovechamiento del tiempo presencial.",
      "about.pillarFlippedTitle": "Aula Invertida",
      "about.pillarFlippedText": "El estudiante accede previamente al contenido y llega a la clase presencial mejor preparado para debatir, investigar, resolver problemas y crear.",
      "about.pillarAiTitle": "IA aplicada al aprendizaje",
      "about.pillarAiText": "La inteligencia artificial se utiliza como recurso de creación, accesibilidad, personalización y transformación de contenidos en diferentes formatos y lenguajes.",
      "about.pillarCreatorTitle": "Creación y desarrollo de autor",
      "about.pillarCreatorText": "El proyecto va más allá del uso de herramientas listas: incluye la concepción y el desarrollo de recursos didácticos digitales, simuladores, aplicaciones y experiencias educativas apoyadas por tecnología.",
      "author.label": "Autor y desarrollador",
      "author.positioning": "Educador, especialista en metodologías activas y tecnologías educativas, creador y desarrollador de soluciones digitales para el aprendizaje.",
      "author.creatorStatement": "Su trabajo integra educación, ciencia, inteligencia artificial y desarrollo tecnológico — no solo como usuario de herramientas, sino como idealizador y creador de recursos educativos conectados con la práctica real del aula.",
      "author.lattes": "Currículo Lattes",
      "author.portfolio": "Portafolio de proyectos",
      "author.credentialsTitle": "Credenciales",
      "author.credentialEducation": "Educador desde 1997, con experiencia en Ciencias, Biología, coordinación pedagógica y tecnología educativa.",
      "author.credentialDegree": "Licenciado en Ciencias Biológicas y máster en Biotecnología.",
      "author.credentialActive": "Posgrado en Metodologías Activas y Tecnologías Educativas.",
      "author.credentialNeuro": "Posgrado en Neuropsicopedagogía, con enfoque en los procesos de aprendizaje y el desarrollo cognitivo.",
      "author.credentialPeople": "MBA en Gestión de Personas y Liderazgo.",
      "author.credentialProcesses": "Posgrado en Gestión de Procesos por la Fundação Getulio Vargas — FGV.",
      "author.credentialCreation": "Experiencia en la creación de simuladores pedagógicos, materiales digitales, aplicaciones educativas y proyectos que integran ciencia, enseñanza e inteligencia artificial.",
      "about.manifesto": "Tecnología e inteligencia artificial al servicio de un aprendizaje más activo, accesible, significativo y centrado en el estudiante.",
      "footer.authorship": "Proyecto de autor desarrollado por Renato Melo.",
      "footer.copyright": "© Aula Invertida 2026. Todos los derechos reservados."
    }
  };

  function idiomaSeguro(idioma) {
    return IDIOMAS_VALIDOS.has(idioma) ? idioma : "pt";
  }

  function lerIdiomaSalvo() {
    try {
      return idiomaSeguro(localStorage.getItem(CHAVE_IDIOMA));
    } catch {
      return "pt";
    }
  }

  function salvarIdioma(idioma) {
    try {
      localStorage.setItem(CHAVE_IDIOMA, idiomaSeguro(idioma));
    } catch {
      /* A interface continua funcionando sem armazenamento local. */
    }
  }

  function t(chave, parametros = {}, idioma = estado.idioma) {
    const lang = idiomaSeguro(idioma);
    let texto =
      dicionario[lang]?.[chave] ??
      dicionario.pt?.[chave] ??
      chave;

    Object.entries(parametros).forEach(([nome, valor]) => {
      texto = texto.replaceAll(`{${nome}}`, String(valor));
    });

    return texto;
  }

  const estado = {
    idioma: lerIdiomaSalvo()
  };

  function atualizarDocumento() {
    const idioma = estado.idioma;

    document.documentElement.lang =
      idioma === "pt" ? "pt-BR" : idioma;

    document.querySelectorAll("[data-i18n]").forEach((elemento) => {
      elemento.textContent = t(elemento.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((elemento) => {
      elemento.setAttribute(
        "placeholder",
        t(elemento.dataset.i18nPlaceholder)
      );
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((elemento) => {
      elemento.setAttribute(
        "aria-label",
        t(elemento.dataset.i18nAria)
      );
    });

    const metaDescricao = document.querySelector('meta[name="description"]');
    if (metaDescricao) {
      metaDescricao.setAttribute("content", t("meta.description"));
    }

    document.title = t("app.title");

    document.querySelectorAll("[data-lang]").forEach((botao) => {
      const ativo = botao.dataset.lang === idioma;
      botao.classList.toggle("ativo", ativo);
      botao.setAttribute("aria-pressed", String(ativo));
    });
  }

  function aplicarIdioma(idioma, { persistir = true, emitir = true } = {}) {
    estado.idioma = idiomaSeguro(idioma);

    if (persistir) {
      salvarIdioma(estado.idioma);
    }

    atualizarDocumento();

    if (emitir) {
      document.dispatchEvent(
        new CustomEvent("idiomaalterado", {
          detail: { idioma: estado.idioma }
        })
      );
    }
  }

  function configurar() {
    document.querySelectorAll("[data-lang]").forEach((botao) => {
      botao.addEventListener("click", () => {
        aplicarIdioma(botao.dataset.lang);
      });
    });

    aplicarIdioma(estado.idioma, {
      persistir: false,
      emitir: false
    });
  }

  return {
    t,
    configurar,
    aplicarIdioma,
    obterIdioma: () => estado.idioma,
    dicionario
  };
})();

window.I18N = I18N;
