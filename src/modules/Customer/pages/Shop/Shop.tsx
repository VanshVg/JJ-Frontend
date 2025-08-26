import { useEffect, useState } from "react";
import MainSidebar from "./components/Sidebar/MainSidebar/MainSidebar";
import SidebarMobile from "./components/Sidebar/SidebarMobile/SidebarMobile";
import { useFetchProductsApi } from "./services";
import ProductCard from "./components/ProductCard/ProductCard";
import { IProductFilters, IProducts } from "./types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { getSearchQuery } from "../../../../redux/slices/search.slice";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<IProductFilters>({
    priceRange: [50, 2500],
    categories: [...(location?.state?.category && [location?.state?.category])],
  });
  const [products, setProducts] = useState<IProducts[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(false);

  const { fetchProductsApi, isError, isLoading } = useFetchProductsApi();

  const searchValue = useSelector(getSearchQuery).query;

  const limit = 20;

  const debouncedFilters = useDebounce<IProductFilters>(filters, 500);

  const fetchProducts = async (newPage: number = page) => {
    if (isLoading) {
      return;
    }

    const { data } = await fetchProductsApi({
      minPrice: debouncedFilters.priceRange?.[0],
      maxPrice: debouncedFilters.priceRange?.[1],
      limit,
      page: newPage,
      category: debouncedFilters.categories,
      search: searchValue,
    });

    if (data?.data?.products) {
      setProducts((prev) => [...prev, ...(data?.data?.products || [])]);
      if (limit * newPage >= data?.data?.totalRecords) {
        setHasMore(false);
      }
    }
    setPage(newPage + 1);
    setIsProductsLoading(false);
  };

  useEffect(() => {
    setIsProductsLoading(true);
    setPage(1);
    setHasMore(true);
    setProducts([]);
    fetchProducts(1);
  }, [debouncedFilters, searchValue]);

  return (
    <div className="lg:h-screen lg:flex">
      <MainSidebar filters={filters} setFilters={setFilters} />
      <SidebarMobile
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="lg:w-[78%]">
        <div>
          <h1 className="font-primary text-[24px] sm:text-[28px] mt-[20px] lg:hidden">
            {searchValue && searchValue?.trim() !== ""
              ? `Search Result for: ${searchValue?.trim()}`
              : " All Products"}
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
