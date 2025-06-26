import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IProductCarouselProps } from "../types";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Indicators, NextArrow, PrevArrow } from "./CarouselComponents";

const ProductImages = ({ productImages, discount }: IProductCarouselProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openFullscreen = (index: number) => {
    setSelectedIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };
  return (
    <div>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        className="w-full relative mx-auto"
        onClickItem={openFullscreen}
        renderArrowPrev={(clickHandler) => (
          <NextArrow clickHandler={clickHandler} />
        )}
        renderArrowNext={(clickHandler) => (
          <PrevArrow clickHandler={clickHandler} />
        )}
        renderIndicator={(clickHandler, isSelected, index, label) => (
          <Indicators
            clickHandler={clickHandler}
            isSelected={isSelected}
            index={index}
            label={label}
          />
        )}
      >
        {productImages?.map((image, index) => (
          <div
            key={index}
            className="bg-beige w-full h-[300px] mx-auto flex justify-center items-center"
          >
            <img
              src={image.image_url}
              className="h-[180px] w-[30px] object-contain"
              alt={`Product ${index}`}
            />
            {discount && discount > 0 && index === 0 && (
              <div className="bg-primary p-1 absolute min-w-[100px] rounded-[1px] top-2 left-2 z-10 ">
                <h2 className="text-white text-[12px]">{discount + "% OFF"}</h2>
              </div>
            )}
          </div>
        ))}
      </Carousel>
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-beige bg-opacity-90 flex items-center justify-center">
          <AiOutlineClose
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-primary text-2xl z-50"
          />

          <div className="w-full h-full max-w-screen-xl mx-auto">
            <Carousel
              showArrows={true}
              showThumbs={false}
              showIndicators={true}
              showStatus={false}
              infiniteLoop={true}
              selectedItem={selectedIndex}
              onChange={setSelectedIndex}
              renderArrowPrev={(clickHandler) => (
                <NextArrow clickHandler={clickHandler} />
              )}
              renderArrowNext={(clickHandler) => (
                <PrevArrow clickHandler={clickHandler} />
              )}
              renderIndicator={(clickHandler, isSelected, index, label) => (
                <Indicators
                  clickHandler={clickHandler}
                  isSelected={isSelected}
                  index={index}
                  label={label}
                />
              )}
            >
              {productImages?.map((image, index) => (
                <div
                  key={index}
                  className="h-screen flex items-center justify-center"
                >
                  <img
                    src={image.image_url}
                    alt={`Product ${index}`}
                    className="object-contain max-h-[40vh] max-w-full"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImages;
