import type { Step } from "@/lib/questions";

export type Answers = Record<string, string>;

export interface ScoreResult {
  businessRisk: number;
  techRisk: number;
  operational: number;
  future: number;
  tier: "light" | "essential" | "essential-plus";
  tierLabel: string;
  tierDescription: string;
  businessLabel: string;
  techLabel: string;
  modules: string[];
  warnings: string[];
}

const purposeScore: Record<string, number> = {
  informational: 1,
  internal: 1,
  "self-service": 2,
  transactional: 3,
};

const downtimeScore: Record<string, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

const peakScore: Record<string, number> = {
  none: 0,
  occasional: 1,
  regular: 2,
};

const clientSlaScore: Record<string, number> = {
  no: 0,
  informal: 1,
  formal: 2,
};

const integrationScore: Record<string, number> = {
  none: 0,
  "1-2": 1,
  "3-5": 2,
  "6+": 3,
};

const techHealthScore: Record<string, number> = {
  good: 1,
  moderate: 2,
  poor: 3,
};

const cicdLackScore: Record<string, number> = {
  full: 0,
  partial: 1,
  none: 2,
};

const monitoringLackScore: Record<string, number> = {
  full: 0,
  partial: 1,
  none: 2,
};

const vulnerabilityScore: Record<string, number> = {
  none: 0,
  some: 1,
  many: 2,
};

const internalTechScore: Record<string, number> = {
  none: 0,
  limited: 1,
  yes: 2,
};

const responseSpeedScore: Record<string, number> = {
  fast: 2,
  day: 1,
  slow: 0,
};

const slaExperienceScore: Record<string, number> = {
  yes: 2,
  some: 1,
  none: 0,
};

const plannedChangesScore: Record<string, number> = {
  no: 0,
  maybe: 1,
  yes: 2,
};

const securityScore: Record<string, number> = {
  standard: 0,
  elevated: 1,
  strict: 2,
};

const proactiveScore: Record<string, number> = {
  reactive: 0,
  mixed: 1,
  proactive: 2,
};

export function calculateScores(answers: Answers): ScoreResult {
  const businessRisk =
    (purposeScore[answers.purpose] ?? 0) +
    (downtimeScore[answers.downtime_impact] ?? 0) +
    (peakScore[answers.peak_moments] ?? 0) +
    (clientSlaScore[answers.client_sla] ?? 0) +
    (integrationScore[answers.integrations] ?? 0);

  const techRisk =
    (techHealthScore[answers.tech_health] ?? 0) +
    (cicdLackScore[answers.cicd] ?? 0) +
    (monitoringLackScore[answers.monitoring] ?? 0) +
    (vulnerabilityScore[answers.vulnerabilities] ?? 0);

  const operational =
    (internalTechScore[answers.internal_tech] ?? 0) +
    (responseSpeedScore[answers.response_speed] ?? 0) +
    (slaExperienceScore[answers.sla_experience] ?? 0);

  const future =
    (plannedChangesScore[answers.planned_changes] ?? 0) +
    (securityScore[answers.security_requirements] ?? 0) +
    (proactiveScore[answers.proactive_reactive] ?? 0);

  let tier: ScoreResult["tier"];
  let tierLabel: string;
  let tierDescription: string;

  if (businessRisk >= 8 && techRisk >= 5) {
    tier = "essential-plus";
    tierLabel = "Essential Care +";
    tierDescription =
      "Het platform heeft een hoog business-risico en de technische staat vraagt om extra aandacht. We adviseren Essential Care met aanvullende modules voor optimale bescherming.";
  } else if (businessRisk >= 5 || techRisk >= 3) {
    tier = "essential";
    tierLabel = "Essential Care";
    tierDescription =
      "Op basis van het risicoprofiel en de technische staat adviseren we Essential Care. Dit biedt een solide basis met reactieve én proactieve ondersteuning.";
  } else {
    tier = "light";
    tierLabel = "Light Care";
    tierDescription =
      "Het platform heeft een laag risicoprofiel en een gezonde technische staat. Light Care biedt voldoende dekking met reactieve ondersteuning.";
  }

  const businessLabel =
    businessRisk <= 4 ? "Laag" : businessRisk <= 7 ? "Gemiddeld" : "Hoog";
  const techLabel =
    techRisk <= 2 ? "Gezond" : techRisk <= 4 ? "Aandachtspunt" : "Risicovol";

  const modules: string[] = [];
  if (answers.peak_moments === "regular") {
    modules.push("Extended availability (18/7)");
  }
  if (answers.security_requirements === "strict") {
    modules.push("Security hardening");
  }
  if (techRisk >= 5) {
    modules.push("SRE / Journey monitoring & SLO");
  }
  if (answers.planned_changes === "yes") {
    modules.push("Disaster Recovery testing");
  }

  const warnings: string[] = [];
  if (answers.monitoring === "none") {
    warnings.push(
      "Er is geen monitoring ingericht. Dit is vereist voor SLA-opstart — we moeten dit eerst regelen."
    );
  }
  if (answers.response_speed === "slow") {
    warnings.push(
      "De klant reageert traag (> 1 dag). SLA-klokken kunnen hierdoor stilvallen bij wederzijdse afhankelijkheden."
    );
  }
  if (answers.hosting === "client") {
    warnings.push(
      "De klant beheert eigen hosting. Er is een expliciete verantwoordelijkheidsverdeling nodig in Appendix C."
    );
  }

  return {
    businessRisk,
    techRisk,
    operational,
    future,
    tier,
    tierLabel,
    tierDescription,
    businessLabel,
    techLabel,
    modules,
    warnings,
  };
}

export function generateSummaryText(
  answers: Answers,
  result: ScoreResult,
  steps: Step[]
): string {
  const lines: string[] = [
    "SLA Intake — Advies",
    "====================",
    "",
    `Tieradvies: ${result.tierLabel}`,
    result.tierDescription,
    "",
    "Scores",
    "------",
    `Business-risico: ${result.businessRisk} (${result.businessLabel})`,
    `Technische staat: ${result.techRisk} (${result.techLabel})`,
    `Operationele volwassenheid: ${result.operational}/6`,
    `Toekomstscore: ${result.future}/6`,
  ];

  if (result.modules.length > 0) {
    lines.push("", "Aanbevolen modules", "-------------------");
    result.modules.forEach((m) => lines.push(`• ${m}`));
  }

  if (result.warnings.length > 0) {
    lines.push("", "Waarschuwingen", "--------------");
    result.warnings.forEach((w) => lines.push(`⚠ ${w}`));
  }

  lines.push("", "Antwoorden", "----------");
  for (const step of steps) {
    lines.push("", `${step.title}`);
    for (const q of step.questions) {
      const val = answers[q.key];
      if (!val) continue;
      const optLabel = q.options.find((o) => o.value === val)?.label ?? val;
      lines.push(`  ${q.label}`);
      lines.push(`  → ${optLabel}`);
      const ctx = answers[`${q.key}_context`];
      if (ctx) lines.push(`     (${ctx})`);
    }
  }

  lines.push("", "---", "Gegenereerd door Q42 SLA Intake Tool");
  return lines.join("\n");
}
