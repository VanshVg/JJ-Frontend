const TopProductsSection = () => {
  return (
    <section className="text-primary mt-[45px] sm:mt-[70px] mb-[100px]">
      <h1 className="font-primary text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] italic">
        Top Products
      </h1>
      <div className="flex p-4 flex-wrap">
        <div className="w-[50%] p-3">
          <div className="border-primary border-[1px] min-h-[250px]">
            <div className="min-h-[170px] bg-[#edebe7]"></div>
            <div className="min-h-[80px] bg-primary"></div>
          </div>
        </div>
        <div className="w-[50%] p-3">
          <div className="border-primary border-[1px] min-h-[250px]">
            <div className="min-h-[170px] bg-[#edebe7]"></div>
            <div className="min-h-[80px] bg-primary"></div>
          </div>
        </div>
        <div className="w-[50%] p-3">
          <div className="border-primary border-[1px] min-h-[250px]">
            <div className="min-h-[170px] bg-[#edebe7]"></div>
            <div className="min-h-[80px] bg-primary"></div>
          </div>
        </div>
        <div className="w-[50%] p-3">
          <div className="border-primary border-[1px] min-h-[250px]">
            <div className="min-h-[170px] bg-[#edebe7]"></div>
            <div className="min-h-[80px] bg-primary"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopProductsSection;
