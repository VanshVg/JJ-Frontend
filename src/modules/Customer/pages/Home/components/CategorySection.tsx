import { useNavigate } from "react-router-dom";
import { categoryImagesData } from "../types/constants";
import { ICustomerRoutes } from "../../../types";

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section>
      <h1 className="font-primary text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] italic">
        Shop by Category
      </h1>
      <div className="mt-6">
        <div className="flex flex-wrap mx-auto">
          {categoryImagesData.map((image) => (
            <div
              className="w-[25%] relative group cursor-pointer"
              key={image.imageUrl}
              onClick={() =>
                navigate(ICustomerRoutes.Shop, {
                  state: { category: image.label },
                })
              }
            >
              <img
                src={image.imageUrl}
                className="group-hover:opacity-50 duration-500"
              />
              <p className="text-primary absolute top-1/2 w-full font-semibold text-[25px] p-6 opacity-0 group-hover:bg-primary group-hover:text-white group-hover:opacity-100 z-10 duration-500 font-secondary">
                {image.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
