import type { Dictionary } from "./types";

export const en: Dictionary = {
  nav: {
    platform: "Platform",
    product: "Product",
    productItems: [
      { name: "MiniNode-01", desc: "Orbital compute node", href: "#mininode" },
    ],
    technology: "Technology",
    useCases: "Use Cases",
    developers: "Developers",
    security: "Security",
    contact: "Contact us",
  },
  hero: {
    eyebrow: "Orbital Computing-as-a-Service",
    title: "Compute beyond Earth.",
    subtitle:
      "Deploy your software on orbital computing infrastructure. Process spaceborne data closer to where it is generated — without building your own space infrastructure.",
    primary: "Explore the platform",
    secondary: "Talk to our team",
    scrollAria: "Scroll to next section",
  },
  problem: {
    label: "Why orbital computing",
    title: "Not every byte needs to reach Earth.",
    subtitle:
      "Spacecraft generate more data than they can send down. Bandwidth, communication windows, latency and storage all constrain what reaches the ground. Orbital computing lets you process data near its origin — and choose what deserves the trip home.",
    constraintsLabel: "Downlink constraints",
    constraints: [
      {
        title: "Bandwidth",
        body: "Downlink capacity is limited — raw sensor data exceeds what the link can carry.",
      },
      {
        title: "Contact windows",
        body: "A satellite only sees a ground station for a few minutes per pass.",
      },
      {
        title: "Latency",
        body: "Distance and waiting for the next pass delay data delivery to the ground.",
      },
      {
        title: "Onboard storage",
        body: "What can't be downlinked must be stored onboard — and space is finite.",
      },
    ],
    raw: "Raw data",
    results: "Results",
    toEarth: "to Earth — ready to use",
    compute: "Onboard compute",
    blocks: [
      {
        title: "Process closer to the source",
        body: "Run computation where the data is generated. Onboard CPU/GPU resources let your software operate on spaceborne data in orbit.",
      },
      {
        title: "Reduce unnecessary data transfers",
        body: "Downlink capacity, contact windows and onboard storage are finite. Select which results are worth transmitting instead of raw everything.",
      },
      {
        title: "Enable new space-based applications",
        body: "A software-defined execution environment in orbit opens the door to applications that were impractical with ground-only processing.",
      },
    ],
  },
  platform: {
    label: "Platform overview",
    title: "Your software is just the beginning.",
    subtitle:
      "Today you deploy your workloads on our orbital infrastructure — validation, deployment, execution environment, resource management, telemetry and results delivery. Tomorrow, the platform grows with you.",
    stages: [
      {
        tag: "INPUT",
        name: "Customer Workload",
        desc: "Your application, model, algorithm or processing pipeline — packaged as a deployable workload.",
      },
      {
        tag: "FORGE",
        name: "Develop, package & validate",
        desc: "Build against supported environments, verify compatibility and prepare deployable artifacts.",
      },
      {
        tag: "HELM",
        name: "Manage, authorize & deploy",
        desc: "Version-controlled deployments, authorization workflows and mission management.",
      },
      {
        tag: "ORBITAL COMPUTE",
        name: "Execute on onboard CPU/GPU",
        desc: "Your workload runs on orbital compute hardware with managed resource allocation.",
      },
      {
        tag: "DATA PROCESSING",
        name: "Run customer-defined workloads",
        desc: "Controlled access to input data. Your software performs the mission-specific processing.",
      },
      {
        tag: "RESULTS",
        name: "Store, monitor & deliver",
        desc: "Telemetry, execution status and outputs delivered back through the platform.",
      },
    ],
    note: [
      { text: "Workload compatibility depends on " },
      { text: "data profiles, resource envelopes", strong: true },
      { text: " and " },
      { text: "platform security policies", strong: true },
      {
        text: ". Not every data format or application is automatically supported — each workload is validated before deployment.",
      },
    ],
    roadmapLabel: "Platform roadmap",
    roadmap: [
      {
        phase: "Now",
        title: "Deploy your software",
        body: "Your workloads run on MiniNode-01's onboard CPU/GPU to process spaceborne data.",
      },
      {
        phase: "Next",
        title: "Bring your own models",
        body: "Upload and execute your own models on the satellite's GPU.",
      },
      {
        phase: "Later",
        title: "Software catalog",
        body: "Ready-made workloads you can deploy without developing your own.",
      },
      {
        phase: "Future",
        title: "Model catalog",
        body: "Pre-built models organized by purpose, ready to run in orbit.",
      },
      {
        phase: "Beyond",
        title: "Fully custom solutions",
        body: "End-to-end tailored missions — dedicated configurations built around your needs.",
      },
    ],
  },
  howItWorks: {
    label: "How it works",
    title: "From code to orbit.",
    subtitle:
      "A defined lifecycle takes your software from development to execution on orbital hardware — with validation at every step.",
    steps: [
      {
        title: "Develop",
        body: "Build your application or processing pipeline using SpaceNet Forge and the supported development tools.",
      },
      {
        title: "Validate",
        body: "Package your workload and verify compatibility, resource requirements and security constraints.",
      },
      {
        title: "Deploy",
        body: "Authorize and deploy a specific workload version through SpaceNet Helm.",
      },
      {
        title: "Execute",
        body: "Run your workload on orbital compute infrastructure and monitor execution and results.",
      },
    ],
    footnote:
      "Workloads execute within supported runtime environments and defined resource envelopes. Compatibility is verified during validation — not assumed.",
  },
  workloads: {
    label: "Built for different workloads",
    title: "One platform. Multiple applications.",
    subtitle:
      "Customers bring their own algorithms — the specific software depends on the use case and the compatibility of its data profile. These are illustrative applications, not certified capabilities.",
    cases: [
      {
        title: "Earth observation analytics",
        body: "Run geospatial processing pipelines on imagery where it is captured.",
      },
      {
        title: "Image filtering & compression",
        body: "Screen, rank and compress imagery onboard before downlink.",
      },
      {
        title: "AI inference at the edge",
        body: "Deploy your trained models to run inference on spaceborne data.",
      },
      {
        title: "Scientific data processing",
        body: "Execute research pipelines on instrument data in orbit.",
      },
      {
        title: "Signal processing",
        body: "Process RF and sensor signals with customer-defined algorithms.",
      },
      {
        title: "Custom orbital applications",
        body: "Bring your own software for workloads we haven't imagined yet.",
      },
    ],
  },
  products: {
    label: "Two interfaces. One lifecycle.",
    title: "Forge & Helm",
    subtitle:
      "A developer environment to build and prepare workloads — and an operations platform to manage them in orbit.",
    disclaimer: "Interface concepts shown for illustration",
    dev: {
      name: "SpaceNet Forge",
      role: "Developer environment",
      tagline: "Build and prepare workloads for orbital computing.",
      note: "Test against a full PRO replica — never against PRO itself.",
      features: [
        "Package applications",
        "Validate workload requirements",
        "Prepare deployable artifacts",
        "Test against supported environments",
      ],
    },
    ops: {
      name: "SpaceNet Helm",
      role: "Mission & operations platform",
      tagline: "Manage your workloads and orbital operations.",
      features: [
        "Manage deployments and versions",
        "Monitor execution and telemetry",
        "Manage missions",
        "View results and workload status",
      ],
    },
    mockup: {
      gpuLabel: "GPU utilization",
      passLabel: "pass 0417 · nominal",
      running: "Running",
      queued: "Queued",
      complete: "Complete",
    },
  },
  mininode: {
    label: "The hardware",
    title: "Meet MiniNode-01.",
    subtitle:
      "A compute node in orbit — a standard satellite bus carrying a ruggedized CPU/GPU payload. This is where your software runs.",
    caption: "Exploded concept view — illustrative, not to scale",
    products: ["MiniNode-01"],
    upcoming: ["MiniNode-02"],
    comingSoon: "Soon",
    parts: [
      {
        title: "Solar arrays",
        body: "Silicon-wing panels feed the power system through every orbit — sized for compute loads, not just housekeeping.",
      },
      {
        title: "Compute module",
        body: "The MiniNode-01 core: onboard CPU/GPU with managed memory and storage. Your workload executes here.",
      },
      {
        title: "Satellite bus",
        body: "Structure, power distribution and thermal control — the platform that keeps the payload alive orbit after orbit.",
      },
      {
        title: "Comms",
        body: "S/X-band links to ground stations — telemetry and results down, workloads and updates up, inside every contact window.",
      },
      {
        title: "ADCS",
        body: "Attitude determination and control — star trackers and reaction wheels keep the node stable and pointed.",
      },
    ],
  },
  developers: {
    label: "Built for developers",
    title: "Bring your own software.",
    subtitle:
      "You don't need us to write your algorithms. Develop your software, package it as a workload and deploy it into a supported execution environment — subject to validation and authorization.",
    comment1: "# workload.manifest",
    comment2: "# validated → authorized → deployed",
    cta: "Talk to our engineering team",
    points: [
      {
        title: "Customer-owned workloads",
        body: "Your software stays yours. Package it, deploy it, iterate on it.",
      },
      {
        title: "Defined execution environments",
        body: "Supported runtimes and data profiles — no ambiguity about what runs.",
      },
      {
        title: "Versioned deployments",
        body: "Every deployment maps to a specific, authorized workload version.",
      },
      {
        title: "Resource-aware execution",
        body: "CPU, GPU and storage allocated within declared envelopes.",
      },
      {
        title: "Controlled access to data",
        body: "Workloads receive governed access to the inputs they need.",
      },
    ],
  },
  security: {
    label: "Security & control",
    title: "Built for controlled execution in orbit.",
    subtitle:
      "Running third-party software on space infrastructure demands discipline. The platform is designed around validation, authorization and observability at every stage.",
    items: [
      {
        title: "Workload validation",
        body: "Every workload is checked against compatibility and policy requirements before it can fly.",
      },
      {
        title: "Authorized & versioned software",
        body: "Only reviewed, authorized workload versions are eligible for deployment.",
      },
      {
        title: "Controlled resource allocation",
        body: "CPU, GPU and storage are assigned within declared envelopes — no silent overreach.",
      },
      {
        title: "Isolated execution environments",
        body: "Workloads run in contained environments separated from the platform and each other.",
      },
      {
        title: "Traceability & observability",
        body: "Execution status, telemetry and results are visible throughout the workload lifecycle.",
      },
    ],
    responsibility: {
      label: "Shared responsibility",
      ours: {
        title: "SpaceNet provides",
        items: [
          "Orbital compute platform & MiniNode-01 hardware (CPU/GPU)",
          "SpaceNet Forge & SpaceNet Helm applications, running on our infrastructure",
          "GitHub integration — your code builds on our micros",
          "Observability APIs — telemetry, execution status, results",
          "Prepared execution environments for your software",
        ],
      },
      theirs: {
        title: "The customer operates",
        items: [
          "Forge & Helm — you manage missions, simulations and PRO usage",
          "What your software does on the satellite — logic, behavior, outputs",
          "Orbit corrections & maneuvers your mission requires",
          "Your data, models and how results are used",
          "Compliance of your workload with your own requirements",
        ],
      },
    },
    mechanismsLabel: "Security mechanisms",
    mechanisms: [
      "Signed artifacts & version pinning",
      "Encrypted uplink & downlink",
      "Least-privilege access",
      "Audit trail",
      "Secrets management",
      "Runtime isolation",
    ],
  },
  cta: {
    label: "Get in touch",
    title: "Ready to bring computing to orbit?",
    subtitle:
      "Whether you're building space infrastructure, developing orbital applications or exploring new ways to process spaceborne data — let's talk.",
    pilot: {
      title: "Discuss a pilot mission",
      body: "Exploring a concrete use case? Tell us about your data profile and processing needs — we'll assess workload compatibility together.",
      button: "Start with a pilot",
    },
    partners: {
      title: "Partnerships & investment",
      body: "We work with satellite operators, technology partners and investors building the next layer of space infrastructure.",
    },
    form: {
      ariaLabel: "Contact form",
      name: "Name *",
      email: "Work email *",
      company: "Company",
      interest: "I'm interested in",
      message: "Message *",
      submit: "Contact our team",
      sending: "Sending…",
      privacyNote: "We'll only use your details to respond to your inquiry.",
      placeholders: {
        name: "Jane Doe",
        email: "jane@company.com",
        company: "Company Inc.",
        message: "Tell us about your use case, data profile or mission…",
      },
      interests: [
        "Deploy a workload",
        "Satellite operator partnership",
        "Technology partnership",
        "Pilot mission",
        "Investment",
        "Other",
      ],
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid work email.",
        message: "Tell us briefly about your use case (10+ characters).",
      },
      success: {
        title: "Message received",
        body: "Thanks for reaching out. Our team will get back to you shortly.",
        again: "Send another message",
      },
    },
  },
  footer: {
    tagline:
      "The orbital computing platform for the next generation of space applications.",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Overview", href: "#platform" },
          { label: "Forge", href: "#products" },
          { label: "Helm", href: "#products" },
          { label: "MiniNode-01", href: "#mininode" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Technology", href: "#technology" },
          { label: "Use Cases", href: "#use-cases" },
          { label: "Security", href: "#security" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Developers", href: "#developers" },
          { label: "Contact", href: "#contact" },
          { label: "LinkedIn", href: "https://www.linkedin.com", external: true },
        ],
      },
    ],
    rights: "All rights reserved.",
    privacy: "Privacy",
    legal: "Legal",
    linkedinAria: "LinkedIn",
  },
};
