import Rating from "@mui/material/Rating";
import { IProductReviews } from "../types";
import { formatDate } from "../../../../../utils";

const ProductReviews = ({
  rating,
  reviews,
}: {
  rating: number | undefined;
  reviews: IProductReviews[];
}) => {
  return (
    <div className="text-primary">
      {/* <div
        className="flex justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h1 className="font-secondary text-[15px]">
          REVIEWS ({reviews.length})
        </h1>
        <div className="flex gap-4 mt-[4px]">
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
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none fixed"
            }`}
          >
            <AiOutlineUp />
          </div>
        </div>
      </div> */}

      <div>
        <h1 className="text-[18px] underline mb-4">Customer Reviews</h1>
        <Rating
          name="simple-controlled"
          value={Number(rating) || 0}
          precision={0.25}
          size="medium"
          readOnly
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "#888",
            },
          }}
        />
        <p className="mb-8">{reviews.length} REVIEWS</p>
        {/* <div className="h-[1px] bg-primary w-full opacity-50 mb-[25px]" /> */}
      </div>
      {/* <div className="h-[1px] bg-primary w-full opacity-50 mt-[10px] mb-[15px]" /> */}

      <div className={`mt-[15px] transition-opacity ease-in-out duration-300`}>
        {reviews.map((review) => (
          <div
            key={review.user.id}
            className="border-b-[1px] border-t-[1px] border-gray-300 p-3 rounded-md mt-[15px]"
          >
            <div className="flex justify-start">
              <Rating
                name="simple-controlled"
                value={Number(review.rating) || 0}
                precision={0.25}
                size="small"
                readOnly
                sx={{
                  "& .MuiRating-iconEmpty": {
                    color: "#888",
                  },
                }}
              />
            </div>
            <div className="flex justify-between opacity-80 font-primary mt-2">
              <p className="text-[15px] opacity-90 font-semibold">
                {review.user.first_name} {review.user.last_name}
              </p>
              <p className="text-[12px]">{formatDate(review.created_at)}</p>
            </div>
            <p className="text-left text-[13px] opacity-80">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
