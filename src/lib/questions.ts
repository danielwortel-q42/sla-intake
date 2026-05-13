export type InputType = "card" | "pill";

export interface Option {
  value: string;
  label: string;
  subtitle?: string;
  icon?: string;
}

export interface ContextField {
  triggerValues: string[];
  placeholder: string;
  label: string;
}

export interface Question {
  key: string;
  label: string;
  type: InputType;
  options: Option[];
  contextField?: ContextField;
}

export interface Step {
  title: string;
  subtitle: string;
  questions: Question[];
}

export const steps: Step[] = [
  {
    title: "Platformprofiel",
    subtitle: "Vertel ons over het platform dat we gaan beheren.",
    questions: [
      {
        key: "purpose",
        label: "Wat is het hoofddoel van het platform?",
        type: "card",
        options: [
          {
            value: "informational",
            label: "Informationeel",
            subtitle: "Informatie tonen, geen transacties",
            icon: "Globe",
          },
          {
            value: "internal",
            label: "Intern platform",
            subtitle: "Alleen voor medewerkers",
            icon: "Building",
          },
          {
            value: "self-service",
            label: "Self-service portaal",
            subtitle: "Klanten loggen in en beheren zaken",
            icon: "UserCog",
          },
          {
            value: "transactional",
            label: "Transactioneel",
            subtitle: "Bestellingen, betalingen, boekingen",
            icon: "CreditCard",
          },
        ],
      },
      {
        key: "integrations",
        label: "Hoeveel externe integraties zijn er?",
        type: "pill",
        options: [
          { value: "none", label: "Geen" },
          { value: "1-2", label: "1–2" },
          { value: "3-5", label: "3–5" },
          { value: "6+", label: "6+" },
        ],
        contextField: {
          triggerValues: ["1-2", "3-5", "6+"],
          label: "Welke integraties?",
          placeholder: "bijv. Salesforce, Exact Online, Mollie…",
        },
      },
      {
        key: "hosting",
        label: "Wie beheert de hosting?",
        type: "card",
        options: [
          {
            value: "q42",
            label: "Q42",
            subtitle: "Wij regelen alles",
            icon: "Server",
          },
          {
            value: "client",
            label: "Klant zelf",
            subtitle: "Klant beheert eigen hosting",
            icon: "User",
          },
          {
            value: "third-party",
            label: "Derde partij",
            subtitle: "Andere hosting-partner",
            icon: "Cloud",
          },
        ],
        contextField: {
          triggerValues: ["third-party"],
          label: "Naam van de hostingpartij",
          placeholder: "bijv. AWS, Hetzner, TransIP…",
        },
      },
    ],
  },
  {
    title: "Business-risico",
    subtitle: "Hoe groot is de impact als het platform uitvalt?",
    questions: [
      {
        key: "downtime_impact",
        label: "Wat is de impact van downtime?",
        type: "card",
        options: [
          {
            value: "low",
            label: "Minimaal",
            subtitle: "Gebruikers merken het nauwelijks",
            icon: "ThumbsUp",
          },
          {
            value: "medium",
            label: "Merkbaar",
            subtitle: "Gebruikers ondervinden hinder",
            icon: "AlertTriangle",
          },
          {
            value: "high",
            label: "Groot",
            subtitle: "Directe omzetschade of reputatieschade",
            icon: "TrendingDown",
          },
          {
            value: "critical",
            label: "Kritiek",
            subtitle: "Bedrijfsprocessen vallen stil",
            icon: "XCircle",
          },
        ],
      },
      {
        key: "peak_moments",
        label: "Zijn er voorspelbare piekmomenten?",
        type: "pill",
        options: [
          { value: "none", label: "Nee, nauwelijks" },
          { value: "occasional", label: "Af en toe" },
          { value: "regular", label: "Regelmatig" },
        ],
      },
      {
        key: "client_sla",
        label: "Heeft de klant zelf SLA-verplichtingen naar eindgebruikers?",
        type: "pill",
        options: [
          { value: "no", label: "Nee" },
          { value: "informal", label: "Informeel / best-effort" },
          { value: "formal", label: "Ja, formeel vastgelegd" },
        ],
      },
    ],
  },
  {
    title: "Technische staat",
    subtitle: "Hoe staat het ervoor met de technische gezondheid?",
    questions: [
      {
        key: "tech_health",
        label: "Hoe zou je de codebase omschrijven?",
        type: "card",
        options: [
          {
            value: "good",
            label: "Gezond",
            subtitle: "Goed onderhouden, weinig tech debt",
            icon: "CheckCircle",
          },
          {
            value: "moderate",
            label: "Redelijk",
            subtitle: "Werkbaar, maar verbeterpunten",
            icon: "MinusCircle",
          },
          {
            value: "poor",
            label: "Matig",
            subtitle: "Veel tech debt, fragiele onderdelen",
            icon: "AlertOctagon",
          },
        ],
        contextField: {
          triggerValues: ["moderate", "poor"],
          label: "Toelichting",
          placeholder: "Wat zijn de voornaamste knelpunten of aandachtspunten?",
        },
      },
      {
        key: "cicd",
        label: "Is er een CI/CD-pipeline ingericht?",
        type: "pill",
        options: [
          { value: "full", label: "Ja, volledig" },
          { value: "partial", label: "Gedeeltelijk" },
          { value: "none", label: "Nee" },
        ],
        contextField: {
          triggerValues: ["partial", "none"],
          label: "Toelichting",
          placeholder: "Wat is er wel of niet ingericht? Wat ontbreekt?",
        },
      },
      {
        key: "monitoring",
        label: "Is er monitoring en alerting ingericht?",
        type: "pill",
        options: [
          { value: "full", label: "Ja, volledig" },
          { value: "partial", label: "Gedeeltelijk" },
          { value: "none", label: "Nee" },
        ],
        contextField: {
          triggerValues: ["partial", "none"],
          label: "Toelichting",
          placeholder: "Welke tools worden gebruikt? Wat ontbreekt nog?",
        },
      },
      {
        key: "vulnerabilities",
        label: "Zijn er bekende kwetsbaarheden of verouderde dependencies?",
        type: "pill",
        options: [
          { value: "none", label: "Nee" },
          { value: "some", label: "Enkele" },
          { value: "many", label: "Ja, veel" },
        ],
        contextField: {
          triggerValues: ["some", "many"],
          label: "Toelichting",
          placeholder: "Welke kwetsbaarheden of dependencies zijn bekend?",
        },
      },
    ],
  },
  {
    title: "Operationele volwassenheid",
    subtitle: "Hoe gaat de klantorganisatie om met technisch beheer?",
    questions: [
      {
        key: "internal_tech",
        label: "Heeft de klant intern technisch personeel?",
        type: "pill",
        options: [
          { value: "none", label: "Nee" },
          { value: "limited", label: "Beperkt" },
          { value: "yes", label: "Ja, een volledig team" },
        ],
      },
      {
        key: "response_speed",
        label: "Hoe snel reageert de klant doorgaans op vragen?",
        type: "pill",
        options: [
          { value: "fast", label: "Binnen uren" },
          { value: "day", label: "Binnen een dag" },
          { value: "slow", label: "Meer dan een dag" },
        ],
      },
      {
        key: "sla_experience",
        label: "Heeft de klant ervaring met SLA-afspraken?",
        type: "pill",
        options: [
          { value: "yes", label: "Ja, uitgebreide ervaring" },
          { value: "some", label: "Enige ervaring" },
          { value: "none", label: "Nee, dit is nieuw" },
        ],
      },
    ],
  },
  {
    title: "Verwachtingen",
    subtitle: "Wat zijn de plannen en wensen voor de toekomst?",
    questions: [
      {
        key: "planned_changes",
        label: "Zijn er grote wijzigingen gepland (migratie, redesign, etc.)?",
        type: "pill",
        options: [
          { value: "no", label: "Nee" },
          { value: "maybe", label: "Mogelijk" },
          { value: "yes", label: "Ja, zeker" },
        ],
        contextField: {
          triggerValues: ["maybe", "yes"],
          label: "Welke wijzigingen?",
          placeholder: "Beschrijf de geplande wijzigingen…",
        },
      },
      {
        key: "security_requirements",
        label: "Zijn er specifieke beveiligingseisen?",
        type: "pill",
        options: [
          { value: "standard", label: "Standaard" },
          { value: "elevated", label: "Verhoogd" },
          { value: "strict", label: "Streng / branchespecifiek" },
        ],
        contextField: {
          triggerValues: ["elevated", "strict"],
          label: "Toelichting",
          placeholder: "bijv. ISO 27001, NEN 7510, AVG-audit, PCI-DSS…",
        },
      },
      {
        key: "proactive_reactive",
        label: "Verwacht de klant proactief of reactief beheer?",
        type: "card",
        options: [
          {
            value: "reactive",
            label: "Reactief",
            subtitle: "Alleen ingrijpen bij problemen",
            icon: "PhoneCall",
          },
          {
            value: "mixed",
            label: "Gemengd",
            subtitle: "Reactief met periodieke check-ups",
            icon: "RefreshCw",
          },
          {
            value: "proactive",
            label: "Proactief",
            subtitle: "Continu monitoren en verbeteren",
            icon: "Eye",
          },
        ],
      },
    ],
  },
];
