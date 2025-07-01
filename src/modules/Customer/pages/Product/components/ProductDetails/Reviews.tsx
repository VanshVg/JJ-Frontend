import LinearProgress from "@mui/material/LinearProgress";
import { IProductDetails, IProductReviews } from "../../types";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const Reviews = ({
  productDetails,
  isActive,
}: {
  productDetails?: IProductDetails;
  isActive: boolean;
}) => {
  const [counts, setCounts] = useState<{ [x: number]: number }>({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const countRatings = (reviews?: IProductReviews[]) => {
    const updatedCounts = { ...counts };

    if (reviews) {
      reviews.forEach((review) => {
        const rating = Math.floor(review.rating);
        if (updatedCounts[rating as keyof typeof updatedCounts] !== undefined) {
          updatedCounts[rating as keyof typeof updatedCounts]++;
        }
      });
    }

    setCounts({ ...updatedCounts });
  };

  useEffect(() => {
    countRatings(productDetails?.productReviews);
  }, [productDetails?.productReviews]);

  return (
    <div
      className={`text-[16px] font-primary mt-6 text-primary transition-all ease-in duration-200 absolute left-0 right-0 ${
        !isActive ? "opacity-0 pointer-events-none" : ""
      }`}
    >
      {productDetails?.productReviews &&
      productDetails?.productReviews?.length > 0 ? (
        <div>
          <div className="flex justify-center gap-8">
            <div className="w-[40%]">
              <h1 className="text-[75px] -mt-2 text-center">
                {productDetails.average_rating}
              </h1>
              <div className="flex justify-center -mt-3">
                <Rating
                  name="simple-controlled"
                  value={Number(productDetails?.average_rating) || 0}
                  precision={0.25}
                  size="medium"
                  readOnly
                />
              </div>
              <p className="text-center mt-1">
                {productDetails?.productReviews?.length} Reviews
              </p>
            </div>
            <Box width="55%">
              {[5, 4, 3, 2, 1].map((star) => {
                const value =
                  (counts[star] /
                    (productDetails?.productReviews?.length as number)) *
                    100 || 0;

                return (
                  <Box key={star} display="flex" alignItems="center" mb={1}>
                    <Typography width={20}>{star}</Typography>
                    <Box width="100%" mx={1}>
                      <LinearProgress
                        variant="determinate"
                        value={value}
                        sx={{
                          height: 10,
                          borderRadius: 2,
                          backgroundColor: "#eee",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#faaf00",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </div>
          <div className="h-[2px] bg-primary mt-3 opacity-30" />
          {/* <div className="border-[1px] border-gray-300 mt-2 p-4">
            <div className="mt-1">
              <Rating
                name="simple-controlled"
                value={newRating}
                precision={0.25}
                size="medium"
                onChange={(_, newValue) => {
                  setNewRating(newValue || 1);
                }}
              />
            </div>
            <div className="flex gap-2">
              <input
                name="review"
                type="textarea"
                placeholder="Enter your feedback (optional)"
                className="mt-2 h-[100px] border-primary border-[1px] p-2 w-full"
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button
                label="Add Rating"
                type="button"
                displayType={ButtonDisplayType.Primary}
                externalClasses="p-2 max-h-[40px] text-center justify-center text-[17px] font-normal"
              />
            </div>
          </div> */}
          <div className="mt-2 p-2">
            <h2 className="font-bold text-center text-[25px] mb-4">
              User Reviews
            </h2>
            {productDetails?.productReviews?.map((review, index) => (
              <div key={productDetails?.id} className={index > 0 ? "mt-6" : ""}>
                <div>
                  <h1 className="text-[16px] -mt-[2px] font-semibold">
                    {review.user.first_name} {review.user.last_name}
                  </h1>
                  <Rating
                    name="simple-controlled"
                    value={Number(review?.rating)}
                    precision={0.25}
                    size="small"
                    readOnly
                  />
                </div>
                {review?.review && <p className="mt-2">{review?.review}</p>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-primary">No Reviews Addded.</p>
      )}
    </div>
  );
};

export default Reviews;
