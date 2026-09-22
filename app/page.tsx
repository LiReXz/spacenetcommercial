import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Platform } from "@/components/Platform";
import { HowItWorks } from "@/components/HowItWorks";
import { Workloads } from "@/components/Workloads";
import { ProductSuite } from "@/components/ProductSuite";
import { Developers } from "@/components/Developers";
import { Security } from "@/components/Security";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Platform />
        <HowItWorks />
        <Workloads />
        <ProductSuite />
        <Developers />
        <Security />
        <FinalCTA />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
