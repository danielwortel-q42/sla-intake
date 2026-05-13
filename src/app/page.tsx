import { Wizard } from "@/components/wizard";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-2xl mb-10 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          SLA Intake Tool
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Beantwoord de vragen om een SLA-tieradvies te genereren.
        </p>
      </div>
      <Wizard />
    </main>
  );
}
