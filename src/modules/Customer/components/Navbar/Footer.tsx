const Footer = () => {
  return (
    <footer className="border-t-[2px] border-primary mt-16 max-w-[98%] mx-auto mb-12 text-left">
      <div className="text-primary mt-2 border-b-[1px]">
        <div className="border-b-[1px] border-primary p-6 text-center">
          <h1 className="font-primary font-semibold text-[14px]">Contact Us</h1>
          <div className="text-[10px] mt-2">
            <p>+91 9825153013,</p>
            <p>+91 9737353013</p>
          </div>
        </div>
        <div className="border-b-[1px] border-primary p-6 text-center">
          <h1 className="font-primary font-semibold text-[14px]">
            Opening Hours
          </h1>
          <div className="text-[10px] mt-2">
            <p>
              Mon - Sat<b> :</b> 9am - 7PM
            </p>
            <p>Sun: Closed</p>
          </div>
        </div>
        <div className="p-6 text-center">
          <h1 className="font-primary font-semibold text-[14px]">Visit Us</h1>
          <div className="text-[10px] mt-2">
            <p>Jay Jalaram Trading Co. behind clock tower,</p>
            <p>Goya Bazar, Ankleshwar - 393001</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
