import { Wizard } from "@/components/wizard";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-10 sm:py-14 bg-muted/40 min-h-screen">
      <Wizard />
    </main>
  );
}
