import { useForm } from "react-hook-form";
import Input from "../../../../../../../components/form-fields/Input";

const AddAddress = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div className="w-full">
      <form
        className="w-full flex flex-col mt-5 lg:w-[60%]"
        // onSubmit={handleSubmit(submitHandler)}
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
      </form>
    </div>
  );
};

export default AddAddress;
