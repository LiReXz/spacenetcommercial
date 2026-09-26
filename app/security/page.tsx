import type { Metadata } from "next";
import { Security } from "@/components/Security";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Security — SpaceNet",
  description:
    "Security model and shared responsibility for orbital computing workloads.",
};

export default function SecurityPage() {
  return (
    <main className="pt-16">
      <Security />
      <FinalCTA />
    </main>
  );
}
