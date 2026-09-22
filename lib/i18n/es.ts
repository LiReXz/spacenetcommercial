import type { Dictionary } from "./types";

export const es: Dictionary = {
  nav: {
    platform: "Plataforma",
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
      "Despliega tu software en infraestructura de computación orbital. Procesa datos generados en el espacio cerca de donde se originan — sin construir tu propia infraestructura espacial.",
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
        body: "Ejecuta la computación donde se generan los datos. Los recursos CPU/GPU a bordo permiten que tu software opere sobre datos espaciales en órbita.",
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
      "Hoy despliegas tus workloads en nuestra infraestructura orbital — validación, despliegue, entorno de ejecución, gestión de recursos, telemetría y entrega de resultados. Mañana, la plataforma crece contigo.",
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
        desc: "Acceso controlado a los datos de entrada. Tu software realiza el procesamiento específico de la misión.",
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
        body: "Tus workloads se ejecutan en la CPU/GPU a bordo de Mininode para procesar datos espaciales.",
      },
      {
        phase: "Siguiente",
        title: "Trae tus propios modelos",
        body: "Sube y ejecuta tus propios modelos en la GPU del satélite.",
      },
      {
        phase: "Después",
        title: "Catálogo de software",
        body: "Workloads listos para usar sin necesidad de desarrollar los tuyos.",
      },
      {
        phase: "Futuro",
        title: "Catálogo de modelos",
        body: "Modelos predefinidos organizados por propósito, listos para ejecutar en órbita.",
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
          "Plataforma de computación orbital y hardware de Mininode (CPU/GPU)",
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
    pilot: {
      title: "Hablemos de una misión piloto",
      body: "¿Explorando un caso de uso concreto? Cuéntanos tu perfil de datos y necesidades de procesamiento — evaluaremos la compatibilidad del workload juntos.",
      button: "Empezar con un piloto",
    },
    partners: {
      title: "Partnerships e inversión",
      body: "Trabajamos con operadores de satélites, socios tecnológicos e inversores que construyen la próxima capa de infraestructura espacial.",
    },
    form: {
      ariaLabel: "Formulario de contacto",
      name: "Nombre *",
      email: "Email de trabajo *",
      company: "Empresa",
      interest: "Me interesa",
      message: "Mensaje *",
      submit: "Contactar con el equipo",
      sending: "Enviando…",
      privacyNote: "Solo usaremos tus datos para responder a tu consulta.",
      placeholders: {
        name: "María García",
        email: "maria@empresa.com",
        company: "Empresa S.L.",
        message: "Cuéntanos tu caso de uso, perfil de datos o misión…",
      },
      interests: [
        "Desplegar un workload",
        "Partnership como operador de satélites",
        "Partnership tecnológico",
        "Misión piloto",
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
          { label: "Visión general", href: "#platform" },
          { label: "Forge", href: "#products" },
          { label: "Helm", href: "#products" },
        ],
      },
      {
        title: "Empresa",
        links: [
          { label: "Tecnología", href: "#technology" },
          { label: "Casos de uso", href: "#use-cases" },
          { label: "Seguridad", href: "#security" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { label: "Developers", href: "#developers" },
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
