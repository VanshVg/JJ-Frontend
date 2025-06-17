import { useEffect, useState } from "react";
import MainSidebar from "./components/Sidebar/MainSidebar/MainSidebar";
import SidebarMobile from "./components/Sidebar/SidebarMobile/SidebarMobile";
import { useFetchProductsApi } from "./services";
import ProductCard from "./components/ProductCard/ProductCard";
import { IProducts } from "./types";
import InfiniteScroll from "react-infinite-scroll-component";

const Shop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([50, 2500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(false);

  const { fetchProductsApi, isError, isLoading } = useFetchProductsApi();

  const limit = 20;

  const fetchProducts = async () => {
    if (isLoading || !hasMore) {
      return;
    }
    const { data } = await fetchProductsApi({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      limit,
      page,
    });

    if (data?.data?.products) {
      setProducts((prev) => [...prev, ...(data?.data?.products || [])]);
      if (limit * page >= data?.data?.totalRecords) {
        setHasMore(false);
      }
    }
    setPage((prev) => prev + 1);
    setIsProductsLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setProducts([]);
  }, [priceRange, selectedCategories]);

  useEffect(() => {
    setIsProductsLoading(true);
    fetchProducts();
  }, []);

  return (
    <div className="lg:h-screen lg:flex">
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
      <div className="lg:w-[78%]">
        <div>
          <h1 className="font-primary text-[24px] sm:text-[28px] mt-[20px] lg:hidden">
            All Products
          </h1>
          <p
            className="underline font-secondary text-right text-primary mt-5 mr-3 cursor-pointer sm:text-[18px] lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            Apply Filters
          </p>
        </div>
        {isProductsLoading ? (
          <div>loading....</div>
        ) : isError ? (
          <p className="text-red-600">Something went wrong...</p>
        ) : (
          <div className="p-2 mt-3" style={{ height: "calc(100vh - 100px)" }}>
            {products.length > 0 ? (
              <InfiniteScroll
                dataLength={products.length}
                next={fetchProducts}
                hasMore={hasMore}
                loader={
                  <h3 className="text-center mx-auto mb-12">Loading...</h3>
                }
                scrollableTarget={"productsDiv"}
                className="sm:flex flex-wrap"
              >
                {products.map((product: IProducts) => (
                  <ProductCard
                    product={product}
                    key={product.id + product.name}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              <p>Products not found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
