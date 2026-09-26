import type { Metadata } from "next";
import { HowItWorks } from "@/components/HowItWorks";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Technology — SpaceNet",
  description: "How orbital computing works, from uplink to onboard execution.",
};

export default function TechnologyPage() {
  return (
    <main className="pt-16">
      <HowItWorks />
      <FinalCTA />
    </main>
  );
}
