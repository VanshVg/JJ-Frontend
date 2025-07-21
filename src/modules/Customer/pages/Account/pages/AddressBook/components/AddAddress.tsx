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
          placeholder="Enter an address"
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
        />
        <Input
          name="address_line_2"
          control={control}
          type="textarea"
          placeholder="Enter an address"
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
        />
        {/* <ContactInput
          name="contact_no"
          control={control}
          placeholder="Mobile Number"
          errors={errors}
          externalClasses="mt-4 opacity-70 lg:text-[14px]"
          isDisabled={true}
        /> */}
      </form>
    </div>
  );
};

export default AddAddress;
