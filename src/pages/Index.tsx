import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyDifferent from "@/components/WhyDifferent";
import InvestorBenefits from "@/components/InvestorBenefits";
import GrowthMap from "@/components/GrowthMap";
import ROICalculator from "@/components/ROICalculator";
import MarketComparison from "@/components/MarketComparison";
import ContactCTA from "@/components/ContactCTA";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhyDifferent />
      <InvestorBenefits />
      <GrowthMap />
      <ROICalculator />
      <MarketComparison />
      <ContactCTA />
    </main>
  );
};

export default Index;
