import type { Metadata } from "next";
import { Mininode } from "@/components/Mininode";
import { ProductSuite } from "@/components/ProductSuite";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Product — SpaceNet",
  description:
    "MiniNode-01 orbital compute node and the Forge & Helm software suite.",
};

export default function ProductPage() {
  return (
    <main className="pt-16">
      <Mininode />
      <ProductSuite />
      <FinalCTA />
    </main>
  );
}
