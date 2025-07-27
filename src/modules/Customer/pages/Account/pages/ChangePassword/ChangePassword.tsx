import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { IChangePassword } from "../../types";
import Button from "../../../../../../components/Button";
import { ButtonDisplayType } from "../../../../../../components/types";
import { changePasswordSchema } from "../../schemas";
import Input from "../../../../../../components/form-fields/Input";
import { useChangePasswordApi } from "../../services";
import { ResponseType } from "../../../../../../types";

const ChangePassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IChangePassword>({
    resolver: yupResolver(changePasswordSchema),
  });

  const { changePasswordApi, isLoading } = useChangePasswordApi();

  const submitHandler: SubmitHandler<IChangePassword> = async (
    changePasswordData: IChangePassword
  ) => {
    const { data } = await changePasswordApi(changePasswordData);
    if (data && data.responseType === ResponseType.Success) {
      reset({
        confirm_password: "",
        current_password: "",
        new_password: "",
      });
    }
  };

  return (
    <div className="text-primary">
      <h1 className="text-center text-[28px] font-semibold">Update Password</h1>
      <form
        className="w-[80%] flex flex-col mx-auto mt-5 lg:w-[60%]"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Input
          name="current_password"
          control={control}
          type="password"
          placeholder="Enter a current password"
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
        />
        <Input
          name="new_password"
          control={control}
          type="password"
          placeholder="Enter a new password"
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
        />
        <Input
          name="confirm_password"
          control={control}
          type="password"
          placeholder="Confirm a new password"
          errors={errors}
          externalClasses="w-full mt-4 lg:text-[14px]"
        />
        <Button
          label="Update password"
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

export default ChangePassword;
