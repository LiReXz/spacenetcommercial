export type Locale = "en" | "es";

export interface DictTitled {
  title: string;
  body: string;
}

export interface DictLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface DictSegment {
  text: string;
  strong?: boolean;
}

interface ProductDict {
  name: string;
  role: string;
  tagline: string;
  note?: string;
  features: string[];
}

export interface Dictionary {
  nav: {
    platform: string;
    product: string;
    productItems: { name: string; desc: string; href: string }[];
    technology: string;
    useCases: string;
    developers: string;
    security: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
    scrollAria: string;
  };
  problem: {
    label: string;
    title: string;
    subtitle: string;
    constraintsLabel: string;
    constraints: DictTitled[];
    raw: string;
    results: string;
    toEarth: string;
    compute: string;
    blocks: DictTitled[];
  };
  platform: {
    label: string;
    title: string;
    subtitle: string;
    stages: { tag: string; name: string; desc: string }[];
    note: DictSegment[];
    roadmapLabel: string;
    roadmap: { phase: string; title: string; body: string }[];
  };
  howItWorks: {
    label: string;
    title: string;
    subtitle: string;
    steps: DictTitled[];
    footnote: string;
  };
  workloads: {
    label: string;
    title: string;
    subtitle: string;
    cases: DictTitled[];
  };
  products: {
    label: string;
    title: string;
    subtitle: string;
    disclaimer: string;
    dev: ProductDict;
    ops: ProductDict;
    mockup: {
      gpuLabel: string;
      passLabel: string;
      running: string;
      queued: string;
      complete: string;
    };
  };
  mininode: {
    label: string;
    title: string;
    subtitle: string;
    caption: string;
    products: string[];
    upcoming: string[];
    comingSoon: string;
    parts: DictTitled[];
  };
  developers: {
    label: string;
    title: string;
    subtitle: string;
    comment1: string;
    comment2: string;
    cta: string;
    points: DictTitled[];
  };
  security: {
    label: string;
    title: string;
    subtitle: string;
    items: DictTitled[];
    responsibility: {
      label: string;
      ours: { title: string; items: string[] };
      theirs: { title: string; items: string[] };
    };
    mechanismsLabel: string;
    mechanisms: string[];
  };
  cta: {
    label: string;
    title: string;
    subtitle: string;
    pilot: { title: string; body: string; button: string };
    partners: { title: string; body: string };
    form: {
      ariaLabel: string;
      name: string;
      email: string;
      company: string;
      interest: string;
      message: string;
      submit: string;
      sending: string;
      privacyNote: string;
      placeholders: { name: string; email: string; company: string; message: string };
      interests: string[];
      errors: { name: string; email: string; message: string };
      success: { title: string; body: string; again: string };
    };
  };
  footer: {
    tagline: string;
    columns: { title: string; links: DictLink[] }[];
    rights: string;
    privacy: string;
    legal: string;
    linkedinAria: string;
  };
}
