import Rating from "@mui/material/Rating";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const ProductReviews = ({
  rating,
  totalReviews,
}: {
  rating: number | undefined;
  totalReviews: number;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        className="flex justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h1 className="font-secondary text-[15px]">REVIEWS ({totalReviews})</h1>
        <div className="flex gap-4">
          <Rating
            name="simple-controlled"
            value={Number(rating) || 0}
            precision={0.25}
            size="small"
            readOnly
            sx={{
              "& .MuiRating-iconEmpty": {
                color: "#888",
              },
            }}
          />
          <div
            className={`transition-opacity ease-in-out duration-300 ${
              isOpen ? "opacity-0 pointer-events-none fixed" : "opacity-100"
            }`}
          >
            <AiOutlineDown />
          </div>
          <div
            className={`transition-opacity ease-in-out duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 fixed"
            }`}
          >
            <AiOutlineUp />
          </div>
        </div>
      </div>
      <div
        className={`mt-[15px] transition-opacity ease-in-out duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 fixed"
        }`}
      >
        <p className={`mt-[15px] text-left underline`}>Write a review</p>
      </div>
      <div className="h-[1px] bg-primary w-full opacity-50 mt-[10px] mb-[15px]" />
    </div>
  );
};

export default ProductReviews;
