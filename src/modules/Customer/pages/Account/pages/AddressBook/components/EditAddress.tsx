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

  const { editAddressApi, isLoading } = useEditAddressApi();

  const submitHandler: SubmitHandler<IAddAddress> = async (
    addressData: IAddAddress
  ) => {
    const { data } = await editAddressApi(addressData);
    if (data && data.responseType === ResponseType.Success) {
      changeAddressFlag();
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

export default EditAddress;
