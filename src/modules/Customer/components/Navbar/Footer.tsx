const Footer = () => {
  return (
    <footer className="border-t-[2px] border-primary mt-16 mx-auto mb-1 text-left">
      <div className="text-primary mt-2 border-b-[1px] sm:flex sm:justify-between">
        <div className="border-b-[1px] border-primary p-4 sm:border-b-[0px] sm:border-r-[1px] sm:w-[50%]">
          <h1 className="font-primary font-semibold text-[14px] text-center sm:text-[18px] md:text-[22px]">
            Contact Us
          </h1>
          <div className="text-[9px] mt-2 flex justify-center gap-4 sm:text-[14px] md:text-[16px]">
            <p>+91 9825153013</p>
            <p>|</p>
            <p>+91 9737353013</p>
          </div>
        </div>
        <div className="p-4 text-center sm:border-b-[0px] sm:w-[50%]">
          <h1 className="font-primary font-semibold text-[14px] sm:text-[18px] md:text-[22px]">
            Visit Us
          </h1>
          <div className="text-[9px] mt-2 sm:text-[14px] md:text-[16px]">
            <p>Jay Jalaram Trading Co. behind clock tower,</p>
            <p>Goya Bazar, Ankleshwar - 393001</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
