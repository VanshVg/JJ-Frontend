import CategorySection from "./components/CategorySection";
import Footer from "../../components/Footer";
import HeroSection from "./components/HeroSection";
import TopProductsSection from "./components/TopProductsSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TopProductsSection />
      <CategorySection />
      <Footer />
    </div>
  );
};

export default Home;
