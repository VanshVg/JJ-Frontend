import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { IQuantityProps } from "./types";

const Quantity = ({
  quantity,
  setQuantity,
  availableQuantity,
}: IQuantityProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value < 1) value = 1;
      if (value > availableQuantity) value = availableQuantity;
      setQuantity(value);
    }
  };

  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-sm w-fit">
      <button
        type="button"
        onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
        className="p-1 hover:text-red-500 transition-all"
      >
        <AiFillMinusSquare className="text-[24px]" />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="w-6 text-center text-lg border-none focus:outline-none"
        min={1}
        max={availableQuantity}
      />

      <button
        type="button"
        onClick={() =>
          setQuantity((prev) =>
            prev < availableQuantity ? prev + 1 : availableQuantity
          )
        }
        className="p-1 hover:text-green-500 transition-all"
      >
        <AiFillPlusSquare className="text-[24px]" />
      </button>
    </div>
  );
};

export default Quantity;
