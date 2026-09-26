import type { Metadata } from "next";
import { Workloads } from "@/components/Workloads";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Use Cases — SpaceNet",
  description: "Workloads that benefit from computing in orbit.",
};

export default function UseCasesPage() {
  return (
    <main className="pt-16">
      <Workloads />
      <FinalCTA />
    </main>
  );
}
