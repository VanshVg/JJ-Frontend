import { IProductDetails } from "../../types";

const Description = ({
  productDetails,
  isActive,
}: {
  productDetails?: IProductDetails;
  isActive: boolean;
}) => {
  return (
    <div
      className={`text-[16px] font-primary mt-4 transition-all ease-in duration-200 absolute left-0 right-0 ${
        !isActive ? "opacity-0 pointer-events-none" : ""
      }`}
    >
      <p>{productDetails?.description}</p>
      <h2 className="font-primary mt-3 font-semibold text-[18px]">
        Extra Note
      </h2>
      <ul className="list-disc pl-8">
        <li>{productDetails?.extra_note}</li>
      </ul>
    </div>
  );
};

export default Description;
