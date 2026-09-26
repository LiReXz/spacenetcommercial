import type { Dictionary } from "./types";

export const es: Dictionary = {
  nav: {
    platform: "Plataforma",
    product: "Producto",

    technology: "Tecnología",
    useCases: "Casos de uso",
    developers: "Developers",
    security: "Seguridad",
    contact: "Contáctanos",
  },
  hero: {
    eyebrow: "Orbital Computing-as-a-Service",
    title: "Computación más allá de la Tierra.",
    subtitle:
      "Procesa los datos de tu constelación en nuestro nodo de computación orbital — ejecutando el software que desarrollas, sobre infraestructura que operamos nosotros.",
    primary: "Explora la plataforma",
    secondary: "Habla con nuestro equipo",
    scrollAria: "Ir a la siguiente sección",
  },
  problem: {
    label: "Por qué computación orbital",
    title: "No todos los bytes necesitan llegar a la Tierra.",
    subtitle:
      "Las naves espaciales generan más datos de los que pueden enviar a tierra. El ancho de banda, las ventanas de comunicación, la latencia y el almacenamiento limitan lo que llega al suelo. La computación orbital permite procesar los datos cerca de su origen — y elegir qué merece el viaje de vuelta.",
    constraintsLabel: "Limitaciones del enlace a Tierra",
    constraints: [
      {
        title: "Ancho de banda",
        body: "La capacidad del enlace es limitada — los datos brutos de los sensores superan lo que se puede transmitir.",
      },
      {
        title: "Ventanas de contacto",
        body: "Un satélite solo ve una estación terrestre unos minutos por pasada.",
      },
      {
        title: "Latencia",
        body: "La distancia y la espera a la siguiente ventana retrasan la entrega de datos.",
      },
      {
        title: "Almacenamiento a bordo",
        body: "Lo que no se puede transmitir debe guardarse a bordo — y el espacio es finito.",
      },
    ],
    raw: "Datos brutos",
    results: "Resultados",
    toEarth: "a Tierra — listos para usar",
    compute: "Computación a bordo",
    blocks: [
      {
        title: "Procesa cerca de la fuente",
        body: "Ejecuta la computación en un nodo dedicado en órbita — no en cada satélite. Tu software trabaja sobre los datos del resto de tu constelación sin esperar a la siguiente ventana de contacto.",
      },
      {
        title: "Reduce transferencias innecesarias",
        body: "La capacidad de downlink, las ventanas de contacto y el almacenamiento a bordo son finitos. Selecciona qué resultados merece la pena transmitir en lugar de enviarlo todo en bruto.",
      },
      {
        title: "Habilita nuevas aplicaciones espaciales",
        body: "Un entorno de ejecución definido por software en órbita abre la puerta a aplicaciones que eran inviables con procesamiento solo en tierra.",
      },
    ],
  },
  platform: {
    label: "Visión de la plataforma",
    title: "Tu software es solo el comienzo.",
    subtitle:
      "Desarrollas el software de procesamiento — se ejecuta en nuestro nodo de computación MiniNode, sobre los datos que llegan de tus satélites. La plataforma cubre validación, despliegue, ejecución, gestión de recursos, telemetría y entrega de resultados — y crece contigo.",
    stages: [
      {
        tag: "ENTRADA",
        name: "Workload del cliente",
        desc: "Tu aplicación, modelo, algoritmo o pipeline de procesamiento — empaquetado como un workload desplegable.",
      },
      {
        tag: "FORGE",
        name: "Desarrolla, empaqueta y valida",
        desc: "Construye sobre entornos soportados, verifica la compatibilidad y prepara artefactos desplegables.",
      },
      {
        tag: "HELM",
        name: "Gestiona, autoriza y despliega",
        desc: "Despliegues con control de versiones, flujos de autorización y gestión de misiones.",
      },
      {
        tag: "ORBITAL COMPUTE",
        name: "Ejecuta en CPU/GPU a bordo",
        desc: "Tu workload se ejecuta en hardware de computación orbital con asignación de recursos gestionada.",
      },
      {
        tag: "PROCESAMIENTO",
        name: "Ejecuta workloads definidos por el cliente",
        desc: "Los datos de tus satélites se entregan al nodo para su procesamiento. Tu software realiza el trabajo específico de la misión.",
      },
      {
        tag: "RESULTADOS",
        name: "Almacena, monitoriza y entrega",
        desc: "Telemetría, estado de ejecución y salidas entregadas a través de la plataforma.",
      },
    ],
    note: [
      { text: "La compatibilidad del workload depende de los " },
      { text: "perfiles de datos, envolventes de recursos", strong: true },
      { text: " y " },
      { text: "políticas de seguridad de la plataforma", strong: true },
      {
        text: " definidos. No todos los formatos de datos ni aplicaciones están soportados automáticamente — cada workload se valida antes del despliegue.",
      },
    ],
    roadmapLabel: "Roadmap de la plataforma",
    roadmap: [
      {
        phase: "Ahora",
        title: "Despliega tu software",
        body: "Tus workloads se ejecutan en la CPU/GPU a bordo de MiniNode-01 para procesar datos espaciales.",
      },
      {
        phase: "Siguiente",
        title: "El datacenter orbital",
        body: "MiniNode escala a computación compartida multi-tenant — una malla de nodos en órbita sirviendo a muchas constelaciones.",
      },
      {
        phase: "Después",
        title: "Catálogos",
        body: "Workloads listos y modelos predefinidos que puedes ejecutar en órbita sin desarrollo propio.",
      },
      {
        phase: "Visión",
        title: "Soluciones totalmente personalizadas",
        body: "Misiones a medida de principio a fin — configuraciones dedicadas construidas en torno a tus necesidades.",
      },
    ],
  },
  howItWorks: {
    label: "Cómo funciona",
    title: "Del código a la órbita.",
    subtitle:
      "Un ciclo de vida definido lleva tu software del desarrollo a la ejecución en hardware orbital — con validación en cada paso.",
    steps: [
      {
        title: "Desarrolla",
        body: "Construye tu aplicación o pipeline de procesamiento usando SpaceNet Forge y las herramientas de desarrollo soportadas.",
      },
      {
        title: "Valida",
        body: "Empaqueta tu workload y verifica la compatibilidad, los requisitos de recursos y las restricciones de seguridad.",
      },
      {
        title: "Despliega",
        body: "Autoriza y despliega una versión específica del workload a través de SpaceNet Helm.",
      },
      {
        title: "Ejecuta",
        body: "Ejecuta tu workload en infraestructura de computación orbital y monitoriza la ejecución y los resultados.",
      },
    ],
    footnote:
      "Los workloads se ejecutan dentro de entornos runtime soportados y envelopes de recursos definidos. La compatibilidad se verifica durante la validación — no se asume.",
  },
  workloads: {
    label: "Diseñado para distintos workloads",
    title: "Una plataforma. Múltiples aplicaciones.",
    subtitle:
      "Los clientes aportan sus propios algoritmos — el software específico depende del caso de uso y de la compatibilidad de su perfil de datos. Estas son aplicaciones ilustrativas, no capacidades certificadas.",
    cases: [
      {
        title: "Analítica de observación terrestre",
        body: "Ejecuta pipelines de procesamiento geoespacial sobre las imágenes donde se capturan.",
      },
      {
        title: "Filtrado y compresión de imágenes",
        body: "Filtra, prioriza y comprime imágenes a bordo antes del downlink.",
      },
      {
        title: "Inferencia de IA en el edge",
        body: "Despliega tus modelos entrenados para ejecutar inferencia sobre datos espaciales.",
      },
      {
        title: "Procesamiento de datos científicos",
        body: "Ejecuta pipelines de investigación sobre datos de instrumentos en órbita.",
      },
      {
        title: "Procesamiento de señal",
        body: "Procesa señales RF y de sensores con algoritmos definidos por el cliente.",
      },
      {
        title: "Aplicaciones orbitales a medida",
        body: "Trae tu propio software para workloads que aún no hemos imaginado.",
      },
    ],
  },
  products: {
    label: "Dos interfaces. Un ciclo de vida.",
    title: "Forge & Helm",
    subtitle:
      "Un entorno de desarrollo para construir y preparar workloads — y una plataforma de operaciones para gestionarlos en órbita.",
    disclaimer: "Interfaces conceptuales mostradas con fines ilustrativos",
    dev: {
      name: "SpaceNet Forge",
      role: "Entorno de desarrollo",
      tagline: "Construye y prepara workloads para computación orbital.",
      note: "Prueba contra una réplica completa de PRO — nunca contra PRO.",
      features: [
        "Empaqueta aplicaciones",
        "Valida requisitos del workload",
        "Prepara artefactos desplegables",
        "Prueba contra entornos soportados",
      ],
    },
    ops: {
      name: "SpaceNet Helm",
      role: "Plataforma de misiones y operaciones",
      tagline: "Gestiona tus workloads y operaciones orbitales.",
      features: [
        "Gestiona despliegues y versiones",
        "Monitoriza ejecución y telemetría",
        "Gestiona misiones",
        "Consulta resultados y estado de workloads",
      ],
    },
    mockup: {
      gpuLabel: "Utilización de GPU",
      passLabel: "pasada 0417 · nominal",
      running: "Ejecutando",
      queued: "En cola",
      complete: "Completado",
    },
  },
  mininode: {
    label: "El hardware",
    title: "Conoce MiniNode-01.",
    subtitle:
      "Un nodo de computación en órbita — un bus satelital estándar que lleva un payload CPU/GPU rugerizado. Aquí corre tu software, procesando los datos del resto de tu constelación.",
    caption: "Vista explotada conceptual — ilustrativa, no a escala",
    modelsLabel: "Nodo",
    models: [
      { name: "MiniNode-01", available: true },
      { name: "MiniNode-02", available: false },
      { name: "MiniNode-03", available: false },
    ],
    comingSoon: "Pronto",
    soonNote: "En desarrollo — specs y disponibilidad se publicarán aquí.",
    parts: [
      {
        title: "Paneles solares",
        body: "Alas de silicio que alimentan el sistema de potencia en cada órbita — dimensionadas para cargas de computación, no solo para housekeeping.",
        detail:
          "Dos alas desplegables entregan potencia sostenida durante todo el ciclo — margen suficiente para correr workloads CPU/GPU de forma continua, no a ráfagas. La disposición de celdas y el área de las alas están dimensionadas en torno a la envolvente de computación, así que el payload nunca espera carga.",
      },
      {
        title: "Módulo de computación",
        body: "El núcleo MiniNode-01: CPU/GPU a bordo con memoria y almacenamiento gestionados. Aquí se ejecuta tu workload.",
        detail:
          "Un payload CPU/GPU rugerizado con memoria y almacenamiento gestionados, aislado por workload. La plataforma planifica, monitoriza y reinicia los jobs — tú envías código, el módulo lo ejecuta en órbita y devuelve resultados.",
      },
      {
        title: "Bus satelital",
        body: "Estructura, distribución de potencia y control térmico — la plataforma que mantiene vivo el payload órbita tras órbita.",
        detail:
          "Una arquitectura de bus estándar gestiona estructura, distribución de potencia y control térmico de forma autónoma. Absorbe el entorno orbital — ciclos térmicos, radiación, eclipses — para que el payload de computación vea condiciones estables.",
      },
      {
        title: "Comunicaciones",
        body: "Enlaces en banda S/X con estaciones terrenas — telemetría y resultados hacia abajo, workloads y actualizaciones hacia arriba, en cada ventana de contacto.",
        detail:
          "Radios en banda S/X enlazan el nodo con la red de estaciones terrenas en cada pasada. La telemetría y los resultados bajan, los nuevos workloads y actualizaciones de software suben — todo dentro de la ventana de contacto, sin enlace permanente.",
      },
      {
        title: "ADCS",
        body: "Determinación y control de actitud — star trackers y ruedas de reacción mantienen el nodo estable y orientado.",
        detail:
          "Star trackers y ruedas de reacción mantienen la actitud precisa en cada órbita — antena apuntando a las estaciones terrenas durante los contactos, alas al Sol entre ellos. El apuntado es continuo y autónomo.",
      },
    ],
  },
  developers: {
    label: "Diseñado para developers",
    title: "Trae tu propio software.",
    subtitle:
      "No necesitas que escribamos tus algoritmos. Desarrolla tu software, empaquétalo como workload y despliégalo en un entorno de ejecución soportado — sujeto a validación y autorización.",
    comment1: "# workload.manifest",
    comment2: "# validado → autorizado → desplegado",
    cta: "Habla con nuestro equipo de ingeniería",
    points: [
      {
        title: "Workloads del cliente",
        body: "Tu software sigue siendo tuyo. Empaquétalo, despliégalo e itera sobre él.",
      },
      {
        title: "Entornos de ejecución definidos",
        body: "Runtimes y perfiles de datos soportados — sin ambigüedad sobre qué se ejecuta.",
      },
      {
        title: "Despliegues versionados",
        body: "Cada despliegue corresponde a una versión de workload específica y autorizada.",
      },
      {
        title: "Ejecución consciente de recursos",
        body: "CPU, GPU y almacenamiento asignados dentro de envelopes declarados.",
      },
      {
        title: "Acceso controlado a los datos",
        body: "Los workloads reciben acceso gobernado a las entradas que necesitan.",
      },
    ],
  },
  security: {
    label: "Seguridad y control",
    title: "Diseñado para ejecución controlada en órbita.",
    subtitle:
      "Ejecutar software de terceros en infraestructura espacial exige disciplina. La plataforma está diseñada en torno a validación, autorización y observabilidad en cada etapa.",
    items: [
      {
        title: "Validación de workloads",
        body: "Cada workload se comprueba contra requisitos de compatibilidad y políticas antes de poder volar.",
      },
      {
        title: "Software autorizado y versionado",
        body: "Solo las versiones de workload revisadas y autorizadas son elegibles para despliegue.",
      },
      {
        title: "Asignación de recursos controlada",
        body: "CPU, GPU y almacenamiento se asignan dentro de envelopes declarados — sin excesos silenciosos.",
      },
      {
        title: "Entornos de ejecución aislados",
        body: "Los workloads se ejecutan en entornos contenidos, separados de la plataforma y entre sí.",
      },
      {
        title: "Trazabilidad y observabilidad",
        body: "El estado de ejecución, la telemetría y los resultados son visibles durante todo el ciclo de vida del workload.",
      },
    ],
    responsibility: {
      label: "Responsabilidad compartida",
      ours: {
        title: "SpaceNet proporciona",
        items: [
          "Plataforma de computación orbital y hardware de MiniNode-01 (CPU/GPU)",
          "Las aplicaciones SpaceNet Forge y SpaceNet Helm, corriendo en nuestra infraestructura",
          "Integración con GitHub — tu código se buildea en nuestros micros",
          "APIs de observabilidad — telemetría, estado de ejecución, resultados",
          "Entornos de ejecución preparados para tu software",
        ],
      },
      theirs: {
        title: "El cliente opera",
        items: [
          "Forge y Helm — gestionas misiones, simulaciones y el uso en PRO",
          "Lo que tu software hace en el satélite — lógica, comportamiento, salidas",
          "Las correcciones de órbita y maniobras que requiera tu misión",
          "Tus datos, modelos y el uso que hagas de los resultados",
          "El cumplimiento de tu workload con tus propios requisitos",
        ],
      },
    },
    mechanismsLabel: "Mecanismos de seguridad",
    mechanisms: [
      "Artefactos firmados y versiones fijadas",
      "Uplink y downlink cifrados",
      "Acceso de mínimo privilegio",
      "Registro de auditoría",
      "Gestión de secretos",
      "Aislamiento en runtime",
    ],
  },
  cta: {
    label: "Ponte en contacto",
    title: "¿Listo para llevar la computación a la órbita?",
    subtitle:
      "Tanto si estás construyendo infraestructura espacial, desarrollando aplicaciones orbitales o explorando nuevas formas de procesar datos espaciales — hablemos.",
    meeting: {
      title: "Agenda una reunión",
      body: "¿Quieres saber si nuestro producto encaja en tu constelación o prefieres resolver tus preguntas en directo? Elige fecha y hora — te enviaremos la convocatoria por email.",
      button: "Elige fecha y hora",
      pickTime: "Horarios disponibles",
      confirm: "Enviar solicitud",
      emailSubject: "Solicitud de reunión",
      emailBody:
        "¡Hola! Me gustaría agendar una reunión:\n\n{slot}\n\nNombre: {name}\nEmail: {email}\nEmpresa: {company}\nTema: {interest}\n\n{message}",
    },
    partners: {
      title: "Partnerships e inversión",
      body: "Somos un equipo early-stage financiado por sus fundadores — abiertos a conversar con operadores de satélites, socios tecnológicos e inversores.",
    },
    form: {
      title: "¿Tienes preguntas?",
      ariaLabel: "Formulario de contacto",
      name: "Nombre *",
      email: "Email de trabajo *",
      company: "Empresa",
      interest: "Me interesa",
      message: "Mensaje *",
      submit: "Contactar con el equipo",
      sending: "Enviando…",
      privacyNote: "Solo usaremos tus datos para responder a tu consulta.",
      mailtoSubject: "SpaceNet — formulario de contacto",
      placeholders: {
        name: "María García",
        email: "maria@empresa.com",
        company: "Empresa S.L.",
        message: "Cuéntanos tu caso de uso, perfil de datos o misión…",
      },
      interests: [
        "Procesar datos de satélites en órbita",
        "Partnership o colaboración",
        "Inversión",
        "Otro",
      ],
      errors: {
        name: "Introduce tu nombre.",
        email: "Introduce un email de trabajo válido.",
        message: "Cuéntanos brevemente tu caso de uso (10+ caracteres).",
      },
      success: {
        title: "Mensaje recibido",
        body: "Gracias por contactarnos. Nuestro equipo te responderá en breve.",
        again: "Enviar otro mensaje",
      },
    },
  },
  footer: {
    tagline:
      "La plataforma de computación orbital para la próxima generación de aplicaciones espaciales.",
    columns: [
      {
        title: "Plataforma",
        links: [
          { label: "Visión general", href: "/platform" },
          { label: "Forge", href: "/product#forge" },
          { label: "Helm", href: "/product#helm" },
          { label: "MiniNode-01", href: "/product#mininode" },
        ],
      },
      {
        title: "Empresa",
        links: [
          { label: "Tecnología", href: "/technology" },
          { label: "Casos de uso", href: "/use-cases" },
          { label: "Seguridad", href: "/security" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { label: "Developers", href: "/developers" },
          { label: "Contacto", href: "#contact" },
          { label: "LinkedIn", href: "https://www.linkedin.com", external: true },
        ],
      },
    ],
    rights: "Todos los derechos reservados.",
    privacy: "Privacidad",
    legal: "Legal",
    linkedinAria: "LinkedIn",
  },
};
