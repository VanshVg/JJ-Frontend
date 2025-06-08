import { useEffect, useState } from "react";
import MainSidebar from "./components/Sidebar/MainSidebar/MainSidebar";
import SidebarMobile from "./components/Sidebar/SidebarMobile/SidebarMobile";

const Shop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([50, 2500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    console.log(selectedCategories, "<<<<");
  }, [selectedCategories]);

  return (
    <div className="h-screen flex fixed w-full">
      <MainSidebar
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        setSelectedCategories={setSelectedCategories}
      />
      <SidebarMobile
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        setSelectedCategories={setSelectedCategories}
      />
      <div className="h-screen overflow-y-auto w-full p-2 hidden">
        <p
          className="underline font-secondary text-right text-primary mt-3 mr-3 cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        >
          Apply Filters
        </p>
      </div>
    </div>
  );
};

export default Shop;
