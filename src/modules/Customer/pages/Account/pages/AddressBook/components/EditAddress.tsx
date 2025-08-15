import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../../../../../components/form-fields/Input";
import Select from "../../../../../../../components/form-fields/Select";
import { ADDRESS_TYPE_OPTIONS } from "../../../types/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAddressSchema } from "../../../schemas";
import Button from "../../../../../../../components/Button";
import { ButtonDisplayType } from "../../../../../../../components/types";
import { useEditAddressApi } from "../../../services";
import { ResponseType } from "../../../../../../../types";
import { IAddAddress, IUserAddress } from "../../../types/index";
import { useDispatch } from "react-redux";
import { updateAddress } from "../../../../../../../redux/slices/address.slice";
import Checkbox from "../../../../../../../components/form-fields/Checkbox";
import { useState } from "react";

const EditAddress = ({
  closeModal,
  addressData,
  changeAddressFlag,
}: {
  closeModal: () => void;
  addressData?: IUserAddress;
  changeAddressFlag: () => void;
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IAddAddress>({
    defaultValues: {
      address_line_1: addressData?.address_line_1,
      address_line_2: addressData?.address_line_2,
      pincode: 393001,
      address_type: addressData?.address_type,
      landmark: addressData?.landmark,
    },
    resolver: yupResolver(addAddressSchema),
  });

  const [isPrimary, setIsPrimary] = useState<string>(
    addressData?.is_primary ? String(addressData.is_primary) : "false"
  );

  const { editAddressApi, isLoading } = useEditAddressApi();

  const dispatch = useDispatch();

  const submitHandler: SubmitHandler<IAddAddress> = async (
    addressPayload: IAddAddress
  ) => {
    const { data } = await editAddressApi(
      { ...addressPayload, is_primary: Boolean(isPrimary) },
      Number(addressData?.id)
    );
    if (data && data.responseType === ResponseType.Success) {
      changeAddressFlag();
      dispatch(
        updateAddress({ ...addressPayload, id: Number(addressData?.id) })
      );
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
          label="Update"
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

export default EditAddress;
