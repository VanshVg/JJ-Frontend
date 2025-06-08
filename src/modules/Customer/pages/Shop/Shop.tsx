import { useEffect, useState } from "react";
import MainSidebar from "./components/Sidebar/MainSidebar/MainSidebar";
import SidebarMobile from "./components/Sidebar/SidebarMobile/SidebarMobile";
import { useFetchProductsApi } from "./services";

const Shop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([50, 2500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState([]);

  const { fetchProductsApi, isError, isLoading } = useFetchProductsApi();

  const fetchProducts = async () => {
    const { data } = await fetchProductsApi({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      limit: 20,
    });
    if (data.products) {
      setProducts(data?.data?.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="md:h-screen md:flex md:fixed w-full">
      <MainSidebar
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
      />
      <SidebarMobile
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
      />
      <div className="overflow-y-auto w-full p-2">
        <p
          className="underline font-secondary text-right text-primary mt-3 mr-3 cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        >
          Apply Filters
        </p>
      </div>
      {isLoading ? (
        <div>loading....</div>
      ) : isError ? (
        <div>Something went wrong...</div>
      ) : (
        <div>{products.length}</div>
      )}
    </div>
  );
};

export default Shop;
