import { categoryImagesData } from "../types/constants";

const CategorySection = () => {
  return (
    <section>
      <h1 className="font-primary text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] italic">
        Shop by Category
      </h1>
      <div className="mt-6">
        <div className="flex flex-wrap">
          {categoryImagesData.map((image) => (
            <div className="w-[25%] relative group cursor-pointer">
              <img
                src={image.imageUrl}
                className="hover:opacity-50 duration-500"
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
