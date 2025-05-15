import CategorySection from "./components/CategorySection";
import HeroSection from "./components/HeroSection";
import TopProductsSection from "./components/TopProductsSection";

const Home = () => {
  return (
    <div className="mt-6">
      <HeroSection />
      <TopProductsSection />
      <CategorySection />
    </div>
  );
};

export default Home;
