import { Wizard } from "@/components/wizard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12 sm:py-16">
      <Card className="w-full max-w-2xl mb-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
            SLA Intake Tool
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-muted-foreground">
            Beantwoord de vragen om een SLA-tieradvies te genereren.
          </CardDescription>
        </CardHeader>
      </Card>
      <Wizard />
    </main>
  );
}
