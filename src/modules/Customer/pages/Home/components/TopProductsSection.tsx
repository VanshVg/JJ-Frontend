import { useNavigate } from "react-router-dom";
import { topProductsData } from "../types/constants";
import { ICustomerRoutes } from "../../../types";

const TopProductsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="text-primary mt-[45px] sm:mt-[70px] mb-[100px]">
      <h1 className="font-primary text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] italic">
        Top Products
      </h1>
      <div className="flex p-4 flex-wrap">
        {topProductsData.map((product, index) => (
          <div
            className={`w-[50%] p-3 md:w-[33%] lg:w-[25%]   ${
              index > 5 ? "hidden lg:block" : index > 3 ? "hidden md:block" : ""
            }`}
            key={product.productName + ` ${index}`}
          >
            <div className="border-primary border-[1px] min-h-[250px] lg:min-h-[350px] group relative overflow-hidden cursor-pointer">
              <div className="min-h-[170px] lg:min-h-[250px] bg-[#edebe7] relative">
                <img
                  src={product.frontImageUrl}
                  className="h-[130px] lg:h-[160px] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                />
                <img
                  src={product.backImageUrl}
                  className="h-[130px] lg:h-[160px] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
              </div>
              <div className="min-h-[80px] lg:min-h-[100px] bg-primary text-white text-[17px] md:text-[18px] lg:text-[20px] pt-6 lg:pt-8 text-center">
                <h2 className="hover:underline inline">
                  {product.productName}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p
        className="text-[22px] font-semibold cursor-pointer hover:underline inline"
        onClick={() => navigate(ICustomerRoutes.Shop)}
      >
        View All {"->"}
      </p>
    </section>
  );
};

export default TopProductsSection;
