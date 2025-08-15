import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../../../../../components/form-fields/Input";
import Select from "../../../../../../../components/form-fields/Select";
import { ADDRESS_TYPE_OPTIONS } from "../../../types/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAddressSchema } from "../../../schemas";
import Button from "../../../../../../../components/Button";
import { ButtonDisplayType } from "../../../../../../../components/types";
import { useAddAddressApi } from "../../../services";
import { ResponseType } from "../../../../../../../types";
import { AddressType, IAddAddress } from "../../../types/index";
import { useDispatch } from "react-redux";
import { addAddress } from "../../../../../../../redux/slices/address.slice";
import Checkbox from "../../../../../../../components/form-fields/Checkbox";
import { useState } from "react";

const AddAddress = ({
  closeModal,
  changeAddressFlag,
}: {
  closeModal: () => void;
  changeAddressFlag: () => void;
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IAddAddress>({
    defaultValues: {
      address_line_1: "",
      address_line_2: "",
      pincode: 393001,
      address_type: AddressType.Home,
    },
    resolver: yupResolver(addAddressSchema),
  });

  const [isPrimary, setIsPrimary] = useState<string>("false");

  const { addAddressApi, isLoading } = useAddAddressApi();

  const dispatch = useDispatch();

  const submitHandler: SubmitHandler<IAddAddress> = async (
    addressData: IAddAddress
  ) => {
    const { data } = await addAddressApi({
      ...addressData,
      is_primary: Boolean(isPrimary),
    });
    if (data && data.responseType === ResponseType.Success) {
      changeAddressFlag();
      dispatch(addAddress({ ...data.data }));
      closeModal();
    }
  };

  return (
    <div className="w-full">
      <form
        className="w-full flex flex-col mt-5"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Input
          name="address_line_1"
          control={control}
          type="textarea"
          placeholder="Flat, House no., Building, Company, Apartment"
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
        />
        <Input
          name="address_line_2"
          control={control}
          type="textarea"
          placeholder="Area, Street, Sector, Village"
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
        />
        <Input
          name="landmark"
          control={control}
          type="text"
          placeholder="Landmark"
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
        />
        <Input
          name="pincode"
          control={control}
          type="text"
          placeholder="Pincode"
          isDisabled={true}
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
        />
        <Select
          name="address_type"
          options={ADDRESS_TYPE_OPTIONS}
          control={control}
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
          placeholder="Address Type"
        />
        <div className="mt-4">
          <Checkbox
            name="is_primary"
            value={isPrimary}
            label={"Set as primary address"}
            onChange={(e) => {
              if (e.target.value === "false") {
                setIsPrimary("true");
              } else {
                setIsPrimary("false");
              }
            }}
            isChecked={isPrimary === "true"}
            externalClasses="justify-start"
          />
        </div>
        <Button
          label="Add"
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading}
          displayType={ButtonDisplayType.Primary}
          externalClasses="text-[12px] mx-auto py-3 px-4 mt-6 md:mt-4 lg:mt-6 lg:text-[14px]"
        />
      </form>
    </div>
  );
};

export default AddAddress;
