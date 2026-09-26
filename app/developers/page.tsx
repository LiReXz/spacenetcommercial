import type { Metadata } from "next";
import { Developers } from "@/components/Developers";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Developers — SpaceNet",
  description: "Build, package and deploy software for orbital infrastructure.",
};

export default function DevelopersPage() {
  return (
    <main className="pt-16">
      <Developers />
      <FinalCTA />
    </main>
  );
}
