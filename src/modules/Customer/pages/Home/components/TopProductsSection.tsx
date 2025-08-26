import { useEffect, useState } from "react";
import { useFetchProductsApi } from "../../Shop/services";
import { ResponseType, SortTypes } from "../../../../../types";
import { IProductDetails } from "../../Product/types";
import { useNavigate } from "react-router-dom";
import { ICustomerRoutes } from "../../../types";

const TopProductsSection = () => {
  const [products, setProducts] = useState<IProductDetails[]>([]);

  const { fetchProductsApi } = useFetchProductsApi();

  const navigate = useNavigate();

  const fetchTopProducts = async () => {
    const { data } = await fetchProductsApi({
      limit: 8,
      page: 1,
      sortField: "average_rating",
      sortDirection: SortTypes.Descending,
    });
    if (data.responseType === ResponseType.Success) {
      setProducts(data.data.products);
    }
  };

  useEffect(() => {
    fetchTopProducts();
  }, []);

  return (
    <section className="text-primary mt-[45px] sm:mt-[70px] mb-[100px]">
      <h1 className="font-primary text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] italic">
        Top Products
      </h1>
      <div className="flex p-4 flex-wrap">
        {products.map((product, index) => (
          <div
            className={`w-[50%] p-3 md:w-[33%] lg:w-[25%] ${
              index > 5 ? "hidden lg:block" : index > 3 ? "hidden md:block" : ""
            }`}
            key={product.name + ` ${index}`}
          >
            <div
              className="border-primary border-[1px] min-h-[250px] lg:min-h-[350px] group relative overflow-hidden cursor-pointer"
              onClick={() =>
                navigate(ICustomerRoutes.Product + `/${product.id}`)
              }
            >
              <div className="min-h-[170px] lg:min-h-[250px] bg-gray relative">
                <img
                  src={product?.productImages?.[0]?.image_url}
                  className="h-[130px] lg:h-[160px] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                />
                <img
                  src={product?.productImages?.[1]?.image_url}
                  className="h-[130px] lg:h-[160px] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
              </div>
              <div className="min-h-[80px] lg:min-h-[100px] bg-primary text-white text-[17px] md:text-[18px] lg:text-[20px] pt-6 lg:pt-8 text-center">
                <h2 className="group-hover:underline inline">{product.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopProductsSection;
