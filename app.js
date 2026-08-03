/* =============================================================
   APP.JS — SALA DE AULA INVERTIDA

   Recursos:
   - Exibe somente conteúdos com status DISPONÍVEL.
   - Filtros encadeados.
   - Agrupamento por Material, Disciplina, Série e Bimestre.
   - Exibe somente recursos que possuem links.
   - Painel lateral de filtros no celular.
   - Temas visuais com persistência no localStorage.
   ============================================================= */


/* =============================================================
   1. CONFIGURAÇÃO DOS TEMAS
   ============================================================= */

const CHAVE_PREFERENCIA_TEMA = "sala-aula-tema";

const TEMA_AUTO_CLARO = "cientifico";
const TEMA_AUTO_ESCURO = "eclipse-azul";

const TEMAS_VALIDOS = new Set([
  "auto",
  "cientifico",
  "clinico",
  "forense",
  "fogo",
  "eclipse-azul",
  "eclipse-laranja",
  "biohack",
  "minimal"
]);

const TEMAS_ESCUROS = new Set([
  "fogo",
  "eclipse-azul",
  "eclipse-laranja",
  "biohack"
]);

const consultaTemaSistema = window.matchMedia(
  "(prefers-color-scheme: dark)"
);


function obterPreferenciaTemaSalva() {
  try {
    const preferencia = localStorage.getItem(
      CHAVE_PREFERENCIA_TEMA
    );

    return TEMAS_VALIDOS.has(preferencia)
      ? preferencia
      : "auto";
  } catch {
    return "auto";
  }
}


function salvarPreferenciaTema(preferencia) {
  try {
    localStorage.setItem(
      CHAVE_PREFERENCIA_TEMA,
      preferencia
    );
  } catch {
    /*
     * O projeto continua funcionando quando
     * o armazenamento local está indisponível.
     */
  }
}


function obterTemaEfetivo(preferencia) {
  if (preferencia !== "auto") {
    return preferencia;
  }

  return consultaTemaSistema.matches
    ? TEMA_AUTO_ESCURO
    : TEMA_AUTO_CLARO;
}


function obterModoTema(tema) {
  return TEMAS_ESCUROS.has(tema)
    ? "dark"
    : "light";
}


function atualizarMetaTema() {
  const metaTema = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (!metaTema) {
    return;
  }

  const estilos = getComputedStyle(
    document.documentElement
  );

  const corCabecalho = estilos
    .getPropertyValue("--color-header")
    .trim();

  if (corCabecalho) {
    metaTema.setAttribute(
      "content",
      corCabecalho
    );
  }
}


function atualizarIconeTema(modo) {
  const icone = document.querySelector(
    ".tema-icone"
  );

  if (!icone) {
    return;
  }

  if (modo === "dark") {
    icone.innerHTML = `
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0 1
        18 15.75 9.75 9.75 0 0 1 8.25 6
        a9.718 9.718 0 0 1 .748-3.752
        A9.753 9.753 0 1 0 21.752 15.002Z"
      />
    `;

    return;
  }

  icone.innerHTML = `
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 3v1.5m0 15V21m9-9h-1.5
      M4.5 12H3m15.364-6.364-1.061 1.061
      M6.697 17.303l-1.061 1.061m12.728 0
      -1.061-1.061M6.697 6.697 5.636 5.636
      M16.5 12a4.5 4.5 0 1 1-9 0
      4.5 4.5 0 0 1 9 0Z"
    />
  `;
}


function aplicarTema(
  preferencia,
  {
    persistir = true
  } = {}
) {
  const preferenciaSegura =
    TEMAS_VALIDOS.has(preferencia)
      ? preferencia
      : "auto";

  const temaEfetivo =
    obterTemaEfetivo(
      preferenciaSegura
    );

  const modo =
    obterModoTema(
      temaEfetivo
    );

  const raiz =
    document.documentElement;

  const temaAnterior =
    raiz.dataset.theme;

  if (
    temaAnterior &&
    temaAnterior !== temaEfetivo
  ) {
    raiz.classList.add(
      "tema-em-transicao"
    );

    window.setTimeout(
      () => {
        raiz.classList.remove(
          "tema-em-transicao"
        );
      },
      220
    );
  }

  raiz.dataset.theme =
    temaEfetivo;

  raiz.dataset.themePreference =
    preferenciaSegura;

  raiz.dataset.themeMode =
    modo;

  raiz.style.colorScheme =
    modo;

  const seletorTema =
    document.getElementById(
      "seletor-tema"
    );

  if (
    seletorTema &&
    seletorTema.value !== preferenciaSegura
  ) {
    seletorTema.value =
      preferenciaSegura;
  }

  atualizarIconeTema(
    modo
  );

  window.requestAnimationFrame(
    atualizarMetaTema
  );

  if (persistir) {
    salvarPreferenciaTema(
      preferenciaSegura
    );
  }
}


function configurarTema() {
  const seletorTema =
    document.getElementById(
      "seletor-tema"
    );

  aplicarTema(
    obterPreferenciaTemaSalva(),
    {
      persistir: false
    }
  );

  seletorTema?.addEventListener(
    "change",
    () => {
      aplicarTema(
        seletorTema.value
      );
    }
  );

  const acompanharTemaSistema =
    () => {
      if (
        obterPreferenciaTemaSalva() ===
        "auto"
      ) {
        aplicarTema(
          "auto",
          {
            persistir: false
          }
        );
      }
    };

  if (
    typeof consultaTemaSistema
      .addEventListener === "function"
  ) {
    consultaTemaSistema.addEventListener(
      "change",
      acompanharTemaSistema
    );
  } else if (
    typeof consultaTemaSistema
      .addListener === "function"
  ) {
    consultaTemaSistema.addListener(
      acompanharTemaSistema
    );
  }
}


/* =============================================================
   2. IDIOMA E DADOS MULTILÍNGUES
   ============================================================= */

function t(chave, parametros = {}) {
  return window.I18N?.t(chave, parametros) || chave;
}

function obterIdiomaAtual() {
  return window.I18N?.obterIdioma() || "pt";
}

function obterTextoMultilingue(valor, idioma = obterIdiomaAtual()) {
  if (typeof valor === "string") {
    return valor;
  }

  if (valor && typeof valor === "object") {
    return (
      valor[idioma] ||
      valor.pt ||
      valor.en ||
      valor.es ||
      ""
    );
  }

  return "";
}

function obterCampoCurso(curso, campo) {
  return obterTextoMultilingue(
    curso?.i18n?.[campo] ?? curso?.[campo]
  );
}

function obterRotuloValorCurso(campo, valorOriginal) {
  const cursoReferencia = obterCursosDisponiveis().find(
    (curso) => curso?.[campo] === valorOriginal
  );

  return cursoReferencia
    ? obterCampoCurso(cursoReferencia, campo)
    : String(valorOriginal || "");
}


/* =============================================================
   3. UTILITÁRIOS
   ============================================================= */

function normalizarTexto(valor) {
  return String(valor || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .trim();
}


function formatarDuracao(minutos) {
  const totalMinutos =
    Number(minutos);

  if (
    !Number.isFinite(totalMinutos) ||
    totalMinutos <= 0
  ) {
    return "";
  }

  const horas =
    Math.floor(
      totalMinutos / 60
    );

  const minutosRestantes =
    totalMinutos % 60;

  if (horas === 0) {
    return t("time.minutes", { value: minutosRestantes });
  }

  if (minutosRestantes === 0) {
    return t("time.hours", { value: horas });
  }

  return t("time.hoursMinutes", { hours: horas, minutes: minutosRestantes });
}


function ordenarValoresPedagogicos(
  valorA,
  valorB
) {
  return String(
    valorA || ""
  ).localeCompare(
    String(valorB || ""),
    "pt-BR",
    {
      numeric: true,
      sensitivity: "base"
    }
  );
}


function criarOpcao(
  valor,
  texto
) {
  const opcao =
    document.createElement(
      "option"
    );

  opcao.value =
    valor;

  opcao.textContent =
    texto;

  return opcao;
}


function possuiLink(valor) {
  return String(valor || "")
    .trim()
    .length > 0;
}


function obterCursosDisponiveis() {
  if (
    typeof cursos === "undefined" ||
    !Array.isArray(cursos)
  ) {
    return [];
  }

  return cursos.filter(
    (curso) =>
      normalizarTexto(
        curso.status
      ) === "disponivel"
  );
}


function criarCabecalhoAgrupamento(
  classe,
  titulo,
  subtitulo = ""
) {
  const cabecalho =
    document.createElement(
      "div"
    );

  cabecalho.className =
    classe;

  const tituloElemento =
    document.createElement(
      "span"
    );

  tituloElemento.textContent =
    titulo;

  cabecalho.appendChild(
    tituloElemento
  );

  if (subtitulo) {
    const subtituloElemento =
      document.createElement(
        "small"
      );

    subtituloElemento.textContent =
      subtitulo;

    cabecalho.appendChild(
      subtituloElemento
    );
  }

  return cabecalho;
}


function criarBadgeAula(texto) {
  const badge =
    document.createElement(
      "span"
    );

  badge.className =
    "badge-aula";

  badge.textContent =
    texto || t("content.lesson");

  return badge;
}


function abrirLinkExterno(link) {
  const endereco =
    String(link || "")
      .trim();

  if (!endereco) {
    return;
  }

  window.open(
    endereco,
    "_blank",
    "noopener,noreferrer"
  );
}


function criarBotaoMaterial({
  texto,
  link,
  classeExtra,
  ariaLabel
}) {
  if (!possuiLink(link)) {
    return null;
  }

  const botao =
    document.createElement(
      "button"
    );

  botao.type =
    "button";

  botao.className =
    `btn-material ${classeExtra}`;

  botao.textContent =
    texto;

  botao.setAttribute(
    "aria-label",
    ariaLabel || texto
  );

  botao.addEventListener(
    "click",
    () => {
      abrirLinkExterno(
        link
      );
    }
  );

  return botao;
}


function criarInfoDuracao(minutos) {
  const textoDuracao =
    formatarDuracao(
      minutos
    );

  if (!textoDuracao) {
    return null;
  }

  const item =
    document.createElement(
      "div"
    );

  item.className =
    "info-item";

  item.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0
        11-18 0 9 9 0 0118 0z"
      />
    </svg>
  `;

  const texto =
    document.createElement(
      "span"
    );

  texto.textContent =
    textoDuracao;

  item.appendChild(
    texto
  );

  return item;
}


/* =============================================================
   3. RENDERIZAÇÃO DOS CONTEÚDOS
   ============================================================= */

function renderCursos(lista) {
  const container =
    document.getElementById(
      "lista-cursos"
    );

  if (!container) {
    console.error(
      'Elemento com id "lista-cursos" não encontrado.'
    );

    return;
  }

  container.replaceChildren();

  if (
    !Array.isArray(lista) ||
    lista.length === 0
  ) {
    const estadoVazio =
      document.createElement(
        "div"
      );

    estadoVazio.className =
      "lista-cursos-vazia";

    const titulo =
      document.createElement(
        "strong"
      );

    titulo.textContent =
      t("content.emptyTitle");

    const mensagem =
      document.createTextNode(
        t("content.emptyMessage")
      );

    estadoVazio.append(
      titulo,
      document.createElement("br"),
      mensagem
    );

    container.appendChild(
      estadoVazio
    );

    return;
  }

  const listaOrdenada =
    [...lista].sort(
      (cursoA, cursoB) => {
        return (
          ordenarValoresPedagogicos(
            obterCampoCurso(cursoA, "material"),
            obterCampoCurso(cursoB, "material")
          ) ||
          ordenarValoresPedagogicos(
            obterCampoCurso(cursoA, "disciplina"),
            obterCampoCurso(cursoB, "disciplina")
          ) ||
          ordenarValoresPedagogicos(
            obterCampoCurso(cursoA, "serie"),
            obterCampoCurso(cursoB, "serie")
          ) ||
          ordenarValoresPedagogicos(
            obterCampoCurso(cursoA, "bimestre"),
            obterCampoCurso(cursoB, "bimestre")
          ) ||
          ordenarValoresPedagogicos(
            obterCampoCurso(cursoA, "aula"),
            obterCampoCurso(cursoB, "aula")
          ) ||
          ordenarValoresPedagogicos(
            obterCampoCurso(cursoA, "nome"),
            obterCampoCurso(cursoB, "nome")
          )
        );
      }
    );

  let materialAtual = null;
  let contextoAtual = null;
  let bimestreAtual = null;

  listaOrdenada.forEach(
    (curso) => {
      const material =
        obterCampoCurso(curso, "material") ||
        t("content.defaultGroup");

      const disciplina =
        obterCampoCurso(curso, "disciplina") ||
        t("content.noSubject");

      const serie =
        obterCampoCurso(curso, "serie") ||
        t("content.noGrade");

      const bimestre =
        obterCampoCurso(curso, "bimestre") ||
        t("content.noTerm");

      const contexto =
        `${disciplina} · ${serie}`;

      if (
        material !== materialAtual
      ) {
        materialAtual =
          material;

        contextoAtual =
          null;

        bimestreAtual =
          null;

        container.appendChild(
          criarCabecalhoAgrupamento(
            "header-material",
            material,
            t("content.material")
          )
        );
      }

      if (
        contexto !== contextoAtual
      ) {
        contextoAtual =
          contexto;

        bimestreAtual =
          null;

        container.appendChild(
          criarCabecalhoAgrupamento(
            "header-contexto",
            contexto
          )
        );
      }

      if (
        bimestre !== bimestreAtual
      ) {
        bimestreAtual =
          bimestre;

        container.appendChild(
          criarCabecalhoAgrupamento(
            "header-bimestre",
            bimestre,
            t("content.term")
          )
        );
      }

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "card-curso";

      const cardHeader =
        document.createElement(
          "header"
        );

      cardHeader.className =
        "card-header";

      const classificacao =
        document.createElement(
          "div"
        );

      classificacao.className =
        "card-classificacao";

      classificacao.appendChild(
        criarBadgeAula(
          obterCampoCurso(curso, "aula")
        )
      );

      cardHeader.appendChild(
        classificacao
      );

      const titulo =
        document.createElement(
          "h2"
        );

      titulo.className =
        "card-titulo";

      titulo.textContent =
        obterCampoCurso(curso, "nome") ||
        t("content.untitled");

      const descricao =
        document.createElement(
          "p"
        );

      descricao.className =
        "card-descricao";

      descricao.textContent =
        obterCampoCurso(curso, "descricao");

      const info =
        document.createElement(
          "div"
        );

      info.className =
        "card-info";

      const infoDuracao =
        criarInfoDuracao(
          curso.duracaoMinutos
        );

      if (infoDuracao) {
        info.appendChild(
          infoDuracao
        );
      }

      const footer =
        document.createElement(
          "footer"
        );

      footer.className =
        "card-footer";

      const botoes =
        document.createElement(
          "div"
        );

      botoes.className =
        "card-botoes-materiais";

      const botaoVideo =
        criarBotaoMaterial({
          texto: t("resources.video"),
          link: curso.linkAula,
          classeExtra: "btn-aula",
          ariaLabel:
            t("resources.videoAria", { title: titulo.textContent })
        });

      const botaoMusica =
        criarBotaoMaterial({
          texto: t("resources.music"),
          link: curso.linkMusica,
          classeExtra: "btn-musica",
          ariaLabel:
            t("resources.musicAria", { title: titulo.textContent })
        });

      const botaoPdf =
        criarBotaoMaterial({
          texto: t("resources.pdf"),
          link: curso.linkPdf,
          classeExtra: "btn-pdf",
          ariaLabel:
            t("resources.pdfAria", { title: titulo.textContent })
        });

      [
        botaoVideo,
        botaoMusica,
        botaoPdf
      ]
        .filter(Boolean)
        .forEach(
          (botao) => {
            botoes.appendChild(
              botao
            );
          }
        );

      if (
        botoes.children.length > 0
      ) {
        footer.appendChild(
          botoes
        );
      }

      card.append(
        cardHeader,
        titulo
      );

      if (
        descricao.textContent
      ) {
        card.appendChild(
          descricao
        );
      }

      if (
        info.children.length > 0
      ) {
        card.appendChild(
          info
        );
      }

      if (
        footer.children.length > 0
      ) {
        card.appendChild(
          footer
        );
      }

      container.appendChild(
        card
      );
    }
  );
}


/* =============================================================
   4. RESUMO
   ============================================================= */

function atualizarResumo(lista) {
  const listaSegura =
    Array.isArray(lista)
      ? lista
      : [];

  const totalConteudos =
    listaSegura.length;

  const totalAulas =
    listaSegura.reduce(
      (soma, curso) => {
        const quantidade =
          Number(
            curso.quantidadeAulas
          );

        return (
          Number.isFinite(quantidade) &&
          quantidade > 0
        )
          ? soma + quantidade
          : soma;
      },
      0
    );

  const totalMinutos =
    listaSegura.reduce(
      (soma, curso) => {
        const minutos =
          Number(
            curso.duracaoMinutos
          );

        return (
          Number.isFinite(minutos) &&
          minutos > 0
        )
          ? soma + minutos
          : soma;
      },
      0
    );

  const valores = {
    "resumo-total":
      totalConteudos,

    "resumo-disponivel":
      totalConteudos,

    "resumo-em-dev":
      0,

    "resumo-backlog":
      0,

    "total-aulas":
      totalAulas,

    "resumo-tempo":
      formatarDuracao(
        totalMinutos
      ) || "0 min"
  };

  Object.entries(
    valores
  ).forEach(
    ([id, valor]) => {
      const elemento =
        document.getElementById(
          id
        );

      if (elemento) {
        elemento.textContent =
          valor;
      }
    }
  );
}


/* =============================================================
   5. FILTROS ENCADEADOS
   ============================================================= */

function obterBaseFiltradaPorSelecoes({
  material = "",
  disciplina = "",
  serie = "",
  bimestre = ""
} = {}) {
  return obterCursosDisponiveis().filter(
    (curso) => {
      if (
        material &&
        curso.material !== material
      ) {
        return false;
      }

      if (
        disciplina &&
        curso.disciplina !== disciplina
      ) {
        return false;
      }

      if (
        serie &&
        curso.serie !== serie
      ) {
        return false;
      }

      if (
        bimestre &&
        curso.bimestre !== bimestre
      ) {
        return false;
      }

      return true;
    }
  );
}


function preencherSelect({
  id,
  valores,
  textoPadrao,
  valorAnterior = "",
  campoCurso = ""
}) {
  const select =
    document.getElementById(
      id
    );

  if (!select) {
    return;
  }

  const valoresOrdenados =
    Array.from(
      new Set(
        valores.filter(Boolean)
      )
    ).sort(
      ordenarValoresPedagogicos
    );

  select.replaceChildren(
    criarOpcao(
      "",
      textoPadrao
    )
  );

  valoresOrdenados.forEach(
    (valor) => {
      select.appendChild(
        criarOpcao(
          valor,
          campoCurso
            ? obterRotuloValorCurso(campoCurso, valor)
            : valor
        )
      );
    }
  );

  if (
    valorAnterior &&
    valoresOrdenados.includes(
      valorAnterior
    )
  ) {
    select.value =
      valorAnterior;
  }
}


function preencherOpcoesMaterial() {
  const select =
    document.getElementById(
      "filtro-material"
    );

  preencherSelect({
    id: "filtro-material",

    valores:
      obterCursosDisponiveis().map(
        (curso) =>
          curso.material
      ),

    textoPadrao:
      t("filters.allMasc"),

    campoCurso: "material",

    valorAnterior:
      select?.value || ""
  });
}


function preencherOpcoesDisciplina(
  material = ""
) {
  const select =
    document.getElementById(
      "filtro-disciplina"
    );

  const base =
    obterBaseFiltradaPorSelecoes({
      material
    });

  preencherSelect({
    id: "filtro-disciplina",

    valores:
      base.map(
        (curso) =>
          curso.disciplina
      ),

    textoPadrao:
      t("filters.allFem"),

    campoCurso: "disciplina",

    valorAnterior:
      select?.value || ""
  });
}


function preencherOpcoesSerie(
  material = "",
  disciplina = ""
) {
  const select =
    document.getElementById(
      "filtro-serie"
    );

  const base =
    obterBaseFiltradaPorSelecoes({
      material,
      disciplina
    });

  preencherSelect({
    id: "filtro-serie",

    valores:
      base.map(
        (curso) =>
          curso.serie
      ),

    textoPadrao:
      t("filters.allFem"),

    campoCurso: "serie",

    valorAnterior:
      select?.value || ""
  });
}


function preencherOpcoesBimestre(
  material = "",
  disciplina = "",
  serie = ""
) {
  const select =
    document.getElementById(
      "filtro-bimestre"
    );

  const base =
    obterBaseFiltradaPorSelecoes({
      material,
      disciplina,
      serie
    });

  preencherSelect({
    id: "filtro-bimestre",

    valores:
      base.map(
        (curso) =>
          curso.bimestre
      ),

    textoPadrao:
      t("filters.allMasc"),

    campoCurso: "bimestre",

    valorAnterior:
      select?.value || ""
  });
}


function atualizarRotuloFiltroAula(
  materialSelecionado = ""
) {
  const rotulo =
    document.getElementById(
      "rotulo-filtro-aula"
    );

  if (!rotulo) {
    return;
  }

  let chave =
    "filters.lesson";

  if (
    materialSelecionado ===
    "Correção da Tarefa"
  ) {
    chave =
      "filters.assignment";
  } else if (
    materialSelecionado ===
    "Correção da Prova Paulista"
  ) {
    chave =
      "filters.exam";
  }

  rotulo.dataset.i18n =
    chave;

  rotulo.textContent =
    t(chave);
}


function preencherOpcoesAula(
  material = "",
  disciplina = "",
  serie = "",
  bimestre = ""
) {
  atualizarRotuloFiltroAula(
    material
  );
  const select =
    document.getElementById(
      "filtro-aula"
    );

  const base =
    obterBaseFiltradaPorSelecoes({
      material,
      disciplina,
      serie,
      bimestre
    });

  preencherSelect({
    id: "filtro-aula",

    valores:
      base.map(
        (curso) =>
          curso.aula
      ),

    textoPadrao:
      t("filters.allFem"),

    campoCurso: "aula",

    valorAnterior:
      select?.value || ""
  });
}


/* =============================================================
   6. APLICAÇÃO DOS FILTROS
   ============================================================= */

function obterCursosFiltrados() {
  const material =
    document.getElementById(
      "filtro-material"
    )?.value || "";

  const disciplina =
    document.getElementById(
      "filtro-disciplina"
    )?.value || "";

  const serie =
    document.getElementById(
      "filtro-serie"
    )?.value || "";

  const bimestre =
    document.getElementById(
      "filtro-bimestre"
    )?.value || "";

  const aula =
    document.getElementById(
      "filtro-aula"
    )?.value || "";

  const busca =
    normalizarTexto(
      document.getElementById(
        "filtro-busca"
      )?.value || ""
    );

  return obterCursosDisponiveis().filter(
    (curso) => {
      if (
        material &&
        curso.material !== material
      ) {
        return false;
      }

      if (
        disciplina &&
        curso.disciplina !== disciplina
      ) {
        return false;
      }

      if (
        serie &&
        curso.serie !== serie
      ) {
        return false;
      }

      if (
        bimestre &&
        curso.bimestre !== bimestre
      ) {
        return false;
      }

      if (
        aula &&
        curso.aula !== aula
      ) {
        return false;
      }

      if (busca) {
        const textoPesquisavel =
          normalizarTexto(
            [
              obterCampoCurso(curso, "material"),
              obterCampoCurso(curso, "disciplina"),
              obterCampoCurso(curso, "serie"),
              obterCampoCurso(curso, "bimestre"),
              obterCampoCurso(curso, "aula"),
              obterCampoCurso(curso, "nome"),
              obterCampoCurso(curso, "descricao")
            ].join(" ")
          );

        if (
          !textoPesquisavel.includes(
            busca
          )
        ) {
          return false;
        }
      }

      return true;
    }
  );
}


function aplicarFiltros() {
  const cursosFiltrados =
    obterCursosFiltrados();

  renderCursos(
    cursosFiltrados
  );

  atualizarResumo(
    cursosFiltrados
  );
}


function limparFiltros() {
  IDS_FILTROS.forEach(
    (id) => {
      const campo =
        document.getElementById(
          id
        );

      if (campo) {
        campo.value = "";
      }
    }
  );

  removerFiltrosSalvos();

  preencherOpcoesMaterial();

  preencherOpcoesDisciplina(
    ""
  );

  preencherOpcoesSerie(
    "",
    ""
  );

  preencherOpcoesBimestre(
    "",
    "",
    ""
  );

  preencherOpcoesAula(
    "",
    "",
    "",
    ""
  );

  aplicarFiltros();
  salvarFiltrosAtuais();
}

/* =============================================================
   7. PAINEL LATERAL DE FILTROS
   ============================================================= */

function configurarPainelFiltros() {
  const botaoAbrir =
    document.getElementById(
      "btn-abrir-filtros"
    );

  const botaoFechar =
    document.getElementById(
      "btn-fechar-filtros"
    );

  const botaoAplicar =
    document.getElementById(
      "btn-aplicar-filtros"
    );

  const painel =
    document.getElementById(
      "painel-filtros"
    );

  const overlay =
    document.getElementById(
      "filtros-overlay"
    );

  const contador =
    document.getElementById(
      "contador-filtros"
    );

  const camposFiltro = [
    "filtro-material",
    "filtro-disciplina",
    "filtro-serie",
    "filtro-bimestre",
    "filtro-aula",
    "filtro-busca"
  ]
    .map(
      (id) =>
        document.getElementById(
          id
        )
    )
    .filter(Boolean);


  function atualizarContadorFiltros() {
    if (!contador) {
      return;
    }

    const quantidade =
      camposFiltro.filter(
        (campo) =>
          String(
            campo.value || ""
          ).trim() !== ""
      ).length;

    contador.textContent =
      quantidade;

    contador.hidden =
      quantidade === 0;
  }


  function abrirPainel() {
    if (!painel) {
      return;
    }

    painel.classList.add(
      "aberto"
    );

    if (overlay) {
      overlay.hidden =
        false;
    }

    document.body.classList.add(
      "filtros-abertos"
    );

    botaoAbrir?.setAttribute(
      "aria-expanded",
      "true"
    );

    window.setTimeout(
      () => {
        botaoFechar?.focus();
      },
      50
    );
  }


  function fecharPainel({
    devolverFoco = true
  } = {}) {
    if (!painel) {
      return;
    }

    painel.classList.remove(
      "aberto"
    );

    if (overlay) {
      overlay.hidden =
        true;
    }

    document.body.classList.remove(
      "filtros-abertos"
    );

    botaoAbrir?.setAttribute(
      "aria-expanded",
      "false"
    );

    if (devolverFoco) {
      botaoAbrir?.focus();
    }
  }


  botaoAbrir?.addEventListener(
    "click",
    abrirPainel
  );


  botaoFechar?.addEventListener(
    "click",
    () => {
      fecharPainel();
    }
  );


  overlay?.addEventListener(
    "click",
    () => {
      fecharPainel();
    }
  );


  botaoAplicar?.addEventListener(
    "click",
    () => {
      aplicarFiltros();
	  salvarFiltrosAtuais();
      atualizarContadorFiltros();
      fecharPainel();
    }
  );


  document.addEventListener(
    "keydown",
    (evento) => {
      if (
        evento.key === "Escape" &&
        painel?.classList.contains(
          "aberto"
        )
      ) {
        fecharPainel();
      }
    }
  );


  window.addEventListener(
    "resize",
    () => {
      if (
        window.innerWidth > 700 &&
        painel?.classList.contains(
          "aberto"
        )
      ) {
        fecharPainel({
          devolverFoco: false
        });
      }
    }
  );


  camposFiltro.forEach(
    (campo) => {
      const tipoEvento =
        campo.tagName === "INPUT"
          ? "input"
          : "change";

      campo.addEventListener(
        tipoEvento,
        atualizarContadorFiltros
      );
    }
  );


  return {
    atualizarContadorFiltros,
    fecharPainel
  };
}


/* =============================================================
   8. PERSISTÊNCIA DOS FILTROS
   ============================================================= */

const CHAVE_FILTROS = "sala-aula-filtros";

const IDS_FILTROS = [
  "filtro-material",
  "filtro-disciplina",
  "filtro-serie",
  "filtro-bimestre",
  "filtro-aula",
  "filtro-busca"
];


function obterEstadoPadraoFiltros() {
  return {
    material: "",
    disciplina: "",
    serie: "",
    bimestre: "",
    aula: "",
    busca: ""
  };
}


function lerFiltrosSalvos() {
  try {
    const conteudo =
      localStorage.getItem(
        CHAVE_FILTROS
      );

    if (!conteudo) {
      return obterEstadoPadraoFiltros();
    }

    const filtros =
      JSON.parse(conteudo);

    if (
      !filtros ||
      typeof filtros !== "object"
    ) {
      return obterEstadoPadraoFiltros();
    }

    return {
      material:
        String(
          filtros.material || ""
        ),

      disciplina:
        String(
          filtros.disciplina || ""
        ),

      serie:
        String(
          filtros.serie || ""
        ),

      bimestre:
        String(
          filtros.bimestre || ""
        ),

      aula:
        String(
          filtros.aula || ""
        ),

      busca:
        String(
          filtros.busca || ""
        )
    };
  } catch {
    return obterEstadoPadraoFiltros();
  }
}


function salvarFiltrosAtuais() {
  const filtros = {
    material:
      document.getElementById(
        "filtro-material"
      )?.value || "",

    disciplina:
      document.getElementById(
        "filtro-disciplina"
      )?.value || "",

    serie:
      document.getElementById(
        "filtro-serie"
      )?.value || "",

    bimestre:
      document.getElementById(
        "filtro-bimestre"
      )?.value || "",

    aula:
      document.getElementById(
        "filtro-aula"
      )?.value || "",

    busca:
      document.getElementById(
        "filtro-busca"
      )?.value || ""
  };

  try {
    localStorage.setItem(
      CHAVE_FILTROS,
      JSON.stringify(filtros)
    );
  } catch {
    /*
     * A aplicação continua funcionando quando
     * o localStorage estiver indisponível.
     */
  }
}


function removerFiltrosSalvos() {
  try {
    localStorage.removeItem(
      CHAVE_FILTROS
    );
  } catch {
    /*
     * Nenhuma ação necessária.
     */
  }
}


function definirValorValido(
  select,
  valor
) {
  if (!select || !valor) {
    return "";
  }

  const valorExiste =
    Array.from(
      select.options
    ).some(
      (opcao) =>
        opcao.value === valor
    );

  if (!valorExiste) {
    select.value = "";

    return "";
  }

  select.value = valor;

  return valor;
}


function restaurarFiltrosSalvos() {
  const filtros =
    lerFiltrosSalvos();

  const filtroMaterial =
    document.getElementById(
      "filtro-material"
    );

  const filtroDisciplina =
    document.getElementById(
      "filtro-disciplina"
    );

  const filtroSerie =
    document.getElementById(
      "filtro-serie"
    );

  const filtroBimestre =
    document.getElementById(
      "filtro-bimestre"
    );

  const filtroAula =
    document.getElementById(
      "filtro-aula"
    );

  const filtroBusca =
    document.getElementById(
      "filtro-busca"
    );

  /*
   * A restauração precisa respeitar a ordem
   * dos filtros encadeados.
   */

  preencherOpcoesMaterial();

  const material =
    definirValorValido(
      filtroMaterial,
      filtros.material
    );

  preencherOpcoesDisciplina(
    material
  );

  const disciplina =
    definirValorValido(
      filtroDisciplina,
      filtros.disciplina
    );

  preencherOpcoesSerie(
    material,
    disciplina
  );

  const serie =
    definirValorValido(
      filtroSerie,
      filtros.serie
    );

  preencherOpcoesBimestre(
    material,
    disciplina,
    serie
  );

  const bimestre =
    definirValorValido(
      filtroBimestre,
      filtros.bimestre
    );

  preencherOpcoesAula(
    material,
    disciplina,
    serie,
    bimestre
  );

  definirValorValido(
    filtroAula,
    filtros.aula
  );

  if (filtroBusca) {
    filtroBusca.value =
      filtros.busca;
  }
}


/* =============================================================
   9. INICIALIZAÇÃO
   ============================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    window.I18N?.configurar();

    configurarTema();

    if (
      typeof cursos === "undefined" ||
      !Array.isArray(cursos)
    ) {
      console.error(
        'A variável global "cursos" não foi encontrada. ' +
        "Verifique se cursos.js foi carregado antes de app.js."
      );

      return;
    }

    restaurarFiltrosSalvos();

    const filtroMaterial =
      document.getElementById(
        "filtro-material"
      );

    const filtroDisciplina =
      document.getElementById(
        "filtro-disciplina"
      );

    const filtroSerie =
      document.getElementById(
        "filtro-serie"
      );

    const filtroBimestre =
      document.getElementById(
        "filtro-bimestre"
      );

    const filtroAula =
      document.getElementById(
        "filtro-aula"
      );

    const filtroBusca =
      document.getElementById(
        "filtro-busca"
      );

    const botaoLimpar =
      document.getElementById(
        "btn-limpar-filtros"
      );

    const painelFiltros =
      configurarPainelFiltros();


    filtroMaterial?.addEventListener(
      "change",
      () => {
        if (filtroDisciplina) {
          filtroDisciplina.value = "";
        }

        if (filtroSerie) {
          filtroSerie.value = "";
        }

        if (filtroBimestre) {
          filtroBimestre.value = "";
        }

        if (filtroAula) {
          filtroAula.value = "";
        }

        preencherOpcoesDisciplina(
          filtroMaterial.value
        );

        preencherOpcoesSerie(
          filtroMaterial.value,
          ""
        );

        preencherOpcoesBimestre(
          filtroMaterial.value,
          "",
          ""
        );

        preencherOpcoesAula(
          filtroMaterial.value,
          "",
          "",
          ""
        );

        aplicarFiltros();
        salvarFiltrosAtuais();
        painelFiltros
          .atualizarContadorFiltros();
      }
    );


    filtroDisciplina?.addEventListener(
      "change",
      () => {
        if (filtroSerie) {
          filtroSerie.value = "";
        }

        if (filtroBimestre) {
          filtroBimestre.value = "";
        }

        if (filtroAula) {
          filtroAula.value = "";
        }

        preencherOpcoesSerie(
          filtroMaterial?.value || "",
          filtroDisciplina.value
        );

        preencherOpcoesBimestre(
          filtroMaterial?.value || "",
          filtroDisciplina.value,
          ""
        );

        preencherOpcoesAula(
          filtroMaterial?.value || "",
          filtroDisciplina.value,
          "",
          ""
        );

        aplicarFiltros();
        salvarFiltrosAtuais();
        painelFiltros
          .atualizarContadorFiltros();
      }
    );


    filtroSerie?.addEventListener(
      "change",
      () => {
        if (filtroBimestre) {
          filtroBimestre.value = "";
        }

        if (filtroAula) {
          filtroAula.value = "";
        }

        preencherOpcoesBimestre(
          filtroMaterial?.value || "",
          filtroDisciplina?.value || "",
          filtroSerie.value
        );

        preencherOpcoesAula(
          filtroMaterial?.value || "",
          filtroDisciplina?.value || "",
          filtroSerie.value,
          ""
        );

        aplicarFiltros();
        salvarFiltrosAtuais();
        painelFiltros
          .atualizarContadorFiltros();
      }
    );


    filtroBimestre?.addEventListener(
      "change",
      () => {
        if (filtroAula) {
          filtroAula.value = "";
        }

        preencherOpcoesAula(
          filtroMaterial?.value || "",
          filtroDisciplina?.value || "",
          filtroSerie?.value || "",
          filtroBimestre.value
        );

        aplicarFiltros();
        salvarFiltrosAtuais();
        painelFiltros
          .atualizarContadorFiltros();
      }
    );


    filtroAula?.addEventListener(
      "change",
      () => {
        aplicarFiltros();
        salvarFiltrosAtuais();
        painelFiltros
          .atualizarContadorFiltros();
      }
    );


    filtroBusca?.addEventListener(
      "input",
      () => {
        aplicarFiltros();
        salvarFiltrosAtuais();
        painelFiltros
          .atualizarContadorFiltros();
      }
    );


    botaoLimpar?.addEventListener(
      "click",
      () => {
        limparFiltros();

        painelFiltros
          .atualizarContadorFiltros();
      }
    );

    document.addEventListener(
      "idiomaalterado",
      () => {
        /*
         * Os valores persistidos dos filtros permanecem estáveis em
         * português, mas seus rótulos e todos os cards são reconstruídos
         * no idioma selecionado.
         */
        restaurarFiltrosSalvos();

        atualizarRotuloFiltroAula(
          document.getElementById(
            "filtro-material"
          )?.value || ""
        );

        aplicarFiltros();

        painelFiltros
          .atualizarContadorFiltros();
      }
    );

    aplicarFiltros();
    salvarFiltrosAtuais();

    painelFiltros
      .atualizarContadorFiltros();
  }
);

window.addEventListener(
  "pagehide",
  salvarFiltrosAtuais
);