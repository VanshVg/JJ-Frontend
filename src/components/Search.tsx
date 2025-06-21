import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getSearchQuery, setSearchQuery } from "../redux/slices/search.slice";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { ICustomerRoutes } from "../modules/Customer/types";

const Search = () => {
  const searchValue = useSelector(getSearchQuery).query;

  const [value, setValue] = useState<string | null>(searchValue);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const debouncedSearchValue = useDebounce<string | null>(value, 500);

  useEffect(() => {
    dispatch(setSearchQuery({ query: debouncedSearchValue }));
  }, [debouncedSearchValue]);

  return (
    <div className="flex relative w-[50%] md:w-[25%] lg:w-[15%]">
      <input
        placeholder="Search Products"
        className="p-1 px-2 font-secondary w-full border-b-[1px] border-primary focus:border-0 focus:outline-[1px] focus:outline-primary"
        onChange={(e) => {
          navigate(ICustomerRoutes.Shop);
          setValue(e.target.value);
        }}
      />
      {(!searchValue || searchValue?.trim() === "") && (
        <AiOutlineSearch
          className="absolute right-[2%] top-[23%]"
          size={"20px"}
        />
      )}
    </div>
  );
};

export default Search;
