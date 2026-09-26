import type { Metadata } from "next";
import { Platform } from "@/components/Platform";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Platform — SpaceNet",
  description:
    "The orbital computing platform: how workloads move from Earth to orbit and back.",
};

export default function PlatformPage() {
  return (
    <main className="pt-16">
      <Platform />
      <FinalCTA />
    </main>
  );
}
